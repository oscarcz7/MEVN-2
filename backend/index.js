//import libraries
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import path from 'path';


//init app with express
const app = express();

//Create connection to MongoDB
import mongoose from 'mongoose';
const uri = 'mongodb://localhost:27017/contractsdb';
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, options).then(
    () => {
        console.log('Connecte to MongoDB - contractsdb');
    },
    err => { err }
)

//Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test route
//app.get('/' , (req, res) => {
  //  res.send('my app');
//});
//defining routes for endpoint

app.use('/api', require('./routes/client'));
app.use('/api', require('./routes/contract'));

//Using VUEJS MIDDLEWARE for history router mode
const history = require('connect-history-api-fallback');
app.use(history());
//for production
//app.use(express.static(path.join(__dirname, 'public')));

//connect & asign port
app.set('port', process.envPORT || 5000);
app.listen(app.get('port'), () => {
    console.log('localhost'+''+app.get('port'));
})
