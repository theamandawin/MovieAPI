const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const quotesFilePath = path.join(__dirname, 'movieQuotes.json');
const movieQuotes = JSON.parse(fs.readFileSync(quotesFilePath, 'utf-8'));

app.post('/api/getMovieQuote', (req, res) => {
  const { name } = req.body;

  const randomIndex = Math.floor(Math.random() * movieQuotes.length);
  const quote = movieQuotes[randomIndex];

  // to integrate the user's name input in the quote
  const personalizedQuote = quote.text.replace('[name]', name);

  res.json({ quote: personalizedQuote });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
