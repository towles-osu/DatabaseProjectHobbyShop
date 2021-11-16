-- Customers Table
CREATE TABLE Customers (
customer_id integer auto_increment,
first_name varchar(255) NOT NULL,
last_name varchar(255) NOT NULL,
phone_number varchar(20),
email varchar(255),
PRIMARY KEY(customer_id)
);


-- Address Table
CREATE TABLE Addresses (
address_id integer auto_increment,
street_address varchar(255) NOT NULL,
unit varchar(255),
city varchar(255),
state char(2) NOT NULL,
zip_code varchar(255) NOT NULL,
zone_id integer,
PRIMARY KEY(address_id)
);


-- Zones Table
CREATE TABLE Zones (
zone_id integer auto_increment,
zone_name varchar(255) NOT NULL,
zone_description varchar(255) NOT NULL,
PRIMARY KEY(zone_id)
);


-- Customer Addresses Relation Table
CREATE TABLE CustomerAddresses (
address_id integer NOT NULL,
customer_id integer NOT NULL,
PRIMARY KEY(address_id, customer_id)
);


-- Items Table
CREATE TABLE Items (
sku varchar(255) NOT NULL UNIQUE,
item_name varchar(255) NOT NULL,
quantity_available integer NOT NULL,
price decimal(6,2) NOT NULL,
PRIMARY KEY(sku)
);


-- Sold Items Table
CREATE TABLE SoldItems (
purchase_number varchar(255) NOT NULL,
sku varchar(255) NOT NULL,
date_sold date NOT NULL,
quantity_ordered integer NOT NULL,
customer_id integer NOT NULL,
address_id integer NOT NULL,
item_sent boolean,
item_delivered varchar(255),
PRIMARY KEY(purchase_number, sku)
);


-- Update Foreign Key Constraints
ALTER TABLE Addresses
ADD CONSTRAINT FOREIGN KEY (zone_id)
REFERENCES Zones (zone_id)
ON DELETE CASCADE;

ALTER TABLE CustomerAddresses
ADD CONSTRAINT FOREIGN KEY (address_id)
REFERENCES Addresses (address_id)
ON DELETE CASCADE,
ADD CONSTRAINT FOREIGN KEY (customer_id)
REFERENCES Customers (customer_id)
ON DELETE CASCADE;

ALTER TABLE SoldItems
ADD CONSTRAINT FOREIGN KEY (sku)
REFERENCES Items (sku)
ON DELETE CASCADE
ON UPDATE CASCADE,
ADD CONSTRAINT FOREIGN KEY (customer_id, address_id)
REFERENCES CustomerAddresses (customer_id, address_id)
ON DELETE CASCADE;


-- Insert Sample Data for Customers, Addresses, and Customer Addresses
INSERT INTO Customers (first_name, last_name, phone_number, email) 
VALUES ('Matt', 'Roberts', '1234567890', 'name@address.com');

INSERT INTO Addresses (street_address, unit, city, state, zip_code, zone_id)
VALUES ('12345 Main St', NULL, 'Portland', 'OR', '97078', NULL);

INSERT INTO CustomerAddresses (customer_id, address_id)
VALUES ((
SELECT customer_id
FROM Customers
ORDER BY customer_id DESC LIMIT 1
), 
(SELECT address_id
FROM Addresses
ORDER BY address_id DESC LIMIT 1
));

INSERT INTO Addresses (street_address, unit, city, state, zip_code, zone_id)
VALUES ('777 Lucky Ln', NULL, 'Beaverton', 'OR', '97015', NULL);

INSERT INTO CustomerAddresses (customer_id, address_id)
VALUES ((
SELECT customer_id
FROM Customers
ORDER BY customer_id DESC LIMIT 1
), 
(SELECT address_id
FROM Addresses
ORDER BY address_id DESC LIMIT 1
));

INSERT INTO Customers (first_name, last_name, phone_number, email) 
VALUES ('Stew', 'Towle', '9876543210', 'stew@gmail.com');

INSERT INTO Addresses (street_address, unit, city, state, zip_code, zone_id)
VALUES ('54321 Broadway St', '42', 'Portland', 'OR', '97006', NULL);

INSERT INTO CustomerAddresses (customer_id, address_id)
VALUES ((
SELECT customer_id
FROM Customers
ORDER BY customer_id DESC LIMIT 1
), 
(SELECT address_id
FROM Addresses
ORDER BY address_id DESC LIMIT 1
));

INSERT INTO Customers (first_name, last_name, phone_number, email) 
VALUES ('Stew\'s', 'Roomate', '5555555555', 'stew\'sfriend@gmail.com');

INSERT INTO CustomerAddresses (customer_id, address_id)
VALUES ((
SELECT customer_id
FROM Customers
ORDER BY customer_id DESC LIMIT 1
), 
(SELECT address_id
FROM Addresses
ORDER BY address_id DESC LIMIT 1
));


-- Insert Sample Data for Zones
INSERT INTO Zones (zone_name, zone_description)
VALUES ('north', 'The North Side'), ('south', 'The South Side'),
('east', 'The East Side'), ('west', 'The West Side'), ('invalid', 'Out of Range');


-- Insert Sample Data for Items
INSERT INTO Items (sku, item_name, quantity_available, price) 
VALUES ('mtgdd42', 'Forgetten Realms Booster Pack', 500, 4.50),
('mtgicv78', 'Innistrad Crimson Vow Booster Pack', 400, 5),
('sdrfi2323', 'Smaug Statue (Large)', 3, 250),
('sdfi1212', 'Smaug Statue (Small)', 20, 45.25),
('adigh1212', 'Wizard Statue (Medium)', 10, 100);


-- Insert Sample Data for SoldItems
INSERT INTO SoldItems (purchase_number, sku, date_sold, quantity_ordered, customer_id, address_id, item_sent, item_delivered)
VALUES ('PN00001', 'mtgicv78', '2021-11-04', 3, 1, 1, 1, 'en route'), 
('PN00001', 'sdrfi2323', '2021-11-05', 12, 2, 3, 0, 'processing'),
('PN00002', 'adigh1212', '2021-11-07', 1, 3, 3, 0, 'processing');


-- Update Zone IDs for Addresses
UPDATE Addresses SET zone_id = 1 WHERE address_id = 2;
UPDATE Addresses SET zone_id = 2 WHERE address_id = 1;