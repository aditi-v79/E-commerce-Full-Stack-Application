import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Products() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}