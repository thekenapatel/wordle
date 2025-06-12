import words from "../../../words.json";

interface GameStore {
    word: string;
    guesses: string[];
    currentGuess: number;
    won: boolean;
    lost: boolean;
    handleKeyup: (e: KeyboardEvent) => void;
    init: () => void;
    submitGuess: () => void;
    allGuesses: string[];
    exactGuesses: string[];
    inexactGuesses: string[];
}

const gameStore: GameStore = {
    word: "",
    guesses: [],
    currentGuess: 0,

    get won() {
        return this.guesses[this.currentGuess - 1] === this.word;
    },

    get lost() {
        return this.currentGuess === 6;
    },

    get allGuesses() {
        return this.guesses.slice(0, this.currentGuess).join('').split('')
    },
    get exactGuesses() {
        return (
            this.word
                .split('')
                .filter((letter, i) => {
                    return this.guesses
                        .slice(0, this.currentGuess)
                        .map((word) => word[i])
                        .includes(letter)
                })
        )
    },
    get inexactGuesses() {
        return this.word
            .split('')
            .filter((letter) => this.allGuesses.includes(letter))
    },

    init() {
        this.word = words[Math.floor(Math.random() * words.length)];
        this.guesses = new Array(6).fill("");
        this.currentGuess = 0;
    },

    handleKeyup(e) {
        console.log(e.key)
        if (this.won || this.lost) {
            return;
        }
        if (e.key === "Enter") {
            return this.submitGuess();
        }
        if (e.key === "Backspace") {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
                0,
                this.guesses[this.currentGuess].length - 1
            );
            return;
        }
        if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
            this.guesses[this.currentGuess] =
                this.guesses[this.currentGuess] + e.key.toLowerCase();
        }
    },

    submitGuess() {
        if (words.includes(this.guesses[this.currentGuess])) {
            return this.currentGuess += 1;
        }
    },
};

export default gameStore;
