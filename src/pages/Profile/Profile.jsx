import { useState } from "react";
import { useLoaderData } from "react-router";
import { User, Smartphone, Mail, LogOut, Package, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { FormField as Field } from "../../components/common/FormField";
import { toPersianDigits, formatPrice } from "../../utils/formatNumber";

const tabs = [
  { key: "info", label: "اطلاعات من" },
  { key: "orders", label: "سفارش‌های من" },
];

const statusMap = {
  delivered: {
    label: "تحویل شده",
    icon: CheckCircle2,
    className: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/30",
  },
  shipped: {
    label: "ارسال شده",
    icon: Package,
    className: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30",
  },
  pending: {
    label: "در حال پردازش",
    icon: Clock,
    className: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30",
  },
  cancelled: {
    label: "لغو شده",
    icon: XCircle,
    className: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30",
  },
};

export default function Profile() {
  const { orders } = useLoaderData();
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("info");
  const activeIndex = tabs.findIndex((t) => t.key === activeTab);

  return (
    <div className="mx-auto w-full mt-20 max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
          {user.name?.charAt(0) || "?"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-zinc-800 dark:text-zinc-100">{user.name}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{toPersianDigits(user.phone)}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <LogOut className="h-4 w-4" />
          خروج
        </button>
      </div>

      <div className="relative mb-6 grid grid-cols-2 rounded-2xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-800">
        <div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-sm transition-all duration-300 ease-out dark:bg-zinc-700"
          style={{
            insetInlineStart: `${activeIndex * 50 + (activeIndex === 0 ? 0.25 : -0.25)}%`,
          }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative z-10 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "info" ? (
        <EditInfoForm user={user} onSave={updateUser} />
      ) : (
        <OrderHistory orders={orders} />
      )}
    </div>
  );
}

function EditInfoForm({ user, onSave }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await onSave({ name, email });
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900"
    >
      <Field icon={User} type="text" placeholder="نام و نام خانوادگی" value={name} onChange={setName} />
      <Field
        icon={Smartphone}
        type="tel"
        placeholder="شماره موبایل"
        value={user.phone}
        onChange={() => {}}
        disabled
      />
      <Field icon={Mail} type="email" placeholder="ایمیل (اختیاری)" value={email} onChange={setEmail} />

      {success && (
        <p className="text-sm text-green-600 dark:text-green-400">اطلاعات با موفقیت ذخیره شد</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
      >
        {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </form>
  );
}

function OrderHistory({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
        <Package className="h-10 w-10 text-zinc-300 dark:text-zinc-600" />
        <p className="text-zinc-500 dark:text-zinc-400">هنوز سفارشی ثبت نکردی</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => {
        const status = statusMap[order.status] || statusMap.pending;
        const StatusIcon = status.icon;

        const orderTotal = order.items.reduce((sum, item) => {
          if (!item.product) return sum;
          return sum + item.product.price * item.quantity;
        }, 0);

        return (
          <div
            key={order.id}
            className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                سفارش #{toPersianDigits(order.id)}
              </span>
              <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}>
                <StatusIcon className="h-3.5 w-3.5" />
                {status.label}
              </span>
            </div>

            {/* لیست آیتم‌های این سفارش */}
            <div className="flex flex-col gap-3 border-b border-zinc-100 pb-3 dark:border-zinc-800">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {item.product?.images?.[0] && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-zinc-700 dark:text-zinc-200">
                      {item.product?.name || "محصول نامشخص"}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      تعداد: {toPersianDigits(item.quantity)}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm text-zinc-600 dark:text-zinc-300">
                    {item.product ? formatPrice(item.product.price * item.quantity) : "—"}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">مبلغ کل</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                {formatPrice(orderTotal)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}