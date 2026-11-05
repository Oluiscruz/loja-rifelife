require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Servidor rodando e conectado ao Express e MongoDB!' });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!');
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} 🎯`));
    })
    .catch((err) => console.error('Erro ao conectar ao MongoDB: ', err));

