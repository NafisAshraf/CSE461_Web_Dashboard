import React, { useState, useEffect } from "react";
import "./App.css";
import { Joystick } from "react-joystick-component";
import socket from "./socketConnection";

function App() {
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  useEffect(() => {
    setConnectionStatus(socket.connected ? "connected" : "disconnected");

    const handleConnect = () => setConnectionStatus("connected");
    const handleDisconnect = () => setConnectionStatus("disconnected");

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  const handleMove = (movement) => {
    console.log(movement.direction);
    socket.emit("joystick", movement.direction);
  };

  const handleStop = () => {
    console.log("stop");
    socket.emit("joystick", "stop");
  };

  return (
    <div className="bg-black vh-100">
      <div className="container p-5 text-white">
        <div className="row">
          <div className="col-6">
            <h1 className="text-center">Socket Connection Status</h1>
            <div className="text-center mt-3">
              {connectionStatus === "connected" ? (
                <span className="text-success">Connected</span>
              ) : (
                <span className="text-danger">Disconnected</span>
              )}
            </div>
          </div>
          <div className="col-6">
            <Joystick
              size={100}
              sticky={false}
              baseColor="white"
              stickColor="black"
              move={handleMove}
              stop={handleStop}
            ></Joystick>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
