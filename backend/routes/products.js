const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Listar todos
router.get('/', async (req, res) => {
    const { category } = req.query;
    const filter = category ? { categories: category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
});

// Buscar por id
router.get('/:id', async (req, res) => {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
});

// Criar
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Atualizar
router.put('/:id', async (req, res) => {
    const product = await Product.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
});

// Deletar
router.delete('/:id', async (req, res) => {
    await Product.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Produto removido' });
});

module.exports = router;
