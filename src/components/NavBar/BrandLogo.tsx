import React from 'react';
import { BrandLogoProps } from './types';
import styles from './NavBar.module.css';

const BrandLogo: React.FC<BrandLogoProps> = ({ isMobile = false, className = '' }) => {
  return (
    <div className={`${styles.brandLogo} ${className}`}>
      <h1 className={styles.brandName}>
        {isMobile ? 'J & E' : 'Josh & Ella'}
      </h1>
      <p className={styles.weddingDate}>
        March 14, 2026
      </p>
    </div>
  );
};

export default BrandLogo;