const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send({message: 'Hello EQS!'});
})

app.get('/:name/:email', (req, res) => {
    const name = req.params.name;
    const email = req.params.email;
    res.send(`<h1>Success</h1>`);
    console.log(`${name} ${email}`);
})

app.post('/submit', (req, res) => {
    res.send({message: 'It is Done'});
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})