const BASE_URL = "http://localhost:8089/api/products";

export async function getProducts() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return response.json();
}

export async function createProduct(product) {




    // The data you want to send to the server
    const postData = {
        title: 'product',
        body: product,

    };

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST', // 1. Specify the HTTP method
            headers: {
                'Content-Type': 'application/json' // 2. Tell the server you're sending JSON
            },
            body: JSON.stringify(postData) // 3. Convert your JavaScript object into a JSON string
        });

        // Fetch only throws an error on network failure. 
        // You must check response.ok to catch HTTP errors like 404 or 500.
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // 4. Parse the JSON response from the server
        console.log('Success:', data);
    } catch (error) {
        console.error('Error during fetch:', error);
    }

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

