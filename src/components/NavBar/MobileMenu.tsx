import React, { useEffect, useRef } from 'react';
import { MobileMenuProps } from './types';
import styles from './NavBar.module.css';

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  currentPage,
  onNavItemClick
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && firstItemRef.current) {
      firstItemRef.current.focus();
    }
  }, [isOpen]);

  // Trap focus within mobile menu
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab') {
        const focusableElements = menuRef.current?.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle swipe to close
  useEffect(() => {
    if (!isOpen) return;

    let startX = 0;
    let currentX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      currentX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diffX = currentX - startX;
      if (diffX > 100) { // Swipe right to close
        onClose();
      }
    };

    const menu = menuRef.current;
    if (menu) {
      menu.addEventListener('touchstart', handleTouchStart);
      menu.addEventListener('touchmove', handleTouchMove);
      menu.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (menu) {
        menu.removeEventListener('touchstart', handleTouchStart);
        menu.removeEventListener('touchmove', handleTouchMove);
        menu.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isOpen, onClose]);

  const handleNavItemClick = (href: string) => {
    if (onNavItemClick) {
      onNavItemClick(href);
    }
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={styles.mobileMenuOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div 
        ref={menuRef}
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}
      >
        <div className={styles.mobileMenuHeader}>
          <button
            className={styles.mobileMenuClose}
            onClick={onClose}
            aria-label="Close navigation menu"
            type="button"
          >
            <span className={styles.closeIcon} aria-hidden="true">
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        <nav className={styles.mobileMenuNav} role="navigation">
          <ul className={styles.mobileMenuList}>
            {navItems.map((item, index) => (
              <li key={item.id} className={styles.mobileMenuItem}>
                <a
                  ref={index === 0 ? firstItemRef : undefined}
                  href={item.href}
                  className={`${styles.mobileMenuLink} ${
                    currentPage === item.id ? styles.mobileMenuLinkActive : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavItemClick(item.href);
                  }}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileMenuFooter}>
          <p className={styles.mobileMenuDate}>June 15, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;