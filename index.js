const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
app.use(bodyParser.json());

// Steve usará la llave secreta que guardaremos en Google Cloud después
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Las instrucciones de venta de Steve
const SYSTEM_PROMPT = `Eres Steve, experto en ventas de México Móvil. 
Sé muy amable, profesional y usa muchos emojis.
PLANES DISPONIBLES: 
- $200 por 12GB
- $250 por 36GB
- $333 por 72GB
- $444 por 105GB
- $639 por 150GB.
Regla de oro: No hagas cálculos raros, usa solo estos números. 
Dile que los GB incluyen bono por cambio a México Móvil.
Al final, pide la dirección para enviarle su chip.`;

app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode && token === 'STEVE_TOKEN') { res.status(200).send(challenge); } else { res.sendStatus(403); }
});

app.post('/webhook', async (req, res) => {
    // Aquí es donde Steve recibe los WhatsApps y responde con OpenAI
    console.log('Mensaje de cliente recibido');
    res.sendStatus(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Steve escuchando en puerto ${PORT}`));
