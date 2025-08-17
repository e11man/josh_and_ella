// TypeScript interfaces for NavBar components

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NavBarProps {
  currentPage?: string;
  className?: string;
}

export interface BrandLogoProps {
  isMobile?: boolean;
  className?: string;
}

export interface NavItemProps {
  item: NavItem;
  onClick?: (href: string) => void;
  className?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPage?: string;
  onNavItemClick?: (href: string) => void;
}

export interface ScrollState {
  isScrolled: boolean;
  scrollDirection: 'up' | 'down';
  lastScrollY: number;
}