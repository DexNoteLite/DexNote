// logout.js

document.getElementById("logout-button").addEventListener("click", async (e) => {
    e.preventDefault(); // stop normal link behavior

    await window.supabase.auth.signOut();

    window.location.href = "login.html";
});
