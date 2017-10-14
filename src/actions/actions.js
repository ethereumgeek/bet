import Web3 from 'web3';

export const CREATE_NEW_BET = 'CREATE_NEW_BET';


export const createNewBet = (to, arbiter, ether) => {
  return async(dispatch) => {
    // Web3 sendTransactions
    let result;
    dispatch({
      type: CREATE_NEW_BET,
      payload: result,
    })
  }
}

export function setAddress(address) {
  return {
    type: 'SET_ADDRESS',
    address,
  }
}

export function setError(error) {
  return {
    type: 'SET_ERROR',
    error,
  }
}

export function setBets(bets) {
  return {
    type: 'SET_BETS',
    bets,
  }
}

export function fetchAddress() {
  return async dispatch => {
    setTimeout(() => {
      if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      }

      let address = window.web3.eth.accounts[0];
      if (address === undefined) {
        console.log('called')
        dispatch(setError('Please unlock MetaMask and reload the page.'))
      } else {
        dispatch(setAddress(address))
      }
    }, 1000)
  }

}


export function fetchBets(address) {
  return async dispatch => {
    // get contract stuff
    let bets = [
      {better: '0x12345', arbiter: '0xfffffff', value: '123'},
      {better: '0xac5e3', arbiter: '0x009c123', value: '623'},
      {better: '0x84c8a', arbiter: '0x6cd35da', value: '733'}
    ];
    dispatch(setBets(bets))
  }
}

const getBalance = address => {
  window.web3.eth.getBalance(address,window.web3.eth.defaultBlock,function(error,result){
     var balance = window.web3.fromWei(result,'ether').toFixed(2);
     return {
       type: 'GET_BALANCE',
       payload: balance,
     }
 });
}
