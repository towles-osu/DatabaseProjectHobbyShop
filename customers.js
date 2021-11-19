//Data not stored here, just used to initialize some sample data

const sampleData = [
    { firstName: "Fred", lastName: "Jones", phone: "9715551020", email: "fredj@gmail.com", cust_id: 1, 
    address: "1234 NW Main St", city: "Portland", state: "OR", zip: "97236", unit: "", add_id: 1},
    { firstName: "Mary", lastName: "Smith", phone: "9715553470", email: "marys@gmail.com", cust_id: 2, 
    address: "4321 SW Broadway Ave", city: "Portland", state: "OR", zip: "97233", unit: "3", add_id: 2}
];

const node_url = "http://flip3.engr.oregonstate.edu:4003/";

//just for making fake data work.
let cust_id_count = 3;
let add_id_count = 3;

document.addEventListener('DOMContentLoaded', initialize);

function addCustomerRow(theTable, itemObj) {
    let newRow = document.createElement("tr");
    let rowCol = document.createElement("td");

    for (item in itemObj) {
	rowCol.innerText = itemObj[item];
	newRow.append(rowCol);
	rowCol = document.createElement("td");
    }
    let button = document.createElement("input");
    button.type = "button";
    button.value = "delete";
    rowCol.append(button);
    newRow.append(rowCol);
    theTable.append(newRow);
};

async function clickCheck(event) {
   
    if (event.srcElement.value == "delete") {
        event.srcElement.parentNode.parentNode.remove();

    }
    else if (event.srcElement.value == "Add New Customer and Address") {
        let inputEl = event.srcElement.parentNode;
        let itemObj = {
            first_name: inputEl.childNodes[1].value,
            last_name: inputEl.childNodes[3].value,
            phone_number: inputEl.childNodes[5].value,
            email: inputEl.childNodes[7].value,
            street_address: inputEl.childNodes[9].value,
            city: inputEl.childNodes[11].value,
            state: inputEl.childNodes[13].value,
            zip_code: inputEl.childNodes[15].value,
            unit: inputEl.childNodes[17].value,
	    zone_id : document.getElementById("newZone").value,
	    type: "addCustAdd"
        };
       
       //Now make request
	let req_body = {
	    method: 'POST',
	    headers : {'Content-Type': 'application/json'},
	    body : JSON.stringify(itemObj)
	}
	let result_data = await fetch(node_url + "customers", req_body).then(
	    (response) => {
		console.log("response is", response);
		
	    }).then(
		() => initialize());
	
	
	
    }
    else if (event.srcElement.value == "Add New Customer") {
        let inputEl = event.srcElement.parentNode;
        let itemObj = {
            first_name: inputEl.childNodes[1].value,
            last_name: inputEl.childNodes[3].value,
            phone_number: inputEl.childNodes[5].value,
            email: inputEl.childNodes[7].value,
            address_id: document.getElementById("existingAddress").value,
	    type : "addCust"
        };
       
	//sending request
	let req_body = {
	    method : 'POST',
	    headers : {'Content-Type': 'application/json'},
	    body : JSON.stringify(itemObj)
	};
	let result_data = await fetch(node_url + "customers", req_body).then(
	    (response) => {
		return;}).then(() => initialize());
       
    }
    else if (event.srcElement.value == "Add New Address") {
        let inputEl = event.srcElement.parentNode;
        let itemObj = {
	    type : "addAdd",
            street_address: inputEl.childNodes[3].value,
            city: inputEl.childNodes[5].value,
            state: inputEl.childNodes[7].value,
            zip_code: inputEl.childNodes[9].value,
            unit: inputEl.childNodes[11].value,
	    zone_id : document.getElementById("newZone2").value,
	    customer_id : document.getElementById("existingCustomer").value
        };
	let result_data = await fetch(node_url + "customers", make_req_body(itemObj)).then(
	    (response) => {
		return;}).then(() => initialize());
       
    }
    else if (event.srcElement.value == "Add New Customer/Address Connection"){
	//this is where we deal with the insert new relationship stuff
	let req_obj = {
	    type : "addRelationship",
	    address_id : document.getElementById("existingAddress2").value,
	    customer_id : document.getElementById("existingCustomer2").value
	};
	let result_data = await fetch(node_url + "customers", make_req_body(req_obj)).then((response) => {
	    return;}).then(() => initialize());
    }
}

