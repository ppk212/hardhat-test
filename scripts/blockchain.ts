import { Transaction } from "ethereumjs-tx";
import Common from "ethereumjs-common";
import Web3 from "web3";
import Log from "console-log-level";
import { ethers } from "hardhat";

const log = Log({
    prefix: function(level) {
        return `[${level}]`
    },
    level: 'trace'
});

const blockchain = {
    addAccount: function(web3: any) {
        web3.eth.accounts.wallet.add("0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0");
        web3.eth.accounts.wallet.add("0x56f1e266fa8d80b1ba2cef87ba284dee97a7819f9cae47d4d4a2c9e9b3782828");
    },
    getNonce: async function(web3: any, account: any) {
        return await web3.eth.getTransactionCount(account.address);
    },
    createTxForDeployContract: async function(web3: any, bytecode: string) {
        log.trace('bytecode : ', bytecode);
        const sender = web3.eth.accounts.wallet[0];
        
        const txCount = await web3.eth.getTransactionCount(sender.address);
        log.trace('1. Nonce : ', txCount);
        
        // Create tx for deploying contract
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            gasLimit: web3.utils.toHex(1000000),
            input: bytecode,
            value: '0x00'
        };

        log.trace('2. txObject : ', txObject);

        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.getChainId();
        
        const customCommon = Common.forCustomChain(
            'mainnet',
            {
                name: 'my-private-blockchain',
                networkId: networkId,
                chainId: chainId,
            },
            'istanbul',
        );
        
        const tx = new Transaction(txObject, { common:customCommon });
        const hash = '0x' + tx.serialize().toString('hex');
        
        return hash;
    },
    createTxForTransferEth: async function(web3: any) {
        const sender = web3.eth.accounts.wallet[0];
        const receiver = web3.eth.accounts.wallet[1];
        
        const txCount = await web3.eth.getTransactionCount(sender.address);
        log.trace('1. Nonce : ', txCount);
        
        // Create tx for sending 1 ETH to account[1]
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
            to: receiver.address,
            value: web3.utils.toHex(web3.utils.toWei('1', "ether"))
        };

        log.trace('2. txObject : ', txObject);

        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.getChainId();
        
        const customCommon = Common.forCustomChain(
            'mainnet',
            {
                name: 'my-private-blockchain',
                networkId: networkId,
                chainId: chainId,
            },
            'istanbul',
        );
        
        const tx = new Transaction(txObject, { common:customCommon });
        const hash = '0x' + tx.serialize().toString('hex');
        
        return hash;
    },
    getNetworkInfo: async function(web3: any) {
        return {
            networkId : await web3.eth.net.getId(),
            chainId : await web3.eth.getChainId()
        };
    },
    connectGanache: function(web3: any) {
        web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    },
    disConnectGanache: function(web3: any) {
        web3 = new Web3();
    },
    getBalance: async function(web3: any, account: any) {
        return web3.eth.getBalance(account.address);
    },
    signTx: function(web3: any, hash: any, networkInfo: any) {
        const customCommon = Common.forCustomChain(
            'mainnet',
            {
                name: 'my-private-blockchain',
                networkId: networkInfo.networkId,
                chainId: networkInfo.chainId,
            },
            'istanbul',
        );

        log.trace('0. before decode, hash : ', hash);
        const decodedTx = ethers.utils.RLP.decode(hash);
        log.trace('0. before decode, decodedTx : ', decodedTx);

        const txObject = {
            nonce: decodedTx[0],
            gasPrice: decodedTx[1],
            gasLimit: decodedTx[2],
            to: decodedTx[3],
            value: decodedTx[4],
            input: decodedTx[5]
        }
        
        log.trace('1. decoded txObject : ', txObject);

        const tx = new Transaction(txObject, { common:customCommon });

        const privateKeyStr = web3.eth.accounts.wallet[0].privateKey;
        log.trace('2. private key : ', privateKeyStr);

        const privateKey = Buffer.from(
            privateKeyStr.substring(2),
            'hex'
        );
    
        tx.sign(privateKey);
    
        const serializedTx = tx.serialize();
    
        return '0x' + serializedTx.toString("hex");
    },
    sendSignedTx: async function(web3: any, raw: any) {
        const txResult = await web3.eth.sendSignedTransaction(raw);
    
        return txResult.transactionHash;
    },
    getTransactionReceipt: async function(web3: any, txHash: string) {
        return await web3.eth.getTransactionReceipt(txHash);
    },
    
}

export default blockchain;