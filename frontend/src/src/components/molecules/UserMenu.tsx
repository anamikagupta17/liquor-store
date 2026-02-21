import { User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { User as UserType } from "../../types";
import svgPaths from "../../../imports/svg-h0rqcqm154";

export interface UserMenuProps {
  user: UserType;
  onLogout?: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#f3f2f6] box-border content-stretch flex gap-[8px] items-center p-[16px] relative rounded-[8px] shrink-0 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6e55fb] focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative shrink-0 size-[24px]">
          <User className="size-full text-[#222222]" />
        </div>
        <p className="leading-[normal] not-italic relative shrink-0 text-[17px] text-black text-nowrap whitespace-pre">
          {user?.name}
        </p>
        <ChevronDown className="size-[20px] text-[#33363F]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-[8px] shadow-lg border border-[#e6e6e6] z-[100] min-w-[200px]">
          <div className="box-border content-stretch flex flex-col items-start p-[8px] w-full">
            <button
              onClick={onLogout}
              className="box-border content-stretch flex gap-[8px] h-[40px] items-center px-[12px] py-[8px] relative rounded-[6px] w-full hover:bg-[#f3f2f6] transition-colors cursor-pointer border-none bg-transparent"
            >
              <div className="relative shrink-0 size-[20px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d={svgPaths.p1a0bb600}
                    stroke="#636363"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d={svgPaths.p2e75ed00}
                    stroke="#636363"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d={svgPaths.p3b4f0680}
                    stroke="#636363"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#636363] text-[14px] text-left">
                Logout
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
