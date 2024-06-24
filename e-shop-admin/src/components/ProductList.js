import { useState, useEffect } from 'react';
import { getProducts,deleteProduct } from '../services/api';
import Product from './Product';

export default function ProductList({ onEdit }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await getProducts();
      console.log(data);
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} onDelete={handleDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
