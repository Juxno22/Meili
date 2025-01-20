const express = require('express');
const cors = require('cors');
const { MeiliSearch } = require('meilisearch');
const app = express();
app.use(cors());
app.use(express.json());

// Configuración de MeiliSearch
const client = new MeiliSearch({
  host: 'http://172.236.225.88',
  apiKey: 'a39f8477da24b1ae3b9394e646d63fd3caf9bdde8120ef1d90576ba3535d',
});

// Ruta de búsqueda
app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const index = client.index('movies');
    const searchResults = await index.search(query);
    res.json(searchResults.hits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
