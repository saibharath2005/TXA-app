const express = require("express");
const app = express();
let port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const Item = require("./models/item.js");
const Login = require("./models/login.js");

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); 


main()
    .then(() => {
        console.log("Connected successful");
    })
    .catch((err) => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Market");
}


app.get("/items", async (req, res) => {
    let items = await Item.find();
    console.log(items);
    res.render("index.ejs", { items });
});


app.get("/items/new", (req, res) => {
    res.render("new.ejs");
});

// Create a new card with image, name, price, and discount
app.post('/items', (req, res) => {
  const { image, title, price, discount, quantity} = req.body;

  const newItem = new Item({
    image,
    title,
    price,
    discount,
    quantity
  });

  newItem.save()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

    res.redirect("/items");

});

// Route to view item details
app.get('/items/:id', async(req, res) => {
    let {id} = req.params;
    let item = await Item.findById(id);
    res.render("show.ejs", {item});
});

app.post("/signup", async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    await Login.insertMany([data]);

    res.render("home");
    
});

app.post("/login", async (req, res) => {
    
    try{
        const check = await Login.findOne({email: req.body.email});

        if(check.password === req.body.password){
            res.render("home");
        }else{
            res.send("wrong password");
        }
    }
    catch{
        res.send("Wrong details");
    }
    
});

app.get("/trans", (req, res) => {
    res.render("trans.ejs");
});

app.post('/pay', (req, res) => {
    const paymentMethod = req.body.paymentMethod;

    let link;
    switch (paymentMethod) {
        case 'phonepay':
            link = 'https://business.phonepe.com/login';
            break;
        case 'googlepay':
            link = 'https://pay.google.com/intl/en_in/about/';
            break;
        case 'paytm':
            link = 'https://paytm.com/original-link';
            break;
        default:
            res.status(400).send('Invalid payment method');
            return;
    }

    res.redirect(link);
});

app.get("/hello", (req, res) => {
    res.send("Home page");
});

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.use((req, res) => {
    res.send("Connected Successful");
});

app.listen(port, () => {
    console.log(`listening to the ${port}`);
});
