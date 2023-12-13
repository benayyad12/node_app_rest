const express = require('express');

const router = express.Router();

const sqlite3 = require('sqlite3').verbose();

// Open a connection to the SQLite database
const db = new sqlite3.Database('/Users/abdessalambenayyad/Desktop/nodeRST/shop.db'); // Replace 'your-database-file.db' with your actual database file name

// Handle GET requests to fetch products
router.get('/', (req, res) => {
  const query = 'SELECT * FROM products';

  // Run the SQL query to fetch products from the database
  db.all(query, [], (err, products) => {
    if (err) {
      console.error('Error fetching products:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ products: products });
    }
  });
});


router.post('/',(req, res, next)=>{
  const {productName, productPrice} = req.body;


  const query = 'INSERT INTO products (productName, productPrice) VALUES (?,?)';
  db.run(query, [productName, productPrice],(err)=>{
    if(err) return console.error(err.message);
    res.status(201).json({
      message:"product created successfully"
    });
  }); 
});

router.get('/:productID',(req, res, next)=>{
  const query = 'SELECT * FROM products WHERE id = ?';
  const id = req.params.productID;
  db.get(query, [id], (err, row)=>{
     if(err) return console.error(err.message);
     res.status(200).json({
       message: "product found",
       product: row
     })
  });
});

router.patch('/:productID',(req, res, next)=>{
  const {productName, productPrice} = req.body;
  const updateQuery = 'UPDATE products SET productName = ?, productPrice = ? WHERE id = ?';

  const id = req.params.productID;

  db.run(updateQuery, [productName, productPrice,id],(err)=>{
    if(err) return console.error(err.message);
    res.status(200).json({
      message:"product with id = "+id+" patched",
    });
  });

console.log('productName:', productName);
console.log('productPrice:', productPrice);
console.log('id:', id);
});

router.delete('/:productID',(req, res, next)=>{
  const query = 'DELETE FROM products WHERE id = ?'
  const id = req.params.productID;
  db.run(query, [id], (err)=>{
    if(err) return console.error(err.message);
    res.status(200).json({
      message:"product with id = "+id+" deleted",
    });
  })
});

module.exports=router;