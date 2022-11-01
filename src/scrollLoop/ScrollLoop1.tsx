import React, { Children, useEffect, useRef, useState } from "react";
import { ScrollLoopType } from "./types";

const ScrollLoop: React.FC<ScrollLoopType> = ({ children, height, style }) => {
  const scrollLoopRef: React.LegacyRef<HTMLDivElement> | undefined =
    useRef(null);
  const [renderChildren, setRenderChildren] = useState([
    ...children,
    ...children,
  ]);
  const [newScrollHeight, setNewScrollHeight] = useState(0);

  useEffect(() => {
    if (scrollLoopRef.current) {
      let newScrollHeight = 0;
      const scrollChildrens = document.getElementById("scroll-loop")!.children;
      Array.from(scrollChildrens).map((child) => {
        newScrollHeight += child.clientHeight;
      });
      setNewScrollHeight(newScrollHeight / 2);
      scrollLoopRef.current.scrollTop = newScrollHeight / 2;
    }
  }, []);

  const onScrollHandler = () => {
    if (scrollLoopRef.current) {
      if (scrollLoopRef.current.scrollTop < 300) {
        // setRenderChildren([...children, ...renderChildren]);

        scrollLoopRef.current.scrollTop = newScrollHeight;
      }
    }
  };

  return (
    <div
      ref={scrollLoopRef}
      id="scroll-loop"
      style={{ height: `${height}px`, overflow: "scroll", ...style }}
      onScroll={onScrollHandler}
    >
      {renderChildren}
    </div>
  );
};

export default ScrollLoop;
