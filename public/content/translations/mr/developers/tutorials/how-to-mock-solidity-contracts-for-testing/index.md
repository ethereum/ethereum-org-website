---
title: "टेस्टिंगसाठी Solidity स्मार्ट कॉन्ट्रॅक्ट्स मॉक कसे करावे"
description: "टेस्टिंग करताना तुम्ही तुमच्या कॉन्ट्रॅक्ट्सची खिल्ली का उडवावी"
author: "मार्कस वास"
lang: mr
tags:
  - solidity
  - स्मार्ट कॉन्ट्रॅक्ट्स
  - टेस्टिंग
  - मॉकिंग
skill: intermediate
breadcrumb: "मॉकिंग कॉन्ट्रॅक्ट्स"
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[मॉक ऑब्जेक्ट्स](https://wikipedia.org/wiki/Mock_object) हे ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंगमधील एक सामान्य डिझाइन पॅटर्न आहे. 'खिल्ली उडवणे' असा अर्थ असलेल्या 'mocquer' या जुन्या फ्रेंच शब्दावरून आलेला हा शब्द 'एखाद्या खऱ्या गोष्टीची नक्कल करणे' असा विकसित झाला, जे आपण प्रोग्रामिंगमध्ये प्रत्यक्षात करत असतो. कृपया तुम्हाला हवे असेल तरच तुमच्या स्मार्ट कॉन्ट्रॅक्ट्सची खिल्ली उडवा, परंतु जेव्हा शक्य असेल तेव्हा त्यांना मॉक करा. यामुळे तुमचे काम सोपे होते.

## मॉक्ससह कॉन्ट्रॅक्ट्सचे युनिट-टेस्टिंग {#unit-testing-contracts-with-mocks}

कॉन्ट्रॅक्ट मॉक करणे म्हणजे मूलत: त्या कॉन्ट्रॅक्टची दुसरी आवृत्ती तयार करणे जी मूळ आवृत्तीसारखीच वागते, परंतु अशा प्रकारे की ती डेव्हलपरद्वारे सहजपणे नियंत्रित केली जाऊ शकते. तुमच्याकडे अनेकदा गुंतागुंतीचे कॉन्ट्रॅक्ट्स असतात जिथे तुम्हाला फक्त [कॉन्ट्रॅक्टच्या छोट्या भागांची युनिट-टेस्ट](/developers/docs/smart-contracts/testing/) करायची असते. समस्या अशी आहे की जर या छोट्या भागाची टेस्टिंग करण्यासाठी अत्यंत विशिष्ट कॉन्ट्रॅक्ट स्थिती आवश्यक असेल जी मिळवणे कठीण आहे, तर काय?

तुम्ही प्रत्येक वेळी गुंतागुंतीचे टेस्ट सेटअप लॉजिक लिहू शकता जे कॉन्ट्रॅक्टला आवश्यक स्थितीत आणते किंवा तुम्ही मॉक लिहू शकता. इनहेरिटन्ससह कॉन्ट्रॅक्ट मॉक करणे सोपे आहे. फक्त एक दुसरे मॉक कॉन्ट्रॅक्ट तयार करा जे मूळ कॉन्ट्रॅक्टमधून इनहेरिट करते. आता तुम्ही तुमच्या मॉकमध्ये फंक्शन्स ओव्हरराइड करू शकता. चला हे एका उदाहरणासह पाहूया.

## उदाहरण: प्रायव्हेट ERC-20 {#example-private-erc20}

आम्ही एक उदाहरण म्हणून ERC-20 कॉन्ट्रॅक्ट वापरतो ज्यामध्ये सुरुवातीला प्रायव्हेट वेळ असतो. मालक प्रायव्हेट युजर्स व्यवस्थापित करू शकतो आणि सुरुवातीला फक्त त्यांनाच टोकन्स प्राप्त करण्याची परवानगी असेल. एकदा ठराविक वेळ निघून गेल्यावर, सर्वांना टोकन्स वापरण्याची परवानगी दिली जाईल. जर तुम्हाला उत्सुकता असेल, तर आम्ही नवीन ओपनझेपलिन कॉन्ट्रॅक्ट्स v3 मधील [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) हूक वापरत आहोत.

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

आणि आता आपण त्याला मॉक करूया.

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

तुम्हाला खालीलपैकी एक एरर मेसेज मिळेल:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

आम्ही नवीन 0.6 Solidity आवृत्ती वापरत असल्यामुळे, आम्हाला ओव्हरराइड केल्या जाऊ शकणाऱ्या फंक्शन्ससाठी `virtual` कीवर्ड जोडावा लागेल आणि ओव्हरराइड करणाऱ्या फंक्शनसाठी override जोडावा लागेल. तर चला ते दोन्ही `isPublic` फंक्शन्समध्ये जोडूया.

आता तुमच्या युनिट टेस्ट्समध्ये, तुम्ही त्याऐवजी `PrivateERC20Mock` वापरू शकता. जेव्हा तुम्हाला प्रायव्हेट वापराच्या वेळेतील वर्तनाची टेस्टिंग करायची असेल, तेव्हा `setIsPublic(false)` वापरा आणि त्याचप्रमाणे सार्वजनिक वापराच्या वेळेची टेस्टिंग करण्यासाठी `setIsPublic(true)` वापरा. अर्थात आमच्या उदाहरणामध्ये, आम्ही त्यानुसार वेळा बदलण्यासाठी फक्त [टाइम हेल्पर्स](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) वापरू शकलो असतो. परंतु मॉकिंगची कल्पना आता स्पष्ट झाली असावी आणि तुम्ही अशा परिस्थितीची कल्पना करू शकता जिथे फक्त वेळ पुढे नेणे इतके सोपे नसते.

## अनेक कॉन्ट्रॅक्ट्स मॉक करणे {#mocking-many-contracts}

जर तुम्हाला प्रत्येक मॉकसाठी दुसरे कॉन्ट्रॅक्ट तयार करावे लागत असेल तर ते गोंधळाचे होऊ शकते. जर तुम्हाला याचा त्रास होत असेल, तर तुम्ही [MockContract](https://github.com/gnosis/mock-contract) लायब्ररी पाहू शकता. हे तुम्हाला कॉन्ट्रॅक्ट्सचे वर्तन ऑन-द-फ्लाय ओव्हरराइड आणि बदलण्याची अनुमती देते. तथापि, हे फक्त दुसऱ्या कॉन्ट्रॅक्टच्या कॉल्सना मॉक करण्यासाठी कार्य करते, त्यामुळे ते आमच्या उदाहरणासाठी कार्य करणार नाही.

## मॉकिंग अधिक शक्तिशाली असू शकते {#mocking-can-be-even-more-powerful}

मॉकिंगची ताकद तिथेच संपत नाही.

- फंक्शन्स जोडणे: केवळ एखादे विशिष्ट फंक्शन ओव्हरराइड करणे उपयुक्त नाही, तर अतिरिक्त फंक्शन्स जोडणे देखील उपयुक्त आहे. टोकन्ससाठी एक चांगले उदाहरण म्हणजे कोणत्याही युजरला मोफत नवीन टोकन्स मिळवण्याची अनुमती देण्यासाठी अतिरिक्त `mint` फंक्शन असणे.
- टेस्टनेट्समध्ये वापर: जेव्हा तुम्ही तुमच्या विकेंद्रित ॲप्लिकेशन (dapp) सोबत टेस्टनेट्सवर तुमचे कॉन्ट्रॅक्ट्स प्रस्थापित करता आणि टेस्ट करता, तेव्हा मॉक केलेल्या आवृत्तीचा वापर करण्याचा विचार करा. जोपर्यंत खरोखरच आवश्यक नसेल तोपर्यंत फंक्शन्स ओव्हरराइड करणे टाळा. शेवटी तुम्हाला खऱ्या लॉजिकची टेस्टिंग करायची असते. परंतु उदाहरणार्थ रिसेट फंक्शन जोडणे उपयुक्त ठरू शकते जे कॉन्ट्रॅक्टची स्थिती सुरुवातीला रिसेट करते, कोणत्याही नवीन प्रस्थापनेची आवश्यकता नाही. साहजिकच तुम्हाला ते मुख्यनेट कॉन्ट्रॅक्टमध्ये नको असेल.