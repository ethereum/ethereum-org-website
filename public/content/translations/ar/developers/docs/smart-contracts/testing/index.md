---
title: اختبار العقود الذكية
description: An overview of techniques and considerations for testing Ethereum smart contracts.
lang: ar
---

تعتبر سلاسل الكتل العامة مثل Ethereum غير قابلة للتغيير، مما يجعل من الصعب تغيير كود العقود الذكية بعد النشر. توجد [أنماط ترقية العقود](/developers/docs/smart-contracts/upgrading/) لإجراء "ترقيات افتراضية"، ولكن من الصعب تنفيذها وتتطلب إجماعًا اجتماعيًا. علاوة على ذلك، لا يمكن للترقية إصلاح الخطأ إلا _بعد_ اكتشافه—إذا اكتشف المهاجم الثغرة الأمنية أولاً، فسيكون عقدك الذكي معرضًا لخطر الاستغلال.

لهذه الأسباب، يُعد اختبار العقود الذكية قبل [نشرها](/developers/docs/smart-contracts/deploying/) على الشبكة الرئيسية (Mainnet) متطلبًا أدنى لـ[الأمان](/developers/docs/smart-contracts/security/). هناك العديد من التقنيات لاختبار العقود وتقييم صحة التعليمات البرمجية؛ ما تختاره يعتمد على احتياجاتك. ومع ذلك، فإن مجموعة الاختبار المكونة من أدوات وأساليب مختلفة تعتبر مثالية لالتقاط العيوب الأمنية البسيطة والكبيرة في كود العقد.

## المتطلبات الأساسية {#prerequisites}

تشرح هذه الصفحة كيفية اختبار العقود الذكية قبل نشرها على شبكة Ethereum. يفترض أنك على دراية بـ[العقود الذكية](/developers/docs/smart-contracts/).

## What is smart contract testing؟ ما هو اختبار العقود الذكية؟ {#what-is-smart-contract-testing}

اختبار العقد الذكي هو عملية التحقق من أن كود العقد الذكي يعمل كما هو متوقع. يعد الاختبار مفيدًا للتحقق مما إذا كان عقد ذكي معين يلبي متطلبات الموثوقية وسهولة الاستخدام والأمان.

