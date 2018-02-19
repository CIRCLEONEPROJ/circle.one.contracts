# Circle.One smart contracts

## Testing

For the testing purposes you need to install `truffle` globally:
`npm install -g truffle`.

Then you need to install dependencies: `npm install`.

To run tests: `truffle test`

You can merge Solidity source files by running `npm run build-contracts` from
`smart-contracts` directory. Merged files can be found in `build/contracts`.

## Usage

To pay and obtain a data access token:

1. Set allowance for smart contract address (`token.approve`).
1. Create and store a random data access token.
1. Create 256-bit hash of this token (prefferably with a secret salt).
1. Submit a `PurchaseDataset.purchase` transaction with the hash created on the
previous step and a sum to be paid.

To check the token for validity:

1. Create 256-bit hash of the provided access token.
1. Check if the access token was registered in the smart-contract.

## Addresses (Kovan)

Token: 0x18f4CC605F50c79Db9faD8ba7D333372e4A1923d

Contract: 0x148452499f37F53DD4440f64e8bd9b6a64283B03
