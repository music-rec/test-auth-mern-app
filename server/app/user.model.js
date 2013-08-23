const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    info: String,
    image: String
})

module.exports = mongoose.model('User', userSchema)
