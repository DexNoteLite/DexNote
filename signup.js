const form = document.querySelector(".signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 1️⃣ Create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  // 2️⃣ Insert profile
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      full_name: fullName,
      username: email.split("@")[0], // simple username
    });

  if (profileError) {
    alert(profileError.message);
    return;
  }

  // success
  window.location.href = "dashboard.html";
});
