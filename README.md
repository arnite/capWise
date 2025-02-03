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

- **POST /api/v1/users/signUp**: Register a new user.
- **POST /api/v1/users/createAdmin**: Create an admin (only accessible by superAdmin.)
- **POST /api/v1/users/createBroker** Create a Broker
- **POST /api/v1/users/login**: Log in a user and return a JWT token.
- **POST /api/v1/users/forgotPassword**: Request password reset.
- **POST /api/v1/users/resetPassword/**:token: Reset the user's password using a reset token.
- **POST /api/v1/users/updateMyPassword**: Update the user's password.
- **POST /api/v1/users/updateMe**: Update the user's profile.
- **GET /api/v1/users/me**: Get details of the currently authenticated user.
- **DELETE /api/v1/users/deleteMe**: Delete the currently authenticated user.
- **GET /api/v1/users**: Get a list of all users (only accessible by admin and superadmin).
- **GET /api/v1/users/:id**: Get details of a specific user by ID.
- **PATCH /api/v1/users/:id**: Update details of a specific user by ID.
- **DELETE /api/v1/users/:id**: Delete a user by ID.
- **POST /api/v1/investments**: Create an investment (only accessible to Brokers)
- **GET /api/v1/investments**: Retrieve all investments.
- **GET /api/v1/getMyInvestment**: Retrieve all investments of a Broker (only accessbile to Brokers)
- **GET /api/v1/investments/:id**: Get details of a specific investment by ID.
- **PATCH /api/v1/investments/:id**: Update details of a specific investment by ID (only accessible to Brokers)
- **DELETE /api/v1/investments/:id**: Delete an investment by ID (only accessible to Brokers)
- **POST /api/v1/portfolio**: Create a Portfolio (only accessible to investors)
- **GET /api/v1/portfolio**: Retrieve all Portfolio for a specific Investor.
- **POST /api/v1/transactions**: Create a transaction record (only accessible to Investors)
- **GET /api/v1/transactions**: Get all transaction records (only accessible to Investors)
- **POST /api/v1/payments/webhook**: Stripe webhook endpoint for handling incoming events (such as payment success or failure).
- **GET /api/v1/payments/checkoutSession/:portfolioId**: Get a Stripe checkout session for a specific portfolio (requires authentication).

## 6. Contributing

- **Fork the repository.**
- **Create a new branch (git checkout -b feature-name).**
- **Make changes and commit (git commit -am 'Brief description of your changes').**
- **Push to the branch (git push origin feature-name).**
- **Create a new Pull Request.**

## 7. You can view the live version of the app here:

[capWise - Live API](https://capwise.onrender.com)

## 9. License

- **This project is licensed under the MIT License - see the LICENSE file for details.**
