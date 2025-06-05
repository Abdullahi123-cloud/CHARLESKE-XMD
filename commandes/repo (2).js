const axios = require('axios');
const moment = require("moment-timezone");
const { zokou } = require(__dirname + "/../framework/zokou");

// Add your channel link or JID here
const CHANNEL_LINK = "Follow the CHARLESKE-XMD channel on WhatsApp: https://whatsapp.com/channel/0029Vao2hgeChq6HJ5bmlZ3K"; // Example for Telegram
// const CHANNEL_JID = "120363351653122969@newsletter"; // Example for WhatsApp JID

const formatNumber = (num) => num.toLocaleString();

const fetchGitHubRepoDetails = async () => {
    try {
        const repo = 'Charleskenya1/CHARLESKE-XMD';
        const response = await axios.get(`https://api.github.com/repos/${repo}`);
        const { name, description, forks_count, stargazers_count, watchers_count, open_issues_count, owner, license } = response.data;
        return {
            name,
            description: description || "No description provided",
            forks: forks_count,
            stars: stargazers_count,
            watchers: watchers_count,
            issues: open_issues_count,
            owner: owner.login,
            license: license ? license.name : "No license",
            url: response.data.html_url,
        };
    } catch (error) {
        console.error("Error fetching GitHub repository details:", error.response?.data || error.message);
        return null;
    }
};

const commands = ["git", "repo", "script", "sc"];

commands.forEach((command) => {
    zokou({ nomCom: command, categorie: "GitHub" }, async (dest, zk, commandeOptions) => {
        let { repondre } = commandeOptions || {};

        const repoDetails = await fetchGitHubRepoDetails();

        if (!repoDetails) {
            (repondre || zk.sendMessage)(dest, { text: "❌ Failed to fetch GitHub repository information." });
            return;
        }

        const { name, description, forks, stars, watchers, issues, owner, license, url } = repoDetails;
        const currentTime = moment().format('DD/MM/YYYY HH:mm:ss');

        const infoMessage = `
🌐 *GitHub Repository Info* 💥🌐

💻 *Name:* ${name}
📜 *Description:* ${description}
⭐ *Stars:* ${formatNumber(stars)}
🍴 *Forks:* ${formatNumber(forks)}
👀 *Watchers:* ${formatNumber(watchers)}
❗ *Open Issues:* ${formatNumber(issues)}
👤 *Owner:* ${owner}
📄 *License:* ${license}

📅 *Fetched on:* ${currentTime}

🔗 *Channel:* ${CHANNEL_LINK}
        `;

        try {
            await zk.sendMessage(dest, {
                image: { url: "https://github.com/Charleskenya1/logos_page/Charleskenya1" }, // Provide a real image URL
                caption: `✨ Repository Highlights ✨\n\n🛠️ Developed by *Charleske  ke*\n📢 Stay updated\nChannel: ${CHANNEL_LINK}\n\nRepo Url\n${url}`,
            });

            await zk.sendMessage(dest, { text: infoMessage });
        } catch (e) {
            console.log("❌ Error sending GitHub info:", e);
            (repondre || zk.sendMessage)(dest, { text: "❌ Error sending GitHub info: " + e.message });
        }
    });
});
