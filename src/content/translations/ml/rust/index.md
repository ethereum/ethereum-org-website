---
title: റസ്റ്റ് ഡവലപ്പർമാർക്കുള്ള Ethereum
description: റസ്റ്റ് അടിസ്ഥാനമാക്കിയുള്ള പ്രോജക്റ്റുകളും ടൂളിംഗും ഉപയോഗിച്ച് Ethereum-നായി എങ്ങനെ വികസിപ്പിക്കാമെന്ന് മനസിലാക്കുക
lang: ml
sidebar: true
---

# റസ്റ്റ് ഡവലപ്പർമാർക്കുള്ള Ethereum {#ethereum-for-rust-devs}

<div class="featured">റസ്റ്റ് അടിസ്ഥാനമാക്കിയുള്ള പ്രോജക്റ്റുകളും ടൂളിംഗും ഉപയോഗിച്ച് Ethereum-നായി എങ്ങനെ വികസിപ്പിക്കാമെന്ന് മനസിലാക്കുക</div><br/>

ക്രിപ്‌റ്റോകറൻസിയുടെയും ബ്ലോക്ക്‌ചെയിൻ സാങ്കേതികവിദ്യയുടെയും ഗുണങ്ങള്‍ പ്രയോജനപ്പെടുത്തുന്ന വികേന്ദ്രീകൃത അപ്ലിക്കേഷനുകൾ (അല്ലെങ്കില്‍ "ഡാപ്പുകൾ") സൃഷ്ടിക്കാൻ Ethereum ഉപയോഗിക്കുക. ഈ ഡാപ്പുകൾ വിശ്വസനീയമാകാം, അതായത് Ethereum-ലേക്ക് വിന്യസിച്ചുകഴിഞ്ഞാൽ, അവ എല്ലായ്പ്പോഴും പ്രോഗ്രാം ചെയ്തതുപോലെ പ്രവർത്തിക്കും. പുതിയ തരം സാമ്പത്തിക അപ്ലിക്കേഷനുകൾ സൃഷ്ടിക്കുന്നതിന് അവയ്ക്ക് ഡിജിറ്റൽ അസറ്റുകൾ നിയന്ത്രിക്കാൻ കഴിയും. അവയെ വികേന്ദ്രീകരിക്കാൻ കഴിയും, അതായത് ഒരൊറ്റ സ്ഥാപനമോ വ്യക്തിയോ അവയെ നിയന്ത്രിക്കുന്നില്ല, സെൻസർ ചെയ്യുന്നത് ഏതാണ്ട് അസാധ്യമാണ്.

## സ്മാർട്ട് കരാറുകളും സോളിഡിറ്റി ഭാഷയും ഉപയോഗിച്ച് ആരംഭിക്കുക {#getting-started-with-smart-contracts-and-solidity}

**റസ്റ്റിനെ Ethereum-വുമായി സംയോജിപ്പിക്കുന്നതിന് നിങ്ങളുടെ ആദ്യ ഘട്ടങ്ങൾ കൈക്കൊള്ളുക**

ആദ്യം കൂടുതൽ അടിസ്ഥാന പ്രൈമർ ആവശ്യമുണ്ടോ? [ ethereum.org/learn ](/ml/learn/) അല്ലെങ്കിൽ [ ethereum.org/developers ](/ml/developers/) പരിശോധിക്കുക.

