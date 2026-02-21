import { Logo } from "../atoms/Logo";
import { NavItem } from "../molecules/NavItem";
import { Menu as MenuIcon } from "lucide-react";
import { IconButton } from "../atoms/IconButton";
import svgPaths from "../../../imports/svg-lh3rb6afa7";
import usersSvgPaths from "../../../imports/svg-zv9k55a1nr";


export interface SidebarProps {
  /**
   * Whether the sidebar is collapsed
   */
  isCollapsed?: boolean;
  /**
   * Toggle collapse handler
   */
  onToggle?: () => void;
  /**
   * Whether the sidebar is open on mobile
   */
  isMobileOpen?: boolean;
}

/**
 * Sidebar component - left navigation panel
 * Contains logo, menu toggle, and navigation items
 */
export function Sidebar({
  isCollapsed = false,
  onToggle,
  isMobileOpen = false,
}: SidebarProps) {

  const raw = localStorage.getItem("userData");
  const userData = JSON.parse(raw !== null ? raw : "null");

  return (
    <aside
      className={`bg-white box-border content-stretch flex flex-col gap-[8px] h-screen items-start px-[16px] py-[8px] transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[318px]"
      } ${isMobileOpen ? "mobile-open" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header with Logo and Menu */}
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div
            className={`box-border logo-mobile content-stretch flex items-center ${isCollapsed ? "justify-center" : "justify-center"} px-[16px] py-[24px] relative w-full`}
          >
            {!isCollapsed && <Logo />}
            <IconButton onClick={onToggle} aria-label="Toggle menu">
              <MenuIcon className="size-[24px] text-[#33363F] cursor-pointer" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="bg-white content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full ">
        <NavItem
          to="/eligibility-purchase"
          isCollapsed={isCollapsed}
          icon={
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 32 32"
            >
              <g>
                <rect
                  fill="var(--fill-0, #7E869E)"
                  fillOpacity="0.25"
                  height="13.3333"
                  rx="2"
                  width="16"
                  x="8"
                  y="4"
                />
                <path d={svgPaths.p8cbd3f0} fill="var(--fill-0, #262D33)" />
                <path d={svgPaths.p256605f0} fill="var(--fill-0, #262D33)" />
              </g>
            </svg>
          }
          label="Eligibility Purchase"
        />
        <NavItem
          to="/performance"
          isCollapsed={isCollapsed}
          icon={
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 32 32"
            >
              <g>
                <path d={svgPaths.p20865a80} fill="var(--fill-0, #222222)" />
                <path d={svgPaths.p1ab46600} fill="var(--fill-0, #222222)" />
              </g>
            </svg>
          }
          label="Performance"
        />

        {/* {userData?.role.includes("admin") && ( */
        <NavItem
          to="/Users"
          isCollapsed={isCollapsed}
          icon={
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 32 32"
            >
              <g id="Group_duotone_line">
                <circle
                  cx="16"
                  cy="10.6667"
                  id="Ellipse 46"
                  r="3.25"
                  stroke="var(--stroke-0, #222222)"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
                <path
                  d={usersSvgPaths.p229c4880}
                  id="Ellipse 47"
                  stroke="var(--stroke-0, #2A4157)"
                  strokeOpacity="0.24"
                  strokeWidth="1.5"
                />
                <path
                  d={usersSvgPaths.p7838760}
                  id="Ellipse 49"
                  stroke="var(--stroke-0, #2A4157)"
                  strokeOpacity="0.24"
                  strokeWidth="1.5"
                />
                <path
                  d={usersSvgPaths.p1bc73300}
                  fill="var(--stroke-0, #2A4157)"
                  fillOpacity="0.24"
                  id="Subtract"
                />
                <path
                  d={usersSvgPaths.p3bbd6580}
                  fill="var(--stroke-0, #2A4157)"
                  fillOpacity="0.24"
                  id="Subtract_2"
                />
                <path
                  d={usersSvgPaths.p242a3f80}
                  id="Rectangle 4160"
                  stroke="var(--stroke-0, #222222)"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          }
          label="Users"
        />
/* )} */}
      </nav>
    </aside>
  );
}
