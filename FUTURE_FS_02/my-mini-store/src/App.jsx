import React, { useState } from "react";
import { ShoppingCart, Search, Plus, Minus, Trash2, CheckCircle } from "lucide-react";

// ---------------------------------------------------------
// 1. HARDCODED DATA (Mock Database)
// ---------------------------------------------------------
const PRODUCTS = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 59.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "High quality wireless sound with noise cancellation.",
  },
  {
    id: 2,
    title: "Smart Watch Series 5",
    price: 129.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Track your fitness and stay connected.",
  },
  {
    id: 3,
    title: "Running Sneakers",
    price: 89.99,
    category: "Fashion",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Lightweight and comfortable for long runs.",
  },
  {
    id: 4,
    title: "Leather Backpack",
    price: 45.50,
    category: "Fashion",
    image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Durable leather bag for work or travel.",
  },
  {
    id: 5,
    title: "Mechanical Keyboard",
    price: 75.00,
    category: "Electronics",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Tactile switches for the ultimate typing experience.",
  },
  {
    id: 6,
    title: "Aviator Sunglasses",
    price: 25.00,
    category: "Fashion",
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Classic style with UV protection.",
  },
];

export default function App() {
  const [view, setView] = useState("home"); 
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderDetails, setOrderDetails] = useState(null);

  // --- ACTIONS ---

  // Add Item to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert("Added to cart!");
  };

  // Remove Item from Cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Update Quantity
  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Filter Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle Checkout Submission
  const handleCheckout = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = {
      name: formData.get("name"),
      address: formData.get("address"),
      total: totalPrice,
      id: Math.floor(Math.random() * 10000),
    };
    setOrderDetails(orderData);
    setCart([]); // Clear cart
    setView("success");
  };

  // --- RENDER VIEWS ---

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* HEADER / NAVIGATION */}
      <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            className="text-2xl font-bold cursor-pointer flex items-center gap-2" 
            onClick={() => setView("home")}
          >
            🛒 MiniStore
          </h1>
          
          {/* Search Bar (Only visible on Home) */}
          {view === "home" && (
            <div className="hidden md:flex bg-white rounded-lg px-3 py-1 items-center w-1/3">
              <Search className="text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="ml-2 w-full outline-none text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {/* Cart Icon */}
          <button 
            className="relative p-2 hover:bg-blue-700 rounded-full transition"
            onClick={() => setView("cart")}
          >
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="container mx-auto px-4 py-8">
        
        {/* VIEW: PRODUCT LISTING (HOME) */}
        {view === "home" && (
          <>
            {/* Category Filter */}
            <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
              {["All", "Electronics", "Fashion"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                    <p className="text-xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-auto w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center text-gray-500 mt-10">No products found matching your search.</div>
            )}
          </>
        )}

        {/* VIEW: SHOPPING CART */}
        {view === "cart" && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow">
                <p className="text-gray-500 mb-4">Your cart is empty.</p>
                <button onClick={() => setView("home")} className="text-blue-600 hover:underline">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center border-b p-4 last:border-b-0">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-500">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3 mr-6">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-gray-100 rounded hover:bg-gray-200">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
                  <div className="text-xl font-bold">Total: ${totalPrice}</div>
                  <button 
                    onClick={() => setView("checkout")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: CHECKOUT FORM */}
        {view === "checkout" && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input required name="name" type="text" className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input required name="email" type="email" className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                <textarea required name="address" rows="3" className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="123 Main St, City, Country"></textarea>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total Amount</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setView("cart")} 
                    className="w-1/2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="w-1/2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* VIEW: SUCCESS CONFIRMATION */}
        {view === "success" && orderDetails && (
          <div className="max-w-md mx-auto text-center bg-white p-10 rounded-xl shadow-lg mt-10">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">Thank you, {orderDetails.name}. Your order has been placed successfully.</p>
            <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-700 space-y-2 mb-6">
              <p><strong>Order ID:</strong> #{orderDetails.id}</p>
              <p><strong>Total Amount:</strong> ${orderDetails.total}</p>
              <p><strong>Shipping to:</strong> {orderDetails.address}</p>
            </div>
            <button 
              onClick={() => { setView("home"); setOrderDetails(null); }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </main>
    </div>
  );
}