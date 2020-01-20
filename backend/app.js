const express = require('express');
const cors = require("cors");
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/cards", require("./routes/cards"));


const port = process.env.PORT || 5000; 
app.listen(port,()=>{
    console.log(`Server Running on post ${port}`)
});

