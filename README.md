# NestJS Microservice gRPC

# Introduction
This project uses NestJS microservices with gRPC for service communication. It includes monorepos and implements CQRS to separate command and query operations for better scalability and performance.

# Technologies Used
+ NestJS: A backend framework for Node.js with TypeScript, enabling scalable and maintainable applications.

+ gRPC: A high-performance RPC framework for efficient microservice communication.

+ CQRS: Separates command (write) and query (read) operations for better performance and scalability.

+ Monorepo: All projects are stored in a single repository for easier management and integration.

+ MySQL: A relational database for managing application data.

# Installation Guide

## Step 1: Clone the Project
Clone the project to your local machine:

``` bash
git clone https://github.com/maivankien/nestjs-microservice-grpc.git
cd nestjs-microservice-grpc
```

## Step 2: Config environment
Configure .env file based on .env.example file

## Step 3: Run Docker Compose
Start the services using Docker Compose:

```bash
docker-compose up -d
```