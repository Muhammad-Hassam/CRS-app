import React, { useEffect } from 'react';
import './App.css';
import Router from '../src/components/config/router';
import socketIOClient from "socket.io-client";
import url from "./baseurl/baseURL"

function App() {

  useEffect(() => {
    var socket = socketIOClient(url);
    socket.on('connect', function () {
      console.log("connected")
    });
  }, [])
  return (
    <>
      <Router />
    </>
  );
}

export default App;
