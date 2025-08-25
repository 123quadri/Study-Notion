const { createClient } = require("redis");

// Create a Redis client with reconnect strategy disabled
const client = createClient({
    url: 'redis://localhost:6379',
    socket: {
        reconnectStrategy: false // This will prevent automatic reconnection attempts
    }
});

// Track connection state
client.isConnected = false;

// Log the first error only
let hasLoggedConnectionError = false;
client.on('error', (err) => {
    if (!hasLoggedConnectionError) {
        console.log('Redis Client Error:', err.message);
        console.log('Redis caching will be disabled. Start Redis to enable caching.');
        hasLoggedConnectionError = true;
    }
    client.isConnected = false;
});

client.on('connect', () => {
    client.isConnected = true;
    hasLoggedConnectionError = false;
    console.log('Redis connected successfully');
});

module.exports = client;