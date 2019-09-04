const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(helmet());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/documents');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage }).array('file');

app.get('/', (req, res) => {
  return res.send('Hello server!');
});

app.get('/documents', (req, res) => {
  const files = fs.readdirSync('public/documents').map(filename => {
    const stats = fs.statSync(`public/documents/${filename}`);
    return {
      id: filename,
      name: filename
        .split('-')
        .slice(1)
        .join('-'),
      size: stats.size
    };
  });
  if (req.query.filename) {
    const { filename } = req.query;
    const filteredFiles = files.filter(
      file => file.name.indexOf(filename) > -1
    );
    console.log('filtered', filteredFiles);
    return res.status(200).json({ status: 200, data: filteredFiles });
  }
  return res.status(200).json({ status: 200, data: files });
});

app.post('/documents', (req, res) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    const files = req.files.map(file => ({
      id: file.filename,
      name: file.originalname,
      size: file.size
    }));
    return res.status(200).json({ status: 200, data: files });
  });
});

app.delete('/documents/:documentId', (req, res) => {
  const { documentId } = req.params;
  const filePath = `public/documents/${documentId}`;
  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    fs.unlink(filePath, err => {
      if (err)
        return res
          .status(500)
          .json({ status: 500, message: 'Error deleting file' });
      return res
        .status(200)
        .json({ status: 200, message: 'Successfully deleted file!' });
    });
  } else {
    return res.status(404).json({ status: 404, message: 'File not found' });
  }
});

app.listen(8000, function() {
  console.log('App running on port 8000');
});
