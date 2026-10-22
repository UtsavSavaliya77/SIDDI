import React from 'react';

interface ProductGalleryProps { images: string[]; productName: string; selectedFinishName?: string; photoNeeded: string; }

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName, selectedFinishName, photoNeeded }) => (
  <div className="product-gallery">
    <div className="product-gallery__stage">
      {images[0] ? <img src={images[0]} alt={`${productName}${selectedFinishName ? ` in ${selectedFinishName}` : ''}`} /> : <div className="product-gallery__placeholder"><span className="mono-label">Photograph pending</span><p>{photoNeeded}</p></div>}
    </div>
    <div className="product-gallery__views" aria-label="Product image views">
      {['Front view', 'Side profile', 'Detail view', 'In application'].map((label) => <div key={label} className="product-gallery__view"><span className="mono-label">{images.length ? 'View pending' : 'Photo needed'}</span><span>{label}</span></div>)}
    </div>
  </div>
);
