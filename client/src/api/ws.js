let socket;

export const connect = () => {
  socket = new WebSocket("ws://localhost:7000");
  socket.onopen = (e) => {
    console.log("e", e);
    // socket.send('Меня зовут Джон');
  };
};
