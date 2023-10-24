import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface Props {
  handleIntersecting: () => void;
  isLastPage?: boolean;
}

const Intersection = ({
  children,
  handleIntersecting,
  isLastPage,
}: PropsWithChildren<Props>) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleIntersecting();
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
      {!isLastPage && <div ref={observerRef} style={{ height: '10px' }} />}
    </>
  );
};

export default Intersection;
