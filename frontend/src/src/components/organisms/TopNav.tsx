import { IconButton } from "../atoms/IconButton";
import { UserMenu } from "../molecules/UserMenu";
import { Bell, Menu } from "lucide-react";
import { User } from "../../types";

export interface TopNavProps {
  user: User;
  onSearchChange?: (value: string) => void;
  onLogout?: () => void;
  onToggleSidebar?: () => void;
}
export function TopNav({ user, onLogout, onToggleSidebar }: TopNavProps) {
  return (
    <header className="bg-white h-[90px] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[90px] items-center content-end top-nav-mobile px-[24px] py-[16px] relative w-full">
          {/* Left section - Mobile Menu Button (only visible on mobile) */}
          <div className="hamburger-menu">
            <IconButton onClick={onToggleSidebar} aria-label="Toggle menu">
              <Menu className="size-[24px] text-[#262D33]" />
            </IconButton>
          </div>

          {/* Right section - Notifications and User */}
          <div className="content-stretch flex gap-[32px] items-center relative shrink-0">
            <IconButton aria-label="Notifications">
              <Bell className="size-[24px] text-[#262D33]" />
            </IconButton>
            <UserMenu user={user} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
}
