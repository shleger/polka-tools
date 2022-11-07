import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import metadata from './metadata.json' assert { type: "json" };;
import Keyring from '@polkadot/keyring';
import { stringToU8a, u8aToHex } from '@polkadot/util';


// Start function
const start = async function () {
    const wsProvider = new WsProvider('ws://127.0.0.1:9955');
    const api = await ApiPromise.create({ provider: wsProvider });
    console.log(api.genesisHash.toHex());


    // The actual address that we will use:  Bob
    const ADDR = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
    const CONTRACT_ADDR = '5EhwAwt5YhsAZ1xmA1eg1h5X4T9rXwtqFivx3qQhavZngobs'



    console.log("Begin============================================================");


    // The address is the actual on-chain address as ss58 or AccountId object.
    const contract = new ContractPromise(api, metadata, CONTRACT_ADDR);

    const callValue1 = await contract.query.getOwnerId(ADDR, { gasLimit: -1 });
    // console.log("OwnerId: " + JSON.stringify(callValue1));
    console.log("OwnerId:\t" + callValue1.output);

    const callValue2 = await contract.query.getContractId(ADDR, { gasLimit: -1 });
    console.log("ContractId:\t" + callValue2.output);

    const callValue3 = await contract.query.getPower(ADDR, { gasLimit: -1 });
    console.log("Power:\t\t" + callValue3.output);


    // https://polkadot.js.org/docs/api/start/keyring/
    // This type parameter only applies to the default type of account created when no type is specified,
    // it does not mean that the keyring can only store that type of account.
    const keyring = new Keyring({ type: 'sr25519' });
    const bobPair = keyring.addFromUri('//Bob');

    const gasLimit = 74999922688;
    const storageDepositLimit = null;
    const callStore1  =  await contract.tx.storeGeneration( {storageDepositLimit, gasLimit }, 120, 11220)
	.signAndSend(bobPair, result => {
	    if (result.status.isInBlock) {
		console.log('Stored:\t\t in a block');
	    } else if (result.status.isFinalized) {
		console.log('Stored:\t\t finalized');
	    }
	});


    // wait 300 ms
    await new Promise((resolve, reject) => setTimeout(resolve, 500));
    const callValue4 = await contract.query.getPower(ADDR, { gasLimit: -1 });
    console.log("Power:\t\t" + callValue4.output);
    console.log("End==============================================================");

    console.log("Disconnetring...");
    wsProvider.disconnect();


}

// Call start
start();
