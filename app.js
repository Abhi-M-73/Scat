const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/db.connection');
const ownerRouter = require('./routes/ownerRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');


const port = 3000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});