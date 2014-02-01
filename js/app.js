

var mainScreen, doorLockedScreen;


function backathome()
{
    mainScreen.style.visibility="visible";
    doorLockedScreen.style.visibility="hidden";
}
function lockthedoor(){
    mainScreen.style.visibility="hidden";
    doorLockedScreen.style.visibility="visible";
}

window.onload = function () {
    // elements that we're going to reuse in the code
    mainScreen = document.getElementById("main-screen");
    doorLockedScreen = document.getElementById("door-locked-screen");

    // All the listeners for the interface buttons and for the input changes
    document.getElementById("btn-lock-door").addEventListener("click", lockthedoor);
    document.getElementById("btn-come-back-home").addEventListener("click", backathome);

    // the entry point for the app is the following command
    backathome();

};