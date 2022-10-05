
# Requirements

- node `v14.19.3`
- npm `v6.14.17`
- hardhat `v2.10.1`



# INSTALL

```
npm install
```



# USAGE


## Execute Ganache local network
```
ganache-cli --account="0x5eadbceddd2445e35d3f9bbe5dcbec3c414c7d95d1822f017c11e5fe35eefe37,10000000000000000000000000" --account="0x56f1e266fa8d80b1ba2cef87ba284dee97a7819f9cae47d4d4a2c9e9b3782828,0"
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
### 1. Create Tx Online - 1_CreateTxOnline.ts
1. Add account for Tx
2. Connect web3 network
3. Create tx which transfer eth
4. Write hash of tx in .txt file - File Path : './result/1_result.txt'
5. Write network info in network json (Option) - File Path : './result/networkInfo.json'

### 2. Sign Tx Offline - 2_SignTxOffline.ts
1. Add account for Tx
2. Get tx hash(rlp) in file - File Path : './result/1_result.txt'
3. Get network info in file (Option) - File Path : './result/networkInfo.json'
4. Sign tx which transfer eth
5. Write tx hash in file - File Path : './result/2_serialized_tx.txt'

### 3. Send Tx Online - 3_SendTxOnline.ts
1. Add account for Tx
2. Connect web3 network
3. Get tx's hash signed in file - File Path : './result/2_serialized_tx.txt'
4. Send signed tx which transfer eth
5. Get receipt of tx deployed
6. Write tx receipt finalized in file - File Path : './result/3_send_tx.txt'


## Deploy Contract Transaction
### 1. Create Tx Online - 1_CreateTxOnline.ts
1. Add account for Tx
2. Connect web3 network
3. Create tx which deploy contract
4. Write hash of tx in .txt file - File Path : './result/1_result.txt'
5. Write network info in network json (Option) - File Path : './result/networkInfo.json'

### 2. Sign Tx Offline - 2_SignTxOffline.ts
1. Add account for Tx
2. Get tx hash(rlp) in file - File Path : './result/1_result.txt'
3. Get network info in file (Option) - File Path : './result/networkInfo.json'
4. Sign tx which deploy contract
5. Write tx hash in file - File Path : './result/2_serialized_tx.txt'

### 3. Send Tx Online - 3_SendTxOnline.ts
1. Add account for Tx
2. Connect web3 network
3. Get tx's hash signed in file - File Path : './result/2_serialized_tx.txt'
4. Send signed tx which deploy contract
5. Get receipt of tx deployed
6. Write tx receipt finalized in file - File Path : './result/3_send_tx.txt'


## Deploy Upgradeable Contract Transaction
### 1. Create Tx which deploy V1 Contract Online - 1_CreateLogicV1TxOnline.ts
1. Add account for Tx
2. Connect web3 network
3. Create tx which deploy contract
4. Write hash of tx in .txt file - File Path : './result/1_result.txt'
5. Write network info in network json (Option) - File Path : './result/networkInfo.json'

### 2. Sign Tx which deploy V1 Contract Offline - 2_SignLogicV1TxOffline.ts
1. Add account for Tx
2. Get tx hash(rlp) in file - File Path : './result/1_result.txt'
3. Get network info in file (Option) - File Path : './result/networkInfo.json'
4. Sign tx which deploy contract
5. Write tx hash in file - File Path : './result/2_serialized_tx.txt'

### 3. Send Tx which deploy V1 Contract Online - 3_SendLogicV1TxOnline.ts
1. Add account for Tx
2. Connect web3 network
3. Get tx's hash signed in file - File Path : './result/2_serialized_tx.txt'
4. Send signed tx which deploy contract
5. Get receipt of tx deployed
6. Write tx receipt finalized in file - File Path : './result/3_V1_logic_contract_tx.json'

### 4. Create Tx which deploy Admin Proxy Contract Online - 4_CreateProxyAdminTxOnline.ts
Same with Step 1.
File Path : './result/networkInfo.json'
Result File Path : './result/4_result.txt'

### 5. Sign Tx which deploy Admin Proxy Contract Offline - 5_SignProxyAdminTxOffline.ts
Same with Step 2.
Result File Path : './result/5_serialized_tx.txt'

### 6. Send Tx which deploy Admin Proxy Contract Online - 6_SendProxyAdminTxOnline.ts
Same with Step 3.
Result File Path : './result/6_admin_proxy_contract_tx.json'

### 7. Create Tx which deploy Proxy Contract Online - 7_CreateProxyTxOnline.ts
1. Add account for Tx
2. Connect web3 network
3. Get addresses of V1, AdminProxy for parameters
4. Create tx which deploy contract with parameters
5. Write hash of tx in .txt file - File Path : './result/7_result.txt'
6. Write network info in network json (Option) - File Path : './result/networkInfo.json'

### 8. Sign Tx which deploy Admin Proxy Contract Offline - 8_SignProxyTxOffline.ts
Same with Step 2.
Result File Path : './result/8_serialized_tx.txt'

### 9. Send Tx which deploy Admin Proxy Contract Online - 9_SendProxyTxOnline.ts
Same with Step 3.
Result File Path : './result/9_proxy_contract_tx.json'

### 10. Call V1 Contract - 10_CallV1ContractOnline.ts
1. Add account for Tx
2. Connect web3 network
3. Create web3.eth.Contract using logicV1's abi, Proxy's contractAddress
4. Call initialize function for set value
5. Call getVal function for get value
6. Call sum function for get sum
7. Call multiply function for make error

### 11. Create Tx which deploy V2 Contract Online - 11_CreateLogicV2TxOnline.ts
Same with Step 1.
File Path : './result/networkInfo.json'
Result File Path : './result/11_result.txt'

### 12. Sign Tx which deploy V2 Contract Offline - 12_SignLogicV2TxOffline.ts
Same with Step 2.
Result File Path : './result/12_serialized_tx.txt'

### 13. Send Tx which deploy V2 Contract Online - 13_SendLogicV2TxOnline.ts
Same with Step 3.
Result File Path : './result/13_V2_logic_contract_tx.json'

### 14. Upgrade Contract to V2 - 14_UpgradeV2Contract.ts
1. Add account for Tx
2. Connect web3 network
3. Create web3.eth.Contract using adminProxy's abi, adminProxy's contractAddress, Proxy's contractAddress, V2's contractAddress
4. Call upgrade function for upgrade

### 15. Call V2 Contract - 15_CallV2ContractOnline.ts
1. Add account for Tx
2. Connect web3 network
3. Create web3.eth.Contract using logicV2's abi, Proxy's contractAddress
4. Call getVal function for get value
5. Call sum function for get sum
6. Call multiply function for get multiply