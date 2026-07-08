---
title: Utangulizi wa steki ya Ethereum
description: Mwongozo wa tabaka tofauti za steki ya Ethereum na jinsi zinavyofanya kazi pamoja.
lang: sw
---

Kama steki yoyote ya programu, "steki ya Ethereum" kamili itatofautiana kutoka mradi hadi mradi kulingana na malengo yako.

Hata hivyo, kuna vijenzi vya msingi vya Ethereum ambavyo husaidia kutoa kielelezo cha kiakili cha jinsi programu tumizi zinavyoingiliana na mnyororo wa vitalu wa Ethereum. Kuelewa tabaka za steki kutakusaidia kuelewa njia tofauti ambazo Ethereum inaweza kuunganishwa katika miradi ya programu.

## Kiwango cha 1: Mashine Pepe ya Ethereum (Ethereum Virtual Machine) {#ethereum-virtual-machine}

[Mashine Pepe ya Ethereum (EVM)](/developers/docs/evm/) ni mazingira ya utekelezaji kwa mikataba mahiri kwenye Ethereum. Mikataba yote mahiri na mabadiliko ya hali kwenye mnyororo wa vitalu wa Ethereum hutekelezwa na [miamala](/developers/docs/transactions/). EVM inashughulikia uchakataji wote wa miamala kwenye mtandao wa Ethereum.

Kama ilivyo kwa mashine pepe yoyote, EVM huunda kiwango cha ufupisho kati ya msimbo unaotekelezwa na mashine inayotekeleza (nodi ya Ethereum). Kwa sasa, EVM inafanya kazi kwenye maelfu ya nodi zilizosambazwa kote ulimwenguni.

Kwa ndani, EVM hutumia seti ya maagizo ya msimbo wa operesheni kutekeleza kazi maalum. Misimbo hii ya operesheni (140 ya kipekee) inaruhusu EVM kuwa [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness), ambayo inamaanisha EVM ina uwezo wa kukokotoa karibu chochote, ikipewa rasilimali za kutosha.

Kama msanidi wa programu tumizi iliyogatuliwa (dapp), huhitaji kujua mengi kuhusu EVM isipokuwa kwamba ipo na kwamba inawezesha programu zote kwenye Ethereum kwa uhakika bila wakati wa kupumzika.

## Kiwango cha 2: Mikataba mahiri {#smart-contracts}

[Mikataba mahiri](/developers/docs/smart-contracts/) ni programu zinazoweza kutekelezwa ambazo hufanya kazi kwenye mnyororo wa vitalu wa Ethereum.

Mikataba mahiri huandikwa kwa kutumia [lugha maalum za programu](/developers/docs/smart-contracts/languages/) ambazo hukusanywa kuwa msimbo wa baiti wa EVM (maagizo ya mashine ya kiwango cha chini yanayoitwa misimbo ya operesheni).

Sio tu kwamba mikataba mahiri hutumika kama maktaba za chanzo wazi, kimsingi ni huduma za API wazi ambazo zinafanya kazi kila wakati na haziwezi kushushwa. Mikataba mahiri hutoa vitendaji vya umma ambavyo watumiaji na programu ([dapps](/developers/docs/dapps/)) wanaweza kuingiliana navyo, bila kuhitaji ruhusa. Programu yoyote inaweza kuunganishwa na mikataba mahiri iliyosambazwa ili kutunga utendaji, kama vile kuongeza [milisho ya data](/developers/docs/oracles/) au kusaidia ubadilishanaji wa tokeni. Zaidi ya hayo, mtu yeyote anaweza kusambaza mikataba mahiri mipya kwenye Ethereum ili kuongeza utendaji maalum ili kukidhi mahitaji ya programu yao.

