import React from 'react';
import { NavItemProps } from './types';
import styles from './NavBar.module.css';

const NavItem: React.FC<NavItemProps> = ({ item, onClick, className = '' }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(item.href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick(item.href);
      }
    }
  };

  return (
    <li className={`${styles.navItem} ${className}`}>
      <a
        href={item.href}
        className={`${styles.navLink} ${item.isActive ? styles.navLinkActive : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-current={item.isActive ? 'page' : undefined}
      >
        {item.label}
        <span className={styles.navLinkUnderline} aria-hidden="true"></span>
      </a>
    </li>
  );
};

export default NavItem;