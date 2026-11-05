const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    // Um produto pode aparecer em mais de uma vitrine/categoria.
    categories: { type: [String], required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: String, required: true },
    oldPrice: { type: String },
    cloudinaryPublicId: { type: String, required: true },
    badge: { type: String },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
