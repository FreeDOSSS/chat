import params from "./../constants/params";
const { wsServerUrl } = params;

export const socket = new WebSocket(
  `${wsServerUrl}?name=${localStorage.getItem("name")}`
);

export const sendMessage = (message) => {
  const body = JSON.stringify({ message, name: localStorage.getItem("name") });
  socket.send(body);
};
