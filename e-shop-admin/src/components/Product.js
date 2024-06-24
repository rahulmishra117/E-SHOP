export default function Product({ product, onDelete, onEdit }) {
    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2 border border-black">Name</th>
                    <th className="px-4 py-2 border border-black">Price</th>
                    <th className="px-4 py-2 border border-black">Stock</th>
                    <th className="px-4 py-2 border border-black">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr key={product.id} className="border-b border-black">
                    <td className="border-r border-black px-4 py-2">{product.name}</td>
                    <td className="border-r border-black px-4 py-2">{product.price}</td>
                    <td className="border-r border-black px-4 py-2">{product.stock}</td>
                    <td className="border-r border-black px-4 py-2">
                        <button onClick={() => onEdit(product)} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Edit</button>
                        <button onClick={() => onDelete(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