- [ബ്ലോക്ക്ചെയിൻ വിവരണം](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [സ്മാർട്ട് കോൺട്രാക്ട്നെ പറ്റി മനസ്സിലാക്കുന്നു](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [നിങ്ങളുടെ ആദ്യത്തെ സ്മാർട്ട് കോൺട്രാക്ട് എഴുതാം](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [സോളിഡിറ്റി കംപൈൽ ചെയ്യുന്നതും വിന്യസിക്കുന്നതും എങ്ങനെയെന്ന് അറിയുക](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## തുടക്കക്കാരന്റെ ലേഖനങ്ങൾ {#beginner-articles}

- [ഒരു Ethereum ക്ലയന്‍റിനെ തിരഞ്ഞെടുക്കുന്നത്](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [റസ്റ്റ് Ethereum ക്ലയൻറ്](https://wiki.parity.io/Setup)
- [റസ്റ്റ് ഉപയോഗിച്ച് Ethereum-ലേക്ക് ഇടപാട് അയയ്ക്കുന്നു](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [പാരിറ്റി Ethereum ക്ലയന്റുമായുള്ള സ്മാർട്ട് കരാറുകളുടെ ഒരു ആമുഖം](https://wiki.parity.io/Smart-Contracts)
- [നിങ്ങളുടെ ഒയാസിസ് SDK dev പരിസ്ഥിതി സജ്ജമാക്കുന്നു](https://docs.oasis.dev/oasis-sdk/guide/getting-started)
- [കോവന് വേണ്ടി റസ്ര്റ് വാസമില്‍ എങ്ങനെ കരാറുകൾ എഴുതാം എന്നതിനെക്കുറിച്ചുള്ള ഒരു ഘട്ടം ഘട്ടമായുള്ള ട്യൂട്ടോറിയൽ](https://github.com/paritytech/pwasm-tutorial)

## ഇന്റർമീഡിയറ്റ് ലേഖനങ്ങൾ {#intermediate-articles}

- [റസ്റ്റ്-വെബ് 3 ഡോക്യുമെന്റേഷൻ](https://tomusdrw.github.io/rust-web3/web3/index.html)
- [റസ്റ്റ്-വെബ് 3 പ്രവർത്തന ഉദാഹരണങ്ങൾ](https://github.com/tomusdrw/rust-web3/blob/master/examples)

## നൂതന ഉപയോഗ പാറ്റേണുകൾ {#advanced-use-patterns}

- [എതിരെയും പോലുള്ള നെറ്റ്‌വർക്കുമായി സംവദിക്കുന്നതിന് pwasm_ethereum ബാഹ്യ ലൈബ്രറി](https://github.com/openethereum/pwasm-ethereum)
- [ജാവാസ്ക്രിപ്റ്റും റസ്റ്റും ഉപയോഗിച്ച് വികേന്ദ്രീകൃത ചാറ്റ് നിർമ്മിക്കുക](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Vue.js & Rust ഉപയോഗിച്ച് വികേന്ദ്രീകൃത ടോഡോ അപ്ലിക്കേഷൻ നിർമ്മിക്കുക ](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)
- [എനിഗ്മ ഉപയോഗിച്ച് ആരംഭിക്കുക - റസ്റ്റ് പ്രോഗ്രാമിംഗ് ഭാഷയിൽ](https://blog.enigma.co/getting-started-with-discovery-the-rust-programming-language-4d1e0b06de15)
- [രഹസ്യ കരാറുകളിലേക്കുള്ള ഒരു ആമുഖം](https://blog.enigma.co/getting-started-with-enigma-an-intro-to-secret-contracts-cdba4fe501c2)
- [ഒയാസിസ് (സംയുക്ത)-ത്തില്‍ സോളിഡിറ്റി കരാറുകൾ വിന്യസിക്കൽ](https://docs.oasis.dev/tutorials/deploy-solidity.html#deploy-using-truffle)

## റസ്റ് പ്രോജക്റ്റുകളും ഉപകരണങ്ങളും {#rust-projects-and-tools}

- [ pwasm-ethereum ](https://github.com/paritytech/pwasm-ethereum) - _ ethereum പോലുള്ള നെറ്റ്‌വർക്കുമായി സംവദിക്കാനുള്ള ബാഹ്യ ശേഖരണം. _
- [Ethereum വെബ് അസംബ്ലി](https://ewasm.readthedocs.io/en/mkdocs/)
- [ oasis_std ](https://docs.rs/oasis-std/0.2.7/oasis_std/) - _ OASIS API റഫറൻസ് _
- [ eth-utils ](https://github.com/ethereum/eth-utils/) - _ Ethereum അനുബന്ധ കോഡ്ബേസുകളിൽ പ്രവർത്തിക്കാനുള്ള യൂട്ടിലിറ്റി ഫംഗ്ഷനുകൾ _
- [സോളാരിസ്](https://github.com/paritytech/sol-rs)
- [ സ്പുട്‌നിക്വിഎം ](https://github.com/sorpaas/rust-evm) - _ റസ്റ്റ് Ethereum വെർച്വൽ മെഷീൻ നടപ്പാക്കൽ _
- [ പാരിറ്റി ](https://github.com/paritytech/parity-ethereum) - _ Ethereum Rust client _
- [ റസ്റ്റ്-വെബ് 3 ](https://github.com/tomusdrw/rust-web3) - _ Web3.js ലൈബ്രറിയുടെ റസ്റ്റ് നടപ്പാക്കൽ _
- [ വേവ്‌ലെറ്റ് ](https://wavelet.perlin.net/docs/smart-contracts) - _ റസ്റ്റിലെ വേവ്‌ലെറ്റ് സ്മാർട്ട് കരാർ _

കൂടുതൽ ഉറവിടങ്ങൾക്കായി തിരയുകയാണോ? [ ethereum.org/developers. ](/ml/developers/) പരിശോധിക്കുക

## റസ്റ്റ് കമ്മ്യൂണിറ്റി സംഭാവകർ {#rust-community-contributors}

- [Ethereum വെബ് അസംബ്ലി](https://gitter.im/ewasm/Lobby)
- [ഒയാസിസ് ജിറ്റര്‍](https://gitter.im/Oasis-official/Lobby)
- [പാരിറ്റി ജിറ്റര്‍](https://gitter.im/paritytech/parity)
- [എനിഗ്മ](https://discord.gg/SJK32GY)
