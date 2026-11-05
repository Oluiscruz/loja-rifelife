import '../../styles/buscar.scss';


export default function pageResult() {

    return (
        <div className="search-results" aria-live="polite">
            <p className="search-message">
                {result.type === 'similar'
                    ? <>Produtos semelhantes a <strong>“{result.term}”</strong></>
                    : <>Não encontramos <strong>“{result.term}”</strong>. Veja alguns produtos:</>}
            </p>
            <ul>
                {result.products.map((product) => (
                    <li key={product.id}>
                        <button type="button" onClick={() => openProduct(product.id)}>
                            <span>{product.brand}</span>
                            <strong>{product.name}</strong>
                            <small>ID: {product.id}</small>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}