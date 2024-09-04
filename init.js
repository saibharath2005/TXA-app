const mongoose = require("mongoose");
const Item = require("./models/item.js");
const Login = require("./models/login.js");

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Market");
}

let allItems = [
    {
        image:  "https://www.bigbasket.com/media/uploads/p/m/40319249_2-fresho-apple-fuji.jpg?tr=w-1080,q=80",
        title: "Apple",
        price: 30,
        discount: 10,
        quantity: 1

    },
    {
        image:  "https://th.bing.com/th/id/OIP.FqVB_ILYSFxcb-fix00iRQHaEK?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        title: "Potato",
        price: 15,
        discount: 5,
        quantity: 1
    },
]

let allLogins = [
    {
        email: "rallabandisaibharath@email.com",
        password: "bittu*star"
    },
    {
        email: "prashanth@gamil.com",
        password: "prashanth&"
    }
]

Item.insertMany(allItems);
Login.insertMany(allLogins);