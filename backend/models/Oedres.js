const mongoose = require('mongoose');

const { Schema } = mongoose;
const OrderSchema = new Schema(
    {
        
        email: {
            type: String,
            require: true,
            unique : true
        },
        order: {
            type: Array,
            require: true
        },
        date: {
            type: Date,
            default: Date.now
        }

    }
);

module.exports = mongoose.model('userorders', OrderSchema) //userorders is collection name