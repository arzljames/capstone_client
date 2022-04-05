import io from "socket.io-client";

//https://zcmc.herokuapp.com/

export const socket = io.connect("https://zcmc.herokuapp.com/");