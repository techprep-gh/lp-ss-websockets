const express = require("express");
const app = express();
const PORT = 3000;

// Serve static files from the 'public' folder
app.use(express.static("public"));

// SSE endpoint to send events to the client
app.get("/events", (req, res) => {
  // Set necessary headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send a new event every second
  const sendEvent = setInterval(() => {
    console.log("Sending event");
    res.write(`data: ${new Date().toLocaleTimeString()}\n\n`); // Send the current time
  }, 1000);

  // Clean up when the connection is closed by the client
  req.on("close", () => {
    clearInterval(sendEvent); // Stop sending events
    res.end(); // Close the connection
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
