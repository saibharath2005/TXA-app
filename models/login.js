const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        rquire: true
    }
});

const Login = mongoose.model("Login", LoginSchema);
module.exports = Login;