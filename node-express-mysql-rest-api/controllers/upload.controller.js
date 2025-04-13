const fs = require('fs');
const csv = require('fast-csv');
const db = require('../models');
const Product = db.Product;

exports.bulkUpload = async (req, res) => {
  try {
    const filePath = req.file.path;
    const CHUNK_SIZE = 500; // adjust as needed
    const buffer = [];

    const stream = fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on('data', async (row) => {
        buffer.push({
          name: row.name,
          price: parseFloat(row.price),
          CategoryId: parseInt(row.categoryId),
          UserId: parseInt(row.userId),
        });

        if (buffer.length >= CHUNK_SIZE) {
          stream.pause(); // backpressure: pause stream
          await Product.bulkCreate(buffer);
          buffer.length = 0;
          stream.resume();
        }
      })
      .on('end', async () => {
        if (buffer.length > 0) {
          await Product.bulkCreate(buffer);
        }
        fs.unlinkSync(filePath); // clean up uploaded file
        res.status(200).json({ message: 'Products uploaded successfully' });
      })
      .on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to process file' });
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during bulk upload' });
  }
};
