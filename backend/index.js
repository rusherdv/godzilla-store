const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const port = 3000;
const discordToken = process.env.discordToken;
const channelId = process.env.channelID;
dotenv.config();

app.use(bodyParser.json());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(discordToken);

app.post('/makeorder', (req, res) => {
  const { orderId, items, email, accountData } = req.body;

  sendDiscordMessage(`Nueva orden:
    Order ID: ${orderId}
    Items: ${items}
    Email: ${email}
    Account Data: ${accountData}
  `);

  res.status(200).send('Solicitud procesada correctamente.');
});

function sendDiscordMessage(message) {
  const channel = client.channels.cache.get(channelId);

  if (channel && channel.isText()) {
    channel.send(message)
      .then(sentMessage => console.log('Mensaje enviado a Discord:', sentMessage.content))
      .catch(error => console.error('Error al enviar el mensaje a Discord:', error));
  } else {
    console.error('No se pudo encontrar el canal de Discord.');
  }
}

client.once('ready', () => {
  console.log('Bot de Discord listo');
});

client.on('ready', () => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
});
