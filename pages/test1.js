import React, { useState, useEffect, useCallback } from "react";

const fetchRandomNumber = () => Promise.resolve(Math.random());

const Test1 = () => {
  const [number, setNumber] = useState();
  const [scroll, setScroll] = useState(0);

  // handleScroll structured to have a singe state to all page
  // by using useCallback hook handleScroll function is memoized
  const handleScroll = useCallback(() => {
    setScroll(window.scrollY);
  }, []);

  useEffect(() => {
    // .then makes our function async
    fetchRandomNumber().then(setNumber);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // here handleScroll added to dependency, if there is any change
    // in value of handleScroll useEffect going to work
  }, [handleScroll]);

  return (
    <div style={{ minHeight: "1000vh" }}>
      <div style={{ position: "fixed", top: "20px" }}> Number: {number} </div>
      <div style={{ position: "fixed", top: "60px" }}> Scroll: {scroll} </div>
    </div>
  );
};

export default Test1;
