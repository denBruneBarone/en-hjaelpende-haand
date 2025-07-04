# Use a lightweight image
FROM oven/bun:1.1.3

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN bun install

# OPTIONAL: Build React frontend if needed
# Adjust this if your build command is different
RUN bun run build

# Expose the port your server will listen on
EXPOSE 3000

# Start the server
CMD ["bun", "server.js"]
