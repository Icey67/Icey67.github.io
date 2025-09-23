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

    var randomMessage = messages[index];
    var messageContainer = document.querySelector('.message-container');
    messageContainer.innerHTML = '';

    if (randomMessage.url) {
        var link = document.createElement('a');
        link.href = randomMessage.url;
        link.textContent = randomMessage.text;
        link.style.color = "white"; // Change the color if needed
        messageContainer.appendChild(link);
    } else {
        messageContainer.appendChild(document.createTextNode(randomMessage.text));
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
    loadMessages().then(() => {
        updateFooterMessage(Math.floor(Math.random() * messages.length));
    });

    // randomly load a function on a 6.7% chance
    if (Math.random() < 0.067) {
        iceysixtysevenfeature();

    } else {
        // log the math result
        console.log("didn't run the 6.7% feature, random number was " + (Math.random() * 100).toFixed(2));
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
        if (messages[i].func) {
            messageText += " HAS FUNC: " + messages[i].func + "'";
        }
        console.log(messageText);
    }
}

function iceysixtysevenfeature() {
    // redirect to the 1067 event page
    console.log("command ran")
    window.location.href = "/extras/old/index.html";
}