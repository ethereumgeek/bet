import Web3 from "web3";
import { SMB_ABI, SMB_ADDRESS } from '../config'

export const CREATE_NEW_BET = "CREATE_NEW_BET";

export function initializeWeb3() {
  return async dispatch => {
    setTimeout(() => {
      if (typeof window.web3 !== "undefined") {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        window.web3 = new Web3(
          new Web3.providers.HttpProvider("http://localhost:8545")
        );
      }
      startApp(dispatch);
    }, 1000);
  };
}

const startApp = dispatch => {
  getAccountInfo(dispatch);
  getCurrentBets(dispatch);
};

const getAccountInfo = (dispatch) => {
  let address = window.web3.eth.accounts[0];
  if (address === undefined) {
    dispatch(setError("Please unlock MetaMask and reload the page."));
  } else {
    dispatch({
      type: "GET_ADDRESS",
      payload: address
    });
    let balance;
    window.web3.eth.getBalance(address, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        balance = window.web3.fromWei(result, "ether").toFixed(4);
        console.log(balance);
        dispatch({
          type: "GET_BALANCE",
          payload: balance
        });
      }
    });
  }
}

export const createNewBet = (person1, person2, arbiter, hashOfBet, person1Wager, person2Wager, arbitrationFee, arbiterBonus, arbitrationMaxBlocks) => {
  return dispatch => {
    const contract = createContractInstance(SMB_ABI, SMB_ADDRESS)

    // Ensure default account is set to sign the transaction
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
    
    contract.createBet(person1, person2, arbiter, hashOfBet, person1Wager, person2Wager, arbitrationFee, arbiterBonus, arbitrationMaxBlocks, (error, result) => {
      if(!error) {
        console.log(result)
        dispatch({
          type: CREATE_NEW_BET,
          payload: result
        });
      } else {
        console.error(error);
        dispatch(setError(error))
      }
    })
  }
};

export function setError(error) {
  return {
    type: "SET_ERROR",
    error
  };
}

export function getCurrentBets(address) {
  return async dispatch => {
    // get contract stuff
    let bets = [
      { better: "0x12345", arbiter: "0xfffffff", value: "123" },
      { better: "0xac5e3", arbiter: "0x009c123", value: "623" },
      { better: "0x84c8a", arbiter: "0x6cd35da", value: "733" }
    ];
    dispatch(setBets(bets));
  };
}

export function setBets(bets) {
  return {
    type: "SET_BETS",
    bets
  };
}


const getBalance = address => {
  window.web3.eth.getBalance(address, window.web3.eth.defaultBlock, function(
    error,
    result
  ) {
    var balance = window.web3.fromWei(result, "ether").toFixed(2);
    return {
      type: "GET_BALANCE",
      payload: balance
    };
  });
};


export const startWatchContractEvent = () => {
  var contractEvent = createContractEventInstance();
    contractEvent.watch(function(error, result){
    if (!error){
      console.log(result);
    } else {
      //TODO
    }
  });
}

function createContractEventInstance(){
    var contractAddress = '0x12345'

    var contractInstance = createContractInstance(contractAddress);
    var indexedEventValues = ''
    // indexedEventValues = JSON.parse(indexedEventValues)
    // filterOptions = JSON.parse(filterOptions);

    // return contractInstance.SomeEvent(indexedEventValues, filterOptions);
}

const createContractInstance = (contractAbi, contractAddress) => {
  const contract = window.web3.eth.contract(contractAbi)
  const contractInstance = contract.at(contractAddress);

  return contractInstance;
}
