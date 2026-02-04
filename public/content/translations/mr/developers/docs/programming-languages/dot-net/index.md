---
title: .NET डेव्हलपर्ससाठी इथेरियम
description: .NET-आधारित प्रोजेक्ट्स आणि टूलिंग वापरून इथेरियमसाठी डेव्हलप कसे करायचे ते शिका
lang: mr
incomplete: true
---

<FeaturedText>.NET-आधारित प्रोजेक्ट्स आणि टूलिंग वापरून इथेरियमसाठी डेव्हलप कसे करायचे ते शिका</FeaturedText>

क्रिप्टोकरन्सी आणि ब्लॉकचेन तंत्रज्ञानाच्या फायद्यांचा उपयोग करणाऱ्या विकेंद्रीकृत ॲप्लिकेशन्स (किंवा "dapps") तयार करण्यासाठी इथेरियम वापरा. हे dapps विश्वासार्ह असू शकतात, याचा अर्थ असा की एकदा ते इथेरियमवर तैनात केले की, ते नेहमी प्रोग्राम केल्याप्रमाणे चालतील. नवीन प्रकारचे आर्थिक ॲप्लिकेशन्स तयार करण्यासाठी ते डिजिटल मालमत्ता नियंत्रित करू शकतात. ते विकेंद्रित असू शकतात, याचा अर्थ असा की कोणतीही एक संस्था किंवा व्यक्ती त्यांना नियंत्रित करत नाही आणि सेन्सॉर करणे जवळजवळ अशक्य आहे.

मायक्रोसॉफ्ट टेक्नॉलॉजी स्टॅकमधील साधने आणि भाषा वापरून इथेरियमवर विकेंद्रित ऍप्लिकेशन्स तयार करा आणि स्मार्ट कॉन्ट्रॅक्ट्सशी संवाद साधा - जे .NET फ्रेमवर्क/.NET कोअर/.NET स्टँडर्डवर VSCode आणि व्हिज्युअल स्टुडिओ सारख्या टूलिंगवर C#, व्हिज्युअल बेसिक .NET, F# ला सपोर्ट करते. Microsoft Azure ब्लॉकचेन वापरून काही मिनिटांत Azure वर इथेरियम ब्लॉकचेन तैनात करा. .NET ची आवड इथेरियममध्ये आणा!

## स्मार्ट कॉन्ट्रॅक्ट्स आणि सॉलिडिटी भाषेसह सुरुवात करणे {#getting-started-with-smart-contracts-and-the-solidity-language}

**इथेरियमसोबत .NET एकत्रित करण्यासाठी तुमची पहिली पायरी उचला**

प्रथम अधिक मूलभूत प्राइमरची आवश्यकता आहे? [ethereum.org/learn](/learn/) किंवा [ethereum.org/developers](/developers/) पहा.

