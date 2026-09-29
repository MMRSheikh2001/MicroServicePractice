

const BASE_URL = "/api/products";

export async function getProducts() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return response.json();
}

export async function getProductById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product ${id}: ${response.status}`);
    }
    return response.json();
}

export async function createProduct(product) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error(`Failed to create product: ${response.status}`);
    }
    return response.json();
}

export async function updateProduct(id, product) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error(`Failed to update product ${id}: ${response.status}`);
    }
    return response.json();
}

export async function deleteProduct(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Failed to delete product ${id}: ${response.status}`);
    }
    return response.text();
}