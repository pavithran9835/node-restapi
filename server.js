const express = require('express');
const app = express();
const assert = require('assert')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const proRoute = require('./route');
const PORT = Number(process.env.PORT || 3000);
const config = require('./config/db');

//Body-Parser
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

//Set the Global Promise For Mongoose
mongoose.Promise = global.Promise;

//DB Connection
mongoose.connect(config.Db , { useNewUrlParser : true })
    .then(
        res => {
            console.log('Database Connected');
        }
    )
    .catch(err => {
        assert.equal(null ,err);
    });

// CORS => Cross Origin Resources Sharing
app.use(cors());

//Route
app.use('/' , proRoute);

//PORT Configure
app.listen(PORT , () => {
    console.log(`server running in http://localhost:${PORT}`);
});