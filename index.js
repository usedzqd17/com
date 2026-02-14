const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.send('Aucun fichier reçu');

  console.log('Fichier reçu :', req.file.originalname);
  console.log('Chemin temporaire sur serveur :', req.file.path);
  console.log('Cookies :', req.cookies);

  // Lire le contenu du fichier
  try {
    const content = fs.readFileSync(req.file.path, 'utf8');
    console.log('Contenu du fichier :\n', content);

    // Exemple d’exploitation : compter les lignes
    const lineCount = content.split(/\r?\n/).length;
    console.log('Nombre de lignes :', lineCount);

    // Tu peux faire d’autres traitements ici
    // Ex : recherche de patterns, exécution de fonctions, etc.
  } catch (err) {
    console.log('Erreur lecture fichier :', err.message);
  }

  res.send('Upload et lecture OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
