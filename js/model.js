//Reference: https://github.com/soapdog/memos-for-firefoxos



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
    this.lockedAt = pad(d.getHours()) + ":" + pad(d.getMinutes()) + "&nbsp - &nbsp" + pad(d.getDate()) + "/" + pad(parseInt(d.getMonth())+1) + "/" + d.getFullYear();
}

function Interaction(id, lockedAt){
    this.id = id;
    this.lockedAt = lockedAt;

}

/*function getLastInteraction(inCallback) {
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
}*/