import { AdvancedImage } from "@cloudinary/react";
import { Link } from "react-router-dom";
import { images } from "../../../src/assets/products/cloudnary/image.jsx";
import "../../styles/categorias.scss";

const categories = [
    {
        name: "Massa Muscular",
        slug: "massa-muscular",
        description: "Whey e proteínas",
        image: images.protein, alt: "Suplemento de proteínas",
        isCloudinary: true
    },
    {
        name: "Emagrecimento",
        slug: "emagrecimento",
        description: "Thermogênicos e Vitamínas",
        image: images.cafeina,
        alt: "Suplemento de proteínas",
        isCloudinary: true
    },
    {
        name: "Energia",
        slug: "energia",
        description: "Pré-treino, Creatina e Cafeína",
        image: images.pre_sharkpro,
        alt: "Pre-treino",
        isCloudinary: true
    },
    {
        name: "Creatina",
        slug: "creatina",
        description: "Aminoácidos e creatina",
        image: images.crea_longjack,
        alt: "Creatinas",
        isCloudinary: true
    },
];

export default function Categorias() {
    return (
        <section className="categories" id="categorias">
            <div className="section-heading">
                <div>
                    <span className="eyebrow">ENCONTRE O SEU FOCO</span>
                    <h2>
                        Compre por <em>objetivo</em>
                    </h2>
                </div>
                <a href="#produtos">
                    Ver todas as categorias <span>→</span>
                </a>
            </div>
            <div className="category-grid">
                {categories.map(({ name, slug, description, image, alt, isCloudinary }) => (
                    <Link className="category-card" to={`/categoria/${slug}`} key={name}>
                        <div className="category-art">
                            <div className="circle">
                                {isCloudinary ? <AdvancedImage cldImg={image} alt={alt} /> : <img src={image} alt={alt} />}
                            </div>
                        </div>
                        <div className="infos">
                            <h3>{name}</h3>
                            <p>{description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
