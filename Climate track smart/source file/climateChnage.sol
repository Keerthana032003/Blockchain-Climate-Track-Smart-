pragma solidity ^0.8.0;

contract climateChange{
    struct ClimateData {
        uint timestamp;
        string details;
    }

    mapping(address => ClimateData) public climateRecords;

    function addClimateData(string memory details) public {
        ClimateData memory newData = ClimateData(block.timestamp, details);
        climateRecords[msg.sender] = newData;
    }

    function getClimateData() public view returns (ClimateData memory) {
        return climateRecords[msg.sender];
    }

    function updateClimateData(string memory details) public {
        climateRecords[msg.sender].details = details;
    }

    // These are very basic functions written to carry out the operation
    
}