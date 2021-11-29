
//Data not stored here, just used to initialize some sample data
const sampleData = [
    {purchaseNumber: "000001", customerID: 1, addressID: 1, sku: 'ARS5532D', quantity: 67, date: '2021-21-10', sent: 1, delivered: 'delivered'},
    {purchaseNumber: "000002", customerID: 2, addressID: 2, sku: '53TBHQ34', quantity: 5, date: '2021-22-10', sent: 0, delivered: 'n/a'}
];

const node_url = "http://flip3.engr.oregonstate.edu:4003/";

document.addEventListener('DOMContentLoaded', initialize);

function addSoldItemsRow(theTable, itemObj) {
    let newRow = document.createElement("tr");
    let rowCol = document.createElement("td");
    for (item in itemObj){
	rowCol.innerText = itemObj[item];
	newRow.append(rowCol);
	rowCol = document.createElement("td");
    }
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

function makeRowEditable(table_row){
    let dataBoxes = table_row.children;
    for (index in dataBoxes){
	if (dataBoxes[index].children && dataBoxes[index].children.length < 1 && index != 4 && index != 5){
	    dataBoxes[index].setAttribute("contenteditable", true);
	}
    }
}

async function clickCheck(event) {
    //console.log(event);
    if (event.srcElement.value == "edit") {
        event.srcElement.value = "save";
	let the_row = event.srcElement.parentNode.parentNode.children;
	event.srcElement.setAttribute("id", the_row[0].innerText + "@" + the_row[1].innerText);
	makeRowEditable(event.srcElement.parentNode.parentNode);
    }
    else if (event.srcElement.value == "save") {
        let src_row = event.srcElement.parentNode.parentNode.children;
        let split_index = event.srcElement.id.indexOf("@");
	if (split_index < 0){
	    console.log("No @ sign separating purch num and sku in request");
	}
	let req_body = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
		type: "update",
		purch_num : src_row[0].innerText,
		sku : src_row[1].innerText,
		date : src_row[2].innerText,
		quant : src_row[3].innerText,
		cust_id : src_row[4].innerText,
		add_id : src_row[5].innerText,
		sent : src_row[6].innerText,
		deliv : src_row[7].innerText,
		cur_purch_num : event.srcElement.id.slice(0, split_index),
		cur_sku : event.srcElement.id.slice(split_index + 1)
	    })
        };

        let result = await fetch(node_url + "solditems", req_body).then(
            (res) => {
            console.log(res);
            }).then((data) => {
                console.log(data);
                initialize();
            });
       
    }
    else if (event.srcElement.value == "delete") {
      let post_req = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json' },
                    body : JSON.stringify({
                        type: "delete",
                        purch_num : event.srcElement.parentNode.parentNode.firstChild.innerText,
                        sku : event.srcElement.parentNode.parentNode.firstChild.nextSibling.innerText
                    })};
        let obj_res;
        let result_data = await fetch(node_url + "solditems", post_req).then(
            (response) => response.json()).then(
                (data) => {
                    obj_res = data;
                    populate_solditems_table(obj_res);
                });


    }
    else if (event.srcElement.id == "skuSearch"){
	if (document.getElementById("filterSKU").value == ""){
            initialize();
        } else {
	    let post_req = {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body : JSON.stringify({
                    type: "filter",
                    filter : "sku",
                    condition : document.getElementById("filterSKU").value
                })};
            let obj_res;
            let result_data = await fetch(node_url + "solditems", post_req).then(
		(response) => response.json()).then(
                    (data) => {
			obj_res = data;
			populate_solditems_table(obj_res);
                    });
	}
    }
    else if (event.srcElement.id == "purchaseNumSearch"){
        if (document.getElementById("filterPurchaseNum").value == ""){
	    initialize();
	} else {
	    let post_req = {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body : JSON.stringify({
                    type: "filter",
                    filter : "purch_num",
                    condition : document.getElementById("filterPurchaseNum").value
                })};
            let obj_res;
            let result_data = await fetch(node_url + "solditems", post_req).then(
		(response) => response.json()).then(
                    (data) => {
			obj_res = data;
			populate_solditems_table(obj_res);
                    });
	}
    }
    else if (event.srcElement.value == "Add New Sale") {
	let post_req = {
	            method: 'POST',
	            headers: {'Content-Type': 'application/json' },
	            body : JSON.stringify({
			type: "add",
			purch_num : document.getElementById("newPurchaseNumber").value,
			sku : document.getElementById("newSku").value,
			date : document.getElementById("newDateSold").value,
			quant : document.getElementById("newQuantityOrdered").value,
			cust_id : document.getElementById("newCustId").value,
			add_id : document.getElementById("newAddId").value,
			sent : document.getElementById("newItemSent").value,
			deliv : document.getElementById("newItemDelivered").value
		    })};
	let obj_res;
	let result_data = await fetch(node_url + "solditems", post_req).then(
	    (response) => response.json()).then(
		(data) => {
		    obj_res = data;
		    populate_solditems_table(obj_res);
		});
					  

    }
}

