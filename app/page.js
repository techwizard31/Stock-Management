"use client";
import Header from "@/components/Header.js";
import { useEffect, useState } from "react";

export default function Home() {
  const [productform, setProductform] = useState({
    slug: "",
    quantity: "",
    price: "",
  });
  const [products, setProducts] = useState();
  const [dropdown, setDropdown] = useState([]);

  const addproduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/mongo", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(productform),
      });
      if (response.ok) {
        alert("product added");
        setProductform({ slug: "", quantity: 0, price: "" });
        getproducts();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlechange = async (e) => {
    setProductform({ ...productform, [e.target.name]: e.target.value });
  };

  const getproducts = async () => {
    try {
      const response = await fetch("/api/mongo", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json(); // Call json() as a method
        setProducts(data.allProducts);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getproducts();
  }, []);

  const editdropdown = async (search) => {
    try {
      const response = await fetch(`/api/search?slug=${search}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json(); 
        setDropdown(data.allProducts);
        setTimeout(() => {
          setDropdown([]); 
        }, 10000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-8 pt-2">
        <div className="text-2xl font-bold text-gray-800 border-gray-300 flex flex-row">
          <h1 className="whitespace-nowrap mt-2">Search a Product</h1>
          <div className="ml-4 relative flex flex-row gap-4 w-4/5">
            {/* Dropdown - example with static items */}
            <div className="relative flex w-full h-fit flex-col">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for a product..."
                onChange={(e) => editdropdown(e.target.value)}
                onBlur={() => setDropdown({})}
              />
              {Array.isArray(dropdown) && dropdown.length > 0 && (
                <div className=" w-full mt-2 border rounded bg-white z-10 h-20 overflow-y-scroll">
                  {dropdown.map((item) => (
                    <div
                      className="flex justify-between p-2 my-1 border-b-2 border-b-slate-300"
                      key={item.slug}
                    >
                      <span className="slug">{item.slug}</span>
                      <span className="price">{item.price}</span>
                      <span className="quantity">{item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <select className="p-2 border border-gray-300 rounded-md shadow-sm h-fit font-medium">
              <option
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                value=""
              >
                All
              </option>
              <option
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                value="Category A"
              >
                Category A
              </option>
              <option
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                value="Category B"
              >
                Category B
              </option>
              {/* Additional items can be dynamically added */}
            </select>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 p-4">
          Add a Product
        </h1>
        <form className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Slug
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
              onChange={handlechange}
              name="slug"
              value={productform.slug}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter quantity"
              onChange={handlechange}
              name="quantity"
              value={productform.quantity}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter price"
              onChange={handlechange}
              name="price"
              value={productform.price}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="w-1/5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mx-auto"
              onClick={addproduct}
            >
              Add Product
            </button>
          </div>
        </form>

        {/* Display Current Stock Heading */}
        <div className="container mx-auto p-4 pt-2 mt-4">
          <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Display Current Stock
          </h1>

          {/* Stock Table */}
          <div className="mt-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Product Name</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Price</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => {
                    return (
                      <tr key={product.slug}>
                        <td className="py-2 px-4 border-b">{product.slug}</td>
                        <td className="py-2 px-4 border-b">
                          {product.quantity}
                        </td>
                        <td className="py-2 px-4 border-b">₹{product.price}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
