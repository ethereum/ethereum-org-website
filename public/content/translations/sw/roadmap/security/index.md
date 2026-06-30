---
title: Ethereum iliyo salama zaidi
description: Ethereum ndio jukwaa salama zaidi na lililogatuliwa la mikataba mahiri lililopo. Hata hivyo, bado kuna maboresho yanayoweza kufanywa ili Ethereum iendelee kuwa imara dhidi ya kiwango chochote cha mashambulizi kwa muda mrefu ujao.
lang: sw
image: /images/roadmap/roadmap-security.png
alt: "Ramani ya njia ya Ethereum"
template: roadmap
---

**Tayari Ethereum ni jukwaa salama sana**, lililogatuliwa la [mkataba mahiri](/glossary/#smart-contract). Hata hivyo, bado kuna maboresho yanayoweza kufanywa ili Ethereum iendelee kuwa imara dhidi ya aina zote za mashambulizi kwa muda mrefu ujao. Haya yanajumuisha mabadiliko madogo katika jinsi [wateja wa Ethereum](/glossary/#consensus-client) wanavyoshughulikia [vitalu](/glossary/#block) vinavyoshindana, pamoja na kuongeza kasi ambayo mtandao unachukulia vitalu kuwa ["yaliyokamilishwa"](/developers/docs/consensus-mechanisms/pos/#finality) (ikimaanisha haviwezi kubadilishwa bila hasara kubwa za kiuchumi kwa mshambuliaji).

Pia kuna maboresho yanayofanya udhibiti wa miamala kuwa mgumu zaidi kwa kuwafanya wapendekezaji wa bloku wasione yaliyomo halisi ya vitalu vyao, na njia mpya za kutambua wakati mteja anadhibiti. Pamoja maboresho haya yataboresha itifaki ya [Uthibitisho wa Dau (PoS)](/glossary/#pos) ili watumiaji - kuanzia watu binafsi hadi mashirika - wawe na imani ya papo hapo katika programu, data na rasilimali zao kwenye Ethereum.

## Utoaji wa dhamana {#staking-withdrawals}

Uboreshaji kutoka [Uthibitisho wa Kazi (PoW)](/glossary/#pow) kwenda Uthibitisho wa Dau (PoS) ulianza kwa waanzilishi wa Ethereum “kuweka dhamana” ya ETH zao katika mkataba wa amana. ETH hiyo inatumika kulinda mtandao. Kulikuwa na sasisho la pili mnamo Aprili 12, 2023 ili kuruhusu wathibitishaji kutoa ETH iliyowekwa dhamana. Tangu wakati huo wathibitishaji wanaweza kuweka dhamana au kutoa ETH kwa uhuru.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Soma kuhusu utoaji</ButtonLink>

## Kujilinda dhidi ya mashambulizi {#defending-against-attacks}

Kuna maboresho yanayoweza kufanywa kwenye itifaki ya Uthibitisho wa Dau (PoS) ya Ethereum. Moja inajulikana kama [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - algoriti salama zaidi ya uchaguzi wa [mchepuo](/glossary/#fork) inayofanya aina fulani za mashambulizi ya kisasa kuwa magumu zaidi.

Kupunguza muda ambao Ethereum inachukua [kukamilisha](/glossary/#finality) vitalu kutatoa uzoefu bora kwa mtumiaji na kuzuia mashambulizi ya kisasa ya "upangaji upya" ambapo washambuliaji hujaribu kupanga upya vitalu vya hivi karibuni sana ili kupata faida au kudhibiti miamala fulani. [**Uthibitisho wa mwisho wa sloti moja (SSF)**](/roadmap/single-slot-finality/) ni **njia ya kupunguza ucheleweshaji wa ukamilishaji**. Sasa hivi kuna thamani ya dakika 15 za vitalu ambavyo mshambuliaji anaweza kinadharia kuwashawishi wathibitishaji wengine kuvipanga upya. Pamoja na SSF, kuna 0. Watumiaji, kuanzia watu binafsi hadi programu na mabadilishano, wananufaika na uhakikisho wa haraka kwamba miamala yao haitarejeshwa nyuma, na mtandao unanufaika kwa kuzima kundi zima la mashambulizi.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Soma kuhusu uthibitisho wa mwisho wa sloti moja</ButtonLink>

## Kujilinda dhidi ya udhibiti {#defending-against-censorship}

Ugatuzi unazuia watu binafsi au vikundi vidogo vya [wathibitishaji](/glossary/#validator) kuwa na ushawishi mkubwa mno. Teknolojia mpya za uwekaji dhamana zinaweza kusaidia kuhakikisha wathibitishaji wa Ethereum wanabaki wamegatuliwa iwezekanavyo huku pia zikiwalinda dhidi ya hitilafu za maunzi, programu na mtandao. Hii inajumuisha programu inayoshiriki majukumu ya mthibitishaji kwenye [nodi](/glossary/#node) nyingi. Hii inajulikana kama **teknolojia ya kithibitishaji kilichosambazwa (DVT)**. [Mabwawa ya uwekaji dhamana](/glossary/#staking-pool) yanahamasishwa kutumia DVT kwa sababu inaruhusu kompyuta nyingi kushiriki kwa pamoja katika uthibitishaji, na kuongeza unakilishi na uvumilivu wa makosa. Pia inagawanya funguo za mthibitishaji kwenye mifumo kadhaa, badala ya kuwa na waendeshaji mmoja wanaoendesha wathibitishaji wengi. Hii inafanya iwe vigumu kwa waendeshaji wasio waaminifu kuratibu mashambulizi kwenye Ethereum. Kwa ujumla, wazo ni kupata faida za usalama kwa kuendesha wathibitishaji kama _jamii_ badala ya watu binafsi.

<ButtonLink variant="outline-color" href="/staking/dvt/">Soma kuhusu teknolojia ya kithibitishaji kilichosambazwa</ButtonLink>

Kutekeleza **utengano wa mpendekezaji na mjengaji (PBS)** kutaboresha sana ulinzi wa ndani wa Ethereum dhidi ya udhibiti. PBS inaruhusu mthibitishaji mmoja kuunda kitalu na mwingine kukitangaza kwenye mtandao wa Ethereum. Hii inahakikisha kwamba faida kutoka kwa algoriti za kitaalamu za ujenzi wa kitalu zinazoongeza faida zinashirikiwa kwa usawa zaidi kwenye mtandao, **kuzuia dhamana kujilimbikiza** kwa waweka dhamana wa kitaasisi wanaofanya vizuri zaidi kadiri muda unavyopita. Mpendekezaji wa bloku anapata kuchagua kitalu chenye faida zaidi anachopewa na soko la wajenga kizuizi. Ili kudhibiti, mpendekezaji wa bloku mara nyingi angelazimika kuchagua kitalu chenye faida ndogo, jambo ambalo lingekuwa **sio la kiakili kiuchumi na pia dhahiri kwa wathibitishaji wengine** kwenye mtandao.

Kuna nyongeza zinazowezekana kwa PBS, kama vile miamala iliyosimbwa kwa njia fiche na orodha za ujumuishaji, ambazo zinaweza kuboresha zaidi upinzani wa udhibiti wa Ethereum. Hizi zinamfanya mjenga kizuizi na mpendekezaji wasione miamala halisi iliyojumuishwa kwenye vitalu vyao.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Soma kuhusu utengano wa mpendekezaji na mjengaji</ButtonLink>

## Kuwalinda wathibitishaji {#protecting-validators}

Inawezekana kwamba mshambuliaji wa kisasa anaweza kuwatambua wathibitishaji wanaokuja na kuwatumia barua taka ili kuwazuia kupendekeza vitalu; hii inajulikana kama shambulio la **kunyimwa huduma (DoS)**. Kutekeleza [**uchaguzi wa siri wa kiongozi (SLE)**](/roadmap/secret-leader-election) kutalinda dhidi ya aina hii ya shambulio kwa kuzuia wapendekezaji wa bloku kujulikana mapema. Hii inafanya kazi kwa kuchanganya mara kwa mara seti ya ahadi za kificho zinazowakilisha wagombea wapendekezaji wa bloku na kutumia mpangilio wao kuamua ni mthibitishaji yupi anachaguliwa kwa njia ambayo wathibitishaji wenyewe pekee ndio wanajua mpangilio wao mapema.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Soma kuhusu uchaguzi wa siri wa kiongozi</ButtonLink>

## Maendeleo ya sasa {#current-progress}

**Maboresho ya usalama kwenye ramani ya njia yako katika hatua za juu za utafiti**, lakini hayatarajiwi kutekelezwa kwa muda. Hatua zinazofuata za view-merge, PBS, SSF na SLE ni kukamilisha vipimo na kuanza kujenga mifano.
