import jetpack from "fs-jetpack";
import Web3 from "web3";
import blockchain from "../blockchain";
import Log from "console-log-level";
import CalculatorV1 from "../../artifacts/contracts/CalculatorV1.sol/CalculatorV1.json";
import ProxyContractTx from "./result/9_proxy_contract_tx.json";

const log = Log({
    prefix: function(level) {
        return `[${level}]`
    },
    level: 'trace'
});

async function main() {
    const web3 = new Web3();
    
    try {
        // 1. Add account for Tx
        blockchain.addAccount(web3);
        // 2. Connect web3 network
        blockchain.connectGanache(web3);
        
        const newValue = 15;

        log.trace(`newValue : ${newValue}`);
        await blockchain.initialize(web3, CalculatorV1.abi, ProxyContractTx.contractAddress, newValue);
        log.trace(`initialize success`);

        const value = await blockchain.callValue(web3, CalculatorV1.abi, ProxyContractTx.contractAddress);
    
        log.trace(`value : ${value}`);
    
        const sum = await blockchain.callAddFunction(web3, CalculatorV1.abi, ProxyContractTx.contractAddress, 1, 2);
        log.trace(`sum : ${sum}`);

        const multiply = await blockchain.callMultiplyFunction(web3, CalculatorV1.abi, ProxyContractTx.contractAddress, 1, 2);
        log.trace(`multiply : ${multiply}`);
    } catch(e: any) {
        log.error(`error : ${e.toString()}`);
    }
}

main();
