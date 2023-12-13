const sqlite3 = require('sqlite3').verbose();

let sql;

// need to create shop.db

// connect to database :
const db = new sqlite3.Database("/Users/abdessalambenayyad/Desktop/nodeRST/shop.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
});

// create table 
// sql = `CREATE TABLE  products(id INTEGER PRIMARY KEY, productName, productPrice)`;
// db.run(sql);

// drop table :
// db.run(`DROP TABLE products`);

// insert data into db "shop.db":
// sql = `INSERT INTO products(productName, productPrice) VALUES (?,?)`;
// db.run(sql,["product 6","1863.352"],(err)=>{
//   if (err) return console.error(err.message);
// });



// query data : 
sql = `SELECT * FROM products`;
db.all(sql, [], (err, rows)=>{
   if (err) return console.error(err.message);
      rows.forEach(row=>{
        console.log(row);
      })
});

// delete data :
// sql = `DELETE FROM products WHERE id=?`;
// db.run(sql, [1], (err)=>{
//    if (err) return console.error(err.message);
// });

// update data :
// sql = `UPDATE products SET productName = ? WHERE id = ?`;
// db.run(sql, ["product 4",4], (err)=>{
//     if (err) return console.error(err.message);
// })

// create table orders 
// sql = `CREATE TABLE  orders(id INTEGER PRIMARY KEY, productName VARCHAR(255) NOT NULL, quantity INT NOT NULL)`;
// db.run(sql)

//insert data into db "shop.db":
// sql = `INSERT INTO orders(productName, quantity) VALUES (?,?)`;
// db.run(sql,["product 6",5],(err)=>{
//   if (err) return console.error(err.message);
// });

// sql = `SELECT * FROM orders`;
// db.all(sql, [], (err, rows)=>{
//    if (err) return console.error(err.message);
//       rows.forEach(row=>{
//         console.log(row);
//       })
// });


