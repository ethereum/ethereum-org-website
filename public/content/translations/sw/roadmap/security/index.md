---
title: Ethereum salama zaidi
description: Ethereum ndilo jukwaa salama zaidi na lililogatuliwa la kandarasi mahiri kuwapo. Hata hivyo, bado kuna maboresho ambayo yanaweza kufanywa ili Ethereum iendelee kustahimili kiwango chochote cha mashambulizi katika siku zijazo.
lang: sw
image: /images/roadmap/roadmap-security.png
alt: "Ramani ya maendeleo ya Ethereum"
template: roadmap
---

**Ethereum tayari ni jukwaa salama sana**, lililogatuliwa la [mkataba wa busara](/glossary/#smart-contract). Hata hivyo, bado kuna maboresho ambayo yanaweza kufanywa ili Ethereum iendelee kustahimili kila aina ya mashambulizi katika siku zijazo. Hii ni pamoja na mabadiliko madogo kwa jinsi [wateja wa Ethereum](/glossary/#consensus-client) wanavyoshughulikia [vizuizi](/glossary/#block) vinavyoshindana, na pia kuongeza kasi ambayo mtandao unazingatia vizuizi kuwa ["vimekamilishwa"](/developers/docs/consensus-mechanisms/pos/#finality) (ikimaanisha kuwa haviwezi kubadilishwa bila hasara kubwa za kiuchumi kwa mshambuliaji).

Pia kuna maboresho ambayo hufanya udhibiti wa miamala kuwa mgumu zaidi kwa kuwafanya wapendekeza kuzuia kutoona maudhui halisi ya vizuizi vyao, na njia mpya za kutambua wakati mteja anakagua. Kwa pamoja maboresho haya yataboresha itifaki ya [uthibitisho-wa-hisa](/glossary/#pos) ili watumiaji - kuanzia watu binafsi hadi mashirika - wawe na imani ya papo hapo katika programu, data na rasilimali zao kwenye Ethereum.

## Uondoaji wa Staking {#staking-withdrawals}

Uboreshaji kutoka [uthibitisho-wa-kazi](/glossary/#pow) hadi uthibitisho-wa-hisa ulianza na waanzilishi wa Ethereum "wakiweka hisa" ETH zao katika mkataba wa amana. Hiyo ETH inatumika kulinda mtandao. Kulikuwa na sasisho la pili mnamo Aprili 12, 2023 ili kuruhusu wathibitishaji kutoa ETH iliyowekwa hisa. Tangu wakati huo waidhinishaji wanaweza kuweka hisa au kuondoa ETH bila malipo.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Soma kuhusu uondoaji</ButtonLink>

## Kujilinda dhidi ya mashambulizi {#defending-against-attacks}

Kuna maboresho ambayo yanaweza kufanywa kwa itifaki ya uthibitisho wa hisa ya Ethereum. Mojawapo inajulikana kama [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - algoriti salama zaidi ya kuchagua-[uma](/glossary/#fork) ambayo inafanya aina fulani za mashambulizi ya hali ya juu kuwa magumu zaidi.

Kupunguza muda ambao Ethereum huchukua [kukamilisha](/glossary/#finality) vizuizi kungeboresha uzoefu wa mtumiaji na kuzuia mashambulizi ya hali ya juu ya "reorg" ambapo washambuliaji hujaribu kupanga upya vizuizi vya hivi karibuni ili kupata faida au kudhibiti miamala fulani. [**Ukamilishaji wa nafasi moja (SSF)**](/roadmap/single-slot-finality/) ni **njia ya kupunguza ucheleweshaji wa ukamilishaji**. Hivi sasa kuna vizuizi vya thamani ya dakika 15 ambavyo mshambuliaji anaweza kinadharia kuwashawishi waidhinishaji wengine kusanidi upya. Na SSF, kuna 0. Watumiaji, kuanzia watu binafsi hadi programu na ubadilishanaji, hunufaika kutokana na uhakikisho wa haraka kwamba miamala yao haitarejeshwa, na mtandao unafaidika kwa kuzima aina nzima ya mashambulizi.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Soma kuhusu ukamilishaji wa nafasi moja</ButtonLink>

## Kujilinda dhidi ya udhibiti {#defending-against-censorship}

Ugatuaji huzuia watu binafsi au vikundi vidogo vya [wathibitishaji](/glossary/#validator) kuwa na ushawishi mkubwa mno. Teknolojia mpya za uwekaji hisa zinaweza kusaidia kuhakikisha waidhinishaji wa Ethereum wanasalia kama waliogatuliwa iwezekanavyo huku wakiwatetea dhidi ya hitilafu za maunzi, programu na mtandao. Hii ni pamoja na programu inayoshiriki majukumu ya wathibitishaji katika [nodi](/glossary/#node) nyingi. Hii inajulikana kama **teknolojia ya wathibitishaji iliyosambazwa (DVT)**. [Madimbwi ya kuweka hisa](/glossary/#staking-pool) yanahimizwa kutumia DVT kwa sababu inaruhusu kompyuta nyingi kushiriki kwa pamoja katika uthibitishaji, na kuongeza urudufu na ustahimilivu wa makosa. Pia hugawanya funguo za wathibitishaji katika mifumo kadhaa, badala ya kuwa na waendeshaji mmoja anayeendesha wathibitishaji wengi. Hii inafanya iwe vigumu zaidi kwa waendeshaji wasio waaminifu kuratibu mashambulizi kwenye Ethereum. Kwa ujumla, wazo ni kupata manufaa ya usalama kwa kuendesha wathibitishaji kama _jamii_ badala ya kama watu binafsi.

<ButtonLink variant="outline-color" href="/staking/dvt/">Soma kuhusu teknolojia ya wathibitishaji iliyosambazwa</ButtonLink>

Kutekeleza **utenganishaji wa mpendekezaji-mjengaji (PBS)** kutaboresha kwa kiasi kikubwa ulinzi wa ndani wa Ethereum dhidi ya udhibiti. PBS inaruhusu mthibitishaji mmoja kuunda kizuizi na mwingine kukitangaza kwenye mtandao wote wa Ethereum. Hii inahakikisha kuwa faida kutoka kwa algoriti za kitaalamu za ujenzi wa vizuizi zinazolenga kuongeza faida zinashirikiwa kwa usawa zaidi kwenye mtandao, **ikizuia hisa isijilimbikize** kwa waweka-hisa wa kitaasisi wenye utendaji bora kadri muda unavyopita. Mpendekezaji wa kizuizi anapata fursa ya kuchagua kizuizi chenye faida zaidi kinachotolewa kwake na soko la wajenzi wa vizuizi. Ili kufanya udhibiti, mpendekezaji wa kizuizi mara nyingi atalazimika kuchagua kizuizi chenye faida ndogo, jambo ambalo litakuwa **lisilo na mantiki kiuchumi na pia dhahiri kwa wathibitishaji wengine** kwenye mtandao.

Kuna viongezeo vinavyowezekana kwa PBS, kama vile miamala iliyosimbwa kwa njia fiche na orodha za ujumuishaji, ambavyo vinaweza kuboresha zaidi uwezo wa Ethereum wa kupinga udhibiti. Hivi humfanya mjengaji wa kizuizi na mpendekezaji wasione miamala halisi iliyojumuishwa katika vizuizi vyao.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Soma kuhusu utenganishaji wa mpendekezaji-mjengaji</ButtonLink>

## Kulinda wathibitishaji {#protecting-validators}

Inawezekana kuwa mshambuliaji wa hali ya juu anaweza kuwatambua wathibitishaji wanaofuata na kuwatumia barua taka ili kuwazuia kupendekeza vizuizi; hili linajulikana kama shambulio la **kukataa huduma (DoS)**. Kutekeleza [**uchaguzi wa kiongozi wa siri (SLE)**](/roadmap/secret-leader-election) kutalinda dhidi ya aina hii ya shambulio kwa kuzuia wapendekezaji wa vizuizi wasijulikane mapema. Hii hufanya kazi kwa kuchanganya kila mara seti ya ahadi za kriptografia zinazowakilisha wapendekezaji wa vizuizi watarajiwa na kutumia mpangilio wao kuamua ni mthibitishaji yupi anachaguliwa kwa namna ambayo ni wathibitishaji wenyewe pekee wanaojua mpangilio wao mapema.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Soma kuhusu uchaguzi wa kiongozi wa siri</ButtonLink>

## Maendeleo ya sasa {#current-progress}

**Maboresho ya usalama kwenye mpango kazi yako katika hatua za juu za utafiti**, lakini hayatarajiwi kutekelezwa kwa muda fulani. Hatua zinazofuata za view-merge, PBS, SSF na SLE ni kukamilisha vipimo na kuanza kuunda mifano ya awali.
