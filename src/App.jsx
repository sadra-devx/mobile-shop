import { useEffect, useState } from "react";
import { getProducts } from "./api/products";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      console.log(data);
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* فعلاً همینجوری بذار، بعداً کامپوننت واقعی می‌سازیم */}
      <h1>Products count: {products.length}</h1>
    </div>
  );
}

export default App;