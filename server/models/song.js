var { mongoose } = require('../db/mongoose')

var Song = mongoose.model('Song', {
    title : String,
    file : String,
    artist : String,
})  

module.exports = { Song }