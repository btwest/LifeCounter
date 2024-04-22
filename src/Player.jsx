import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

function Player({ initialBgColor, flipped }) {
  const [life, setLife] = useState(40);
  const [bgColor, setBgColor] = useState(initialBgColor);
  const [changeTally, setChangeTally] = useState(0);
  const [showTally, setShowTally] = useState(false);
  const [showTallyClass, setShowTallyClass] = useState("");

  let tallyTimeout = useRef(null);

  const manageTallyDisplay = (change) => {
    clearTimeout(tallyTimeout.current);
    setChangeTally((prev) => prev + change);
    setShowTally(true);
    setShowTallyClass(""); // Ensure class does not include 'hidden' on initial show

    tallyTimeout.current = setTimeout(() => {
      setShowTallyClass("hidden"); // First, trigger the fade-out effect
      setTimeout(() => {
        setShowTally(false);
        setChangeTally(0); // Reset the tally after it's no longer visible
      }, 500); // This timeout matches the duration of the opacity transition
    }, 1000); // Time visible before beginning to fade out
    console.log();
  };

  const decreaseLife = () => {
    setLife((prevLife) => prevLife - 1);
    manageTallyDisplay(-1);
  };

  const increaseLife = () => {
    setLife((prevLife) => prevLife + 1);
    manageTallyDisplay(+1);
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

  useEffect(() => {
    return () => {
      clearTimeout(tallyTimeout.current); // Clear the timeout if component unmounts
    };
  }, []);

  return (
    <div className={`Player ${flipped ? "flipped" : ""}`} style={playerStyle}>
      {showTally && (
        <div className={`ChangeTally ${showTallyClass}`}>
          {changeTally > 0 ? `+${changeTally}` : changeTally}
        </div>
      )}
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
