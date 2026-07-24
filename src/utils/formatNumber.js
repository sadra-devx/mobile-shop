    // src/utils/formatNumber.js

// تبدیل هر عدد یا رشته‌ی عددی به ارقام فارسی
export function toPersianDigits(value) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(value).replace(/[0-9]/g, (digit) => persianDigits[digit]);
}

// فرمت قیمت با جداکننده‌ی هزارگان + ارقام فارسی
export function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}