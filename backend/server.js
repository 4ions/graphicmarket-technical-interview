const express = require('express');
const morgan = require('morgan');
const router = require('./server/network/routes');
const cors = require('cors');
const path = require('path')
// Set up the express app
const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan('tiny'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*"
}));


router(app);

// Serving static files
//app.use(express.static(path.join(__dirname, 'src/build')));

// Serving upload filaes
//app.use('/upload', express.static(__dirname + '/src/upload'));

//serving static paths
//app.get('/*', function (req, res) {
  //res.sendFile(path.join(__dirname, 'src/build', 'index.html'));
//});

const db = require('./server/models');

db.sequelize.sync().then(() => {
    console.log('Drop and resync db');
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
