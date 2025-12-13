// signup.js

document.querySelector(".signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await window.supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        alert(error.message);
        return;
    }

    const userId = data.user.id;

    await window.supabase
        .from("profiles")
        .insert([{ id: userId, full_name: fullName }]);

    window.location.href = "dashboard.html";
});
