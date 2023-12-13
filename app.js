const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// body parser is a middleware used in express js to handle post request
const bodyParser = require('body-parser');

const app = express();


const routes_orders = require('./api/routes/orders');
const routes_products = require('./api/routes/products');


app.use(morgan('dev')); // to log requests 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

// giving access of our API to everyone (handling cros error)

app.use('/orders', routes_orders);
app.use('/products', routes_products);


// errors handling
// check if the routes matches(404)
app.use((req, res, next)=>{
  const error = new Error("Not found");
  error.status=404;
  next(error);
  
});

app.use((error, res, next)=>{
  res.status(error.status||500);
  res.json({
    error:{
      message: error.message
    }
  });
});



module.exports=app;


// we don't want to run server : node server each time 
// to automise the process we can use : nodemon (restart server whenever it detects a change)

// to log incoming requests we will use morgan

// error handling

// to parse body of requests : body-parser