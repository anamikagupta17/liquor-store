// Capitalize first letter
export const capitalize = (str = "") => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Capitalize every word (Title Case)
export const toTitleCase = (str = "") => {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Convert whole string to uppercase
export const toUpper = (str = "") => str.toUpperCase();

// Convert whole string to lowercase
export const toLower = (str = "") => str.toLowerCase();

// Capitalize words using regex (alternative fast method)
export const capitalizeWords = (str = "") => {
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};


export const formatDateTime = (dateStr: string): string => {
  if (!dateStr) return "";

  return new Date(dateStr).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
