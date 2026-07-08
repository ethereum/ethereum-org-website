---
title: "كيفية عرض ⁦NFT⁩ الخاص بك في محفظتك (الجزء ⁦3/3⁩ من سلسلة دروس ⁦NFT⁩)"
description: "يصف هذا البرنامج التعليمي كيفية عرض ⁦NFT⁩ موجود على ميتاماسك!"
author: "سومي مودجيل"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: "عرض ⁦NFT⁩ في المحفظة"
lang: ar
published: 2021-04-22
---

هذا البرنامج التعليمي هو الجزء <span dir="ltr">3/3</span> من سلسلة دروس <span dir="ltr">NFT</span>، حيث نعرض <span dir="ltr">NFT</span> الذي تم سكه حديثًا. ومع ذلك، يمكنك استخدام البرنامج التعليمي العام لأي رمز مميز <span dir="ltr">ERC-721</span> باستخدام ميتاماسك، بما في ذلك على الشبكة الرئيسية أو أي شبكة اختبار. إذا كنت ترغب في معرفة كيفية سك <span dir="ltr">NFT</span> الخاص بك على إيثيريوم، يجب عليك التحقق من [الجزء الأول حول كيفية كتابة ونشر عقد ذكي لـ <span dir="ltr">NFT</span>](/developers/tutorials/how-to-write-and-deploy-an-nft)!

تهانينا! لقد وصلت إلى الجزء الأقصر والأبسط من سلسلة دروس <span dir="ltr">NFT</span> الخاصة بنا — كيفية عرض <span dir="ltr">NFT</span> الذي تم سكه حديثًا على محفظة افتراضية. سنستخدم ميتاماسك في هذا المثال لأن هذا ما استخدمناه في الجزأين السابقين.

كمتطلب أساسي، يجب أن يكون لديك بالفعل تطبيق ميتاماسك مثبتًا على الهاتف المحمول، ويجب أن يتضمن الحساب الذي قمت بسك <span dir="ltr">NFT</span> الخاص بك إليه — يمكنك الحصول على التطبيق مجانًا على [<span dir="ltr">iOS</span>](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202) أو [<span dir="ltr">Android</span>](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US).

## الخطوة 1: تعيين شبكتك إلى <span dir="ltr">Sepolia</span> {#set-network-to-sepolia}

في الجزء العلوي من التطبيق، اضغط على زر "المحفظة" (Wallet)، وبعد ذلك سيُطلب منك تحديد شبكة. نظرًا لأن <span dir="ltr">NFT</span> الخاص بنا تم سكه على شبكة <span dir="ltr">Sepolia</span>، فستحتاج إلى تحديد <span dir="ltr">Sepolia</span> كشبكتك.

![How to set Sepolia as your network on MetaMask Mobile](./goerliMetamask.gif)

## الخطوة 2: إضافة العنصر القابل للجمع الخاص بك إلى ميتاماسك {#add-nft-to-metamask}

بمجرد أن تكون على شبكة <span dir="ltr">Sepolia</span>، حدد علامة التبويب "المقتنيات" (Collectibles) على اليمين وأضف عنوان العقد الذكي لـ <span dir="ltr">NFT</span> ومعرف الرمز المميز <span dir="ltr">ERC-721</span> الخاص بـ <span dir="ltr">NFT</span> الخاص بك — والذي يجب أن تكون قادرًا على العثور عليه على <span dir="ltr">Etherscan</span> بناءً على تجزئة المعاملة من <span dir="ltr">NFT</span> الخاص بك الذي تم نشره في الجزء الثاني من برنامجنا التعليمي.

![How to find your transaction hash and <span dir="ltr">ERC-721</span> token ID](./findNFTEtherscan.png)

قد تحتاج إلى التحديث بضع مرات لعرض <span dir="ltr">NFT</span> الخاص بك — ولكنه سيكون هناك <Emoji text="😄" size={1} />!

![How to upload your NFT to MetaMask](./findNFTMetamask.gif)

تهانينا! لقد قمت بنجاح بسك <span dir="ltr">NFT</span>، ويمكنك الآن عرضه! لا يسعنا الانتظار لرؤية كيف ستكتسح عالم <span dir="ltr">NFT</span>!