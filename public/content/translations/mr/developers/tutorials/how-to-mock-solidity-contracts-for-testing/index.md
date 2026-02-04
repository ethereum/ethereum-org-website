---
title: "चाचणीसाठी Solidity स्मार्ट कॉन्ट्रॅक्ट्सना मॉक कसे करावे"
description: "चाचणी करताना तुम्ही तुमच्या कॉन्ट्रॅक्ट्सची गंमत का करावी"
author: Markus Waas
lang: mr
tags:
  [
    "सॉलिडिटी",
    "स्मार्ट कॉन्ट्रॅक्ट",
    "चाचणी",
    "मॉक करणे"
  ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[मॉक ऑब्जेक्ट्स](https://wikipedia.org/wiki/Mock_object) हे ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंगमधील एक सामान्य डिझाइन पॅटर्न आहे. जुन्या फ्रेंच शब्द 'mocquer' ज्याचा अर्थ 'गमतीचा विषय बनवणे' आहे, त्यापासून विकसित होऊन त्याचा अर्थ 'खऱ्या गोष्टीची नक्कल करणे' असा झाला, जे आपण प्रोग्रामिंगमध्ये प्रत्यक्षात करत आहोत. तुम्हाला हवे असल्यास कृपया तुमच्या स्मार्ट कॉन्ट्रॅक्ट्सची गंमत करा, परंतु जेव्हा शक्य असेल तेव्हा त्यांना मॉक करा. हे तुमचे जीवन सोपे करते.

## मॉकसह कॉन्ट्रॅक्ट्सची युनिट-चाचणी {#unit-testing-contracts-with-mocks}

कॉन्ट्रॅक्ट मॉक करणे म्हणजे मूलतः त्या कॉन्ट्रॅक्टची दुसरी आवृत्ती तयार करणे जी मूळ आवृत्तीसारखीच वागते, परंतु अशा प्रकारे की डेव्हलपरद्वारे ती सहजपणे नियंत्रित केली जाऊ शकते. तुमच्याकडे अनेकदा गुंतागुंतीचे कॉन्ट्रॅक्ट्स असतात जिथे तुम्हाला फक्त [कॉन्ट्रॅक्टच्या छोट्या भागांची युनिट-चाचणी](/developers/docs/smart-contracts/testing/) करायची असते. समस्या ही आहे की, जर या छोट्या भागाची चाचणी करण्यासाठी एका विशिष्ट कॉन्ट्रॅक्ट स्थितीची आवश्यकता असेल ज्यात पोहोचणे कठीण आहे, तर काय?

तुम्ही प्रत्येक वेळी गुंतागुंतीचे चाचणी सेटअप लॉजिक लिहू शकता जे कॉन्ट्रॅक्टला आवश्यक स्थितीत आणेल किंवा तुम्ही मॉक लिहू शकता. इनहेरिटन्ससह कॉन्ट्रॅक्ट मॉक करणे सोपे आहे. फक्त एक दुसरा मॉक कॉन्ट्रॅक्ट तयार करा जो मूळ कॉन्ट्रॅक्टमधून इनहेरिट करतो. आता तुम्ही तुमच्या मॉकसाठी फंक्शन्स ओव्हरराइड करू शकता. चला एका उदाहरणासह पाहूया.

## उदाहरण: प्रायव्हेट ERC20 {#example-private-erc20}

आपण एका उदाहरणादाखल ERC-20 कॉन्ट्रॅक्टचा वापर करतो ज्यामध्ये सुरुवातीला एक खाजगी वेळ असतो. मालक खाजगी वापरकर्त्यांना व्यवस्थापित करू शकतो आणि सुरुवातीला फक्त त्यांनाच टोकन मिळवण्याची परवानगी असेल. एकदा ठराविक वेळ निघून गेल्यावर, प्रत्येकाला टोकन वापरण्याची परवानगी दिली जाईल. तुम्हाला उत्सुकता असल्यास, आम्ही नवीन OpenZeppelin contracts v3 मधून [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) हुक वापरत आहोत.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

आणि आता आपण ते मॉक करूया.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

तुम्हाला खालीलपैकी एक त्रुटी संदेश मिळेल:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

आपण नवीन Solidity आवृत्ती 0.6 वापरत असल्यामुळे, ओव्हरराइड केल्या जाऊ शकणार्‍या फंक्शन्ससाठी `virtual` कीवर्ड आणि ओव्हरराइडिंग फंक्शनसाठी `override` कीवर्ड जोडावा लागेल. तर चला, हे दोन्ही `isPublic` फंक्शन्समध्ये जोडूया.

आता तुमच्या युनिट चाचण्यांमध्ये, तुम्ही त्याऐवजी `PrivateERC20Mock` वापरू शकता. जेव्हा तुम्हाला खाजगी वापराच्या वेळेतील वर्तनाची चाचणी करायची असेल, तेव्हा `setIsPublic(false)` वापरा आणि त्याचप्रमाणे सार्वजनिक वापराच्या वेळेची चाचणी करण्यासाठी `setIsPublic(true)` वापरा. अर्थातच आपल्या उदाहरणात, आपण वेळ बदलण्यासाठी [टाइम हेल्पर्स](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) देखील वापरू शकलो असतो. पण आता मॉक करण्याची कल्पना स्पष्ट झाली असेल आणि तुम्ही अशा परिस्थितीची कल्पना करू शकता जिथे फक्त वेळ पुढे नेण्याइतके सोपे नसते.

## अनेक कॉन्ट्रॅक्ट्सना मॉक करणे {#mocking-many-contracts}

प्रत्येक मॉकसाठी तुम्हाला दुसरा कॉन्ट्रॅक्ट तयार करावा लागल्यास ते गोंधळात टाकणारे असू शकते. जर तुम्हाला याचा त्रास होत असेल, तर तुम्ही [MockContract](https://github.com/gnosis/mock-contract) लायब्ररी पाहू शकता. हे तुम्हाला कॉन्ट्रॅक्ट्सचे वर्तन त्वरित ओव्हरराइड आणि बदलण्याची परवानगी देते. तथापि, हे फक्त दुसऱ्या कॉन्ट्रॅक्टला कॉल मॉक करण्यासाठी कार्य करते, त्यामुळे ते आपल्या उदाहरणासाठी कार्य करणार नाही.

## मॉक करणे आणखी शक्तिशाली असू शकते {#mocking-can-be-even-more-powerful}

मॉक करण्याची शक्ती इथेच संपत नाही.

- फंक्शन्स जोडणे: केवळ एखादे विशिष्ट फंक्शन ओव्हरराइड करणेच उपयुक्त नाही, तर अतिरिक्त फंक्शन्स जोडणे देखील उपयुक्त आहे. टोकन्ससाठी एक चांगले उदाहरण म्हणजे फक्त एक अतिरिक्त `mint` फंक्शन असणे जे कोणत्याही वापरकर्त्याला विनामूल्य नवीन टोकन मिळविण्याची परवानगी देते.
- टेस्टनेटमध्ये वापर: जेव्हा तुम्ही तुमच्या dApp सह टेस्टनेटवर तुमचे कॉन्ट्रॅक्ट्स तैनात आणि चाचणी करता, तेव्हा मॉक केलेली आवृत्ती वापरण्याचा विचार करा. खरोखरच गरज असल्याशिवाय फंक्शन्स ओव्हरराइड करणे टाळा. शेवटी, तुम्हाला खऱ्या लॉजिकची चाचणी करायची आहे. परंतु उदाहरणार्थ, रीसेट फंक्शन जोडणे उपयुक्त ठरू शकते जे फक्त कॉन्ट्रॅक्टची स्थिती सुरुवातीला रीसेट करते, नवीन तैनातीची आवश्यकता नाही. अर्थातच तुम्हाला Mainnet कॉन्ट्रॅक्टमध्ये ते नको असेल.
