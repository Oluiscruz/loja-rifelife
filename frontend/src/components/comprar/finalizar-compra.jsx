import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./use-cart";
import "../../styles/carrinho.scss";

const CONSULTANT_PHONE = "5581993051330";

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

export default function FinalizarCompra() {
    const { items } = useCart();
    const navigate = useNavigate();
    const total = items.reduce(
        (sum, item) => sum + priceToNumber(item.price) * item.quantity,
        0,
    );

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const products = items
            .map(
                (item) =>
                    `• ${item.quantity}x ${item.name} — ${formatPrice(priceToNumber(item.price) * item.quantity)}`,
            )
            .join("\n");
        const message = [
            "Olá, Eduarda! Gostaria de finalizar esta compra:",
            "",
            "*Produtos escolhidos:*",
            products,
            `\n*Subtotal:* ${formatPrice(total)}`,
            "",
            "*Dados para entrega:*",
            `Nome: ${data.get("name")}`,
            `Celular: ${data.get("phone")}`,
            `Endereço: ${data.get("street")}, ${data.get("number")} - ${data.get("neighborhood")} - CEP: ${data.get("zipCode")}`,
        ].join("\n");
        window.location.assign(
            `https://wa.me/${CONSULTANT_PHONE}?text=${encodeURIComponent(message)}`,
        );
    }

    if (items.length === 0)
        return (
            <main className="checkout-page checkout-empty">
                <h1>Não há produtos para finalizar</h1>
                <p>Adicione itens à sua sacola antes de falar com nossa consultora.</p>
                <Link to="/" className="cart-primary-action">
                    Ver produtos <span>→</span>
                </Link>
            </main>
        );

    return (
        <main className="checkout-page">
            <div className="cart-breadcrumb">
                <Link to="/">Início</Link>
                <span>/</span>
                <Link to="/carrinho">Minha sacola</Link>
                <span>/</span> Finalizar compra
            </div>
            <div className="checkout-heading">
                <span className="eyebrow">QUASE LÁ</span>
                <h1>Dados para entrega</h1>
                <p>
                    Preencha seus dados para que a consultora Eduarda conclua seu pedido
                    pelo WhatsApp.
                </p>
            </div>
            <div className="checkout-layout">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <label>
                        Nome completo
                        <input name="name" autoComplete="name" required />
                    </label>
                    <label>
                        Celular
                        <input
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </label>
                    <fieldset>
                        <legend>Endereço de entrega</legend>
                        <label className="field-wide">
                            Nome da rua
                            <input name="street" autoComplete="street-address" required />
                        </label>
                        <label>
                            Número
                            <input name="number" inputMode="numeric" required />
                        </label>
                        <label>
                            Bairro
                            <input
                                name="neighborhood"
                                autoComplete="address-level3"
                                required
                            />
                        </label>
                        <label className="field-wide">
                            CEP
                            <input
                                name="zipCode"
                                autoComplete="postal-code"
                                inputMode="numeric"
                                placeholder="00000-000"
                                required
                            />
                        </label>
                    </fieldset>
                    <button className="cart-primary-action" type="submit">
                        Finalizar compra no WhatsApp <span>→</span>
                    </button>
                    <p className="whatsapp-notice" role="note">
                        <span aria-hidden="true">◉</span> Os pagamentos são concluídos pelo
                        WhatsApp com um de nossos consultores.
                    </p>
                </form>
                <aside className="checkout-summary">
                    <h2>Seu pedido</h2>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <span>
                                    {item.quantity}x {item.name}
                                </span>
                                <strong>
                                    {formatPrice(priceToNumber(item.price) * item.quantity)}
                                </strong>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <span>Subtotal</span>
                        <strong>{formatPrice(total)}</strong>
                    </div>
                    <button
                        className="continue-shopping checkout-back"
                        type="button"
                        onClick={() => navigate("/carrinho")}
                    >
                        ← Voltar para a sacola
                    </button>
                </aside>
            </div>
        </main>
    );
}
