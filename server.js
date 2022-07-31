const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');
const path = require('path');
const b58 = require('base-58');

const { getSequence, saveSequence } = require('./utils/sequence');
const { default: axios } = require('axios');

const root = path.join(__dirname);

const app = express();
app.use(express.json());
app.use(cors());

async function main() {
  app.listen(11983, () => {
    console.log('🚀 Running on rocket fuel');
  })
}

main();

app.post('/upload', async (req, res) => {
  // todo
});

app.post('/upload-url', async (req, res) => {
  const url = req.body.url;
  const type = req.body.type;

  if (!type.startsWith('image/png')) {
    res.json({
      'status': 'error',
      'error': {
        'message': `Unsupported type ${type}`
      }
    });

    return;
  }

  const fileExtension = type.substring('image/'.length);

  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  });

  const sequence = await getSequence();

  const fileName = b58.encode(Buffer.from(sequence.toString())) + '.' + fileExtension;
  const filePath = path.join(root, 'uploads', fileName);

  await fs.writeFile(filePath, response.data);

  saveSequence(sequence + 1);

  res.json({
    'status': 'success',
    'url': `${process.env.SERVER_URL}${fileName}`
  });
})

app.get('/:name', async (req, res) => {
  res.sendFile(path.join(root, 'uploads', req.params.name));
});