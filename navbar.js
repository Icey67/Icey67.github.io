const alert = document.getElementById('navbar-wip-banner');
const dismissAlertButton = document.getElementById('navbar-wip-dismiss');
    if (localStorage.getItem("alert-dismissed") === "false") {
        alert.style.display = "inherit";
    }

    if (dismissAlertButton) {
        dismissAlertButton.addEventListener('click', event => {
            event.preventDefault();
            alert.style.display = "none";
            localStorage.setItem("alert-dismissed", "true");
        });
    }
