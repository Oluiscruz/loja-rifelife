import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getProduct, getProducts } from '../../services/products';
import { useCart } from '../comprar/use-cart';
import '../../styles/header.scss';
import logo from '../../assets/logo.png';

function normalize(v = '') {
  return String(v).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function findSimilar(products, term) {
  const words = normalize(term).split(/[\s-]+/).filter(Boolean);
  return products
    .map((p) => {
      let score = 0;
      const text = normalize(`${p.name} ${p.brand} ${p.description}`);
      if (normalize(p.id).includes(normalize(term))) score += 12;
      if (text.includes(normalize(term))) score += 8;
      words.forEach((w) => { if (normalize(p.id).includes(w)) score += 5; if (text.includes(w)) score += 3; });
      return { p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ p }) => p)
    .slice(0, 10);
}

export default function Header({ onResults }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const { itemCount } = useCart();

  async function handleSearch(e) {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;
    setLoading(true);
    setResults(null);
    try {
      const product = await getProduct(term);
      navigate(`/produto/${product.id}`);
      setQuery('');
      return;
    } catch {
      try {
        const all = await getProducts();
        const exact = all.find((p) => normalize(p.id) === normalize(term));
        if (exact) { navigate(`/produto/${exact.id}`); setQuery(''); return; }
        const similar = findSimilar(all, term);
        const searchResult = { products: similar.length ? similar : all.slice(0, 4), type: similar.length ? 'similar' : 'generic', term };
        setResults(searchResult);
        onResults?.(searchResult);
      } catch { /* silently fail */ }
    } finally {
      setLoading(false);
    }
  }

  const emBreve = () => {
    alert('Em breve será implementado sistemas de autenticação!');
  }

  return <>
    <div className="shipping-bar">Frete grátis para Recife em compras acima de R$ 199</div>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Rife Life - Página inicial">
        <img src={logo} alt="" />
        <h1><span>RIFE </span>LIFE<small>NUTRITION</small></h1>
      </a>
      <button className="menu-toggle" type="button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span></button>
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
        <a className="active" href="#inicio">Início</a>
        <a href="#produtos">Suplementos</a>
        <a href="#categorias">Objetivos</a>
        <a href="#ofertas">Ofertas</a>

        <form className="search" onSubmit={handleSearch}>
          <input
            id="product-search"
            placeholder="Buscar produtos"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTimeout(() => setResults(null), 200)}
          />
          <button type="submit" aria-label="Buscar">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.5" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </button>
          {results && (
            <ul className="search-dropdown">
              {results.products.map((p) => (
                <li key={p.id}>
                  <button type="button" onMouseDown={() => { navigate(`/produto/${p.id}`); setQuery(''); setResults(null); }}>
                    <span>{p.brand}</span>
                    <strong>{p.name}</strong>
                    <strong>{p.price}</strong>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>
      </nav>
      <div className="header-actions">

        <button className="account" type="button" onClick={emBreve}>
          <span>Olá, visitante</span>
          <strong>Minha conta</strong>
        </button><Link className="bag" to="/carrinho" aria-label={`Sacola com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.5 8.5h13l-1 11h-11z" />
            <path d="M8.5 9V6.7a3.5 3.5 0 0 1 7 0V9" />
          </svg>
          <b>{itemCount}</b>
        </Link>
      </div>
    </header>
  </>;
}
