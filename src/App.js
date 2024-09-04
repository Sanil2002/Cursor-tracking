import { useState, useEffect, useRef } from "react";
import "./styles/styles.scss";

function App() {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const eyeLeft = useRef();                                                                   // useRef hooks to create references to DOM elements (left and right eyes)
  const eyeRight = useRef();

  const eyeBrowLeft = useRef();
  const eyeBrowRight = useRef();

  function calcAngle(element) {                                                               // Function to calculate the angle between the element and the mouse pointer
    if (!element.current) return;                                                             //checking whether the element's ref is available

    let elX = element.current.offsetLeft + element.current.clientWidth / 2;                   // Get the center coordinates of the element
    let elY = element.current.offsetTop + element.current.clientHeight / 2;

    var rad = Math.atan2(mouseCoordinates.x - elX, mouseCoordinates.y - elY);                 // Calculate the angle in radians between the element's center and the mouse position and
    var rot = rad * (180 / Math.PI) * -1 + -18;                                               //... Converting the angle from radians to degrees and adjust the rotation.

    return rot;                                                                               //return the calculated rotation angle
  }

  const handleMouseMove = (event) => {                                                        // Event handler to update mouse coordinates and animate eyebrows
    setMouseCoordinates({ x: event.clientX, y: event.clientY });                              //updating the state with current mouse cordinates

    eyeBrowLeft.current.style.transform = `translateY(${event.clientY / 50}px)`;              // Move the left eyebrow slightly up or down based on the Y position of the mouse
    eyeBrowRight.current.style.transform = `translateY(${event.clientY / 50}px)`;             // Move the right eyebrow slightly up or down based on the Y position of the mouse
  };

  useEffect(() => {                                                                           // useEffect hook to add the mousemove event listener when the component mounts
    document.addEventListener("mousemove", handleMouseMove);

    return () => {                                                                            //clean-up function
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="App">
      <div className="eyebrow_container">
        <div ref={eyeBrowLeft} className="eye_brow left"></div>
        <div ref={eyeBrowRight} className="eye_brow right"></div>
      </div>
      <div className="eye_container">
        <div
          ref={eyeLeft}                                                                       //Left eye element with rotation applied based on mouse position
          style={{
            transform: `rotate(${calcAngle(eyeLeft)}deg)`,
          }}
          className="eye"
        ></div>
        <div
          ref={eyeRight}                                                                      //Right eye element with rotation applied based on mouse position
          style={{
            transform: `rotate(${calcAngle(eyeRight)}deg)`,
          }}
          className="eye"
        ></div>
      </div>
    </div>
  );
}

export default App;
