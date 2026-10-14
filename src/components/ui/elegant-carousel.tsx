'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../index.css';

export interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
}

export interface ElegantCarouselProps {
  slides?: SlideData[];
  className?: string;
  autoPlayDuration?: number;
  progressBarPosition?: 'top' | 'bottom';
}

const DEFAULT_SLIDES: SlideData[] = [
  {
    title: 'Venetian Dusk',
    subtitle: 'Autumn / Winter Collection',
    description:
      'Where ancient architecture meets the dying light — a palette drawn from terracotta, aged stone, and the shimmering canals of Venice at twilight.',
    accent: '#C4956A',
    imageUrl:
      'https://cdn.21st.dev/assets/mirror/b6/b68a402619b8c34687ef1af3beec97970523a2d551951a6e7f9bfc6440311a50.jpg',
  },
  {
    title: 'Nordic Silence',
    subtitle: 'Spring / Summer Collection',
    description:
      'Inspired by the vast stillness of Scandinavian fjords — clean lines, muted tones, and the quiet power of unadorned beauty.',
    accent: '#8BA7B8',
    imageUrl:
      'https://cdn.21st.dev/assets/mirror/fd/fd105945b31cb78c4f7c4f51e59eeb2f5ae6b2e5ef3a3146414cc9e2ca41b7a9.jpg',
  },
  {
    title: 'Kyoto Garden',
    subtitle: 'Resort Collection',
    description:
      'Moss-covered pathways and paper lanterns — an ode to the meditative elegance of Japanese garden design and its timeless restraint.',
    accent: '#7A9E7E',
    imageUrl:
      'https://cdn.21st.dev/assets/mirror/a0/a0e389c10d2dd8dbcb6c68172c9c50923af819005697cd698a696cc7425e198f.jpg',
  },
  {
    title: 'Saharan Gold',
    subtitle: 'Capsule Collection',
    description:
      'The desert reveals its secrets at dawn — liquid gold spilling across endless dunes, textures carved by centuries of wind and time.',
    accent: '#D4A955',
    imageUrl:
      'https://cdn.21st.dev/assets/mirror/b6/b6b48f0e66744f53a7f879246e8191d5d2733b3226a5d6d45cc19a6bf2af4d29.jpg',
  },
];

export function ElegantCarousel({
  slides = DEFAULT_SLIDES,
  className = '',
  autoPlayDuration = 6000,
  progressBarPosition: _progressBarPosition = 'top',
}: ElegantCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [_direction, setDirection] = useState<'next' | 'prev'>('next');
  const [_progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = autoPlayDuration;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (isTransitioning || index === currentIndex) return;
      setDirection(dir || (index > currentIndex ? 'next' : 'prev'));
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide, slides.length]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide, slides.length]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext, SLIDE_DURATION]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div
      className={`carousel-wrapper ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-inner">
        {/* Left: Text Content */}
        <div className="carousel-content">
          <div className="carousel-content-inner">
            {/* Collection number */}
            <div
              className={`carousel-collection-num ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`carousel-title ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={`carousel-subtitle ${isTransitioning ? 'transitioning' : 'visible'}`}
              style={{ color: currentSlide.accent }}
            >
              {currentSlide.subtitle}
            </p>

            {/* Description */}
            <p
              className={`carousel-description ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.description}
            </p>

            {/* Navigation Arrows */}
            <div className="carousel-nav-arrows">
              <button
                onClick={goPrev}
                className="carousel-arrow-btn"
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="carousel-arrow-btn"
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="carousel-image-container">
          <div
            className={`carousel-image-frame ${isTransitioning ? 'transitioning' : 'visible'}`}
          >
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="carousel-image"
            />
          </div>

          {/* Decorative frame corner */}
          <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: currentSlide.accent }} />
          <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: currentSlide.accent }} />
        </div>
      </div>
    </div>
  );
}

export default ElegantCarousel;
