
//Data not stored here, just used to initialize some sample data
const sampleData = [
    { name: "Magic Booster", sku: 1, quant: 50, price: 5 },
    { name: "Dragon Statue", sku:2, quant:4, price:40.50}
];

const node_url = "http://flip1.engr.oregonstate.edu:3333/";

document.addEventListener('DOMContentLoaded', initialize);

function addItemRow(theTable, itemObj) {
    let newRow = document.createElement("tr");
    let rowCol = document.createElement("td");

    for (item in itemObj){
	rowCol.innerText = itemObj[item];
	newRow.append(rowCol);
	rowCol = document.createElement("td");
    }
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

async function clickCheck(event) {
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
	let post_req = {
	        method: 'POST',
	        headers: {'Content-Type': 'application/json' },
	        body : JSON.stringify({
		    type : "delete",
		    sku : event.srcElement.parentNode.parentNode.firstChild.innerText
		        })
	    }
	
	//console.log(event.srcElement.parentNode.parentNode.firstChild.innerText);

	let obj_res;
	let result_data = await fetch(node_url + "items", post_req).then(
	        (response) => response.json()).then(
		    (data) => {
			    obj_res = data;
			    console.log(obj_res);
			    //populate the table with this data
			    populate_items_table(obj_res);
			});
    }
    else if (event.srcElement.value == "Add New Item") {
       
	let post_req = {
	        method: 'POST',
	        headers: {'Content-Type': 'application/json' },
	        body : JSON.stringify({
		    type : "add",
		    sku: document.getElementById("newSku").value,
		    name : document.getElementById("newName").value,
		    quantity : document.getElementById("newQuant").value,
		    price : document.getElementById("newPrice").value
		})
	    }
	
	let obj_res;
	let result_data = await fetch(node_url + "items", post_req).then(
	    (response) => response.json()).then(
		(data) => {
		    obj_res = data;
		    //console.log(obj_res);
		    //populate the table with this data
		    populate_items_table(obj_res);
		});
    }
}

function populate_items_table(info_from_db){
    let the_table = document.getElementById("displayTable");
    
    let count_rows = the_table.children.length - 1;
   
    while (count_rows > 0){

	the_table.children[count_rows].remove();
	count_rows = count_rows - 1;
    }
    
    for (item in info_from_db){
	addItemRow(the_table, info_from_db[item]);
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
        let result_data = await fetch(node_url + "items", request).then(
        (response) => response.json()).then(
            (data) => {
            obj_res = data;
            console.log(obj_res);
            //populate the table with this data
            populate_items_table(obj_res);
            });
    //initDisplay();
    document.addEventListener('click', clickCheck);
}
