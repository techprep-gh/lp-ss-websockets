const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // Parse JSON request bodies

app.use(express.static("public")); // Serve static files from the 'public' directory

let clientId = 0; // Initialize clientId for assigning unique IDs
let clients = {}; // Store client responses for long polling

// Endpoint to register clients for long polling
app.get("/poll", (req, res) => {
  const id = clientId++; // Assign a unique ID to each client
  clients[id] = res; // Store the client's response object

  // Handle the case where the client closes the connection
  req.on("close", () => {
    delete clients[id]; // Remove client when the request is closed
  });
});

// Endpoint to send updates to all registered clients
app.post("/update", (req, res) => {
  const { message } = req.body; // Extract message from the request body

  // Send the message to all clients and close their connection
  Object.keys(clients).forEach((clientId) => {
    clients[clientId].json({ message }); // Send the message as a JSON response
    delete clients[clientId]; // Remove the client after sending the message
  });

  res.status(204).send(); // Respond with no content after sending updates
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
