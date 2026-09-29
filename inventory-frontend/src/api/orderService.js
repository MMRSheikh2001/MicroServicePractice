const BASE_URL = "/api/orders";

export async function getOrders() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
    }
    return response.json();
}

export async function getOrderById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch order ${id}: ${response.status}`);
    }
    return response.json();
}

export async function createOrder(order) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error(`Failed to place order: ${response.status}`);
    }
    return response.json();
}

export async function deleteOrder(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Failed to delete order ${id}: ${response.status}`);
    }
    return response.text();
}