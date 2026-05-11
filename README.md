#  Payments App

A full-stack **MERN** (MongoDB, Express.js, React, Node.js) payments application featuring atomic database transactions to ensure data integrity and consistency across all payment operations.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Database Transactions** | MongoDB Atomic Transactions (`startTransaction` / `commitTransaction` / `abortTransaction`) |
| **Package Manager** | npm / yarn |

##  Project Structure

```text
payments-app/
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/         # Atomic / reusable UI components
│   │   │   ├── atoms/          # Buttons, inputs, badges
│   │   │   ├── molecules/      # Form groups, cards
│   │   │   └── organisms/      # Payment form, transaction table
│   │   ├── pages/              # Route-level page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Payments.jsx
│   │   │   └── Transactions.jsx
│   │   ├── services/           # API call helpers (axios / fetch)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # Global state (auth, notifications)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Express.js backend
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   ├── controllers/
│   │   ├── paymentController.js
│   │   └── transactionController.js
│   ├── middleware/
│   │   ├── auth.js             # JWT / session middleware
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── models/
│   │   ├── Payment.js          # Mongoose Schemas
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── payments.js
│   │   └── transactions.js
│   ├── services/
│   │   └── paymentService.js   # Atomic transaction logic lives here
│   ├── app.js
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md


---

##  Prerequisites

- **Node.js** v18 or higher
- **npm** v9+ or **yarn**
- A running **database** instance (PostgreSQL / MySQL recommended for atomic transaction support)
- `.env` file configured (see [Environment Variables](#environment-variables))

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/payments-app.git
cd payments-app
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Install client dependencies

```bash
cd ../client
npm install
```

---

##  Environment Variables

Create a `.env` file in the `server/` directory based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=payments_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Auth
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Payment Gateway (e.g. Stripe)
PAYMENT_GATEWAY_SECRET=your_payment_gateway_key
PAYMENT_GATEWAY_WEBHOOK_SECRET=your_webhook_secret
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

##  Running the App

### Development mode

**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the React frontend (in a new terminal):**
```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173` and the API at `http://localhost:5000`.

### Production build

```bash
# Build the React client
cd client
npm run build

# Start the production server
cd ../server
npm start
```

---

##  Atomic Transactions

All payment operations that touch multiple records are wrapped in **atomic database transactions** to guarantee data integrity.

### How it works

An atomic transaction ensures that a group of database operations either **all succeed** or **all fail together** — preventing partial updates, double charges, or inconsistent balances.

### Transaction flow

```
BEGIN TRANSACTION
  ├── Debit sender's account balance
  ├── Credit receiver's account balance
  ├── Insert payment record
  └── Insert audit log entry
       ├── All steps succeed? → COMMIT
       └── Any step fails?   → ROLLBACK (no changes saved)
```


### Why atomic transactions matter for payments

| Scenario | Without Transactions | With Atomic Transactions |
|----------|---------------------|--------------------------|
| Server crash mid-payment | Sender debited, receiver never credited | Full rollback — no money lost |
| DB error on audit log insert | Payment saved, audit log missing | Entire operation rolled back |
| Concurrent duplicate requests | Possible double charge | Serialized, one succeeds |
| Network timeout | Partial state in DB | Clean rollback guaranteed |

---

##  API Endpoints

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/accounts/transfer` | Initiate a new payment (atomic) |
| `GET` | `/api/v1/accounts/balance` | List the balance of the user |

### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/users/bulk?filter=zack` | List all the related users |
| `GET` | `/api/transactions/:id` | Get a single transaction |

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/users/signup` | Register a new user |
| `POST` | `/api/v1/users/login` | Login and receive JWT |
| `POST` | `/api/v1/users/update` | Update user's information |

---

##  Running Tests

```bash
# Backend unit + integration tests
cd server
npm test

# Frontend component tests
cd client
npm test
```

---

##  Scripts Reference

### Server (`server/package.json`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `nodemon app.js` | Start server with hot reload |
| `start` | `node app.js` | Start server in production |
| `test` | `jest --coverage` | Run test suite |
| `lint` | `eslint .` | Lint server code |

### Client (`client/package.json`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start Vite dev server |
| `build` | `vite build` | Production build |
| `preview` | `vite preview` | Preview production build locally |
| `test` | `vitest` | Run component tests |
| `lint` | `eslint src/` | Lint frontend code |

---

##  Security Considerations

- All endpoints are protected by JWT authentication middleware
- Input validation is enforced on every request using `express-validator`
- SQL queries use **parameterized statements** to prevent SQL injection
- Sensitive fields (passwords, secrets) are never returned in API responses
- Rate limiting is applied on payment and auth endpoints
- CORS is configured to allow only trusted origins

---

##  Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

##  License

This project is licensed under the [MIT License](LICENSE).
