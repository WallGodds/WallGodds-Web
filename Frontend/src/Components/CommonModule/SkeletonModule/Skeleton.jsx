import React from 'react';
import styles from './Skeleton.module.css';

const Skeleton = ({ width, height, borderRadius = '8px' }) => {
  return (
    <div 
      className={styles.skeleton} 
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default Skeleton;
