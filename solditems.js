
//Data not stored here, just used to initialize some sample data
const sampleData = [
    {purchaseNumber: "000001", customerID: 1, addressID: 1, sku: 'ARS5532D', quantity: 67, date: '2021-21-10', sent: 1, delivered: 'delivered'},
    {purchaseNumber: "000002", customerID: 2, addressID: 2, sku: '53TBHQ34', quantity: 5, date: '2021-22-10', sent: 0, delivered: 'n/a'}
];

const node_url = "http://flip1.engr.oregonstate.edu:3333/";

document.addEventListener('DOMContentLoaded', initialize);

function addSoldItemsRow(theTable, itemObj) {
    let newRow = document.createElement("tr");
    let rowCol = document.createElement("td");
    rowCol.innerText = itemObj.purchaseNumber;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.customerID;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.addressID;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.sku;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.quantity;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.date;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.sent;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.delivered;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
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


//pulls basic info to display from database and inputs it
function initDisplay() {
    //let displayArea = document.getElementById("outputArea");
    let displayTable = document.getElementById("displayTable");


    //THIS NEEDS TO CHANGE WHEN WE ADD BACKEND
    for (sale in sampleData) {
        addTableRow(displayTable, sampleData[sale]);
    }
}

function clickCheck(event) {
    //console.log(event);
    if (event.srcElement.value == "edit") {
        let col = event.srcElement.parentNode;

        let row = col.parentNode;
        let curBox = row.firstChild;
        let newCon = document.createElement("input");
        newCon.type = "text";
        newCon.style = "width: 100px";
        newCon.value = curBox.innerText;
        curBox.innerText = "";
        curBox.append(newCon);

        curBox = curBox.nextSibling;
        newCon = document.createElement("input");
        newCon.type = "number";
        newCon.style = "width: 75px";
        newCon.value = curBox.innerText;
        curBox.innerText = "";
        curBox.append(newCon);

        curBox = curBox.nextSibling;
        newCon = document.createElement("input");
        newCon.type = "number";
        newCon.style = "width: 75px";
        newCon.value = curBox.innerText;
        curBox.innerText = "";
        curBox.append(newCon);

        curBox = curBox.nextSibling;
        newCon = document.createElement("input");
        newCon.type = "text";
        newCon.style = "width: 100px";
        newCon.value = curBox.innerText;
        curBox.innerText = "";
        curBox.append(newCon);

        curBox = curBox.nextSibling;
        newCon = document.createElement("input");
        newCon.type = "number";
        newCon.style = "width: 75px";
        newCon.value = curBox.innerText;
        curBox.innerText = "";
        curBox.append(newCon);

        curBox = curBox.nextSibling;
        newCon = document.createElement("input");
        newCon.type = "text";
        newCon.style = "width: 80px";
        newCon.value = curBox.innerText;
        curBox.innerText = "";
        curBox.append(newCon);

        curBox = curBox.nextSibling;
        newCon = document.createElement("input");
        newCon.type = "number";
        newCon.style = "width: 30px";
        newCon.value = curBox.innerText;
        curBox.innerText = "";
        curBox.append(newCon);

        curBox = curBox.nextSibling;
        newCon = document.createElement("input");
        newCon.type = "text";
        newCon.style = "width: 100px";
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
    else if (event.srcElement.value == "Add New Sale") {
        let inputEl = event.srcElement.parentNode;
        console.log(inputEl.childNodes);
        console.log(inputEl.childNodes[1].value)
        let soldObj = {
            purchaseNumber: inputEl.childNodes[1].value,
            customerID: inputEl.childNodes[3].value,
            addressID: inputEl.childNodes[5].value,
            sku: inputEl.childNodes[7].value,
            quantity: inputEl.childNodes[9].value,
            date: inputEl.childNodes[11].value,
            sent: inputEl.childNodes[13].value,
            delivered: inputEl.childNodes[15].value
        }
        addTableRow(document.getElementById("displayTable"), soldObj);
    }
}

function populate_solditems_table(info_from_db){
    let the_table = document.getElementById("displayTable");
    
    for (item in info_from_db){
	addSoldItemsRow(the_table, info_from_db[item]);
    }
}

//Initializes elements in html
function initialize() {
    let body_req = {
        type: "displayAll"};
        let request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body_req) 
        }
        let obj_res;
        let result_data = await fetch(node_url + "solditems", request).then(
        (response) => response.json()).then(
            (data) => {
            obj_res = data;
            console.log(obj_res);
            //populate the table with this data
            populate_zone_table(obj_res);
            });
    //initDisplay();
    document.addEventListener('click', clickCheck);
}