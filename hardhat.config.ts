import "dotenv/config";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-web3";
import "@openzeppelin/hardhat-upgrades";

// task action function receives the Hardhat Runtime Environment as second argument
task("accounts", "Prints accounts", async (_, { web3 }) => {
  console.log(await web3.eth.getAccounts());  
});

task("isConnect", "Prints web3 connect status", async (_, { web3 }) => {
  // console.log(web3.currentProvider);
  console.log(await web3.eth.getBalance('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'));
});


// task("balance", "Prints an account's balance")
//   .addParam("account", "The account's address")
//   .setAction(async (taskArgs) => {
//     const balance = await ethers.provider.getBalance(taskArgs.account);

//     console.log(ethers.utils.formatEther(balance), "ETH");
//   });

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.ADMIN!],
      chainId: 4,
      
      // verify: {
      //   etherscan: {
      //     apiKey: process.env.ETHERSCAN_API_KEY,
      //   },
      // },
    },
  }
};

export default config;
