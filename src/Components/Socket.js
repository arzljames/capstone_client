import io from "socket.io-client";

//https://zcmc.herokuapp.com/

export const socket = io.connect("https://telemedicine.ap-1.evennode.com/");
