---
title: JSON-RPC API
description: "Ethereum கிளையண்டுகளுக்கான நிலையற்ற (stateless), குறைந்த எடையுள்ள ரிமோட் ப்ரொசீஜர் கால் (RPC) நெறிமுறை."
lang: ta
---

ஒரு மென்பொருள் பயன்பாடு [Ethereum](/) பிளாக்செயினுடன் தொடர்பு கொள்ள - பிளாக்செயின் தரவைப் படிப்பதன் மூலமாகவோ அல்லது நெட்வொர்க்கிற்கு பரிவர்த்தனைகளை அனுப்புவதன் மூலமாகவோ - அது ஒரு Ethereum நோடுடன் இணைக்கப்பட வேண்டும்.

இந்த நோக்கத்திற்காக, ஒவ்வொரு [Ethereum கிளையண்டும்](/developers/docs/nodes-and-clients/#execution-clients) ஒரு [JSON-RPC விவரக்குறிப்பை](https://github.com/ethereum/execution-apis) செயல்படுத்துகிறது, எனவே குறிப்பிட்ட நோடு அல்லது கிளையண்ட் செயலாக்கத்தைப் பொருட்படுத்தாமல் பயன்பாடுகள் நம்பியிருக்கக்கூடிய சீரான முறைகளின் தொகுப்பு உள்ளது.

[JSON-RPC](https://www.jsonrpc.org/specification) என்பது நிலையற்ற, குறைந்த எடையுள்ள ரிமோட் ப்ரொசீஜர் கால் (RPC) நெறிமுறையாகும். இது பல தரவு கட்டமைப்புகளையும் அவற்றின் செயலாக்கத்தைச் சுற்றியுள்ள விதிகளையும் வரையறுக்கிறது. இது போக்குவரத்து சார்பற்றது (transport agnostic), அதாவது இதன் கருத்துகளை ஒரே செயல்முறைக்குள், சாக்கெட்டுகள் வழியாக, HTTP வழியாக அல்லது பல்வேறு செய்தி அனுப்பும் சூழல்களில் பயன்படுத்தலாம். இது JSON (RFC 4627) ஐ தரவு வடிவமாகப் பயன்படுத்துகிறது.

## கிளையண்ட் செயலாக்கங்கள் {#client-implementations}

JSON-RPC விவரக்குறிப்பைச் செயல்படுத்தும்போது Ethereum கிளையண்டுகள் ஒவ்வொன்றும் வெவ்வேறு நிரலாக்க மொழிகளைப் பயன்படுத்தலாம். குறிப்பிட்ட நிரலாக்க மொழிகள் தொடர்பான கூடுதல் விவரங்களுக்கு தனிப்பட்ட [கிளையண்ட் ஆவணங்களை](/developers/docs/nodes-and-clients/#execution-clients) பார்க்கவும். சமீபத்திய API ஆதரவு தகவலுக்கு ஒவ்வொரு கிளையண்டின் ஆவணங்களையும் சரிபார்க்க பரிந்துரைக்கிறோம்.

## வசதியான நூலகங்கள் {#convenience-libraries}

JSON-RPC API மூலம் நீங்கள் நேரடியாக Ethereum கிளையண்டுகளுடன் தொடர்பு கொள்ளத் தேர்வுசெய்தாலும், dapp டெவலப்பர்களுக்கு பெரும்பாலும் எளிதான விருப்பங்கள் உள்ளன. JSON-RPC API-இன் மேல் ரேப்பர்களை (wrappers) வழங்க பல [JavaScript](/developers/docs/apis/javascript/#available-libraries) மற்றும் [பின்தள API](/developers/docs/apis/backend/#available-libraries) நூலகங்கள் உள்ளன. இந்த நூலகங்கள் மூலம், டெவலப்பர்கள் Ethereum உடன் தொடர்பு கொள்ளும் JSON-RPC கோரிக்கைகளை (பின்னணியில்) தொடங்க தங்களுக்கு விருப்பமான நிரலாக்க மொழியில் உள்ளுணர்வுள்ள, ஒரு-வரி முறைகளை எழுதலாம்.

## கருத்தொற்றுமை கிளையண்ட் APIகள் {#consensus-clients}

இந்தப் பக்கம் முக்கியமாக Ethereum செயலாக்க கிளையண்டுகளால் பயன்படுத்தப்படும் JSON-RPC API-ஐக் கையாள்கிறது. இருப்பினும், கருத்தொற்றுமை கிளையண்டுகளும் ஒரு RPC API-ஐக் கொண்டுள்ளன, இது பயனர்களை நோடு பற்றிய தகவல்களை வினவவும், Beacon பிளாக்குகள், Beacon நிலை மற்றும் பிற கருத்தொற்றுமை தொடர்பான தகவல்களை நேரடியாக ஒரு நோடிலிருந்து கோரவும் அனுமதிக்கிறது. இந்த API [Beacon API வலைப்பக்கத்தில்](https://ethereum.github.io/beacon-APIs/#/) ஆவணப்படுத்தப்பட்டுள்ளது.

ஒரு நோடிற்குள் கிளையண்டுகளுக்கு இடையேயான தகவல்தொடர்புக்கு ஒரு உள் API-யும் பயன்படுத்தப்படுகிறது - அதாவது, இது கருத்தொற்றுமை கிளையண்ட் மற்றும் செயலாக்க கிளையண்ட் ஆகியவை தரவை பரிமாறிக்கொள்ள உதவுகிறது. இது 'Engine API' என்று அழைக்கப்படுகிறது, மேலும் இதன் விவரக்குறிப்புகள் [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)-இல் கிடைக்கின்றன.

## செயலாக்க கிளையண்ட் விவரக்குறிப்பு {#spec}

[GitHub இல் முழுமையான JSON-RPC API விவரக்குறிப்பைப் படிக்கவும்](https://github.com/ethereum/execution-apis). இந்த API [Execution API வலைப்பக்கத்தில்](https://ethereum.github.io/execution-apis/) ஆவணப்படுத்தப்பட்டுள்ளது, மேலும் கிடைக்கக்கூடிய அனைத்து முறைகளையும் முயற்சிக்க ஒரு இன்ஸ்பெக்டரையும் (Inspector) உள்ளடக்கியுள்ளது.

## மரபுகள் {#conventions}

### ஹெக்ஸ் மதிப்பு குறியாக்கம் {#hex-encoding}

JSON வழியாக இரண்டு முக்கிய தரவு வகைகள் அனுப்பப்படுகின்றன: வடிவமைக்கப்படாத பைட் வரிசைகள் (unformatted byte arrays) மற்றும் அளவுகள் (quantities). இரண்டும் ஹெக்ஸ் குறியாக்கத்துடன் அனுப்பப்படுகின்றன, ஆனால் வடிவமைப்பதற்கான வெவ்வேறு தேவைகளுடன்.

#### அளவுகள் {#quantities-encoding}

அளவுகளை (முழு எண்கள், எண்கள்) குறியாக்கம் செய்யும் போது: ஹெக்ஸ் ஆக குறியாக்கம் செய்யவும், "0x" என்ற முன்னொட்டைச் சேர்க்கவும், இது மிகவும் சுருக்கமான பிரதிநிதித்துவமாகும் (சிறிய விதிவிலக்கு: பூஜ்ஜியம் "0x0" என குறிப்பிடப்பட வேண்டும்).

இதோ சில எடுத்துக்காட்டுகள்:

- 0x41 (தசமத்தில் 65)
- 0x400 (தசமத்தில் 1024)
- தவறு: 0x (எப்போதும் குறைந்தபட்சம் ஒரு இலக்கமாவது இருக்க வேண்டும் - பூஜ்ஜியம் "0x0" ஆகும்)
- தவறு: 0x0400 (முன்னணி பூஜ்ஜியங்கள் அனுமதிக்கப்படாது)
- தவறு: ff (0x முன்னொட்டு இருக்க வேண்டும்)

### வடிவமைக்கப்படாத தரவு {#unformatted-data-encoding}

வடிவமைக்கப்படாத தரவை (பைட் வரிசைகள், கணக்கு முகவரிகள், ஹாஷ்கள், பைட்கோட் வரிசைகள்) குறியாக்கம் செய்யும் போது: ஹெக்ஸ் ஆக குறியாக்கம் செய்யவும், "0x" என்ற முன்னொட்டைச் சேர்க்கவும், ஒரு பைட்டுக்கு இரண்டு ஹெக்ஸ் இலக்கங்கள் இருக்க வேண்டும்.

இதோ சில எடுத்துக்காட்டுகள்:

- 0x41 (அளவு 1, "A")
- 0x004200 (அளவு 3, "0B0")
- 0x (அளவு 0, "")
- தவறு: 0xf0f0f (இரட்டைப்படை இலக்கங்களாக இருக்க வேண்டும்)
- தவறு: 004200 (0x முன்னொட்டு இருக்க வேண்டும்)

### பிளாக் அளவுரு {#block-parameter}

பின்வரும் முறைகள் பிளாக் அளவுருவைக் கொண்டுள்ளன:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Ethereum இன் நிலையை வினவும் கோரிக்கைகள் செய்யப்படும்போது, வழங்கப்பட்ட பிளாக் அளவுரு பிளாக்கின் உயரத்தை தீர்மானிக்கிறது.

பிளாக் அளவுருவுக்கு பின்வரும் விருப்பங்கள் சாத்தியமாகும்:

- `HEX String` - ஒரு முழு எண் பிளாக் எண்
- `String "earliest"` - ஆரம்ப/ஜெனிசிஸ் பிளாக்கிற்கு
- `String "latest"` - சமீபத்திய முன்மொழியப்பட்ட பிளாக்கிற்கு
- `String "safe"` - சமீபத்திய பாதுகாப்பான தலைப்பு பிளாக்கிற்கு
- `String "finalized"` - சமீபத்திய இறுதி செய்யப்பட்ட பிளாக்கிற்கு
- `String "pending"` - நிலுவையில் உள்ள நிலை/பரிவர்த்தனைகளுக்கு

## எடுத்துக்காட்டுகள்

இந்தப் பக்கத்தில், கட்டளை வரி கருவியான [curl](https://curl.se) ஐப் பயன்படுத்தி தனிப்பட்ட JSON_RPC API எண்ட்பாயிண்ட்களை எப்படிப் பயன்படுத்துவது என்பதற்கான எடுத்துக்காட்டுகளை நாங்கள் வழங்குகிறோம். இந்தத் தனிப்பட்ட எண்ட்பாயிண்ட் எடுத்துக்காட்டுகள் கீழே உள்ள [Curl எடுத்துக்காட்டுகள்](#curl-examples) பிரிவில் காணப்படுகின்றன. பக்கத்தின் மேலும் கீழே, Geth நோடு, JSON_RPC API மற்றும் curl ஆகியவற்றைப் பயன்படுத்தி ஒரு ஸ்மார்ட் ஒப்பந்தத்தை தொகுத்து மற்றும் வரிசைப்படுத்துவதற்கான ஒரு [முழுமையான எடுத்துக்காட்டையும்](#usage-example) நாங்கள் வழங்குகிறோம்.

## Curl எடுத்துக்காட்டுகள் {#curl-examples}

Ethereum முனையத்திற்கு [curl](https://curl.se) கோரிக்கைகளை அனுப்புவதன் மூலம் JSON_RPC API-ஐப் பயன்படுத்துவதற்கான எடுத்துக்காட்டுகள் கீழே வழங்கப்பட்டுள்ளன. ஒவ்வொரு எடுத்துக்காட்டிலும் குறிப்பிட்ட எண்ட்பாயிண்ட், அதன் அளவுருக்கள், திரும்பும் வகை மற்றும் அது எவ்வாறு பயன்படுத்தப்பட வேண்டும் என்பதற்கான செயல்முறை எடுத்துக்காட்டு ஆகியவை அடங்கும்.

curl கோரிக்கைகள் உள்ளடக்க வகை (content type) தொடர்பான பிழைச் செய்தியை வழங்கக்கூடும். ஏனெனில் `--data` விருப்பம் உள்ளடக்க வகையை `application/x-www-form-urlencoded` என அமைக்கிறது. உங்கள் முனையம் இதைப் பற்றி புகாரளித்தால், அழைப்பின் தொடக்கத்தில் `-H "Content-Type: application/json"` என்பதை வைப்பதன் மூலம் தலைப்பை (header) கைமுறையாக அமைக்கவும். எடுத்துக்காட்டுகளில் URL/IP மற்றும் போர்ட் (port) கலவையும் சேர்க்கப்படவில்லை, இது curl-க்கு வழங்கப்படும் கடைசி வாதமாக (argument) இருக்க வேண்டும் (எ.கா., `127.0.0.1:8545`). இந்த கூடுதல் தரவுகளை உள்ளடக்கிய முழுமையான curl கோரிக்கை பின்வரும் வடிவத்தை எடுக்கும்:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, நிலை, வரலாறு {#gossip-state-history}

சில முக்கிய JSON-RPC முறைகளுக்கு Ethereum நெட்வொர்க்கிலிருந்து தரவு தேவைப்படுகிறது, மேலும் அவை மூன்று முக்கிய வகைகளாகப் பிரிக்கப்படுகின்றன: _Gossip, நிலை மற்றும் வரலாறு_. ஒவ்வொரு முறைக்கும் செல்ல இந்தப் பிரிவுகளில் உள்ள இணைப்புகளைப் பயன்படுத்தவும் அல்லது முறைகளின் முழுப் பட்டியலையும் ஆராய உள்ளடக்க அட்டவணையைப் பயன்படுத்தவும்.

### Gossip முறைகள் {#gossip-methods}

> இந்த முறைகள் சங்கிலியின் தலையைக் கண்காணிக்கின்றன. இதன் மூலமாகவே பரிவர்த்தனைகள் நெட்வொர்க்கைச் சுற்றி வருகின்றன, தொகுதிகளுக்குள் நுழைகின்றன, மேலும் கிளையண்டுகள் புதிய தொகுதிகளைப் பற்றி அறிந்துகொள்கின்றன.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### நிலை முறைகள் {#state_methods}

> சேமிக்கப்பட்ட அனைத்து தரவுகளின் தற்போதைய நிலையைப் புகாரளிக்கும் முறைகள். "நிலை" (state) என்பது பகிரப்பட்ட ஒரு பெரிய RAM போன்றது, இதில் கணக்கு நிலுவைகள், ஒப்பந்தத் தரவு மற்றும் எரிவாயு (gas) மதிப்பீடுகள் ஆகியவை அடங்கும்.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### வரலாற்று முறைகள் {#history_methods}

> தொடக்கத்திலிருந்து (genesis) ஒவ்வொரு தொகுதியின் வரலாற்றுப் பதிவுகளையும் பெறுகிறது. இது ஒரு பெரிய சேர்க்க-மட்டுமே (append-only) கோப்பைப் போன்றது, மேலும் இதில் அனைத்து தொகுதி தலைப்புகள், தொகுதி உடல்கள், அங்கிள் தொகுதிகள் (uncle blocks) மற்றும் பரிவர்த்தனை ரசீதுகள் ஆகியவை அடங்கும்.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## JSON-RPC API Playground

API முறைகளைக் கண்டறியவும், அவற்றைச் சோதித்துப் பார்க்கவும் நீங்கள் [playground கருவியைப்](https://ethereum-json-rpc.com) பயன்படுத்தலாம். பல்வேறு நோடு வழங்குநர்களால் எந்தெந்த முறைகள் மற்றும் நெட்வொர்க்குகள் ஆதரிக்கப்படுகின்றன என்பதையும் இது உங்களுக்குக் காட்டுகிறது.

## JSON-RPC API முறைகள் {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

தற்போதைய கிளையண்ட் பதிப்பை வழங்குகிறது.

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`String` - தற்போதைய கிளையண்ட் பதிப்பு

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// முடிவு
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

கொடுக்கப்பட்ட தரவின் Keccak-256-ஐ (தரப்படுத்தப்பட்ட SHA3-256 _அல்ல_) வழங்குகிறது.

**அளவுருக்கள்**

1. `DATA` - SHA3 ஹாஷாக மாற்ற வேண்டிய தரவு

```js
params: ["0x68656c6c6f20776f726c64"]
```

**திரும்பப் பெறுபவை**

`DATA` - கொடுக்கப்பட்ட சரத்தின் SHA3 முடிவு.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// முடிவு
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

தற்போதைய நெட்வொர்க் ஐடியை (network id) வழங்குகிறது.

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`String` - தற்போதைய நெட்வொர்க் ஐடி.

தற்போதைய நெட்வொர்க் ஐடிகளின் முழுப் பட்டியல் [chainlist.org](https://chainlist.org) இல் கிடைக்கிறது. சில பொதுவானவை:

- `1`: Ethereum Mainnet
- `11155111`: Sepolia testnet
- `560048` : Hoodi Testnet

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// முடிவு
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

கிளையண்ட் நெட்வொர்க் இணைப்புகளுக்காகச் சுறுசுறுப்பாகக் காத்திருந்தால் (listening) `true` என வழங்கும்.

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`Boolean` - காத்திருக்கும்போது `true`, இல்லையெனில் `false`.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// முடிவு
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

தற்போது கிளையண்டுடன் இணைக்கப்பட்டுள்ள பியர்களின் (peers) எண்ணிக்கையை வழங்குகிறது.

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`QUANTITY` - இணைக்கப்பட்ட பியர்களின் எண்ணிக்கையைக் குறிக்கும் முழு எண் (integer).

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// முடிவு
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

தற்போதைய Ethereum நெறிமுறைப் பதிப்பை (protocol version) வழங்குகிறது. இந்த முறை [Geth இல் கிடைக்காது](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924) என்பதை நினைவில் கொள்ளவும்.

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`String` - தற்போதைய Ethereum நெறிமுறைப் பதிப்பு

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// முடிவு
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

ஒத்திசைவு நிலை (sync status) பற்றிய தரவுள்ள ஒரு ஆப்ஜெக்ட்டை அல்லது `false` என்பதை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

சரியான திரும்பப் பெறும் தரவு கிளையண்ட் செயலாக்கங்களுக்கு இடையே மாறுபடும். நோடு ஒத்திசைக்கப்படாதபோது அனைத்து கிளையண்டுகளும் `False` என்பதை வழங்கும், மேலும் அனைத்து கிளையண்டுகளும் பின்வரும் புலங்களை வழங்கும்.

`Object|Boolean`, ஒத்திசைவு நிலை தரவுள்ள ஒரு ஆப்ஜெக்ட் அல்லது ஒத்திசைக்கப்படாதபோது `FALSE`:

- `startingBlock`: `QUANTITY` - இறக்குமதி தொடங்கிய பிளாக் (ஒத்திசைவு அதன் தலையை (head) அடைந்த பின்னரே மீட்டமைக்கப்படும்)
- `currentBlock`: `QUANTITY` - தற்போதைய பிளாக், eth_blockNumber போன்றதே
- `highestBlock`: `QUANTITY` - மதிப்பிடப்பட்ட மிக உயர்ந்த பிளாக்

இருப்பினும், தனிப்பட்ட கிளையண்டுகள் கூடுதல் தரவையும் வழங்கலாம். எடுத்துக்காட்டாக Geth பின்வருவனவற்றை வழங்குகிறது:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

அதே சமயம் Besu வழங்குவது:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

மேலும் விவரங்களுக்கு உங்கள் குறிப்பிட்ட கிளையண்டின் ஆவணங்களைப் பார்க்கவும்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// அல்லது ஒத்திசைக்காத போது
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

கிளையண்ட் காயின்பேஸ் (coinbase) முகவரியை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

> **குறிப்பு:** இந்த முறை **v1.14.0** முதல் நீக்கப்பட்டுவிட்டது, இனி ஆதரிக்கப்படாது. இந்த முறையைப் பயன்படுத்த முயன்றால் "Method not supported" என்ற பிழை ஏற்படும்.

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`DATA`, 20 பைட்டுகள் - தற்போதைய காயின்பேஸ் முகவரி.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// முடிவு
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

ரீப்ளே-பாதுகாக்கப்பட்ட (replay-protected) பரிவர்த்தனைகளில் கையொப்பமிடப் பயன்படுத்தப்படும் செயின் ஐடியை (chain ID) வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`chainId`, தற்போதைய செயின் ஐடியின் முழு எண்ணைக் குறிக்கும் சரமாக உள்ள ஹெக்ஸாடெசிமல் (hexadecimal) மதிப்பு.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// முடிவு
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

கிளையண்ட் சுறுசுறுப்பாகப் புதிய பிளாக்குகளை மைனிங் செய்தால் `true` என வழங்கும். இது ப்ரூஃப்-ஆஃப்-வொர்க் (proof-of-work) நெட்வொர்க்குகளுக்கு மட்டுமே `true` என வழங்கும், மேலும் [The Merge](/roadmap/merge/) முதல் சில கிளையண்டுகளில் கிடைக்காமல் போகலாம்.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`Boolean` - கிளையண்ட் மைனிங் செய்தால் `true` என வழங்கும், இல்லையெனில் `false`.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'

{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

நோடு மைனிங் செய்யும் வினாடிக்கு ஹாஷ்களின் எண்ணிக்கையை வழங்குகிறது. இது ப்ரூஃப்-ஆஃப்-வொர்க் நெட்வொர்க்குகளுக்கு மட்டுமே `true` என வழங்கும், மேலும் [The Merge](/roadmap/merge/) முதல் சில கிளையண்டுகளில் கிடைக்காமல் போகலாம்.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`QUANTITY` - வினாடிக்கு ஹாஷ்களின் எண்ணிக்கை.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// முடிவு
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

wei-இல் ஒரு கேஸிற்கான தற்போதைய விலையின் மதிப்பீட்டை வழங்குகிறது. எடுத்துக்காட்டாக, Besu கிளையண்ட் கடந்த 100 பிளாக்குகளை ஆராய்ந்து, இயல்பாகவே இடைநிலை கேஸ் யூனிட் விலையை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`QUANTITY` - wei-இல் தற்போதைய கேஸ் விலையின் முழு எண்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// முடிவு
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 வெய்
}
```

### eth_accounts {#eth_accounts}

கிளையண்டிற்குச் சொந்தமான முகவரிகளின் பட்டியலை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`Array of DATA`, 20 பைட்டுகள் - கிளையண்டிற்குச் சொந்தமான முகவரிகள்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

மிகச் சமீபத்திய பிளாக்கின் எண்ணை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

ஏதுமில்லை

**திரும்பப் பெறுபவை**

`QUANTITY` - கிளையண்ட் இருக்கும் தற்போதைய பிளாக் எண்ணின் முழு எண்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// முடிவு
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

கொடுக்கப்பட்ட முகவரியில் உள்ள கணக்கின் இருப்பை (balance) வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `DATA`, 20 பைட்டுகள் - இருப்பைச் சரிபார்க்க வேண்டிய முகவரி.
2. `QUANTITY|TAG` - முழு எண் பிளாக் எண், அல்லது `"latest"`, `"earliest"`, `"pending"`, `"safe"`, அல்லது `"finalized"` என்ற சரம், [பிளாக் அளவுருவை](/developers/docs/apis/json-rpc/#block-parameter) பார்க்கவும்

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**திரும்பப் பெறுபவை**

`QUANTITY` - wei-இல் தற்போதைய இருப்பின் முழு எண்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

கொடுக்கப்பட்ட முகவரியில் உள்ள ஸ்டோரேஜ் (storage) நிலையிலிருந்து மதிப்பை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `DATA`, 20 பைட்டுகள் - ஸ்டோரேஜின் முகவரி.
2. `QUANTITY` - ஸ்டோரேஜில் உள்ள நிலையின் முழு எண்.
3. `QUANTITY|TAG` - முழு எண் பிளாக் எண், அல்லது `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"` என்ற சரம், [பிளாக் அளவுருவை](/developers/docs/apis/json-rpc/#block-parameter) பார்க்கவும்

**திரும்பப் பெறுபவை**

`DATA` - இந்த ஸ்டோரேஜ் நிலையில் உள்ள மதிப்பு.

**எடுத்துக்காட்டு**
சரியான நிலையைக் கணக்கிடுவது மீட்டெடுக்க வேண்டிய ஸ்டோரேஜைப் பொறுத்தது. `0x391694e7e0b0cce554cb130d723a9d27458f9298` என்ற முகவரியால் `0x295a70b2de5e3953354a6a8344e616ed314d7251` இல் டெப்ளாய் செய்யப்பட்ட பின்வரும் ஒப்பந்தத்தைக் கவனியுங்கள்.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

pos0 இன் மதிப்பை மீட்டெடுப்பது நேரடியானது:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

மேப்பின் (map) ஒரு உறுப்பை மீட்டெடுப்பது கடினமானது. மேப்பில் உள்ள ஒரு உறுப்பின் நிலை இதைக் கொண்டு கணக்கிடப்படுகிறது:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

இதன் பொருள் pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] இல் ஸ்டோரேஜை மீட்டெடுக்க, நாம் நிலையைக் கணக்கிட வேண்டும்:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

web3 லைப்ரரியுடன் வரும் geth கன்சோலை இந்தக் கணக்கீட்டைச் செய்யப் பயன்படுத்தலாம்:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

இப்போது ஸ்டோரேஜைப் பெற:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

ஒரு முகவரியிலிருந்து _அனுப்பப்பட்ட_ பரிவர்த்தனைகளின் எண்ணிக்கையை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `DATA`, 20 பைட்டுகள் - முகவரி.
2. `QUANTITY|TAG` - முழு எண் பிளாக் எண், அல்லது `"latest"`, `"earliest"`, `"pending"`, `"safe"` அல்லது `"finalized"` என்ற சரம், [பிளாக் அளவுருவை](/developers/docs/apis/json-rpc/#block-parameter) பார்க்கவும்

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // சமீபத்திய தொகுதியில் உள்ள நிலை
]
```

**திரும்பப் பெறுபவை**

`QUANTITY` - இந்த முகவரியிலிருந்து அனுப்பப்பட்ட பரிவர்த்தனைகளின் எண்ணிக்கையைக் குறிக்கும் முழு எண்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

கொடுக்கப்பட்ட பிளாக் ஹாஷுடன் பொருந்தும் பிளாக்கிலிருந்து ஒரு பிளாக்கில் உள்ள பரிவர்த்தனைகளின் எண்ணிக்கையை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `DATA`, 32 பைட்டுகள் - ஒரு பிளாக்கின் ஹாஷ்

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**திரும்பப் பெறுபவை**

`QUANTITY` - இந்தப் பிளாக்கில் உள்ள பரிவர்த்தனைகளின் எண்ணிக்கையைக் குறிக்கும் முழு எண்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

கொடுக்கப்பட்ட பிளாக் எண்ணுடன் பொருந்தும் பிளாக்கில் உள்ள பரிவர்த்தனைகளின் எண்ணிக்கையை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `QUANTITY|TAG` - ஒரு பிளாக் எண்ணின் முழு எண், அல்லது `"earliest"`, `"latest"`, `"pending"`, `"safe"` அல்லது `"finalized"` என்ற சரம், [பிளாக் அளவுருவில்](/developers/docs/apis/json-rpc/#block-parameter) உள்ளபடி.

```js
params: [
  "0x13738ca", // 20396234
]
```

**திரும்பப் பெறுபவை**

`QUANTITY` - இந்தப் பிளாக்கில் உள்ள பரிவர்த்தனைகளின் எண்ணிக்கையைக் குறிக்கும் முழு எண்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

கொடுக்கப்பட்ட பிளாக் ஹாஷுடன் பொருந்தும் பிளாக்கிலிருந்து ஒரு பிளாக்கில் உள்ள அங்கிள்களின் (uncles) எண்ணிக்கையை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `DATA`, 32 பைட்டுகள் - ஒரு பிளாக்கின் ஹாஷ்

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**திரும்பப் பெறுபவை**

`QUANTITY` - இந்தப் பிளாக்கில் உள்ள அங்கிள்களின் எண்ணிக்கையைக் குறிக்கும் முழு எண்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

கொடுக்கப்பட்ட பிளாக் எண்ணுடன் பொருந்தும் பிளாக்கிலிருந்து ஒரு பிளாக்கில் உள்ள அங்கிள்களின் எண்ணிக்கையை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `QUANTITY|TAG` - ஒரு பிளாக் எண்ணின் முழு எண், அல்லது `"latest"`, `"earliest"`, `"pending"`, `"safe"` அல்லது `"finalized"` என்ற சரம், [பிளாக் அளவுருவை](/developers/docs/apis/json-rpc/#block-parameter) பார்க்கவும்

```js
params: [
  "0xe8", // 232
]
```

**திரும்பப் பெறுபவை**

`QUANTITY` - இந்தப் பிளாக்கில் உள்ள அங்கிள்களின் எண்ணிக்கையைக் குறிக்கும் முழு எண்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

கொடுக்கப்பட்ட முகவரியில் உள்ள குறியீட்டை (code) வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `DATA`, 20 பைட்டுகள் - முகவரி
2. `QUANTITY|TAG` - முழு எண் பிளாக் எண், அல்லது `"latest"`, `"earliest"`, `"pending"`, `"safe"` அல்லது `"finalized"` என்ற சரம், [பிளாக் அளவுருவை](/developers/docs/apis/json-rpc/#block-parameter) பார்க்கவும்

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**திரும்பப் பெறுபவை**

`DATA` - கொடுக்கப்பட்ட முகவரியிலிருந்து குறியீடு.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

`sign` முறையானது Ethereum-குறிப்பிட்ட கையொப்பத்தை இதைக் கொண்டு கணக்கிடுகிறது: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

செய்தியில் ஒரு முன்னொட்டைச் சேர்ப்பதன் மூலம், கணக்கிடப்பட்ட கையொப்பம் Ethereum-குறிப்பிட்ட கையொப்பமாக அடையாளம் காணக்கூடியதாகிறது. இது ஒரு தீங்கிழைக்கும் dapp தன்னிச்சையான தரவுகளில் (எ.கா., பரிவர்த்தனை) கையொப்பமிட்டு, பாதிக்கப்பட்டவரைப் போல ஆள்மாறாட்டம் செய்ய கையொப்பத்தைப் பயன்படுத்தும் தவறான பயன்பாட்டைத் தடுக்கிறது.

குறிப்பு: கையொப்பமிட வேண்டிய முகவரி அன்லாக் (unlock) செய்யப்பட்டிருக்க வேண்டும்.

**அளவுருக்கள்**

1. `DATA`, 20 பைட்டுகள் - முகவரி
2. `DATA`, N பைட்டுகள் - கையொப்பமிட வேண்டிய செய்தி

**திரும்பப் பெறுபவை**

`DATA`: கையொப்பம்

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

[eth_sendRawTransaction](#eth_sendrawtransaction) ஐப் பயன்படுத்திப் பின்னர் நெட்வொர்க்கில் சமர்ப்பிக்கக்கூடிய ஒரு பரிவர்த்தனையில் கையொப்பமிடுகிறது.

**அளவுருக்கள்**

1. `Object` - பரிவர்த்தனை ஆப்ஜெக்ட்

- `type`:
- `from`: `DATA`, 20 பைட்டுகள் - பரிவர்த்தனை அனுப்பப்படும் முகவரி.
- `to`: `DATA`, 20 பைட்டுகள் - (புதிய ஒப்பந்தத்தை உருவாக்கும்போது விருப்பத்திற்குரியது) பரிவர்த்தனை செலுத்தப்படும் முகவரி.
- `gas`: `QUANTITY` - (விருப்பத்திற்குரியது, இயல்புநிலை: 90000) பரிவர்த்தனை செயலாக்கத்திற்காக வழங்கப்பட்ட கேஸின் முழு எண். இது பயன்படுத்தப்படாத கேஸைத் திருப்பித் தரும்.
- `gasPrice`: `QUANTITY` - (விருப்பத்திற்குரியது, இயல்புநிலை: தீர்மானிக்கப்பட-வேண்டியது) செலுத்தப்பட்ட ஒவ்வொரு கேஸிற்கும் பயன்படுத்தப்படும் gasPrice இன் முழு எண், Wei-இல்.
- `value`: `QUANTITY` - (விருப்பத்திற்குரியது) இந்தப் பரிவர்த்தனையுடன் அனுப்பப்பட்ட மதிப்பின் முழு எண், Wei-இல்.
- `data`: `DATA` - ஒரு ஒப்பந்தத்தின் தொகுக்கப்பட்ட குறியீடு அல்லது அழைக்கப்பட்ட முறை கையொப்பம் மற்றும் குறியிடப்பட்ட அளவுருக்களின் ஹாஷ்.
- `nonce`: `QUANTITY` - (விருப்பத்திற்குரியது) ஒரு நான்ஸின் (nonce) முழு எண். இது அதே நான்ஸைப் பயன்படுத்தும் உங்களின் சொந்த நிலுவையிலுள்ள பரிவர்த்தனைகளை மேலெழுத (overwrite) அனுமதிக்கிறது.

**திரும்பப் பெறுபவை**

`DATA`, குறிப்பிட்ட கணக்கால் கையொப்பமிடப்பட்ட RLP-குறியிடப்பட்ட பரிவர்த்தனை ஆப்ஜெக்ட்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// முடிவு
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

தரவுப் புலத்தில் குறியீடு இருந்தால், புதிய செய்தி அழைப்புப் பரிவர்த்தனை அல்லது ஒப்பந்த உருவாக்கத்தை உருவாக்குகிறது, மேலும் `from` இல் குறிப்பிடப்பட்டுள்ள கணக்கைப் பயன்படுத்தி அதில் கையொப்பமிடுகிறது.

**அளவுருக்கள்**

1. `Object` - பரிவர்த்தனை ஆப்ஜெக்ட்

- `from`: `DATA`, 20 பைட்டுகள் - பரிவர்த்தனை அனுப்பப்படும் முகவரி.
- `to`: `DATA`, 20 பைட்டுகள் - (புதிய ஒப்பந்தத்தை உருவாக்கும்போது விருப்பத்திற்குரியது) பரிவர்த்தனை செலுத்தப்படும் முகவரி.
- `gas`: `QUANTITY` - (விருப்பத்திற்குரியது, இயல்புநிலை: 90000) பரிவர்த்தனை செயலாக்கத்திற்காக வழங்கப்பட்ட கேஸின் முழு எண். இது பயன்படுத்தப்படாத கேஸைத் திருப்பித் தரும்.
- `gasPrice`: `QUANTITY` - (விருப்பத்திற்குரியது, இயல்புநிலை: தீர்மானிக்கப்பட-வேண்டியது) செலுத்தப்பட்ட ஒவ்வொரு கேஸிற்கும் பயன்படுத்தப்படும் gasPrice இன் முழு எண்.
- `value`: `QUANTITY` - (விருப்பத்திற்குரியது) இந்தப் பரிவர்த்தனையுடன் அனுப்பப்பட்ட மதிப்பின் முழு எண்.
- `input`: `DATA` - ஒரு ஒப்பந்தத்தின் தொகுக்கப்பட்ட குறியீடு அல்லது அழைக்கப்பட்ட முறை கையொப்பம் மற்றும் குறியிடப்பட்ட அளவுருக்களின் ஹாஷ்.
- `nonce`: `QUANTITY` - (விருப்பத்திற்குரியது) ஒரு நான்ஸின் முழு எண். இது அதே நான்ஸைப் பயன்படுத்தும் உங்களின் சொந்த நிலுவையிலுள்ள பரிவர்த்தனைகளை மேலெழுத அனுமதிக்கிறது.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**திரும்பப் பெறுபவை**

`DATA`, 32 பைட்டுகள் - பரிவர்த்தனை ஹாஷ், அல்லது பரிவர்த்தனை இன்னும் கிடைக்கவில்லை என்றால் பூஜ்ஜிய ஹாஷ்.

நீங்கள் ஒரு ஒப்பந்தத்தை உருவாக்கியபோது, பரிவர்த்தனை ஒரு பிளாக்கில் முன்மொழியப்பட்ட பிறகு, ஒப்பந்த முகவரியைப் பெற [eth_getTransactionReceipt](#eth_gettransactionreceipt) ஐப் பயன்படுத்தவும்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

கையொப்பமிடப்பட்ட பரிவர்த்தனைகளுக்கான புதிய செய்தி அழைப்புப் பரிவர்த்தனை அல்லது ஒப்பந்த உருவாக்கத்தை உருவாக்குகிறது.

**அளவுருக்கள்**

1. `DATA`, கையொப்பமிடப்பட்ட பரிவர்த்தனைத் தரவு.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**திரும்பப் பெறுபவை**

`DATA`, 32 பைட்டுகள் - பரிவர்த்தனை ஹாஷ், அல்லது பரிவர்த்தனை இன்னும் கிடைக்கவில்லை என்றால் பூஜ்ஜிய ஹாஷ்.

நீங்கள் ஒரு ஒப்பந்தத்தை உருவாக்கியபோது, பரிவர்த்தனை ஒரு பிளாக்கில் முன்மொழியப்பட்ட பிறகு, ஒப்பந்த முகவரியைப் பெற [eth_getTransactionReceipt](#eth_gettransactionreceipt) ஐப் பயன்படுத்தவும்.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

பிளாக்செயினில் ஒரு பரிவர்த்தனையை உருவாக்காமல் உடனடியாக ஒரு புதிய செய்தி அழைப்பைச் செயல்படுத்துகிறது. பெரும்பாலும் படிக்க-மட்டுமேயான (read-only) ஸ்மார்ட் ஒப்பந்தச் செயல்பாடுகளைச் செயல்படுத்தப் பயன்படுத்தப்படுகிறது, எடுத்துக்காட்டாக ERC-20 ஒப்பந்தத்திற்கான `balanceOf`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `Object` - பரிவர்த்தனை அழைப்பு ஆப்ஜெக்ட்

- `from`: `DATA`, 20 பைட்டுகள் - (விருப்பத்திற்குரியது) பரிவர்த்தனை அனுப்பப்படும் முகவரி.
- `to`: `DATA`, 20 பைட்டுகள் - பரிவர்த்தனை செலுத்தப்படும் முகவரி.
- `gas`: `QUANTITY` - (விருப்பத்திற்குரியது) பரிவர்த்தனை செயலாக்கத்திற்காக வழங்கப்பட்ட கேஸின் முழு எண். eth_call பூஜ்ஜிய கேஸைப் பயன்படுத்துகிறது, ஆனால் இந்த அளவுரு சில செயலாக்கங்களுக்குத் தேவைப்படலாம்.
- `gasPrice`: `QUANTITY` - (விருப்பத்திற்குரியது) செலுத்தப்பட்ட ஒவ்வொரு கேஸிற்கும் பயன்படுத்தப்படும் gasPrice இன் முழு எண்
- `value`: `QUANTITY` - (விருப்பத்திற்குரியது) இந்தப் பரிவர்த்தனையுடன் அனுப்பப்பட்ட மதிப்பின் முழு எண்
- `input`: `DATA` - (விருப்பத்திற்குரியது) முறை கையொப்பம் மற்றும் குறியிடப்பட்ட அளவுருக்களின் ஹாஷ். விவரங்களுக்கு [Solidity ஆவணத்தில் உள்ள Ethereum Contract ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) ஐப் பார்க்கவும்.

2. `QUANTITY|TAG` - முழு எண் பிளாக் எண், அல்லது `"latest"`, `"earliest"`, `"pending"`, `"safe"` அல்லது `"finalized"` என்ற சரம், [பிளாக் அளவுருவை](/developers/docs/apis/json-rpc/#block-parameter) பார்க்கவும்

**திரும்பப் பெறுபவை**

`DATA` - செயல்படுத்தப்பட்ட ஒப்பந்தத்தின் திரும்பப் பெறும் மதிப்பு.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

பரிவர்த்தனையை முடிக்க எவ்வளவு கேஸ் தேவை என்பதற்கான மதிப்பீட்டை உருவாக்கி வழங்குகிறது. பரிவர்த்தனை பிளாக்செயினில் சேர்க்கப்படாது. EVM இயக்கவியல் மற்றும் நோடு செயல்திறன் உள்ளிட்ட பல்வேறு காரணங்களுக்காக, பரிவர்த்தனையால் உண்மையில் பயன்படுத்தப்படும் கேஸின் அளவை விட மதிப்பீடு கணிசமாக அதிகமாக இருக்கலாம் என்பதை நினைவில் கொள்ளவும்.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

அனைத்துப் பண்புகளும் விருப்பத்திற்குரியவை என்பதைத் தவிர, [eth_call](#eth_call) அளவுருக்களைப் பார்க்கவும். கேஸ் வரம்பு எதுவும் குறிப்பிடப்படவில்லை என்றால், geth நிலுவையிலுள்ள பிளாக்கிலிருந்து பிளாக் கேஸ் வரம்பை மேல் வரம்பாகப் பயன்படுத்துகிறது. இதன் விளைவாக, கேஸின் அளவு நிலுவையிலுள்ள பிளாக் கேஸ் வரம்பை விட அதிகமாக இருக்கும்போது, அழைப்பு/பரிவர்த்தனையைச் செயல்படுத்தத் திரும்பப் பெறப்பட்ட மதிப்பீடு போதுமானதாக இருக்காது.

**திரும்பப் பெறுபவை**

`QUANTITY` - பயன்படுத்தப்பட்ட கேஸின் அளவு.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

ஹாஷ் மூலம் ஒரு பிளாக் பற்றிய தகவலை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `DATA`, 32 பைட்டுகள் - ஒரு பிளாக்கின் ஹாஷ்.
2. `Boolean` - `true` எனில் இது முழுப் பரிவர்த்தனை ஆப்ஜெக்ட்டுகளை வழங்கும், `false` எனில் பரிவர்த்தனைகளின் ஹாஷ்களை மட்டுமே வழங்கும்.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**திரும்பப் பெறுபவை**

`Object` - ஒரு பிளாக் ஆப்ஜெக்ட், அல்லது பிளாக் எதுவும் காணப்படாவிட்டால் `null`:

- `number`: `QUANTITY` - பிளாக் எண். இது நிலுவையிலுள்ள பிளாக்காக இருக்கும்போது `null`.
- `hash`: `DATA`, 32 பைட்டுகள் - பிளாக்கின் ஹாஷ். இது நிலுவையிலுள்ள பிளாக்காக இருக்கும்போது `null`.
- `parentHash`: `DATA`, 32 பைட்டுகள் - மூலப் பிளாக்கின் (parent block) ஹாஷ்.
- `nonce`: `DATA`, 8 பைட்டுகள் - உருவாக்கப்பட்ட ப்ரூஃப்-ஆஃப்-வொர்க்கின் ஹாஷ். இது நிலுவையிலுள்ள பிளாக்காக இருக்கும்போது `null`, ப்ரூஃப்-ஆஃப்-ஸ்டேக் (proof-of-stake) பிளாக்குகளுக்கு `0x0` (The Merge முதல்)
- `sha3Uncles`: `DATA`, 32 பைட்டுகள் - பிளாக்கில் உள்ள அங்கிள்ஸ் தரவின் SHA3.
- `logsBloom`: `DATA`, 256 பைட்டுகள் - பிளாக்கின் லாக்ஸிற்கான (logs) ப்ளூம் ஃபில்டர் (bloom filter). இது நிலுவையிலுள்ள பிளாக்காக இருக்கும்போது `null`.
- `transactionsRoot`: `DATA`, 32 பைட்டுகள் - பிளாக்கின் பரிவர்த்தனை ட்ரையின் (transaction trie) ரூட் (root).
- `stateRoot`: `DATA`, 32 பைட்டுகள் - பிளாக்கின் இறுதி ஸ்டேட் ட்ரையின் (state trie) ரூட்.
- `receiptsRoot`: `DATA`, 32 பைட்டுகள் - பிளாக்கின் ரசீதுகள் ட்ரையின் (receipts trie) ரூட்.
- `miner`: `DATA`, 20 பைட்டுகள் - பிளாக் வெகுமதிகள் வழங்கப்பட்ட பயனாளியின் முகவரி.
- `difficulty`: `QUANTITY` - இந்தப் பிளாக்கிற்கான சிரமத்தின் (difficulty) முழு எண்.
- `totalDifficulty`: `QUANTITY` - இந்தப் பிளாக் வரை செயினின் மொத்தச் சிரமத்தின் முழு எண்.
- `extraData`: `DATA` - இந்தப் பிளாக்கின் "கூடுதல் தரவு" (extra data) புலம்.
- `size`: `QUANTITY` - இந்தப் பிளாக்கின் அளவை பைட்டுகளில் குறிக்கும் முழு எண்.
- `gasLimit`: `QUANTITY` - இந்தப் பிளாக்கில் அனுமதிக்கப்பட்ட அதிகபட்ச கேஸ்.
- `gasUsed`: `QUANTITY` - இந்தப் பிளாக்கில் உள்ள அனைத்துப் பரிவர்த்தனைகளாலும் பயன்படுத்தப்பட்ட மொத்த கேஸ்.
- `timestamp`: `QUANTITY` - பிளாக் தொகுக்கப்பட்டதற்கான unix டைம்ஸ்டாம்ப் (timestamp).
- `transactions`: `Array` - கடைசியாகக் கொடுக்கப்பட்ட அளவுருவைப் பொறுத்து, பரிவர்த்தனை ஆப்ஜெக்ட்டுகளின் வரிசை (Array), அல்லது 32 பைட்டுகள் பரிவர்த்தனை ஹாஷ்கள்.
- `uncles`: `Array` - அங்கிள் ஹாஷ்களின் வரிசை.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// முடிவு
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

பிளாக் எண் மூலம் ஒரு பிளாக் பற்றிய தகவலை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `QUANTITY|TAG` - ஒரு பிளாக் எண்ணின் முழு எண், அல்லது `"earliest"`, `"latest"`, `"pending"`, `"safe"` அல்லது `"finalized"` என்ற சரம், [பிளாக் அளவுருவில்](/developers/docs/apis/json-rpc/#block-parameter) உள்ளபடி.
2. `Boolean` - `true` எனில் இது முழுப் பரிவர்த்தனை ஆப்ஜெக்ட்டுகளை வழங்கும், `false` எனில் பரிவர்த்தனைகளின் ஹாஷ்களை மட்டுமே வழங்கும்.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**திரும்பப் பெறுபவை**
[eth_getBlockByHash](#eth_getblockbyhash) ஐப் பார்க்கவும்

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

முடிவுக்கு [eth_getBlockByHash](#eth_getblockbyhash) ஐப் பார்க்கவும்

### eth_getTransactionByHash {#eth_gettransactionbyhash}

பரிவர்த்தனை ஹாஷ் மூலம் கோரப்பட்ட ஒரு பரிவர்த்தனை பற்றிய தகவலை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `DATA`, 32 பைட்டுகள் - பரிவர்த்தனையின் ஹாஷ்

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**திரும்பப் பெறுபவை**

`Object` - ஒரு பரிவர்த்தனை ஆப்ஜெக்ட், அல்லது பரிவர்த்தனை எதுவும் காணப்படாவிட்டால் `null`:

- `blockHash`: `DATA`, 32 பைட்டுகள் - இந்தப் பரிவர்த்தனை இருந்த பிளாக்கின் ஹாஷ். இது நிலுவையில் இருக்கும்போது `null`.
- `blockNumber`: `QUANTITY` - இந்தப் பரிவர்த்தனை இருந்த பிளாக் எண். இது நிலுவையில் இருக்கும்போது `null`.
- `from`: `DATA`, 20 பைட்டுகள் - அனுப்புநரின் முகவரி.
- `gas`: `QUANTITY` - அனுப்புநரால் வழங்கப்பட்ட கேஸ்.
- `gasPrice`: `QUANTITY` - அனுப்புநரால் Wei-இல் வழங்கப்பட்ட கேஸ் விலை.
- `hash`: `DATA`, 32 பைட்டுகள் - பரிவர்த்தனையின் ஹாஷ்.
- `input`: `DATA` - பரிவர்த்தனையுடன் அனுப்பப்பட்ட தரவு.
- `nonce`: `QUANTITY` - இதற்கு முன் அனுப்புநரால் செய்யப்பட்ட பரிவர்த்தனைகளின் எண்ணிக்கை.
- `to`: `DATA`, 20 பைட்டுகள் - பெறுநரின் முகவரி. இது ஒரு ஒப்பந்த உருவாக்கப் பரிவர்த்தனையாக இருக்கும்போது `null`.
- `transactionIndex`: `QUANTITY` - பிளாக்கில் உள்ள பரிவர்த்தனைகளின் குறியீட்டு (index) நிலையின் முழு எண். இது நிலுவையில் இருக்கும்போது `null`.
- `value`: `QUANTITY` - Wei-இல் மாற்றப்பட்ட மதிப்பு.
- `v`: `QUANTITY` - ECDSA மீட்பு ஐடி (recovery id)
- `r`: `QUANTITY` - ECDSA கையொப்பம் r
- `s`: `QUANTITY` - ECDSA கையொப்பம் s

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// முடிவு
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

பிளாக் ஹாஷ் மற்றும் பரிவர்த்தனைக் குறியீட்டு நிலை மூலம் ஒரு பரிவர்த்தனை பற்றிய தகவலை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `DATA`, 32 பைட்டுகள் - ஒரு பிளாக்கின் ஹாஷ்.
2. `QUANTITY` - பரிவர்த்தனைக் குறியீட்டு நிலையின் முழு எண்.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**திரும்பப் பெறுபவை**
[eth_getTransactionByHash](#eth_gettransactionbyhash) ஐப் பார்க்கவும்

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

முடிவுக்கு [eth_getTransactionByHash](#eth_gettransactionbyhash) ஐப் பார்க்கவும்

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

பிளாக் எண் மற்றும் பரிவர்த்தனைக் குறியீட்டு நிலை மூலம் ஒரு பரிவர்த்தனை பற்றிய தகவலை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `QUANTITY|TAG` - ஒரு பிளாக் எண், அல்லது `"earliest"`, `"latest"`, `"pending"`, `"safe"` அல்லது `"finalized"` என்ற சரம், [பிளாக் அளவுருவில்](/developers/docs/apis/json-rpc/#block-parameter) உள்ளபடி.
2. `QUANTITY` - பரிவர்த்தனைக் குறியீட்டு நிலை.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**திரும்பப் பெறுபவை**
[eth_getTransactionByHash](#eth_gettransactionbyhash) ஐப் பார்க்கவும்

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

முடிவுக்கு [eth_getTransactionByHash](#eth_gettransactionbyhash) ஐப் பார்க்கவும்

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

பரிவர்த்தனை ஹாஷ் மூலம் ஒரு பரிவர்த்தனையின் ரசீதை (receipt) வழங்குகிறது.

**குறிப்பு** நிலுவையிலுள்ள பரிவர்த்தனைகளுக்கு ரசீது கிடைக்காது.

**அளவுருக்கள்**

1. `DATA`, 32 பைட்டுகள் - பரிவர்த்தனையின் ஹாஷ்

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**திரும்பப் பெறுபவை**
`Object` - ஒரு பரிவர்த்தனை ரசீது ஆப்ஜெக்ட், அல்லது ரசீது எதுவும் காணப்படாவிட்டால் `null`:

- `transactionHash `: `DATA`, 32 பைட்டுகள் - பரிவர்த்தனையின் ஹாஷ்.
- `transactionIndex`: `QUANTITY` - பிளாக்கில் உள்ள பரிவர்த்தனைகளின் குறியீட்டு நிலையின் முழு எண்.
- `blockHash`: `DATA`, 32 பைட்டுகள் - இந்தப் பரிவர்த்தனை இருந்த பிளாக்கின் ஹாஷ்.
- `blockNumber`: `QUANTITY` - இந்தப் பரிவர்த்தனை இருந்த பிளாக் எண்.
- `from`: `DATA`, 20 பைட்டுகள் - அனுப்புநரின் முகவரி.
- `to`: `DATA`, 20 பைட்டுகள் - பெறுநரின் முகவரி. இது ஒரு ஒப்பந்த உருவாக்கப் பரிவர்த்தனையாக இருக்கும்போது null.
- `cumulativeGasUsed ` : `QUANTITY ` - பிளாக்கில் இந்தப் பரிவர்த்தனை செயல்படுத்தப்பட்டபோது பயன்படுத்தப்பட்ட மொத்த கேஸின் அளவு.
- `effectiveGasPrice ` : `QUANTITY` - ஒரு யூனிட் கேஸிற்குச் செலுத்தப்பட்ட அடிப்படை கட்டணம் (base fee) மற்றும் டிப் (tip) ஆகியவற்றின் கூடுதல்.
- `gasUsed `: `QUANTITY ` - இந்தக் குறிப்பிட்ட பரிவர்த்தனையால் மட்டுமே பயன்படுத்தப்பட்ட கேஸின் அளவு.
- `contractAddress `: `DATA`, 20 பைட்டுகள் - பரிவர்த்தனை ஒரு ஒப்பந்த உருவாக்கமாக இருந்தால், உருவாக்கப்பட்ட ஒப்பந்த முகவரி, இல்லையெனில் `null`.
- `logs`: `Array` - இந்தப் பரிவர்த்தனை உருவாக்கிய லாக் ஆப்ஜெக்ட்டுகளின் வரிசை.
- `logsBloom`: `DATA`, 256 பைட்டுகள் - லைட் கிளையண்டுகள் (light clients) தொடர்புடைய லாக்ஸை விரைவாக மீட்டெடுப்பதற்கான ப்ளூம் ஃபில்டர்.
- `type`: `QUANTITY` - பரிவர்த்தனை வகையின் முழு எண், மரபுப் (legacy) பரிவர்த்தனைகளுக்கு `0x0`, அணுகல் பட்டியல் (access list) வகைகளுக்கு `0x1`, டைனமிக் கட்டணங்களுக்கு (dynamic fees) `0x2`.

இது _இரண்டில் ஒன்றையும்_ வழங்குகிறது:

- `root` : `DATA` பரிவர்த்தனைக்குப் பிந்தைய ஸ்டேட் ரூட்டின் 32 பைட்டுகள் (பைசான்டியத்திற்கு (Byzantium) முன்)
- `status`: `QUANTITY` `1` (வெற்றி) அல்லது `0` (தோல்வி)

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// முடிவு
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // முகவரி உருவாக்கப்பட்டிருந்தால் அதன் சரம்
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs போன்றவற்றால் வழங்கப்படும் பதிவுகள்
    }],
    "logsBloom": "0x00...0", // 256 பைட் ப்ளூம் வடிகட்டி
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

ஹாஷ் மற்றும் அங்கிள் குறியீட்டு நிலை மூலம் ஒரு பிளாக்கின் அங்கிள் பற்றிய தகவலை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `DATA`, 32 பைட்டுகள் - ஒரு பிளாக்கின் ஹாஷ்.
2. `QUANTITY` - அங்கிளின் குறியீட்டு நிலை.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**திரும்பப் பெறுபவை**
[eth_getBlockByHash](#eth_getblockbyhash) ஐப் பார்க்கவும்

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

முடிவுக்கு [eth_getBlockByHash](#eth_getblockbyhash) ஐப் பார்க்கவும்

**குறிப்பு**: ஒரு அங்கிளில் தனிப்பட்ட பரிவர்த்தனைகள் இருக்காது.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

எண் மற்றும் அங்கிள் குறியீட்டு நிலை மூலம் ஒரு பிளாக்கின் அங்கிள் பற்றிய தகவலை வழங்குகிறது.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  ப்ளேகிரவுண்டில் எண்ட்பாயிண்ட்டை முயல்க
</ButtonLink>

**அளவுருக்கள்**

1. `QUANTITY|TAG` - ஒரு பிளாக் எண், அல்லது `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"` என்ற சரம், [பிளாக் அளவுருவில்](/developers/docs/apis/json-rpc/#block-parameter) உள்ளபடி.
2. `QUANTITY` - அங்கிளின் குறியீட்டு நிலை.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**திரும்பப் பெறுபவை**
[eth_getBlockByHash](#eth_getblockbyhash) ஐப் பார்க்கவும்

**குறிப்பு**: ஒரு அங்கிளில் தனிப்பட்ட பரிவர்த்தனைகள் இருக்காது.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

முடிவுக்கு [eth_getBlockByHash](#eth_getblockbyhash) ஐப் பார்க்கவும்

### eth_newFilter {#eth_newfilter}

ஸ்டேட் மாறும்போது (லாக்ஸ்) அறிவிக்க, ஃபில்டர் விருப்பங்களின் அடிப்படையில் ஒரு ஃபில்டர் ஆப்ஜெக்ட்டை உருவாக்குகிறது.
ஸ்டேட் மாறியுள்ளதா என்பதைச் சரிபார்க்க, [eth_getFilterChanges](#eth_getfilterchanges) ஐ அழைக்கவும்.

**தலைப்பு ஃபில்டர்களைக் (topic filters) குறிப்பிடுவது பற்றிய ஒரு குறிப்பு:**
தலைப்புகள் வரிசையைச் சார்ந்தவை. [A, B] தலைப்புகளைக் கொண்ட லாக் உள்ள ஒரு பரிவர்த்தனை பின்வரும் தலைப்பு ஃபில்டர்களால் பொருத்தப்படும்:

- `[]` "எதுவும்"
- `[A]` "முதல் நிலையில் A (மற்றும் அதன் பிறகு எதுவும்)"
- `[null, B]` "முதல் நிலையில் எதுவும் மற்றும் இரண்டாவது நிலையில் B (மற்றும் அதன் பிறகு எதுவும்)"
- `[A, B]` "முதல் நிலையில் A மற்றும் இரண்டாவது நிலையில் B (மற்றும் அதன் பிறகு எதுவும்)"
- `[[A, B], [A, B]]` "முதல் நிலையில் (A அல்லது B) மற்றும் இரண்டாவது நிலையில் (A அல்லது B) (மற்றும் அதன் பிறகு எதுவும்)"
- **அளவுருக்கள்**

1. `Object` - ஃபில்டர் விருப்பங்கள்:

- `fromBlock`: `QUANTITY|TAG` - (விருப்பத்திற்குரியது, இயல்புநிலை: `"latest"`) முழு எண் பிளாக் எண், அல்லது கடைசியாக முன்மொழியப்பட்ட பிளாக்கிற்கு `"latest"`, சமீபத்திய பாதுகாப்பான பிளாக்கிற்கு `"safe"`, சமீபத்திய இறுதி செய்யப்பட்ட பிளாக்கிற்கு `"finalized"`, அல்லது இன்னும் பிளாக்கில் இல்லாத பரிவர்த்தனைகளுக்கு `"pending"`, `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (விருப்பத்திற்குரியது, இயல்புநிலை: `"latest"`) முழு எண் பிளாக் எண், அல்லது கடைசியாக முன்மொழியப்பட்ட பிளாக்கிற்கு `"latest"`, சமீபத்திய பாதுகாப்பான பிளாக்கிற்கு `"safe"`, சமீபத்திய இறுதி செய்யப்பட்ட பிளாக்கிற்கு `"finalized"`, அல்லது இன்னும் பிளாக்கில் இல்லாத பரிவர்த்தனைகளுக்கு `"pending"`, `"earliest"`.
- `address`: `DATA|Array`, 20 பைட்டுகள் - (விருப்பத்திற்குரியது) ஒப்பந்த முகவரி அல்லது லாக்ஸ் உருவாக வேண்டிய முகவரிகளின் பட்டியல்.
- `topics`: `Array of DATA`, - (விருப்பத்திற்குரியது) 32 பைட்டுகள் `DATA` தலைப்புகளின் வரிசை. தலைப்புகள் வரிசையைச் சார்ந்தவை. ஒவ்வொரு தலைப்பும் "அல்லது" (or) விருப்பங்களைக் கொண்ட DATA இன் வரிசையாகவும் இருக்கலாம்.

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**திரும்பப் பெறுபவை**
`QUANTITY` - ஒரு ஃபில்டர் ஐடி.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

புதிய பிளாக் வரும்போது அறிவிக்க, நோடில் ஒரு ஃபில்டரை உருவாக்குகிறது.
ஸ்டேட் மாறியுள்ளதா என்பதைச் சரிபார்க்க, [eth_getFilterChanges](#eth_getfilterchanges) ஐ அழைக்கவும்.

**அளவுருக்கள்**
ஏதுமில்லை

**திரும்பப் பெறுபவை**
`QUANTITY` - ஒரு ஃபில்டர் ஐடி.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// முடிவு
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

புதிய நிலுவையிலுள்ள பரிவர்த்தனைகள் வரும்போது அறிவிக்க, நோடில் ஒரு ஃபில்டரை உருவாக்குகிறது.
ஸ்டேட் மாறியுள்ளதா என்பதைச் சரிபார்க்க, [eth_getFilterChanges](#eth_getfilterchanges) ஐ அழைக்கவும்.

**அளவுருக்கள்**
ஏதுமில்லை

**திரும்பப் பெறுபவை**
`QUANTITY` - ஒரு ஃபில்டர் ஐடி.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// முடிவு
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

கொடுக்கப்பட்ட ஐடியுடன் ஒரு ஃபில்டரை நிறுவல் நீக்குகிறது (uninstall). கண்காணிப்பு (watch) இனி தேவைப்படாதபோது இது எப்போதும் அழைக்கப்பட வேண்டும்.
கூடுதலாக, ஒரு குறிப்பிட்ட காலத்திற்கு [eth_getFilterChanges](#eth_getfilterchanges) உடன் கோரப்படாதபோது ஃபில்டர்கள் காலாவதியாகிவிடும் (timeout).

**அளவுருக்கள்**

1. `QUANTITY` - ஃபில்டர் ஐடி.

```js
params: [
  "0xb", // 11
]
```

**திரும்பப் பெறுபவை**
`Boolean` - ஃபில்டர் வெற்றிகரமாக நிறுவல் நீக்கப்பட்டால் `true`, இல்லையெனில் `false`.

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// முடிவு
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

ஒரு ஃபில்டருக்கான போலிங் (polling) முறை, இது கடந்த போலுக்குப் (poll) பிறகு நிகழ்ந்த லாக்ஸின் வரிசையை வழங்குகிறது.

**அளவுருக்கள்**

1. `QUANTITY` - ஃபில்டர் ஐடி.

```js
params: [
  "0x16", // 22
]
```

**திரும்பப் பெறுபவை**
`Array` - லாக் ஆப்ஜெக்ட்டுகளின் வரிசை, அல்லது கடந்த போலுக்குப் பிறகு எதுவும் மாறவில்லை என்றால் வெற்று வரிசை.

- `eth_newBlockFilter` உடன் உருவாக்கப்பட்ட ஃபில்டர்களுக்கு, திரும்பப் பெறுபவை பிளாக் ஹாஷ்கள் (`DATA`, 32 பைட்டுகள்), எ.கா., `["0x3454645634534..."]`.
- `eth_newPendingTransactionFilter ` உடன் உருவாக்கப்பட்ட ஃபில்டர்களுக்கு, திரும்பப் பெறுபவை பரிவர்த்தனை ஹாஷ்கள் (`DATA`, 32 பைட்டுகள்), எ.கா., `["0x6345343454645..."]`.
- `eth_newFilter` உடன் உருவாக்கப்பட்ட ஃபில்டர்களுக்கு, லாக்ஸ் பின்வரும் அளவுருக்களைக் கொண்ட ஆப்ஜெக்ட்டுகளாகும்:
  - `removed`: `TAG` - செயின் மறுசீரமைப்பு (chain reorganization) காரணமாக லாக் அகற்றப்பட்டால் `true`. இது சரியான லாக் என்றால் `false`.
  - `logIndex`: `QUANTITY` - பிளாக்கில் உள்ள லாக் குறியீட்டு நிலையின் முழு எண். இது நிலுவையிலுள்ள லாக்காக இருக்கும்போது `null`.
  - `transactionIndex`: `QUANTITY` - லாக் உருவாக்கப்பட்ட பரிவர்த்தனைகளின் குறியீட்டு நிலையின் முழு எண். இது நிலுவையிலுள்ள லாக்காக இருக்கும்போது `null`.
  - `transactionHash`: `DATA`, 32 பைட்டுகள் - இந்த லாக் உருவாக்கப்பட்ட பரிவர்த்தனைகளின் ஹாஷ். இது நிலுவையிலுள்ள லாக்காக இருக்கும்போது `null`.
  - `blockHash`: `DATA`, 32 பைட்டுகள் - இந்த லாக் இருந்த பிளாக்கின் ஹாஷ். இது நிலுவையில் இருக்கும்போது `null`. இது நிலுவையிலுள்ள லாக்காக இருக்கும்போது `null`.
  - `blockNumber`: `QUANTITY` - இந்த லாக் இருந்த பிளாக் எண். இது நிலுவையில் இருக்கும்போது `null`. இது நிலுவையிலுள்ள லாக்காக இருக்கும்போது `null`.
  - `address`: `DATA`, 20 பைட்டுகள் - இந்த லாக் உருவான முகவரி.
  - `data`: `DATA` - மாறுபடும்-நீளமுள்ள குறியிடப்படாத (non-indexed) லாக் தரவு. (_solidity_ இல்: பூஜ்ஜியம் அல்லது அதற்கு மேற்பட்ட 32 பைட்டுகள் குறியிடப்படாத லாக் விவாதங்கள் (arguments).)
  - `topics`: `Array of DATA` - குறியிடப்பட்ட லாக் விவாதங்களின் 0 முதல் 4 வரையிலான 32 பைட்டுகள் `DATA` இன் வரிசை. (_solidity_ இல்: நீங்கள் நிகழ்வை `anonymous` குறிப்பானுடன் (specifier) அறிவித்தாலொழிய, முதல் தலைப்பு நிகழ்வின் கையொப்பத்தின் _ஹாஷ்_ ஆகும் (எ.கா., `Deposit(address,bytes32,uint256)`).)

- **எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// முடிவு
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

கொடுக்கப்பட்ட ஐடியுடன் ஃபில்டரைப் பொருத்தும் அனைத்து லாக்ஸின் வரிசையையும் வழங்குகிறது.

**அளவுருக்கள்**

1. `QUANTITY` - ஃபில்டர் ஐடி.

```js
params: [
  "0x16", // 22
]
```

**திரும்பப் பெறுபவை**
[eth_getFilterChanges](#eth_getfilterchanges) ஐப் பார்க்கவும்

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

முடிவுக்கு [eth_getFilterChanges](#eth_getfilterchanges) ஐப் பார்க்கவும்

### eth_getLogs {#eth_getlogs}

கொடுக்கப்பட்ட ஃபில்டர் ஆப்ஜெக்ட்டைப் பொருத்தும் அனைத்து லாக்ஸின் வரிசையையும் வழங்குகிறது.

**அளவுருக்கள்**

1. `Object` - ஃபில்டர் விருப்பங்கள்:

- `fromBlock`: `QUANTITY|TAG` - (விருப்பத்திற்குரியது, இயல்புநிலை: `"latest"`) முழு எண் பிளாக் எண், அல்லது கடைசியாக முன்மொழியப்பட்ட பிளாக்கிற்கு `"latest"`, சமீபத்திய பாதுகாப்பான பிளாக்கிற்கு `"safe"`, சமீபத்திய இறுதி செய்யப்பட்ட பிளாக்கிற்கு `"finalized"`, அல்லது இன்னும் பிளாக்கில் இல்லாத பரிவர்த்தனைகளுக்கு `"pending"`, `"earliest"`.
- `toBlock`: `QUANTITY|TAG` - (விருப்பத்திற்குரியது, இயல்புநிலை: `"latest"`) முழு எண் பிளாக் எண், அல்லது கடைசியாக முன்மொழியப்பட்ட பிளாக்கிற்கு `"latest"`, சமீபத்திய பாதுகாப்பான பிளாக்கிற்கு `"safe"`, சமீபத்திய இறுதி செய்யப்பட்ட பிளாக்கிற்கு `"finalized"`, அல்லது இன்னும் பிளாக்கில் இல்லாத பரிவர்த்தனைகளுக்கு `"pending"`, `"earliest"`.
- `address`: `DATA|Array`, 20 பைட்டுகள் - (விருப்பத்திற்குரியது) ஒப்பந்த முகவரி அல்லது லாக்ஸ் உருவாக வேண்டிய முகவரிகளின் பட்டியல்.
- `topics`: `Array of DATA`, - (விருப்பத்திற்குரியது) 32 பைட்டுகள் `DATA` தலைப்புகளின் வரிசை. தலைப்புகள் வரிசையைச் சார்ந்தவை. ஒவ்வொரு தலைப்பும் "அல்லது" (or) விருப்பங்களைக் கொண்ட DATA இன் வரிசையாகவும் இருக்கலாம்.
- `blockHash`: `DATA`, 32 பைட்டுகள் - (விருப்பத்திற்குரியது, **எதிர்காலம்**) EIP-234 இன் சேர்க்கையுடன், `blockHash` ஒரு புதிய ஃபில்டர் விருப்பமாக இருக்கும், இது திரும்பப் பெறப்பட்ட லாக்ஸை 32-பைட் ஹாஷ் `blockHash` உடன் ஒற்றைப் பிளாக்கிற்கு மட்டுப்படுத்துகிறது. `blockHash` ஐப் பயன்படுத்துவது `fromBlock` = `toBlock` = `blockHash` ஹாஷைக் கொண்ட பிளாக் எண்ணிற்குச் சமம். ஃபில்டர் அளவுகோல்களில் `blockHash` இருந்தால், `fromBlock` அல்லது `toBlock` இரண்டும் அனுமதிக்கப்படாது.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**திரும்பப் பெறுபவை**
[eth_getFilterChanges](#eth_getfilterchanges) ஐப் பார்க்கவும்

**எடுத்துக்காட்டு**

```js
// கோரிக்கை
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

முடிவுக்கு [eth_getFilterChanges](#eth_getfilterchanges) ஐப் பார்க்கவும்

## பயன்பாட்டு உதாரணம் {#usage-example}

### JSON_RPC ஐப் பயன்படுத்தி ஒரு ஒப்பந்தத்தை நிலைநிறுத்துதல் {#deploying-contract}

RPC இடைமுகத்தை மட்டுமே பயன்படுத்தி ஒரு ஒப்பந்தத்தை எவ்வாறு நிலைநிறுத்துவது என்பதற்கான விளக்கத்தை இந்தப் பகுதி உள்ளடக்கியுள்ளது. இந்தச் சிக்கலைத் தவிர்க்க ஒப்பந்தங்களை நிலைநிறுத்துவதற்கு மாற்று வழிகள் உள்ளன—உதாரணமாக, RPC இடைமுகத்தின் மேல் கட்டமைக்கப்பட்ட [web3.js](https://web3js.readthedocs.io/) மற்றும் [web3.py](https://github.com/ethereum/web3.py) போன்ற நூலகங்களைப் பயன்படுத்துதல். இந்த சுருக்கங்கள் பொதுவாகப் புரிந்துகொள்ள எளிதானவை மற்றும் குறைவான பிழைகள் ஏற்படக்கூடியவை, ஆனால் பின்னணியில் என்ன நடக்கிறது என்பதைப் புரிந்துகொள்வது இன்னும் உதவியாக இருக்கும்.

பின்வருவது `Multiply7` எனப்படும் நேரடியான ஸ்மார்ட் ஒப்பந்தமாகும், இது JSON-RPC இடைமுகத்தைப் பயன்படுத்தி Ethereum முனையில் நிலைநிறுத்தப்படும். படிப்பவர் ஏற்கனவே Geth முனையை இயக்குகிறார் என்று இந்த வழிகாட்டி கருதுகிறது. முனைகள் மற்றும் கிளையண்டுகள் பற்றிய கூடுதல் தகவல்கள் [இங்கே](/developers/docs/nodes-and-clients/run-a-node) கிடைக்கின்றன. Geth அல்லாத கிளையண்டுகளுக்கு HTTP JSON-RPC ஐ எவ்வாறு தொடங்குவது என்பதைப் பார்க்க, தனிப்பட்ட [கிளையண்ட்](/developers/docs/nodes-and-clients/) ஆவணங்களைப் பார்க்கவும். பெரும்பாலான கிளையண்டுகள் இயல்புநிலையாக `localhost:8545` இல் சேவை செய்கின்றன.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

முதலில் செய்ய வேண்டியது HTTP RPC இடைமுகம் இயக்கப்பட்டிருப்பதை உறுதிசெய்வதாகும். இதன் பொருள் தொடக்கத்தின் போது Geth-க்கு `--http` கொடியை வழங்குகிறோம். இந்த எடுத்துக்காட்டில், தனிப்பட்ட மேம்பாட்டுச் சங்கிலியில் Geth முனையைப் பயன்படுத்துகிறோம். இந்த அணுகுமுறையைப் பயன்படுத்துவதன் மூலம் உண்மையான நெட்வொர்க்கில் நமக்கு ஈதர் தேவையில்லை.

```bash
geth --http --dev console 2>>geth.log
```

இது `http://localhost:8545` இல் HTTP RPC இடைமுகத்தைத் தொடங்கும்.

[curl](https://curl.se) ஐப் பயன்படுத்தி காயின்பேஸ் முகவரியை (கணக்குகளின் வரிசையிலிருந்து முதல் முகவரியைப் பெறுவதன் மூலம்) மற்றும் இருப்பை மீட்டெடுப்பதன் மூலம் இடைமுகம் இயங்குகிறதா என்பதை நாம் சரிபார்க்கலாம். இந்த எடுத்துக்காட்டுகளில் உள்ள தரவு உங்கள் உள்ளூர் முனையில் மாறுபடும் என்பதை நினைவில் கொள்ளவும். இந்த கட்டளைகளை நீங்கள் முயற்சிக்க விரும்பினால், இரண்டாவது curl கோரிக்கையில் உள்ள கோரிக்கை அளவுருக்களை முதலாவதிலிருந்து பெறப்பட்ட முடிவைக் கொண்டு மாற்றவும்.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

எண்கள் ஹெக்ஸ் குறியாக்கம் செய்யப்பட்டிருப்பதால், இருப்பு wei இல் ஹெக்ஸ் சரமாக வழங்கப்படுகிறது. ஈதரில் உள்ள இருப்பை ஒரு எண்ணாகப் பெற விரும்பினால், Geth கன்சோலில் இருந்து web3 ஐப் பயன்படுத்தலாம்.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

இப்போது நமது தனிப்பட்ட மேம்பாட்டுச் சங்கிலியில் சில ஈதர்கள் இருப்பதால், நாம் ஒப்பந்தத்தை நிலைநிறுத்தலாம். முதல் படி Multiply7 ஒப்பந்தத்தை EVM-க்கு அனுப்பக்கூடிய பைட் குறியீடாகத் தொகுப்பதாகும். Solidity கம்பைலரான solc ஐ நிறுவ, [Solidity ஆவணங்களை](https://docs.soliditylang.org/en/latest/installing-solidity.html) பின்பற்றவும். ([எங்கள் எடுத்துக்காட்டிற்குப் பயன்படுத்தப்பட்ட கம்பைலரின் பதிப்போடு](https://github.com/ethereum/solidity/releases/tag/v0.4.20) பொருந்துவதற்கு பழைய `solc` வெளியீட்டை நீங்கள் பயன்படுத்த விரும்பலாம்.)

அடுத்த படி Multiply7 ஒப்பந்தத்தை EVM-க்கு அனுப்பக்கூடிய பைட் குறியீடாகத் தொகுப்பதாகும்.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

இப்போது தொகுக்கப்பட்ட குறியீடு நம்மிடம் இருப்பதால், அதை நிலைநிறுத்துவதற்கு எவ்வளவு எரிவாயு செலவாகும் என்பதை நாம் தீர்மானிக்க வேண்டும். RPC இடைமுகத்தில் `eth_estimateGas` முறை உள்ளது, இது நமக்கு ஒரு மதிப்பீட்டை வழங்கும்.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

இறுதியாக ஒப்பந்தத்தை நிலைநிறுத்தவும்.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

பரிவர்த்தனை முனையால் ஏற்றுக்கொள்ளப்பட்டு பரிவர்த்தனை ஹாஷ் வழங்கப்படுகிறது. பரிவர்த்தனையைக் கண்காணிக்க இந்த ஹாஷைப் பயன்படுத்தலாம். அடுத்த படி நமது ஒப்பந்தம் நிலைநிறுத்தப்பட்டுள்ள முகவரியைத் தீர்மானிப்பதாகும். செயல்படுத்தப்பட்ட ஒவ்வொரு பரிவர்த்தனையும் ஒரு ரசீதை உருவாக்கும். இந்த ரசீதில் பரிவர்த்தனை எந்தத் தொகுதியில் சேர்க்கப்பட்டுள்ளது மற்றும் EVM ஆல் எவ்வளவு எரிவாயு பயன்படுத்தப்பட்டது போன்ற பரிவர்த்தனை பற்றிய பல்வேறு தகவல்கள் உள்ளன. ஒரு பரிவர்த்தனை
ஒரு ஒப்பந்தத்தை உருவாக்கினால், அதில் ஒப்பந்த முகவரியும் இருக்கும். `eth_getTransactionReceipt` RPC முறையின் மூலம் ரசீதை நாம் மீட்டெடுக்கலாம்.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

நமது ஒப்பந்தம் `0x4d03d617d700cf81935d7f797f4e2ae719648262` இல் உருவாக்கப்பட்டது. ரசீதுக்குப் பதிலாக பூஜ்ய முடிவு வந்தால், பரிவர்த்தனை இன்னும் ஒரு தொகுதியில் சேர்க்கப்படவில்லை என்று அர்த்தம். சிறிது நேரம் காத்திருந்து, உங்கள் கருத்தொற்றுமை கிளையண்ட் இயங்குகிறதா என்று சரிபார்த்து மீண்டும் முயற்சிக்கவும்.

#### ஸ்மார்ட் ஒப்பந்தங்களுடன் தொடர்புகொள்ளுதல் {#interacting-with-smart-contract}

இந்த எடுத்துக்காட்டில், ஒப்பந்தத்தின் `multiply` முறைக்கு `eth_sendTransaction` ஐப் பயன்படுத்தி ஒரு பரிவர்த்தனையை அனுப்புவோம்.

`eth_sendTransaction` க்கு பல வாதங்கள் தேவை, குறிப்பாக `from`, `to` மற்றும் `data`. `From` என்பது நமது கணக்கின் பொது முகவரி, மற்றும் `to` என்பது ஒப்பந்த முகவரி. `data` வாதம் எந்த முறையை அழைக்க வேண்டும் மற்றும் எந்த வாதங்களுடன் அழைக்க வேண்டும் என்பதை வரையறுக்கும் பேலோடைக் கொண்டுள்ளது. இங்குதான் [ABI (பயன்பாட்டு பைனரி இடைமுகம்)](https://docs.soliditylang.org/en/latest/abi-spec.html) செயல்படுகிறது. ABI என்பது EVM-க்கான தரவை எவ்வாறு வரையறுப்பது மற்றும் குறியாக்கம் செய்வது என்பதை வரையறுக்கும் JSON கோப்பாகும்.

பேலோடின் பைட்டுகள் ஒப்பந்தத்தில் எந்த முறை அழைக்கப்படுகிறது என்பதை வரையறுக்கிறது. இது செயல்பாட்டின் பெயர் மற்றும் அதன் வாத வகைகளின் மீதான Keccak ஹாஷிலிருந்து முதல் 4 பைட்டுகள் ஆகும், இது ஹெக்ஸ் குறியாக்கம் செய்யப்பட்டது. multiply செயல்பாடு uint ஐ ஏற்றுக்கொள்கிறது, இது uint256 க்கான மாற்றுப் பெயராகும். இது நமக்கு இதை வழங்குகிறது:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

அடுத்த படி வாதங்களை குறியாக்கம் செய்வதாகும். ஒரே ஒரு uint256 மட்டுமே உள்ளது, அதாவது மதிப்பு 6. uint256 வகைகளை எவ்வாறு குறியாக்கம் செய்வது என்பதைக் குறிப்பிடும் ஒரு பகுதி ABI இல் உள்ளது.

`int<M>: enc(X)` என்பது X இன் பிக்-எண்டியன் டூஸ் காம்ப்ளிமெண்ட் குறியாக்கமாகும், இது எதிர்மறை X க்கு 0xff உடனும், நேர்மறை X க்கு பூஜ்ஜிய பைட்டுகளுடனும் உயர்-வரிசை (இடது) பக்கத்தில் நிரப்பப்படுகிறது, இதனால் நீளம் 32 பைட்டுகளின் மடங்காக இருக்கும்.

இது `0000000000000000000000000000000000000000000000000000000000000006` என குறியாக்கம் செய்யப்படுகிறது.

செயல்பாட்டுத் தேர்வி மற்றும் குறியாக்கம் செய்யப்பட்ட வாதத்தை இணைத்தால் நமது தரவு `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006` ஆக இருக்கும்.

இதை இப்போது முனைக்கு அனுப்பலாம்:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

ஒரு பரிவர்த்தனை அனுப்பப்பட்டதால், ஒரு பரிவர்த்தனை ஹாஷ் வழங்கப்பட்டது. ரசீதை மீட்டெடுப்பது இதை வழங்குகிறது:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

ரசீதில் ஒரு பதிவு (log) உள்ளது. இந்த பதிவு பரிவர்த்தனை செயலாக்கத்தின் போது EVM ஆல் உருவாக்கப்பட்டு ரசீதில் சேர்க்கப்பட்டது. `multiply` செயல்பாடு `Print` நிகழ்வு உள்ளீட்டை 7 ஆல் பெருக்கி எழுப்பப்பட்டதைக் காட்டுகிறது. `Print` நிகழ்விற்கான வாதம் uint256 ஆக இருந்ததால், ABI விதிகளின்படி அதை நாம் டிகோட் செய்யலாம், இது நமக்கு எதிர்பார்க்கப்படும் தசம 42 ஐ வழங்கும். தரவைத் தவிர, எந்த நிகழ்வு பதிவை உருவாக்கியது என்பதைத் தீர்மானிக்க தலைப்புகளைப் (topics) பயன்படுத்தலாம் என்பது குறிப்பிடத்தக்கது:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

இது மிகவும் பொதுவான சில பணிகளுக்கான சுருக்கமான அறிமுகமாகும், இது JSON-RPC இன் நேரடி பயன்பாட்டை விளக்குகிறது.

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [JSON-RPC விவரக்குறிப்பு](http://www.jsonrpc.org/specification)
- [முனைகள் மற்றும் கிளையண்டுகள்](/developers/docs/nodes-and-clients/)
- [ஜாவாஸ்கிரிப்ட் APIகள்](/developers/docs/apis/javascript/)
- [பின்தள APIகள்](/developers/docs/apis/backend/)
- [செயலாக்க கிளையண்டுகள்](/developers/docs/nodes-and-clients/#execution-clients)