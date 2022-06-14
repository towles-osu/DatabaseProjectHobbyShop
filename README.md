# DatabaseProjectHobbyShop

## Contributors
- Stewart Towle
- Matthew Roberts (mrobert09 / robertm8)

## Technologies Used
- Javascript
- Express
- CSS
- HTML
- MariaDB
- SQL

## Project Overview
**The database backend is shut-down because the term ended**, but this repository contains a basic database backend and frontend. The following is the hypothetical scenario that the database was created for:

  *The Portland Hobby Shop* is a traditional storefront business that sells nerdy collectibles
such as miniatures, trading cards, and comics. In our imagined situation the problem is
storefront sales shutting down at the start of COVID and the hobby shop setting up a new
system to allow customers to get items they order online (which used to just get held in the shop
for them) to be delivered to their homes. The shop has an existing website, and an existing
database of customers and membership (customers can become members to get discounts),
but no system for ordering online for delivery. In the first month or two of COVID they were just
going through all the orders one by one and free-hand making a delivery plan. The owners have
purchased two vans for delivering and plan to divide the city into zones (starting with four zones,
but maybe changing in the future) and running deliveries grouped by zone on predetermined
days now. They want to be able to process customer info, order info and delivery info all in one
web hosted database so they can streamline the process. They also want to be able to use this
database for tracking customer addresses.

  Deliveries go out to the North and South zones on Mondays, and East and West zones
on Thursdays. If there is not enough time to deliver to every address in a zone additional runs
are made on the day(s) following the regular delivery day. *The Portland Hobby Shop* has
roughly 25,000 customers, and does not expect to gain more than 10,000 more additional
customers anytime soon, but wants to be prepared for this scenario. The website already has
an online purchase form, but needs a DB back-end web system for the employees to use to
process orders and generate delivery lists for the regularly scheduled delivery runs. They also
need to alter the online order form to accommodate the new system, however while that system
may interact with ours, they aren’t hiring us to set up the order form, but have guaranteed that
the order form they set up will provide us with individual item-by-item sales information and want
our database to be able to provide info on inventory to the order form. Furthermore they have
guaranteed that each order will have a unique purchase number. The company expects to
receive between 200 and 1,000 orders a week (but they want to be ready in case this spikes
higher with the reality of COVID). The shop only serves the Portland Metro Area, and will not
allow orders from customers who do not have a local address. The company may add
additional delivery runs if demand increases as well, so the database will be helpful in dealing
with that too.

  We will use the database to keep track of items sold and whether they have been
delivered so we can write a simple script to query what inventory items need to be loaded into
our delivery vehicles according to the zone, what addresses within that zone are to be delivered
which of those items, and who at these addresses the deliveries are for. The database will also
be used to store information on orders placed and to keep track of inventory.
In summary, the web front-end we make will be for the managers to use to facilitate
deliveries. The main interactions it is used for are: creating delivery manifests for the drivers,
inputting the results of the deliveries (drivers check boxes and fill out fields in their delivery
manifests as they go, and this is used to determine what info to input), and keeping track of
product availability. We are not making the order form, but our database will be used in this,
and we are defining the schema and protocol for doing so.

