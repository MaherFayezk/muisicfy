const express = require('express');
const session = require('express-session');
const userRouter = require('./routes/usreRouter');
const songRouter = require('./routes/songRouter');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users",userRouter);
app.use("/songs",songRouter);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "secret key",
    cookie:{
        maxAge:1000*60*60
    }
}));

app.use((req, res) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});

app.use((err, req, res, next) => {
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Something is wrong! Try later' });
    }
});


app.listen(3000);