
const sampleData = [
    { name: "Magic Booster", sku: 1, quant: 50, price: 5 },
    { name: "Dragon Statue", sku:2, quant:4, price:40.50}
];

document.addEventListener('DOMContentLoaded', initialize);


//pulls basic info to display from database and inputs it
function initDisplay() {
    //let displayArea = document.getElementById("outputArea");
    let displayTable = document.getElementById("displayTable");


    //THIS NEEDS TO CHANGE WHEN WE ADD BACKEND
    for (item in sampleData) {
        console.log(item)
        let newRow = document.createElement("tr");
        let rowCol = document.createElement("td");
        rowCol.innerText = sampleData[item].name;
        newRow.append(rowCol);
        rowCol = document.createElement("td");
        rowCol.innerText = sampleData[item].sku;
        newRow.append(rowCol);
        rowCol = document.createElement("td");
        rowCol.innerText = sampleData[item].quant;
        newRow.append(rowCol);
        rowCol = document.createElement("td");
        rowCol.innerText = sampleData[item].price;
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
        displayTable.append(newRow);
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
}

//Initializes elements in html
function initialize() {
    initDisplay();
    document.addEventListener('click', clickCheck);
}