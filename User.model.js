const mongoose = require("mongoose");

const bookmark= new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
})
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bookmarks: [bookmark],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;