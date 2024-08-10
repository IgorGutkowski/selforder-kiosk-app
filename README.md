# Self-Order Kiosk Application

Welcome to the Self-Order Kiosk Application! This project aims to provide a digital self-ordering system similar to those found in establishments like McDonald's. Users can browse through available products, place orders, and receive confirmation. Admin can manipulate products, categories and display statistics.

## Technologies Used

- React
- Node.js
- MongoDB
- Tailwind CSS


## Database Setup

To set up the MongoDB database using the provided dump:

1. **Decompress the Database Dump:**
   First, decompress the `kioskDB.tar.gz` file which contains the BSON files for MongoDB. Run the following command in the root of the project directory:
```
tar -xzvf data/kioskDB.tar.gz -C data/
```

2. **Restore the Database:**
Use `mongorestore` to restore the database from the dump. Ensure that MongoDB is running and then execute:

```
mongorestore --db kioskDB data/kioskDB
```

This will restore the `kioskDB` database with all the necessary collections and documents.

3. **Verify the Restoration:**
After restoring the database, verify that the data has been properly loaded by connecting to MongoDB with a GUI tool like MongoDB Compass or using the MongoDB CLI.

Ensure that the `MONGODB_URI` environment variable is set to the correct URI that points to the restored database.


## GETTING STARTED

To launch the application, follow these steps:

1. **Clone the Repository:**
   Clone this repository to your local machine using the following command:

   ```
   git clone https://github.com/your-username/self-order-kiosk.git
   ```

2. **Navigate to the Directories:**
   Navigate into the main project directory and the frontend directory:

   ```
   cd self-order-kiosk
   ```

3. **Install Dependencies:**
   Install the necessary dependencies by running the following commands in both directories:

   ```
   npm install
   ```
   Do the same in app directory:

   ```
   cd frontend
   cd my-kiosk-frontend
   npm install
   ```


   Additionally, you may need to install the Axios package:

   ```
   npm install axios
   ```

5. **Set Environmental Variables:**
   Ensure you have assigned the required environmental variables for the application to function correctly:

   - `ADMIN_SECRET_KEY`: The secret key required for administrative access.
   - `PAID`: The secret key used for payment processing.
   - `MONGODB_URI`: The URI to connect to your MongoDB database.

6. **Launch the Application:**
   Once dependencies are installed and environmental variables are set, you can start the application by running:

   ```
   npm start
   ```

   You can start the server by running:

   ```
   node server.js
   ```

