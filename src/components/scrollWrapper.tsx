/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface ScrollWrapperProps {
    children: React.ReactNode;
    onScrollEnd: () => void;
    marginTop?: number;
    classNameDetector?: string;
    styleDetector?: React.CSSProperties;
}

const ScrollWrapper = ({
  children,
  onScrollEnd,
  marginTop = 0,
  classNameDetector = "",
  styleDetector = {},
}: ScrollWrapperProps) => {
  //! State
  const { ref, inView } = useInView();

  //! Function
  useEffect(() => {
    if (inView) {
      onScrollEnd && onScrollEnd();
    }
  }, [inView]);

  //! Render
  return (
    <Fragment>
      {children}
      <div
        ref={ref}
        className={classNameDetector}
        style={{
          display: "flex",
          visibility: "hidden",
          height: "1px",
          transform: `translateY(${marginTop}px)`,
          zIndex: -2,
          ...(styleDetector || {}),
        }}
      />
    </Fragment>
  );
};

export default ScrollWrapper;
