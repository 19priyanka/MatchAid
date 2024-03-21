# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Download dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Run application
CMD [ "npm", "run", "dev"]
