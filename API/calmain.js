/* =========================
   Modern 2025 Calculator - 1.2x Scale
   ========================= */

body {
  margin: 0;
  padding: 0;
  background: #0d0d0d; /* blackish background */
  font-family: "Orbitron", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.calculator {
  background: #1a1a2e; /* bluish elegant body */
  border: 2px solid #0ff;
  border-radius: 30px;
  padding: 24px; /* increased from 20px */
  width: 384px; /* increased from 320px */
  box-shadow: 0 0 20px #0ff, 0 0 40px #ff00ff, 0 0 60px #0ff inset;
  backdrop-filter: blur(10px);
}

#display {
  width: 100%;
  height: 84px; /* increased from 70px */
  font-size: 2.64rem; /* increased from 2.2rem */
  color: #0ff;
  background: rgba(17, 17, 17, 0.6);
  border: 2px solid #0ff;
  border-radius: 12px;
  padding: 12px; /* increased from 10px */
  text-align: right;
  box-shadow: inset 0 0 15px #0ff, 0 0 20px #ff00ff;
  text-shadow: 0 0 5px #0ff, 0 0 10px #ff00ff;
  letter-spacing: 1px;
  backdrop-filter: blur(5px);
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  margin-top: 24px; /* slightly increased */
}

button {
  padding: 24px; /* increased from 20px */
  font-size: 1.44rem; /* increased from 1.2rem */
  font-weight: bold;
  color: #0ff;
  background: rgba(17, 17, 17, 0.6);
  border: 2px solid #0ff;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s all;
  box-shadow: 0 0 10px #0ff, 0 0 15px #ff00ff;
  text-shadow: 0 0 3px #0ff, 0 0 6px #ff00ff;
}

button:hover {
  background: rgba(0, 255, 255, 0.3);
  color: #111;
  box-shadow: 0 0 20px #0ff, 0 0 40px #ff00ff;
}

button:active {
  transform: scale(0.95);
  box-shadow: 0 0 10px #0ff, 0 0 20px #ff00ff inset;
}

.operator {
  background: rgba(255, 0, 255, 0.6);
  color: #111;
  border-color: #ff00ff;
}

.operator:hover {
  background: rgba(0, 255, 255, 0.3);
  color: #111;
  border-color: #0ff;
  box-shadow: 0 0 20px #0ff, 0 0 40px #ff00ff;
}

.clear {
  background: rgba(255, 0, 0, 0.6);
  color: #111;
  border-color: #ff0000;
}

.clear:hover {
  background: rgba(255, 85, 85, 0.6);
  box-shadow: 0 0 20px #ff5555, 0 0 40px #ff00ff;
}

.equals {
  background: rgba(0, 255, 0, 0.6);
  color: #111;
  border-color: #00ff00;
}

.equals:hover {
  background: rgba(85, 255, 85, 0.6);
  box-shadow: 0 0 20px #00ff00, 0 0 40px #ff00ff;
}
