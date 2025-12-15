// dashboard.js

(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // Try to get profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  // If profile does NOT exist, create it
  if (error) {
    await supabase.from("profiles").insert({
      id: user.id,
      full_name: user.user_metadata.full_name,
      username: user.user_metadata.username
    });

    // show name immediately
    document.getElementById("username").innerText =
      user.user_metadata.full_name;
  } else {
    // profile exists
    document.getElementById("username").innerText =
      profile.full_name;
  }
})();
