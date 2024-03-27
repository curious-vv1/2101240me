import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";


function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {path: "/product/:id", element:<ProductDetail />}

   
  ]);

  return <RouterProvider router={router} />;
}

export default App;