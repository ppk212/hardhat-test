
# Requirements

- node `v14.19.3`
- npm `v6.14.17`
- hardhat `v2.10.1`



# INSTALL

```
npm install
```



# USAGE

## Execute hardhat local network
```
npx hardhat node
```


## Compile smart contract
```
npx hardhat compile
```

## Execute test code for sign

### Sign tx for tranfering eth
```
npx hardhat run scripts/transferEth/1_CreateTxOnline.ts
npx hardhat run scripts/transferEth/2_SignTxOffline.ts
npx hardhat run scripts/transferEth/3_SendTxOnline.ts
```

### Sign tx for deploying contract
```
npx hardhat run scripts/deployContract/1_CreateTxOnline.ts
npx hardhat run scripts/deployContract/2_SignTxOffline.ts
npx hardhat run scripts/deployContract/3_SendTxOnline.ts
```



# Scenarios

## Transfer Eth Transaction
### 1. Create Tx Online - 1_CreateTxOnline.js
1. Add account for Tx
2. Connect web3 network
3. Create tx which transfer eth
4. Write hash of tx in .txt file - File Path : './result/1_result.txt'
5. Write network info in network json (Option) - File Path : './result/networkInfo.json'

### 2. Sign Tx Offline - 2_SignTxOffline.js
1. Add account for Tx
2. Get tx hash(rlp) in file - File Path : './result/1_result.txt'
3. Get network info in file (Option) - File Path : './result/networkInfo.json'
4. Sign tx which transfer eth
5. Write tx hash in file - File Path : './result/2_serialized_tx.txt'

### 3. Send Tx Online - 3_SendTxOnline.js
1. Add account for Tx
2. Connect web3 network
3. Get tx's hash signed in file - File Path : './result/2_serialized_tx.txt'
4. Send signed tx which transfer eth
5. Get receipt of tx deployed
6. Write tx receipt finalized in file - File Path : './result/3_send_tx.txt'


## Deploy Contract Transaction
### 1. Create Tx Online - 1_CreateTxOnline.js
1. Add account for Tx
2. Connect web3 network
3. Create tx which deploy contract
4. Write hash of tx in .txt file - File Path : './result/1_result.txt'
5. Write network info in network json (Option) - File Path : './result/networkInfo.json'

### 2. Sign Tx Offline - 2_SignTxOffline.js
1. Add account for Tx
2. Get tx hash(rlp) in file - File Path : './result/1_result.txt'
3. Get network info in file (Option) - File Path : './result/networkInfo.json'
4. Sign tx which deploy contract
5. Write tx hash in file - File Path : './result/2_serialized_tx.txt'

### 3. Send Tx Online - 3_SendTxOnline.js
1. Add account for Tx
2. Connect web3 network
3. Get tx's hash signed in file - File Path : './result/2_serialized_tx.txt'
4. Send signed tx which deploy contract
5. Get receipt of tx deployed
6. Write tx receipt finalized in file - File Path : './result/3_send_tx.txt'
