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
const fs = require('fs');

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log('Aucun fichier reçu !');
    return res.send('Aucun fichier');
  }

  console.log('Fichier reçu:', req.file.originalname);
  console.log('Chemin temporaire sur serveur:', req.file.path);

  // Lire un petit extrait du fichier (optionnel, juste pour test)
  try {
    const data = fs.readFileSync(req.file.path, 'utf8');
    console.log('Contenu du fichier (50 premiers caractères) :', data.substring(0, 50));
  } catch (err) {
    console.log('Impossible de lire le fichier :', err.message);
  }

  res.send('Upload OK');
});


