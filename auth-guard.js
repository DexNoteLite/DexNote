// auth-guard.js

(async () => {
    const { data: { session } } = await window.supabase.auth.getSession();

    if (!session) {
        window.location.href = "login.html";
    }
})();