- [ब्लॉकचेन स्पष्टीकरण](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट कॉन्ट्रॅक्ट्स समजून घेणे](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [तुमचा पहिला स्मार्ट कॉन्ट्रॅक्ट लिहा](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [सॉलिडिटी कसे संकलित आणि तैनात करायचे ते शिका](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## नवशिक्यांसाठी संदर्भ आणि लिंक्स {#beginner-references-and-links}

**Nethereum लायब्ररी आणि VS Code सॉलिडिटीची ओळख**

- [Nethereum, सुरुवात करणे](https://docs.nethereum.com/en/latest/getting-started/)
- [VS Code सॉलिडिटी इंस्टॉल करणे](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [इथेरियम स्मार्ट कॉन्ट्रॅक्ट्स तयार करण्यासाठी आणि कॉल करण्यासाठी .NET डेव्हलपरची कार्यप्रणाली](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Nethereum सोबत स्मार्ट कॉन्ट्रॅक्ट्सचे एकत्रीकरण](https://kauri.io/#collections/Getting%20Started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereumm)
- [Nethereum सह .NET आणि इथेरियम ब्लॉकचेन स्मार्ट कॉन्ट्रॅक्ट्सला इंटरफेस करणे](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933), [中文版](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1) मध्ये देखील
- [Nethereum - ब्लॉकचेनसाठी एक ओपन सोर्स .NET इंटिग्रेशन लायब्ररी](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [Nethereum वापरून SQL डेटाबेसमध्ये इथेरियम ट्रान्झॅक्शन्स लिहिणे](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [C# आणि VisualStudio वापरून इथेरियम स्मार्ट कॉन्ट्रॅक्ट्स सहजपणे कसे तैनात करायचे ते पहा](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**तुम्हाला आतासाठी सेटअप वगळून थेट सॅम्पल्सवर जायचे आहे का?**

- [Playground](http://playground.nethereum.com/) - ब्राउझरद्वारे इथेरियमशी संवाद साधा आणि Nethereum कसे वापरायचे ते शिका.
  - अकाउंट बॅलन्सची चौकशी करा [C#](http://playground.nethereum.com/csharp/id/1001) [VB.NET](http://playground.nethereum.com/vb/id/2001)
  - ERC20 स्मार्ट कॉन्ट्रॅक्ट बॅलन्सची चौकशी करा [C#](http://playground.nethereum.com/csharp/id/1005) [VB.NET](http://playground.nethereum.com/vb/id/2004)
  - एका अकाउंटवर ईथर ट्रान्सफर करा [C#](http://playground.nethereum.com/csharp/id/1003) [VB.NET](http://playground.nethereum.com/vb/id/2003)
  - ... आणि बरेच काही!

## मध्यम स्तरावरील लेख {#intermediate-articles}

- [Nethereum वर्कबुक/सॅम्पल लिस्ट](http://docs.nethereum.com/en/latest/Nethereum.Workbooks/docs/)
- [तुमच्या स्वतःच्या डेव्हलपमेंट टेस्टचेन्स तैनात करा](https://github.com/Nethereum/Testchains)
- [सॉलिडिटीसाठी VSCode कोडजेन प्लगिन](https://docs.nethereum.com/en/latest/nethereum-codegen-vscodesolidity/)
- [युनिटी आणि इथेरियम: का आणि कसे](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [इथेरियम dapps साठी ASP.NET कोअर वेब API तयार करा](https://tech-mint.com/blockchain/create-asp-net-core-web-api-for-ethereum-dapps/)
- [Nethereum Web3 वापरून सप्लाय चेन ट्रॅकिंग सिस्टीम लागू करणे](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [Nethereum ब्लॉक प्रोसेसिंग](https://nethereum.readthedocs.io/en/latest/nethereum-block-processing-detail/), [C# Playground sample](http://playground.nethereum.com/csharp/id/1025) सह
- [Nethereum वेबसॉकेट स्ट्रीमिंग](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [Kaleido आणि Nethereum](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum आणि Nethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## प्रगत वापर पद्धती {#advanced-use-patterns}

- [Azure की व्हॉल्ट आणि Nethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)
- [Ujo Nethereum बॅकएंड रेफरन्स आर्किटेक्चर](https://docs.nethereum.com/en/latest/nethereum-ujo-backend-sample/)

## .NET प्रोजेक्ट्स, साधने आणि इतर मजेदार गोष्टी {#dot-net-projects-tools-and-other-fun-stuff}

- [Nethereum Playground](http://playground.nethereum.com/) - _ब्राउझरमध्ये Nethereum कोड स्निपेट्स कंपाइल करा, तयार करा आणि चालवा_
- [Nethereum Codegen Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _Blazor मध्ये UI सह Nethereum कोडजेन_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _एक .NET Wasm SPA लाइट ब्लॉकचेन एक्सप्लोरर आणि साधे वॉलेट_
- [Wonka Business Rules Engine](https://docs.nethereum.com/en/latest/wonka/) - _एक बिझनेस रूल्स इंजिन (.NET प्लॅटफॉर्म आणि इथेरियम प्लॅटफॉर्म दोन्हीसाठी) जे मूळतः मेटाडेटा-चालित आहे_
- [Nethermind](https://github.com/NethermindEth/nethermind) - _Linux, Windows, MacOS साठी एक .NET कोअर इथेरियम क्लायंट_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _इथेरियम संबंधित कोडबेससह काम करण्यासाठी युटिलिटी फंक्शन्स_
- [TestChains](https://github.com/Nethereum/TestChains) - _जलद प्रतिसादासाठी (PoA) पूर्व-कॉन्फिगर केलेले .NET डेव्हचेन्स_

अधिक संसाधने शोधत आहात? [ethereum.org/developers](/developers/) पहा.

## .NET कम्युनिटी योगदानकर्ते {#dot-net-community-contributors}

Nethereum मध्ये, आम्ही बहुतेक [Gitter](https://gitter.im/Nethereum/Nethereum) वर असतो, जिथे प्रश्न विचारण्यासाठी/उत्तरे देण्यासाठी, मदत मिळवण्यासाठी, किंवा फक्त वेळ घालवण्यासाठी प्रत्येकाचे स्वागत आहे. तुम्ही [Nethereum GitHub repository](https://github.com/Nethereum) वर एक PR करू शकता किंवा समस्या नोंदवू शकता, किंवा आमच्या अनेक साइड/सॅम्पल प्रोजेक्ट्समधून फक्त ब्राउझ करू शकता. तुम्ही आम्हाला [Discord](https://discord.gg/jQPrR58FxX) वर देखील शोधू शकता!

तुम्ही Nethermind साठी नवीन असाल आणि सुरुवात करण्यासाठी मदतीची आवश्यकता असेल, तर आमच्या [Discord](http://discord.gg/PaCMRFdvWT) मध्ये सामील व्हा. तुमच्या प्रश्नांची उत्तरे देण्यासाठी आमचे डेव्हलपर्स उपलब्ध आहेत. [Nethermind GitHub repository](https://github.com/NethermindEth/nethermind) वर PR ओपन करण्यास किंवा कोणत्याही समस्या मांडण्यास संकोच करू नका.

## इतर एकत्रित याद्या {#other-aggregated-lists}

[अधिकृत Nethereum साइट](https://nethereum.com/)  
[अधिकृत Nethermind साइट](https://nethermind.io/)
