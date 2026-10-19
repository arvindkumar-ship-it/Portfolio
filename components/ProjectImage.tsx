"use client";

import { useEffect, useRef, useState } from "react";


export default function ProjectImage({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    setFailed(false);
    const image = ref.current;
    if (image?.complete && image.naturalWidth === 0) setFailed(true);
  }, [src]);
  return <div className="project-image">
    {!failed ? <img ref={ref} src={src} alt={`${title} landing page preview`} loading="lazy" onError={() => setFailed(true)} /> : <div className="project-image-placeholder"><span>{title}</span><small>Preview coming soon</small></div>}
  </div>;
}
