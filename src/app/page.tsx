"use client";

import { observer, useLocalObservable } from "mobx-react-lite";
import Guess from "./components/Guess";
import Qwerty from "./components/Qwerty";
import { useEffect, useState, useRef } from "react";
import PuzzleStore from "./stores/PuzzleStore";


export default observer(function Home() {

  const store = useLocalObservable(() => PuzzleStore)
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    store.init()
    window.addEventListener('keyup', store.handleKeyup)

    return () => {
      window.removeEventListener('keyup', store.handleKeyup)
    }
  }, [store])

  useEffect(() => {
    // Show popup if game is over
    if (store.won || store.lost) {
      setShowPopup(true);
    }
  }, [store.won, store.lost]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    }

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);


  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-800">
      <h1 className="text-6xl mt-8 mb-2 font-bold uppercase text-transparent bg-clip-text bg-gradient-to-tl from-violet-600 to-teal-600">
        Wordle
      </h1>
      {store.guesses.map((_: string, i: number) => (
        <Guess
          key={i}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
      ))}
      {store.won && <h1 style={{color: '#00AFC1'}}>You won!</h1>}
      {store.lost && <h1 style={{color: '#FB2576'}}>You lost!</h1>}
      {(store.won || store.lost) && (
        <button
          onClick={store.init}
          className="rounded cursor-pointer hover:text-black bg-yellow-500 px-3 py-1"
          style={{ backgroundColor: '#176B87'}}
        >
          Play Again
        </button>
      )}
      <Qwerty store={store} />

      {showPopup && (
        <div
          ref={popupRef}
          className="absolute top-1 bg-white text-black rounded-lg shadow-lg px-5 py-1 animate-slideDown z-50"
        >
          <p className="text-md font-semibold uppercase">
            {store.word}
          </p>
        </div>
      )}
    </div>
  )
})