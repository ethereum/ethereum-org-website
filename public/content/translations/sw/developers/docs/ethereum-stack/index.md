---
title: Utangulizi wa mpororo wa Ethereum
description: Mapitio ya safu mbalimbali za mpororo wa Ethereum na jinsi zinavyofanya kazi pamoja.
lang: sw
---

Kama ilivyo kwa mpororo wowote wa programu, "mpororo kamili wa Ethereum" utatofautiana kutoka mradi hadi mradi kulingana na malengo yako.

Hata hivyo, kuna vijenzi vya msingi vya Ethereum ambavyo husaidia kutoa muundo wa kiakili wa jinsi programu za kompyuta zinavyoingiliana na mnyororo wa bloku wa Ethereum. Kuelewa safu za mpororo kutakusaidia kuelewa njia tofauti ambazo Ethereum inaweza kuunganishwa katika miradi ya programu.

## Safu ya 1: Mashine halisi ya Ethereum {#ethereum-virtual-machine}

[Mashine halisi ya Ethereum (EVM)](/developers/docs/evm/) ni mazingira ya uendeshaji kwa mikataba-erevu kwenye Ethereum. Mikataba-erevu yote na mabadiliko ya hali kwenye mnyororo wa bloku wa Ethereum hutekelezwa na [miamala](/developers/docs/transactions/). EVM hushughulikia uchakataji wote wa miamala kwenye mtandao wa Ethereum.

Kama ilivyo kwa mashine yoyote halisi, EVM huunda safu ya dhahania kati ya msimbo unaotekelezwa na mashine inayotekeleza (nodi ya Ethereum). Hivi sasa, EVM inaendeshwa kwenye maelfu ya nodi zilizosambazwa kote ulimwenguni.

