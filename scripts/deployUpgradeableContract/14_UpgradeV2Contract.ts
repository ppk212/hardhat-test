import jetpack from "fs-jetpack";
import Web3 from "web3";
import blockchain from "../blockchain";
import Log from "console-log-level";
import AdminProxyContractTx from "./result/6_admin_proxy_contract_tx.json";
import AdminProxy from "../../artifacts/contracts/transparentProxy/transparent/ProxyAdmin.sol/ProxyAdmin.json";
import V2LogicContractTx from "./result/13_V2_logic_contract_tx.json";
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

        const result = await blockchain.upgradeContract(
            web3, 
            AdminProxy.abi, 
            AdminProxyContractTx.contractAddress, 
            ProxyContractTx.contractAddress, 
            V2LogicContractTx.contractAddress
        );
        log.trace(`upgrade result : ${result}`);

    } catch(e: any) {
        log.error(`error : ${e.toString()}`);
    }
}

main()
