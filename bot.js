const { ethers } = require("ethers");
require("dotenv").config();
const fs = require("fs").promises;

const config = require("./config.json");

const pancakeFactoryABI = require("./abi/PancakeFactoryAbi.json");

const { pancakeFactoryAddress, websocketURL } = config;

const apiKey = process.env.WEBSOCKET_PROVIDER_API_KEY;

let provider;
let setupDone = false;
let pancakeFactory;

async function createWebSocketProvider() {
  try {
    provider = new ethers.providers.WebSocketProvider(websocketURL + apiKey);

    provider._websocket.on("close", async () => {
      console.log("WebSocket connection lost. Reconnecting...");
      setupDone = false;
      await reconnectWebSocket();
    });

    if (!setupDone) {
      await setupContracts();
      setupDone = true;
    }
  } catch (error) {
    console.error("Error while creating WebSocket provider:", error);
    setTimeout(createWebSocketProvider, 3000);
  }
}

async function reconnectWebSocket() {
  try {
    provider = new ethers.providers.WebSocketProvider(websocketURL);

    if (!setupDone) {
      await setupContracts();
      setupDone = true;
    }
  } catch (error) {
    console.error("Error while recreating WebSocket provider:", error);
    setTimeout(reconnectWebSocket, 3000);
  }
}

async function setupContracts() {
  try {
    pancakeFactory = new ethers.Contract(
      pancakeFactoryAddress,
      pancakeFactoryABI,
      provider
    );

    setupEventListeners();
  } catch (error) {
    console.error("Error during contract setup:", error);
  }
}

function setupEventListeners() {
  pancakeFactory.on(
    "PairCreated",
    async (token0, token1, pairAddress, eventId) => {
      console.log(
        `New Liquidity Pair Created:\n` +
          `  Token0: ${token0}\n` +
          `  Token1: ${token1}\n` +
          `  Pair Address: ${pairAddress}\n` +
          `  Pair ID: ${eventId}`
      );

      logPairAddress(pairAddress);
    }
  );

  pancakeFactory.on("error", (error) => {
    console.error("Event Listener Error:", error);
  });
}

async function logPairAddress(pairAddress) {
  try {
    await fs.appendFile("pairAddress.log", `${pairAddress}`);
    console.log("Pair address logged to file.");
  } catch (error) {
    console.error(`Error logging pair address to file: ${error}`);
  }
}

createWebSocketProvider();

process.stdin.resume();
