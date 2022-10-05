// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract CalculatorV1 is Initializable {
   uint public val;
   function initialize(uint256 _val ) external initializer{
        val = _val;
    }
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
   function getVal() public view returns (uint) {
        return val;
    }
}