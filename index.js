console.log("chaaama")
const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;



app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());



app.get('/', (req, res)=>{
    res.status(200).json({message: "chamou!"})
})

const burgerRoutes = require('./routes/burgerRoutes');
app.use('/burgers', burgerRoutes);


const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@makeyourburgerapicluste.rz6fw.mongodb.net/makeYourBurgerDatabase?retryWrites=true&w=majority`)
.then(()=>{
    console.log('MongoDB Atlas Connected');
    app.listen(port, ()=>{
        console.info(`Aplicação rodando em http://localhost:${port}`);
    });
})




// finfeT335NqBFgnM

// mongodb+srv://vagnerecomp:<password>@makeyourburgerapicluste.rz6fw.mongodb.net/makeYourBurgerDatabase?retryWrites=true&w=majority