import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ScrollLoop from "./scrollLoop";

function App() {
  return (
    <div className="App">
      <ScrollLoop
        height={300}
        style={{
          background: "green",
          color: "white",
        }}
      >
        <h1>1</h1>
        <h1>2</h1>
        <h1>3</h1>
        <h1>4</h1>
        <h1>5</h1>
        <h1>6</h1>
        <h1>7</h1>
        <h1>8</h1>
        <h1>9</h1>
        <h1>10</h1>
        <h1>11</h1>
        <h1>12</h1>
      </ScrollLoop>
    </div>
  );
}

export default App;
