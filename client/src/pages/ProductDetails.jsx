import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useCartStore from '../store/CartStore'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [pageloading, setPageLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  const [isInCart, setIsInCart] = useState(false);

  const { addCart, loading } = useCartStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPageLoading(true)

        const [productRes, cartRes] = await Promise.all([
          axios.get(`http://localhost:4000/product/${id}`),
          axios.get("http://localhost:4000/cart", { withCredentials: true })
        ])

        const productData = productRes.data.product
        setProduct(productData)

        const exists = cartRes.data.cart.items.some(
          item => item.product._id === productData._id
        )

        setIsInCart(exists)

        setError(null)
      } catch (err) {
        setError("Failed to load product. Might be a ghost.")
      } finally {
        setPageLoading(false)
      }
    }

    fetchData()
  }, [id])

  const addToCart = async () => {
    if (!selectedSize) {
      alert("Select size bro");
      return;
    }

    const res = await addCart(product._id, quantity, selectedSize);

    console.log(res)

    if (res.success) {
      console.log("Added to cart ✅");
      setIsInCart(true);
    } else {
      console.log("Error:", res.message);
      alert(res.message);
    }
  };

  if (pageloading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  )

  if (error) return (
    <div className='min-h-screen flex justify-center items-center bg-gray-950'>
      <p className='text-red-400 font-mono bg-red-400/10 px-4 py-2 rounded-lg'>{error}</p>
    </div>
  )

  if (!product) return null

  return (
    <div className='min-h-screen bg-gray-950 text-white py-24 sm:py-32 px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16'>

        {/* IMAGE */}
        <div className='aspect-square w-full overflow-hidden rounded-3xl bg-gray-900 shadow-2xl ring-1 ring-white/10'>
          <img
            src={product.image}
            alt={product.name}
            className='h-full w-full object-cover object-center transition-transform hover:scale-105 duration-500'
          />
        </div>

        {/* DETAILS */}
        <div className='flex flex-col justify-center'>
          <div className="mb-6 flex items-center gap-4">
            <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
              In Stock
            </span>
          </div>

          <h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl'>
            {product.name}
          </h1>

          <div className="mt-4">
            <p className='text-3xl font-bold tracking-tight text-gray-300'>₹{product.price}</p>
          </div>

          <div className="mt-6">
            <p className='text-base text-gray-400 leading-relaxed'>
              {product.description}
            </p>
          </div>

          <div className="mt-10">
            {/* SIZE */}
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-gray-300'>Size</h3>
              <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300">Size guide</button>
            </div>

            <div className='mt-4 grid grid-cols-4 gap-4'>
              {["S", "M", "L", "XL"].map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`group relative flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium cursor-pointer uppercase transition-all focus:outline-none ${selectedSize === size
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-950"
                    : "border-gray-800 bg-gray-900 text-gray-300 hover:bg-gray-800"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY & ADD TO CART */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <div className='flex items-center border border-gray-800 rounded-xl bg-gray-900 p-1'>
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className='w-12 h-12 flex items-center justify-center text-gray-400 cursor-pointer hover:text-white hover:bg-gray-800 rounded-lg transition-colors'
              >
                -
              </button>
              <span className='w-12 text-center text-lg font-medium'>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className='w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer rounded-lg transition-colors'
              >
                +
              </button>
            </div>

            <button
              disabled={loading || isInCart}
              onClick={addToCart}
              className={`flex-1 flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold transition-all duration-300
    ${isInCart
                  ? "bg-green-600 text-white cursor-default"
                  : loading
                    ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                    : "bg-white text-gray-950 hover:bg-gray-200"
                }`}
            >
              {isInCart ? (
                "In Cart ✔"
              ) : loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin"></div>
                  Adding...
                </div>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetails