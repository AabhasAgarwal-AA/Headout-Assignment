# Use a Node.js base image 
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy source code
COPY . .

# Generate sample data files  
RUN node generate-data.js

# Expose port 
EXPOSE 8080

# Set resource limits
RUN apk add --no-cache bash
RUN echo -e '#!/bin/bash\nulimit -v 1600000 -m\nnode index.js' > entrypoint.sh 

# Start the server
CMD ["/entrypoint.sh"]