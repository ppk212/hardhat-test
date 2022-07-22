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
    // 2. Connect web3 network
    blockchain.connectGanache(web3);

    // 3. Get tx's hash signed in file
    const raw = readFile();
    log.trace('Read File - raw : ', raw);

    // 4. Send signed tx which deploy contract
    blockchain.sendSignedTx(web3, raw).then(txHash => {        
        log.trace('Deploy tx - tx hash : ', txHash);

        // 5. Get receipt of tx deployed
        blockchain.getTransactionReceipt(web3, txHash).then(txObejct => {
            log.trace('Receipt of tx deployed : ', txObejct);

            // 6. Write tx receipt finalized in file
            writeFile(txObejct);
            log.trace('Write File - tx receipt');
        });
    });
}

function readFile() {
    const path = './scripts/deployContract/result/2_serialized_tx.txt';

    const data = jetpack.read(path);
    return data;
}

function writeFile(hash: string) {
    const path = './scripts/deployContract/result/3_send_tx.txt';
    jetpack.write(path, hash);
}

main()
