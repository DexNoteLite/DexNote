const form = document.querySelector(".signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username: email.split("@")[0]
      }
    }
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Check your email to verify your account.");
});
