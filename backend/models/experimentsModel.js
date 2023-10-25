const mongoose = require('mongoose')
const Schema = mongoose.Schema

const experimentSchema = Schema({
    experimentName: {
        type: String,
        required: true
    },
    experimentNo: {
        type: Number, 
        required: true
    },
    apparatuses: [{
        name: String
    }]
}, { timestamps: true })

module.exports = mongoose.model('Experiment', experimentSchema)