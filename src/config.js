const mongoose = require("mongoose");

// Connect to MongoDB
const connect = mongoose.connect("mongodb://localhost:27017/NEXUS", {
  useUnifiedTopology: true,
});

// Check database connectivity
connect.then(() => {
  console.log(`Database connected successfully`);
}).catch(() => {
  console.log("Database connection failed");
});

// Create a schema
const Loginschema = new mongoose.Schema({
  Full_Name: {
    type: String,
    required: true
  },
  Phone_number: {
    type: String,
    required: true
  },
  mail_id: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a model
const collection = new mongoose.model("user", Loginschema);

module.exports = collection;
