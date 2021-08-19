const express = require('express');
const priceUpdate = require('./controllers/priceUpdate');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('INDEX'));
app.use('/users', require('./routes/user'));
app.use('/buy', require('./routes/buy'));
app.use('/sell', require('./routes/sell'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server started on port ' + PORT));
