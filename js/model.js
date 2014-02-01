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
    this.lockedAt = Date.now();
}

function Interaction(id, lockedAt){
    this.id = id;
    this.lockedAt = lockedAt;
}

function saveInteraction(interaction, inCallback) {
    console.log("Saving...");
    var request = db.transaction(["mindthedoor"], "readwrite").objectStore("mindthedoor").put(interaction);

    request.onsuccess = function (event) {
        inCallback();
    };
}


function getLastInteraction(inCallback) {
    var objectStore = db.transaction("mindthedoor").objectStore("mindthedoor");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        var last_interaction;
        if (cursor) {
            last_interaction = new Interaction(cursor.value.id, cursor.value.lockedAt);
            cursor.continue(); 
        }
        inCallback(null, last_interaction);

    };
}