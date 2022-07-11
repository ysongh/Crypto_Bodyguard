//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoBodyguard {
    uint public bodyGuardCount;
    mapping(uint => BodyGuard) public bodyGuardList;

    struct BodyGuard {
      uint id;
      string dataCid;
      string longitude;
      string latitude;
      bool isAvailable;
      address from;
    }

    event NewBodyGuard (
      uint id,
      string dataCid,
      address from
    );

    constructor() {
    }

    function newBodyGuard(string memory _dataCid) public {
        bodyGuardCount += 1;

        bodyGuardList[bodyGuardCount] = BodyGuard(bodyGuardCount, _dataCid, "", "", false, msg.sender);
        emit NewBodyGuard(bodyGuardCount, _dataCid, msg.sender);
    }

    function setIsAvailable(uint _id, string memory _longitude, string memory _latitude) public {
        BodyGuard storage _currentGuard = bodyGuardList[_id];
        _currentGuard.longitude = _longitude;
        _currentGuard.latitude = _latitude;
        _currentGuard.isAvailable = true;
    }

    function setIsNotAvailable(uint _id) public {
        BodyGuard storage _currentGuard = bodyGuardList[_id];
        _currentGuard.isAvailable = false;
    }
}
