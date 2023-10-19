import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface Props {
  action: () => void;
}

const Intersection = ({ children, action }: PropsWithChildren<Props>) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        action();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  });

  return (
    <>
      {children}
      <div ref={observerRef} style={{ height: '10px' }} />
    </>
  );
};

export default Intersection;
