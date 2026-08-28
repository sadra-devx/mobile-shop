import { Link, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Link
      onClick={() => {
  console.log("کلیک شد!");
  navigate(-1);
}}
      className="flex items-center gap-2 text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
    >
      <ArrowRight className="w-4 h-4" />
      بازگشت
    </Link>
  );
}