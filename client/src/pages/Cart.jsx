import React, { useEffect, useMemo, useState } from 'react'
import useAuthStore from '../store/AuthStore'
import useCartStore from '../store/CartStore'
import { Trash2 } from 'lucide-react'
import Loading from "../components/layout/Loading"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const formatInr = (n) =>
    Number(n || 0).toLocaleString("en-IN", {
        maximumFractionDigits: 0,
    })

const Cart = () => {

    const { user } = useAuthStore()
    const { fetchCart, loading, error, cart, removeCart, updateQuantity } = useCartStore()

    const [pendingLine, setPendingLine] = useState(null)

    const navigate = useNavigate()

    const { subtotal, delivery } = useMemo(() => {
        let sum = 0

        for (const item of cart || []) {
            const p = item.product
            if (p && typeof p === "object" && typeof p.price === "number") {
                sum += p.price * (item.quantity || 0)
            }
        }

        const deliveryFee = sum > 0 ? 40 : 0

        return {
            subtotal: sum,
            delivery: deliveryFee
        }

    }, [cart])

    const total = subtotal + delivery

    useEffect(() => {
        fetchCart()
    }, [])

    const handleCheckOut = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:4000/order/create",
                {},
                { withCredentials: true }
            )

            const options = {
                key: "rzp_test_ScCRaBeJj5WB50",
                amount: data.razorpayOrder.amount,
                currency: "INR",
                name: "My Store",
                order_id: data.razorpayOrder.id,

                handler: async function (response) {
                    await axios.post("http://localhost:4000/order/verify", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    })

                    alert("Payment Success")
                }
            }

            const rzp = new window.Razorpay(options)
            rzp.open()

        } catch (err) {
            console.log(err)
        }
    }

    const removeFromCart = async (productId, size) => {
        await removeCart(productId, size)
    }

    const lineKey = (productId, size) =>
        `${String(productId)}::${size}`

    const changeQuantity = async (productId, size, nextQty) => {
        if (!productId) return

        const key = lineKey(productId, size)
        setPendingLine(key)

        try {
            await updateQuantity(productId, nextQty, size)
        } finally {
            setPendingLine(null)
        }
    }

    if (loading) return <Loading />

    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-6">

                <div className="text-6xl mb-4">🛒</div>

                <h1 className="text-3xl font-bold text-gray-200">
                    Your cart is empty
                </h1>

                <p className="text-gray-500 mt-2 text-center max-w-md">
                    Looks like you haven’t added anything yet.
                </p>

                <button
                    onClick={() => navigate("/collections")}
                    className="mt-6 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
                >
                    Start Shopping
                </button>

            </div>
        )
    }

    return (
        <div className='flex flex-col items-center min-h-screen bg-slate-950'>

            <h1 className='text-white text-5xl pb-12 font-extrabold'>
                {user?.username}'s Cart
            </h1>

            {error && (
                <p className="text-red-400 text-sm mb-4 px-4 text-center max-w-lg">
                    {error}
                </p>
            )}

            <div className='flex flex-col lg:flex-row gap-12 items-start justify-center'>

                {/* CART ITEMS */}
                <div className='w-full max-w-5xl bg-slate-900/40 border border-gray-700 rounded-3xl p-8 backdrop-blur-md shadow-xl'>

                    <div className='flex flex-col gap-6'>

                        {cart.map((item) => {

                            const product = item.product

                            const productId =
                                product && typeof product === "object"
                                    ? product._id
                                    : product

                            const isMissing = !product || typeof product !== "object"
                            const qty = item.quantity || 0

                            const unitPrice =
                                !isMissing && typeof product.price === "number"
                                    ? product.price
                                    : 0

                            const lineTotal = unitPrice * qty

                            const busy =
                                pendingLine === lineKey(productId, item.size)

                            return (
                                <div
                                    key={item._id?.toString() ?? `${productId}-${item.size}`}
                                    className='flex items-center justify-between gap-8 bg-white p-5 rounded-2xl shadow-md'
                                >

                                    {/* LEFT */}
                                    <div className='flex items-center gap-5'>

                                        <img
                                            src={isMissing ? "" : (product.image || "")}
                                            alt={isMissing ? "Unavailable" : (product.name || "Product")}
                                            className='w-24 h-24 object-cover rounded-xl bg-gray-200'
                                        />

                                        <div>
                                            <h2 className='text-black text-lg font-semibold'>
                                                {isMissing ? "Product unavailable" : product.name}
                                            </h2>

                                            <p className='text-gray-400 text-sm'>
                                                {isMissing ? "—" : (product.category || "—")}
                                            </p>
                                        </div>

                                    </div>

                                    {/* QUANTITY */}
                                    <div className='flex items-center gap-4'>

                                        <button
                                            disabled={busy || isMissing}
                                            onClick={() =>
                                                changeQuantity(productId, item.size, qty - 1)
                                            }
                                            className='px-3 py-1 bg-slate-800 text-white rounded-md hover:bg-slate-600 disabled:opacity-40'
                                        >
                                            -
                                        </button>

                                        <span className='text-black text-lg min-w-[2ch] text-center'>
                                            {qty}
                                        </span>

                                        <button
                                            disabled={busy || isMissing}
                                            onClick={() =>
                                                changeQuantity(productId, item.size, qty + 1)
                                            }
                                            className='px-3 py-1 bg-slate-800 text-white rounded-md hover:bg-slate-600 disabled:opacity-40'
                                        >
                                            +
                                        </button>

                                    </div>

                                    {/* RIGHT */}
                                    <div className='flex flex-col items-end gap-2'>

                                        <p className='text-gray-500 text-sm'>
                                            {isMissing ? "—" : `₹${formatInr(unitPrice)} each`}
                                        </p>

                                        <p className='text-black font-semibold'>
                                            {isMissing ? "—" : `₹${formatInr(lineTotal)}`}
                                        </p>

                                        <Trash2
                                            onClick={() =>
                                                productId && removeFromCart(productId, item.size)
                                            }
                                            className='text-red-400 h-6 w-6 cursor-pointer hover:text-red-500'
                                        />

                                    </div>

                                </div>
                            )
                        })}

                    </div>

                </div>

                {/* SUMMARY */}
                <div className='flex flex-col p-6 min-w-[350px] rounded-2xl gap-5 border border-gray-700 bg-slate-900/60 backdrop-blur-md shadow-lg'>

                    <h1 className='text-white font-bold text-2xl'>
                        Order Summary
                    </h1>

                    <div className='flex justify-between text-sm'>
                        <p className='text-gray-400'>Subtotal</p>
                        <p className='text-white'>₹{formatInr(subtotal)}</p>
                    </div>

                    <div className='flex justify-between text-sm'>
                        <p className='text-gray-400'>Delivery</p>
                        <p className='text-white'>₹{formatInr(delivery)}</p>
                    </div>

                    <div className='h-[1px] bg-gray-700'></div>

                    <div className='flex justify-between text-lg'>
                        <p className='text-white font-semibold'>Total</p>
                        <p className='text-green-400 font-bold'>₹{formatInr(total)}</p>
                    </div>

                    <button
                        onClick={handleCheckOut}
                        className='mt-4 w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition'
                    >
                        Checkout →
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Cart