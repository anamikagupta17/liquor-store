import { useState, useRef, useEffect } from "react";
import { User, CreateUserForm, Partner } from "../../types";
import { ChevronDown } from "lucide-react";

interface EditUserModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSubmit: (userData: CreateUserForm) => void;
  partnerList: Partner[];
}

export function EditUserModal({
  isOpen,
  user,
  onClose,
  onSubmit,
  partnerList,
}: EditUserModalProps) {
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsPartnerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    partnerIds: [] as number[],
    role: [] as ("user" | "admin")[],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
        partnerIds: (user.partnerUsers ?? []).map((p) => p.partnerId),
        role: [...new Set((user.roleList ?? []).map((r) => r.trim()))],
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password.trim()) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (formData.role.length === 0) {
      newErrors.role = "Please select at least one role";
    }

    if (formData.partnerIds.length === 0) {
      newErrors.partner = "Please select at least one partner";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submitData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      partnerIds: formData.partnerIds,
      ...(formData.password.trim() && { password: formData.password }),
      ...(formData.confirmPassword.trim() && {
        confirmPassword: formData.confirmPassword,
      }),
    };

    onSubmit(submitData);
    setErrors({});
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleRoleToggle = (roleType: "user" | "admin") => {
    const currentRoles = [...formData.role];
    const index = currentRoles.indexOf(roleType);

    if (index > -1) {
      currentRoles.splice(index, 1);
    } else {
      currentRoles.push(roleType);
    }

    setFormData({ ...formData, role: currentRoles });
  };

  const selectedPartnerNames =
    Array.isArray(partnerList) && Array.isArray(formData.partnerIds)
      ? partnerList
          .filter((p) => formData.partnerIds.includes(p.id))
          .map((p) => p.partnerName)
          .join(", ")
      : "";

  const togglePartner = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      partnerIds: prev.partnerIds.includes(id)
        ? prev.partnerIds.filter((pid) => pid !== id)
        : [...prev.partnerIds, id],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#f3f2f6] rounded-[8px] w-full max-w-[640px] mx-[16px] max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[16px]"
        >
          <div className="content-stretch flex items-center justify-between w-full">
            <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-black text-[17px]">
              Edit User
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer relative shrink-0 size-[24px]"
              aria-label="Close modal"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 24 24"
              >
                <g>
                  <path
                    d="M18 6L6 18"
                    stroke="#33363F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="#33363F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </button>
          </div>

          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 608 1"
              >
                <line
                  opacity="0.2"
                  stroke="#7D7D7D"
                  x2="608"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>

          <div className="content-stretch flex flex-col gap-[24px] items-start w-full">
            <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
              <div
                className={`h-[48px] relative w-full ${errors.name ? "border-2 border-[#e55] rounded-[6px]" : ""}`}
              >
                <div className="absolute bg-[#f2f2f2] border-[0.5px] border-neutral-200 border-solid inset-0 rounded-[6px]" />
                <div className="absolute content-stretch flex inset-0 items-center justify-between pl-[16px] pr-[8px] py-[8px] rounded-[6px]">
                  <input
                    id="userName"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="User Name"
                    className="absolute inset-0 bg-transparent px-[16px] py-[8px] text-[15px] text-gray-700 placeholder:text-gray-400 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  />
                </div>
              </div>
              {errors.name && (
                <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-[#e55]">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
              <div
                className={`h-[48px] relative w-full ${errors.email ? "border-2 border-[#e55] rounded-[6px]" : ""}`}
              >
                <div className="absolute bg-[#f2f2f2] border-[0.5px] border-neutral-200 border-solid inset-0 rounded-[6px]" />
                <div className="absolute content-stretch flex inset-0 items-center justify-between pl-[16px] pr-[8px] py-[8px] rounded-[6px]">
                  <input
                    id="userEmail"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="User Email ID"
                    className="absolute inset-0 bg-transparent px-[16px] py-[8px] text-[15px] text-gray-700 placeholder:text-gray-400 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  />
                </div>
              </div>
              {errors.email && (
                <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-[#e55]">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
              <div
                className={`h-[48px] relative w-full ${errors.password ? "border-2 border-[#e55] rounded-[6px]" : ""}`}
              >
                <div className="absolute bg-[#f2f2f2] border-[0.5px] border-neutral-200 border-solid inset-0 rounded-[6px]" />
                <div className="absolute content-stretch flex inset-0 items-center justify-between pl-[16px] pr-[8px] py-[8px] rounded-[6px]">
                  <input
                    id="userPassword"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Password (leave blank to keep current)"
                    className="absolute inset-0 bg-transparent px-[16px] py-[8px] text-[15px] text-gray-700 placeholder:text-gray-400 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  />
                </div>
              </div>
              {errors.password && (
                <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-[#e55]">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
              <div
                className={`h-[48px] relative w-full ${errors.confirmPassword ? "border-2 border-[#e55] rounded-[6px]" : ""}`}
              >
                <div className="absolute bg-[#f2f2f2] border-[0.5px] border-neutral-200 border-solid inset-0 rounded-[6px]" />
                <div className="absolute content-stretch flex inset-0 items-center justify-between pl-[16px] pr-[8px] py-[8px] rounded-[6px]">
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm Password"
                    className="absolute inset-0 bg-transparent px-[16px] py-[8px] text-[15px] text-gray-700 placeholder:text-gray-400 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#007aff]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  />
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-[#e55]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
              <div
                className={`h-[48px] relative w-full ${errors.partner ? "border-2 border-[#e55] rounded-[6px]" : ""}`}
              >
                <div className="absolute bg-[#f2f2f2] border-[0.5px] border-neutral-200 border-solid inset-0 rounded-[6px]" />
                <div className="absolute content-stretch flex inset-0 items-center justify-between pl-[16px] pr-[8px] py-[8px] rounded-[6px]">
                  <div
                    className="flex relative w-full px-[16px] items-center cursor-pointer"
                    ref={dropdownRef}
                    onClick={() => setIsPartnerOpen((prev) => !prev)}
                  >
                    <input
                      type="text"
                      readOnly
                      value={selectedPartnerNames}
                      
                      placeholder="Partner"
                      className="w-full bg-transparent py-[8px] text-[15px] cursor-pointer"
                    />

                    <ChevronDown />

                    {/* DROPDOWN */}
                    {isPartnerOpen && (
                      <div className="p-2 absolute left-0 top-full z-10 mt-1 w-full bg-white border border-gray-300 rounded-[6px] shadow-lg max-h-60 overflow-auto">
                        {partnerList.map((opt) => (
                          <label
                            key={opt.id}
                            className="flex items-center p-2 gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              checked={formData.partnerIds.includes(opt.id)}
                              onChange={() => togglePartner(opt.id)}
                              className="shrink-0  size-[24px] cursor-pointer accent-[#6e55fb]"
                            />
                            <span>{opt.partnerName}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {errors.partner && (
                <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-[#e55]">
                  {errors.partner}
                </p>
              )}
            </div>
          </div>

          <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
            <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-end leading-[0] not-italic text-[14px] text-black">
              <p className="leading-[normal]">User Type</p>
            </div>
            <div className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] w-full">
              <div className="[grid-area:1_/_2] content-stretch flex gap-[10px] items-center px-0 py-[8px]">
                <input
                  type="checkbox"
                  id="role-admin"
                  checked={formData.role.includes("admin")}
                  onChange={() => handleRoleToggle("admin")}
                  className="shrink-0 size-[24px] cursor-pointer accent-[#6e55fb]"
                />
                <label
                  htmlFor="role-admin"
                  className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px] cursor-pointer"
                >
                  Admin
                </label>
              </div>

              <div className="[grid-area:1_/_2] content-stretch flex gap-[10px] items-center px-0 py-[8px]">
                <input
                  type="checkbox"
                  id="role-user"
                  checked={formData.role.includes("user")}
                  onChange={() => handleRoleToggle("user")}
                  className="shrink-0 size-[24px] cursor-pointer accent-[#6e55fb]"
                />
                <label
                  htmlFor="role-user"
                  className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px] cursor-pointer"
                >
                  User
                </label>
              </div>
            </div>
            {errors.role && (
              <p className="font-['Poppins:Regular',sans-serif] text-[12px] text-[#e55]">
                {errors.role}
              </p>
            )}
          </div>

          <div className="h-0 relative shrink-0 w-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 608 1"
              >
                <line
                  opacity="0.2"
                  stroke="#7D7D7D"
                  x2="608"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>

          <div className="content-stretch flex gap-[32px] items-start w-full">
            <button
              type="button"
              onClick={handleClose}
              className="basis-0 bg-[#7d7d7d] cursor-pointer grow min-h-px min-w-px rounded-[6px] hover:bg-[#6d6d6d] transition-colors"
            >
              <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[10px] w-full">
                  <div
                    className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center text-[15px] text-center text-white tracking-[0.3px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <p className="leading-[20px]">Cancel</p>
                  </div>
                </div>
              </div>
            </button>
            <button
              type="submit"
              className="basis-0 bg-[#007aff] cursor-pointer grow min-h-px min-w-px rounded-[6px] hover:bg-[#0062cc] transition-colors"
            >
              <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[10px] w-full">
                  <div
                    className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center text-[15px] text-center text-white tracking-[0.3px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <p className="leading-[20px]">Save</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
