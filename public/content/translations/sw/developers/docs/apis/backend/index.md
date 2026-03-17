---
title: Maktaba za API za Backend
description: Utangulizi wa API za mteja wa Ethereum zinazokuruhusu kuingiliana na mnyororo wa bloku kutoka kwenye programu yako.
lang: sw
---

Ili programu ya kompyuta iweze kuingiliana na mnyororo wa bloku wa Ethereum (yaani, kusoma data ya mnyororo wa bloku na/au kutuma miamala kwenye mtandao), ni lazima iunganishwe na nodi ya Ethereum.

Kwa kusudi hili, kila mteja wa Ethereum hutekeleza vipimo vya [JSON-RPC](/developers/docs/apis/json-rpc/), kwa hivyo kuna seti sare ya [njia](/developers/docs/apis/json-rpc/#json-rpc-methods) ambazo programu zinaweza kutegemea.

Ikiwa unataka kutumia lugha maalum ya programu kuungana na nodi ya Ethereum, kuna maktaba nyingi za kurahisisha ndani ya mfumo ikolojia ambazo hurahisisha hili zaidi. Kwa maktaba hizi, wasanidi programu wanaweza kuandika njia angavu, za mstari mmoja ili kuanzisha maombi ya JSON-RPC (chini ya pazia) yanayoingiliana na Ethereum.

## Mahitaji ya awali {#prerequisites}

Inaweza kusaidia kuelewa [mkusanyiko wa Ethereum](/developers/docs/ethereum-stack/) na [wateja wa Ethereum](/developers/docs/nodes-and-clients/).

## Kwa nini utumie maktaba? {#why-use-a-library}

Maktaba hizi hurahisisha sehemu kubwa ya utata wa kuingiliana moja kwa moja na nodi ya Ethereum. Pia hutoa kazi za matumizi (k.m., kubadilisha ETH kwenda Gwei) hivyo kama msanidi programu unaweza kutumia muda mfupi kushughulikia ugumu wa wateja wa Ethereum na muda mwingi zaidi kulenga utendaji wa kipekee wa programu yako.

## Maktaba zinazopatikana {#available-libraries}

### Miundombinu na huduma za nodi {#infrastructure-and-node-services}

**Alchemy -** **_Jukwaa la Maendeleo la Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Nyaraka](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Nodi-kama-Huduma._**

- [All That Node.com](https://www.allthatnode.com/)
- [Nyaraka](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_API zilizogatuliwa za Mtandao Mkuu wa Ethereum na Testnet._**

- [blastapi.io](https://blastapi.io/)
- [Nyaraka](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Hutoa huduma za RPC zenye ufanisi na kasi zaidi_**

- [blockpi.io](https://blockpi.io/)
- [Nyaraka](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Lango la Cloudflare Ethereum.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Kichunguzi cha Bloku na API za Miamala**

- [Nyaraka](https://docs.etherscan.io/)

**Blockscout - Kichunguzi cha Bloku cha Chanzo Huria**

- [Nyaraka](https://docs.blockscout.com/)

**GetBlock-** **_Blockchain-kama-huduma kwa ajili ya maendeleo ya Web3_**

- [GetBlock.io](https://getblock.io/)
- [Nyaraka](https://docs.getblock.io/)

**Infura -** **_API ya Ethereum kama huduma._**

- [infura.io](https://infura.io)
- [Nyaraka](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Mtoa huduma wa EVM JSON-RPC wa gharama nafuu_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Nyaraka](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Nodi Kamili na Vichunguzi vya Bloku._**

- [NOWNodes.io](https://nownodes.io/)
- [Nyaraka](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Miundombinu ya Blockchain kama Huduma._**

- [quicknode.com](https://quicknode.com)
- [Nyaraka](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_API za Ethereum na Ethereum Classic kama huduma zinazoendeshwa na programu ya chanzo huria._**

- [rivet.cloud](https://rivet.cloud)
- [Nyaraka](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nodi za Ethereum zinazozingatia kasi kama API ya JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Nyaraka](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Zana za maendeleo {#development-tools}

**ethers-kt -** **_Maktaba ya Async, ya utendaji wa juu ya Kotlin/Java/Android kwa minyororo ya bloku inayotumia EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Mifano](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Maktaba ya chanzo huria ya .NET ya kuunganisha kwa ajili ya blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Nyaraka](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Zana za Python -** **_Aina mbalimbali za maktaba kwa ajili ya mwingiliano wa Ethereum kupitia Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [GitHub ya web3.py](https://github.com/ethereum/web3.py)
- [Gumzo la web3.py](https://gitter.im/ethereum/web3.py)

**Tatum -** **_Jukwaa bora kabisa la maendeleo ya blockchain._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Nyaraka](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Maktaba ya kuunganisha ya Java/Android/Kotlin/Scala kwa ajili ya Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Nyaraka](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Huduma za Blockchain {#blockchain-services}

**BlockCypher -** **_API za Wavuti za Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Nyaraka](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Miundombinu ya data ya web3 yote kwa moja kwa ajili ya Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Nyaraka](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nodi za Ethereum zenye kunyumbulika na maalum kama huduma._**

- [chainstack.com](https://chainstack.com)
- [Nyaraka](https://docs.chainstack.com/)
- [Rejeleo la API ya Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Nodi ya Wingu ya Coinbase -** **_API ya Miundombinu ya Blockchain._**

- [Nodi ya Wingu ya Coinbase](https://www.coinbase.com/developer-platform)
- [Nyaraka](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_Huduma za API za Web3 pamoja na Mtandao Mkuu wa Ethereum na testnet._**

- [DataHub](https://www.figment.io/)
- [Nyaraka](https://docs.figment.io/)

**Moralis -** **_Mtoa Huduma wa API wa EVM wa Kiwango cha Biashara._**

- [moralis.io](https://moralis.io)
- [Nyaraka](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Jukwaa](https://forum.moralis.io/)

**NFTPort -** **_Data za Ethereum na API za Mint._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Nyaraka](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Jukwaa la Jumla la API za Blockchain za Sarafu-Crypto Nyingi._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Nyaraka](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Hutoa ufikiaji rahisi na wa kuaminika wa API kwa blockchain ya Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Nyaraka](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_API za blockchain zilizoboreshwa kwa Minyororo 200+._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Nyaraka](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Masomo zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Nodi na wateja](/developers/docs/nodes-and-clients/)
- [Mifumo ya uundaji](/developers/docs/frameworks/)

## Mafunzo yanayohusiana {#related-tutorials}

- [Sanidi Web3js kutumia blockchain ya Ethereum katika JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Maagizo ya kusanidi web3.js katika mradi wako._
- [Kuita mkataba-erevu kutoka JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Kwa kutumia tokeni ya DAI, ona jinsi ya kuita kazi za mikataba kwa kutumia JavaScript._