function make_req_body(body_obj){
    return {
	method: 'POST',
	headers: {'Content-Type': 'application/json'},
	body: JSON.stringify(body_obj)};
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

function populate_customer_table(info_from_db){
    let the_table = document.getElementById("displayTable");

    //clear any existing data before filling in data
    let count_rows = the_table.children.length -1;
    while(count_rows > 0){
	the_table.children[count_rows].remove();
	count_rows = count_rows - 1;
    }
    
    for (item in info_from_db){
	addCustomerRow(the_table, info_from_db[item]);
    }
}

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

function add_none_option(dropdown){
    let none_opt = document.createElement("option");
    none_opt.value = "";
    none_opt.innerText = "None";
    dropdown.append(none_opt);
}

function load_zone_dropdown(zone_info, dropdown){
    let cur_option = document.createElement("option");
    
    for (z in zone_info){
	cur_option.setAttribute("value", zone_info[z]["zone_id"]);
	cur_option.innerText = zone_info[z]["zone_name"] + "(" + zone_info[z]["zone_id"] + ")";
	dropdown.append(cur_option);
	cur_option = document.createElement("option");
    }
    cur_option.value = "";
    cur_option.innerText = "No Zone";
    dropdown.append(cur_option);
}

async function update_dropdowns(){
    //grab all the dropdowns that need to be populated
    let zone_select = document.getElementById("newZone");
    let zone_select2 = document.getElementById("newZone2");
    let customer_select = document.getElementById("existingCustomer");
    let customer_select2 = document.getElementById("existingCustomer2");
    let address_select = document.getElementById("existingAddress");
    let address_select2 = document.getElementById("existingAddress2");

    //clear any existing fields in the dropdowns
    zone_select.innerHTML = "";
    zone_select.innerHTML = "";
    customer_select.innerHTML = "";
    customer_select2.innerHTML = "";
    address_select.innerHTML = "";
    address_select2.innerHTML = "";

    //Grab zone data and populate zone data fields
    let zone_req = {
	type: "displayAll"};
    let zone_req_body = {
	method : 'POST',
	headers: {'Content-Type': 'application/json'},
	body : JSON.stringify(zone_req)};
    let zone_info;
    let zone_result = await fetch(node_url + "zones", zone_req_body).then(
	(response) => response.json()).then(
	    (data) => {
		zone_info = data;
		load_zone_dropdown(zone_info, zone_select);
		load_zone_dropdown(zone_info, zone_select2);
	    });

    let cust_add_body = {
	method: 'POST',
	headers: {'Content-Type': 'application/json'},
	body : JSON.stringify({type : "displayAll"})};
    let cust_add_info;
    let cust_add_result = await fetch(node_url + "customers", cust_add_body).then(
	(response) => response.json()).then(
	    (data) => {
		cust_add_info = data;
		load_cust_dropdown(cust_add_info, customer_select);
		load_cust_dropdown(cust_add_info, customer_select2);
		load_add_dropdown(cust_add_info, address_select);
		load_add_dropdown(cust_add_info, address_select2);
		add_none_option(customer_select);
		add_none_option(address_select);
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
        }
        let obj_res;
        let result_data = await fetch(node_url + "customers", request).then(
        (response) => response.json()).then(
            (data) => {
            obj_res = data;
            console.log(obj_res);
            //populate the table with this data
            populate_customer_table(obj_res);
            });
    update_dropdowns();
    //initDisplay();
    document.addEventListener('click', clickCheck);
};
