import React, { Children, useEffect, useRef, useState } from "react";

import { ScrollLoopType } from "./types";

const ScrollLoop: React.FC<ScrollLoopType> = ({ children, height, style }) => {
  const scrollLoopRef: React.LegacyRef<HTMLDivElement> | undefined =
    useRef(null);
  const [scrollLoopChildrens, setScrollLoopChildrens] = useState<any>();
  const [index, setIndex] = useState({
    left: 0,
    right: 0,
  });

  // Set the scrolling children as HTMLElement
  useEffect(() => {
    if (scrollLoopRef.current) {
      const scrollChild: any = document.getElementById("scroll-loop")?.children;
      setScrollLoopChildrens([...scrollChild]);
      setIndex({ ...index, right: scrollChild!.length - 1 });
    }
  }, []);

  // Load the initial childrens
  useEffect(() => {
    if (scrollLoopChildrens && scrollLoopRef.current) {
      // Load children above
      loadChildrensBefore(true);
    }
  }, [scrollLoopChildrens]);

  /**
   * If isScrollTopInit true then scrollTop is updated without clientHeight
   * @param isScrollTopInit
   */
  const loadChildrensBefore = (isScrollTopInit: boolean) => {
    if (scrollLoopChildrens && scrollLoopRef.current) {
      let currentLoadHeight = 0;
      let rightIndex = index.right;
      while (currentLoadHeight <= scrollLoopRef.current!.offsetHeight) {
        scrollLoopRef.current?.insertAdjacentElement(
          "afterbegin",
          scrollLoopChildrens[rightIndex].cloneNode(true)
        );

        currentLoadHeight += scrollLoopChildrens![rightIndex].clientHeight;
        if (rightIndex === 0) {
          rightIndex = scrollLoopChildrens.length - 1;
        } else {
          rightIndex--;
        }
      }

      /**
       * Remove the child element from scroll container
       * Update the left side index
       */
      // let removeElementHeight = 0;
      // let leftIndex = 0;
      // while(removeElementHeight <= scrollLoopRef.current!.offsetHeight) {

      // }

      if (isScrollTopInit) {
        scrollLoopRef.current.scrollTop = currentLoadHeight;
      } else {
        scrollLoopRef.current.scrollTop =
          currentLoadHeight + scrollLoopRef.current!.offsetHeight;
      }
      setIndex({ ...index, right: rightIndex });
    }
  };

  /**
   * Insert all the children after the scroll container
   */
  const loadChildrensAfter = () => {
    if (scrollLoopRef.current) {
      // This condition is perfect
      if (
        scrollLoopRef.current.scrollTop <=
        scrollLoopRef.current.scrollHeight - 300
      ) {
        console.log(
          scrollLoopRef.current?.scrollTop <=
            scrollLoopRef.current?.scrollHeight - 300
        );
      }
    }
  };

  const onScrollHandler = () => {
    if (scrollLoopRef.current) {
      /**
       * If the scrollTop is less than scroll container height.
       */
      if (
        scrollLoopRef.current?.scrollTop <= scrollLoopRef.current!.offsetHeight
      ) {
        loadChildrensBefore(false);
      } else if (
        scrollLoopRef.current?.scrollTop >= scrollLoopRef.current!.offsetHeight
      ) {
        loadChildrensAfter();
      }
    }
  };

  return (
    <>
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
