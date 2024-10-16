document.addEventListener('DOMContentLoaded', function() {
    //funny switcheroo logo
    var mainLogo = '/media/IceyBanner.png'; //og logo
    var altLogo = '/media/IC67.png'; //lore
    var randomNumber = Math.floor(Math.random() * 4); //randomly choose between 0-3 (25%)

    if (randomNumber === 0) {                           //it hits the gold mine
        document.getElementById('logo').src = altLogo;  //it's in
    }

    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeSwitch.checked = true;
    }

    themeSwitch.addEventListener('change', function() {
        if (themeSwitch.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
});

//random messages
//stuff for randomized footer
var messages = [
    { text: "i67's note 1: images are broken, i think." },
    { text: "AHAHHAHahHAHHahAHAHHHAAHAHAHHAAHHAHHAHH" },
    { text: "what is going on here?" },
    { text: "pro tip: refreshing this site changes this text. and maybe some other things too..." },
    { text: "pro tip: don't mine at night", url: "https://youtu.be/X_XGxzMrq04?si=20m4vGQfSjLz-gug" },
    { text: "well here we are again, it's always such a pleasure", url: "https://youtu.be/dVVZaZ8yO6o?si=CHhGSqs-l8mkj1UC" },
    { text: "someone made a note here: 'HUGE SUCCESS'", url: "https://youtu.be/SXRteMSSZ14?si=Xc8FZXwOpcVi-cHi" },
    { text: "i canNOT hold it in anymore, i just wanna- -you know?", url: "https://youtu.be/gixxZZOkBEA?si=viPryMoCR6jurSgy" },
    { text: "oobe says: please just log in with a microsoft account i swear we won't track you come on please!!11!1!" },
    { text: "oobe says: what do you mean you have no wifi drivers installed? you need them!" },
    { text: "oobe says: use our shit!" },
    { text: "oobe says: even better, use an online account!" },
    { text: "oobe says: please allow us to auto-import your data into our shitty browser we shove down your throat!" },
    { text: "oobe hates: ~$ oobe\\bypassnro" },
    { text: "someone's note: 'in soviet russia, website codes you.'" },
    { text: "¯\\_(ツ)_/¯" },
    { text: "oobe says: no, we won't give you an option to just skip the m$ account!!" },
    { text: "DISTRACTION!", url: "https://youtu.be/ZhFVt5uPdW0?si=zp1mZq--J5zImJ4B" },
    { text: "i67's note 2: when clicking links in this website, you better hold the middle mouse button, or else."},
    { text: "i67's update to note 1: the logo works, but the other images don't"},
    { text: "i67's second update to note 1: the images do work, just forgor to add files tho 💀"},
    { text: "i67's update to note 2: you don't need to do that anymore, links open in new tabs"},
    { text: "i67's note 3: lore coming soon(trademark)" },
    { text: "i67's update to note 3: trademark doesn't work properly in my brand font, it just looks like shit: ™"},
    { text: "micro$oft says: michaelsoft binbows is not real", url: "https://youtu.be/_xEMG_tt1Vc?si=tYjs93HMIC0UTvgw" },
    { text: "micro$oft says: we totally don't force you to buy a windows license, even though you can technically use it for free. wait that's illegal." },
    { text: "micro$oft says: read our terms and service agreement before you use windows!", url: "/extras/microsoftlicensing.html" },
    { text: "do you even read these?" },
    { text: "micro$oft says: if you don't buy our product, you are our product.²"},
    { text: "micro$oft replies to ²: THAT IS TOTALLY NOT OUR MOTTO!"},
    { text: "hello everybody my name is welcome- what?", url: "https://youtu.be/Ebuu7FhX4tc?si=inD6Jui89T15vz0Y" },
    { text: "yo i just got these new steel toed boots", url: "https://youtu.be/7QeLjy65OHY?si=VJyt4LZJgqAfukNi" },
    { text: "my name is kira yoshikage", url: "/extras/kirayoshikage.html" },
    { text: "i67's note 4: kira's speech is looped even though i set looping to false 😢" },
    { text: "DISTRACTION!", url:"https://youtu.be/XP_ZivuN6iY?si=sgEJOPF-iHD0C_Vf" },
    { text: "he turned himself into an angry sausage", url:"https://youtu.be/qaUSuh1ICJw?si=HkLq7H2Y1tJFVufn"},
    {text:"i67's update to note 4: nevermind i fixed it."},
    {text:"i67's second update to note 4: audio no worky in mobile ;-;"},
    {text:"i67's note 5: i think mobile view is broken"},
    {text:"i67's update to note 5: mobile view is fixed now"},
    {text:"i67's note 6: i need to stop adding notes"},
    {text:"i67's update to note 6: i can't stop adding notes"},
    {text:"i67's note 7: i'm running out of ideas for notes"},
    {text:"i67's update to note 7: i'm running out of ideas for updates"},
    {text: "i67's note 8: i want to add more memes."},
    {text: "what is something people are not ready to hear?", url: "https://youtu.be/YgH0_u0p-ls?si=1mZSr-IpWnDSOg9B"},
    {text: "i67's note 9: github copilot is becoming too smart it knows what memes are perfect to use in what context. it even makes suggestions for what i am writing literally right now please send help i cannot stop it omg omg omg"},
    {text: "It's impossible for pandas to be ...", url: "https://youtu.be/i2pvTq1EMlA?si=a0dlYRKLDwgyV-6n"},
    {text: "me washing my car with hydrochloric acid", url: "https://youtu.be/DTSaZ35pQW4?si=oNvt8FKf_fX_C7Ea"},
    {text: "DON'T DO IT MARCUS!", url: "https://youtu.be/iK4tgC7P810?si=MHPnRsB7u_2pYlZt"},
    {text: "I pet my antichrist", url: "https://youtu.be/DLu2CFDBJk0?si=SRNi816uVrp6E1No"},
    {text: "the resolution?", url: "https://youtu.be/bavdqHHK26I?si=66iByxoJv8PZujqu"},
    {text: "I'M GAY?!", url: "https://youtu.be/Ue46stbXhoU?si=mrKccUM04ETk59OU"},
    {text: "Will you press the button?", url: "https://youtu.be/5w7XXydxRVw?si=nsklWBEajHoCItaV"},
    {text: "micro$oft says: f*** you *installs ms-dos to your brain*", url: "https://youtu.be/Y2L7_2Wvycc?si=o-ukT-C8P7WuFc3M"},
    {text: "AHH- AAAHHH- AAAAAAHHHH- ... *scottish screaming*", url: "https://youtu.be/RpvLd901Wqs?si=CSvhfTOkzKWa0uia"},
    {text: "i think he was scared 😂", url: "https://youtu.be/vyE9eTvQBGg?si=aWEb7Dp7a3KbFX58"},
    {text: "i think they were scared 😂", url: "https://youtu.be/-B01ZLQl3_M?si=nCy9xCDMTU3UZ1_s"},
    {text: "if the earth is round, how come the ball ain't goin nowhere?", url: "https://youtu.be/2O0IQNiSoEk?si=kBpGNJSVdx0bAITO"},
    {text: "i see your comments ladies and they make me smile", url: "https://youtu.be/dppnGtEcf7k?si=-4xIh5o1pzCdpCo2"},
    {text: "kitty! what are you doing down here? did i not see you before?", url: "https://youtu.be/LqJXDOwxqIA?si=Tlskfb6OhVGTLKwi"},
    {text: "*electronic coughing*", url: "https://youtu.be/_zTzkWnKrKc?si=ps3M1QzZvTctfshC"},
    {text: "i think my cat broke", url: "https://youtu.be/Tc6qlEpDP_s?si=wnsueUEu8KDgvru0"},
    {text: "asmr", url: "https://youtu.be/jJVI5zKpLBs?si=hvX0H0JtWGY4_4Ff"},
    {text: "WOOOOWWW", url: "https://youtu.be/lkWidisTpYM?si=I8p_p_A84i0fvXMD"},
    {text: "number 2: expect this.", url: "https://youtu.be/nTtycUO25KY?si=PZMNTBzx9go5zdNV"},
    {text: "la creatura", url: "https://youtu.be/whnZSnW3XsI?si=Y966ghEyFG1X1e3y"},
    {text: "GUTEN TAG", url: "https://youtu.be/aH-ujno7zyo?si=E_Zy5TowJFwG2ev-"},
    {text: "beyblade beyblade let it DESTROY", url: "https://youtu.be/eE-t93TWsG0?si=tCe-kNsFR0U9Yvh8"},
    {text: "he had enough", url: "https://youtu.be/D2hro6Lq25U?si=sMCf5-a43-EKfOx8"},
    {text: "*CONFUSED SCREAMING*", url: "https://youtu.be/ytSVwETbZtI?si=iUtrnw11_SnP9gUA"},
    {text: "bomb has been planted", url: "https://youtu.be/3B6jWw7UoJo?si=LxXk4INuqtGMIiaw"},
    {text: "FREEWASP", url: "https://youtu.be/1cA9vUP5tiY?si=pEbGetfgGAC-W55x"},
    {text: "POV: Icey67/eveee00 90% of the time ", url: "https://youtu.be/RjJDCTgBJHA?si=yCnP2T-RYM95ELYw"}, /* even though we mostly use ai to code lmao (my brother is disappointed in me probably) -i67 */
    {text: "glueeeee", url: "https://youtu.be/kfH26ODWOhU?si=lKRFUgQr-GRWYzMy"},
    {text: "r/bossfight moment", url: "https://youtu.be/zrfmKu5VKxA?si=zY8klVSJeRBbeDxh"},
    {text: "yessss when they give me a shot i'm gonna go like PFEEEE-*BAM*", url: "https://www.youtube.com/watch?v=PdVSd9goqGM&t=10s"},
    {text: "mango on a fork", url: "https://youtu.be/P2D-AuFDnE0?si=xnRZTfx6HZ206WSi"},
    {text: "i67's update to note 8: i added more memes. and i am done for now."},
    {text: "i67's second update to note 8: this is literally me in the messages here (also i lied i am adding more memes)", url: "https://youtu.be/27i42Jb1bPc?si=KPZUIdEMSUBozqs8"},
    {text: "spray that makes you angry", url: "https://youtu.be/wQ0AdNxa118?si=gjn1lU9Jhz_sCMPv"},
    {text: "OMAE WA GONO NIJIMURA OKUYASU NO 'ZA HANDO' GA KESU", url: "https://youtu.be/OhE50kZqA2U?si=dASr18P2BQHI4-ZK"},
    {text: "number 15", url: "https://youtu.be/TmfVjjdBd3Y?si=abwTspyzaN2CdLy9"},
    {text: "eveee00 was here", font: "Fira Code"},
    {text: "you playin minecraft?", url: "https://youtu.be/zZtGTCVDMMw?si=muL0G1j3Pam6Ew7u"},
    {text: "WHAT IS GOING ON HERE?!", url: "https://youtu.be/ZDiltBbhnYI?si=z9L6tJHJ2gp-Zn8i&t=3"},
    {text: "i67's note 10: you know message 85? Jazza3904 contributed that one. Thanks!", url: "https://www.twitch.tv/jazza3904alt"},
    {text: "booting...", url: "https://icey67.github.io/webPOST", font: "OCR A"},
    {text: "something came into the mail today", url: "https://youtu.be/o5bldiDMdLQ?si=d-ND8LrPbnGffuTs&t=2"},
    {text: ":)", url: "/extras/mystery.html"},
    {text: "BIDOOF PRIME: ARCEUS' FEAR", url:"https://youtu.be/e1aAvWGPIJs"}
];

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
        messageContainer.style.fontSize = "1.5em";
    }
    console.log("message updated to: " + index);
// Example usage: updateFooterMessage(0); // This will update the footer with the first message
}
document.addEventListener('DOMContentLoaded', function() {
    updateFooterMessage(Math.floor(Math.random() * messages.length));
});

