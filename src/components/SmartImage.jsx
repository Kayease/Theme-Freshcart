import React, { useState, useRef, useEffect, useMemo } from 'react';

// Utility: build srcset for responsive images (expects images named with size suffix or single src)
function buildSrcSet(src, widths = [320, 480, 640, 768, 1024, 1280]) {
  if (!src) return '';
  // If the src already seems like a CDN with width params, user can override; return empty.
  if (/w=\d+/i.test(src)) return '';
  const extIndex = src.lastIndexOf('.');
  if (extIndex === -1) return '';
  const base = src.substring(0, extIndex);
  const ext = src.substring(extIndex);
  return widths.map(w => `${base}-${w}w${ext} ${w}w`).join(', ');
}

// Attempt to derive a WebP alternative (if original isn't already webp)
function deriveWebP(src) {
  if (!src) return null;
  if (src.endsWith('.webp')) return null;
  const extIndex = src.lastIndexOf('.');
  if (extIndex === -1) return null;
  return src.substring(0, extIndex) + '.webp';
}

const SmartImage = ({
  src,
  alt = '',
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+',
  sizes = '(max-width: 768px) 100vw, 50vw',
  responsive = true,
  lazy = true,
  onLoad,
  onError,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(!lazy); // if not lazy, render immediately
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!lazy || inView) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '150px 0px' }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [lazy, inView]);

  const srcSet = useMemo(() => (responsive ? buildSrcSet(src) : ''), [src, responsive]);
  const webp = useMemo(() => (responsive ? deriveWebP(src) : null), [src, responsive]);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover animate-pulse"
        />
      )}
      {inView && (
        <picture>
          {webp && (
            <source
              srcSet={srcSet ? srcSet.replace(/(\.\w{2,4}) /g, '.webp ') : webp}
              type="image/webp"
              sizes={sizes}
            />
          )}
          <img
            src={src}
            srcSet={srcSet || undefined}
            sizes={srcSet ? sizes : undefined}
            alt={alt}
            onLoad={e => {
              setIsLoaded(true);
              onLoad && onLoad(e);
            }}
            onError={e => {
              if (onError) onError(e); else e.currentTarget.removeAttribute('srcset');
            }}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={lazy ? 'lazy' : 'eager'}
            decoding="async"
            {...rest}
          />
        </picture>
      )}
    </div>
  );
};

export default SmartImage;
