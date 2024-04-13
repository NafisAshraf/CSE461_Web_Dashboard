import io from "socket.io-client";

const serverIP = "172.20.10.3";

const options = {
  auth: {
    token: "reactClientToken",
  },
};

// const socket = io("http://localhost:3000", options);
const socket = io(`http://${serverIP}:3000`, options);

export default socket;
