---
title: स्मार्ट कॉन्ट्रॅक्ट्ससोबत संवाद साधणे
description: इथेरियमवर आधीपासूनच प्रस्थापित केलेल्या स्मार्ट कॉन्ट्रॅक्ट्समधून कसे वाचायचे आणि त्यात कसे लिहायचे ते शिका.
lang: mr
---

तुम्हाला नेहमी तुमचे स्वतःचे स्मार्ट कॉन्ट्रॅक्ट लिहिण्याची आणि प्रस्थापित करण्याची आवश्यकता नसते. बहुतांश वेळा एक डेव्हलपर म्हणून, तुम्हाला इतरांनी इथेरियम नेटवर्कवर आधीपासूनच प्रस्थापित केलेल्या स्मार्ट कॉन्ट्रॅक्ट्ससोबत संवाद साधायचा असतो.

हे पृष्ठ स्मार्ट कॉन्ट्रॅक्टसोबत संवाद साधण्याच्या दोन मूलभूत पद्धतींचा समावेश करते—डेटा **वाचणे** आणि डेटा **लिहिणे**—आणि या दोन्ही गोष्टी करण्यासाठी तुम्हाला आवश्यक असलेली साधने.

## पूर्वअटी {#prerequisites}

तुम्हाला खालील गोष्टी समजल्या पाहिजेत:

- [स्मार्ट कॉन्ट्रॅक्ट्स कसे काम करतात](/developers/docs/smart-contracts/)
- [इथेरियम खाती आणि ती व्यवहारांवर कशी स्वाक्षरी करतात](/developers/docs/accounts/)
- [व्यवहार म्हणजे काय](/developers/docs/transactions/)

## स्मार्ट कॉन्ट्रॅक्टसोबत संवाद साधण्याचे दोन मार्ग {#two-ways}

स्मार्ट कॉन्ट्रॅक्टसोबत संवाद साधणे दोन श्रेणींमध्ये विभागले जाते:

### कॉन्ट्रॅक्टमधून वाचणे {#reading-from-a-contract}

वाचणे ही एक **मोफत** प्रक्रिया आहे जी कोणताही व्यवहार तयार करत नाही आणि ब्लॉकचेनवरील कोणतीही स्थिती बदलत नाही.

जेव्हा तुम्ही कॉन्ट्रॅक्टमधून वाचता, तेव्हा तुम्ही फक्त आधीपासून अस्तित्वात असलेल्या डेटाची चौकशी करत असता. उदाहरणार्थ:

- ERC-20 टोकन शिल्लक तपासणे
- विकेंद्रित एक्सचेंजवरून सध्याची किंमत वाचणे
- NFT च्या मालकाची माहिती मिळवणे

कारण वाचण्याने स्थिती बदलत नाही, त्यासाठी [गॅस](/developers/docs/gas/) लागत नाही आणि ETH ची आवश्यकता नसताना कोणीही ते करू शकते.

### कॉन्ट्रॅक्टमध्ये लिहिणे {#writing-to-a-contract}

लिहिणे ही एक **स्थिती-बदलणारी** प्रक्रिया आहे ज्यासाठी व्यवहार आवश्यक असतो आणि गॅस लागतो.

जेव्हा तुम्ही कॉन्ट्रॅक्टमध्ये लिहिता, तेव्हा तुम्ही ब्लॉकचेनची स्थिती बदलणारे फंक्शन ट्रिगर करत असता. उदाहरणार्थ:

- टोकन्स ट्रान्सफर करणे
- विकेंद्रित एक्सचेंजवर टोकन्स स्वॅप करणे
- NFT मिंटिंग करणे

लिहिण्यासाठी नेहमी खालील गोष्टी आवश्यक असतात:

