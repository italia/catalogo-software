import { useState } from 'react';

interface Props {
  img: string;
  placeholder: string;
  alt: string;
}

export function ImageWithPlaceholder({ img, placeholder, alt }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <img className="img-placeholder" src={placeholder} alt={alt} />
      )}
      {img && (
        <img
          className="img-placeholder"
          src={img}
          alt={alt}
          style={{ display: loaded ? 'block' : 'none' }}
          onLoad={() => setLoaded(true)}
        />
      )}
    </>
  );
}
