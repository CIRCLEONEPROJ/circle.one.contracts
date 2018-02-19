pragma solidity ^0.4.17;

import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract PurchaseDataset is Ownable {
    ERC20 public token;
    mapping (uint256 => bool) public accessControl;

    event Purchased(address indexed purchasedBy,
                    uint256 indexed accessTokenHash,
                    uint256 price);

    function PurchaseDataset(address _token) Ownable() public {
        token = ERC20(_token);
    }

    function purchase(uint256 _price, uint256 _accessTokenHash) public {
        require(!accessControl[_accessTokenHash]);
        accessControl[_accessTokenHash] = true;
        assert(token.transferFrom(msg.sender, owner, _price));
        Purchased(msg.sender, _accessTokenHash, _price);
    }
}