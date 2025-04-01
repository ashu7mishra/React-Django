import React, { useState, useEffect } from "react";
import { sendGameState, onGameStateUpdate } from "../services/socketService";

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [next, setNext] = useState("X");

    useEffect(() => {
        onGameStateUpdate((newBoard) => {
            setBoard(newBoard);
        });
    }, []);

    const handleClick = (index) => {
        if (board[index]) return;

        const newBoard = [...board];
        newBoard[index] = next;
        setBoard(newBoard);
        setNext(next === "X" ? "O" : "X");

        sendGameState(newBoard);
    };

    return (
        <div>
            <h2>Tic-Tac-Toe (Reactive)</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "5px" }}>
                {board.map((cell, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        style={{ width: "100px", height: "100px", fontSize: "24px" }}
                    >
                        {cell}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Game;
