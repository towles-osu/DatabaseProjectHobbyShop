//Data not stored here, just used to initialize some sample data
const sampleZones = [
    { name: "east", id: 1, desc: "This zone is the East quadrant of Portland" },
    { name: "west", id: 2, desc: "This zone is the West quadrant of Portland" },
    { name: "north", id: 3, desc: "This zone is the North quadrant of Portland" },
    { name: "south", id: 4, desc: "This zone is the South quadrant of Portland" },
    { name: "invalid", id: 5, desc: "This zone designates addresses as outside our delivery area" }
];

const sampleAddr = [
    { id: 1, address: "1234 NW Main St", city: "Portland", state: "OR", zip: "97236", unit: "", zone:2 },
    { id: 2, address: "4321 SW Broadway Ave", city: "Portland", state: "OR", zip: "97233", unit: "3", zone:4 }
];

document.addEventListener('DOMContentLoaded', initialize);

//Given a table and an address object adds a new row
function addAddressRow(theTable, itemObj) {
    let newRow = document.createElement("tr");

    //Go through six items in object
    for (field in itemObj) {
        let rowCol = document.createElement("td");
        rowCol.innerText = itemObj[field];
        newRow.append(rowCol);
    }
    let rowCol = document.createElement("td");
    let button = document.createElement("input");
    button.type = "button";
    button.value = "change zone";
    rowCol.append(button);
    newRow.append(rowCol);
    theTable.append(newRow);
    
};

function addZoneRow(theTable, itemObj) {
    let newRow = document.createElement("tr");

    for (field in itemObj) {
        let rowCol = document.createElement("td");
        rowCol.innerText = itemObj[field];
        newRow.append(rowCol);
    }
    let rowCol = document.createElement("td");
    let button = document.createElement("input");
    button.type = "button";
    button.value = "edit";
    rowCol.append(button);
    button = document.createElement("input");
    button.type = "button";
    button.value = "delete";
    rowCol.append(button);
    newRow.append(rowCol);
    theTable.append(newRow);
}

function clickCheck(event) {
    //console.log(event);
    if (event.srcElement.value == "edit") {
        let col = event.srcElement.parentNode;

        let row = col.parentNode;
        let curBox = row.firstChild;
        let newCon = document.createElement("input");
        newCon.type = "text";
        newCon.style = "width: 30px";
        newCon.value = curBox.innerText;
        curBox.innerText = "";
        curBox.append(newCon);

        curBox = curBox.nextSibling;
        newCon = document.createElement("input");
        newCon.type = "text";
        newCon.style = "width: 30px";
        newCon.value = curBox.innerText;
        curBox.innerText = "";
        curBox.append(newCon);

        curBox = curBox.nextSibling;
        newCon = document.createElement("input");
        newCon.type = "text";
        newCon.style = "width: 250px";
        newCon.value = curBox.innerText;
        curBox.innerText = "";
        curBox.append(newCon);

        col.firstChild.remove();
        col.firstChild.remove();
        newCon = document.createElement("input");
        newCon.type = "button";
        newCon.value = "save";
        col.append(newCon);

    }
    else if (event.srcElement.value == "save") {
        let col = event.srcElement.parentNode;

        let row = col.parentNode;
        let curBox = row.firstChild;
        let newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        curBox = curBox.nextSibling;
        newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        curBox = curBox.nextSibling;
        newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        curBox = curBox.nextSibling;
        newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        curBox = curBox.nextSibling;
        newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        curBox = curBox.nextSibling;
        newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        curBox = curBox.nextSibling;
        newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        curBox = curBox.nextSibling;
        newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        curBox = curBox.nextSibling;
        newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        curBox = curBox.nextSibling;
        newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        col.firstChild.remove();
        let button = document.createElement("input");
        button.type = "button";
        button.value = "edit";
        col.append(button);
        button = document.createElement("input");
        button.type = "button";
        button.value = "delete";
        col.append(button);

    }
    else if (event.srcElement.value == "delete") {
        event.srcElement.parentNode.parentNode.remove();

    }
    else if (event.srcElement.value == "Add New Row") {
        let inputEl = event.srcElement.parentNode;
        console.log(inputEl.childNodes);
        let itemObj = {
            firstName: inputEl.childNodes[1].value,
            lastName: inputEl.childNodes[3].value,
            phone: inputEl.childNodes[5].value,
            email: inputEl.childNodes[7].value,
            address: inputEl.childNodes[9].value,
            city: inputEl.childNodes[11].value,
            state: inputEl.childNodes[13].value,
            zip: inputEl.childNodes[15].value,
            unit: inputEl.childNodes[17].value
        }
        addTableRow(document.getElementById("displayTable"), itemObj);
    };
};

//pulls basic info to display from database and inputs it
function initDisplay() {
    //let displayArea = document.getElementById("outputArea");
    let displayTable = document.getElementById("zoneDisplayTable");

    for (zone in sampleZones) {
        addZoneRow(displayTable, sampleZones[zone]);
    };

    displayTable = document.getElementById("addressDisplayTable");

    for (addr in sampleAddr) {
        addAddressRow(displayTable, sampleAddr[addr]);
    };
};


//Initializes elements in html
function initialize() {
    initDisplay();
    document.addEventListener('click', clickCheck);
};