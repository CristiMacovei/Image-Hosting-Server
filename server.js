const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');
const path = require('path');

const { getSequence, saveSequence } = require('./utils/sequence');

const root = path.join(__dirname);

const app = express();
app.use(express.json());
app.use(cors());

let sequence = null;

async function main() {
  sequence = await getSequence();
  
  if (sequence === null) {
    console.log('Error when parsing sequence');
    return;
  }

  app.listen(11983, () => {
    console.log('🚀 Running on rocket fuel');
  })
}

main();

app.post('/upload', async (req, res) => {
  // todo
});

app.get('/:name', async (req, res) => {
  res.sendFile(path.join(root, 'uploads', req.params.name));
});