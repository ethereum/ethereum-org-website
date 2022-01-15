---
title: ഗോ ഡവലപ്പർമാർക്കുള്ള Ethereum
description: ഗോ അടിസ്ഥാനമാക്കിയുള്ള പ്രോജക്റ്റുകളും ടൂളിംഗും ഉപയോഗിച്ച് Ethereum-നായി എങ്ങനെ വികസിപ്പിക്കാമെന്ന് മനസിലാക്കുക
lang: ml
sidebar: true
---

# ഗോ ഡവലപ്പർമാർക്കുള്ള Ethereum {#ethereum-for-go-devs}

<div class="featured">ഗോ അടിസ്ഥാനമാക്കിയുള്ള പ്രോജക്റ്റുകളും ടൂളിംഗും ഉപയോഗിച്ച് Ethereum-നായി എങ്ങനെ വികസിപ്പിക്കാമെന്ന് മനസിലാക്കുക</div><br/>

ക്രിപ്‌റ്റോകറൻസിയുടെയും ബ്ലോക്ക്‌ചെയിൻ സാങ്കേതികവിദ്യയുടെയും ഗുണങ്ങള്‍ പ്രയോജനപ്പെടുത്തുന്ന വികേന്ദ്രീകൃത ആപ്ലിക്കേഷനുകൾ (അല്ലെങ്കില്‍ "ഡാപ്പുകൾ") സൃഷ്ടിക്കാൻ Ethereum ഉപയോഗിക്കുക. അവ വിശ്വസനീയമാകാം, അതായത് അവ Ethereum-ലേക്ക് “അപ്‌ലോഡ്” ചെയ്യപ്പെട്ടുകഴിഞ്ഞാൽ, അവ എല്ലായ്പ്പോഴും പ്രോഗ്രാം ചെയ്തതുപോലെ പ്രവർത്തിക്കും. പുതിയ തരം സാമ്പത്തിക അപ്ലിക്കേഷനുകൾ സൃഷ്ടിക്കുന്നതിന് അവർക്ക് ഡിജിറ്റൽ അസറ്റുകൾ നിയന്ത്രിക്കാൻ കഴിയും. അവയെ വികേന്ദ്രീകരിക്കാൻ കഴിയും, അതായത് ഒരൊറ്റ സ്ഥാപനമോ വ്യക്തിയോ അവയെ നിയന്ത്രിക്കുന്നില്ല, സെൻസർ ചെയ്യുന്നത് ഏതാണ്ട് അസാധ്യമാണ്.

<img src="https://i.imgur.com/MFg8Nop.png" width="100%" />

## സ്മാർട്ട് കരാറുകളും സോളിഡിറ്റി ഭാഷയും ഉപയോഗിച്ച് ആരംഭിക്കുക {#getting-started-with-smart-contracts-and-solidity}

**ഗോ Ethereum-വുമായി സംയോജിപ്പിക്കുന്നതിന് നിങ്ങളുടെ ആദ്യ ഘട്ടങ്ങൾ കൈക്കൊള്ളുക**

ആദ്യം കൂടുതൽ അടിസ്ഥാന പ്രൈമർ ആവശ്യമുണ്ടോ? [ ethereum.org/learn ](/ml/learn/) അല്ലെങ്കിൽ [ ethereum.org/developers ](/ml/developers/) പരിശോധിക്കുക.

