
//Data not stored here, just used to initialize some sample data
const sampleData = [
    { name: "Magic Booster", sku: 1, quant: 50, price: 5 },
    { name: "Dragon Statue", sku:2, quant:4, price:40.50}
];

document.addEventListener('DOMContentLoaded', initialize);

function addTableRow(theTable, itemObj) {
    let newRow = document.createElement("tr");
    let rowCol = document.createElement("td");
    rowCol.innerText = itemObj.name;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.sku;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.quant;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.price;
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
    for (item in sampleData) {
        addTableRow(displayTable, sampleData[item]);
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
        newCon.type = "number";
        newCon.style = "width: 30px";
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
    else if (event.srcElement.value == "Add New Item") {
        let inputEl = event.srcElement.parentNode;
        console.log(inputEl.childNodes);
        console.log(inputEl.childNodes[1].value)
        let itemObj = {
            name: inputEl.childNodes[1].value,
            sku: inputEl.childNodes[3].value,
            quant: inputEl.childNodes[5].value,
            price: inputEl.childNodes[7].value
        }
        addTableRow(document.getElementById("displayTable"), itemObj);
    }
}

//Initializes elements in html
function initialize() {
    initDisplay();
    document.addEventListener('click', clickCheck);
}