Kwa undani, EVM hutumia seti ya maagizo ya opcode kutekeleza kazi maalum. Hizi (140 za kipekee) opcodes huruhusu EVM kuwa [kamilifu-kwa-Turing](https://en.wikipedia.org/wiki/Turing_completeness), ambayo ina maana kwamba EVM inaweza kukokotoa karibu kila kitu, ikipewa rasilimali za kutosha.

Kama msanidi programu wa dapp, huhitaji kujua mengi kuhusu EVM isipokuwa kwamba ipo na kwamba inawezesha programu zote kwenye Ethereum kwa uhakika bila muda wa kupumzika.

## Safu ya 2: Mikataba-erevu {#smart-contracts}

[Mikataba-erevu](/developers/docs/smart-contracts/) ni programu zinazoweza kutekelezwa ambazo huendeshwa kwenye mnyororo wa bloku wa Ethereum.

Mikataba-erevu huandikwa kwa kutumia [lugha maalum za programu](/developers/docs/smart-contracts/languages/) ambazo hukusanywa kuwa bytecode ya EVM (maagizo ya mashine ya kiwango cha chini yanayoitwa opcodes).

Sio tu kwamba mikataba-erevu hutumika kama maktaba za chanzo-wazi, kimsingi ni huduma za API zilizo wazi ambazo zinafanya kazi kila wakati na haziwezi kuzimwa. Mikataba-erevu hutoa kazi za umma ambazo watumiaji na programu ([dapps](/developers/docs/dapps/)) wanaweza kuingiliana nazo, bila kuhitaji ruhusa. Programu yoyote inaweza kuunganishwa na mikataba-erevu iliyotumwa ili kutunga utendakazi, kama vile kuongeza [milisho ya data](/developers/docs/oracles/) au kusaidia ubadilishanaji wa tokeni. Zaidi ya hayo, mtu yeyote anaweza kutuma mikataba-erevu mipya kwa Ethereum ili kuongeza utendakazi maalum ili kukidhi mahitaji ya programu yake.

Kama msanidi programu wa dapp, utahitaji kuandika mikataba-erevu ikiwa tu unataka kuongeza utendakazi maalum kwenye mnyororo wa bloku wa Ethereum. Unaweza kugundua kuwa unaweza kufikia mahitaji mengi au yote ya mradi wako kwa kuunganisha tu na mikataba-erevu iliyopo, kwa mfano ikiwa unataka kusaidia malipo kwa stablecoins au kuwezesha ubadilishanaji wa tokeni uliogatuliwa.

## Safu ya 3: Nodi za Ethereum {#ethereum-nodes}

Ili programu iweze kuingiliana na mnyororo wa bloku wa Ethereum, ni lazima iunganishe kwenye [nodi ya Ethereum](/developers/docs/nodes-and-clients/). Kuunganisha kwenye nodi hukuruhusu kusoma data ya mnyororo wa bloku na/au kutuma miamala kwenye mtandao.

Nodi za Ethereum ni kompyuta zinazoendesha programu - mteja wa Ethereum. Mteja ni utekelezaji wa Ethereum unaothibitisha miamala yote katika kila bloku, na kuufanya mtandao kuwa salama na data kuwa sahihi. **Nodi za Ethereum ndizo mnyororo wa bloku wa Ethereum**. Kwa pamoja huhifadhi hali ya mnyororo wa bloku wa Ethereum na kufikia makubaliano kuhusu miamala ya kubadilisha hali ya mnyororo wa bloku.

Kwa kuunganisha programu yako kwenye nodi ya Ethereum (kupitia [API ya JSON-RPC](/developers/docs/apis/json-rpc/)), programu yako inaweza kusoma data kutoka kwenye mnyororo wa bloku (kama vile salio la akaunti ya mtumiaji) na pia kutangaza miamala mipya kwenye mtandao (kama vile kuhamisha ETH kati ya akaunti za watumiaji au kutekeleza kazi za mikataba-erevu).

## Safu ya 4: API za Wateja wa Ethereum {#ethereum-client-apis}

Maktaba nyingi za urahisi (zilizoundwa na kudumishwa na jumuiya ya chanzo-wazi ya Ethereum) huruhusu programu zako kuunganisha na kuwasiliana na mnyororo wa bloku wa Ethereum.

Ikiwa programu yako inayomkabili mtumiaji ni programu ya wavuti, unaweza kuchagua `npm install` [API ya JavaScript](/developers/docs/apis/javascript/) moja kwa moja kwenye frontend yako. Au labda utachagua kutekeleza utendakazi huu upande wa seva, ukitumia [API](/developers/docs/programming-languages/python/) ya [Python](/developers/docs/programming-languages/python/) au [Java](/developers/docs/programming-languages/java/).

Ingawa API hizi si sehemu ya lazima ya mpororo, zinaondoa ugumu mwingi wa kuingiliana moja kwa moja na nodi ya Ethereum. Pia hutoa kazi za matumizi (k.m., kubadilisha ETH kuwa Gwei) ili kama msanidi programu uweze kutumia muda mchache kushughulikia ugumu wa wateja wa Ethereum na muda mwingi zaidi kulenga utendakazi maalum wa programu yako.

## Safu ya 5: Programu za mtumiaji wa mwisho {#end-user-applications}

Katika safu ya juu ya mpororo kuna programu zinazomkabili mtumiaji. Hizi ndizo programu za kawaida unazotumia na kuunda leo: hasa programu za wavuti na za simu.

Njia unayotengeneza violesura hivi vya watumiaji inabaki kimsingi bila kubadilika. Mara nyingi watumiaji hawatahitaji kujua programu wanayotumia imejengwa kwa kutumia mnyororo wa bloku.

## Uko tayari kuchagua mpororo wako? {#ready-to-choose-your-stack}

Angalia mwongozo wetu wa [kuweka mazingira ya usanidi wa ndani](/developers/local-environment/) kwa ajili ya programu yako ya Ethereum.

## Masomo zaidi {#further-reading}

- [Usanifu wa programu ya Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_
