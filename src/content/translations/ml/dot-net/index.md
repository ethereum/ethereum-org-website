---
title: .NET ഡവലപ്പർമാർക്കുള്ള Ethereum
description: .NET അടിസ്ഥാനമാക്കിയുള്ള പ്രോജക്റ്റുകളും ടൂളിംഗും ഉപയോഗിച്ച് Ethereum-നായി എങ്ങനെ വികസിപ്പിക്കാമെന്ന് മനസിലാക്കുക
lang: ml
sidebar: true
---

# .NET ഡവലപ്പർമാർക്കുള്ള Ethereum {#ethereum-for-dot-net-devs}

<div class="featured">.NET അടിസ്ഥാനമാക്കിയുള്ള പ്രോജക്റ്റുകളും ടൂളിംഗും ഉപയോഗിച്ച് Ethereum-നായി എങ്ങനെ വികസിപ്പിക്കാമെന്ന് മനസിലാക്കുക</div><br/>

ക്രിപ്‌റ്റോകറൻസിയുടെയും ബ്ലോക്ക്‌ചെയിൻ സാങ്കേതികവിദ്യയുടെയും ഗുണങ്ങള്‍ പ്രയോജനപ്പെടുത്തുന്ന വികേന്ദ്രീകൃത ആപ്ലിക്കേഷനുകൾ (അല്ലെൽ "ഡാപ്പുകൾ") സൃഷ്ടിക്കാൻ Ethereum ഉപയോഗിക്കുക. അവ വിശ്വസനീയമാകാം, അതായത് അവ Ethereum-ലേക്ക് “അപ്‌ലോഡ്” ചെയ്യപ്പെട്ടുകഴിഞ്ഞാൽ, അവ എല്ലായ്പ്പോഴും പ്രോഗ്രാം ചെയ്തതുപോലെ പ്രവർത്തിക്കും. പുതിയ തരം സാമ്പത്തിക ആപ്ലിക്കേഷനുകൾ സൃഷ്ടിക്കുന്നതിന് അവർക്ക് ഡിജിറ്റൽ അസറ്റുകൾ നിയന്ത്രിക്കാൻ കഴിയും. അവയെ വികേന്ദ്രീകരിക്കാൻ കഴിയും, അതായത് ഒരൊറ്റ സ്ഥാപനമോ വ്യക്തിയോ അവയെ നിയന്ത്രിക്കുന്നില്ല, സെൻസർ ചെയ്യുന്നത് ഏതാണ്ട് അസാധ്യമാണ്.

Ethereum-ന് മുകളിൽ വികേന്ദ്രീകൃത അപ്ലിക്കേഷനുകൾ നിർമ്മിക്കുകയും മൈക്രോസോഫ്റ്റ് ടെക്നോളജി സ്റ്റാക്കിൽ നിന്നുള്ള ഉപകരണങ്ങളും ഭാഷകളും ഉപയോഗിച്ച് സ്മാർട്ട് കരാറുകളുമായി സംവദിക്കുകയും ചെയ്യുക - NET ഫ്രെയിംവർക്ക് / .NET കോർ /.NET സ്റ്റാൻഡേർഡ് ‌ എന്നിവയില്‍ ഉടനീളം VS‌കോഡ്, വിഷ്വൽ സ്റ്റുഡിയോ പോലുള്ള ഉപകരണങ്ങളിൽ C #, #വിഷ്വൽ ബേസിക് .NET, F # എന്നിവ പിന്തുണയ്ക്കുന്നു. മൈക്രോസോഫ്റ്റ് അസൂർ ബ്ലോക്ക്ചെയിൻ ഉപയോഗിച്ച് മിനിറ്റുകൾക്കുള്ളിൽ അസൂറിൽ ഒരു Ethereum ബ്ലോക്ക്ചെയിൻ വിന്യസിക്കുക. .NET-ന്റെ സ്നേഹം Ethereum-ലേക്ക് കൊണ്ടുവരിക!

