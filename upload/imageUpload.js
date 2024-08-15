const express = require('express');
const multer = require('multer');
const path = require('path');
const port = process.env.PORT || 4000;

// Cấu hình Multer để lưu trữ tệp tin
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../upload/images')); // Thay đổi đường dẫn nếu cần
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Phục vụ tệp tin từ thư mục upload/images
router.use('/images', express.static(path.join(__dirname, '../upload/images')));

router.get('/load/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../upload/images', filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'File not found' });
    }
  });
});

// Endpoint để tải lên tệp tin
router.post('/upload', upload.single('files'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: 0,
      message: 'No file uploaded',
    });
  }

  res.json(`http://localhost:${port}/api/image/load/${req.file.filename}`);
});

module.exports = router;