على الرغم من اختلاف الأساليب، فإن معظم طرق الاختبار تتطلب تنفيذ عقد ذكي مع عينة صغيرة من البيانات التي من المتوقع التعامل معها. إذا أنتج العقد نتائج صحيحة لبيانات العينة، فمن المفترض أن يعمل بشكل صحيح. توفر معظم أدوات الاختبار موارد لكتابة وتنفيذ [حالات الاختبار](https://en.m.wikipedia.org/wiki/Test_case) للتحقق مما إذا كان تنفيذ العقد يطابق النتائج المتوقعة.

### Why is it important to test smart contracts؟ أهمية اختبار العقود الذكية {#importance-of-testing-smart-contracts}

نظرًا لأن العقود الذكية غالبًا ما تدير أصولًا مالية عالية القيمة، فإن الأخطاء البرمجية البسيطة يمكن أن تؤدي، وغالبًا ما تؤدي، إلى [خسائر فادحة للمستخدمين](https://rekt.news/leaderboard/). ومع ذلك، يمكن أن يساعدك الاختبار الصارم في اكتشاف العيوب والمشكلات في كود العقد الذكي مبكرًا وإصلاحها قبل الإطلاق على الشبكة الرئيسية.

على الرغم من أنه من الممكن ترقية العقد إذا تم اكتشاف خطأ ما، إلا أن الترقيات معقدة ويمكن أن [تؤدي إلى أخطاء](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) إذا تم التعامل معها بشكل غير صحيح. يؤدي ترقية العقد إلى إلغاء مبدأ عدم التغيير بشكل أكبر ويثقل كاهل المستخدمين بافتراضات ثقة إضافية. وعلى العكس من ذلك، فإن الخطة الشاملة لاختبار عقدك تخفف من مخاطر أمان العقود الذكية وتقلل من الحاجة إلى إجراء ترقيات منطقية معقدة بعد النشر.

## طرق اختبار العقود الذكية {#methods-for-testing-smart-contracts}

تندرج طرق اختبار عقود الإيثريوم الذكية ضمن فئتين عريضتين: **الاختبار الآلي** و **الاختبار اليدوي**. يقدم الاختبار الآلي والاختبار اليدوي فوائد ومقايضات فريدة، ولكن يمكنك الجمع بينهما لإنشاء خطة قوية لتحليل عقودك.

### الاختبار الآلي {#automated-testing}

يستخدم الاختبار الآلي أدوات تقوم تلقائيًا بفحص كود العقود الذكية بحثًا عن أخطاء في التنفيذ. تأتي فائدة الاختبار الآلي من استخدام [البرامج النصية](https://www.techtarget.com/whatis/definition/script?amp=1) لتوجيه تقييم وظائف العقد. يمكن جدولة الاختبارات النصية ليتم تشغيلها بشكل متكرر مع الحد الأدنى من التدخل البشري، مما يجعل الاختبار الآلي أكثر كفاءة من الأساليب اليدوية للاختبار.

يُعد الاختبار الآلي مفيدًا بشكل خاص عندما تكون الاختبارات متكررة وتستغرق وقتًا طويلاً؛ ويصعب تنفيذها يدويًا؛ أو تكون عرضة للخطأ البشري؛ أو تنطوي على تقييم وظائف العقد الحرجة. ولكن يمكن أن يكون لأدوات الاختبار الآلية عيوب—فقد تفوِّت بعض الأخطاء وتنتج العديد من [الإيجابيات الكاذبة](https://www.contrastsecurity.com/glossary/false-positive). ومن ثم، فإن الجمع بين الاختبار الآلي والاختبار اليدوي للعقود الذكية يعد أمرًا مثاليًا.

### الاختبار اليدوي {#manual-testing}

الاختبار اليدوي هو اختبار يتم بمساعدة الإنسان ويتضمن تنفيذ كل حالة اختبار في مجموعة الاختبار الخاصة بك واحدة تلو الأخرى عند تحليل صحة العقود الذكية. يختلف هذا عن الاختبار الآلي حيث يمكنك تشغيل اختبارات معزولة متعددة في وقت واحد على عقد والحصول على تقرير يوضح جميع الاختبارات الفاشلة والناجحة.

يمكن أن يتم إجراء الاختبار اليدوي بواسطة فرد واحد وفقًا لخطة اختبار مكتوبة تغطي سيناريوهات اختبار مختلفة. يمكنك أيضًا أن يكون لديك عدة أفراد أو مجموعات تتفاعل مع عقد ذكي خلال فترة زمنية محددة كجزء من الاختبار اليدوي. سيقوم المختبرون بمقارنة السلوك الفعلي للعقد مع السلوك المتوقع، واعتبار أي اختلاف بمثابة خطأ.

يتطلب الاختبار اليدوي الفعال موارد كبيرة (مهارة ووقت ومال وجهد)، ومن الممكن - بسبب الخطأ البشري - تفويت بعض الأخطاء أثناء تنفيذ الاختبارات. ولكن الاختبار اليدوي قد يكون مفيدًا أيضًا - على سبيل المثال، قد يستخدم المختبر البشري (مثل المدقق) الحدس لاكتشاف الحالات الحدسية التي قد تفوتها أداة الاختبار الآلية.
walakina alaikhtibar alyadawia qad yakun mfydan aydan - ealaa sabil almithali, qad yustakhdim almukhtabar albashariu (mathal almudaqiqi) alhads liaiktishaf alhalat alhadsiat alati qad tafawatha 'adat aliakhtibar alaliti.

## الاختبار الآلي للعقود الذكية {#automated-testing-for-smart-contracts}

### اختبار الوحدة {#unit-testing-for-smart-contracts}

يقوم اختبار الوحدة بتقييم وظائف العقد بشكل منفصل ويتحقق من عمل كل مكون بشكل صحيح.
yaqum akhtibar alwahdat bitaqyim wazayif aleaqd bishakl munfasil wayatahaqaq min eamal kuli mukawan bishakl sahihin. يجب أن تكون اختبارات الوحدة الجيدة بسيطة وسريعة التشغيل وتوفر فكرة واضحة عما حدث خطأً إذا فشلت الاختبارات.
yajib 'an takun akhtibarat alwahdat aljayidat basitat wasarieat altashghil watawafur fikratan wadihatan eamaa hadath khtaan 'iidha fashilat alaikhtibaratu.

تُعد اختبارات الوحدة مفيدة للتحقق من أن الوظائف تعيد القيم المتوقعة وأن تخزين العقد يتم تحديثه بشكل صحيح بعد تنفيذ الوظيفة.
tued akhtibarat alwahdat mufidatan liltahaquq min 'ana alwazayif tueid alqiam almutawaqaeat wa'ana takhzin aleaqd yatimu tahdithuh bishakl sahih baed tanfidh alwazifati. علاوة على ذلك، فإن تشغيل اختبارات الوحدة بعد إجراء تغييرات على قاعدة بيانات العقود يضمن عدم إدخال أخطاء في المنطق الجديد.
eilawatan ealaa dhalika, fa'iina tashghil akhtibarat alwahdat baed 'iijra' taghyirat ealaa qaeidat bayanat aleuqud yadman eadam 'iidkhal 'akhta' fi almantiq aljadidi. فيما يلي بعض الإرشادات لتشغيل اختبارات الوحدة الفعالة:
fima yali baed al'iirshadat litashghil akhtibarat alwahdat alfaeaalati:

#### إرشادات لاختبار الوحدات في العقود الذكية {#unit-testing-guidelines}

##### ١.&#xA;فهم منطق العمل وسير العمل لعقودك&#xA;fahum mantiq aleamal wasiar aleamal lieuqudik

قبل كتابة اختبارات الوحدة، من المفيد معرفة الوظائف التي يوفرها العقد الذكي وكيفية وصول المستخدمين إلى هذه الوظائف واستخدامها.
qabl kitabat aikhtibarat alwahdati, min almufid maerifat alwazayif alati yuafiruha aleaqd aldhakiu wakayfiat wusul almustakhdimin 'iilaa hadhih alwazayif waistikhdamiha. هذا مفيد بشكل خاص لتشغيل [اختبارات المسار السعيد](https://en.m.wikipedia.org/wiki/Happy_path) التي تحدد ما إذا كانت الوظائف في العقد تُرجع المخرجات الصحيحة لمدخلات المستخدم الصالحة. سنشرح هذا المفهوم باستخدام هذا المثال (المختصر) لـ[عقد مزاد](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

هذا عقد مزاد بسيط مصمم لتلقي العطاءات خلال فترة المزايدة.
hadha eaqd mazad basit musamim litalaqiy aleata'at khilal fatrat almuzayadati. إذا زاد `highestBid`، يستلم صاحب أعلى عرض سابق أمواله؛ وبمجرد انتهاء فترة المزايدة، يستدعي `beneficiary` العقد للحصول على أمواله.

ستغطي اختبارات الوحدة لعقد مثل هذا وظائف مختلفة قد يستدعيها المستخدم عند التفاعل مع العقد.
satughatiy akhtibarat alwahdat lieaqd mithl hadha wazayif mukhtalifatan qad yastadeiha almustakhdam eind altafaeul mae aleaqdi. مثال على ذلك هو اختبار الوحدة الذي يتحقق مما إذا كان المستخدم يمكنه تقديم عرض أسعار أثناء استمرار المزاد (أي أن الاستدعاءات إلى `bid()` تنجح)، أو اختبار يتحقق مما إذا كان يمكن للمستخدم تقديم عرض أسعار أعلى من `highestBid` الحالي.

يساعد فهم سير العمل التشغيلي للعقود أيضًا في كتابة اختبارات الوحدة التي تتحقق مما إذا كان التنفيذ يلبي المتطلبات.
yusaeid fahm sayr aleamal altashghilii lileuqud aydan fi kitabat aikhtibarat alwahdat alati tatahaqaq mimaa 'iidha kan altanfidh yulabiy almutatalabati. على سبيل المثال، يحدد عقد المزاد أنه لا يمكن للمستخدمين تقديم عروض أسعار عندما ينتهي المزاد (أي عندما يكون `auctionEndTime` أقل من `block.timestamp`). وبالتالي، قد يقوم المطور بتشغيل اختبار وحدة يتحقق مما إذا كانت الاستدعاءات إلى الدالة `bid()` تنجح أم تفشل عند انتهاء المزاد (أي عندما يكون `auctionEndTime` > `block.timestamp`).

##### ٢. تقييم جميع الافتراضات المتعلقة بتنفيذ العقد&#xA;taqyim jamie alaiftiradat almutaealiqat bitanfidh aleaqd

من المهم توثيق أي افتراضات حول تنفيذ العقد وكتابة اختبارات الوحدة للتحقق من صحة تلك الافتراضات.
min almuhimi tawthiq 'ayi aiftiradat hawl tanfidh aleaqd wakitabat aikhtibarat alwahdat liltahaquq min sihat tilk alaiftiradati. إلى جانب توفير الحماية ضد التنفيذ غير المتوقع، فإن اختبار التأكيدات يجبرك على التفكير في العمليات التي قد تؤدي إلى كسر نموذج أمان العقود الذكية.
'iilaa janib tawfir alhimayat dida altanfidh ghayr almutawaqae, fa'iina aikhtibar altaakidat yujbiruk ealaa altafkir fi aleamaliaat alati qad tuadiy 'iilaa kasr namudhaj 'aman aleuqud aldhakiati. إحدى النصائح المفيدة هي أن تذهب إلى ما هو أبعد من "اختبارات المستخدم السعيد" وتكتب اختبارات سلبية تتحقق مما إذا كانت الوظيفة تفشل في حالة المدخلات الخاطئة.
'iihdaa alnasayih almufidat hi 'an tadhhab 'iilaa ma hu 'abead min "aikhtibarat almustakhdam alsaeida" wataktub aikhtibarat salbiat tatahaqaq mimaa 'iidha kanat alwazifat tafshal fi halat almadkhalat alkhatiati.

تتيح لك العديد من أطر اختبار الوحدات إنشاء تأكيدات - عبارات بسيطة تنص على ما يمكن للعقد فعله وما لا يمكنه فعله - وتشغيل الاختبارات لمعرفة ما إذا كانت هذه التأكيدات صالحة أثناء التنفيذ.
tutih lak aleadid min 'utur akhtibar alwahadat 'iinsha' takidat - eibarat basitat tanusu ealaa ma yumkin lileaqd fieluh wama la yumkinuh fieluh - watashghil aliaikhtibarat limaerifat ma 'iidha kanat hadhih altaakidat salihat 'athna' altanfidhi. يمكن للمطور الذي يعمل على عقد المزاد الموصوف سابقًا أن يقدم التأكيدات التالية حول سلوكه قبل تشغيل الاختبارات السلبية:
yumkin lilmutawir aladhi yaemal ealaa eaqd almazad almwsuf sabqan 'an yuqadim altaakidat altaaliat hawl sulukih qabl tashghil alaikhtibarat alsalbiiti:

- لا يمكن للمستخدمين تقديم عروض عندما يكون المزاد قد انتهى أو لم يبدأ بعد.
  la yumkin lilmustakhdimin taqdim eurud eindama yakun almazad qad aintahaa 'aw lam yabda biedu.

- يتم إلغاء عقد المزاد إذا كان العرض أقل من الحد المقبول.
  yatimu 'iilgha' eaqd almazad 'iidha kan aleard 'aqala min alhadi almaqbuli.

- يتم إضافة أموال المستخدمين الذين فشلوا في الفوز بالعطاء إلى رصيدهم
  yatimu 'iidafat 'amwal almustakhdimin aladhin fashiluu fi alfawz bialeata' 'iilaa rasidihim

**ملاحظة**: هناك طريقة أخرى لاختبار الافتراضات وهي كتابة اختبارات تؤدي إلى تشغيل [مُعدِّلات الوظائف](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) في العقد، وخاصةً عبارات `require` و`assert` و`if…else`.

##### 3. قياس تغطية الكود&#xA;qias taghtiat alkud

[تغطية الكود](https://en.m.wikipedia.org/wiki/Code_coverage) هي مقياس اختبار يتتبع عدد الفروع والأسطر والعبارات في الكود الخاص بك التي يتم تنفيذها أثناء الاختبارات. يجب أن تتمتع الاختبارات بتغطية جيدة للكود لتقليل مخاطر الثغرات الأمنية غير المختبرة.
yajib 'an tatamatae aliakhtibarat bitaghtiat jayidat lilkud litaqlil makhatir althagharat al'amniat ghayr almukhtabarati. بدون تغطية كافية، قد تفترض خطأً أن عقدك آمن لأن جميع الاختبارات تنجح، بينما لا تزال الثغرات الأمنية موجودة في مسارات التعليمات البرمجية غير المختبرة.
bidun taghtiat kafiatin, qad taftarid khtaan 'ana eaqdak aman li'ana jamie alaikhtibarat tanjahu, baynama la tazal althagharat al'amniat mawjudat fi masarat altaelimat albarmajiat ghayr almukhtabarati. ومع ذلك، فإن تسجيل تغطية الكود العالية يمنح ضمانًا بأن جميع البيانات/الوظائف في العقد الذكي تم اختبارها بشكل كافٍ للتأكد من صحتها.
wamae dhalika, fa'iina tasjil taghtiat alkud alealiat yamnah dmanan bi'ana jamie albayanati/alwazayif fi aleaqd aldhakii tama aikhtibaruha bishakl kaf lilta'akud min sihatiha.

##### 4. استخدم أطر اختبار متطورة&#xA;aistakhdim 'utur akhtibar mutatawira

إن جودة الأدوات المستخدمة في تشغيل اختبارات الوحدة لعقودك الذكية أمر بالغ الأهمية. إطار عمل الاختبار المثالي هو الإطار الذي يتم صيانته بانتظام؛ ويوفر ميزات مفيدة (على سبيل المثال، إمكانيات التسجيل وإعداد التقارير)؛ ويجب استخدامه وفحصه على نطاق واسع من قبل مطورين آخرين.

تأتي أطر اختبار الوحدات الخاصة بعقود Solidity الذكية بلغات مختلفة (معظمها JavaScript وPython وRust). راجع بعض الأدلة أدناه للحصول على معلومات حول كيفية بدء تشغيل اختبارات الوحدة باستخدام أطر الاختبار المختلفة:

- **[تشغيل اختبارات الوحدة باستخدام Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[تشغيل اختبارات الوحدة باستخدام Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[تشغيل اختبارات الوحدة باستخدام Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[تشغيل اختبارات الوحدة باستخدام Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[تشغيل اختبارات الوحدة باستخدام Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[تشغيل اختبارات الوحدة باستخدام Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[تشغيل اختبارات الوحدة باستخدام Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### الاختبار التكاملي {#integration-testing-for-smart-contracts}

في حين أن اختبار الوحدة يصحح أخطاء وظائف العقد بشكل معزول، فإن اختبارات التكامل تقيم مكونات العقد الذكي ككل
fi hin 'ana aikhtibar alwahdat yusahih 'akhta' wazayif aleaqd bishakl maezulin, fa'iina akhtibarat altakamul tuqim mukawinat aleaqd aldhakii kakulin يمكن لاختبار التكامل اكتشاف المشكلات الناشئة عن مكالمات العقود المتبادلة أو التفاعلات بين الوظائف المختلفة في نفس العقد الذكي.
yumkin liakhtibar altakamul aktishaf almushkilat alnaashiat ean mukalamat aleuqud almutabadalat 'aw altafaeulat bayn alwazayif almukhtalifat fi nafs aleaqd aldhakii على سبيل المثال، يمكن أن تساعد اختبارات التكامل في التحقق مما إذا كانت أمور مثل [الوراثة](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) وحقن التبعية تعمل بشكل صحيح.

يعد اختبار التكامل مفيدًا إذا كان عقدك يعتمد على بنية معيارية أو يتفاعل مع عقود أخرى على السلسلة أثناء التنفيذ.
yueadu akhtibar altakamul mfydan 'iidha kan eaqduk yaetamid ealaa binyat mieyariat 'aw yatafaeal mae euqud 'ukhraa ealaa alsilsilat 'athna' altanfidhi. إحدى طرق تشغيل اختبارات التكامل هي [عمل انقسام للبلوكتشين](/glossary/#fork) عند ارتفاع معين (باستخدام أداة مثل [Forge](https://book.getfoundry.sh/forge/fork-testing) أو [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) ومحاكاة التفاعلات بين عقدك والعقود المنشورة.

ستتصرف سلسلة الكتل المتشعبة بشكل مشابه لشبكة Mainnet وستحتوي على حسابات بحالات وأرصدة مرتبطة بها. لكنها تعمل فقط كبيئة تطوير محلية محمية، مما يعني أنك لن تحتاج إلى ETH حقيقي للمعاملات، على سبيل المثال، ولن تؤثر تغييراتك على بروتوكول Ethereum الحقيقي.

### الاختبار القائم على الخصائص {#property-based-testing-for-smart-contracts}

الاختبار القائم على الملكية هو عملية التحقق من أن العقد الذكي يلبي بعض الخصائص المحددة. تؤكد الخصائص حقائق حول سلوك العقد والتي من المتوقع أن تظل صحيحة في سيناريوهات مختلفة - يمكن أن يكون أحد أمثلة خصائص العقد الذكي "العمليات الحسابية في العقد لا تتجاوز الحد الأقصى أو تتجاوزه أبدًا".

**التحليل الثابت** و**التحليل الديناميكي** هما تقنيتان شائعتان لتنفيذ الاختبار القائم على الخصائص، وكلاهما يمكنه التحقق من أن كود البرنامج (وهو عقد ذكي في هذه الحالة) يفي بخاصية محددة مسبقًا. تحتوي بعض أدوات الاختبار القائمة على الخصائص على قواعد محددة مسبقًا حول خصائص العقد المتوقعة وتتحقق من الكود وفقًا لتلك القواعد، بينما تسمح لك أدوات أخرى بإنشاء خصائص مخصصة لعقد ذكي.

#### التحليل الثابت {#static-analysis}

يقوم المحلل الثابت بأخذ الكود المصدر لعقد ذكي كمدخل ويخرج نتائج توضح ما إذا كان العقد يلبي خاصية أم لا. على عكس التحليل الديناميكي، لا يتضمن التحليل الثابت تنفيذ عقد لتحليله للتأكد من صحته. بدلاً من ذلك، يقوم التحليل الثابت بالتفكير في جميع المسارات المحتملة التي يمكن أن يتخذها العقد الذكي أثناء التنفيذ (أي عن طريق فحص بنية الكود المصدر لتحديد ما قد يعنيه ذلك لعملية العقود في وقت التشغيل).

[التدقيق (Linting)](https://www.perforce.com/blog/qac/what-is-linting) و[الاختبار الثابت](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) هما طريقتان شائعتان لإجراء التحليل الثابت على العقود. كلاهما يتطلب تحليل التمثيلات منخفضة المستوى لتنفيذ العقد مثل [أشجار البنية المجردة](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) و[الرسوم البيانية لتدفق التحكم](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) التي يخرجها المترجم.

في معظم الحالات، يكون التحليل الثابت مفيدًا للكشف عن مشكلات السلامة مثل استخدام هياكل غير آمنة، أو أخطاء بناء الجملة، أو انتهاكات معايير الترميز في كود العقود. ومع ذلك، من المعروف أن المحللين الثابتين غير قادرين بشكل عام على اكتشاف نقاط الضعف العميقة، وقد ينتجون نتائج إيجابية خاطئة مفرطة.

#### التحليل الديناميكي {#dynamic-analysis}

يولد التحليل الديناميكي مدخلات رمزية (على سبيل المثال، في [التنفيذ الرمزي](https://en.m.wikipedia.org/wiki/Symbolic_execution)) أو مدخلات ملموسة (على سبيل المثال، في [fuzzing](https://owasp.org/www-community/Fuzzing)) لوظائف العقود الذكية لمعرفة ما إذا كان أي مسار (مسارات) تنفيذ ينتهك خصائص معينة. يختلف هذا الشكل من الاختبار القائم على الخاصية عن اختبارات الوحدة في أن حالات الاختبار تغطي سيناريوهات متعددة ويتولى البرنامج معالجة إنشاء حالات الاختبار.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) هو مثال على تقنية التحليل الديناميكي للتحقق من الخصائص العشوائية في العقود الذكية. يستدعي fuzzer وظائف في عقد مستهدف مع اختلافات عشوائية أو مشوهة لقيمة إدخال محددة. إذا دخل العقد الذكي في حالة خطأ (على سبيل المثال، حيث يفشل التأكيد)، يتم وضع علامة على المشكلة ويتم إنتاج المدخلات التي تدفع التنفيذ نحو المسار المعرض للخطر في تقرير.

يعد التضليل مفيدًا لتقييم آلية التحقق من صحة مدخلات العقود الذكية نظرًا لأن التعامل غير السليم مع المدخلات غير المتوقعة قد يؤدي إلى تنفيذ غير مقصود وإنتاج تأثيرات خطيرة. يمكن أن يكون هذا الشكل من الاختبار المبني على الملكية مثاليًا لأسباب عديدة:

1. **إن كتابة حالات الاختبار لتغطية العديد من السيناريوهات أمر صعب.** يتطلب اختبار الخاصية فقط أن تقوم بتعريف سلوك ومجموعة من البيانات لاختبار السلوك بها - يقوم البرنامج تلقائيًا بإنشاء حالات اختبار استنادًا إلى الخاصية المحددة.

2. **قد لا تغطي مجموعة الاختبار الخاصة بك جميع المسارات الممكنة داخل البرنامج بشكل كافٍ.** حتى مع التغطية بنسبة 100%، من الممكن أن تفوتك بعض الحالات الهامشية.

3. **تثبت اختبارات الوحدة أن العقد يتم تنفيذه بشكل صحيح لبيانات العينة، ولكن ما إذا كان العقد يتم تنفيذه بشكل صحيح للمدخلات خارج العينة يظل غير معروف.** تنفذ اختبارات الخاصية عقدًا مستهدفًا مع اختلافات متعددة لقيمة إدخال معينة للعثور على آثار التنفيذ التي تسبب فشل التأكيد. وبالتالي، يوفر اختبار الخاصية مزيدًا من الضمانات بأن العقد يتم تنفيذه بشكل صحيح لفئة واسعة من بيانات الإدخال.

### إرشادات لتشغيل الاختبارات القائمة على الخصائص للعقود الذكية {#running-property-based-tests}

يبدأ تشغيل الاختبار القائم على الخصائص عادةً بتعريف خاصية (على سبيل المثال، غياب [تجاوزات الأعداد الصحيحة](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) أو مجموعة من الخصائص التي تريد التحقق منها في عقد ذكي. قد تحتاج أيضًا إلى تحديد نطاق من القيم التي يمكن للبرنامج من خلالها إنشاء بيانات لمدخلات المعاملات عند كتابة اختبارات الخصائص.

بمجرد تكوينه بشكل صحيح، ستقوم أداة اختبار الخصائص بتنفيذ وظائف العقود الذكية الخاصة بك باستخدام مدخلات تم إنشاؤها عشوائيًا. إذا كان هناك أي انتهاكات للتأكيدات، فيجب عليك الحصول على تقرير يحتوي على بيانات إدخال محددة تنتهك العقار قيد التقييم. راجع بعض الأدلة أدناه للبدء في تشغيل الاختبار القائم على الخاصية باستخدام أدوات مختلفة:

- **[التحليل الثابت للعقود الذكية باستخدام Slither](https://github.com/crytic/slither)**
- **[التحليل الثابت للعقود الذكية باستخدام Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[الاختبار القائم على الخصائص باستخدام Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[اختبار Fuzzing للعقود باستخدام Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[اختبار Fuzzing للعقود باستخدام Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[اختبار Fuzzing للعقود باستخدام Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[التنفيذ الرمزي للعقود الذكية باستخدام Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[التنفيذ الرمزي للعقود الذكية باستخدام Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## الاختبار اليدوي للعقود الذكية {#manual-testing-for-smart-contracts}

غالبًا ما يأتي الاختبار اليدوي للعقود الذكية في وقت لاحق في دورة التطوير بعد تشغيل الاختبارات الآلية. يقوم هذا النموذج من الاختبار بتقييم العقد الذكي باعتباره منتجًا متكاملًا بالكامل لمعرفة ما إذا كان يعمل كما هو محدد في المتطلبات الفنية.

### اختبار العقود على بلوكتشين محلي {#testing-on-local-blockchain}

على الرغم من أن الاختبار الآلي الذي يتم إجراؤه في بيئة تطوير محلية يمكن أن يوفر معلومات تصحيح أخطاء مفيدة، إلا أنك سترغب في معرفة كيفية تصرف عقدك الذكي في بيئة الإنتاج. ومع ذلك، فإن النشر على سلسلة Ethereum الرئيسية يتكبد رسومًا للغاز - ناهيك عن أنك أو مستخدميك قد تخسرون أموالاً حقيقية إذا كان عقدك الذكي لا يزال يحتوي على أخطاء.

يعد اختبار عقدك على بلوكتشين محلي (المعروف أيضًا باسم [شبكة التطوير](/developers/docs/development-networks/)) بديلاً موصى به للاختبار على الشبكة الرئيسية. سلسلة الكتل المحلية عبارة عن نسخة من سلسلة كتل الإيثريوم تعمل محليًا على جهاز الكمبيوتر الخاص بك والتي تحاكي سلوك طبقة تنفيذ الإيثريوم. وبالتالي، يمكنك برمجة المعاملات للتفاعل مع العقد دون تكبد تكاليف إضافية كبيرة.

قد يكون تشغيل العقود على blockchain المحلية مفيدًا كشكل من أشكال اختبار التكامل اليدوي. [تتميز العقود الذكية بسهولة تكوينها](/developers/docs/smart-contracts/composability/)، مما يسمح لك بالتكامل مع البروتوكولات الموجودة - ولكنك ستظل بحاجة إلى التأكد من أن مثل هذه التفاعلات المعقدة على السلسلة تنتج النتائج الصحيحة.

[المزيد عن شبكات التطوير.](/developers/docs/development-networks/)

### اختبار العقود على شبكات الاختبار {#testing-contracts-on-testnets}

تعمل شبكة الاختبار أو testnet تمامًا مثل شبكة Ethereum Mainnet، إلا أنها تستخدم الأثير (ETH) بدون قيمة حقيقية في العالم الحقيقي.
taemal shabakat aliakhtibar 'aw testnet tmaman mithl shabakat Ethereum Mainnet, 'iilaa 'anaha tastakhdim al'athir (ETH) bidun qimat haqiqiat fi alealam alhaqiqii إن نشر عقدك على [شبكة الاختبار](/developers/docs/networks/#ethereum-testnets) يعني أن أي شخص يمكنه التفاعل معه (على سبيل المثال، عبر الواجهة الأمامية للتطبيق اللامركزي) دون تعريض الأموال للخطر.

يُعد هذا الشكل من الاختبار اليدوي مفيدًا لتقييم التدفق الشامل لتطبيقك من وجهة نظر المستخدم
yued hadha alshakl min aliakhtibar alyadawii mfydan litaqyim altadafuq alshaamil litatbiqik min wijhat nazar almustakhdam هنا، يمكن لمختبري النسخة التجريبية أيضًا إجراء عمليات تجريبية والإبلاغ عن أي مشكلات تتعلق بمنطق أعمال العقد والوظائف العامة.
huna, yumkin limukhtabiri alnuskhat altajribiat aydan 'iijra' eamaliaat tajribiat wal'iiblagh ean 'ayi mushkilat tataealaq bimantiq 'aemal aleaqd walwazayif aleamati.

يعد النشر على شبكة اختبار بعد الاختبار على blockchain محلي أمرًا مثاليًا نظرًا لأن الأول أقرب إلى سلوك Ethereum Virtual Machine.
yueadu alnashr ealaa shabakat akhtibar baed aliakhtibar ealaa blockchain mahaliyin amran mthalyan nzran li'ana al'awal 'aqrab 'iilaa suluk Ethereum Virtual Machine. لذلك، من الشائع بالنسبة للعديد من مشاريع Ethereum الأصلية نشر تطبيقات لامركزية على شبكات الاختبار لتقييم عملية العقود الذكية في ظل ظروف العالم الحقيقي.
lidhalika, min alshaayie bialnisbat lileadid min masharie Ethereum al'asliat nashr tatbiqat lamarkaziat ealaa shabakat alaikhtibar litaqyim eamaliat aleuqud aldhakiat fi zili zuruf alealam alhaqiqii.

[المزيد عن شبكات اختبار إيثريوم.](/developers/docs/development-networks/#public-beacon-testchains)

## الاختبار مقابل التحقق الرسمي {#testing-vs-formal-verification}

While testing helps confirm that a contract returns the expected results for some data inputs, it cannot conclusively prove the same for inputs not used during tests. لذلك، فإن اختبار العقد الذكي لا يمكنه ضمان "الصحة الوظيفية" (أي أنه لا يمكنه إظهار أن البرنامج يتصرف كما هو مطلوب لـ_جميع_ مجموعات قيم الإدخال).

التحقق الرسمي هو نهج لتقييم صحة البرنامج من خلال التحقق مما إذا كان النموذج الرسمي للبرنامج يتطابق مع المواصفات الرسمية.
altahaquq alrasmiu hu nahj litaqyim sihat albarnamaj min khilal altahaquq mimaa 'iidha kan alnamudhaj alrasmiu lilbarnamaj yatatabaq mae almuasafat alrasmiati. النموذج الرسمي هو تمثيل رياضي مجرد لبرنامج، في حين أن المواصفات الرسمية تحدد خصائص البرنامج (أي التأكيدات المنطقية حول تنفيذ البرنامج).
alnamudhaj alrasmiu hu tamthil riadiun mujarad libarnamaji, fi hin 'ana almuasafat alrasmiat tuhadid khasayis albarnamaj ('aya altaakidat almantiqiat hawl tanfidh albarnamaji).

نظرًا لأن الخصائص مكتوبة بمصطلحات رياضية، فمن الممكن التحقق من أن النموذج الرسمي (الرياضي) للنظام يلبي المواصفات باستخدام قواعد الاستدلال المنطقي.
nzran li'ana alkhasayis maktubat bimustalahat riadiatin, famin almumkin altahaquq min 'ana alnamudhaj alrasmia (alriyadi) lilnizam yulabiy almuasafat biastikhdam qawaeid aliastidlal almantiqii. وبالتالي، يُقال إن أدوات التحقق الرسمية تُنتج "دليلاً رياضياً" على صحة النظام.
wabialtaali, yuqal 'iina 'adawat altahaquq alrasmiat tuntj "dlylaan ryadyaan" ealaa sihat alnizami.

على عكس الاختبار، يمكن استخدام التحقق الرسمي للتأكد من أن تنفيذ العقود الذكية يلبي مواصفات رسمية لـ_جميع_ عمليات التنفيذ (أي أنه لا يحتوي على أخطاء) دون الحاجة إلى تنفيذه باستخدام بيانات العينة. لا يؤدي هذا إلى تقليل الوقت المستغرق في تشغيل العشرات من اختبارات الوحدة فحسب، بل إنه أيضًا أكثر فعالية في اكتشاف الثغرات الأمنية المخفية.
la yuadiy hadha 'iilaa taqlil alwaqt almustaghraq fi tashghil aleasharat min aikhtibarat alwahdat fahusbu, bal 'iinah aydan 'akthar faeaaliatan fi aiktishaf althagharat al'amniat almakhfiati. ومع ذلك، فإن تقنيات التحقق الرسمية تقع على طيف يعتمد على صعوبة تنفيذها ومدى فائدتها.
wamae dhalika, fa'iina tiqniaat altahaquq alrasmiat taqae ealaa tayf yaetamid ealaa sueubat tanfidhiha wamadaa fayidatiha.

[المزيد عن التحقق الرسمي للعقود الذكية.](/developers/docs/smart-contracts/formal-verification)

## الاختبار مقابل عمليات التدقيق ومكافآت الأخطاء {#testing-vs-audits-bug-bounties}

وكما ذكرنا، نادراً ما يمكن للاختبارات الصارمة ضمان عدم وجود أخطاء في العقد؛ ويمكن أن توفر أساليب التحقق الرسمية ضمانات أقوى للصحة، ولكنها يصعب استخدامها حالياً وتتطلب تكاليف كبيرة.

ومع ذلك، يمكنك زيادة احتمال اكتشاف ثغرات العقد من خلال الحصول على مراجعة مستقلة للكود. [تدقيقات العقود الذكية](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) و[مكافآت الأخطاء](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) هما طريقتان لجعل الآخرين يحللون عقودك.

يتم إجراء عمليات التدقيق من قبل مدققين لديهم خبرة في العثور على حالات الثغرات الأمنية وممارسات التطوير الرديئة في العقود الذكية. عادةً ما يتضمن التدقيق الاختبار (وربما التحقق الرسمي) بالإضافة إلى المراجعة اليدوية لقاعدة التعليمات البرمجية بأكملها.

على العكس من ذلك، فإن برنامج مكافأة الأخطاء عادة ما ينطوي على تقديم مكافأة مالية لشخص (يُطلق عليه عادةً اسم [مخترقي القبعات البيضاء](https://en.wikipedia.org/wiki/White_hat_\(computer_security\))) يكتشف ثغرة أمنية في عقد ذكي ويكشفها للمطورين. Bug bounties are similar to audits since it involves asking others to help find defects in smart contracts.

الفرق الرئيسي هو أن برامج مكافأة الأخطاء مفتوحة لمجتمع المطورين/المتسللين الأوسع وتجذب فئة واسعة من المتسللين الأخلاقيين ومحترفي الأمن المستقلين ذوي المهارات والخبرات الفريدة. This may be an advantage over smart contract audits that mainly rely on teams who may possess limited or narrow expertise.

## أدوات ومكتبات الاختبار {#testing-tools-and-libraries}

### أدوات اختبار الوحدة {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _أداة تغطية الكود للعقود الذكية المكتوبة بلغة Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _إطار عمل لتطوير واختبار العقود الذكية المتقدمة (يعتمد على ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _أداة لاختبار عقود Solidity الذكية._ Works underneath Remix IDE "Solidity Unit Testing" plugin which is used to write and run test cases for a contract._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _مكتبة تأكيد لاختبار عقود إيثريوم الذكية._ Make sure your contracts behave as expected!_

- **[إطار عمل اختبار الوحدات Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _يستخدم Brownie إطار Pytest، وهو إطار عمل اختبار غني بالميزات يتيح لك كتابة اختبارات صغيرة بأقل قدر من التعليمات البرمجية، ويتوسع بشكل جيد للمشاريع الكبيرة، كما أنه قابل للتوسع بدرجة كبيرة._

- **[اختبارات Foundry](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _تقدم Foundry إطار Forge، وهو إطار عمل سريع ومرن لاختبار Ethereum قادر على تنفيذ اختبارات وحدات بسيطة، وفحوصات تحسين الغاز، وfuzzing العقود._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _إطار عمل لاختبار العقود الذكية يعتمد على ethers.js وMocha وChai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _إطار عمل للتطوير والاختبار قائم على Python للعقود الذكية التي تستهدف آلة إيثريوم الافتراضية._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _إطار عمل قائم على بايثون لاختبار الوحدات وfuzzing مع إمكانيات تصحيح أخطاء قوية ودعم اختبار عبر السلسلة، باستخدام pytest وAnvil للحصول على أفضل تجربة مستخدم وأداء._

### أدوات الاختبار القائم على الخصائص {#property-based-testing-tools}

#### أدوات التحليل الثابت {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _إطار عمل تحليل ثابت قائم على Python بلغة Solidity للبحث عن الثغرات الأمنية، وتحسين فهم الكود، وكتابة تحليلات مخصصة للعقود الذكية._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _أداة Linter لتطبيق أفضل ممارسات الأسلوب والأمان للغة برمجة العقود الذكية Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _محلل ثابت قائم على Rust مصمم خصيصًا لأمان وتطوير عقود Web3 الذكية._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _إطار عمل تحليل ثابت قائم على بايثون مع كاشفات للثغرات الأمنية وجودة الكود، وطابعات لاستخراج المعلومات المفيدة من الكود ودعم لكتابة وحدات فرعية مخصصة._

- **[Slippy](https://github.com/fvictorio/slippy)** - _أداة تدقيق (linter) بسيطة وقوية للغة Solidity._

#### أدوات التحليل الديناميكي {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _أداة fuzzing سريعة للعقود للكشف عن الثغرات الأمنية في العقود الذكية من خلال الاختبار القائم على الخصائص._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _أداة Fuzzing آلية مفيدة للكشف عن انتهاكات الخصائص في كود العقد الذكي._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _إطار عمل تنفيذ رمزي ديناميكي لتحليل الكود الثنائي (bytecode) لآلة إيثريوم الافتراضية (EVM)._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _أداة تقييم الكود الثنائي (bytecode) لآلة الإيثريوم الافتراضية (EVM) للكشف عن ثغرات العقود باستخدام تحليل التلوث، والتحليل التوافقي، وفحص تدفق التحكم._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble هي لغة مواصفات وأداة للتحقق من وقت التشغيل تتيح لك إضافة تعليقات توضيحية على العقود الذكية بخصائص تسمح لك باختبار العقود تلقائيًا باستخدام أدوات مثل Diligence Fuzzing أو MythX._

## دروس تعليمية ذات صلة {#related-tutorials}

- [نظرة عامة ومقارنة لمنتجات الاختبار المختلفة](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [كيفية استخدام Echidna لاختبار العقود الذكية](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [كيفية استخدام Manticore للعثور على أخطاء العقود الذكية](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [كيفية استخدام Slither للعثور على أخطاء العقود الذكية](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [كيفية محاكاة عقود Solidity للاختبار](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [كيفية تشغيل اختبارات الوحدة في Solidity باستخدام Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## قراءة إضافية{#further-reading}

- [دليل متعمق لاختبار عقود إيثريوم الذكية](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [كيفية اختبار عقود إيثريوم الذكية](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [دليل MolochDAO لاختبار الوحدة للمطورين](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [كيف تختبر العقود الذكية كالمحترفين](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
