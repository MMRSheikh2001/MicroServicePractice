import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createProduct, updateProduct, getProductById } from "../api/productService";

export default function ProductForm() {
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(isEditMode);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isEditMode) return;

        async function loadProduct() {
            try {
                const product = await getProductById(id);
                setName(product.name ?? "");
                setDescription(product.description ?? "");
                setQuantity(product.quantity ?? "");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id, isEditMode]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const payload = { name, description, quantity: Number(quantity) };

        try {
            if (isEditMode) {
                await updateProduct(id, payload);
            } else {
                await createProduct(payload);
            }
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div>Loading product...</div>;

    return (
        <div className="w-full max-w-md p-4">
            <h1 className="text-xl font-bold mb-4">
                {isEditMode ? "Edit Product" : "Add Product"}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </label>

                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full"
                    />
                </label>

                <label>
                    Quantity
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        min="0"
                        className="border p-2 w-full"
                    />
                </label>

                {error && <div className="text-red-500">{error}</div>}

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
                >
                    {submitting ? "Saving..." : isEditMode ? "Update Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
}