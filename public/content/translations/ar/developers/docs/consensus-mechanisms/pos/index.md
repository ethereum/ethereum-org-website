---
title: إثبات الحصة (PoS)
description: شرح للبروتوكول التوافقي المتعلق بإثبات الحصة ودوره في Ethereum.
lang: ar
---

يعتبر إثبات الحصة (PoS) أساس [آلية الإجماع](/developers/docs/consensus-mechanisms/) في إيثريوم. تحول إيثريوم إلى آلية إثبات الحصة في عام 2022 لأنها أكثر أمانًا وأقل استهلاكًا للطاقة وأفضل لتنفيذ حلول التوسع الجديدة مقارنة ببنية [إثبات العمل](/developers/docs/consensus-mechanisms/pow) السابقة.

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصيك أولاً بالقراءة عن [آليات الإجماع](/developers/docs/consensus-mechanisms/).

## ما هو إثبات الحصة (PoS)؟ {#what-is-pos}

إثبات الحصة هو طريقة لإثبات أن المحققين قد وضعوا شيئًا ذا قيمة في الشبكة يمكن تدميره إذا تصرفوا بشكل غير نزيه. في إثبات الحصة الخاص بـ Ethereum، يقوم المحققون بوضع رأس المال بشكل صريح في شكل ETH في عقد ذكي على Ethereum. The validator is then responsible for checking that new blocks propagated over the network are valid and occasionally creating and propagating new blocks themselves. إذا حاولوا الاحتيال على الشبكة (على سبيل المثال عن طريق اقتراح كتل متعددة عندما كان ينبغي عليهم إرسال واحدة أو إرسال شهادات متضاربة)، فيمكن تدمير بعض أو كل ETH المودعة لديهم.

## المدققون {#validators}

للمشاركة كمحقق، يجب على المستخدم إيداع 32 ETH في عقد الإيداع وتشغيل ثلاث قطع منفصلة من البرامج: عميل التنفيذ، وعميل الإجماع، وعميل المحقق. On depositing their ETH, the user joins an activation queue that limits the rate of new validators joining the network. Once activated, validators receive new blocks from peers on the Ethereum network. يتم إعادة تنفيذ المعاملات المقدمة في الكتلة للتحقق من صحة التغييرات المقترحة على حالة Ethereum، ويتم التحقق من توقيع الكتلة. The validator then sends a vote (called an attestation) in favor of that block across the network.

Whereas under proof-of-work, the timing of blocks is determined by the mining difficulty, in proof-of-stake, the tempo is fixed. Time in proof-of-stake Ethereum is divided into slots (12 seconds) and epochs (32 slots). One validator is randomly selected to be a block proposer in every slot. This validator is responsible for creating a new block and sending it out to other nodes on the network. Also in every slot, a committee of validators is randomly chosen, whose votes are used to determine the validity of the block being proposed. يعد تقسيم مجموعة التحقق إلى لجان أمرًا مهمًا للحفاظ على إمكانية إدارة حمل الشبكة. تقوم اللجان بتقسيم مجموعة المحققين بحيث يشهد كل محقق نشط في كل حقبة، ولكن ليس في كل فتحة.

## كيفية تنفيذ المعاملة في إيثريوم PoS {#transaction-execution-ethereum-pos}

The following provides an end-to-end explanation of how a transaction gets executed in Ethereum proof-of-stake.

