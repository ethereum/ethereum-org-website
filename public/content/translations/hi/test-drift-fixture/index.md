---
title: "टोकन मानकों को समझना"
description: "इथेरियम पर सबसे आम टोकन मानकों और वे कैसे काम करते हैं, इसके लिए एक गाइड।"
image: /images/tokens/token-standards-hero.png
alt: "टोकन मानक आरेख"
template: tutorial
lang: hi
skill: intermediate
published: 2025-08-15
---

# टोकन मानकों को समझना {#understanding-token-standards}

टोकन मानक यह परिभाषित करते हैं कि इथेरियम नेटवर्क पर डिजिटल संपत्तियां कैसे व्यवहार करती हैं। वे एक सामान्य इंटरफ़ेस प्रदान करते हैं जिस पर वॉलेट, एक्सचेंज और एप्लिकेशन टोकन के साथ अनुमानित रूप से इंटरैक्ट करने के लिए भरोसा कर सकते हैं।

## टोकन मानक क्या हैं? {#what-are-token-standards}

टोकन मानक नियमों का एक सेट है जिसे एक [स्मार्ट अनुबंध](/glossary/#smart-contract) के रूप में लागू किया जाता है जो यह परिभाषित करता है कि टोकन कैसे बनाए, ट्रांसफर किए और प्रबंधित किए जाते हैं। सबसे व्यापक रूप से अपनाया गया मानक [ERC-20](/developers/docs/standards/tokens/erc-20/) है, जो इथेरियम पर अधिकांश फंजिबल (विनिमेय) टोकन को शक्ति प्रदान करता है।

_मानकों के बिना_, प्रत्येक टोकन को कस्टम एकीकरण कोड की आवश्यकता होगी। उदाहरण के लिए, `approve` और `transferFrom` फ़ंक्शन, आपके द्वारा अनुमति देने के बाद विकेंद्रीकृत एक्सचेंजों को आपकी ओर से टोकन ट्रांसफर करने की अनुमति देते हैं।

आप यह सत्यापित करने के लिए <a href="https://eth.blockscout.com/tokens">Etherscan</a> पर किसी टोकन के अनुबंध की जांच कर सकते हैं कि वह किस मानक को लागू करता है।

![Token approval flow](/images/tokens/approval-flow.png)

## सामान्य मानक {#common-standards}

### ERC-20: फंजिबल टोकन {#erc-20}

ERC-20 **फंजिबल टोकन** के लिए एक मानक इंटरफ़ेस परिभाषित करता है। प्रत्येक इकाई समान और विनिमेय है, ठीक उसी तरह जैसे एक डॉलर का बिल किसी भी अन्य डॉलर के बिल के समान होता है।

```solidity
// प्राप्तकर्ता को टोकन ट्रांसफर करें
function transfer(address to, uint256 amount) public returns (bool) {
    require(balanceOf(msg.sender) >= amount, "Insufficient balance");
    _balances[msg.sender] -= amount;
    _balances[to] += amount;
    return true;
}
```

ERC-20 टोकन की कुल आपूर्ति आमतौर पर तैनाती के समय तय की जाती है। उदाहरण के लिए, एक प्रोजेक्ट 18 दशमलव स्थानों के साथ 1,000,000 टोकन बना सकता है, जिसका अर्थ है कि सबसे छोटी इकाई `0.000000000000000001` टोकन है। ऊपर दिए गए `translate` फ़ंक्शन में, यदि प्रेषक के पास 100 टोकन हैं और वह 10 भेजने का अनुरोध करता है, तो उसके पास 90 (100 - 10 = 90) बचेंगे और प्राप्तकर्ता को 10 और मिल जाएंगे।

आप [Sepolia](https://sepolia.dev/) पर [Remix](https://remix.ethereum.org/) का उपयोग करके टोकन तैनात कर सकते हैं, और [Blockscout](https://eth.blockscout.com/) पर स्रोत कोड को सत्यापित कर सकते हैं।

### ERC-721: नॉन-फंजिबल टोकन {#erc-721}

ERC-20 के विपरीत, प्रत्येक ERC-721 टोकन अद्वितीय होता है। इन्हें आमतौर पर NFT के रूप में जाना जाता है और इनका उपयोग डिजिटल कलाकृति, डोमेन नाम या इन-गेम संपत्तियों जैसी विशिष्ट वस्तुओं के स्वामित्व का प्रतिनिधित्व करने के लिए किया जाता है।

```md
NFT के लिए उदाहरण मेटाडेटा:
- नाम: CryptoKitty #42
- विवरण: एक दुर्लभ डिजिटल संग्रहणीय वस्तु
- छवि: ipfs://QmXyz...
```

## गैस लागत {#gas-costs}

टोकन ट्रांसफर के लिए Gwei में मूल्यवर्गित गैस शुल्क की आवश्यकता होती है। एक मानक ERC-20 ट्रांसफर में लगभग 21,000 गैस इकाइयों की लागत आती है, जबकि ERC-721 ट्रांसफर में अनुबंध कार्यान्वयन के आधार पर आमतौर पर 50,000 से 100,000 गैस इकाइयों की आवश्यकता होती है।

आधार शुल्क नेटवर्क की मांग के आधार पर घटता-बढ़ता रहता है। जब नेटवर्क पर भीड़ होती है, तो शुल्क प्रति ब्लॉक 12.5% तक बढ़ सकता है।

<ExpandableCard title="Why do NFT transfers cost more?" eventCategory="/test-drift" eventName="clicked Why do NFT transfers cost more?">

NFT ट्रांसफर में अधिक जटिल स्टोरेज संचालन शामिल होते हैं। प्रत्येक टोकन की एक विशिष्ट ID होती है जिसे व्यक्तिगत रूप से ट्रैक किया जाना चाहिए, और ट्रांसफर की अनुमति देने से पहले अनुबंध को स्वामित्व को सत्यापित करना चाहिए। इस अतिरिक्त गणना के लिए अधिक गैस की आवश्यकता होती है।

विस्तृत स्पष्टीकरण के लिए [इथेरियम गैस दस्तावेज़](/developers/docs/gas/) देखें।

</ExpandableCard>

<ExpandableCard title="How to reduce gas costs" eventCategory="/test-drift" eventName="clicked How to reduce gas costs">

लेन-देन की लागत को काफी कम करने के लिए <a href="https://optimism.io">Optimism</a> या [Arbitrum](/developers/docs/scaling/optimistic-rollups/) जैसे लेयर 2 (l2) समाधानों का उपयोग करने पर विचार करें। ये रोलअप्स कई लेन-देन को एक साथ बैच करते हैं और उन्हें इथेरियम मेननेट पर एक ही लेन-देन के रूप में सबमिट करते हैं।

</ExpandableCard>

## उपकरण और संसाधन {#tools-and-resources}

<InfoBanner emoji=":books:">
  <a href="https://docs.openzeppelin.com/contracts">ओपनजेपेलिन अनुबंध लाइब्रेरी</a> सभी प्रमुख टोकन मानकों के ऑडिट किए गए कार्यान्वयन प्रदान करती है।
</InfoBanner>

- इथेरियम इम्प्रूवमेंट प्रपोज़ल्स साइट पर [ERC-20 विनिर्देश](https://eips.ethereum.org/EIPS/eip-20)
- [ओपनजेपेलिन ERC-20 गाइड](https://docs.openzeppelin.com/contracts/erc20)
- [Blockscout](https://eth.blockscout.com/tokens) पर टोकन एक्सप्लोरर

<YouTube id="dQw4w9WgXcQ" />

## परीक्षण के लिए खाली अनुभाग {#empty-section}

## आगे की पढ़ाई {#further-reading}

_आरेख [टोकन मानकों का सचित्र](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) से अनुकूलित_

_आरेख [टोकन मानकों का सचित्र](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) से अनुकूलित_

| मानक | प्रकार | गैस लागत | उपयोग का मामला |
|----------|------|----------|----------|
| [ERC-20](/developers/docs/standards/tokens/erc-20/) | फंजिबल | ~21,000 | मुद्राएं, उपयोगिता टोकन |
| [ERC-721](/developers/docs/standards/tokens/erc-721/) | नॉन-फंजिबल | ~65,000 | डिजिटल कला, संग्रहणीय वस्तुएं |
| [ERC-1155](/developers/docs/standards/tokens/erc-1155/) | मल्टी-टोकन | ~35,000 | गेमिंग आइटम, मिश्रित संपत्तियां |