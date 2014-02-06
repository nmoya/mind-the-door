//Reference: https://github.com/soapdog/memos-for-firefoxos
//Door interaction constructor

function DoorInteraction() {
    function pad(number) {
        str = ''
        if(number < 10) str = "0" + number;
        else str = number;
        return str;
    }
    this.raw_time = Date.now();
    d = new Date();
    this.lockedAt = pad(d.getHours()) + ":" + pad(d.getMinutes()) + "&nbsp - &nbsp" + pad(d.getDate()) + "/" + pad(parseInt(d.getMonth()) + 1) + "/" + d.getFullYear();
}

function Interaction(id, lockedAt) {
    this.id = id;
    this.lockedAt = lockedAt;
}


//Work with cookies: https://github.com/carhartl/jquery-cookie#readme
function saveInteraction() {
    var name = "i1";    
    var DI = new DoorInteraction();
    var date = new Date();
    date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + DI + expires + "; path=/";
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