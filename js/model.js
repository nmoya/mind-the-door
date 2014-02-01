//Reference: https://github.com/soapdog/memos-for-firefoxos

var dbName = "mindthedoor";
var dbVersion = 2;

var db;
var request = indexedDB.open(dbName, dbVersion);

request.onerror = function (event) {
    console.error("Database could not be opened", event);
};
request.onsuccess = function (event) {
    console.log("Database OK");
    db = event.target.result;
};

request.onupgradeneeded = function (event) {

    console.log("Running onUpgradeNeeded");

    db = event.target.result;

    if (!db.objectStoreNames.contains("mindthedoor")) {

        console.log("Creating objectStore for mindthedoor");

        var objectStore = db.createObjectStore("mindthedoor", {
            keyPath: "id",
            autoIncrement: true
        });
        objectStore.createIndex("lockedAt", "lockedAt", {
            unique: false
        });

        console.log("Adding sample memo");
        var sample = new DoorInteraction();

        objectStore.add(sample);
    }
};

//Door interaction constructor
function DoorInteraction(){
    function pad(number){
        str = ''
        if (number < 10)
            str = "0" + number;
        else
            str = number;
        return str;
    }
    this.raw_time = Date.now();
    d = new Date();
    this.lockedAt = pad(d.getHours()) + ":" + pad(d.getMinutes()) + " &nbsp - &nbsp" + pad(d.getDate()) + "/" + pad(d.getMonth()) + "/" + d.getFullYear();
}

function Interaction(id, lockedAt){
    this.id = id;
    this.lockedAt = lockedAt;

}

function saveInteraction(interaction, inCallback) {
    var request = db.transaction(["mindthedoor"], "readwrite").objectStore("mindthedoor").put(interaction);

    request.onsuccess = function (event) {
        inCallback(interaction);
    };
}


function getLastInteraction(inCallback) {
    var objectStore = db.transaction("mindthedoor").objectStore("mindthedoor");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        var last_interaction = new Interaction(0, 0);
        if (cursor) {
            last_interaction = new Interaction(cursor.value.id, cursor.value.lockedAt);
            cursor.continue(); 
        }
        //console.log("last_interaction: " + last_interaction.lockedAt);
        inCallback(null, last_interaction);
    };
}