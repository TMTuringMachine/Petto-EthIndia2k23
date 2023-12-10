// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract TransactionContract {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function performTransaction(address payable receiver, uint amount, string memory message, string memory keyword) public payable {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, msg.value, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, msg.value, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}