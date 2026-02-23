export function formatNumberwithDecimal(value:any) {
   
  if (value === null || value === undefined || value === "") return "0.00";

  // Remove commas, currency symbols, and extra spaces
  const cleanValue = String(value).replace(/[^0-9.-]/g, "");

  const number = Number(cleanValue);

  if (isNaN(number)) return "0.00";

  const formattedNumber= new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
  return formattedNumber;
}

export const formatNumber = (value: any): string => {
  if (value === null || value === undefined) return "0";

  // Convert to string and remove everything except digits and dot
  const clean = String(value).replace(/[^0-9.]/g, "");

  if (clean === "") return "0";

  const num = Number(clean);

  if (isNaN(num)) return "0";

  return num.toLocaleString("en-US");
};


export const allowOnlyNumbers = (e) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab"
  ];

  // Allow navigation & deletion keys
  if (allowedKeys.includes(e.key)) return;

  // Block anything that's not 0–9
  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
};
