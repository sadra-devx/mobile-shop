import { useLoaderData } from "react-router";

function ProductList() {
  const products = useLoaderData();

  return (
    <div>
      <h1>محصولات ({products.length})</h1>
      {/* بعداً اینجا ProductCard ها رو map می‌کنیم */}
    </div>
  );
}

export default ProductList; 