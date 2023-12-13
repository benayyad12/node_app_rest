const express = require('express');

const router = express.Router();

const sqlite3 = require('sqlite3').verbose();

// Open a connection to the SQLite database
const db = new sqlite3.Database('/Users/abdessalambenayyad/Desktop/nodeRST/shop.db'); 

router.get('/', (req, res) => {
  const query = 'SELECT * FROM orders';

  // Run the SQL query to fetch products from the database
  db.all(query, [], (err, orders) => {
    if (err) {
      console.error('Error fetching orders:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ orders: orders });
    }
  });
});

router.post('/',(req, res, next)=>{
  const {productName, quantity} = req.body;
  const query = 'INSERT INTO orders(productName, quantity) VALUES(?,?)';
  db.run(query,[productName, quantity],(err)=>{
  if(err) return console.error(err.message);
  res.status(201).json({
   message:"order created successfully",
  })
});
});


router.get('/:orderId',(req, res, next)=>{
  const query = 'SELECT * FROM orders WHERE id = ?';
  const id = req.params.orderId;
  db.run(query,[id],(err,row)=>{
    if(err) return console.error(err.message);
  res.status(200).json({
   message:"get order with id",
   order: row
  });
});
});

router.delete('/:orderId',(req, res, next)=>{
  const query = 'DELETE FROM orders WHERE id = ?'
  const id = req.params.orderId;
  db.run(query, [id], (err)=>{
  if(err) return console.error(err.message);
  res.status(200).json({
   message:"order deleted",
   orderId:id
  });
});
});


module.exports=router;