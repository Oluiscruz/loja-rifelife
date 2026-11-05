import { Link, useParams } from "react-router-dom";
import Carrosel from "../home/carrosel";
import "../../styles/pagina-categoria.scss";

const categoryDetails = {
    'massa-muscular': {
        eyebrow: "NUTRIÇÃO E PERFORMANCE",
        title: "Massa Muscular",
        description: "Whey proteins selecionados para apoiar sua rotina e seus objetivos.",
    },
    creatina: {
        eyebrow: "FORÇA E DESEMPENHO",
        title: "Creatina",
        description: "Suplemento para aumentar a reserva de energia no organismo",
    },
    emagrecimento: {
        eyebrow: "EMAGRECIMENTO SAUDÁVEL",
        title: "Emagrecimento",
        description: "Suplemento para auxiliar no processo de emagrecimento",
    },
    energia: {
        eyebrow: "ENERGIA E DESEMPENHO",
        title: "Energia",
        description: "Suplemento para aumentar a quantidade de energia no organismo",
    },
};

export default function PageCategoria() {
    const { category } = useParams();
    const details = categoryDetails[category];

    if (!details) {
        return (
            <main className="category-page category-not-found">
                <h1>Categoria não encontrada</h1>
                <Link to="/">Voltar para a loja</Link>
            </main>
        );
    }

    return (
        <main className="category-page">
            <div className="category-breadcrumb">
                <Link to="/">Início</Link>
                <span>/</span> {details.title}
            </div>
            <header className="category-page-heading">
                <div>
                    <span className="eyebrow">{details.eyebrow}</span>
                    <h1>{details.title}</h1>
                </div>
                <p>{details.description}</p>
            </header>
            <section className="category-products" aria-label={`Produtos de ${details.title}`}>
                <div className="category-products-heading">
                    <h2>Produtos em destaque</h2>
                    <span>Escolha o seu próximo passo</span>
                </div>
                <Carrosel category={category} />
            </section>
        </main>
    );
}