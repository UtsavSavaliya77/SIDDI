import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaProps {
  title: string;
  description: string;
  ogImage?: string;
}

export const Meta: React.FC<MetaProps> = ({
  title,
  description,
  ogImage = '/siddi-logo.png',
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (attribute: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Description
    setMetaTag('name', 'description', description);

    // 3. Open Graph Tags
    const fullUrl = window.location.origin + location.pathname;
    const fullImgUrl = ogImage.startsWith('http') ? ogImage : window.location.origin + ogImage;

    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:image', fullImgUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'SIDDI Architectural Hardware');

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImgUrl);
  }, [title, description, ogImage, location.pathname]);

  return null;
};
