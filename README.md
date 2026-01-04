# Client Secret Manager

A secure, minimalist TypeScript application for managing client credentials with best practices in security and software architecture. This project demonstrates how to securely generate, hash, and authenticate client secrets using Node.js, MySQL, and Docker.

## 🚀 Features

- **Secure Secret Generation**: Uses Node.js `crypto` (CSPRNG) to generate high-entropy 256-bit client secrets.
- **One-Way Hashing**: Implements **Bcrypt** for secure storage of secrets. Plain text secrets are never stored in the database.
- **Dependency Injection**: Built with a clean architecture using Dependency Injection (DI) principles for better testability and loose coupling.
- **Layered Architecture**: Clear separation/inversion of control between Services, Repositories, and Providers.
- **Native Tooling**:
  - Uses **Node.js Native Test Runner** (`node:test`) for unit testing.
  - Native `.env` file support (Node.js v20+).
- **Docker Integration**: Includes a Docker Compose setup for the MySQL 8.4 database.
- **CLI Interface**: Interactive command-line interface for creating clients and testing login flow.

## 🛠️ Tech Stack

- **Language**: TypeScript (ESNext / NodeNext modules)
- **Runtime**: Node.js (v20+)
- **Database**: MySQL 8.4 (via Docker)
- **Security**: `bcrypt`, `node:crypto`
- **Testing**: Native `node:test` and `node:assert`
- **Containerization**: Docker & Docker Compose

## 📂 Project Structure

```bash
src/
├── interfaces/   # Contracts for Services, Providers, and Repositories (DI)
├── providers/    # Concrete implementations (Database, Crypto, Bcrypt)
├── repositories/ # Data Access Layer
├── services/     # Business Logic
├── scripts/      # Database Migrations
├── tests/        # Unit Tests
└── index.ts      # Application Entry Point & CLI
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v20 or higher)
- Docker & Docker Compose

### 1. Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
SECRET_KEY=supersecretkey
DB_HOST=localhost
DB_PORT=3306
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=client_secret_hash
MYSQL_USER=user
MYSQL_PASSWORD=password
```

### 2. Database Setup

```bash
git clone https://github.com/marceloribeirosilva/client-secret-hash.git
cd client-secret-hash
npm install
```

### 3. Running the Application

Start the CLI application:

```bash
npm start
```

You will see the interactive menu:
1. **Create New Client**: Generates a secure client ID and Secret. The secret is shown **ONCE**.
2. **Login**: Verifies credentials by checking the provided ID and Secret against the stored hash.

### 4. Running Tests

Start the CLI application:

```bash
npm start
```

You will see the interactive menu:
1. **Create New Client**: Generates a secure client ID and Secret. The secret is shown **ONCE**.
2. **Login**: Verifies credentials by checking the provided ID and Secret against the stored hash.

### 4. Running Tests

Execute the unit test suite using Node.js native test runner:

```bash
npm test
```

## 🔐 Architecture Highlights

### Security Flow
1. **Generation**: A 64-character hex string is generated using `crypto.randomBytes(32)`.
2. **Display**: The plain secret is returned to the user **immediately**.
3. **Hashing**: The secret is passed to `SecretService.hash()`, which uses `bcrypt` (salt rounds: 10).
4. **Storage**: Only the **bcrypt hash** stays in the secure database.
5. **Authentication**: During login, `SecretService.compare()` validates the input against the stored hash.

### Dependency Injection
The `main()` function in `index.ts` acts as the Composition Root, wiring dependencies:

```typescript
const cryptoProvider = new CryptoProvider();
const hashProvider = new BcryptHashProvider();
const secretService = new SecretService(cryptoProvider, hashProvider);
const clientRepository = new ClientRepository(db);
const clientService = new ClientService(clientRepository, secretService);
```

## 📝 License

This project is licensed under the ISC License.
