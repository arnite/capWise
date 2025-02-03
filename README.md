# capWise

## 1. Description

capWise is an Intermediate Investment Broker Website API that allows users to manage investments, make transactions, and handle payment integration. The system supports user authentication, investment management, transaction records, and payment processing with Stripe. The API includes routes for investor and broker roles with proper role-based access control.

## 2. Features

- **User Authentication**: Users can sign up, log in, and manage their sessions securely using JWT tokens.
- **Role-based Access Control**: Different access levels for users (Investors, Brokers, Admins).
- **Investment Management**: Brokers can create, update, and delete investment opportunities.
- **Portfolio Management**: Investors can manage and track their portfolios, including recording transactions.
- **Transaction Management**: Keep a record of all investment transactions.
- **Payment integration Webhooks**: Seamless integration with Stripe for handling payment sessions and webhooks.

## 3. Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for now, with plans to integrate SQL in the future)
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Postman for API testing
- **Version Control**: Git & GitHub
- **Deployment**: Heroku

## 4. Getting Started

### 4.1 Prerequisites

- [Node.js](https://nodejs.org/) - Ensure you have Node.js installed on your system.
- [MongoDB](https://www.mongodb.com/) - You need a MongoDB instance for your database.

### 4.2 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/arnite/capWise.git
   cd capWise
   ```

2. Install dependecies:

   ```bash
   npm install
   ```

3. Create .env file in the root directory and add the following environment variables

   ```env
   PORT= 3000
   DATABASE= mongodb://localhost:27017/yourdbname
   NODE_ENV= your environment (production / development)
   JWT_SECRET= your jwt secret
   JWT_EXPIRES_IN= your expiry day
   EMAIL_USERNAME= mailtrap username
   EMAIL_PASSWORD= mailtrap password
   EMAIL_HOST= mailtrap host
   EMAIL_PORT= mailtrap port
   SAname= superAdmin name
   SAemail= superAdmin email
   SApassword= superAdmin password
   SApasswordConfirm= superAdmin passwordConfirm
   SArole= superAdmin
   stripeApiKEY= your stripe ApiKey
   STRIPE_WEBHOOK_SECRET= your stripe webhook secret
   ```

4. Run the server

```bash
npm start
```

The server should now be running on
http://localhost:3000

## 5. API Endpoints

### **User Authentication & Management**

- **POST `/api/v1/users/signUp`**  
  _Register a new user._

- **POST `/api/v1/users/createAdmin`**  
  _Create an admin (only accessible by superAdmin)._

- **POST `/api/v1/users/createBroker`**  
  _Create a broker account._

- **POST `/api/v1/users/login`**  
  _Log in a user and return a JWT token._

- **POST `/api/v1/users/forgotPassword`**  
  _Request a password reset by providing an email._

- **POST `/api/v1/users/resetPassword/:token`**  
  _Reset the user's password using a reset token sent to their email._

- **POST `/api/v1/users/updateMyPassword`**  
  _Logged-in users can update their passwords._

- **PATCH `/api/v1/users/updateMe`**  
  _Update the logged-in user's profile information (name, email, etc.)._

- **GET `/api/v1/users/me`**  
  _Retrieve details of the currently authenticated user._

- **DELETE `/api/v1/users/deleteMe`**  
  _Delete the currently authenticated user's account._

- **GET `/api/v1/users`**  
  _Get a list of all registered users (only accessible by admin or superAdmin)._

- **GET `/api/v1/users/:id`**  
  _Get details of a specific user by their ID._

- **PATCH `/api/v1/users/:id`**  
  _Update user details by ID (only accessible by admin)._

- **DELETE `/api/v1/users/:id`**  
  _Delete a specific user by ID (only accessible by admin)._

---

### **Investment Management**

- **POST `/api/v1/investments`**  
  _Create an investment (only accessible to brokers)._

- **GET `/api/v1/investments`**  
  _Retrieve a list of all investments._

- **GET `/api/v1/getMyInvestment`**  
  _Retrieve all investments of the logged-in broker (only accessible to brokers)._

- **GET `/api/v1/investments/:id`**  
  _Retrieve details of a specific investment by ID._

- **PATCH `/api/v1/investments/:id`**  
  _Update the details of a specific investment (only accessible to brokers)._

- **DELETE `/api/v1/investments/:id`**  
  _Delete a specific investment (only accessible to brokers)._

---

### **Portfolio Management**

- **POST `/api/v1/portfolio`**  
  _Create a portfolio (only accessible to investors)._

- **GET `/api/v1/portfolio`**  
  _Retrieve all portfolios for the logged-in investor._

---

### **Transaction Management**

- **POST `/api/v1/transactions`**  
  _Create a transaction record (only accessible to investors)._

- **GET `/api/v1/transactions`**  
  _Retrieve all transaction records for the logged-in investor._

---

### **Payment Processing**

- **POST `/api/v1/payments/webhook`**  
  _Stripe webhook endpoint for handling incoming events (such as payment success or failure)._

- **GET `/api/v1/payments/checkoutSession/:portfolioId`**  
  _Generate a Stripe checkout session for a specific portfolio (requires authentication)._


## 6. Contributing

- **Fork the repository.**
- **Create a new branch (git checkout -b feature-name).**
- **Make changes and commit (git commit -am 'Brief description of your changes').**
- **Push to the branch (git push origin feature-name).**
- **Create a new Pull Request.**

## 7. Deployed App 
 You can view the live version of the app here:
[capWise - Live API](https://capwise.onrender.com)

## 9. License

- **This project is licensed under the MIT License - see the LICENSE file for details.**
