// profile.js

(async () => {
  // 1️⃣ Get logged-in user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // 2️⃣ Show email
  document.getElementById("profile-email").innerText = user.email;

  // 3️⃣ Fetch profile data
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name, bio, about_me, avatar_url")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  // 4️⃣ Fill UI
  document.getElementById("profile-name").innerText = profile.full_name;
  document.getElementById("bio").value = profile.bio || "";
  document.getElementById("about_me").value = profile.about_me || "";

  const avatarImg = document.getElementById("avatar");
  if (profile.avatar_url) {
    avatarImg.src = profile.avatar_url;
  }

  // 5️⃣ Avatar upload
  document.getElementById("avatar-input").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const filePath = `${user.id}.png`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert("Image upload failed");
      return;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    await supabase
      .from("profiles")
      .update({ avatar_url: data.publicUrl })
      .eq("id", user.id);

    avatarImg.src = data.publicUrl;
  });

  // 6️⃣ Save bio & about me
  document.getElementById("profile-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // 🚫 stop refresh

    const bio = document.getElementById("bio").value;
    const aboutMe = document.getElementById("about_me").value;

    const { error } = await supabase
      .from("profiles")
      .update({
        bio,
        about_me: aboutMe
      })
      .eq("id", user.id);

    if (error) {
      alert("Failed to save profile");
      console.error(error);
    } else {
      alert("Profile saved!");
    }
  });
})();
