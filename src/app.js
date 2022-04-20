const express= require('express');
const path= require("path");
const Razorpay= require("razorpay");
require("./db/conn");
const User = require("./models/userMessage");

const hbs= require("hbs");
const exp = require('constants');

const app = express();
const port= process.env.PORT || 4000;

const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

const razorpay=new Razorpay({
    key_id:'rzp_test_93WN8nN3hjYdtC' ,
    key_secret:'fIW9I1mbyGM6nvzmi4kUENoT', 
})



// middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);




app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/contact", async(req,res) => {
    try{
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }catch(error){
        res.status(500).send(error);
    }

});

app.post("/order", async(req,res) => {

    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcpt1"
    };

    razorpay.orders.create(options,function (err,order){

        // console.log(order)
        res.json(order)
    })




});


app.post("/is-order-complete", async(req,res) => {

    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
        if(paymentDocument.status==='captured'){
            res.redirect('/')
        }
    })

});







app.listen(port,()=>{
    console.log(`server started at port no ${port}`);
})