import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProduct, getProducts } from '../../services/products';
import pageResult from './page-results.jsx';
import '../../styles/buscar.scss';

function normalize(value = '') {
    return String(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

function findSimilarProducts(products, term) {
    const words = normalize(term).split(/[\s-]+/).filter(Boolean);

    return products
        .map((product) => {
            const id = normalize(product.id);
            const text = normalize(`${product.name} ${product.brand} ${product.description}`);
            let score = 0;

            if (id.includes(normalize(term))) score += 12;
            if (text.includes(normalize(term))) score += 8;

            words.forEach((word) => {
                if (id.includes(word)) score += 5;
                if (text.includes(word)) score += 3;
            });

            return { product, score };
        })
        .filter(({ score }) => score > 0)
        .sort((first, second) => second.score - first.score)
        .map(({ product }) => product)
        .slice(0, 10);
}

export default function Buscar({ onClose, onResults }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    function openProduct(id) {
        onClose();
        navigate(`/produto/${id}`);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const term = query.trim();

        if (!term) {
            setResult(null);
            setError('Digite o ID ou o nome de um produto para pesquisar.');
            return;
        }

        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            // A busca sempre tenta o ID na API antes de procurar alternativas.
            const product = await getProduct(term);
            openProduct(product.id);
            return;
        } catch {
            try {
                const products = await getProducts();
                const normalizedTerm = normalize(term);
                const normalizedIdMatch = products.find((product) => normalize(product.id) === normalizedTerm);

                if (normalizedIdMatch) {
                    openProduct(normalizedIdMatch.id);
                    return;
                }

                const similarProducts = findSimilarProducts(products, term);
                const searchResult = {
                    products: similarProducts.length ? similarProducts : products.slice(0, 4),
                    type: similarProducts.length ? 'similar' : 'generic',
                    term,
                };
                setResult(searchResult);
                onResults?.(searchResult);
            } catch {
                setError('Não foi possível pesquisar agora. Tente novamente em instantes.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section id="product-search-panel" className="search-panel" aria-label="Buscar produtos">
            <form className="search-form" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="product-search">ID ou nome do produto</label>
                <input
                    autoFocus
                    id="product-search"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Busque pelo nome do produto"
                    type="search"
                    value={query}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Buscando...' : 'Buscar'}
                </button>
                <button className="search-close" type="button" onClick={onClose} aria-label="Fechar busca">×</button>
            </form>

            {error && <p className="search-message" role="alert">{error}</p>}

            {result && (
                < pageResult/>
            )}
        </section>
    );
}
