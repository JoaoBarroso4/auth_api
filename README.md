
# Authentication API

This is a simple authentication API built with TypeScript, Fastify, and Prisma. It provides endpoints for user registration, login, fetching user details, updating user details, and deleting a user.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- TypeScript

### Installing

1. Clone the repository
```bash
git clone https://github.com/JoaoBarroso4/auth_api.git
```

2. Install the dependencies
```bash
npm install
```
3. Configure the environment variables `DATABASE_URL`, `JWT_SECRET_KEY` and `TOKEN_EXPIRY`

4. Run docker compose
```bash
docker-compose up -d
```

5. Run the development server
```bash
npm run dev
```
The server will start running at http://localhost:3000

## API Endpoints

- **POST /register**: Register a new user
- **POST /login**: Login a user
- **GET /user/:username**: Get user details by username
- **PUT /user/:id**: Update user details
- **DELETE /user/:username**: Delete a user by username

## Built With

- [Fastify](https://www.fastify.dev/): A web framework for Node.js
- [Prisma](https://www.prisma.io/): Next-generation Node.js and TypeScript ORM
- [Zod](https://zod.dev): A TypeScript-first schema declaration and validation library
