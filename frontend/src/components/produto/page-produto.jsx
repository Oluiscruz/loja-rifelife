import "../../styles/pageProduct.scss";
import { AdvancedImage } from "@cloudinary/react";
import { useEffect, useState } from "react";
import { cloudImage } from "../../assets/products/cloudnary/image.jsx";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../services/products";
import { useCart } from "../comprar/use-cart";

export default function PageProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();

    useEffect(() => {
        let cancelled = false;

        setIsLoading(true);
        setProduct(null);
        setQuantity(1);
        getProduct(id)
            .then((data) => {
                if (!cancelled) setProduct(data);
            })
            .catch(() => {
                if (!cancelled) setProduct(null);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    return (
        <div className="product-page">
            <div className="product-breadcrumb">
                <Link to="/">Início</Link>
                <span>/</span> Produto
            </div>
            {isLoading ? (
                <p>Carregando produto...</p>
            ) : product ? (
                <section className="product-detail">
                    <div className="product-detail-image">
                        <span className="product-badge">{product.badge}</span>
                        <AdvancedImage
                            cldImg={cloudImage(product.cloudinaryPublicId)}
                            alt={product.name}
                        />
                    </div>
                    <div className="product-detail-info">
                        <span className="eyebrow">{product.brand}</span>
                        <h1>{product.name}</h1>
                        <div className="detail-rating" aria-label="5 de 5 estrelas">
                            ★★★★★ <span>(18 avaliações)</span>
                        </div>
                        <p className="product-description">{product.description}</p>
                        <p className="old-price">De R$ {product.oldPrice}</p>
                        <p className="detail-price">
                            R$ <strong>{product.price}</strong>
                        </p>
                        <p className="installments">
                            ou 3x de R${" "}
                            {(Number(String(product.price).replace(",", ".")) / 3)
                                .toFixed(2)
                                .replace(".", ",")}{" "}
                            sem juros
                        </p>
                        <div className="purchase-row">
                            <label htmlFor="quantity">
                                Quantidade
                                <input id="quantity" type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                            </label>
                            <button type="button" onClick={() => addItem(product, quantity)}>
                                Adicionar à sacola <span>+</span>
                            </button>
                        </div>
                        <ul className="product-perks">
                            <li>Produto original e com nota fiscal</li>
                            <li>Envio rápido para todo Pernambuco</li>
                            <li>Compra segura e protegida</li>
                        </ul>
                    </div>
                </section>
            ) : (
                <section className="product-not-found">
                    <h1>Produto não encontrado</h1>
                    <Link to="/">Voltar para a loja</Link>
                </section>
            )}
        </div>
    );
}
