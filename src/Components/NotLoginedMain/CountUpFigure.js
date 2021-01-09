import React from "react";
import { useScrollCount } from "../../hooks";
import "./CountUpFIgure.css";
const CountUpFigure = ({ figure }) => {
  const { number, description, id } = figure;
  const numLen = number.length - 1;
  const countTarget = number[numLen].num;
  const counter = useScrollCount(
    countTarget,
    Math.floor(countTarget > 200 ? countTarget - 200 : countTarget / 3),
    150,
    id * 150
  );

  return (
    <div className="NL-figure-box NL-descript-font">
      <p className="NL-figure">
        {number.map((i, index) => (
          <React.Fragment key={index}>
            {index === numLen - 1 ? (
              <span>{i.num}</span>
            ) : (
              <span {...counter}></span>
            )}
            <span className="NL-unit">{i.unit}</span>
          </React.Fragment>
        ))}
      </p>
      <p className="aaa">{description}</p>
    </div>
  );
};

export default CountUpFigure;
