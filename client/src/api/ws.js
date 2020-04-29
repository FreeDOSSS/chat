let socket;

export const connect = () => {
  socket = new WebSocket("ws://localhost:7000");
  // socket.onopen = (e) => true;
  return socket;
};

export const sendMessage = (message) => {
  const body = JSON.stringify({ message, name: localStorage.getItem("name") });
  socket.send(body);
};
