# lattice-api

NodeJS / Express API based on Bitfinex.

Api functions:

- Get tips.
- Get Market depth.

The application contains the following features:

- **Express**.
- **Typescript**.

- **Jest**.
- **Axios**.
- **Moxios/Supertest**.
- **Eslint**.
- **Husky**

## Install

Use NVM command to set this current version:

```bash
nvm use
```

Install dependencies

```bash
npm install
```

### Environments

In the project, there is a file called ```.env.example```, which we must copy to ```.env``` and configure it to our liking.

Example:
```bash
cp .env.exaple .env
```

```bash
NODE_ENV=development # Environment
SERVER_HOST=0.0.0.0 # Hostname
SERVER_PORT=8080 # Port
BITFINEX_API=https://api-pub.bitfinex.com/v2 # Bitfinex API (do not change if not necessary)
VALID_PAIRS=BTCUSD,ETHUSD # Valid pairs.
```

### Run this project
```bash
npm run start
```

##### *Output example:*
```bash
lshoobridge:lattice lshoobridge$ npm run start
NodeJS Express server started at http://localhost:8080
```


### Run this project in development mode (hot reload):
```bash
npm run dev
```

### Run tests:
```bash
npm run test
```

### Run linter
```bash
npm run lint
```

### Run linter with --fix mode
```bash
npm run lint:fix
```
### Build project
```bash
npm run build
```
The typescript to Javascript transpilation will be generated and the result will be in the *build/* folder.

We can run the already compiled server with the command:
```bash
node build/index.js
```

## Endpoints
#### /tips

Endpoint definition example (js):

```javascript
const pair = 'ETHUSD'; // Allowed: 'ETHUSD', 'BTCUSD' (please, specify in .env file).
const precision = 'P0'; // Allowed: P0', 'P1', 'P2', 'P3', 'P4', 'R0'.
const len = 25; // Allowed size: '1', '25', '100'
const url = `https://localhost:8080/tips/${pair}?precision=${precision}&len=${len}`;
```

Run example:
```bash
curl http://localhost:8080/tips/ETHUSD?precision=P0&len=100
```

#### /depth

Endpoint definition example (js):

```javascript
const pair = 'ETHUSD'; // Allowed: 'ETHUSD', 'BTCUSD' (please, specify in .env file).
const type = 'bid'; // Allowed: 'bid', 'ask'
const size = 2; // Size
const url = `https://localhost:8080/depth/${pair}?type=${type}&size=${size}`;
```

Run example:
```bash
curl http://localhost:8080/depth/ETHUSD?type=bid&size=2
```

# Credits

App developed by Lucas Shoobridge for [Lattice](https://lattice.exchange/)
