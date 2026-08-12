---
title: स्मार्ट कॉन्ट्रैक्ट के साथ इंटरैक्ट करना
description: जानें कि इथेरियम पर पहले से तैनात स्मार्ट कॉन्ट्रैक्ट से कैसे पढ़ें और उनमें कैसे लिखें।
lang: hi
---

आपको हमेशा अपना खुद का स्मार्ट कॉन्ट्रैक्ट लिखने और तैनात करने की आवश्यकता नहीं होती है। एक डेवलपर के रूप में ज़्यादातर समय, आप उन स्मार्ट कॉन्ट्रैक्ट के साथ इंटरैक्ट करना चाहेंगे जिन्हें दूसरों ने पहले ही इथेरियम नेटवर्क पर तैनात कर दिया है।

यह पृष्ठ स्मार्ट कॉन्ट्रैक्ट के साथ इंटरैक्ट करने के दो मूलभूत तरीकों—डेटा **पढ़ना (reading)** और डेटा **लिखना (writing)**—और दोनों को करने के लिए आवश्यक टूल को कवर करता है।

## पूर्वापेक्षाएँ {#prerequisites}

आपको यह समझना चाहिए:

- [स्मार्ट कॉन्ट्रैक्ट कैसे काम करते हैं](/developers/docs/smart-contracts/)
- [इथेरियम खाते और वे लेन-देन पर कैसे हस्ताक्षर करते हैं](/developers/docs/accounts/)
- [लेन-देन क्या है](/developers/docs/transactions/)

## स्मार्ट कॉन्ट्रैक्ट के साथ इंटरैक्ट करने के दो तरीके {#two-ways}

स्मार्ट कॉन्ट्रैक्ट के साथ इंटरैक्ट करना दो श्रेणियों में आता है:

### कॉन्ट्रैक्ट से पढ़ना {#reading-from-a-contract}

पढ़ना एक **मुफ़्त** ऑपरेशन है जो कोई लेन-देन नहीं बनाता है और ब्लॉकचेन पर किसी भी स्थिति को नहीं बदलता है।

जब आप किसी कॉन्ट्रैक्ट से पढ़ते हैं, तो आप केवल उस डेटा को क्वेरी कर रहे होते हैं जो पहले से मौजूद है। उदाहरण के लिए:

- ERC-20 टोकन बैलेंस की जांच करना
- एक विकेंद्रीकृत एक्सचेंज से वर्तमान मूल्य पढ़ना
- NFT के मालिक का पता लगाना

क्योंकि पढ़ने से स्थिति में कोई बदलाव नहीं होता है, इसलिए उनमें [गैस](/developers/docs/gas/) खर्च नहीं होती है और इसे ETH की आवश्यकता के बिना किसी के भी द्वारा किया जा सकता है।

### कॉन्ट्रैक्ट में लिखना {#writing-to-a-contract}

लिखना एक **स्थिति-बदलने वाला** ऑपरेशन है जिसके लिए लेन-देन की आवश्यकता होती है और इसमें गैस खर्च होती है।

जब आप किसी कॉन्ट्रैक्ट में लिखते हैं, तो आप एक फ़ंक्शन को ट्रिगर कर रहे होते हैं जो ब्लॉकचेन की स्थिति को संशोधित करता है। उदाहरण के लिए:

- टोकन ट्रांसफर करना
- विकेंद्रीकृत एक्सचेंज पर टोकन स्वैप करना
- NFT की मिंटिंग करना

लिखने के लिए हमेशा निम्न की आवश्यकता होती है:

