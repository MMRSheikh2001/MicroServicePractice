const BASE_URL = "http://localhost:8089/api/products";

export async function getProducts() {
   const data=await fetch(BASE_URL);
   return data.json();
}

export async function createProduct(product) {
    // POST to BASE_URL with product as JSON body, return the created product
}

export async function updateProduct(id, product) {
    // PUT to BASE_URL/{id}, return the updated product
}


export async function getProductById() {
    // fetch BASE_URL, parse JSON, return it
}

export async function deleteProduct(product) {
    // POST to BASE_URL with product as JSON body, return the created product
}

