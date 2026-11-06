const apiUrl = import.meta.env.API;

async function request(path) {
    const response = await fetch(`${apiUrl}${path}`);

    if (!response.ok) {
        throw new Error('Não foi possível carregar os produtos.');
    }

    return response.json();
}

export function getProducts(category) {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return request(`/products${query}`);
}

export function getProduct(id) {
    return request(`/products/${encodeURIComponent(id)}`);
}
