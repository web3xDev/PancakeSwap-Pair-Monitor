# PancakeSwap Pair Monitoring Script

## Overview

This script monitors the creation of new liquidity pairs on PancakeSwap using the PancakeFactory contract. It establishes a WebSocket connection to a blockchain node, listens for the `PairCreated` event from the PancakeFactory contract, and logs details of new pairs to a file.

## Requirements

- Node.js
- npm (Node Package Manager)
- An API key from a blockchain node provider that supports WebSocket (e.g., Infura, Alchemy, Chainstack)

## Installation

1. Clone the repository or download the script files.
2. Navigate to the script's directory in your terminal.
3. Run `npm install` to install required dependencies.

## Configuration

1. Create a `.env` file in the root directory of the script.
2. Add your WebSocket provider API key to the `.env` file as follows:
   ```
   WEBSOCKET_PROVIDER_API_KEY=your_api_key_here
   ```
3. Update the `config.json` file with your specific configurations:
   - `websocketURL`: The base URL of your WebSocket provider.
   - `pancakeFactoryAddress`: The contract address of the PancakeFactory(already declared).
     This `config.json` file should be in the root directory of the script.

## Usage

Run the script with the following command:

```
node bot.js
```

## Features

- Establishes and maintains a WebSocket connection.
- Monitors for `PairCreated` events from the PancakeFactory contract.
- Logs details of new liquidity pairs to `pairAddress.log`.

## Error Handling

- Automatically attempts to reconnect the WebSocket in case of connection loss.
- Logs errors to the console for troubleshooting.

## Notes

- Ensure that your API key is kept secure.
- The script is configured for the PancakeSwap on Binance Smart Chain, but can be adapted for other networks or contracts.

## License

This script is distributed under the GNU General Public License (GPL).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open issues for any improvements or bug fixes.

## Support

If you encounter any problems or have any inquiries, please open an issue for support.

Developed with ❤️ for the Ethereum and Binance Smart Chain communities.
