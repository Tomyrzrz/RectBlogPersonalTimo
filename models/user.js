const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema( {
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    role: String,
    activo: Boolean,
});

module.exports = mongoose.model("User", userSchema);