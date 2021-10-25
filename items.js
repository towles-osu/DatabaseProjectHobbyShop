
const sampleData = [
    { name: "Magic Booster", sku: 1, quant: 50, price: 5 },
    { name: "Dragon Statue", sku:2, quant:4, price:40.50}
];

document.addEventListener('DOMContentLoaded', initialize);


//pulls basic info to display from database and inputs it
function initDisplay() {
    let displayArea = document.getElementById("outputArea");
    let displayTable = document.createElement("table");
    displayArea.append(displayTable);

    //THIS NEEDS TO CHANGE WHEN WE ADD BACKEND
    for (item in sampleData) {
        console.log(item)
        let newRow = document.createElement("tr");
        newRow.innerText = sampleData[item].name;
        displayTable.append(newRow);
    }
}

//Initializes elements in html
function initialize() {
    initDisplay();
}