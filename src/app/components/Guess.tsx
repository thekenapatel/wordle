interface GuessProps {
    isGuessed: boolean;
    guess: string;
    word: string;
}

export default function Guess({ isGuessed, guess, word }: GuessProps) {
    return (
        <div className="mb-2 grid grid-cols-5 gap-2">
            {new Array(5).fill(0).map((_, i) => {
                const bgColor = !isGuessed
                    ? 'bg-black'
                    : guess[i] === word[i]
                        ? 'bg-teal-400'
                        : word.includes(guess[i])
                            ? 'bg-rose-400'
                            : 'bg-black'
                return (
                    <div className={`flex h-14 w-14 items-center justify-center border border-gray-400 font-bold uppercase text-white ${bgColor}`} key={i}>
                        {guess[i]}
                    </div>
                )
            })}
        </div>
    )
}


