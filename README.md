# Simple Web3 Exchange

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/) [![react](https://img.shields.io/badge/frontend-react-blue.svg)](https://reactjs.org/) [![node](https://img.shields.io/badge/backend-node-green.svg)](https://nodejs.org/en/)

Simple Web3 Exchange is a full-stack application built using Node.js, Express, React, and Web3.js. This project allows users to interact with the Ethereum blockchain via MetaMask, enabling them to buy, sell, and view the balance of specific coins. The application's logic is kept simple and does not involve any pricing for the buy/sell operations.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User authentication via MetaMask
- Buying, selling, and viewing balance of coins
- Simple and easy-to-understand logic
- Monorepo structure for easy management and scalability

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14.x.x or higher)
- [Yarn](https://yarnpkg.com/) (v1.x.x or higher)

### Installation

1. Clone the repo

```bash
git clone git@github.com:Cylop/simple-web3-exchange.git
```

2. Change the directory to the project root

```bash
cd simple-web3-monorepo
```

3. Install the dependencies for both server and client

```bash
yarn install
```

## Usage

1. Start the server

```bash
yarn server
```

2. In a separate terminal, start the client

```bash
yarn client
```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

4. Connect your MetaMask wallet and start buying, selling, and viewing your coin balance.

## Contributing

Any contributions you make are greatly appreciated. Please follow these steps to contribute:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

Distributed under the MIT License.

