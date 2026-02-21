import { X, AlertTriangle } from "lucide-react";
import { User } from "../../types";
import { capitalizeWords } from "../../utils/stringUtils";
interface DeleteUserModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteUserModal({
  isOpen,
  user,
  onClose,
  onConfirm
}: DeleteUserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#f3f2f6] rounded-[8px] w-full max-w-[640px] mx-[16px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-[24px] border-b border-[#e6e6e6]">
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center justify-center size-[40px] rounded-full bg-[#fee]">
              <AlertTriangle className="size-[24px] text-[#e55]" />
            </div>
            <h2 className="font-['Poppins:Regular',sans-serif] text-[20px] text-[#262d33]">
              Delete User
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-[8px] rounded-[8px] hover:bg-[#f3f2f6] transition-colors"
            aria-label="Close modal"
          >
            <X className="size-[24px] text-[#636363] cursor-pointer" />
          </button>
        </div>

        <div className="p-[24px]">
          <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#636363] p-[16px]">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>

          <div className="bg-[#e7e6ee] rounded-[8px] p-[16px] border border-[#e6e6e6]">
            <div className="flex flex-col gap-[8px]">
              <div className="flex justify-between">
                <span className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#636363]">
                  Name:
                </span>
                <span className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#333333]">
                  {user.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#636363]">
                  Email:
                </span>
                <span className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#333333]">
                  {user.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#636363]">
                  Role:
                </span>
                <div className="flex gap-[8px]">
                  {user?.roleList.map((r) => (
                    <span
                      key={r}
                      className={`inline-flex items-center px-[12px] py-[4px] rounded-[4px] font-['Poppins:Regular',sans-serif] text-[12px] ${
                        r === "admin"
                          ? "bg-[rgba(110,85,251,0.1)] text-[#6e55fb]"
                          : "bg-[rgba(99,99,99,0.1)] text-[#636363]"
                      }`}
                    >
                      {capitalizeWords(r)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[12px] justify-end p-[24px] border-t border-[#e6e6e6]">
          <button
            type="button"
            onClick={onClose}
            className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[24px] py-[8px] rounded-[8px] border border-[#e6e6e6] hover:bg-[#f3f2f6] transition-colors"
          >
            <p className="cursor-pointer font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#262d33] text-[16px]">
              Cancel
            </p>
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#cc1f12ff] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[24px] py-[8px] rounded-[8px] hover:bg-[#d44] transition-colors"
          >
            <p className="cursor-pointer font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-white text-[16px]">
              Delete User
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
