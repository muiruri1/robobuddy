import React from "react";

interface AssetsProps {}

const Assets: React.FunctionComponent<AssetsProps> = () => {
  return (
    <a-assets>
      <audio id="happy" src="assets/happy-robot.wav" preload="auto"></audio>
      <audio id="sad" src="assets/sad-robot.wav" preload="auto"></audio>
      <audio id="motor" src="assets/motor.mp3" preload="auto"></audio>

      <a-mixin
        id="wheel"
        geometry="primitive: cylinder; height: 0.1; radius: 0.05"
        material="color: black"
      ></a-mixin>

      <a-mixin
        id="eye"
        geometry="primitive: cylinder; height: 0.1; radius: 0.075"
        material="color: white"
        rotation="90 0 0"
      ></a-mixin>
    </a-assets>
  );
};

export default Assets;
