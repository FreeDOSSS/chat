let socket;
import params from "./../constants/params";
const { wsServerUrl } = params;
export const connect = () => {
  socket = new WebSocket(`${wsServerUrl}?name=${localStorage.getItem("name")}`);
  return socket;
};

export const sendMessage = (message) => {
  const body = JSON.stringify({ message, name: localStorage.getItem("name") });
  socket.send(body);
};