console.error("you nosy little shit, now close the console! >:3")
console.error("unless you contribute to coding and need to debug some stuff")

//tab stuff
document.addEventListener('DOMContentLoaded', function() {
    // Open the "info" tab by default
    openTab(null, 'info');

    // Check if there's a last opened tab stored in localStorage
    var lastTab = localStorage.getItem('lastTab');
    console.log('last tab from localStorage:', lastTab)
    if (lastTab) {
        openTab(null, lastTab);
    } else {
        console.error('No last tab found in localStorage.');
    }

    // Add event listeners to tab buttons to store the last opened tab
    var tablinks = document.getElementsByClassName('tablinks');
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].addEventListener('click', function(evt) {
            var cityName = evt.currentTarget.getAttribute('data-city');
            console.log('Clicked tab data-city:', cityName);
            localStorage.setItem('lastTab', cityName);
        });
    }
});

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    var tabElement = document.getElementById(tabName);
    if (tabElement) {
        tabElement.style.display = "block";
        if (evt) {
            evt.currentTarget.className += " active";
        } else {
            // Find the tab button and add the active class
            var activeButton = document.querySelector(`.tablinks[data-city="${tabName}"]`);
            if (activeButton) {
                activeButton.className += " active";
            }
        }
    }
    else {
        console.error(`Tab with ID ${tabName} does not exist.`);
    }

    toggleMenuOff()
}

function toggleMenu() {
    var tabs = document.querySelector('.tab');
    tabs.classList.toggle('active'); // Toggle the active class to show/hide tabs
}
function toggleMenuOff() {
    var tabs = document.querySelector('.tab');
    tabs.classList.remove('active'); // Remove the active class to hide tabs
}

// Retrieve the active tab from localStorage when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    var activeTab = localStorage.getItem('activeTab');
    if (activeTab) {
        openTab(null, activeTab);
        var activeButton = document.querySelector(`.tab button[onclick="openTab(event, '${activeTab}')"]`);
        if (activeButton) {
            activeButton.className += " active";
        }
    }
});