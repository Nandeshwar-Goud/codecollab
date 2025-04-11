const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();  
const { Server } = require("socket.io");
const Session = require("./sessionModel");
function getLocalIP() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}
const PORT = 3000;
const HOST = '0.0.0.0';
mongoose.connect("mongodb://localhost:27017/codecollab", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all for now 
    methods: ["GET", "POST"]
  }
});

mongoose.connect("mongodb://localhost:27017/codecollab", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on("connection", (socket) => {
  

  socket.on("join-session", async (sessionCode) => {
    socket.join(sessionCode);
    

    // Check if session exists
    let session = await Session.findOne({ sessionCode });

    // If not, create it
    if (!session) {
      session = await Session.create({ sessionCode });
    }

    // Send existing content to the joining user
    socket.emit("load-session", session.content);

    // Listen for changes and broadcast to others
    socket.on("text-change", async (newText) => {
      await Session.findOneAndUpdate({ sessionCode }, { content: newText });
      socket.to(sessionCode).emit("receive-text", newText);
    });
  });
});
app.get("/:code", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "editor.html"));
});
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${getLocalIP()}:${PORT}`);
});
