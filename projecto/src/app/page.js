"use client";

import { useState } from "react";
import Splashscreen from "@/app/componets/Splashscreen.js";
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig";

const colorsRef = ref(database, "Colorle/DayOne/Colors");

const colorOptions = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];

export default function Home() {
  const [dotColors, setDotColors] = useState(Array(5).fill("gray"));
  const [rows, setRows] = useState(Array(5).fill(Array(5).fill("gray")));
  const [currentRow, setCurrentRow] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(Array(5).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState("");

  const handleDotClick = (index) => {
    const newShowDropdown = [...showDropdown];
    newShowDropdown[index] = !newShowDropdown[index];
    setShowDropdown(newShowDropdown);
  };

  const handleColorChange = (index, color) => {
    const newDotColors = [...dotColors];
    newDotColors[index] = color;
    setDotColors(newDotColors);

    const newShowDropdown = [...showDropdown];
    newShowDropdown[index] = false;
    setShowDropdown(newShowDropdown);
  };

  const handleSubmit = () => {
    let isCorrect = true;
    let correctCount = 0;
    onValue(colorsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      console.log("hello?");
      for (let i = 0; i < dotColors.length; i++) {
        if (data[i] === dotColors[i]) {
          correctCount++;
          console.log("wegood");
        } else {
          isCorrect = false;
        }
      }
    });

    setCorrectCount(correctCount);

    if (isCorrect) {
      setGameOver(true);
      setGameResult("win");
    } else if (currentRow < 4) {
      const newRows = [...rows];
      newRows[currentRow] = [...dotColors];
      setRows(newRows);
      setCurrentRow(currentRow + 1);
      setDotColors(Array(5).fill("gray"));
    } else {
      setGameOver(true);
      setGameResult("lose");
    }
  };

  if (gameOver) {
    return gameResult === "win" ? (
      <Splashscreen bgcolor={"bg-green-500"} text="YAYAYAYYAYAYY" />
    ) : (
      <Splashscreen bgcolor={"bg-red-500"} text="You failed - Womp Womp" />
    );
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <h1 className="text-4xl sm:text-3xl text-black flex items-center justify-center text-center mb-1 sm:-mb-1">
          <a href="/">Colorle</a>
        </h1>

        {rows.map((rowColors, rowIndex) => (
          <div
            key={rowIndex}
            className="inline-block flex items-center justify-center space-x-20 mt-10 mb-10"
          >
            {rowColors.map((color, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        ))}

        {currentRow < 5 && (
          <div className="inline-block flex items-center justify-center space-x-5 mt-10 mb-10">
            {dotColors.map((color, index) => (
              <div key={index} className="relative">
                <div
                  className={`w-10 h-10 rounded-full cursor-pointer`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleDotClick(index)}
                ></div>

                {showDropdown[index] && (
                  <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg p-2 z-10">
                    {colorOptions.map((colorOption) => (
                      <div
                        key={colorOption}
                        className="cursor-pointer p-1 hover:bg-gray-200"
                        onClick={() => handleColorChange(index, colorOption)}
                      >
                        {colorOption}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Submit Answer
          </button>
        </div>
        <div>
          <h1>
            You have to guess the right color combination in 5 tries. Every time
            you try a combination, the right hand side will tell you how many
            colors are in the right spot. The color combination will change
            every day. The bottom array of dots is where you will chose the
            color combination.
          </h1>
        </div>
      </div>

      <div className="w-1/4 flex items-center justify-center bg-gray-100">
        <div className="text-6xl font-bold text-green-500">
          {correctCount} / 5
        </div>
      </div>
    </div>
  );
}
