import React, { useState } from 'react';
import useProductStore from '../../store/ProductStore';

const AddProduct = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null,
    });

    const { addProducts, loading, error } = useProductStore();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false); // reset previous success message

        try {
            await addProducts(formData);

            // reset form
            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                category: "",
                image: null,
            });

            setSuccess(true); // show success message
        } catch (err) {
            console.log(err);
            setSuccess(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, image: file }));
    };

    const formChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const preview = formData.image ? URL.createObjectURL(formData.image) : null;

    return (
        <div className='min-h-screen bg-slate-950 p-8'>
            <div className='flex flex-col items-center justify-center gap-6'>

                <div>
                    <h1 className='text-green-400 text-5xl font-sans font-extrabold tracking-wide w-fit mt-10'>
                        Add Product
                    </h1>
                    <p className='text-white/80 text-xs text-center tracking-wide mt-2'>
                        Create your next Masterpiece, Define your details
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='bg-slate-900 w-160 border border-slate-700/60 rounded-2xl p-7 flex flex-col gap-5 shadow-xl shadow-black/40'>

                    {/* Product Name */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-400 font-semibold tracking-wide'>
                            Product Name <span className="text-green-500">*</span>
                        </label>
                        <input
                            name='name'
                            value={formData.name}
                            onChange={formChange}
                            className='py-2.5 px-6 rounded-md text-white outline-1 outline-gray-700 placeholder:text-gray-500 bg-slate-800'
                            type="text"
                            placeholder="e.g. Air Jordan 1 Retro"
                        />
                    </div>

                    {/* Description */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-400 font-semibold tracking-wide'>
                            Description <span className="text-gray-700">(optional)</span>
                        </label>
                        <textarea
                            name='description'
                            value={formData.description}
                            onChange={formChange}
                            className='py-2.5 px-6 text-white rounded-md outline-1 outline-gray-700 placeholder:text-gray-500 bg-slate-800'
                            placeholder="Describe your Product"
                        />
                    </div>

                    {/* Price + Stock */}
                    <div className='flex flex-row justify-between gap-4'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-gray-400 font-semibold tracking-wide'>
                                Price <span className="text-green-500">*</span>
                            </label>
                            <input
                                name='price'
                                value={formData.price}
                                onChange={formChange}
                                className='py-2.5 px-6 text-white rounded-md outline-1 outline-gray-700 placeholder:text-gray-500 bg-slate-800'
                                type="number"
                                placeholder="$ 0.00"
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-gray-400 font-semibold tracking-wide'>
                                Stock <span className="text-green-500">*</span>
                            </label>
                            <input
                                name='stock'
                                value={formData.stock}
                                onChange={formChange}
                                className='py-2.5 px-6 text-white rounded-md outline-1 outline-gray-700 placeholder:text-gray-500 bg-slate-800'
                                type="number"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-400 font-semibold tracking-wide'>
                            Category <span className="text-green-500">*</span>
                        </label>
                        <select
                            name='category'
                            value={formData.category}
                            onChange={formChange}
                            className='py-2.5 px-6 rounded-md text-white bg-slate-800 outline-1 outline-gray-700 cursor-pointer'
                        >
                            <option value="" className='bg-slate-900'>Select Category</option>
                            <option value="shoes" className='bg-slate-900'>Shoes</option>
                            <option value="clothing" className='bg-slate-900'>Clothing</option>
                            <option value="electronics" className='bg-slate-900'>Electronics</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className='flex flex-col gap-2'>
                        <label className='text-gray-400 font-semibold tracking-wide'>
                            Product Image <span className="text-green-500">*</span>
                        </label>
                        <div className='relative border-2 border-dashed border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-gray-500 hover:border-slate-500 transition cursor-pointer overflow-hidden'>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className='absolute inset-0 opacity-0 cursor-pointer'
                            />
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className='w-full h-48 object-cover rounded-md'
                                />
                            ) : (
                                <>
                                    <p className='text-sm'>Drag & Drop Image here</p>
                                    <p className='text-xs'>or click to upload</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 shadow-sm">
                            <span className="text-lg">⚠️</span>
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && !error && (
                        <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-500 shadow-sm mt-2">
                            <span className="text-lg">✅</span>
                            <p className="text-sm font-medium">Successfully added!</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button disabled={loading} type='submit' className='mt-2 cursor-pointer bg-green-600 hover:bg-green-700 transition text-white py-2.5 rounded-lg font-semibold'>
                        {loading ? "Adding..." : "Add Product"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;