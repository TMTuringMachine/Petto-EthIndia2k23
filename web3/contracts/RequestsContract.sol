// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RequestsContract {
    struct PetRequest {
        address sender_;
        address receiver_;
        uint256 numberOfDays;
        uint256 cost;
        uint256 expirationTimestamp;
        bool isConfirmed;
    }

    mapping(uint256 => PetRequest) public requests;
    uint256 public nextRequestId;

    event RequestInitiated(uint256 requestId, address sender_, address receiver_, uint256 numberOfDays, uint256 cost);
    event ConfirmationWithDetails(uint256 requestId, uint256 numberOfDays, uint256 cost);


    modifier requestNotExpired(uint256 _requestId) {
        require(block.timestamp <= requests[_requestId].expirationTimestamp, "Request has expired");
        _;
    }

    function initiateRequest(address _host, uint256 _numberOfDays, uint256 _cost, bool confirmAns) external {
        uint256 requestId = nextRequestId;
        uint256 expirationTimestamp = block.timestamp + (_numberOfDays * 1 days);

        requests[requestId] = PetRequest({
            sender_: msg.sender,
            receiver_: _host,
            numberOfDays: _numberOfDays,
            cost: _cost,
            expirationTimestamp: expirationTimestamp,
            isConfirmed: confirmAns
        });

        emit RequestInitiated(requestId, msg.sender, _host, _numberOfDays, _cost);

        nextRequestId++;
    }

}
