import React from "react";
import { Slide } from "@mui/material";

const SlideComponent = ({ children, direction = "left", timeout = 500 }) => {
  const [inProp, setInProp] = React.useState(true);

  React.useEffect(() => {
    return () => {
      setInProp(false);
    };
  }, []);

  return (
    <Slide direction={direction} in={inProp} timeout={timeout}>
      {children}
    </Slide>
  );
};

export default SlideComponent;
