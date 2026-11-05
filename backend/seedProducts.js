require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./models/Product');

// Estes valores são os public IDs das imagens já hospedadas no Cloudinary.
// Não armazene o objeto do SDK ou a URL transformada no MongoDB.
const products = [
    {
        id: 'creatina-monohidratada',
        categories: ['creatina'],
        name: 'Creatina Premium - 300g',
        brand: 'UNIÃO VEGETAL',
        price: '110,00',
        oldPrice: '134,80',
        cloudinaryPublicId: 'creatina-premium_zygj06',
        badge: '-11%',
        description: 'Creatina monohidratada para mais força, potência e desempenho nos seus treinos.',
    },
    {
        id: 'whey-double-tasty',
        categories: ['massa-muscular'],
        name: '100% Whey Double Tasty',
        brand: 'Max Titanium',
        price: '209,99',
        oldPrice: '234,75',
        cloudinaryPublicId: 'MAX-DOUBLE-TASTY-MORANGO_nzhkrb',
        badge: '-11%',
        description: 'Whey Protein com sabor em dobro',
    },
    {
        id: 'whey-dux',
        categories: ['massa-muscular'],
        name: 'Whey Protein Dux',
        brand: 'Dux Nutrition',
        price: '285,99',
        oldPrice: '305,00',
        cloudinaryPublicId: 'DUX-CONCENTRADO_codqlo',
        badge: '-11%',
        description: 'Whey Protein da Dux, uma das melhores avaliadas',
    },
    {
        id: 'creatina-atlhetica',
        categories: ['creatina'],
        name: '100% PURA Creatina Monohidratada - 300g',
        brand: 'ATLHETICA NUTRITION',
        price: '89,90',
        oldPrice: '109,90',
        cloudinaryPublicId: 'Creatina-atlhetica-2_ykh6nz',
        badge: '-11%',
        description: 'Creatina monohidratada para mais força, potência e desempenho nos seus treinos.',
    },
    {
        id: 'creatina-vitafor',
        categories: ['creatina'],
        name: 'Creatina Vitafor - 300g',
        brand: 'VITAFOR',
        price: '99,90',
        oldPrice: '109,90',
        cloudinaryPublicId: 'CREATINA-VITAFOR_hkrqbe',
        badge: '-10%',
        description: 'Creatina monohidratada para mais força, potência e desempenho nos seus treinos.',
    },
    {
        id: 'protein',
        categories: ['massa-muscular'],
        name: 'Protein Crush - Chocotine 900g',
        brand: 'UNDER LABZ',
        price: '184,96',
        oldPrice: '214,80',
        cloudinaryPublicId: 'PROTEIN-CRUSH-CHOCOTINE._ybkvbu.png',
        badge: '-10%',
        description: 'Whey protein crush da Under Labz sabor chocotine de 900g refil.',
    },
    {
        id: 'isofort',
        categories: ['massa-muscular', 'emagrecimento'],
        name: 'Whey Isofort',
        brand: 'VITAFOR',
        price: '390,00',
        oldPrice: '460,00',
        cloudinaryPublicId: 'ISOFORT-VITAFOR_liemlr',
        badge: '-15%',
        description: 'Whey protein isolada do leite de 900g.',
    },
    {
        id: 'creatina-probiotica',
        categories: ['creatina'],
        name: 'Creatina Probiótica - 300g',
        brand: 'PROBIÓTICA',
        price: '75,00',
        oldPrice: '99,90',
        cloudinaryPublicId: 'CREATINA-PROBIOTICA_v30wa1',
        badge: '-15%',
        description: 'Creatina probiótica de 300g o pote',
    },
    {
        id: 'creatina-longjack-creapure',
        categories: ['creatina', 'emagrecimento', 'energia'],
        name: 'Creatina Long Jack Creapure - 250g',
        brand: 'LONG JACK',
        price: '190,00',
        oldPrice: '214,70',
        cloudinaryPublicId: 'creapure_nj9njz',
        badge: '-15%',
        description: 'Creatina long jack de 250g o pote com selo de qualidade creapure.',
    },
    {
        id: 'beef-protein',
        categories: ['massa-muscular'],
        name: 'Beef Protein - 900g',
        brand: 'SHARK PRO',
        price: '213,00',
        oldPrice: '250,00',
        cloudinaryPublicId: 'BEEF-PROTEIN-LARANJA-ACEROLA_dtlwcz',
        badge: '-15%',
        description: 'Whey Beef Protein 900g. Proteína advinda da carne animal. Zero lactose',
    },
    {
        id: 'whey-probiotica',
        categories: ['massa-muscular'],
        name: '100% Whey Probiótica - 900g',
        brand: 'PROBIÓTICA',
        price: '285,00',
        oldPrice: '320,00',
        cloudinaryPublicId: 'PURE-WHEY-PROBIOTICA_vkulrw',
        badge: '-15%',
        description: 'Whey Probiótica 900g. Proteína advinda da lactose.',
    },
    {
        id: 'whey-best-vegan',
        categories: ['massa-muscular', 'emagrecimento'],
        name: 'Whey Best Vegan - 500g',
        brand: 'ATLHETICA NUTRITION',
        price: '210,00',
        oldPrice: '225,00',
        cloudinaryPublicId: 'Whey-best-vegan-cacau_x1wypb',
        badge: '-15%',
        description: 'Whey Best Vegan de 500g. Uma whey 100% zero lactose, zero açúcar e zero glúten.',
    },
];

async function seed() {
    if (!process.env.MONGO_URI) {
        throw new Error('Defina MONGO_URI no arquivo .env antes de executar o seed.');
    }

    await mongoose.connect(process.env.MONGO_URI);
    await Product.bulkWrite(
        products.map((product) => ({
            updateOne: {
                filter: { id: product.id },
                update: { $set: product },
                upsert: true,
            },
        })),
    );
    console.log(`${products.length} produtos criados ou atualizados.`);
}

seed()
    .catch((error) => {
        console.error('Falha ao popular os produtos:', error.message);
        process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
