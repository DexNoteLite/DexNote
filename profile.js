// profile.js

(async () => {
    // 1️⃣ Get currently logged-in user
    const { data: { user } } = await window.supabase.auth.getUser();

    if (!user) return;

    // 2️⃣ Show email directly from auth
    document.getElementById("profile-email").innerText = user.email;

    // 3️⃣ Get profile data (name + avatar)
    const { data: profile, error } = await window.supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    // 4️⃣ Show full name
    document.getElementById("profile-name").innerText = profile.full_name;

    // 5️⃣ Show avatar if exists
    const avatarImg = document.getElementById("avatar");
    if (profile.avatar_url) {
        avatarImg.src = profile.avatar_url;
    }

    // 6️⃣ Handle avatar upload
    const avatarInput = document.getElementById("avatar-input");

    avatarInput.addEventListener("change", async () => {
        const file = avatarInput.files[0];
        if (!file) return;

        const filePath = `${user.id}.png`;

        // Upload image to Supabase Storage
        const { error: uploadError } = await window.supabase.storage
            .from("avatars")
            .upload(filePath, file, { upsert: true });

        if (uploadError) {
            alert("Failed to upload image");
            return;
        }

        // Get public URL
        const { data } = window.supabase.storage
            .from("avatars")
            .getPublicUrl(filePath);

        // Save URL in profiles table
        await window.supabase
            .from("profiles")
            .update({ avatar_url: data.publicUrl })
            .eq("id", user.id);

        // Update image instantly
        avatarImg.src = data.publicUrl;
    });
})();
