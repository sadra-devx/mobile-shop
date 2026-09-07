// src/pages/Auth/Auth.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { Smartphone, Lock, User } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { FormField as Field } from "../../components/common/FormField";

const tabs = [
  { key: "login", label: "ورود" },
  { key: "signup", label: "ثبت‌نام" },
];

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const switchTab = (key) => {
    setActiveTab(key);
    setError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!/^09\d{9}$/.test(loginData.phone)) {
      setError("شماره موبایل معتبر نیست");
      return;
    }
    if (!loginData.password) {
      setError("رمز عبور را وارد کنید");
      return;
    }
    try {
      setLoading(true);
      await login(loginData.phone, loginData.password);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!signupData.name.trim()) {
      setError("نام و نام خانوادگی را وارد کنید");
      return;
    }
    if (!/^09\d{9}$/.test(signupData.phone)) {
      setError("شماره موبایل معتبر نیست");
      return;
    }
    if (signupData.password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }
    if (signupData.password !== signupData.confirm) {
      setError("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }
    try {
      setLoading(true);
      await signup(signupData);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-17 flex min-h-[calc(100vh-4.25rem)] w-full items-center justify-center bg-[#FAFAFA] px-4 py-10 dark:bg-zinc-900">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* تب‌ها — سوییچ لغزان با ایندیگو */}
          <div className="relative mb-8 grid grid-cols-2 rounded-full bg-zinc-100 p-1 dark:bg-zinc-800">
            <div
              className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-indigo-600 shadow-sm transition-transform duration-300 ease-out"
              style={{
                transform: activeTab === "login" ? "translateX(0)" : "translateX(calc(-100% - 8px))",
              }}
            />
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => switchTab(tab.key)}
                className={`relative z-10 rounded-full py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === tab.key ? "text-white" : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </div>
          )}

          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <Field
                icon={Smartphone}
                type="text"
                placeholder="شماره موبایل"
                value={loginData.phone}
                onChange={(v) => setLoginData((s) => ({ ...s, phone: v }))}
              />
              <Field
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور"
                value={loginData.password}
                onChange={(v) => setLoginData((s) => ({ ...s, password: v }))}
                toggle={{ value: showPassword, onToggle: () => setShowPassword((s) => !s) }}
              />
              <SubmitButton loading={loading} label="ورود" />
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
              <Field
                icon={User}
                type="text"
                placeholder="نام و نام خانوادگی"
                value={signupData.name}
                onChange={(v) => setSignupData((s) => ({ ...s, name: v }))}
              />
              <Field
                icon={Smartphone}
                type="tel"
                placeholder="شماره موبایل"
                value={signupData.phone}
                onChange={(v) => setSignupData((s) => ({ ...s, phone: v }))}
              />
              <Field
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور"
                value={signupData.password}
                onChange={(v) => setSignupData((s) => ({ ...s, password: v }))}
                toggle={{ value: showPassword, onToggle: () => setShowPassword((s) => !s) }}
              />
              <Field
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="تکرار رمز عبور"
                value={signupData.confirm}
                onChange={(v) => setSignupData((s) => ({ ...s, confirm: v }))}
              />
              <SubmitButton loading={loading} label="ثبت‌نام" />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function SubmitButton({ loading, label }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-3 h-13 w-full rounded-2xl bg-indigo-600 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50"
    >
      {loading ? "در حال پردازش..." : label}
    </button>
  );
}