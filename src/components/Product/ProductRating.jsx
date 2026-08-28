import { Star } from "lucide-react";
import { toPersianDigits } from "../../utils/formatNumber";

export default function ProductRating({ rating, reviewsCount }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        <span className="font-bold">{toPersianDigits(rating)}</span>
      </div>
      <span className="text-gray-400">·</span>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {toPersianDigits(reviewsCount)} نظر
      </span>
    </div>
  );
}