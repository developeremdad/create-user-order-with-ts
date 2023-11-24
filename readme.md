# Mongoose Express CRUD with typescript and zod validation

This project for create user and management orders by using mongoose schema for data modeling, typescript interface for type handling, and third party external validator zod for extra securing data.

---
## How to run this project
---
### Clone project
    git clone https://github.com/developeremdad/create-user-order-with-ts

### Go to project folder
    cd create-user-order-with-ts

### Install dependencies
    npm install

### Open project to vscode
    code .

### Run project
    //for ts quick run before build
    npm run start:dev

### Build project
    npm run build

### Run build project
    npm start


## Technology used
---
- MongoDB (Database)
- Express
- Mongoose
- Typescript
- Zod (validation)

## Routes
---
- POST /api/users
- GET /api/users
- GET /api/users/:userId
- PUT /api/users/:userId
- DELETE /api/users/:userId
- PUT /api/users/:userId/orders
- GET /api/users/:userId/orders
- GET /api/users/:userId/orders/total-price

---
Happy Coding - Developeremdad 🧑‍💻