import { Outlet, Link } from "react-router";

export default function MainLayout() {
    return (
        <div>
            <nav className="flex gap-4 p-4 border-b">
                <Link to="/">Products</Link>
                <Link to="/product-form">Add Product</Link>
                <Link to="/orders">Order History</Link>
                <Link to="/order-form">Place Order</Link>
            </nav>
            <div className="min-h-screen flex justify-center items-center">
                <Outlet />
            </div>
        </div>
    )
}