1. गैस के लिए पर्याप्त ETH के साथ एक [बाहरी स्वामित्व वाला खाता (EOA)](/developers/docs/accounts/#types-of-account)
2. खाते की निजी कुंजी द्वारा हस्ताक्षरित एक लेन-देन
3. लेन-देन को माइन किया जाना और एक ब्लॉक में शामिल किया जाना

[खाता अमूर्तन](/roadmap/account-abstraction/) के साथ, एक स्मार्ट कॉन्ट्रैक्ट खाता भी लिखने की शुरुआत कर सकता है, और एक पेमास्टर उपयोगकर्ता की ओर से गैस को कवर कर सकता है—इसलिए ETH रखने वाले EOA की सख्ती से आवश्यकता नहीं है।

## कॉन्ट्रैक्ट ABI को समझना {#understanding-contract-abis}

किसी स्मार्ट कॉन्ट्रैक्ट के साथ इंटरैक्ट करने के लिए, आपके एप्लिकेशन को यह जानना होगा कि कॉन्ट्रैक्ट *क्या* कर सकता है। यहीं पर **एप्लिकेशन बाइनरी इंटरफ़ेस (ABI)** काम आता है।

ABI एक JSON दस्तावेज़ है जो वर्णन करता है:

- कॉन्ट्रैक्ट द्वारा प्रदर्शित प्रत्येक फ़ंक्शन (नाम, इनपुट, आउटपुट)
- प्रत्येक घटना जिसे कॉन्ट्रैक्ट उत्सर्जित (emit) कर सकता है
- कॉन्ट्रैक्ट से बात करते समय डेटा को कैसे एनकोड और डिकोड करें

ABI को कॉन्ट्रैक्ट के निर्देश मैनुअल के रूप में सोचें—इसके बिना, आपके एप्लिकेशन को यह नहीं पता होता है कि कौन से फ़ंक्शन मौजूद हैं या वे किन मापदंडों की अपेक्षा करते हैं।

### कॉन्ट्रैक्ट का ABI कहाँ खोजें {#where-to-find-abis}

- **Etherscan पर सत्यापित कॉन्ट्रैक्ट** - [Etherscan](https://etherscan.io) स्वचालित रूप से सत्यापित स्रोत कोड के लिए ABI प्रदर्शित करता है
- **डेवलपर से** - कई प्रोजेक्ट अपने दस्तावेज़ों या npm पैकेजों में अपने ABI प्रकाशित करते हैं
- **स्रोत से जनरेट करें** - यदि आपके पास Solidity स्रोत कोड है, तो आप ABI बनाने के लिए इसका [संकलन](/developers/docs/smart-contracts/compiling/) कर सकते हैं

## कॉन्ट्रैक्ट के साथ इंटरैक्ट करने के लिए टूल और लाइब्रेरी {#tools-and-libraries}

डेवलपर आमतौर पर वेब ऐप, बैकएंड या स्क्रिप्ट से कॉन्ट्रैक्ट के साथ इंटरैक्ट करने के लिए JavaScript/TypeScript लाइब्रेरी का उपयोग करते हैं।

### क्लाइंट लाइब्रेरी (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - प्रथम श्रेणी की टाइप सुरक्षा के साथ इथेरियम के लिए आधुनिक, हल्का TypeScript इंटरफ़ेस
- **[Ethers.js](https://docs.ethers.org/)** - इथेरियम ब्लॉकचेन के साथ इंटरैक्ट करने के लिए परखी हुई लाइब्रेरी
- **[Web3.js](https://web3js.org/)** - मूल इथेरियम JavaScript API

### बैकएंड लाइब्रेरी {#backend-libraries}

- **[Ethers.js](https://docs.ethers.org/)** - सर्वर-साइड स्क्रिप्ट और बॉट के लिए Node.js में भी काम करता है
- **[Web3.py](https://web3py.readthedocs.io/)** - इथेरियम इंटरैक्शन के लिए Python लाइब्रेरी
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Geth टीम की ओर से आधिकारिक Go लाइब्रेरी

### उदाहरण: Viem के साथ टोकन बैलेंस पढ़ना {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC अनुबंध का पता और ABI (आंशिक, balanceOf के लिए)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC में 6 दशमलव होते हैं
```

### उदाहरण: Ethers.js के साथ लेन-देन भेजना {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 ट्रांसफर ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // लेन-देन के माइन होने की प्रतीक्षा करें
console.log(`Transferred! TX: ${tx.hash}`)
```

## घटनाएँ और लॉग {#events-and-logs}

स्मार्ट कॉन्ट्रैक्ट यह संकेत देने के लिए **घटनाएँ** उत्सर्जित कर सकते हैं कि कुछ हुआ है। आपका एप्लिकेशन वास्तविक समय में प्रतिक्रिया देने के लिए इन घटनाओं को सुन सकता है।

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// USDC ट्रांसफर घटनाओं पर नज़र रखें
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## लेन-देन का अनुकरण (Simulating) करना {#simulating}

लेन-देन भेजने से पहले, आप यह जांचने के लिए इसका **अनुकरण (simulate)** कर सकते हैं कि क्या यह सफल होगा—और गैस खर्च किए बिना इसका रिटर्न मान देखने के लिए। यह त्रुटियों को जल्दी पकड़ने और परिणामों का पूर्वावलोकन करने के लिए उपयोगी है।

अधिकांश क्लाइंट लाइब्रेरी `eth_call` के माध्यम से इसका समर्थन करती हैं:

```ts
// Viem के साथ
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## वॉलेट और हस्ताक्षर करना {#wallets-and-signing}

एक विकेंद्रीकृत एप्लिकेशन (dapp) में, उपयोगकर्ता का वॉलेट (जैसे मेटामास्क, Rainbow, या WalletConnect) हस्ताक्षर करने का काम संभालता है। आप सीधे निजी कुंजियों का प्रबंधन नहीं करते हैं।

[वॉलेट लाइब्रेरी और कनेक्शन टूल](/developers/docs/apis/javascript/) इसे अमूर्त (abstract) कर देते हैं ताकि आप अपने एप्लिकेशन लॉजिक को बनाने पर ध्यान केंद्रित कर सकें।

## संबंधित ट्यूटोरियल {#related-tutorials}

- [JavaScript से स्मार्ट कॉन्ट्रैक्ट को कॉल करना](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Web3.js और Alchemy का उपयोग करके लेन-देन भेजना](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [अपने वॉलेट में अपना NFT कैसे देखें](/developers/tutorials/how-to-view-nft-in-metamask/)

## आगे की पढ़ाई {#further-reading}

- [Viem दस्तावेज़: कॉन्ट्रैक्ट को पढ़ना और लिखना](https://viem.sh/docs/contract/readContract)
- [Ethers.js दस्तावेज़: कॉन्ट्रैक्ट](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI विनिर्देश](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ABI क्या है? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## संबंधित विषय {#related-topics}

- [स्मार्ट कॉन्ट्रैक्ट का संकलन](/developers/docs/smart-contracts/compiling/)
- [स्मार्ट कॉन्ट्रैक्ट तैनात करना](/developers/docs/smart-contracts/deploying/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [बैकएंड API](/developers/docs/apis/backend/)