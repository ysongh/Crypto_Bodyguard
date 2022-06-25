//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoBodyguard {
    uint public bodyGuardCount;
    mapping(uint => BodyGuard) public bodyGuardList;

    struct BodyGuard {
      uint id;
      string city;
      address from;
    }

    event NewBodyGuard (
      uint id,
      string city,
      address from
    );

    constructor() {
    }

    function newBodyGuard(string memory _city) public {
        bodyGuardCount += 1;

        bodyGuardList[bodyGuardCount] = BodyGuard(bodyGuardCount, _city, msg.sender);
        emit NewBodyGuard(bodyGuardCount, _city, msg.sender);
    }
}
