const express = require('express');
const multer = require('multer');
const app = express();

// Upload dans le dossier "uploads/"
const upload = multer({ dest: 'uploads/' });

// Route pour recevoir un fichier
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Fichier reçu :', req.file);
  res.send('Upload OK');
});

// Route de test
app.get('/', (req, res) => {
  res.send('Server running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
