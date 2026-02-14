const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Endpoint pour recevoir un fichier
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.send('Aucun fichier reçu');

  console.log('Fichier reçu :', req.file.originalname);
  console.log('Chemin temporaire sur serveur :', req.file.path);

  // Lire le contenu du fichier et l’exploiter
  try {
    const content = fs.readFileSync(req.file.path, 'utf8');
    console.log('Contenu du fichier :\n', content);

    // Exemple d’exploitation : compter le nombre de lignes
    const lineCount = content.split(/\r?\n/).length;
    console.log('Nombre de lignes :', lineCount);

    // Tu peux ajouter ici tout autre traitement que tu veux
  } catch (err) {
    console.log('Erreur lecture fichier :', err.message);
  }

  res.send('Upload et lecture OK');
});

// Endpoint de test simple
app.get('/', (req, res) => {
  res.send('Server running');
});

// Utiliser le port fourni par Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const path = require('path');

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Fichier introuvable');
  }

  res.download(filePath); // Force le téléchargement vers ton PC
});
