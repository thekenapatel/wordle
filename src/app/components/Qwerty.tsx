import { observer } from 'mobx-react-lite';

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

export default observer(function Querty({ store }: { store: GameStore }) {
    const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
    return (
        <div className='mt-2'>
            {qwerty.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center text-black gap-1">
                    {row.split('').map((char, i) => {
                        const bgColor = store.exactGuesses.includes(char)
                            ? 'bg-teal-400'
                            : store.inexactGuesses.includes(char)
                                ? 'bg-rose-400'
                                : store.allGuesses.includes(char)
                                    ? 'bg-indigo-400'
                                    : 'bg-white'
                        return (
                            <div key={char + i}
                                className={`rounded-md m-px mb-1 flex h-9 w-9 items-center justify-center uppercase cursor-pointer ${bgColor}`}
                                onClick={() => store.handleKeyup({ key: char } as KeyboardEvent)} // Simulate key press
                            >
                                {char}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
})