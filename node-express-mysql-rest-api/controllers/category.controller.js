const db = require('../models');
const Category = db.Category;

exports.createCategory = async (req, res) => {
  const category = await Category.create({ ...req.body, UserId: req.body.userId });
  res.status(201).json(category);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  await Category.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Category updated' });
};
