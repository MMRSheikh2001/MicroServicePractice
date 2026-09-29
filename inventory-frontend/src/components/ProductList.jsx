import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getProducts, deleteProduct } from "../api/productService";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function loadProducts() {
        setLoading(true);
        setError(null);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        try {
            await deleteProduct(id);
            setProducts(products.filter((p) => p.productId !== id));
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="w-full max-w-3xl p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Products</h1>
                <Link to="/product-form" className="bg-blue-500 text-white px-3 py-2 rounded">
                    Add Product
                </Link>
            </div>

            {products.length === 0 ? (
                <div>No products yet.</div>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="p-2">ID</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.productId} className="border-b">
                                <td className="p-2">{p.productId}</td>
                                <td className="p-2">{p.name}</td>
                                <td className="p-2">{p.quantity}</td>
                                <td className="p-2 flex gap-3">
                                    <Link
                                        to={`/product-form/${p.productId}`}
                                        className="text-blue-500"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(p.productId)}
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