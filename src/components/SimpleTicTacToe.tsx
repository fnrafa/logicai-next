import React, {useState} from "react";

const SimpleTicTacToe: React.FC = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (index: number) => {
        if (board[index] || calculateWinner(board)) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const restartGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const calculateWinner = (squares: string[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const isDraw = (squares: string[]) => squares.every((cell) => cell != null) && !calculateWinner(squares);

    const winner = calculateWinner(board);
    const status = winner
        ? `Winner: ${winner}`
        : isDraw(board)
            ? "It's a Draw!"
            : `Next Player: ${isXNext ? "X" : "O"}`;

    const showOverlay = winner || isDraw(board);

    return (
        <div className="relative flex flex-col items-center gap-4 bg-black py-2">
            {showOverlay && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-10">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        {winner ? `Player ${winner} Wins!` : "It's a Draw!"}
                    </h2>
                    <button
                        onClick={restartGame}
                        className="mt-4 px-6 py-3 bg-secondary-700 text-white rounded-lg text-lg font-semibold hover:bg-secondary-600"
                    >
                        Restart Game
                    </button>
                </div>
            )}
            <h2 className="text-lg font-bold">{status}</h2>
            <div className="grid grid-cols-3 gap-2">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className="w-12 h-12 bg-primary-700 text-white rounded-lg text-2xl font-bold flex items-center justify-center"
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <button
                onClick={restartGame}
                className="mt-4 px-4 py-2 bg-secondary-700 text-white rounded-lg hover:bg-secondary-600"
            >
                Restart Game
            </button>
        </div>
    );
};

export default SimpleTicTacToe;
