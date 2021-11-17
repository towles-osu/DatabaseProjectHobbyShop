//Data not stored here, just used to initialize some sample data
const sampleZones = [
    { name: "east", id: 1, desc: "This zone is the East quadrant of Portland" },
    { name: "west", id: 2, desc: "This zone is the West quadrant of Portland" },
    { name: "north", id: 3, desc: "This zone is the North quadrant of Portland" },
    { name: "south", id: 4, desc: "This zone is the South quadrant of Portland" },
    { name: "invalid", id: 5, desc: "This zone designates addresses as outside our delivery area" }
];

const node_url = "http://flip1.engr.oregonstate.edu:3333/";

//WIll be deleted, keeps track of zone ID's
let zoneCounter = 6;

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

async function clickCheck(event) {
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
    else if (event.srcElement.value == "Add New Zone") {
	//test request
	
	let post_req = {
	    method: 'POST',
	    headers: {'Content-Type': 'application/json' },
	    body : ""
	}
	
	let result = await fetch('http://flip1.engr.oregonstate.edu:3333/', post_req);
	
	/*let the_req = XMLHttpRequest();
	the_req.open('GET', '/', true);
	the_req.send();
*/
	let inputEl = event.srcElement.parentNode;
        console.log(inputEl.childNodes);
        let itemObj = {
            name: inputEl.childNodes[1].value,
            id: zoneCounter,
            desc: inputEl.childNodes[3].value,
        }
        zoneCounter++;
        addZoneRow(document.getElementById("zoneDisplayTable"), itemObj);
    }
    else if (event.srcElement.value == "change zone") {
        let srcBox = event.srcElement.parentNode;
        let zoneList = genZoneList();
        let selector = document.createElement("select");
        selector.name = "zone";
        for (zone in zoneList) {
            let newOpt = document.createElement("option");
            newOpt.value = zoneList[zone];
            newOpt.innerText = zoneList[zone];
            selector.append(newOpt)
        }
        srcBox.previousSibling.firstChild.remove();
        srcBox.previousSibling.append(selector);

        srcBox.firstChild.remove();
        let button = document.createElement("input");
        button.type = "button";
        button.value = "update zone"
        srcBox.append(button);
    }
    else if (event.srcElement.value == "update zone") {
        let srcBox = event.srcElement.parentNode;
        let curBox = srcBox.previousSibling;
        let newCon = curBox.firstChild;
        curBox.innerText = newCon.value;
        newCon.remove();

        srcBox.firstChild.remove();
        let button = document.createElement("input");
        button.type = "button";
        button.value = "change zone"
        srcBox.append(button);
    }
}


function genZoneList() {
    let zoneArr = [];
    let zoneTable = document.getElementById("zoneDisplayTable");

    for (index in zoneTable.childNodes) {
        if (zoneTable.childNodes[index].nodeName != "TR") {
            continue;
        }
        console.log(zoneTable.childNodes[index].childNodes);
        zoneArr.push(zoneTable.childNodes[index].childNodes[1].innerText);
    }
    return zoneArr;
}

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
}

//Pulls zone names and id's for filter drop down and populates
function initZoneFilter() {
    let zoneDropDown = document.getElementById('zoneFilt');
    for (index in sampleZones) {
        let newOption = document.createElement('option');
        newOption.value = sampleZones[index].id;
        newOption.innerText = sampleZones[index].name + " ("
            + sampleZones[index].id + ")";
        zoneDropDown.append(newOption);
    }
}

function populate_zone_table(info_from_db){
    let the_table = document.getElementById("zoneDisplayTable");
    
    for (item in info_from_db){
	addZoneRow(the_table, info_from_db[item]);
    }
}




//Initializes elements in html
async function initialize() {
    let body_req = {
	type: "displayAll"};
    let request = {
	method: 'POST',
	headers: {'Content-Type': 'application/json'},
	body: JSON.stringify(body_req) 
    }
    let obj_res;
    let result_data = await fetch(node_url + "zones", request).then(
	(response) => response.json()).then(
	    (data) => {
		obj_res = data;
		console.log(obj_res);
		//populate the table with this data
		populate_zone_table(obj_res);



	    });

//    let obj_res = result_data.json()
					  

//    result_data.then( (result) => {
//	console.log(result);
  //  });
    
    //sampleZones = result_data;
   /* const request2 = await fetch(node_url + 'zones', {
	method: 'POST',
	body: 'HELLO! WORLD CAN YOU SEE ME IN THE BODY SOMEWHERE!!!!!!!!!'
    });
*/

    initZoneFilter();
    document.addEventListener('click', clickCheck);
};
