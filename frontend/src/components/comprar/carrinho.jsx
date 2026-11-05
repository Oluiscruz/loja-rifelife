import { AdvancedImage } from "@cloudinary/react";
import { Link } from "react-router-dom";
import { cloudImage } from "../../assets/products/cloudnary/image.jsx";
import { useCart } from "./use-cart";
import "../../styles/carrinho.scss";

function priceToNumber(price) {
    const normalized = String(price).replace(/[^\d,.-]/g, "");
    return (
        Number(
            normalized.includes(",")
                ? normalized.replace(/\./g, "").replace(",", ".")
                : normalized,
        ) || 0
    );
}

function formatPrice(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Carrinho() {
    const { items, updateQuantity, removeItem } = useCart();
    const total = items.reduce(
        (sum, item) => sum + priceToNumber(item.price) * item.quantity,
        0,
    );

    return (
        <main className="cart-page">
            <div className="cart-breadcrumb">
                <Link to="/">Início</Link>
                <span>/</span> Minha sacola
            </div>
            <div className="cart-heading">
                <div>
                    <span className="eyebrow">SUA SELEÇÃO</span>
                    <h1>Minha sacola</h1>
                </div>
                {items.length > 0 && (
                    <span>
                        {items.length} {items.length === 1 ? "produto" : "produtos"}
                    </span>
                )}
            </div>
            {items.length === 0 ? (
                <section className="empty-cart">
                    <h2>Sua sacola está vazia</h2>
                    <p>Escolha seus suplementos favoritos para começar sua compra.</p>
                    <Link to="/" className="cart-primary-action">
                        Ver produtos <span>→</span>
                    </Link>
                </section>
            ) : (
                <div className="cart-layout">
                    <section className="cart-items" aria-label="Produtos na sacola">
                        {items.map((item) => (
                            <article className="cart-item" key={item.id}>
                                <div className="cart-item-image">
                                    <AdvancedImage
                                        cldImg={cloudImage(item.cloudinaryPublicId)}
                                        alt={item.name}
                                    />
                                </div>
                                <div className="cart-item-details">
                                    <span>{item.brand}</span>
                                    <h2>{item.name}</h2>
                                    <p>{formatPrice(priceToNumber(item.price))}</p>
                                </div>
                                <label className="cart-quantity">
                                    <span>Quantidade</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(event) =>
                                            updateQuantity(item.id, event.target.value)
                                        }
                                    />
                                </label>
                                <strong className="cart-item-total">
                                    {formatPrice(priceToNumber(item.price) * item.quantity)}
                                </strong>
                                <button
                                    className="remove-item"
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                >
                                    Remover
                                </button>
                            </article>
                        ))}
                    </section>
                    <aside className="cart-summary">
                        <h2>Resumo do pedido</h2>
                        <div>
                            <span>Subtotal</span>
                            <strong>{formatPrice(total)}</strong>
                        </div>
                        <p>O valor e o frete serão confirmados no atendimento.</p>
                        <Link to="/finalizar-compra" className="cart-primary-action">
                            Finalizar compra <span>→</span>
                        </Link>
                        <Link to="/" className="continue-shopping">
                            ← Continuar comprando
                        </Link>
                        <p className="whatsapp-notice" role="note">
                            <span aria-hidden="true">◉</span> Os pagamentos são concluídos
                            pelo WhatsApp com um de nossos consultores.
                        </p>
                    </aside>
                </div>
            )}
        </main>
    );
}
