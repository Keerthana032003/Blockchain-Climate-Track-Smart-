// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ZoneName {
    string public zoneName;

    constructor(string memory _initialName) {
        zoneName = _initialName;
    }

    function setZoneName(string memory _newName) public {
        zoneName = _newName;
    }

    function getZoneName() public view returns (string memory) {
        return zoneName;
    }
}