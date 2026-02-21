import { FolderOpen, Activity, Search, Bell, User, ChevronDown, Menu, Plus, FileText } from 'lucide-react';

export type IconName = 
  | 'folder-open' 
  | 'activity' 
  | 'search' 
  | 'bell' 
  | 'user' 
  | 'chevron-down' 
  | 'menu' 
  | 'plus'
  | 'file-text';

export interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

const iconMap = {
  'folder-open': FolderOpen,
  'activity': Activity,
  'search': Search,
  'bell': Bell,
  'user': User,
  'chevron-down': ChevronDown,
  'menu': Menu,
  'plus': Plus,
  'file-text': FileText,
};

/**
 * Icon component - renders Lucide icons by name
 * @param name - Icon identifier
 * @param className - Additional CSS classes
 * @param size - Icon size in pixels
 */
export function Icon({ name, className = '', size = 24 }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={className} size={size} />;
}