Kama msanidi wa dapp, utahitaji kuandika mikataba mahiri tu ikiwa unataka kuongeza utendaji maalum kwenye mnyororo wa vitalu wa Ethereum. Unaweza kugundua kuwa unaweza kufikia mahitaji mengi au yote ya mradi wako kwa kuunganisha tu na mikataba mahiri iliyopo, kwa mfano ikiwa unataka kusaidia malipo katika sarafu thabiti (stablecoins) au kuwezesha ubadilishanaji uliogatuliwa wa tokeni.

## Kiwango cha 3: Nodi za Ethereum {#ethereum-nodes}

Ili programu iweze kuingiliana na mnyororo wa vitalu wa Ethereum, lazima iunganishwe na [nodi ya Ethereum](/developers/docs/nodes-and-clients/). Kuunganisha kwenye nodi hukuruhusu kusoma data ya mnyororo wa vitalu na/au kutuma miamala kwenye mtandao.

Nodi za Ethereum ni kompyuta zinazoendesha programu - mteja wa Ethereum. Mteja ni utekelezaji wa Ethereum ambao huthibitisha miamala yote katika kila kitalu, kuweka mtandao salama na data kuwa sahihi. **Nodi za Ethereum ndio mnyororo wa vitalu wa Ethereum**. Kwa pamoja huhifadhi hali ya mnyororo wa vitalu wa Ethereum na kufikia mwafaka juu ya miamala ili kubadilisha hali ya mnyororo wa vitalu.

Kwa kuunganisha programu yako kwenye nodi ya Ethereum (kupitia [API ya JSON-RPC](/developers/docs/apis/json-rpc/)), programu yako inaweza kusoma data kutoka kwenye mnyororo wa vitalu (kama vile salio la akaunti ya mtumiaji) na pia kutangaza miamala mipya kwenye mtandao (kama vile kuhamisha ETH kati ya akaunti za watumiaji au kutekeleza vitendaji vya mikataba mahiri).

## Kiwango cha 4: API za mteja wa Ethereum {#ethereum-client-apis}

Maktaba nyingi za urahisi (zilizojengwa na kudumishwa na jumuiya ya chanzo wazi ya Ethereum) huruhusu programu zako kuunganishwa na kuwasiliana na mnyororo wa vitalu wa Ethereum.

Ikiwa programu yako inayomkabili mtumiaji ni programu ya wavuti, unaweza kuchagua `npm install` [API ya JavaScript](/developers/docs/apis/javascript/) moja kwa moja kwenye mbele yako (frontend). Au labda utachagua kutekeleza utendaji huu upande wa seva, ukitumia API ya [Python](/developers/docs/programming-languages/python/) au [Java](/developers/docs/programming-languages/java/).

Ingawa API hizi sio sehemu ya lazima ya steki, zinaondoa ugumu mwingi wa kuingiliana moja kwa moja na nodi ya Ethereum. Pia hutoa vitendaji vya matumizi (k.m., kubadilisha ETH kuwa Gwei) ili kama msanidi uweze kutumia muda mchache kushughulika na utata wa wateja wa Ethereum na muda mwingi kuzingatia utendaji maalum kwa programu yako.

## Kiwango cha 5: Programu za mtumiaji wa mwisho {#end-user-applications}

Katika kiwango cha juu cha steki kuna programu zinazowakabili watumiaji. Hizi ni programu za kawaida unazotumia na kujenga mara kwa mara leo: hasa programu za wavuti na simu.

Njia unayotengeneza miingiliano hii ya watumiaji inabaki bila kubadilika kimsingi. Mara nyingi watumiaji hawatahitaji kujua programu wanayotumia imejengwa kwa kutumia mnyororo wa vitalu.

## Uko tayari kuchagua steki yako? {#ready-to-choose-your-stack}

Angalia mwongozo wetu wa [kuweka mazingira ya maendeleo ya ndani](/developers/local-environment/) kwa programu yako ya Ethereum.

## Usomaji zaidi {#further-reading}

- [Usanifu wa programu ya Wavuti 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Je, unajua rasilimali ya jumuiya iliyokusaidia? Hariri ukurasa huu na uiongeze!_