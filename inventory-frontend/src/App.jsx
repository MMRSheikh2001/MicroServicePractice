
import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css'
import MainLayout from './layout/MainLayout';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import ProductForm from './components/ProductForm';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <ProductList />
      }, {
        path: '/orders',
        element: <OrderList />
      },
      {
        path: '/order-form',
        element: <OrderForm />
      },
      {
        path: '/product-form',
        element: <ProductForm />
      }

    ]
  },

]);
function Router() {


  return (
    <RouterProvider router={router} />
  )
}

export default Router