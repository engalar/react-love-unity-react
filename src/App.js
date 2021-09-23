import './App.css';
import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const BASE_NAME = 'unity3d/Build/unity3d.';

const unityContext = new UnityContext({
  loaderUrl: `${BASE_NAME}loader.js`,
  dataUrl: `${BASE_NAME}data`,
  frameworkUrl: `${BASE_NAME}framework.js`,
  codeUrl: `${BASE_NAME}wasm`,
});

function spawnEnemies() {
  unityContext.send("Cube", "SpawnEnemies", 100);
}

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);

  useEffect(function () {
    unityContext.on("GameOver", function (userName, score) {
      setIsGameOver(true);
      setUserName(userName);
      setScore(score);
    });
  }, []);

  return (
    <div>
      <button onClick={spawnEnemies}>Spawn a bunch!</button>
      {isGameOver === true && <p>{`Game Over! ${userName} ${score} points`}</p>}
      <Unity unityContext={unityContext} />
    </div>
  );
}

export default App;
