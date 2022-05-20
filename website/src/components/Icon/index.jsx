import React from "react";

export const Triangle = (props) => {
  const { width = "16px", color = "#000 "} = props;

  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 211" width={width} {...props}>
      <path d="M237.952 193.602 129.551 6.263c-4.832-8.35-14.276-8.35-19.109 0L2.055 193.602c-2.41 4.165-2.713 8.252-.84 11.484 1.862 3.245 5.562 5.021 10.394 5.021h216.787c4.833 0 8.52-1.78 10.395-5.021 1.86-3.232 1.57-7.319-.841-11.484h.002z" fill={color} />
    </svg>
  );
}