const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

app.use(express.json());

app.use('/users', require('./routes/user.routes'));
app.use('/categories', require('./routes/category.routes'));
app.use('/products', require('./routes/product.routes'));
app.use('/upload', require('./routes/upload.routes'));
app.use('/report', require('./routes/report.routes'));

app.use(cors({
    origin: 'http://localhost:4200', // Allow Angular dev server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: true }).then(async () => {
await db.Product.bulkCreate([
        { name: 'iPhone 15', price: 999.99, category: 'Electronics' },
        { name: 'MacBook Pro', price: 1999.99, category: 'Electronics' },
        { name: 'Desk Chair', price: 199.99, category: 'Furniture' },
      ]);
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});


//npm run dev