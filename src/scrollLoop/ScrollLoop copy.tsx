import React, { Children, useEffect, useRef, useState } from "react";
import { ScrollLoopType } from "./types";

const ScrollLoop: React.FC<ScrollLoopType> = ({ children, height, style }) => {
  const scrollLoopRef: React.LegacyRef<HTMLDivElement> | undefined =
    useRef(null);
  const [scrollChildrens, setScrollChildrens] = useState<any>([]);
  const [scrollTopRef, setScrollTopRef] = useState(0);
  // let scrollChildrens: any = null;
  let leftIndex = 0;
  let rightIndex = 0;

  // useEffect(() => {
  //   console.log(scrollChildrens);
  // }, [scrollChildrens]);

  useEffect(() => {
    if (scrollLoopRef.current && !scrollChildrens.length) {
      const newScrollChildrens: any =
        document.getElementById("scroll-loop")!.children;
      setScrollChildrens([...newScrollChildrens]);

      scrollLoopRef.current.insertAdjacentElement(
        "afterbegin",
        newScrollChildrens[0].cloneNode(true)
      );
      scrollLoopRef.current.insertAdjacentElement(
        "afterbegin",
        newScrollChildrens[1].cloneNode(true)
      );
      scrollLoopRef.current.insertAdjacentElement(
        "afterbegin",
        newScrollChildrens[2].cloneNode(true)
      );
      scrollLoopRef.current.insertAdjacentElement(
        "afterbegin",
        newScrollChildrens[3].cloneNode(true)
      );

      scrollLoopRef.current.scrollTop = newScrollChildrens[0].clientHeight * 4;
      // set right side index
      rightIndex = scrollChildrens.length - 1;
    }
  }, []);

  const onScrollHandler = () => {
    if (scrollLoopRef.current) {
      if (scrollLoopRef.current.scrollTop < 100) {
        scrollLoopRef.current.insertAdjacentElement(
          "afterbegin",
          scrollChildrens[3].cloneNode(true)
        );
        // scrollLoopRef.current.scrollTop += scrollChildrens[3].clientHeight;
        console.log(
          scrollLoopRef.current.scrollTop,
          scrollChildrens[3].clientHeight
        );
      }
    }
  };

  return (
    <>
      <h1 id="height-add">{scrollTopRef}</h1>
      <div
        ref={scrollLoopRef}
        id="scroll-loop"
        style={{ height: `${height}px`, overflow: "scroll", ...style }}
        onScroll={onScrollHandler}
      >
        {children}
      </div>
    </>
  );
};

export default ScrollLoop;
