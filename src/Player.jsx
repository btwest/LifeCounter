import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

function Player({ initialBgColor, flipped }) {
  const [life, setLife] = useState(40);
  const [bgColor, setBgColor] = useState(initialBgColor);

  const decreaseLife = () => {
    setLife((prevLife) => prevLife - 1);
  };

  const increaseLife = () => {
    setLife((prevLife) => prevLife + 1);
  };

  const backgroundColors = [
    "#ff005f", // Vibrant Pink
    "#3d4054", // Deep Greyish Blue
    "#ffd700", // Bright Gold for contrast and vibrancy
    "#6b8e23", // Olive Green for a natural, muted contrast
    "#87ceeb", // Sky Blue for a light, airy complement
  ];

  const changeBackgroundColor = () => {
    setBgColor((prevColor) => {
      const currentIndex = backgroundColors.indexOf(prevColor); // Get current index
      const nextIndex = (currentIndex + 1) % backgroundColors.length; // Calculate next index
      return backgroundColors[nextIndex]; // Return the next color
    });
  };

  const playerStyle = {
    transform: flipped ? "rotateX(180deg)" : "none",
    backgroundColor: bgColor,
    color: life <= 0 ? "red" : "white",
  };

  const lifeStyle = {
    transform: flipped ? "scaleX(-1)" : "none,",
  };

  return (
    <div className={`Player ${flipped ? "flipped" : ""}`} style={playerStyle}>
      <div className="Health">
        <div
          className={flipped ? "Increase" : "Decrease"}
          onClick={flipped ? increaseLife : decreaseLife}
        ></div>
        <div className="Life" style={lifeStyle}>
          {life}
        </div>
        <div
          className={flipped ? "Decrease" : "Increase"}
          onClick={flipped ? decreaseLife : increaseLife}
        ></div>
      </div>
      <div className="Toolbar"></div>
      <FontAwesomeIcon
        icon={faPalette}
        onClick={changeBackgroundColor}
        className="change-color-icon"
      />
    </div>
  );
}

export default Player;
