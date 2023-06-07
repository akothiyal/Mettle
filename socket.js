//import { io } from "socket.io-client";
var io = require('socket.io-client');

const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
    console.log("socket works :", event, args);
  });

  module.exports = socket;


  //TO REMOVE


//export default socket;