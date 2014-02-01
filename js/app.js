

var mainScreen, doorLockedScreen, current_screen;


function backathome()
{
    if (!db) {
        // HACK:
        // this condition may happen upon first time use when the
        // indexDB storage is under creation and refreshMemoList()
        // is called. Simply waiting for a bit longer before trying again
        // will make it work.
        console.warn("Database is not ready yet");
        setTimeout(backathome, 100);
        return;
    }
    mainScreen.classList.remove("hidden");
    doorLockedScreen.classList.add("hidden");
    getLastInteraction(function(err, interaction){
        //console.log(interaction);
    })

}
function lockthedoor(){
    mainScreen.classList.add("hidden");
    doorLockedScreen.classList.remove("hidden");

    door = new DoorInteraction();
    saveInteraction(door, function () {
        console.log("Interaction saved!");
    });
    document.getElementById("label-time-ago").innerHTML = "You locked your door at: " + door.lockedAt;

    //setTimeout(backathome, 480000); // 8 hours
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