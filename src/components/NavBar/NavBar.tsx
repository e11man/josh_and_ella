import React, { useState, useEffect, useCallback } from 'react';
import { NavBarProps, NavItem, ScrollState } from './types';
import BrandLogo from './BrandLogo';
import NavItemComponent from './NavItem';
import MobileMenu from './MobileMenu';
import styles from './NavBar.module.css';

const NavBar: React.FC<NavBarProps> = ({ currentPage = '', className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    scrollDirection: 'up',
    lastScrollY: 0
  });
  const [isVisible, setIsVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Navigation items
  const navItems: NavItem[] = [
    { id: 'our-story', label: 'Our Story', href: '#our-story', isActive: currentPage === 'our-story' },
    { id: 'wedding-details', label: 'Wedding Details', href: '#wedding-details', isActive: currentPage === 'wedding-details' },
    { id: 'rsvp', label: 'RSVP', href: '#rsvp', isActive: currentPage === 'rsvp' },
    { id: 'photos', label: 'Photos', href: '#photos', isActive: currentPage === 'photos' },
    { id: 'wedding-party', label: 'Wedding Party', href: '#wedding-party', isActive: currentPage === 'wedding-party' },
    { id: 'registry', label: 'Registry', href: '#registry', isActive: currentPage === 'registry' }
  ];

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isScrolled = currentScrollY > 50;
    const scrollDirection = currentScrollY > scrollState.lastScrollY ? 'down' : 'up';
    
    // Hide navbar when scrolling down, show when scrolling up
    if (Math.abs(currentScrollY - scrollState.lastScrollY) > 10) {
      setIsVisible(scrollDirection === 'up' || currentScrollY < 100);
    }

    setScrollState({
      isScrolled,
      scrollDirection,
      lastScrollY: currentScrollY
    });
  }, [scrollState.lastScrollY]);

  // Throttled scroll event
  useEffect(() => {
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavItemClick = (href: string) => {
    // Smooth scroll to section
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const navBarClasses = [
    styles.navbar,
    scrollState.isScrolled ? styles.navbarScrolled : '',
    !isVisible ? styles.navbarHidden : '',
    hasLoaded ? styles.navbarLoaded : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={navBarClasses} role="banner">
        <div className={styles.navbarContainer}>
          {/* Brand Logo */}
          <div className={styles.navbarBrand}>
            <BrandLogo />
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.navbarNav} role="navigation" aria-label="Main navigation">
            <ul className={styles.navbarList}>
              {navItems.map((item) => (
                <NavItemComponent
                  key={item.id}
                  item={item}
                  onClick={handleNavItemClick}
                />
              ))}
            </ul>
          </nav>

          {/* Mobile Brand (simplified) */}
          <div className={styles.navbarMobileBrand}>
            <BrandLogo isMobile />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.mobileMenuButtonOpen : ''}`}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            <span className={styles.hamburgerIcon} aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navItems={navItems}
        currentPage={currentPage}
        onNavItemClick={handleNavItemClick}
      />
    </>
  );
};

export default NavBar;