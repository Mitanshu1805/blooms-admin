import React from "react";

interface ImageProps {
  className?: string;
  src: any;
  style?: any;
  alt?: string;
  onClick?: (value: any) => void;
}

function Image({ style, className, src, alt, onClick }: ImageProps) {
  return (
    <img
      style={style}
      className={className}
      src={src}
      alt={alt}
      onClick={onClick}
    />
  );
}

export default Image;