- [ബ്ലോക്ക്ചെയിൻ വിവരണം](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [സ്മാർട്ട് കോൺട്രാക്ടിനെപ്പറ്റി മനസ്സിലാക്കല്‍](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [നിങ്ങളുടെ ആദ്യത്തെ സ്മാർട്ട് കോൺട്രാക്ട് എഴുതാം](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [സോളിഡിറ്റി കംപൈൽ ചെയ്യുന്നതും വിന്യസിക്കുന്നതും എങ്ങനെയെന്ന് അറിയുക](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [കരാർ ട്യൂട്ടോറിയൽ](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## തുടക്കക്കാരനുള്ള ലേഖനങ്ങളും പുസ്തകങ്ങളും {#beginner-articles-and-books}

- [ഒരു Ethereum ക്ലയന്‍റിനെ തിരഞ്ഞെടുക്കുന്നത്](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [ഗെത്ത് ഉപയോഗിച്ച് ആരംഭിക്കുക](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Ethereum-ലേക്ക് കണക്റ്റുചെയ്യാൻ ഗോളാങ് ഉപയോഗിക്കുക](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [ഗോലാംഗ് ഉപയോഗിച്ച് Ethereum സ്മാർട്ട് കരാറുകൾ വിന്യസിക്കുക](https://www.youtube.com/watch?v=pytGqQmDslE)
- [ഗോയില്‍ Ethereum സ്മാർട്ട് കരാറുകൾ പരീക്ഷിക്കുന്നതിനും വിന്യസിക്കുന്നതിനുമുള്ള ഒരു ഘട്ടം ഘട്ടമായുള്ള ഗൈഡ്](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [ ഇബുക്ക്: ഗോ ഉപയോഗിച്ച് Ethereum വികസനം ](https://goethereumbook.org/) - _ ഗോ ഉപയോഗിച്ച് Ethereum അപ്ലിക്കേഷനുകൾ വികസിപ്പിക്കുക _

## ഇന്റർമീഡിയറ്റ് ലേഖനങ്ങളും ഡോക്സും {#intermediate-articles-and-docs}

- [ ഗോ Ethereum ഡോക്യുമെന്റേഷന്‍ ](https://geth.ethereum.org/docs/) - _ ഔദ്യോഗിക Ethereum ഗോളാങിനായുള്ള ഡോക്യുമെന്റേഷൻ_
- [ഗോ Ethereum ഗോഡോക്](https://godoc.org/github.com/ethereum/go-ethereum)
- [ഗെത് ഉപയോഗിച്ച് ഗോ-യിൽ ഒരു DApp സൃഷ്ടിക്കുന്നു](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [ഗോലാങും ഗെത്തും ഉപയോഗിച്ച് Ethereum പ്രൈവറ്റ് നെറ്റ്‌വർക്കിൽ പ്രവർത്തിക്കുക](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [ഗോ ഉപയോഗിച്ച് Ethereum-ലെ സോളിഡിറ്റി കരാറുകളുടെ യൂണിറ്റ് പരിശോധന](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)

## നൂതന ഉപയോഗ പാറ്റേണുകൾ {#advanced-use-patterns}

- [ഗെത് സിമുലേറ്റഡ് ബാക്കെൻഡ്](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Ethereum, കോറം എന്നിവ ഉപയോഗിച്ച് ഒരു സേവന അപ്ലിക്കേഷനുകളായി ബ്ലോക്ക്‌ചെയിൻ](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Ethereum ബ്ലോക്ക്‌ചെയിൻ അപ്ലിക്കേഷനുകളിൽ വിതരണം ചെയ്ത സംഭരണം IPFS, സ്വാം എന്നിവ](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [മൊബൈൽ ക്ലയന്റുകൾ: ലൈബ്രറികളും ഇൻ‌പ്രോക്ക് Ethereum നോഡുകളും](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [നേറ്റീവ് ടാപ്പ്സ്: Ethereum കരാറുകളിലേക്കുള്ള ഗോ ബൈന്‍ഡിംഗുകള്‍](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## ഗോ പ്രോജക്റ്റുകളും ഉപകരണങ്ങളും {#go-projects-and-tools}

- [ ഗെത്ത് / ഗോ Ethereum ](https://github.com/ethereum/go-ethereum) - _ Ethereum പ്രോട്ടോക്കോളിന്റെ Go ഔദ്യോഗിക നടപ്പാക്കൽ _
- [ ഗോ Ethereum കോഡ് വിശകലനം ](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _ ഗോ Ethereum ഉറവിട കോഡിന്‍റെ അവലോകനവും വിശകലനവും _
- [ ഗോലെം ](https://github.com/golemfactory/golem) - _ കമ്പ്യൂട്ടിംഗ് പവറിനായി ഗോലെം ഒരു ആഗോള വിപണി സൃഷ്ടിക്കുന്നു _
- [ കോറം ](https://github.com/jpmorganchase/quorum) - _ Ethereum പിന്തുണയ്ക്കുന്ന ഡാറ്റാ സ്വകാര്യതയുടെ ഒരു അനുവദനീയമായ നടപ്പാക്കൽ _
- [ പ്രിസം ](https://github.com/prysmaticlabs/prysm) - _ Ethereum 'സെറീനിറ്റി' 2.0 ഗോ നടപ്പിലാക്കല്‍ _
- [ എത്ത് ട്വീറ്റ് ](https://github.com/yep/eth-tweet) - _ വികേന്ദ്രീകൃത Twitter: Ethereum ബ്ലോക്ക്ചെയിനിൽ പ്രവർത്തിക്കുന്ന മൈക്രോബ്ലോഗിംഗ് സേവനം _
- [ പ്ലാസ്മ MVP ഗോലാംഗ് ](https://github.com/kyokan/plasma) - _ ഗോലാംഗ് നടപ്പാക്കലും മിനിമം വയബിള്‍ പ്ലാസ്മ സ്‌പെസിഫിക്കേഷന്റെ വിപുലീകരണവും _
- [ ഓപ്പൺ Ethereum മൈനിംഗ് പൂൾ ](https://github.com/sammy007/open-ethereum-pool) - _ ഒരു ഓപ്പൺ സോഴ്‌സ് Ethereum മൈനിംഗ് പൂൾ _
- [ Ethereum HD വാലറ്റ് ](https://github.com/miguelmota/go-ethereum-hdwallet) - _ ഗോയിലെ Ethereum HD വാലറ്റ് ഡെറിവേറ്റേഷനുകൾ _
- [ മൾട്ടി ഗെത്ത് ](https://github.com/multi-geth/multi-geth) - _ പലതരം Ethereum നെറ്റ്‌വർക്കുകൾക്കുള്ള പിന്തുണ _
- [ Geth Light Client ](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _ ലൈറ്റ് Ethereum സബ്പ്രോട്ടോകോളിന്‍റെ Geth നടപ്പാക്കൽ _

കൂടുതൽ ഉറവിടങ്ങൾക്കായി തിരയുകയാണോ? [ ethereum.org/developers. ](/ml/developers/) പരിശോധിക്കുക

## ഗോ കമ്മ്യൂണിറ്റി സംഭാവകർ {#go-community-contributors}

- [ഗെത്ത് ഡിസ്കോർഡ്](https://discordapp.com/invite/nthXNEv)
- [ഗെത്ത് ജിസ്റ്റ്](https://gitter.im/ethereum/go-ethereum)
- [ ഗോഫേഴ്സ് സ്ലാക്ക് ](https://invite.slack.golangbridge.org/) - [ # ethereum ചാനൽ ](https://https:/gophers.slack.com/messages/C9HP1S9V2)
- [സ്റ്റാക്ക് എക്സ്ചേഞ്ച് - Ethereum](https://ethereum.stackexchange.com/)
- [മൾട്ടി ഗെത്ത് ജിറ്റര്‍](https://gitter.im/ethoxy/multi-geth)
- [Ethereum ജിറ്റെർ](https://gitter.im/ethereum/home)
- [ഗെത്ത് ലൈറ്റ് ക്ലയൻറ് എഡിറ്റർ](https://gitter.im/ethereum/light-client)

## മറ്റ് മൊത്തം ലിസ്റ്റുകൾ {#other-aggregated-lists}

- [ആകർഷണീയമായ Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [ കോണ്‍സെന്‍സിസ്: Ethereum ഡവലപ്പർ ഉപകരണങ്ങളുടെ നിർ‌ണ്ണായക പട്ടിക ](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [ GitHub ഉറവിടം ](https://github.com/ConsenSys/ethereum-developer-tools-list)
