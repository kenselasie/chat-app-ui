"use client";

import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:7500";
export const socket = io(ENDPOINT);
