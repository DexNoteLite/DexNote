const input = document.getElementById("search-input");
const results = document.getElementById("search-results");

input.addEventListener("input", async () => {
    const query = input.value.trim();

    // clear results
    results.innerHTML = "";

    if (query.length < 2) return;

    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, username")
        .ilike("username", `%${query}%`)
        .limit(10);

    if (error) {
        console.error(error);
        return;
    }

    data.forEach(user => {
        const div = document.createElement("div");
        div.className = "user-card";

        div.innerHTML = `
            <span>${user.full_name} (@${user.username})</span>
            <a href="public-profile.html?user=${user.username}">
                View Profile
            </a>
        `;

        results.appendChild(div);
    });
});
