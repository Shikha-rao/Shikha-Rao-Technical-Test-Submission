const db = require('../models');
const Product = db.Product;

exports.createProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    UserId: req.body.userId,
    CategoryId: req.body.categoryId
  });
  res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
  const products = await Product.findAll({ include: ['Category'] });
  res.json(products);
};

exports.updateProduct = async (req, res) => {
  await Product.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Product updated' });
};
