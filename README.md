## Project Name: UpTrendZ-E-Commerce application

### Description:
This project serves as the backend for an e-commerce application. It provides API endpoints for user registration, authentication, product management, and cart functionality.

---

### Installation:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the server using `node index.js`.

---

### Usage:
- Ensure MongoDB is running locally.
- Use Postman or similar tools to interact with the API endpoints.
- Register a new user: `POST /signup`
- Log in as a user: `POST /login`
- Add a product: `POST /addproduct`
- Remove a product: `POST /removeproduct`
- Get all products: `GET /allproducts`
- Add to cart: `POST /addtocart`
- Remove from cart: `POST /removefromcart`
- Get user's cart: `POST /getcart`

---

### API Endpoints:

#### Register a new user
POST /signup

Request Body:

{

    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"

}

#### Log in as a user
POST /login
Request Body:

    {
        "email": "john@example.com",
        "password": "password123"
    }

#### Add a product
POST /addproduct

Request Body:

    {
        "name": "Product Name",
        "image": "product_image_url",
        "category": "Product Category",
        "new_price": 100,
        "old_price": 120
    }

#### Remove a product
POST /removeproduct

Request Body:

    {
        "id": "product_id"
    }

#### Get all products
GET /allproducts

#### Add to cart
POST /addtocart

Request Body:

    {
        "itemId": "product_id"
    }

#### Remove from cart
POST /removefromcart

Request Body:

    {
        "itemId": "product_id"
    }

#### Get user's cart
POST /getcart

#### Get new collections
GET /newcollections

#### Get popular products in women's category
GET /popularinwomen
