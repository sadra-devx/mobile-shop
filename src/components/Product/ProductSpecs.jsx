import { toPersianDigits } from "../../utils/formatNumber";

const specLabels = {
  storage: "حافظه داخلی",
  ram: "رم",
  color: "رنگ",
  screenSize: "اندازه صفحه",
  battery: "باتری",
  camera: "دوربین",
};

export default function ProductSpecs({ specs }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700">
      <div className="bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">
          مشخصات فنی
        </h3>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {Object.entries(specs).map(([key, value], i) => (
            <tr
              key={key}
              className={`border-t border-zinc-100 dark:border-zinc-800 ${
                i % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-zinc-50/50 dark:bg-zinc-800/30"
              }`}
            >
              <td className="w-1/3 py-3 px-4 font-medium text-zinc-500 dark:text-zinc-400">
                {specLabels[key] ?? key}
              </td>
              <td className="py-3 px-4 text-zinc-800 dark:text-zinc-200">
                {toPersianDigits(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}