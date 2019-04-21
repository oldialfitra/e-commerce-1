# e-commerce

## Product Route
**Note:**  <br>*  *is required*
 HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 POST | <span style="color:red">/products</span> | *token | *name, *price, featured_image, *amount | Status: 201<br>Object{_id, name, price, featured_image, author, amount, createdAt, updatedAt} | Status: 400<br>Object { message: `Name required` }<br>Status: 400<br>Object { message: `Price required` }<br>Status: 400<br>Object { message: `Amount required` }Status: 401<br>Object { message: `You are not Authorized` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Create a product
 GET | <span style="color:red">/products</span> |  |  | Status: 200<br>[Object{_id, name, price, featured_image, author, amount, createdAt, updatedAt}] | Status: 500<br>Object { message: `Internal Server Error`, err } | All products
 GET | <span style="color:red">/products/:id</span> | *token |  | Status: 200<br>[Object{_id, name, price, featured_image, author, amount, createdAt, updatedAt}] | Status: 500<br>Object { message: `Internal Server Error`, err } | One product based on product's id
 PUT | <span style="color:red">/products/:id</span> | *token | *name, *price, featured_image, *amount | Status: 200<br>Object{_id, name, price, featured_image, author, amount, createdAt, updatedAt} | Status: 400<br>Object { message: `Name required` }<br>Status: 400<br>Object { message: `Price required` }<br>Status: 400<br>Object { message: `Amount required` }Status: 401<br>Object { message: `You are not Authorized` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Update a product
 DELETE | <span style="color:red">/products/:id</span> | *token |  | Status: 200<br>Object{_id, name, price, featured_image, author, amount, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Delete a product

<br>

## Users Route
**Note:**  *  *is required*
 HTTP | Router | Body | Success | Error | Description
------|--------|------|---------|-------|------------
 POST | <span style="color:red">/users/signin</span> |  *email, *password | Status: 200<br>Object{token, id, createdAt, updatedAt} | Status: 400<br>Object { message: `email / password wrong` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Sign In User  
 POST | <span style="color:red">/users/signup</span> |  *email, *password, *name, *address, *city, *cityId, *role | Status: 201<br>Object{_id, user, list, createdAt, updatedAt} | Status: 400<br>Object { message: `Email required` }<br>Status: 400<br>Object { message: `Password required` }<br> Status: 400<br>Object { message: `Name required` }<br> Status: 400<br>Object { message: `Address required` }<br> Status: 400<br>Object { message: `City required` }<br> Status: 400<br>Object { message: `CityId required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Sign Up User and create cart for new user  
 GET | <span style="color:red">/users/city</span> |   | Status: 200<br>[Object{city_id, province_id, province, type, city_name, postal_code}] | Status: 400<br>Object { rajaongkir: {status: {code:400,description:"Invalid key. API key tidak ditemukan di database RajaOngkir."}} } | Get all city from API

<br>

## Cart Route
**Note:**  <br>*  *is required*
 HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 POST | <span style="color:red">/carts/cost</span> | *token |  | Status: 201<br> Number | Status: 400<br>Object { rajaongkir: {status: {code:400,description:"Invalid key. API key tidak ditemukan di database RajaOngkir."}} }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Get courier cost from API
 GET | <span style="color:red">/carts/my</span> | *token |  | Status: 200<br>[Object{_id, user, list, createdAt, updatedAt}] | Status: 500<br>Object { message: `Internal Server Error`, err } | All of user's carts
 PUT | <span style="color:red">/carts/buy</span> | *token | *product | Status: 200<br>Object{_id, user, list, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Buy a product
 PUT | <span style="color:red">/carts/change</span> | *token | *product, *option | Status: 200<br>Object{_id, user, list, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Add or remove product from cart one by one
 PUT | <span style="color:red">/carts/remove</span> | *token | *product | Status: 200<br>Object{_id, user, list, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Remove all product from cart
 PUT | <span style="color:red">/carts/checkout</span> | *token | | Status: 200<br>Object{_id, user, list, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Checkout a cart

 <br>

## Transaction Route
**Note:**  <br>*  *is required*
 HTTP | Router | Headers | Body | Success | Error | Description
------|--------|---------|------|---------|-------|------------
 POST | <span style="color:red">/transactions</span> | *token | *total | Status: 201<br> Object{_id, user, list, total, status, createdAt, updatedAt} | Status: 400<br>Object { message: `Total required` }<br>Status: 500<br>Object { message: `Internal Server Error`, err } | Create a transaction
 GET | <span style="color:red">/transactions</span> | *token |  | Status: 201<br> Object[{_id, user, list, total, status, createdAt, updatedAt}] | Status: 500<br>Object { message: `Internal Server Error`, err } | All of transactions
 GET | <span style="color:red">/transactions/my</span> | *token |  | Status: 201<br> Object{_id, user, list, total, status, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | All of user's transactions
 PUT | <span style="color:red">/transactions/send/:id</span> | *token | | Status: 200<br>Object{_id, user, list, total, status, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Send product to custmer by admin after customer doing checkout
 PUT | <span style="color:red">/transactions/confirm/:id</span> | *token | | Status: 200<br>Object{_id, user, list, total, status, createdAt, updatedAt} | Status: 500<br>Object { message: `Internal Server Error`, err } | Confirmation by customer to admin

<br>

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:<br>
$npm install<br>
$npm run start or $npm run dev<br>

Access the Server side via http://localhost:5000/.

Access the Client side via http://localhost:8080/.