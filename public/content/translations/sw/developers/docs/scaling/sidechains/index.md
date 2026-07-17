---
title: Minyororo ya kando
description: Utangulizi wa minyororo ya kando kama suluhisho la kuongeza uwezo linalotumiwa kwa sasa na jamii ya Ethereum.
lang: sw
sidebarDepth: 3
---

Mnyororo wa kando ni mnyororo wa vitalu tofauti unaofanya kazi kwa kujitegemea na [Ethereum](/) na umeunganishwa kwenye Mtandao Mkuu wa Ethereum kwa daraja la njia mbili. Minyororo ya kando inaweza kuwa na vigezo tofauti vya kitalu na [aligoriti za mwafaka](/developers/docs/consensus-mechanisms/), ambazo mara nyingi zimeundwa kwa ajili ya uchakataji mzuri wa miamala. Kutumia mnyororo wa kando kunahusisha maelewano, ingawa, kwa kuwa havirithi sifa za usalama za Ethereum. Tofauti na [masuluhisho ya kuongeza uwezo ya tabaka la 2 (l2)](/layer-2/), minyororo ya kando haitumi mabadiliko ya hali na data ya muamala kurudi kwenye Mtandao Mkuu wa Ethereum.

Minyororo ya kando pia hujitolea kiasi fulani cha ugatuzi au usalama ili kufikia uwezo wa upitishaji wa juu ([utatu wa kuongeza uwezo](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum, hata hivyo, imejitolea kuongeza uwezo bila kuathiri ugatuzi na usalama.

## Minyororo ya kando inafanyaje kazi? {#how-do-sidechains-work}

Minyororo ya kando ni minyororo ya vitalu inayojitegemea, yenye historia tofauti, ramani za maendeleo, na mazingatio ya muundo. Ingawa mnyororo wa kando unaweza kushiriki baadhi ya mfanano wa juu juu na Ethereum, una vipengele kadhaa tofauti.

### Aligoriti za mwafaka {#consensus-algorithms}

Moja ya sifa zinazofanya minyororo ya kando kuwa ya kipekee (yaani, tofauti na Ethereum) ni aligoriti ya mwafaka inayotumika. Minyororo ya kando haitegemei Ethereum kwa mwafaka na inaweza kuchagua itifaki mbadala za mwafaka zinazokidhi mahitaji yao. Baadhi ya mifano ya aligoriti za mwafaka zinazotumika kwenye minyororo ya kando ni pamoja na:

- [Uthibitisho wa mamlaka (PoA)](/developers/docs/consensus-mechanisms/poa/)
- [Uthibitisho wa Dau uliokabidhiwa](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Uvumilivu wa makosa ya Byzantine](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Kama Ethereum, minyororo ya kando ina nodi za kuthibitisha ambazo huthibitisha na kuchakata miamala, kuzalisha vitalu, na kuhifadhi hali ya mnyororo wa vitalu. Wathibitishaji pia wana jukumu la kudumisha mwafaka kwenye mtandao na kuulinda dhidi ya mashambulizi mabaya.

#### Vigezo vya kitalu {#block-parameters}

Ethereum huweka mipaka kwenye [muda wa kitalu](/developers/docs/blocks/#block-time) (yaani, muda unaochukua kuzalisha vitalu vipya) na [ukubwa wa kitalu](/developers/docs/blocks/#block-size) (yaani, kiasi cha data kilichomo kwa kila kitalu kinachotajwa katika gesi). Kinyume chake, minyororo ya kando mara nyingi huchukua vigezo tofauti, kama vile muda wa kitalu wa haraka na mipaka ya juu ya gesi, ili kufikia uwezo wa upitishaji wa juu, miamala ya haraka, na ada za chini.

Ingawa hii ina faida fulani, ina athari muhimu kwa ugatuzi na usalama wa mtandao. Vigezo vya kitalu, kama vile muda wa kitalu wa haraka na ukubwa mkubwa wa kitalu, huongeza ugumu wa kuendesha nodi kamili—na kuacha "nodi kuu" chache zikiwa na jukumu la kulinda mnyororo. Katika hali kama hiyo, uwezekano wa wathibitishaji kula njama au kuchukua udhibiti mbaya wa mnyororo huongezeka.

Ili minyororo ya vitalu iongeze uwezo bila kudhuru ugatuzi, kuendesha nodi lazima iwe wazi kwa kila mtu—sio lazima wahusika walio na maunzi maalum. Hii ndiyo sababu juhudi zinaendelea ili kuhakikisha kila mtu anaweza [kuendesha nodi kamili](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) kwenye mtandao wa Ethereum.

### Utangamano wa EVM {#evm-compatibility}

Baadhi ya minyororo ya kando inatangamana na EVM na ina uwezo wa kutekeleza mikataba iliyotengenezwa kwa ajili ya [Mashine Pepe ya Ethereum (EVM)](/developers/docs/evm/). Minyororo ya kando inayoendana na EVM inasaidia mikataba mahiri [iliyoandikwa kwa Solidity](/developers/docs/smart-contracts/languages/), pamoja na lugha zingine za mkataba mahiri wa EVM, ambayo inamaanisha mikataba mahiri iliyoandikwa kwa ajili ya Mtandao Mkuu wa Ethereum pia itafanya kazi kwenye minyororo ya kando inayoendana na EVM.

Hii inamaanisha ikiwa unataka kutumia [programu tumizi iliyogatuliwa (dapp)](/developers/docs/dapps/) yako kwenye mnyororo wa kando, ni suala tu la kusambaza [mkataba mahiri](/developers/docs/smart-contracts/) wako kwenye mnyororo huu wa kando. Inaonekana, inahisika, na inatenda kama Mtandao Mkuu—unaandika mikataba katika Solidity, na kuingiliana na mnyororo kupitia RPC ya minyororo ya kando.

Kwa sababu minyororo ya kando inatangamana na EVM, inachukuliwa kuwa [suluhisho la kuongeza uwezo](/developers/docs/scaling/) muhimu kwa dapps asili za Ethereum. Ukiwa na dapp yako kwenye mnyororo wa kando, watumiaji wanaweza kufurahia ada za chini za gesi na miamala ya haraka, hasa ikiwa Mtandao Mkuu una msongamano.

Hata hivyo, kama ilivyoelezwa hapo awali, kutumia mnyororo wa kando kunahusisha maelewano makubwa. Kila mnyororo wa kando unawajibika kwa usalama wake na haurithi sifa za usalama za Ethereum. Hii huongeza uwezekano wa tabia mbaya ambayo inaweza kuathiri watumiaji wako au kuweka fedha zao hatarini.

### Mwendo wa mali {#asset-movement}

Ili mnyororo wa vitalu tofauti uwe mnyororo wa kando kwa Mtandao Mkuu wa Ethereum unahitaji uwezo wa kuwezesha hamisho la mali kutoka na kwenda kwenye Mtandao Mkuu wa Ethereum. Mwingiliano huu na Ethereum unafikiwa kwa kutumia daraja la mnyororo wa vitalu. [Madaraja](/bridges/) hutumia mikataba mahiri iliyosambazwa kwenye Mtandao Mkuu wa Ethereum na mnyororo wa kando ili kudhibiti uvushaji wa fedha kati yao.

Ingawa madaraja husaidia watumiaji kuhamisha fedha kati ya Ethereum na mnyororo wa kando, mali hazihamishwi kimwili kwenye minyororo hiyo miwili. Badala yake, taratibu ambazo kwa kawaida huhusisha ufuzi na kuteketeza hutumiwa kwa kuhamisha thamani kwenye minyororo. Zaidi kuhusu [jinsi madaraja yanavyofanya kazi](/developers/docs/bridges/#how-do-bridges-work).

## Faida na hasara za minyororo ya kando {#pros-and-cons-of-sidechains}

| Faida                                                                                                                       | Hasara                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Teknolojia inayoimarisha minyororo ya kando imeanzishwa vizuri na inafaidika kutokana na utafiti wa kina na maboresho katika muundo. | Minyororo ya kando hujitolea kiasi fulani cha ugatuzi na hali ya kutohitaji kuamini kwa ajili ya kuongeza uwezo.                          |
| Minyororo ya kando inasaidia ukokotoaji wa jumla na inatoa utangamano wa EVM (inaweza kuendesha dapps asili za Ethereum).                    | Mnyororo wa kando hutumia utaratibu wa makubaliano tofauti na haufaidiki na dhamana za usalama za Ethereum.         |
| Minyororo ya kando hutumia miundo tofauti ya mwafaka ili kuchakata miamala kwa ufanisi na kupunguza ada za muamala kwa watumiaji.         | Minyororo ya kando inahitaji dhana za uaminifu za juu zaidi (k.m., akidi ya wathibitishaji wabaya wa mnyororo wa kando wanaweza kufanya udanganyifu). |
| Minyororo ya kando inayoendana na EVM inaruhusu dapps kupanua mfumo wao wa ikolojia.                                                            |                                                                                                                  |

### Tumia Minyororo ya Kando {#use-sidechains}

Miradi mingi hutoa utekelezaji wa minyororo ya kando ambayo unaweza kuiunganisha kwenye dapps zako:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (zamani xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Usomaji zaidi {#further-reading}

- [Kuongeza uwezo wa dapps za Ethereum kupitia Minyororo ya Kando](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_