function populate_solditems_table(info_from_db){
    let the_table = document.getElementById("displayTable");
    
    let count_rows = the_table.children.length - 1;
    while (count_rows > 0){

	the_table.children[count_rows].remove();
	count_rows = count_rows - 1;
    }

    for (item in info_from_db){
	addSoldItemsRow(the_table, info_from_db[item]);
    }
}

//sets valus in item drop down given the json data on items
function load_item_dropdown(items_obj, dropdown){
    let cur_option = document.createElement("option");
    console.log("loading item dropdown");
    for (item in items_obj) {
	cur_option.setAttribute("value", items_obj[item]['sku']);
	cur_option.innerText = items_obj[item]['item_name'] + '(' + items_obj[item]['sku'] + ')';
	dropdown.append(cur_option);
	cur_option = document.createElement("option");
    }

}

//sets values in customer drop down
function load_cust_dropdown(info_obj, dropdown){
    let cur_option = document.createElement("option");
    let list_cust_id = [];
    
    for (i in info_obj) {
	if (!(list_cust_id.includes(info_obj[i]['customer_id']))){
	    if(info_obj[i]['customer_id']){
		cur_option.setAttribute("value", info_obj[i]['customer_id']);
		list_cust_id.push(info_obj[i]['customer_id']);
		cur_option.innerText = info_obj[i]['first_name'] + ' ' + info_obj[i]['last_name'] + '(' + info_obj[i]['customer_id'] + ')';
		dropdown.append(cur_option);
		cur_option = document.createElement("option");
	    }
	}
    }
}

function load_add_dropdown(info_obj, dropdown){
    let cur_option = document.createElement("option");
    let list_add_id = [];

    for (i in info_obj) {

        if (!(list_add_id.includes(info_obj[i]['address_id']))){
            if (info_obj[i]['address_id']){
		cur_option.setAttribute("value", info_obj[i]['address_id']);
		list_add_id.push(info_obj[i]['address_id']);

		cur_option.innerText = info_obj[i]['street_address'] + '(' + info_obj[i]['address_id'] + ')';
		dropdown.append(cur_option);
		cur_option = document.createElement("option");
	    }
        }
    }
}

//populates each drop down by making a query to the database
async function update_dropdowns(){
    let sku_select = document.getElementById("newSku");
    let customer_select = document.getElementById("newCustId");
    let address_select = document.getElementById("newAddId");
    console.log("updating drop down");
    let item_req = {
	type: "displayAll"
    }
    let item_req_body = {
	method : 'POST',
	headers : {'Content-Type': 'application/json'},
	body : JSON.stringify(item_req)};
    let item_info;
    let item_result = await fetch(node_url + "items", item_req_body).then(
	(response) => response.json()).then(
	    (data) => {
		item_info = data;
		load_item_dropdown(item_info, sku_select);
	    });
    
    let cust_add_req = {
	type: "displayAll"
    }
    let cust_add_body = {
	method: 'POST',
	headers : {'Content-Type': 'application/json'},
	body : JSON.stringify(cust_add_req)};
    let cust_add_info;
    let cust_add_result = await fetch(node_url + "customers", cust_add_body).then(
	(response) => response.json()).then(
	    (data) => {
		cust_add_info = data;
		load_cust_dropdown(cust_add_info, customer_select);
		load_add_dropdown(cust_add_info, address_select);
	    });
    
}

//Initializes elements in html
async function initialize() {
    let body_req = {
        type: "displayAll"};
    let request = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body_req) 
    };
    let obj_res;
    let result_data = await fetch(node_url + "solditems", request).then(
        (response) => response.json()).then(
            (data) => {
		obj_res = data;
		console.log("returned object", obj_res);
		//populate the table with this data
		populate_solditems_table(obj_res);
	
            });
    console.log("about to update dropdown");
    update_dropdowns();
    //initDisplay();
    document.addEventListener('click', clickCheck);
}
