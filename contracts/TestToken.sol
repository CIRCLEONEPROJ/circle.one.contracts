pragma solidity ^0.4.17;
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract TestToken is StandardToken {
    uint256 public constant TOTAL_SUPPLY = 1000000000;

    function TestToken() public {
        totalSupply_ = TOTAL_SUPPLY;
        balances[msg.sender] = totalSupply_;
    }
}