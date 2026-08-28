import { useLoaderData } from "react-router";
import BackButton from "../../components/Common/BackButton"
import ProductGallery from "../../components/Product/ProductGallery";
import ProductInfo from "../../components/Product/ProductInfo";
import ProductSpecs from "../../components/Product/ProductSpecs";
import ProductRating from "../../components/Product/ProductRating";

function ProductDetail() {
  const product = useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">

      <div className="mt-18 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* ستون گالری */}
        <div className="md:sticky md:top-34 md:self-start">
          <BackButton />
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* ستون اطلاعات */}
        <div className="flex flex-col gap-6">
          <ProductInfo product={product} />
          <ProductRating rating={product.rating} reviewsCount={product.reviewsCount} />
          <ProductSpecs specs={product.specs} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;