import { useState, useEffect } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ProductCard from "./components/ProductCard"

function App() {
   const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
        setError("Failed to load products. Please try again later.", error)
        setLoading(false)
      })
      
  }, [])

  const [count, setCount] = useState(0)

  const [darkMode, setDarkMode] = useState(false)

  const [search, setSearch] = useState("")

  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <>
      <Navbar />
      <Hero />

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    
  <div className="filter-buttons">
    {["all", "hoodies", "jackets", "tees", "jeans"].map((category) => {
    
      const categoryCount =
        category === "all"
          ? products.length
          : products.filter(
            (product) => product.category === category
          ).length

      return (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={activeCategory === category ? "active" : ""}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
        {" "}
        ({categoryCount})
      </button>
    )
  })}
  </div>

  <section className="products">
    <h2>Featured Products</h2>

    {error && <p>{error}</p>}

    {loading ? (
      <h2>Loading products...</h2>
  ) : (
    <div className="product-grid">
      {products
        .filter((product) =>
          activeCategory === "all" ? true : product.category === activeCategory
        )
        .filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((product) => (
          <ProductCard
            key={product.id}
            name={product.title}
            price={product.price}
            image={product.image}
            buttonClass={product.buttonClass}
          />
        ))}
    </div>
  )}

</section>

    <section 
      className="counter-section"
      style={{ 
        backgroundColor: darkMode ? '#222' : '#fff',
        color: darkMode ? '#fff' : '#000',
        }}
      >
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light' : 'Dark'} Mode
        </button>

      <h2 style={{ color: count > 5 ? 'red' : 'inherit' }}>
        Cart Items: {count}
      </h2>
      {count === 0 && <p>Your cart is empty</p>}
      <button onClick={() => setCount(count + 1)}>
        Add To Cart
      </button>

      <button onClick={() => setCount(Math.max(0, count - 1))}>
        Remove from Cart
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </section>
  </>
  )
}

export default App