pragma solidity ^0.4.16;

/// @title credit exchange platform
contract CreditExchange {
    struct Case {
        bool isSuccessful;
        uint amount;
    }

    struct Person {
        uint numCases;
        uint numSuccessfulCases;
        mapping (uint => Case) cases;
    }

    mapping (string => Person) checkProviders;
    mapping (string => Person) moneyProviders;

    //新增信用記錄
    function addCase(string idCardNumber, string kind, bool isSuccessful, uint amount) public {
        Person storage person;
        
        if (keccak256(kind) == keccak256("checkProviders")) {
            //如果這個person是新創的、以前沒有紀錄，還是可以取用的到，只是person的各欄位皆為預設值
            person = checkProviders[idCardNumber];
            if (isSuccessful == true)
                person.numSuccessfulCases++;
            person.cases[person.numCases++] = Case({isSuccessful: isSuccessful, amount: amount});
        } else if (keccak256(kind) == keccak256("moneyProviders")) {
            person = moneyProviders[idCardNumber];
            if (isSuccessful == true)
                person.numSuccessfulCases++;
            person.cases[person.numCases++] = Case({isSuccessful: isSuccessful, amount: amount});
        } 
    }

    //查看信用記錄
    function getPerson(string idCardNumber, string kind) public view returns (uint, uint, bool[], uint[]) {
        Person storage person;
        bool[] memory isSuccessful;
        uint[] memory amount;
        
        if (keccak256(kind) == keccak256("checkProviders")) {
            person = checkProviders[idCardNumber];
            isSuccessful = new bool[](person.numCases);
            amount = new uint[](person.numCases);
            for (uint i = 0; i < person.numCases; i++) {
                isSuccessful[i] = person.cases[i].isSuccessful;
                amount[i] = person.cases[i].amount;
            }
            return (person.numCases, person.numSuccessfulCases, isSuccessful, amount);
        } else if (keccak256(kind) == keccak256("moneyProviders")) {
            person = moneyProviders[idCardNumber];
            isSuccessful = new bool[](person.numCases);
            amount = new uint[](person.numCases);
            for (uint j = 0; j < person.numCases; j++) {
                isSuccessful[j] = person.cases[j].isSuccessful;
                amount[j] = person.cases[j].amount;
            }
            return (person.numCases, person.numSuccessfulCases, isSuccessful, amount);
        } 
    }
}