<img src="https://raw.githubusercontent.com/Nethereum/Nethereum/master/logos/logo192x192t.png" />

## സ്മാർട്ട് കരാറുകളും സോളിഡിറ്റി ഭാഷയും ഉപയോഗിച്ച് ആരംഭിക്കുക

**.NET- നെ Ethereum-വുമായി സംയോജിപ്പിക്കുന്നതിന് നിങ്ങളുടെ ആദ്യ ഘട്ടങ്ങൾ കൈക്കൊള്ളുക**

ആദ്യം കൂടുതൽ അടിസ്ഥാന പ്രൈമർ ആവശ്യമുണ്ടോ? [ ethereum.org/learn ](/ml/learn/) അല്ലെങ്കിൽ [ ethereum.org/developers ](/ml/developers/) പരിശോധിക്കുക.

- [ബ്ലോക്ക്ചെയിൻ വിവരണം](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [സ്മാർട്ട് കോൺട്രാക്ട്നെ പറ്റി വിശദമായി](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [നിങ്ങളുടെ ആദ്യത്തെ സ്മാർട്ട് കോൺട്രാക്ട് എഴുതാം](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [സോളിഡിറ്റി കംപൈൽ ചെയ്യുന്നതും വിന്യസിക്കുന്നതും എങ്ങനെയെന്ന് അറിയുക](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## തുടക്കക്കാരന്റെ റഫറൻസുകളും ലിങ്കുകളും {#beginner-references-and-links}

**നെതെറിയം ലൈബ്രറിയും VS കോഡ് സോളിഡിറ്റിയും അവതരിപ്പിക്കുന്നു**

- [നെതെറിയം, ആരംഭിക്കുന്നു](https://docs.nethereum.com/en/latest/getting-started/)
- [VSകോഡ് സോളിഡിറ്റി ഇൻസ്റ്റാൾ ചെയ്യുന്നു](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [Ethereum സ്മാർട്ട് കരാറുകൾ സൃഷ്ടിക്കുന്നതിനും വിളിക്കുന്നതിനുമുള്ള ഒരു .NET ഡവലപ്പറുടെ വർക്ക്ഫ്ലോ](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [സ്മാർട്ട് കരാറുകൾ Ethereum-വുമായി സംയോജിപ്പിക്കുന്നു](https://kauri.io/#collections/getting%20started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereum)
- [.NET, Ethereum ബ്ലോക്ക്ചെയിന്‍ എന്നിവയുമായുള്ള ഇന്റർഫേസിംഗ്](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933), also in [中文版](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1)
- [നെതെറിയം - ബ്ലോക്ക്ചെയിനിനായുള്ള ഒരു ഓപ്പൺ സോഴ്‌സ് .NET ഇന്റഗ്രേഷൻ ലൈബ്രറി](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [നെതെറിയം ഉപയോഗിച്ച് SQL ഡാറ്റാബേസിലേക്ക് Ethereum ഇടപാടുകൾ എഴുതുന്നു](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [ C #, വിഷ്വൽസ്റ്റുഡിയോ എന്നിവ ഉപയോഗിച്ച് Ethereum സ്മാർട്ട് കരാറുകൾ എങ്ങനെ എളുപ്പത്തിൽ വിന്യസിക്കാമെന്ന് കാണുക ](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c) <br/>

**ഇപ്പോൾ സജ്ജീകരണം ഒഴിവാക്കാനും സാമ്പിളുകളിലേക്ക് നേരെ പോകാനും ആഗ്രഹിക്കുന്നുണ്ടോ?**

- [ കളിസ്ഥലം ](http://playground.nethereum.com/) - Ethereum-വുമായി സംവദിച്ച് ബ്രൗസറിലൂടെ Nethereum എങ്ങനെ ഉപയോഗിക്കാമെന്ന് മനസിലാക്കുക.
  - അന്വേഷണ അക്കൗണ്ട് ബാലൻസ് [ C# ](http://playground.nethereum.com/csharp/id/1001) [ VB.NET ](http://playground.nethereum.com/vb/id/2001)
  - ചോദ്യം ERC20 സ്മാർട്ട് കരാർ ബാലൻസ് [ C # ](http://playground.nethereum.com/csharp/id/1005) [ VB.NET](http://playground.nethereum.com/vb/id/2004)
  - [ C# ](http://playground.nethereum.com/csharp/id/1003) [VB.NET ](http://playground.nethereum.com/vb/id/2003)
  - ... കൂടുതൽ!

## ഇന്റർമീഡിയറ്റ് ലേഖനങ്ങൾ {#intermediate-articles}

- [നെതെറിയം വർക്ക്ബുക്ക് / സാമ്പിൾ ലിസ്റ്റ്](http://docs.nethereum.com/en/latest/Nethereum.Workbooks/docs/)
- [നിങ്ങളുടെ സ്വന്തം വികസന ടെസ്റ്റ്ചെയിനുകൾ വിന്യസിക്കുക](https://github.com/Nethereum/Testchains)
- [സോളിഡിറ്റിക്കായുള്ള VSCode കോഡ്‌ജെൻ പ്ലഗിൻ](https://docs.nethereum.com/en/latest/nethereum-codegen-vscodesolidity/)
- [യൂണിറ്റിയും Ethereum-ഉം: എന്തുകൊണ്ട്, എങ്ങനെ](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [Ethereum ഡാപ്പുകൾക്കായി ASP.NET കോർ വെബ് API സൃഷ്ടിക്കുക](https://tech-mint.com/create-asp-net-core-web-api-for-ethereum-dapps/)
- [ഒരു സപ്ലൈ ചെയിൻ ട്രാക്കിംഗ് സംവിധാനം നടപ്പിലാക്കുന്നതിന് നെതെറിയം വെബ് 3 ഉപയോഗിക്കുന്നു](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [ നെതെറിയം ബ്ലോക്ക് പ്രോസസ്സിംഗ് ](https://nethereum.readthedocs.io/en/latest/nethereum-block-processing-detail/), [ C# കളിസ്ഥലം സാമ്പിൾ ](http://playground.nethereum.com/csharp/id/1025)
- [നെതെറിയം വെബ്‌സോക്കറ്റ് സ്ട്രീമിംഗ്](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [കാലിഡോയും നെതെറിയവും](https://kaleido.io/kaleido-and-nethereum/)
- [കോറം, നെതെറിയം എന്നിവ](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## നൂതന ഉപയോഗ പാറ്റേണുകൾ {#advanced-use-patterns}

- [അസൂർ കീ വോൾട്ടും നെതെറിയവും](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [നെതെറിയം.ഡാപ്ഹൈബ്രിഡ്](https://github.com/Nethereum/Nethereum.DappHybrid)
- [ഉജോ നെതെറിയം ബാക്കെൻഡ് റഫറൻസ് ആർക്കിടെക്ചർ](https://docs.nethereum.com/en/latest/nethereum-ujo-backend-sample/)

## .NET പ്രോജക്റ്റുകൾ, ഉപകരണങ്ങൾ, മറ്റ് രസകരമായ കാര്യങ്ങൾ {#dot-net-projects-tools-and-other-fun stiff}

- [ നെതെറിയം പ്ലേഗ്രൗണ്ട് ](http://playground.nethereum.com/) - _ ബ്രൗസറിൽ നെതെറിയം കോഡ് സ്‌നിപ്പെറ്റുകൾ സമാഹരിക്കുക, സൃഷ്‌ടിക്കുക, പ്രവർത്തിപ്പിക്കുക എന്നിവ _
- [ നെതെറിയം കോഡ്‌ജെൻ ബ്ലേസർ ](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _ ബ്ലാസറിലെ UI-നുമൊത്തുള്ള നെതെറിയം കോഡ്‌ജെൻ _
- [ നെതെറിയം ബ്ലാസർ ](https://github.com/Nethereum/NethereumBlazor) - _ A .NET Wasm SPA ലൈറ്റ് ബ്ലോക്ക്‌ചെയിൻ എക്‌സ്‌പ്ലോററും ലളിതമായ വാലറ്റും _
- [ വോങ്ക ബിസിനസ് റൂൾസ് എഞ്ചിൻ ](https://docs.nethereum.com/en/latest/wonka/) - _ ഒരു ബിസിനസ് റൂൾസ് എഞ്ചിൻ (.NET പ്ലാറ്റ്‌ഫോമിനും Ethereum പ്ലാറ്റ്ഫോമിനും വേണ്ടിയുള്ളത്) അന്തർലീനമായി മെറ്റാഡാറ്റ-ഡ്രൈവുചെയ്യുന്നത്_
- [നെതർ‌മൈൻഡ്](https://github.com/NethermindEth/nethermind) - _ Linux, Windows, MacOs-നായുള്ള ഒരു .NET കോർ Ethereum ക്ലയൻറ് _
- [ eth-utils ](https://github.com/ethereum/eth-utils/) - _ Ethereum അനുബന്ധ കോഡ്ബേസുകളിൽ പ്രവർത്തിക്കാനുള്ള യൂട്ടിലിറ്റി ഫംഗ്ഷനുകൾ _
- [ ടെസ്റ്റ്ചെയിനുകൾ ](https://github.com/Nethereum/TestChains) - _ മുൻ‌കൂട്ടി ക്രമീകരിച്ച. വേഗത്തിലുള്ള പ്രതികരണത്തിനായി .NET ഡെവ്ചെയിനുകൾ (PoA) _

കൂടുതൽ ഉറവിടങ്ങൾക്കായി തിരയുകയാണോ? [ ethereum.org/developers. ](/ml/developers/) പരിശോധിക്കുക

## .NET കമ്മ്യൂണിറ്റി സംഭാവകർ {#dot-net-community-contributors}

നെതെറിയത്തിൽ, ഞങ്ങൾ കൂടുതലും [ ജിറ്റർ ](https://gitter.im/Nethereum/Nethereum) ൽ ഹാംഗ് ഔട്ട് ചെയ്യുന്നു, അവിടെ എല്ലാവർക്കും ചോദ്യങ്ങൾ ചോദിക്കാനും ഉത്തരം നൽകാനും സഹായം നേടാനും അല്ലെങ്കിൽ തണുപ്പിക്കാനും സ്വാഗതം. ഒരു PR ചെയ്യാൻ മടിക്കേണ്ടതില്ല അല്ലെങ്കിൽ [ നെതെറിയം ഗിത്തബ് ശേഖരം ](https://github.com/Nethereum) ൽ ഒരു പ്രശ്നം തുറക്കുക, അല്ലെങ്കിൽ ഞങ്ങളുടെ കൈവശമുള്ള നിരവധി സൈഡ് / സാമ്പിൾ പ്രോജക്റ്റുകൾ വഴി ബ്രൗസ് ചെയ്യുക.

നെതർ‌മൈൻഡിൽ‌, [ ജിറ്റർ ](https://gitter.im/nethermindeth/nethermind) വഴി ബന്ധപ്പെടാം. PR- കൾക്കോ പ്രശ്‌നങ്ങൾക്കോ, [ നെതർ‌മൈൻഡ് ഗിത്തബ് ശേഖരം ](https://github.com/NethermindEth/nethermind) പരിശോധിക്കുക.

## മറ്റ് മൊത്തം ലിസ്റ്റുകൾ {#other-aggregated-lists}

[ ഔദ്യോഗിക നെതെറിയം സൈറ്റ് ](https://nethereum.com/) [ ഔദ്യോഗിക നെതർ‌മൈൻഡ് സൈറ്റ് ](https://nethermind.io/)