1. गॅससाठी पुरेसे ETH असलेले [एक्सटर्नली ओन्ड अकाउंट (EOA)](/developers/docs/accounts/#types-of-account)
2. खात्याच्या खाजगी की द्वारे स्वाक्षरी केलेला व्यवहार
3. व्यवहार माइन होणे आणि ब्लॉक मध्ये समाविष्ट होणे

[खाते अमूर्तीकरण](/roadmap/account-abstraction/) वापरून, स्मार्ट कॉन्ट्रॅक्ट खाते देखील लिहिण्याची प्रक्रिया सुरू करू शकते, आणि पेमास्टर वापरकर्त्याच्या वतीने गॅस कव्हर करू शकतो—त्यामुळे ETH असलेले EOA असणे सक्तीचे नाही.

## कॉन्ट्रॅक्ट ABIs समजून घेणे {#understanding-contract-abis}

स्मार्ट कॉन्ट्रॅक्टसोबत संवाद साधण्यासाठी, तुमच्या ॲप्लिकेशनला कॉन्ट्रॅक्ट *काय* करू शकते हे माहित असणे आवश्यक आहे. येथेच **ॲप्लिकेशन बायनरी इंटरफेस (ABI)** ची भूमिका येते.

ABI हे एक JSON डॉक्युमेंट आहे जे खालील गोष्टींचे वर्णन करते:

- कॉन्ट्रॅक्टने उघड केलेले प्रत्येक फंक्शन (नाव, इनपुट्स, आउटपुट्स)
- कॉन्ट्रॅक्ट उत्सर्जित करू शकणारी प्रत्येक घटना
- कॉन्ट्रॅक्टशी संवाद साधताना डेटा कसा एन्कोड आणि डिकोड करायचा

ABI ला कॉन्ट्रॅक्टचे सूचना पुस्तिका समजा—त्याशिवाय, तुमच्या ॲप्लिकेशनला कोणती फंक्शन्स अस्तित्वात आहेत किंवा त्यांना कोणते पॅरामीटर्स अपेक्षित आहेत हे माहित नसते.

### कॉन्ट्रॅक्टचा ABI कुठे शोधायचा {#where-to-find-abis}

- **Etherscan वरील सत्यापित कॉन्ट्रॅक्ट्स** - [Etherscan](https://etherscan.io) सत्यापित सोर्स कोडसाठी आपोआप ABI उघड करते
- **डेव्हलपरकडून** - अनेक प्रकल्प त्यांचे ABIs त्यांच्या डॉक्युमेंटेशनमध्ये किंवा npm पॅकेजेसमध्ये प्रकाशित करतात
- **सोर्सवरून तयार करा** - जर तुमच्याकडे Solidity सोर्स कोड असेल, तर तुम्ही ABI तयार करण्यासाठी त्याचे [संकलन](/developers/docs/smart-contracts/compiling/) करू शकता

## कॉन्ट्रॅक्ट्ससोबत संवाद साधण्यासाठी साधने आणि लायब्ररी {#tools-and-libraries}

डेव्हलपर्स सामान्यतः वेब ॲप, बॅकएंड किंवा स्क्रिप्टमधून कॉन्ट्रॅक्ट्ससोबत संवाद साधण्यासाठी JavaScript/TypeScript लायब्ररी वापरतात.

### क्लायंट लायब्ररी (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - प्रथम श्रेणीच्या प्रकार सुरक्षिततेसह इथेरियमसाठी आधुनिक, हलका TypeScript इंटरफेस
- **[ethers.js](https://docs.ethers.org/)** - इथेरियम ब्लॉकचेनसोबत संवाद साधण्यासाठी अत्यंत विश्वासार्ह लायब्ररी
- **[web3.js](https://web3js.org/)** - मूळ इथेरियम JavaScript API

### बॅकएंड लायब्ररी {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - सर्व्हर-साइड स्क्रिप्ट्स आणि बॉट्ससाठी Node.js मध्ये देखील काम करते
- **[web3.py](https://web3py.readthedocs.io/)** - इथेरियम संवादासाठी Python लायब्ररी
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Geth टीमकडून अधिकृत Go लायब्ररी

### उदाहरण: Viem वापरून टोकन शिल्लक वाचणे {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC कॉन्ट्रॅक्ट पत्ता आणि ABI (अंशतः, balanceOf साठी)
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

console.log(formatUnits(balance, 6)) // USDC मध्ये 6 दशांश आहेत
```

### उदाहरण: ethers.js वापरून व्यवहार पाठवणे {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 हस्तांतरण ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // व्यवहार माइन होण्याची वाट पाहा
console.log(`Transferred! TX: ${tx.hash}`)
```

## घटना आणि लॉग्स {#events-and-logs}

काहीतरी घडले आहे हे सूचित करण्यासाठी स्मार्ट कॉन्ट्रॅक्ट्स **घटना** उत्सर्जित करू शकतात. तुमचे ॲप्लिकेशन रिअल-टाइममध्ये प्रतिक्रिया देण्यासाठी या घटना ऐकू शकते.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// USDC हस्तांतरण घटनांवर लक्ष ठेवा
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## व्यवहारांचे अनुकरण करणे {#simulating}

व्यवहार पाठवण्यापूर्वी, तो यशस्वी होईल की नाही हे तपासण्यासाठी—आणि गॅस खर्च न करता त्याचे रिटर्न मूल्य पाहण्यासाठी—तुम्ही त्याचे **अनुकरण (simulate)** करू शकता. हे लवकर त्रुटी पकडण्यासाठी आणि परिणामांचे पूर्वावलोकन करण्यासाठी उपयुक्त आहे.

बहुतेक क्लायंट लायब्ररी `eth_call` द्वारे याला समर्थन देतात:

```ts
// Viem सह
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## वॉलेट्स आणि स्वाक्षरी करणे {#wallets-and-signing}

एका विकेंद्रित ॲप्लिकेशन (dapp) मध्ये, वापरकर्त्याचे वॉलेट (जसे की मेटामास्क, Rainbow, किंवा WalletConnect) स्वाक्षरी करणे हाताळते. तुम्ही खाजगी की थेट व्यवस्थापित करत नाही.

[वॉलेट लायब्ररी आणि कनेक्शन साधने](/developers/docs/apis/javascript/) हे अमूर्त करतात जेणेकरून तुम्ही तुमच्या ॲप्लिकेशन लॉजिकच्या निर्मितीवर लक्ष केंद्रित करू शकता.

## संबंधित ट्यूटोरियल्स {#related-tutorials}

- [JavaScript मधून स्मार्ट कॉन्ट्रॅक्ट कॉल करणे](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [web3.js आणि Alchemy वापरून व्यवहार पाठवणे](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [तुमच्या वॉलेटमध्ये तुमचा NFT कसा पाहायचा](/developers/tutorials/how-to-view-nft-in-metamask/)

## पुढील वाचन {#further-reading}

- [Viem डॉक्युमेंटेशन: कॉन्ट्रॅक्ट्समध्ये वाचणे आणि लिहिणे](https://viem.sh/docs/contract/readContract)
- [ethers.js डॉक्युमेंटेशन: कॉन्ट्रॅक्ट्स](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI स्पेसिफिकेशन](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ABI म्हणजे काय? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## संबंधित विषय {#related-topics}

- [स्मार्ट कॉन्ट्रॅक्ट्सचे संकलन](/developers/docs/smart-contracts/compiling/)
- [स्मार्ट कॉन्ट्रॅक्ट्स प्रस्थापित करणे](/developers/docs/smart-contracts/deploying/)
- [JavaScript APIs](/developers/docs/apis/javascript/)
- [बॅकएंड APIs](/developers/docs/apis/backend/)