import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FadeInAnimation = ({
  children,
  wrapperElement = "div",
  direction = null,
  delay = 0,
  ...props
}) => {
  const Component = wrapperElement;
  let compRef = useRef(null);
  const distance = 200;
  let fadeDirection;
  switch (direction) {
    case "left":
      fadeDirection = { x: -distance };
      break;
    case "right":
      fadeDirection = { x: distance };
      break;
    case "up":
      fadeDirection = { y: distance };
      break;
    case "down":
      fadeDirection = { y: -distance };
      break;
    default:
      fadeDirection = { x: 0 };
  }
  useEffect(() => {
    gsap.set(".gs_reveal", {opacity: 0});
    gsap.defaults({ease: "power3"});
    ScrollTrigger.batch(".gs_reveal", {
      //interval: 0.1, // time window (in seconds) for batching to occur. 
      //batchMax: 3,   // maximum batch size (targets)
      onEnter: batch => gsap.to(batch, {opacity: 1, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true, duration: 2, delay: .3}),
      onLeave: batch => gsap.set(batch, {opacity: 0, overwrite: true}),
      onEnterBack: batch => gsap.to(batch, {opacity: 1, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true, duration: 2, delay: .3}),
      onLeaveBack: batch => gsap.set(batch, {opacity: 0, overwrite: true}),
    });
    
  
    // when ScrollTrigger does a refresh(), it maps all the positioning data which 
    // factors in transforms, but in this example we're initially setting all the ".box"
    // elements to a "y" of 100 solely for the animation in which would throw off the normal 
    // positioning, so we use a "refreshInit" listener to reset the y temporarily. When we 
    // return a gsap.set() in the listener, it'll automatically revert it after the refresh()!
    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".gs_reveal", {opacity: 0}));
  }, [compRef, fadeDirection, delay]);
  return (
    <Component ref={compRef} {...props}>
      {children}
    </Component>
  );
};

export default FadeInAnimation;