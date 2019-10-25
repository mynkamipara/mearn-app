const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    full_name: {
        type: String
    },
    email: {
        type: String
    },
    contact_number: {
        type: String
    },
    gender: {
        type: String
    },
    password: {
        type: String
    }
});
var User = mongoose.model('User', UserSchema);

module.exports = {
    User:User
};