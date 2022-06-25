const CryptoBodyguard = artifacts.require("CryptoBodyguard");

module.exports = async function(deployer){
    await deployer.deploy(CryptoBodyguard);
};