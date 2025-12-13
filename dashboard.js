// dashboard.js

(async () => {
    const { data: { user } } = await window.supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await window.supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    document.getElementById("username").innerText = data.full_name;
})();
