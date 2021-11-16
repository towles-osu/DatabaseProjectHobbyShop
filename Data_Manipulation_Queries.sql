-- Zones Page (Insert)
INSERT INTO Zones (zone_name, zone_description)
VALUES (:zoneNameAdd, :zoneDescriptionAdd);

-- Zones Page (Populate Table)
SELECT *
FROM Zones;

-- Zones Page (Filter)
SELECT *
FROM Addresses
WHERE zone_id = :zoneIDFilter;

-- Zones Page (Edit)
UPDATE Zones
SET zone_name = :zoneNameUpdate, zone_description = :zoneDescriptionUpdate
WHERE zone_id = :storedZoneID;

-- Zones Page (Delete)
DELETE FROM Zones
WHERE zone_id = :zoneIDDelete;

-- Items Page (Insert)
INSERT INTO Items (item_name, sku, quantity_available, price)
VALUES (:itemNameAdd, :skuAdd, :qAvailableAdd, :priceAdd);

-- Items Page (Populate)
SELECT *
FROM Items;

-- Items Page (Filter More)
SELECT *
FROM Items
WHERE quantity_available > :qFilter;

-- Items Page (Filter Less)
SELECT *
FROM Items
WHERE quantity_available < :qFilter;

-- Items Page (Edit)
UPDATE Items
SET item_name = :itemNameUpdate, sku = skuUpdate, quantity_available = qAvailableUpdate, price = priceUpdate
WHERE sku = :storedSKU;

-- Items Page (Delete)
DELETE FROM Items
WHERE item_id = :itemIDDelete

-- Customer Page (Insert Customer + Address)
INSERT INTO Customers (first_name, last_name, phone_number, email) 
VALUES (:fNameAddAll, :lNameAddAll, :phoneAddAll, :emailAddAll);

INSERT INTO Addresses (street_address, unit, city, state, zip_code, zone_id)
VALUES (:streetAddAll, :unitAddAll, :cityAddAll, :stateAddAll, :zipAddAll, :zoneAddAll);

-- Fetches the most recent entries to link them together in relational entity
INSERT INTO CustomerAddresses (customer_id, address_id)
VALUES ((
SELECT customer_id
FROM Customers
ORDER BY customer_id DESC LIMIT 1
), 
(
SELECT address_id
FROM Addresses
ORDER BY address_id DESC LIMIT 1
));

-- Customer Page (Insert Customer Only)
INSERT INTO Customers (first_name, last_name, phone_number, email) 
VALUES (:fNameAdd, :lNameAdd, :phoneAdd, :emailAdd);

INSERT INTO CustomerAddresses (customer_id, address_id)
VALUES ((
SELECT customer_id
FROM Customers
ORDER BY customer_id DESC LIMIT 1
), 
:addressIDAdd);

-- Customer Page (Insert Address Only)
INSERT INTO Addresses (street_address, unit, city, state, zip_code, zone_id)
VALUES (:streetAdd, :unitAdd, :cityAdd, :stateAdd, :zipAdd, :zoneAdd);

INSERT INTO CustomerAddresses (customer_id, address_id)
VALUES (
:customerIDADD,
(
SELECT address_id
FROM Addresses
ORDER BY address_id DESC LIMIT 1
));

-- Customer Page (Populate Table)
SELECT C.first_name, C.last_name, C.phone_number, C.email, C.customer_id,
A.street_address, A.city, A.state, A.zip_code, A.unit, A.address_id, Z.zone_id
FROM Customers C
JOIN CustomerAddresses CA ON C.customer_id = CA.customer_id
JOIN Addresses A ON CA.address_id = A.address_id
LEFT JOIN Zones Z ON A.zone_id = Z.zone_id;

-- Customer Page (Filter First Names)
SELECT C.first_name, C.last_name, C.phone_number, C.email, C.customer_id,
A.street_address, A.city, A.state, A.zip_code, A.unit, A.address_id, Z.zone_id
FROM Customers C
JOIN CustomerAddresses CA ON C.customer_id = CA.customer_id
JOIN Addresses A ON CA.address_id = A.address_id
LEFT JOIN Zones Z ON A.zone_id = Z.zone_id
WHERE C.first_name = :nameFilter;

-- Customer Page (Filter Last Names)
SELECT C.first_name, C.last_name, C.phone_number, C.email, C.customer_id,
A.street_address, A.city, A.state, A.zip_code, A.unit, A.address_id, Z.zone_id
FROM Customers C
JOIN CustomerAddresses CA ON C.customer_id = CA.customer_id
JOIN Addresses A ON CA.address_id = A.address_id
LEFT JOIN Zones Z ON A.zone_id = Z.zone_id
WHERE C.last_name = :nameFilter;

-- Customer Page (Filter Address)
SELECT C.first_name, C.last_name, C.phone_number, C.email, C.customer_id,
A.street_address, A.city, A.state, A.zip_code, A.unit, A.address_id, Z.zone_id
FROM Customers C
JOIN CustomerAddresses CA ON C.customer_id = CA.customer_id
JOIN Addresses A ON CA.address_id = A.address_id
LEFT JOIN Zones Z ON A.zone_id = Z.zone_id
WHERE A.street_address = :streetFilter;

-- Customer Page (Edit)
UPDATE Customers
SET first_name = :fNameUpdate, last_name = :lNameUpdate, 
phone_number = :phoneUpdate, email = :emailUpdate
WHERE customer_id = :storedCustomerID;

UPDATE Addresses
SET street_address = :streetAddressUpdate, unit = :unitUpdate, city = :cityUpdate, 
state = :stateUpdate, zip_code = :zipCodeUpdate, zone_id = :zoneIDUpdate
WHERE address_id = :storedAddressID

-- Customer Page (Delete)
DELETE FROM CustomerAddresses
WHERE customer_id = :customerID AND address_id = :addressID;

-- Sold Items Page (Edit)
UPDATE SoldItems
SET purchase_num = :purchNumVar, sku = :skuVar,
date_sold = :saleDateVar, quantity_ordered = :quantityVar,
customer_id = :customerIdVar, address_id = :addressIdVar,
item_sent = :ifSentBool, item_delivered = :ifSentBool
WHERE purchase_num = :storedPurchNumVar AND
sku = :storedSkuVar;
-- Query for adding SoldItems on the Sold Items Page
-- Variable names that start with ":" represent variables
-- that are values provided by the node/webpage interaction
INSERT INTO SoldItems
VALUES (:purchaseNum, :skuRef, :dateOfSale, :quantityOrdered, :customerIdRef, :addressIdRef, :ifSentBool, :ifDeliveredBool);

-- Sold Items Page (Filter SKU)
SELECT * FROM SoldItems
WHERE sku = :desiredSku;

-- Sold Items Page (Filter Date Sold)
SELECT * FROM SoldItems
WHERE date_sold = :saleDateRequested;

-- Sold Items Page (Filter Purchase Number)
SELECT * FROM SoldItems
WHERE purchase_number = :desiredPurchaseNum;

-- Sold Items Page (Populate Table)
SELECT * FROM SoldItems;

-- Sold Items Page (Edit)
UPDATE SoldItems
SET purchase_num = :purchNumVar, sku = :skuVar,
date_sold = :saleDateVar, quantity_ordered = :quantityVar,
customer_id = :customerIdVar, address_id = :addressIdVar,
item_sent = :ifSentBool, item_delivered = :ifSentBool
WHERE purchase_num = :storedPurchNumVar AND
sku = :storedSkuVar;

-- Sold Items Page (Delete)
DELETE FROM SoldItems
WHERE purchase_num = :storedPurchNumVar AND
sku = :storedSkuVar;