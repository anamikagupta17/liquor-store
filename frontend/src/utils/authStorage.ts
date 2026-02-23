const STORAGE_KEY = 'userData';
const EXPIRY_KEY = 'userDataExpiry';
const EXPIRY_TIME = 2 * 60 * 60 * 1000; // 2 hours

// ✅ Save user data with expiry
export const saveUserData = (data: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  localStorage.setItem(EXPIRY_KEY, Date.now().toString());
};

// ✅ Get user data if not expired
export const getUserData = () => {
  const expiry = localStorage.getItem(EXPIRY_KEY);
  if (expiry && Date.now() - parseInt(expiry, 10) > EXPIRY_TIME) {
    clearUserData();
    return null;
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
};

// ✅ Clear user data
export const clearUserData = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};
