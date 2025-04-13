const db = require('../models');
const Product = db.Product;
const ExcelJS = require('exceljs');
const { format } = require('date-fns');
const fs = require('fs');
const csv = require('fast-csv');

exports.downloadCSV = async (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
  res.setHeader('Content-Type', 'text/csv');

  const stream = csv.format({ headers: true });
  stream.pipe(res);

  const products = await Product.findAll({ raw: true });
  for (const product of products) {
    stream.write(product);
  }

  stream.end();
};

exports.downloadXLSX = async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Products');

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Price', key: 'price', width: 15 },
    { header: 'Category', key: 'category', width: 20 },
  ];

  const products = await Product.findAll({ raw: true });
  worksheet.addRows(products);

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=products-${format(new Date(), 'yyyyMMddHHmmss')}.xlsx`);

  await workbook.xlsx.write(res);
  res.end();
};
