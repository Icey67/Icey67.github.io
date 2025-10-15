var messages = [];

// Load messages from the JSON file
function loadMessages() {
    return fetch('/messages.json')
        .then(response => response.json())
        .then(data => {
            messages = data;
        });
}

// Define the function to update the footer message
function updateFooterMessage(index) {
    if (index === 'last') {
        index = messages.length - 1;
    }
    if (typeof index !== 'number') {
        console.error("Invalid input. Please provide a number as the index.");
        return;
    }
    if (index < 0 || index >= messages.length) {
        console.error("Invalid index. Please provide a valid index between 0 and " + (messages.length - 1));
        return;
    }

    const randomMessage = messages[index];
    let messageContainer = document.querySelector('.message-container');
    messageContainer.innerHTML = '';
    if (randomMessage.url) {
        const link = document.createElement('a');
        link.href = randomMessage.url;
        link.innerHTML = randomMessage.text;
        link.style.color = 'white';
        messageContainer.appendChild(link);
    } else {
        messageContainer.innerHTML = randomMessage.text;
    }
    if (randomMessage.font) {
        messageContainer.style.fontFamily = randomMessage.font;
        if (randomMessage.font === "Fira Code") {
            messageContainer.style.fontSize = "26px";
        }
    }
    console.log("message updated to: " + index);
    // Example usage: updateFooterMessage(0); // This will update the footer with the first message
}

document.addEventListener('DOMContentLoaded', function() {
    // Store what "tab" was opened from url
    sessionStorage.setItem('lastTab', window.location.pathname);

    loadMessages().then(() => {
        updateFooterMessage(Math.floor(Math.random() * messages.length));
    });

    // randomly load on a 0.67% chance
    if (Math.random() < 0.067 && !window.location.pathname.includes('/blog')) {
        iceysixtysevenfeature();
    }
});

// more message stuff
function messagesindex() { //useful debugging function: check how many messages there are
    console.log("the messages array has " + (messages.length - 1) + " items");

    // Count and log the number of messages with a link
    var messagesWithLink = messages.filter(message => message.url).length;
    console.log("the messages array has " + messagesWithLink + " items with a link");
}

function showMessages() { //useful debugging function: show all messages in the console
    console.log("here are the messages: ");
    for (var i = 0; i < messages.length; i++) {
        var messageText = i + ": '" + messages[i].text + "'";
        if (messages[i].url) {
            messageText += " HAS LINK: " + messages[i].url;
        }
        if (messages[i].font) {
            messageText += " HAS FONT: '" + messages[i].font + "'";
        }
        console.log(messageText);
    }
}

function iceysixtysevenfeature() {
    // redirect to the 1067 event page
    window.location.href = "/ssssssss.html";
}

// Firefox detection and banner logic
document.addEventListener('DOMContentLoaded', function () {
    const alert = document.getElementById('firefox-warning-banner');
    const dismissAlertButton = document.getElementById('firefox-warning-dismiss');
    dismissAlertButton.style="cursor: pointer;";
    dismissAlertButton.style="text-decoration: underline solid white;";
    if (localStorage.getItem('firefoxBannerDismissed') === '1') {
        alert.style.display = 'none';
    } else {
        alert.style.display = 'inherit';
    }
    if (dismissAlertButton) {
        dismissAlertButton.addEventListener('click', event => {
            event.preventDefault()
            alert.style.display = 'none';
            localStorage.setItem('firefoxBannerDismissed', '1');
        });
    }
});

function youtubemusictest() {
    //check for iframe with yt-music-player id
    var iframe = document.getElementById('yt-music-player');
    //add style to iframe if it exists
    if (iframe && iframe.getAttribute('shown') !== '1') {
        iframe.style.display = 'block';
        iframe.style.position = 'fixed';
        iframe.style.top = '350px';
        iframe.style.left = '0';
        iframe.style.width = '300px';
        iframe.style.height = '300px';
        iframe.setAttribute('shown', '1');
        console.log("YouTube Music iframe detected and styled.");
    } else if (iframe.getAttribute('shown') === '1') {
        iframe.style.display = 'none';
        iframe.removeAttribute('shown');
        console.log("YouTube Music iframe hidden.");
    } else {
        console.log("No YouTube Music iframe detected.");
    }
}