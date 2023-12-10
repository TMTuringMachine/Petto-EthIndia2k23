// const hre = require('hardhat');
// deployed on: 0x27D3062A4Bff74Cf867d609b2f81C56934Cc53dc
const Main = async () => {
  const TransactionContract = await ethers.getContractFactory(
    'TransactionContract'
  );
  const transactionContract = await TransactionContract.deploy();
  await transactionContract.deployed();
  console.log('deployed to', transactionContract.address);
};
const runMain = async () => {
  try {
    await Main();
    process.exit(0);
  } catch (error) {
    console.log('Some error occurred');
    console.log(error);
    process.exit(1);
  }
};
runMain();
