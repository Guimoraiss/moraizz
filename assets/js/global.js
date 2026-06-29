const themeToggleButton = document.querySelector("#theme-toggle")

function togglemode() {
 document.documentElement.classList.toggle("lightmode")
}

if (themeToggleButton) {
 themeToggleButton.addEventListener("click", togglemode)
}
