const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/relay', async (req, res) => {
  try {
    const target = process.env.N8N_WEBHOOK_URL;
    await axios.post(target, req.body);
    res.status(200).send('Forwarded to N8N');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Failed to forward');
  }
});

app.get('/', (req, res) => res.send('Relay is up and running.'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
