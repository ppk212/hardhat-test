import jetpack from "fs-jetpack";
import Web3 from "web3";
import blockchain from "../blockchain";
import Log from "console-log-level";

const log = Log({
    prefix: function(level) {
        return `[${level}]`
    },
    level: 'trace'
});


function main() {
    const web3 = new Web3();

    // 1. Add account for Tx
    blockchain.addAccount(web3);

    // 2. Get tx hash(rlp) in file
    const txHash = readFile();
    log.trace('Read File - txHash : ', txHash);

    // 3. Get network info in file (Option)
    const networkInfo = getNetworkInfoInFile();

    // 4. Sign tx which deploy contract
    const hash = blockchain.signTx(web3, txHash, networkInfo)
    log.trace('Final signed tx - hash : ', txHash);

    // 5. Write tx hash in file
    writeFile(hash);
    log.trace('Write File - hash : ', hash);
}

function readFile() {
    const path = './scripts/deployContract/result/1_result.txt';
    const data = jetpack.read(path);

    return data;
}

function getNetworkInfoInFile() {
    const path = './scripts/deployContract/result/networkInfo.json';
    const data = jetpack.read(path, "json");

    return data;
}

function writeFile(hash: string) {
    const path = './scripts/deployContract/result/2_serialized_tx.txt';
    jetpack.write(path, hash);
}

main()
