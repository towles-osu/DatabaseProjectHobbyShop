//Data not stored here, just used to initialize some sample data

const sampleData = [
    { firstName: "Fred", lastName: "Jones", phone: "9715551020", email: "fredj@gmail.com", cust_id: 1, 
    address: "1234 NW Main St", city: "Portland", state: "OR", zip: "97236", unit: "", add_id: 1},
    { firstName: "Mary", lastName: "Smith", phone: "9715553470", email: "marys@gmail.com", cust_id: 2, 
    address: "4321 SW Broadway Ave", city: "Portland", state: "OR", zip: "97233", unit: "3", add_id: 2}
];

//just for making fake data work.
let cust_id_count = 3;
let add_id_count = 3;

document.addEventListener('DOMContentLoaded', initialize);

function addTableRow(theTable, itemObj) {
    let newRow = document.createElement("tr");
    let rowCol = document.createElement("td");
    rowCol.innerText = itemObj.firstName;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.lastName;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.phone;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.email;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.cust_id;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.address;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.city;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.state;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.zip;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.unit;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = itemObj.add_id;
    newRow.append(rowCol);
    rowCol = document.createElement("td");
    rowCol.innerText = "Zone Filler";
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
};

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
    else if (event.srcElement.value == "Add New Customer and Address") {
        let inputEl = event.srcElement.parentNode;
        let itemObj = {
            firstName: inputEl.childNodes[1].value,
            lastName: inputEl.childNodes[3].value,
            phone: inputEl.childNodes[5].value,
            email: inputEl.childNodes[7].value,
            address: inputEl.childNodes[9].value,
            city: inputEl.childNodes[11].value,
            state: inputEl.childNodes[13].value,
            zip: inputEl.childNodes[15].value,
            unit: inputEl.childNodes[17].value,
            cust_id: cust_id_count,
            add_id: add_id_count
        };
        cust_id_count++;
        add_id_count++;
        addTableRow(document.getElementById("displayTable"), itemObj);
    }
    else if (event.srcElement.value == "Add New Customer") {
        let inputEl = event.srcElement.parentNode;
        let itemObj = {
            firstName: inputEl.childNodes[1].value,
            lastName: inputEl.childNodes[3].value,
            phone: inputEl.childNodes[5].value,
            email: inputEl.childNodes[7].value,
            address: "",
            city: "",
            state: "",
            zip: "",
            unit: "",
            cust_id: cust_id_count,
            add_id: inputEl.childNodes[9].value
        };
        cust_id_count++;
        addTableRow(document.getElementById("displayTable"), itemObj);
    }
    else if (event.srcElement.value == "Add New Address") {
        let inputEl = event.srcElement.parentNode;
        let itemObj = {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            address: inputEl.childNodes[3].value,
            city: inputEl.childNodes[5].value,
            state: inputEl.childNodes[7].value,
            zip: inputEl.childNodes[9].value,
            unit: inputEl.childNodes[11].value,
            cust_id: inputEl.childNodes[1].value,
            add_id: add_id_count
        };
        add_id_count++;
        addTableRow(document.getElementById("displayTable"), itemObj);
    }
}

//pulls basic info to display from database and inputs it
function initDisplay() {
    //let displayArea = document.getElementById("outputArea");
    let displayTable = document.getElementById("displayTable");

    //THIS NEEDS TO CHANGE WHEN WE ADD BACKEND
    for (customer in sampleData) {
        addTableRow(displayTable, sampleData[customer]);
    };
}


//Initializes elements in html
function initialize() {
    initDisplay();
    document.addEventListener('click', clickCheck);
};