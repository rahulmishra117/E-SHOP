import { useState } from 'react';
import { createProduct, updateProduct } from '../services/api';
import ProductList from '../components/ProductList';

export default function Admin() {
    const [editingProduct, setEditingProduct] = useState(null);

    const handleSave = async (product) => {
        if (editingProduct) {
            await updateProduct(editingProduct.id, product);
        } else {
            await createProduct(product);
        }
        setEditingProduct(null);
    };

    return (
        <div>
            <h1 className='text-2xl font-bold text-center'>Admin Dashboard</h1>
            <ProductForm product={editingProduct} onSave={handleSave} />
            <div className='m-20'>
            <ProductList onEdit={setEditingProduct} />
            </div>
        </div>
    );
}

function ProductForm({ product, onSave }) {
    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const [stock, setStock] = useState(product ? product.stock : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, price, stock });
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">Stock</label>
                    <input
                        id="stock"
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>


    );
}
