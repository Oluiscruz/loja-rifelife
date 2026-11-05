import { AdvancedImage } from "@cloudinary/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cloudImage } from "../../assets/products/cloudnary/image.jsx";
import { getProducts } from "../../services/products";
import { useCart } from "../comprar/use-cart";
import "../../styles/carrosel.scss";

export default function Carrosel({ category, products: providedProducts }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const { addItem } = useCart();

    useEffect(() => {
        let cancelled = false;

        if (providedProducts) {
            setIsLoading(false);
            setError("");
            return () => {
                cancelled = true;
            };
        }

        setIsLoading(true);
        setError("");
        getProducts(category)
            .then((data) => {
                if (!cancelled) setProducts(data);
            })
            .catch(() => {
                if (!cancelled) setError("Não foi possível carregar os produtos.");
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [category, providedProducts]);

    const goToProduct = (id) => navigate(`/produto/${id}`);

    if (isLoading) return <p>Carregando produtos...</p>;
    if (error) return <p>{error}</p>;
    const visibleProducts = providedProducts ?? products;

    if (!visibleProducts.length) return <p>Nenhum produto encontrado nesta categoria.</p>;

    return (
        <div className="product-grid">
            {visibleProducts.map((product) => (
                <article className="product-card" key={product.id} onClick={() => goToProduct(product.id)}>
                    <div className="product-image">
                        <span className="product-badge">{product.badge}</span>
                        <button
                            aria-label={"Adicionar " + product.name + " aos favoritos"}
                            className="favorite"
                        >
                        </button>
                        <AdvancedImage
                            cldImg={cloudImage(product.cloudinaryPublicId)}
                            alt={product.name}
                        />
                    </div>
                    <div className="product-details">
                        <p className="product-brand">{product.brand}</p>
                        <h3>{product.name}</h3>
                        <div className="stars" aria-label="5 de 5 estrelas">
                            ★★★★★ <small>(18)</small>
                        </div>
                        {product.oldPrice && (
                            <p className="old-price">De R$ {product.oldPrice}</p>
                        )}
                        <p className="price">
                            R$ <strong>{product.price}</strong>
                        </p>
                        <p className="installments">
                            ou 3x de R${" "}
                            {(Number(String(product.price).replace(",", ".")) / 3)
                                .toFixed(2)
                                .replace(".", ",")}{" "}
                            sem juros
                        </p>
                        <button className="add-cart" type="button" onClick={(event) => { event.stopPropagation(); addItem(product); }}>
                            Adicionar <span>+</span>
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}
