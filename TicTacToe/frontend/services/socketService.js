const socket = new WebSocket("ws://127.0.0.1:8000/ws/game/");

export const sendGameState = (board) => {
    const data = JSON.stringify({ board });
    socket.send(data);
};

export const onGameStateUpdate = (callback) => {
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback(data.board);
    };
};
