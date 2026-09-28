const BASE_URL = "http://localhost:8089/api/products";

export async function getProducts() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return response.json();
}

export async function createProduct(product) {
    
    

}

export async function updateProduct(id, product) {
    // PUT to BASE_URL/{id}, return the updated product
}


export async function getProductById(id) {

    const url = BASE_URL + "/" + id;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return response.json();




}

export async function deleteProduct(product) {
    // POST to BASE_URL with product as JSON body, return the created product
}

