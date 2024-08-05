# Card DB

## Description

A client-server solution for storing and managing a database of cars of various brands.

## Prerequisites

- Docker
- Node.js and npm

## Getting Started

### Step 1: Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/MrMurdock11/cardb.git
cd cardb
```

### Step 2: Add .env File

Create a .env file in the root directory of the project with the following content:

```
PORT=3000
TOKEN_SECRET=<generate-your-token>
MONGO_URI="mongodb://localhost:27017/cardb"
```

> [!NOTE]
> Generate your first secret token using the following command: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

### Step 3: Run Docker Compose

Navigate to the apps/server directory and build the Docker containers:

```
cd apps/server
docker-compose up --build
```

### Step 4: Build the CLI Application

Navigate to the apps/cli directory and build the CLI application:

```
cd apps/cli
npm run build
```

### Step 5: Link the CLI Application

Navigate to the dist directory and link the CLI application:

```
cd dist
npm link
```

### Step 6: Use the cardb CLI

Open a terminal and use the cardb CLI. The first command to run is cardb login:

```
cardb login
```
