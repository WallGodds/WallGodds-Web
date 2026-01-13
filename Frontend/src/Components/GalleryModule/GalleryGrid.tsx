import React from 'react';
import ImageCard from '../CommonModule/ImageCardModule/ImageCard';
import styles from './GalleryGrid.module.css';
import { wallpaperData } from '../../data/wallpaperData';

interface GalleryGridProps {
  category: 'mobile' | 'tablet' | 'desktop';
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ category }) => {
  const images = wallpaperData[category] || [];

  return (
    <div className={styles.gallery}>
      <div className={styles.grid}>
        {images.map((img: string, index: number) => (
          <ImageCard key={`${category}-${index}`} imageSrc={img} />
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
