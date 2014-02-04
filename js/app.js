

var mainScreen, doorLockedScreen, current_screen;


function backathome()
{

    mainScreen.classList.remove("hidden");
    doorLockedScreen.classList.add("hidden");
    //getLastInteraction(function(err, interaction){
        //console.log(interaction);
    //})

}
function lockthedoor(){
    mainScreen.classList.add("hidden");
    doorLockedScreen.classList.remove("hidden");

    door = new DoorInteraction();
    document.getElementById("label-time-ago").innerHTML = "Last time locked: " + door.lockedAt;

    //setTimeout(backathome, 480000); // 8 hours
    //setTimeout(backathome, 5000); // 8 hours
}

window.onload = function () {
    // elements that we're going to reuse in the code
    mainScreen = document.getElementById("main-screen");
    doorLockedScreen = document.getElementById("door-locked-screen");

    // All the listeners for the interface buttons and for the input changes
    document.getElementById("btn-lock-door").addEventListener("click", lockthedoor);
    document.getElementById("btn-lock-door").addEventListener("tap", lockthedoor);
    document.getElementById("btn-come-back-home").addEventListener("click", backathome);
    document.getElementById("btn-come-back-home").addEventListener("tap", backathome);

    // the entry point for the app is the following command
    backathome();

};