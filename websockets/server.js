const WebSocket = require("ws");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000; // HTTP server port for serving HTML

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Start the HTTP server for serving static files
app.listen(PORT, () => {
  console.log(`HTTP server running on http://localhost:${PORT}`);
});

const WS_PORT = 3001; // WebSocket server port

// Create WebSocket server on a different port (3001)
const wss = new WebSocket.Server({ port: WS_PORT });

console.log(`WebSocket server started on ws://localhost:${WS_PORT}`);

// Handle new client connections
wss.on("connection", function connection(ws) {
  console.log("A new client connected.");

  // Handle messages received from the client
  ws.on("message", function incoming(message) {
    console.log("Received: %s", message);

    // Broadcast the message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // Send the message to each open connection
      }
    });
  });

  // Send a periodic "Ping!" message to the client
  setInterval(() => {
    ws.send("Ping from server!"); // Sends ping every second
  }, 1000);

  // Handle client disconnection
  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});
