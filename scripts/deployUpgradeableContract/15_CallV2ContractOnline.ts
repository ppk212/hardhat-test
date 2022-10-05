import jetpack from "fs-jetpack";
import Web3 from "web3";
import blockchain from "../blockchain";
import Log from "console-log-level";
import CalculatorV2 from "../../artifacts/contracts/CalculatorV2.sol/CalculatorV2.json";
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

        const value = await blockchain.callValue(web3, CalculatorV2.abi, ProxyContractTx.contractAddress);
    
        log.trace(`value : ${value}`);
    
        const sum = await blockchain.callAddFunction(web3, CalculatorV2.abi, ProxyContractTx.contractAddress, 7, 8);
        log.trace(`sum : ${sum}`);

        const multiply = await blockchain.callMultiplyFunction(web3, CalculatorV2.abi, ProxyContractTx.contractAddress, 7, 8);
        log.trace(`multiply : ${multiply}`);
    } catch(e: any) {
        log.error(`error : ${e.toString()}`);
    }
}

main();
