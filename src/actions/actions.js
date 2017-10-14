
const CREATE_NEW_BET = 'CREATE_NEW_BET';


export const createNewBet = (to, arbiter, ether) => {
  return async(dispatch) => {
    // Web3 sendTransactions
    const result;
    dispatch({
      type: CREATE_NEW_BET,
      payload: result;
    })

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

export function init() {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }

  let address = web3.eth.defaultAddress;
  if (address === undefined) {
    return setError('Please unlock MetaMask and reload the page.')
  } else {
    return setAddress(address)
  }
}
