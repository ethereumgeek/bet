import Web3 from "web3";
import { SMB_ABI, SMB_ADDRESS, BET_ABI } from "../config";

export const SET_ADDRESS = "SET_ADDRESS";
export const SET_ERROR = "SET_ERROR";
export const CREATE_NEW_BET = "CREATE_NEW_BET";
export const NEW_SINGLE_BET = "NEW_SINGLE_BET";

let event;
let contractInstance;

export function initializeWeb3() {
  return async (dispatch, getState) => {
    setTimeout(() => {
      if (typeof window.web3 !== "undefined") {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        window.web3 = new Web3(
          new Web3.providers.HttpProvider("http://localhost:8545")
        );
      }
      startApp(dispatch, getState);
    }, 1000);
  };
}

const startApp = (dispatch, getState) => {
  getAccountInfo(dispatch);
  if (event) {
    stopWatchContractEvent();
  }
  startWatchContractEvent(dispatch, getState);
};

const getAccountInfo = dispatch => {
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
        dispatch({
          type: "GET_BALANCE",
          payload: balance
        });
      }
    });
  }
};

export const createNewBet = (
  person1,
  person2,
  arbiter,
  hashOfBet,
  person1Wager,
  person2Wager,
  arbitrationFee,
  arbiterBonus,
  arbitrationMaxBlocks,
  textOfBet
) => {
  return dispatch => {
    contractInstance = createContractInstance(JSON.parse(SMB_ABI), SMB_ADDRESS);

    // Ensure default account is set to sign the transaction
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0];

    let bytes = strToByteArray(textOfBet);
    let num = byteArrayToLong(bytes);
    contractInstance.createBet(
      person1,
      person2,
      arbiter,
      hashOfBet,
      person1Wager,
      person2Wager,
      arbitrationFee,
      arbiterBonus,
      arbitrationMaxBlocks,
      num,
      (error, result) => {
        if (!error) {
          console.log(result);
        } else {
          console.error(error);
          dispatch(setError(error));
        }
      }
    );
  };
};

export function setError(error) {
  return {
    type: "SET_ERROR",
    error
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

export const stopWatchContractEvent = () => {
  event.stopWatching();
};

export const startWatchContractEvent = (dispatch, getState) => {
  const { account } = getState();
  const abi_json = JSON.parse(SMB_ABI);
  contractInstance = createContractInstance(abi_json, SMB_ADDRESS);
  const indexedEventValues = [
    {
      _person1: account.address,
      _person2: account.address,
      _arbiter: account.address
    }
  ];
  const filterOptions = {
    fromBlock: 1066074,
    toBlock: "latest"
  };
  event = contractInstance.LogBetCreated(indexedEventValues, filterOptions);

  event.watch(function(error, result) {
    if (error) {
      console.error("Contract Event Error");
    } else {
      const betIndex = result.args.id;
      var value = contractInstance.getBet.call(
        betIndex,
        (error, betAddress) => {
          if (error) console.log(error);
          const object = result;
          object["betAddress"] = betAddress;
          return dispatch({
            type: NEW_SINGLE_BET,
            payload: object
          });
        }
      );
    }
  });
};

const createContractInstance = (contractAbi, contractAddress) => {
  const contract = window.web3.eth.contract(contractAbi);
  const contractInstance = contract.at(contractAddress);

  return contractInstance;
};

function strToByteArray(str) {
  let byteArray = [];
  for (let i = 0; i < str.length; i++) {
    byteArray.push(str.charCodeAt(i));
  }
  return byteArray;
}

function byteArrayToLong(byteArray) {
  let value = 0;
  for (let i = byteArray.length - 1; i >= 0; i--) {
    value = value * 256 + byteArray[i];
  }

  return value;
}

export const deposit = (betAddress, ether) => {
  const json_abi = JSON.parse(BET_ABI);
  const betContractInstance = createContractInstance(json_abi, betAddress);
  var transactionHash = betContractInstance.deposit.sendTransaction(
    ether,
    function(error, result) {
      console.log("recieve >>", error, result);
      if (error) {
        console.log(error);
      } else {
        return result;
      }
    }
  );
};
