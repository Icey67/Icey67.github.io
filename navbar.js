const alert = document.getElementById('navbar-wip-banner');
const dismissAlertButton = document.getElementById('navbar-wip-dismiss');
if (sessionStorage.getItem("alert-dismissed") === "false") {
    alert.style.display = "inherit";
}

if (dismissAlertButton) {
    dismissAlertButton.addEventListener('click', event => {
        event.preventDefault();
        alert.style.display = "none";
        sessionStorage.setItem("alert-dismissed", "true");
    });
}
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem("alert-dismissed") === "true") {
        alert.style.display = "none";
    }
});
