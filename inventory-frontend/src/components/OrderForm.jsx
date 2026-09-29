import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createOrder } from "../api/orderService";
import { getProducts } from "../api/productService";

export default function OrderForm() {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
                if (data.length > 0) {
                    setProductId(String(data[0].productId));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await createOrder({
                productId: Number(productId),
                quantity: Number(quantity),
                customerName,
            });
            navigate("/orders");
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div>Loading products...</div>;

    if (products.length === 0) {
        return <div>No products available. Add a product first.</div>;
    }

    return (
        <div className="w-full max-w-md p-4">
            <h1 className="text-xl font-bold mb-4">Place Order</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label>
                    Product
                    <select
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                        className="border p-2 w-full"
                    >
                        {products.map((p) => (
                            <option key={p.productId} value={p.productId}>
                                {p.name} ({p.quantity} in stock)
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Quantity
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        min="1"
                        className="border p-2 w-full"
                    />
                </label>

                <label>
                    Customer Name
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </label>

                {error && <div className="text-red-500">{error}</div>}

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
                >
                    {submitting ? "Placing Order..." : "Place Order"}
                </button>
            </form>
        </div>
    );
}