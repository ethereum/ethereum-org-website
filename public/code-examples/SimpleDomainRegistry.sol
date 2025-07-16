// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// This is a smart contract - a program that can be deployed to the Ethereum blockchain.
contract SimpleDomainRegistry {

    address public owner;
    // Hypothetical cost to register a domain name
    uint constant public DOMAIN_NAME_COST = 1 ether;

    // A `mapping` is essentially a hash table data structure.
    // This `mapping` assigns an address (the domain holder) to a string (the domain name).
    mapping (string => address) public domainNames;


	// When 'SimpleDomainRegistry' contract is deployed,
	// set the deploying address as the owner of the contract.
    constructor() {
        owner = msg.sender;
    }

    // Registers a domain name (if not already registered)
    function register(string memory domainName) public payable {
        require(msg.value >= DOMAIN_NAME_COST, "Insufficient amount.");
        require(domainNames[domainName] == address(0), "Domain name already registered.");
        domainNames[domainName] = msg.sender;
    }

    // Transfers a domain name to another address
    function transfer(address receiver, string memory domainName) public {
        require(domainNames[domainName] == msg.sender, "Only the domain name owner can transfer.");
        domainNames[domainName] = receiver;
    }

    // Withdraw funds from contract
    function withdraw() public {
        require(msg.sender == owner, "Only the contract owner can withdraw.");
        payable(msg.sender).transfer(address(this).balance);
    }
}
