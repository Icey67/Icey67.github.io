function getProfileData(data) {
    let profile = document.getElementById("discordprofile")
    if (!profile) return;
    const { discord_user, activities } = data;
    const { avatar, id, display_name } = discord_user;
    let pfp = document.createElement("img");
    pfp.src = "https://cdn.discordapp.com/avatars/" + id + "/" + avatar + ".webp?size=256"
    pfp.style = "border: 5px solid #5865F2"
    profile.appendChild(pfp)
    let displayname = document.createElement("h2");
    displayname.textContent = display_name;
    profile.appendChild(displayname)

    const status = activities.find(a => a.type === 4);
    console.log(status)
    if (status === undefined) {
        console.error("NO DISCORD STATUS")
    } else {
        console.log(`${status.emoji.name} ${status.state}`)
        let statuss = document.createElement("p");
        if (status.state === undefined) {
            statuss.textContent = `Status: ${status.emoji.name}`
        } else {
            statuss.textContent = `Status: ${status.emoji.name} \"${status.state}\"`;
        }
        profile.appendChild(statuss)
    }
}

function updateNowPlayingText(data) {
    const nowPlaying = document.getElementById("nowPlaying");
    if (!nowPlaying) return;
    const { discord_status, activities } = data;
    if (activities && activities.length > 0) {
        const musicPlayer = activities.find(a => a.type === 2);
        if (musicPlayer) {
            nowPlaying.innerHTML = `<p>I'm currently listening to <a href="${musicPlayer.details_url}">${musicPlayer.details}</a> by <a href="${musicPlayer.state_url}">${musicPlayer.state}</a> on ${musicPlayer.name}</p>`;
            return;
        }
        const game = activities.find(a => a.type === 0);
        if (game) {
            nowPlaying.innerHTML = `<p>I'm playing ${game.name}</p>`;
            return;
        }
    }

    if (discord_status === "online") {
        nowPlaying.innerHTML = "<p>I'm online, literally chilling</p>";
    } else if (discord_status === "offline") {
        nowPlaying.innerHTML = "<p>I'm offline being ice elsewhere</p>";
    } else if (discord_status === "idle") {
        nowPlaying.innerHTML = "<p>I'm online, but being ice elsewhere</p>";
    } else if (discord_status === "dnd") {
        nowPlaying.innerHTML = "<p>I'm online, but no disturby plz ;-;</p>";
    } else {
        nowPlaying.innerHTML = "Loading...";
    }
}

function setLanyardStatus() {
    fetch("https://api.lanyard.rest/v1/users/469059297033191425")
        .then(response => response.json())
        .then(json => {
            if (json && json.success && json.data) {
                updateNowPlayingText(json.data);
            }
        })
        .catch(() => {
            const nowPlaying = document.getElementById("nowPlaying");
            if (nowPlaying) nowPlaying.textContent = "cannot update nowPlaying!";
        });
}

function setLanyardStatusBUTONCE() {
    fetch("https://api.lanyard.rest/v1/users/469059297033191425")
        .then(response => response.json())
        .then(json => {
            if (json && json.success && json.data) {
                getProfileData(json.data)
            }
        })
        .catch(() => {
            const discordprofile = document.getElementById("discordprofile");
            if (discordprofile) discordprofile.textContent = "cannot update discordprofile!";
        });
}

addEventListener("DOMContentLoaded", function() {
    setLanyardStatusBUTONCE()
});

setInterval(function() {
    setLanyardStatus()
}, 500);