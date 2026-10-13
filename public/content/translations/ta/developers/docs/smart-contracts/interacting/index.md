---
title: திறன் ஒப்பந்தங்களுடன் தொடர்புகொள்ளுதல்
description: எத்திரியத்தில் ஏற்கனவே நிலைநிறுத்தப்பட்டுள்ள திறன் ஒப்பந்தங்களில் இருந்து தரவைப் படிப்பது மற்றும் எழுதுவது எப்படி என்பதை அறிக.
lang: ta
---

நீங்கள் எப்போதும் உங்கள் சொந்த திறன் ஒப்பந்தத்தை எழுதி நிலைநிறுத்த வேண்டியதில்லை. ஒரு டெவலப்பராக பெரும்பாலான நேரங்களில், மற்றவர்கள் ஏற்கனவே எத்திரியம் பிணையத்தில் நிலைநிறுத்தியுள்ள திறன் ஒப்பந்தங்களுடன் தொடர்புகொள்ளவே நீங்கள் விரும்புவீர்கள்.

ஒரு திறன் ஒப்பந்தத்துடன் தொடர்புகொள்வதற்கான இரண்டு அடிப்படை வழிகளை—தரவைப் **படிப்பது** மற்றும் தரவை **எழுதுவது**—மற்றும் இரண்டையும் செய்ய உங்களுக்குத் தேவையான கருவிகளை இந்தப் பக்கம் உள்ளடக்குகிறது.

## முன்நிபந்தனைகள் {#prerequisites}

நீங்கள் புரிந்துகொள்ள வேண்டியவை:

- [திறன் ஒப்பந்தங்கள் எவ்வாறு செயல்படுகின்றன](/developers/docs/smart-contracts/)
- [எத்திரியம் கணக்குகள் மற்றும் அவை எவ்வாறு பரிவர்த்தனைகளில் கையொப்பமிடுகின்றன](/developers/docs/accounts/)
- [பரிவர்த்தனை என்றால் என்ன](/developers/docs/transactions/)

## திறன் ஒப்பந்தத்துடன் தொடர்புகொள்வதற்கான இரண்டு வழிகள் {#two-ways}

திறன் ஒப்பந்தத்துடன் தொடர்புகொள்வது இரண்டு வகைகளாகப் பிரிக்கப்படுகிறது:

### ஒப்பந்தத்திலிருந்து படித்தல் {#reading-from-a-contract}

படித்தல் என்பது ஒரு **இலவச** செயல்பாடாகும், இது ஒரு பரிவர்த்தனையை உருவாக்காது மற்றும் தொகுதிச்சங்கிலியில் எந்த நிலையையும் மாற்றாது.

நீங்கள் ஒரு ஒப்பந்தத்திலிருந்து படிக்கும்போது, ஏற்கனவே உள்ள தரவை மட்டுமே வினவுகிறீர்கள். எடுத்துக்காட்டாக:

- ERC-20 வில்லை இருப்பைச் சரிபார்த்தல்
- பரவலாக்கப்பட்ட பரிமாற்றகத்திலிருந்து தற்போதைய விலையைப் படித்தல்
- ஒரு NFT-இன் உரிமையாளரைப் பெறுதல்

படித்தல் நிலையை மாற்றாது என்பதால், அவற்றுக்கு [எரிவாயு](/developers/docs/gas/) செலவாகாது மற்றும் ETH தேவையில்லாமல் யாராலும் செய்ய முடியும்.

### ஒப்பந்தத்தில் எழுதுதல் {#writing-to-a-contract}

எழுதுதல் என்பது ஒரு **நிலையை மாற்றும்** செயல்பாடாகும், இதற்கு ஒரு பரிவர்த்தனை தேவைப்படுகிறது மற்றும் எரிவாயு செலவாகிறது.

நீங்கள் ஒரு ஒப்பந்தத்தில் எழுதும்போது, தொகுதிச்சங்கிலி நிலையை மாற்றியமைக்கும் ஒரு செயல்பாட்டைத் தூண்டுகிறீர்கள். எடுத்துக்காட்டாக:

- வில்லைகளை மாற்றுதல்
- பரவலாக்கப்பட்ட பரிமாற்றகத்தில் வில்லைகளை மாற்றுதல் (swapping)
- ஒரு NFT-ஐ அச்சிடுதல்

எழுதுவதற்கு எப்போதும் இவை தேவை:

