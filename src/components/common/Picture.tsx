import React, { useState } from 'react';
import { ASSETS, AssetInfo } from '../../assets';

export interface PictureProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  assetKey: keyof typeof ASSETS;
  fallbackAlt?: string;
  className?: string;
  priority?: boolean;
}

export const Picture: React.FC<PictureProps> = ({
  assetKey,
  fallbackAlt,
  className = '',
  priority = false,
  ...rest
}) => {
  const asset: AssetInfo | undefined = ASSETS[assetKey];
  const [hasError, setHasError] = useState(false);

  if (!asset || hasError) {
    const filename = asset ? asset.expectedName : String(assetKey);
    return (
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed border-brass/50 bg-walnut/70 text-brass-light p-4 text-center ${className}`}
        role="img"
        aria-label={`Missing asset: ${filename}`}
      >
        <span className="font-mono text-xs uppercase tracking-wider text-brass">
          [Asset Placeholder]
        </span>
        <span className="font-mono text-[11px] text-parchment/70 mt-1">
          {filename}
        </span>
      </div>
    );
  }

  return (
    <picture className="contents">
      <source srcSet={asset.webp} type="image/webp" />
      <source srcSet={asset.original} />
      <img
        src={asset.original}
        alt={asset.alt || fallbackAlt || ''}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onError={() => setHasError(true)}
        className={className}
        {...rest}
      />
    </picture>
  );
};
