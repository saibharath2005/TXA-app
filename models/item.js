const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    image: Buffer,
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    }
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
