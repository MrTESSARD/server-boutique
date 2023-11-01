const { default: mongoose } = require("mongoose");

const orderSchema= new  mongoose.Schema({
    id: Number,
    ownerId:String,
    date: Date,
    clientDetails:Object,
    total: Number,
    items:[
        {
            product_id:String,
            name:String,
            price:Number,
            size:String
        }
    ]
},{
    collection:'orders'
})
module.exports = mongoose.model('Order',orderSchema )
