pragma solidity ^0.4.0;
contract SocialMediaBetting {
    
    Bet[] bets;
    mapping(address => uint[]) betsForAddress;

    function SocialMediaBetting() public {
    }

    function createBet(
        address _person1, 
        address _person2, 
        address _arbiter, 
        bytes32 _hashOfBet,
        uint _person1Owes,
        uint _person2Owes,
        uint _arbitrationFee,
        uint _arbiterBonus,
        uint _arbitrationMaxBlocks,
        byte[] _textOfBet) public returns (uint) {
        Bet bet = new Bet(
            _person1, 
            _person2, 
            _arbiter, 
            _hashOfBet,
            _person1Owes,
            _person2Owes,
            _arbitrationFee,
            _arbiterBonus,
            _arbitrationMaxBlocks,
            _textOfBet);
        
        uint betIndex = bets.push(bet) - 1;
        
        betsForAddress[_person1].push(betIndex);
        betsForAddress[_person2].push(betIndex);
        betsForAddress[_arbiter].push(betIndex);
        
        return betIndex;
    }
    
    function getBet(uint _betIndex) public view returns (Bet) {
        require(_betIndex < bets.length);
        return bets[_betIndex];
    }
    
    function getBetsForAddress(address _addr) public view returns (uint[]) {
        return betsForAddress[_addr];
    }
}


contract Bet {

    event LogBetCreated(
        address indexed _person1, 
        address indexed _person2, 
        address indexed _arbiter, 
        bytes32 _hashOfBet,
        uint _person1Owes,
        uint _person2Owes,
        uint _arbitrationFee,
        uint _arbiterBonus,
        uint _arbitrationMaxBlocks,
        byte[] _textOfBet);

    enum ResolutionStatus { None, Person1Wins, Person2Wins, Tie }

    ResolutionStatus person1Resolution;
    ResolutionStatus person2Resolution;
    ResolutionStatus arbiterResolution;
    ResolutionStatus resolution;
    
    address person1;
    address person2;
    address arbiter;
    bytes32 hashOfBet;
    uint person1Owes;
    uint person2Owes;
    uint person1Paid;
    uint person2Paid;
    uint arbitrationFee;
    uint arbiterBonus;
    uint arbitrationMaxBlocks;
    uint arbitrationStartBlock;
    bool signedByArbiter;
    bool arbitrationAllowed;
    bool arbitrationOccured;
    bool betClosed;

    function sub(uint a, uint b) internal pure returns (uint) {
        assert(b <= a);
        return a - b;
    }
    
    function add(uint a, uint b) internal pure returns (uint) {
        uint c = a + b;
        assert(c >= a);
        return c;
    }
  
    function Bet(
        address _person1, 
        address _person2, 
        address _arbiter, 
        bytes32 _hashOfBet,
        uint _person1Owes,
        uint _person2Owes,
        uint _arbitrationFee,
        uint _arbiterBonus,
        uint _arbitrationMaxBlocks,
        byte[] _textOfBet
        ) public {
            require (_arbiterBonus < add(_person1Owes, _person2Owes));
            require (add(_arbitrationFee, add(_arbiterBonus,1)/2) < _person1Owes);
            require (add(_arbitrationFee, add(_arbiterBonus,1)/2) < _person2Owes);
            
            person1 = _person1;
            person2 = _person2;
            arbiter = _arbiter;
            hashOfBet = _hashOfBet;
            person1Owes = _person1Owes;
            person2Owes = _person2Owes;
            arbitrationFee = _arbitrationFee;
            arbiterBonus = _arbiterBonus;
            arbitrationMaxBlocks = _arbitrationMaxBlocks;
            
            LogBetCreated(
                 _person1, 
                 _person2, 
                 _arbiter, 
                 _hashOfBet,
                 _person1Owes,
                 _person2Owes,
                 _arbitrationFee,
                 _arbiterBonus,
                 _arbitrationMaxBlocks,
                 _textOfBet);
    }

    function deposit() public payable {
        require(msg.sender == person1 || msg.sender == person2);
        require (!betClosed);
        
        uint refund;
        if (msg.sender == person1) {
            add(person1Paid, msg.value);
            
            if(person1Paid > person1Owes) {
                refund = sub(person1Paid, person1Owes);
                person1Paid = person1Owes;
                person1.transfer(refund);
            }
        }
        else if (msg.sender == person2) {
            add(person2Paid, msg.value);
            
            if(person2Paid > person2Owes) {
                refund = sub(person2Paid, person2Owes);
                person2Paid = person2Owes;
                person2.transfer(refund);
            }
        }
    }
    
    function withdrawAll() public {
        require(msg.sender == person1 || msg.sender == person2);
        
        if(resolution != ResolutionStatus.None) {
            betClosed = true;
            if(resolution == ResolutionStatus.Person1Wins) {
                if(!arbitrationOccured) {
                    person2.transfer(arbitrationFee/2);
                }
                person1.transfer(this.balance);
            }
            else if(resolution == ResolutionStatus.Person2Wins) {
                
                if(!arbitrationOccured) {
                    person1.transfer(arbitrationFee/2);
                }
                person2.transfer(this.balance);
            }
            else if(resolution == ResolutionStatus.Tie) {
                if(arbitrationOccured) {
                    person1.transfer(sub(person1Paid, add(arbitrationFee,arbiterBonus)/2));
                }
                else {
                    person1.transfer(sub(person1Paid, arbiterBonus/2));
                }
                person2.transfer(this.balance);
            }
        }
        else if(signedByArbiter == false || (arbitrationAllowed && block.number >= add(arbitrationStartBlock, arbitrationMaxBlocks))) {
            person1.transfer(person1Paid);
            person2.transfer(person2Paid);
        }
    }
    
    function arbiterSign() public {
        require (msg.sender == arbiter);
        require (!signedByArbiter);
        require (person1Paid == person1Owes);
        require (person2Paid == person2Owes);
        require (!betClosed);
        
        signedByArbiter = true;
        arbiter.transfer(arbiterBonus);
    }
    
    function startArbitration() public {
        require (msg.sender == person1 || msg.sender == person2);
        require (!arbitrationAllowed);
        require (!betClosed);
        
        arbitrationAllowed = true;
        arbitrationStartBlock = block.number;
    }
    
    function resolve(ResolutionStatus _resolution) public {
        require (msg.sender == person1 || msg.sender == person2 || msg.sender == arbiter);
        require (resolution == ResolutionStatus.None);
        require (!betClosed);
        
        if (msg.sender == person1) {
            person1Resolution = _resolution;
        }
        else if (msg.sender == person2) {
            person2Resolution = _resolution;
        }
        else if (msg.sender == arbiter) {
            arbiterResolution = _resolution;
        }
        
        if(person1Resolution == person2Resolution && person1Resolution != ResolutionStatus.None) {
            resolution = person1Resolution;
        }
        else if(arbitrationAllowed 
            && (person1Resolution == arbiterResolution || person2Resolution == arbiterResolution) 
            && arbiterResolution != ResolutionStatus.None) {
                
            resolution = arbiterResolution;
            arbitrationOccured = true;
            arbiter.transfer(arbitrationFee);
        }
    }
}