1. يقوم مستخدم بإنشاء وتوقيع [معاملة](/developers/docs/transactions/) باستخدام مفتاحه الخاص. يتم التعامل مع هذا عادةً بواسطة محفظة أو مكتبة مثل [ethers.js](https://docs.ethers.org/v6/) أو [web3js](https://docs.web3js.org/) أو [web3py](https://web3py.readthedocs.io/en/v5/)، إلخ، ولكن تحت الغطاء، يقدم المستخدم طلبًا إلى عقدة باستخدام [JSON-RPC API](/developers/docs/apis/json-rpc/) الخاصة بإيثريوم. The user defines the amount of gas that they are prepared to pay as a tip to a validator to encourage them to include the transaction in a block. يتم دفع [الإكراميات](/developers/docs/gas/#priority-fee) إلى المدقق بينما يتم حرق [الرسوم الأساسية](/developers/docs/gas/#base-fee).
2. تُقدَّم المعاملة إلى [عميل تنفيذ](/developers/docs/nodes-and-clients/#execution-client) إيثريوم الذي يتحقق من صحتها. This means ensuring that the sender has enough ETH to fulfill the transaction and they have signed it with the correct key.
3. If the transaction is valid, the execution client adds it to its local mempool (list of pending transactions) and also broadcasts it to other nodes over the execution layer gossip network. When other nodes hear about the transaction they add it to their local mempool too. قد يمتنع المستخدمون المتقدمون عن بث معاملاتهم وبدلاً من ذلك يوجهونها إلى منشئي الكتل المتخصصين مثل [مزاد Flashbots](https://docs.flashbots.net/flashbots-auction/overview). يسمح لهم ذلك بتنظيم المعاملات في الكتل القادمة لتحقيق أقصى ربح ([MEV](/developers/docs/mev/#mev-extraction)).
4. أحد عقد التحقق على الشبكة هو مقترح الكتلة للفتحة الحالية، والذي تم اختياره مسبقًا بشكل عشوائي باستخدام RANDAO. This node is responsible for building and broadcasting the next block to be added to the Ethereum blockchain and updating the global state. The node is made up of three parts: an execution client, a consensus client and a validator client. The execution client bundles transactions from the local mempool into an "execution payload" and executes them locally to generate a state change. يتم تمرير هذه المعلومات إلى عميل الإجماع حيث يتم تغليف حمولة التنفيذ كجزء من "كتلة منارة" تحتوي أيضًا على معلومات حول المكافآت والعقوبات والتخفيضات والشهادات وما إلى ذلك التي تمكن الشبكة من الاتفاق على تسلسل الكتل في رأس السلسلة. يتم وصف الاتصال بين عملاء التنفيذ وعملاء الإجماع بمزيد من التفصيل في [توصيل عملاء الإجماع والتنفيذ](/developers/docs/networking-layer/#connecting-clients).
5. Other nodes receive the new beacon block on the consensus layer gossip network. They pass it to their execution client where the transactions are re-executed locally to ensure the proposed state change is valid. ثم يشهد عميل المدقق بأن الكتلة صالحة وهي الكتلة المنطقية التالية في رؤيتهم للسلسلة (مما يعني أنها مبنية على السلسلة ذات الوزن الأكبر من الشهادات كما هو محدد في [قواعد اختيار الانقسام](/developers/docs/consensus-mechanisms/pos/#fork-choice)). The block is added to the local database in each node that attests to it.
6. يمكن اعتبار المعاملة "نهائية" إذا أصبحت جزءًا من سلسلة ذات "رابط أغلبية عظمى" بين نقطتي تفتيش. تحدث نقاط التفتيش في بداية كل عصر وتوجد لتفسر حقيقة مفادها أن مجموعة فرعية فقط من المحققين النشطين يشهدون في كل فتحة، ولكن جميع المحققين النشطين يشهدون عبر كل عصر. لذلك، فإنه فقط بين العصور يمكن إثبات "رابط الأغلبية العظمى" (وهنا حيث تتفق 66٪ من إجمالي ETH المتراكمة على الشبكة على نقطتي تفتيش).

More detail on finality can be found below.

## النهائية {#finality}

تكتسب المعاملة "نهائية" في الشبكات الموزعة عندما تكون جزءًا من كتلة لا يمكن تغييرها دون حرق كمية كبيرة من ETH. On proof-of-stake Ethereum, this is managed using "checkpoint" blocks. The first block in each epoch is a checkpoint. Validators vote for pairs of checkpoints that it considers to be valid. If a pair of checkpoints attracts votes representing at least two-thirds of the total staked ETH, the checkpoints are upgraded. The more recent of the two (target) becomes "justified". The earlier of the two is already justified because it was the "target" in the previous epoch. Now it is upgraded to "finalized". تتم معالجة عملية ترقية النقاط المرجعية هذه بواسطة **[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437)**. Casper-FFG هي أداة لنهائية الكتلة من أجل الإجماع. بمجرد الانتهاء من كتلة ما، لا يمكن إعادتها أو تغييرها دون شطب غالبية أصحاب الحصص، مما يجعلها غير قابلة للتطبيق اقتصاديًا.

To revert a finalized block, an attacker would commit to losing at least one-third of the total supply of staked ETH. السبب الدقيق لذلك موضح في [منشور مدونة مؤسسة إيثريوم](https://blog.ethereum.org/2016/05/09/on-settlement-finality/) هذا. Since finality requires a two-thirds majority, an attacker could prevent the network from reaching finality by voting with one-third of the total stake. هناك آلية للدفاع ضد هذا: [تسرب الخمول](https://eth2book.info/bellatrix/part2/incentives/inactivity). This activates whenever the chain fails to finalize for more than four epochs. The inactivity leak bleeds away the staked ETH from validators voting against the majority, allowing the majority to regain a two-thirds majority and finalize the chain.

## الأمان الاقتصادي المشفر {#crypto-economic-security}

Running a validator is a commitment. The validator is expected to maintain sufficient hardware and connectivity to participate in block validation and proposal. In return, the validator is paid in ETH (their staked balance increases). On the other hand, participating as a validator also opens new avenues for users to attack the network for personal gain or sabotage. To prevent this, validators miss out on ETH rewards if they fail to participate when called upon, and their existing stake can be destroyed if they behave dishonestly. يمكن اعتبار سلوكين أساسيين غير أمينين: اقتراح كتل متعددة في فتحة واحدة (التضليل) وتقديم شهادات متناقضة.

The amount of ETH slashed depends on how many validators are also being slashed at around the same time. يُعرف هذا باسم ["عقوبة الارتباط"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty)، ويمكن أن تكون طفيفة (حوالي 1% من الحصة لمدقق واحد تم شطبه بمفرده) أو يمكن أن تؤدي إلى تدمير 100% من حصة المدقق (حدث شطب جماعي). It is imposed halfway through a forced exit period that begins with an immediate penalty (up to 1 ETH) on Day 1, the correlation penalty on Day 18, and finally, ejection from the network on Day 36. They receive minor attestation penalties every day because they are present on the network but not submitting votes. This all means a coordinated attack would be very costly for the attacker.

## اختيار الانقسام {#fork-choice}

When the network performs optimally and honestly, there is only ever one new block at the head of the chain, and all validators attest to it. However, it is possible for validators to have different views of the head of the chain due to network latency or because a block proposer has equivocated. Therefore, consensus clients require an algorithm to decide which one to favor. تسمى الخوارزمية المستخدمة في إثبات الحصة في إيثريوم [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf)، وهي تعمل عن طريق تحديد الانقسام الذي لديه أكبر وزن من الشهادات في تاريخه.

## إثبات الحصة والأمان {#pos-and-security}

لا يزال تهديد [هجوم 51%](https://www.investopedia.com/terms/1/51-attack.asp) قائمًا في إثبات الحصة كما هو الحال في إثبات العمل، ولكنه أكثر خطورة على المهاجمين. An attacker would need 51% of the staked ETH. They could then use their own attestations to ensure their preferred fork was the one with the most accumulated attestations. The 'weight' of accumulated attestations is what consensus clients use to determine the correct chain, so this attacker would be able to make their fork the canonical one. However, a strength of proof-of-stake over proof-of-work is that the community has flexibility in mounting a counter-attack. For example, the honest validators could decide to keep building on the minority chain and ignore the attacker's fork while encouraging apps, exchanges, and pools to do the same. They could also decide to forcibly remove the attacker from the network and destroy their staked ETH. These are strong economic defenses against a 51% attack.

بالإضافة إلى هجمات 51%، قد يحاول المجرمون السيئون أيضًا القيام بأنواع أخرى من الأنشطة الضارة، مثل:

- هجمات بعيدة المدى (على الرغم من أن الأداة النهائية تحيد متجه الهجوم هذا)
- عمليات إعادة التنظيم قصيرة المدى (على الرغم من أن تعزيز المقترحات ومواعيد التصديق تخفف من هذا)
- هجمات الارتداد والموازنة (يتم التخفيف منها أيضًا عن طريق تعزيز المقترح، وعلى أي حال لم يتم إثبات هذه الهجمات إلا في ظل ظروف الشبكة المثالية)
- هجمات الانهيار الجليدي (يتم تحييدها من خلال قاعدة خوارزميات اختيار الشوكة التي تأخذ في الاعتبار الرسالة الأحدث فقط)

Overall, proof-of-stake, as it is implemented on Ethereum, has been demonstrated to be more economically secure than proof-of-work.

## الإيجابيات والسلبيات{#pros-and-cons}

| الإيجابيات                                                                                                                                                                                                                                                          | السلبيات                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Staking makes it easier for individuals to participate in securing the network, promoting decentralization. validator node can be run on a normal laptop. Staking pools allow users to stake without having 32 ETH. | Proof-of-stake is younger and less battle-tested compared to proof-of-work                              |
| ينطوي تجميد العملات على قدر أكبر من اللامركزية. Economies of scale do not apply in the same way that they do for PoW mining.                                                                                                        | Proof-of-stake is more complex to implement than proof-of-work                                          |
| Proof-of-stake offers greater crypto-economic security than proof-of-work                                                                                                                                                                                           | Users need to run three pieces of software to participate in Ethereum's proof-of-stake. |
| Less issuance of new ETH is required to incentivize network participants                                                                                                                                                                                            |                                                                                                         |

### مقارنة بإثبات العمل {#comparison-to-proof-of-work}

استخدمت Ethereum في الأصل إثبات العمل ولكنها تحولت إلى إثبات الحصة في سبتمبر 2022. يقدم PoS العديد من المزايا مقارنة بـ PoW، مثل:

- better energy efficiency – there is no need to use lots of energy on proof-of-work computations
- lower barriers to entry, reduced hardware requirements – there is no need for elite hardware to stand a chance of creating new blocks
- reduced centralization risk – proof-of-stake should lead to more nodes securing the network
- because of the low energy requirement less ETH issuance is required to incentivize participation
- العقوبات الاقتصادية على سوء السلوك تجعل هجمات الأسلوب أكثر تكلفة بنسبة 51% بالنسبة للمهاجم مقارنة بهجمات إثبات العمل
- the community can resort to social recovery of an honest chain if a 51% attack were to overcome the crypto-economic defenses.

## قراءة إضافية{#further-reading}

- [الأسئلة الشائعة حول إثبات الحصة](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _فيتاليك بوتيرين_
- [ما هو إثبات الحصة](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [ما هو إثبات الحصة ولماذا هو مهم](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _فيتاليك بوتيرين_
- [لماذا إثبات الحصة (نوفمبر 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _فيتاليك بوتيرين_
- [إثبات الحصة: كيف تعلمت أن أحب الذاتية الضعيفة](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _فيتاليك بوتيرين_
- [هجوم ودفاع إثبات الحصة في إيثريوم](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [فلسفة تصميم إثبات الحصة](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _فيتاليك بوتيرين_
- [فيديو: فيتاليك بوتيرين يشرح إثبات الحصة لليكس فريدمان](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## المواضيع ذات الصلة {#related-topics}

- [إثبات العمل](/developers/docs/consensus-mechanisms/pow/)
- [إثبات السلطة](/developers/docs/consensus-mechanisms/poa/)
