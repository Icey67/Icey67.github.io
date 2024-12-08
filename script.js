var messages = [];

// Load messages from the JSON file
function loadMessages() {
    return fetch('messages.json')
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
        link.target = "_blank"; //makes link open in new tab hopefully
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
};

// tab stuff
function showSection(sectionId, element) {
    // Hide all sections
    document.querySelectorAll('.main').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-bar a').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to the clicked tab
    element.classList.add('active');
    
    // Move the tabbutton to the clicked tab
    const tabButton = document.querySelector('.tabbutton');
    tabButton.style.left = `${element.offsetLeft}px`;
    tabButton.style.width = `${element.offsetWidth}px`;

    // Save the last opened tab to sessionStorage
    sessionStorage.setItem('lastTab', sectionId);

    toggleTabMenu(); // Close the tab menu after clicking a tab
}

function toggleTabMenu() {
    var tabMenu = document.querySelector('.tab-bar');
    tabMenu.classList.toggle('active');
}

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


// auto start things
document.addEventListener('DOMContentLoaded', function() {
    console.warn("you nosy person, you");
    console.warn("close the gawddamn console");
    console.warn("unless you help making this site and need to debug");

    // Open the last opened tab
    var lastTab = sessionStorage.getItem('lastTab');
    if (lastTab) {
        // Find the corresponding tab element
        var lastTabElement = document.querySelector(`.tab-bar a[onclick="showSection('${lastTab}', this)"]`);
        if (lastTabElement) {
            // Open the last tab
            showSection(lastTab, lastTabElement);
        }
    } else {
        // Open the first tab
        console.warn('No last tab found, opening the default tab');
        showSection('home', document.querySelector('.tab-bar a[onclick="showSection(\'home\', this)"]'));
    }
    toggleTabMenu(); // Close the tab menu by default
    
    // funny switcheroo logo
    var mainLogo = '/media/IceyBanner.png'; // normal logo
    var switchLogo = '/media/IC67Banner.png'; // lore
    var randomLogo = Math.floor(Math.random() * 8);
    if (randomLogo == 0) {
        document.getElementById('logo').src = switchLogo;
        document.getElementById('logo').title = 'IC67';
        document.getElementById('logo').onclick = function() {
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');};
        } else {
            document.getElementById('logo').src = mainLogo;
        };
        
    // Loads the messages then Updates the footer message
    loadMessages().then(() => {
        updateFooterMessage(Math.floor(Math.random() * messages.length));
    });
});