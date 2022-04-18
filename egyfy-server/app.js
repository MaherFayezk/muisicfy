const express = require('express');
const userRouter = require('./routes/usreRouter')
const app = express();
app.use(express.json());
app.use(userRouter);

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