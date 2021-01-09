import { useRef, useEffect, useCallback } from "react";

const useScrollCount = (end, start = 0, duration = 1000, delay = 0) => {
  const element = useRef();
  let observer = useRef();
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const onScroll = useCallback(
    ([entry]) => {
      const { current } = element;
      if (entry.isIntersecting) {
        let currentNumber = start;
        current.innerHTML = end;
        setTimeout(() => {
          const counter = setInterval(() => {
            currentNumber++;
            current.innerHTML = currentNumber;
            if (currentNumber === end) {
              clearInterval(counter);
            }
          }, stepTime);
        }, delay);
      }
    },
    [end, start, stepTime, element, delay]
  );

  useEffect(() => {
    if (element.current) {
      observer.current = new IntersectionObserver(onScroll, { threshold: 0.8 });
      observer.current.observe(element.current);
    }

    return () => observer.current && observer.current.disconnect();
  }, [onScroll]);

  return {
    ref: element,
  };
};

export default useScrollCount;
