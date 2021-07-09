console.clear();
const express = require('express');
const app = express();

// middleware
app.use(express.json());
app.use('/todos',require('./routes'));


app.get('/', (req, res) => {
    res.send('<h1>Server is live!</h1>');
})

app.listen(4000, () => {
    console.log('service listening on port 4000');
})