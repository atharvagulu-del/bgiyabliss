'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/lib/firestore';
import ProductForm from '@/components/Admin/ProductForm';

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProductById(params.id);
        if (data) {
          setProduct(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <div className="adminTopbar">
          <h1 className="adminTopbarTitle">Edit Product</h1>
        </div>
        <div className="adminContent">
          <div className="adminLoading">
            <div className="adminSpinner"></div>
          </div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <div className="adminTopbar">
          <h1 className="adminTopbarTitle">Product Not Found</h1>
        </div>
        <div className="adminContent">
          <div className="adminEmptyState">
            <h3>Product not found</h3>
            <p>The product you are looking for does not exist or was deleted.</p>
            <a href="/admin/products" className="adminBtn adminBtnPrimary">
              Back to Products
            </a>
          </div>
        </div>
      </>
    );
  }

  return <ProductForm existingProduct={product} />;
}
