import React, { useMemo } from "react";

interface TypographyProps extends React.AllHTMLAttributes<HTMLSpanElement> {
  component?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "a";
}

const Typography = ({
  component = "span",
  className,
  children,
  ...restProps
}: TypographyProps) => {
  const ComponentTypo = useMemo(() => {
    const mapComponent = {
      a: (
        <a {...restProps} className={className}>
          {children}
        </a>
      ),
      h1: (
        <h1 {...restProps} className={className}>
          {children}
        </h1>
      ),
      h2: (
        <h2 {...restProps} className={className}>
          {children}
        </h2>
      ),
      h3: (
        <h3 {...restProps} className={className}>
          {children}
        </h3>
      ),
      h4: (
        <h4 {...restProps} className={className}>
          {children}
        </h4>
      ),
      h5: (
        <h5 {...restProps} className={className}>
          {children}
        </h5>
      ),
      h6: (
        <h6 {...restProps} className={className}>
          {children}
        </h6>
      ),
      p: (
        <p {...restProps} className={className}>
          {children}
        </p>
      ),
      span: (
        <span {...restProps} className={className}>
          {children}
        </span>
      ),
      div: (
        <div {...restProps} className={className}>
          {children}
        </div>
      ),
    };

    return mapComponent[component];
  }, [restProps, component, children, className]);

  return ComponentTypo;
};

export default Typography;
