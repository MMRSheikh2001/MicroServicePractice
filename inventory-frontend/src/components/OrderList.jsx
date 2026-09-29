import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getOrders, deleteOrder } from "../api/orderService";
import { getProducts } from "../api/productService";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [productMap, setProductMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function loadData() {
        setLoading(true);
        setError(null);
        try {
            const [ordersData, productsData] = await Promise.all([
                getOrders(),
                getProducts(),
            ]);

            const map = {};
            for (const p of productsData) {
                map[p.productId] = p.name;
            }

            setOrders(ordersData);
            setProductMap(map);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        try {
            await deleteOrder(id);
            setOrders(orders.filter((o) => o.orderId !== id));
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="w-full max-w-3xl p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Order History</h1>
                <Link to="/order-form" className="bg-blue-500 text-white px-3 py-2 rounded">
                    Place Order
                </Link>
            </div>

            {orders.length === 0 ? (
                <div>No orders yet.</div>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="p-2">Order ID</th>
                            <th className="p-2">Product</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2">Customer</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => (
                            <tr key={o.orderId} className="border-b">
                                <td className="p-2">{o.orderId}</td>
                                <td className="p-2">
                                    {productMap[o.productId] ?? `#${o.productId} (deleted)`}
                                </td>
                                <td className="p-2">{o.quantity}</td>
                                <td className="p-2">{o.customerName}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleDelete(o.orderId)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}