1. எரிவாயுவுக்குப் போதுமான ETH கொண்ட ஒரு [வெளிப்புறமாகச் சொந்தமான கணக்கு (EOA)](/developers/docs/accounts/#types-of-account)
2. கணக்கின் தனிப்பட்ட திறவுகோலால் கையொப்பமிடப்பட்ட ஒரு பரிவர்த்தனை
3. பரிவர்த்தனை வெட்டியெடுக்கப்பட்டு ஒரு தொகுதியில் சேர்க்கப்பட வேண்டும்

[கணக்குச் சுருக்கம்](/roadmap/account-abstraction/) மூலம், ஒரு திறன் ஒப்பந்தக் கணக்கும் எழுதுதலைத் தொடங்கலாம், மேலும் பயனரின் சார்பாக ஒரு கட்டணதாரர் எரிவாயுவை ஈடுகட்டலாம்—எனவே ETH வைத்திருக்கும் EOA கண்டிப்பாகத் தேவையில்லை.

## ஒப்பந்த ABI-களைப் புரிந்துகொள்ளுதல் {#understanding-contract-abis}

ஒரு திறன் ஒப்பந்தத்துடன் தொடர்புகொள்ள, ஒப்பந்தத்தால் *என்ன* செய்ய முடியும் என்பதை உங்கள் செயலி தெரிந்துகொள்ள வேண்டும். இங்குதான் **பயன்பாட்டு பைனரி இடைமுகம் (ABI)** வருகிறது.

ABI என்பது பின்வருவனவற்றை விவரிக்கும் ஒரு JSON ஆவணமாகும்:

- ஒப்பந்தம் வெளிப்படுத்தும் ஒவ்வொரு செயல்பாடும் (பெயர், உள்ளீடுகள், வெளியீடுகள்)
- ஒப்பந்தம் வெளியிடக்கூடிய ஒவ்வொரு நிகழ்வும்
- ஒப்பந்தத்துடன் பேசும்போது தரவை எவ்வாறு குறியாக்கம் மற்றும் குறிவிலக்கம் செய்வது

ABI-ஐ ஒப்பந்தத்தின் அறிவுறுத்தல் கையேடாக நினைத்துக்கொள்ளுங்கள்—அது இல்லாமல், எந்தெந்த செயல்பாடுகள் உள்ளன அல்லது அவை என்ன அளவுருக்களை எதிர்பார்க்கின்றன என்பது உங்கள் செயலிக்குத் தெரியாது.

### ஒப்பந்தத்தின் ABI-ஐ எங்கே கண்டுபிடிப்பது {#where-to-find-abis}

- **Etherscan-இல் சரிபார்க்கப்பட்ட ஒப்பந்தங்கள்** - சரிபார்க்கப்பட்ட மூலக் குறியீட்டிற்கான ABI-ஐ [Etherscan](https://etherscan.io) தானாகவே வெளிப்படுத்துகிறது
- **டெவலப்பரிடமிருந்து** - பல திட்டங்கள் தங்கள் ABI-களைத் தங்கள் ஆவணங்கள் அல்லது npm தொகுப்புகளில் வெளியிடுகின்றன
- **மூலத்திலிருந்து உருவாக்குதல்** - உங்களிடம் Solidity மூலக் குறியீடு இருந்தால், ABI-ஐ உருவாக்க நீங்கள் அதைத் [தொகுக்கலாம்](/developers/docs/smart-contracts/compiling/)

## ஒப்பந்தங்களுடன் தொடர்புகொள்வதற்கான கருவிகள் மற்றும் நிரலகங்கள் {#tools-and-libraries}

இணையச் செயலி, பின்தளம் அல்லது ஸ்கிரிப்ட்டிலிருந்து ஒப்பந்தங்களுடன் தொடர்புகொள்ள டெவலப்பர்கள் பொதுவாக ஒரு JavaScript/TypeScript நிரலகத்தைப் பயன்படுத்துகின்றனர்.

### கிளையண்ட் நிரலகங்கள் (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - முதல் தர வகை பாதுகாப்புடன் எத்திரியத்திற்கான நவீன, இலகுரக TypeScript இடைமுகம்
- **[ethers.js](https://docs.ethers.org/)** - எத்திரியம் தொகுதிச்சங்கிலியுடன் தொடர்புகொள்வதற்கான போரில் சோதிக்கப்பட்ட நிரலகம்
- **[Web3.js](https://web3js.org/)** - அசல் எத்திரியம் JavaScript API

### பின்தள நிரலகங்கள் {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - சேவையகப் பக்க ஸ்கிரிப்டுகள் மற்றும் பாட்களுக்கு Node.js-இலும் வேலை செய்கிறது
- **[Web3.py](https://web3py.readthedocs.io/)** - எத்திரியம் தொடர்புகளுக்கான Python நிரலகம்
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Geth குழுவிடமிருந்து அதிகாரப்பூர்வ Go நிரலகம்

### எடுத்துக்காட்டு: Viem மூலம் வில்லை இருப்பைப் படித்தல் {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC ஒப்பந்த முகவரி மற்றும் ABI (பகுதியளவு, balanceOf-க்கு)
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

console.log(formatUnits(balance, 6)) // USDC 6 தசமங்களைக் கொண்டுள்ளது
```

### எடுத்துக்காட்டு: ethers.js மூலம் பரிவர்த்தனையை அனுப்புதல் {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 பரிமாற்ற ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // பரிவர்த்தனை வெட்டியெடுக்கப்படும் வரை காத்திருக்கவும்
console.log(`Transferred! TX: ${tx.hash}`)
```

## நிகழ்வுகள் மற்றும் பதிவுகள் {#events-and-logs}

ஏதோ நடந்துள்ளது என்பதைக் குறிக்கத் திறன் ஒப்பந்தங்கள் **நிகழ்வுகளை** வெளியிடலாம். நிகழ்நேரத்தில் செயல்பட உங்கள் செயலி இந்த நிகழ்வுகளைக் கேட்கலாம்.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// USDC பரிமாற்ற நிகழ்வுகளைக் கண்காணிக்கவும்
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## பரிவர்த்தனைகளை உருவகப்படுத்துதல் {#simulating}

ஒரு பரிவர்த்தனையை அனுப்புவதற்கு முன், எரிவாயுவைச் செலவழிக்காமல் அது வெற்றியடையுமா என்பதைச் சரிபார்க்கவும்—மற்றும் அதன் வருவாய் மதிப்பைப் பார்க்கவும்—நீங்கள் அதை **உருவகப்படுத்தலாம்**. பிழைகளை முன்கூட்டியே கண்டறிவதற்கும் முடிவுகளை முன்னோட்டமிடுவதற்கும் இது பயனுள்ளதாக இருக்கும்.

பெரும்பாலான கிளையண்ட் நிரலகங்கள் `eth_call` மூலம் இதை ஆதரிக்கின்றன:

```ts
// Viem உடன்
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## பணப்பைகள் மற்றும் கையொப்பமிடுதல் {#wallets-and-signing}

ஒரு பரவலாக்கப்பட்ட செயலியில் (dapp), பயனரின் பணப்பை (மெட்டாமேஸ்க், Rainbow அல்லது WalletConnect போன்றவை) கையொப்பமிடுதலைக் கையாளுகிறது. நீங்கள் தனிப்பட்ட திறவுகோல்களை நேரடியாக நிர்வகிக்க மாட்டீர்கள்.

[பணப்பை நிரலகங்கள் மற்றும் இணைப்பு கருவிகள்](/developers/docs/apis/javascript/) இதைச் சுருக்கி வழங்குகின்றன, எனவே நீங்கள் உங்கள் செயலியின் தர்க்கத்தை உருவாக்குவதில் கவனம் செலுத்தலாம்.

## தொடர்புடைய பயிற்சிகள் {#related-tutorials}

- [JavaScript-இலிருந்து ஒரு திறன் ஒப்பந்தத்தை அழைத்தல்](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Web3.js மற்றும் Alchemy-ஐப் பயன்படுத்திப் பரிவர்த்தனைகளை அனுப்புதல்](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [உங்கள் பணப்பையில் உங்கள் NFT-ஐ எவ்வாறு பார்ப்பது](/developers/tutorials/how-to-view-nft-in-metamask/)

## மேலும் படிக்க {#further-reading}

- [Viem ஆவணங்கள்: ஒப்பந்தங்களில் படித்தல் மற்றும் எழுதுதல்](https://viem.sh/docs/contract/readContract)
- [ethers.js ஆவணங்கள்: ஒப்பந்தங்கள்](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI விவரக்குறிப்பு](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ABI என்றால் என்ன? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [திறன் ஒப்பந்தங்களைத் தொகுத்தல்](/developers/docs/smart-contracts/compiling/)
- [திறன் ஒப்பந்தங்களை நிலைநிறுத்துதல்](/developers/docs/smart-contracts/deploying/)
- [JavaScript API-கள்](/developers/docs/apis/javascript/)
- [பின்தள API-கள்](/developers/docs/apis/backend/)