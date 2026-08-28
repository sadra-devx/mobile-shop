import { useState } from "react";

export default function ProductGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-contain"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === img
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}