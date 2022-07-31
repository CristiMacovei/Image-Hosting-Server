const fs = require('fs/promises');

async function getSequence() {
  try {
    const data = await fs.readFile('./config/sequence', 'utf-8');

    const sequence = Number.parseInt(data);

    return sequence;
  }
  catch (e) {
    console.log(`Encountered error when parsing sequence from file: ${e.message}`);

    return null;
  }
}

async function saveSequence(sequence) {
  try {
    await fs.writeFile('./config/sequence', sequence.toString(), 'utf-8');

    return true;
  }
  catch (e) {
    console.log(`Encountered error when saving sequence to file: ${e.message}`);

    return false;
  }
}

module.exports = {
  getSequence,
  saveSequence
};