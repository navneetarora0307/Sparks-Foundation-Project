const mongoose = require("mongoose");
//  creating a databse

mongoose.connect("mongodb+srv://navneetarora0307:test-123@navneets-cluster.b2kcw.mongodb.net/listdynamic" , { useNewUrlParser : true, useUnifiedTopology: true
}).then(() => {
    console.log("connection succesful");
}).catch((error) =>{
    console.log(error);
})