## Database Outline
<ol>
  <li>Customers: represents individual people who are customers of our shop.</li>
  <ol>
    <li>*customer_id (INT, starting from 1, incrementing by 1 each time)</li>
    <li>first_name (varchar, not NULL)</li>
    <li>last_name (varchar, not NULL)</li>
    <li>phone_number (varchar(10), can be NULL)</li>
    <li>email (varchar, can be NULL)</li>
    <li>Relationships:</li>
    <ol>
      <li>M:M with Addresses, resolved with..</li>
      <ul>
        <li>1:M with relation table CustomersAddresses which has customer_id as a FK</li>
      </ul>
    </ol>
  </ol>
 <br>
  <li>Addresses: represents addresses that we deliver to (or addresses outside of our delivery area, which will not be able to order for delivery)</li>
  <ol>
    <li>*address_id (INT, starting from 1, incrementing by 1 each time)</li>
    <li>street_address (varchar, not NULL)</li>
    <li>unit (varchar, can be NULL)</li>
    <li>city (varchar, not NULL)</li>
    <li>state (char(2), not NULL)</li>
    <li>zip_code (varchar, not NULL)</li>
    <li>zone_id (INT FK, can be NULL if zone of the address has not yet been determined)</li>
    <li>Relationships:</li>
    <ol>
      <li>M:M with Customers, resolved with..</li>
      <ul>
        <li>1:M with relation table CustomersAddresses which has address_id as a FK</li>
      </ul>
      <li>1:M Zones to Addresses</li>
    </ol>
  </ol>
 <br>
  <li>Zones: represents delivery zones that we use to group deliveries.</li>
  <ol>
    <li>*zone_id (INT, auto-incrementing, starts from 1)</li>
    <li>zone_name (varchar that should either be the name of a current zone [“east”,”west”,”north”,”south”], or “invalid” which is for addresses that are outside of our delivery range, not NULL)</li>
    <li>zone_description (varchar, not NULL, this is where the company writes a description of what is considered part of this zone. Addresses with NULL zone_id attributes are manually given Zones by a manager, so this note is to guide the manager in determining if an address is part of the given zone)</li>
    <li>Relationships:</li>
    <ol>
      <li>1:M with Addresses</li>
    </ol>
  </ol>
 <br>
  <li>CustomerAddresses: represents the relationship between Customers and Addresses</li>
  <ol>
    <li>*address_id (INT, not NULL, FK)</li>
    <li>*customer_id (INT, not NULL, FK)</li>
    <li>Relationships:</li>
    <ol>
      <li>1:M Customers to CustomerAddresses</li>
      <li>1:M Addresses to CustomerAddresses</li>
      <li>M:M CustomerAddresses to Items, resolved with..</li>
      <ul>
        <li>1:M CustomerAddresses to SoldItems</li>
      </ul>
    </ol>
  </ol>
 <br>
  <li>Items: represents things that we sell. Can be any type of inventory item such as a comic book, trading card, collectible or miniature.</li>
  <ol>
    <li>*sku (varchar, not NULL, UNIQUE)</li>
    <li>item_name (varchar, not NULL)</li>
    <li>quantity_available (int, not NULL)</li>
    <li>price (decimal [6,2], not NULL)</li>
    <li>Relationships:</li>
    <ol>
      <li>M:M with CustomerAddresses, resolved with..</li>
      <ul>
        <li>1:M with SoldItems</li>
      </ul>
    </ol>
  </ol>
 <br>
  <li>SoldItems [Composite Entity]: represents the meeting point of the many-to-many relationship between items and customers. Used to track the purchase and delivery of individual items to individual customers.</li>
  <ol>
    <li>*purchase_number (varchar, not NULL)</li>
    <li>*sku (Foreign key, varchar, not NULL)</li>
    <li>date_sold (date, not NULL)</li>
    <li>quantity_ordered (int [must be ≥ 1], not NULL)</li>
    <li>customer_id (Foreign key, int, not NULL)</li>
    <li>address_id (FK, INT, not NULL)</li>
    <li>item_sent (boolean, can be NULL)</li>
    <li>item_delivered (varchar, can be NULL, example entries: “delivered”, “en route” or “unable to deliver”)</li>
    <li>Relationships:</li>
    <ol>
      <li>1:M SoldItems to Items</li>
      <li>M:M with Customers and Addresses, resolved with..</li>
      <ul>
        <li>1:M CustomerAddresses to SoldItems</li>
      </ul>
    </ol>
  <li>SPECIAL NOTE: address_id and customer_id are a composite foreign key where the id’s come from Customers and Addresses entities, but that point to the composite entity of CustomerAddresses</li>
  <li>SPECIAL NOTE: The primary key is the composite key of the purchase number (which is guaranteed to be unique to a given order, though the order processing is outside our database scope) and the sku (which is guaranteed to be unique to an item)</li>
  </ol>
</ol>
<br>
