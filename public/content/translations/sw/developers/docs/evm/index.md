---
title: Mashine Pepe ya Ethereum (EVM)
description: Utangulizi wa mashine pepe ya Ethereum na jinsi inavyohusiana na hali, miamala, na mikataba mahiri.
lang: sw
---

Mashine Pepe ya Ethereum (EVM) ni mazingira pepe yaliyogatuliwa ambayo hutekeleza msimbo kwa uthabiti na usalama kwenye nodi zote za [Ethereum](/). Nodi huendesha EVM ili kutekeleza mikataba mahiri, zikitumia "[gesi](/developers/docs/gas/)" kupima juhudi za kikokotoo zinazohitajika kwa [operesheni](/developers/docs/evm/opcodes/), kuhakikisha ugawaji mzuri wa rasilimali na usalama wa mtandao.

## Mahitaji ya Awali {#prerequisites}

Uelewa wa kimsingi wa istilahi za kawaida katika sayansi ya kompyuta kama vile [baiti](https://wikipedia.org/wiki/Byte), [kumbukumbu](https://wikipedia.org/wiki/Computer_memory), na [staki](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>) ni muhimu ili kuelewa EVM. Pia itakuwa na manufaa kuwa na uelewa mzuri wa dhana za kriptografia/mnyororo wa vitalu kama vile [fomula za heshi](https://wikipedia.org/wiki/Cryptographic_hash_function) na [mti wa Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Kutoka leja hadi mashine ya hali {#from-ledger-to-state-machine}

Mfano wa 'leja iliyosambazwa' mara nyingi hutumika kuelezea minyororo ya vitalu kama Bitcoin, ambayo huwezesha sarafu-fiche iliyogatuliwa kwa kutumia zana za kimsingi za kriptografia. Leja hutunza rekodi ya shughuli ambayo lazima ifuate seti ya sheria zinazosimamia kile ambacho mtu anaweza na hawezi kufanya ili kurekebisha leja. Kwa mfano, anwani ya Bitcoin haiwezi kutumia Bitcoin nyingi zaidi ya ilivyopokea hapo awali. Sheria hizi ndizo msingi wa miamala yote kwenye Bitcoin na minyororo mingine mingi ya vitalu.

Ingawa Ethereum ina sarafu-fiche yake asili (Etha) ambayo inafuata karibu sheria zilezile zinazoeleweka, pia inawezesha utendaji wenye nguvu zaidi: [mikataba mahiri](/developers/docs/smart-contracts/). Kwa kipengele hiki changamano zaidi, mfano wa hali ya juu zaidi unahitajika. Badala ya leja iliyosambazwa, Ethereum ni [mashine ya hali](https://wikipedia.org/wiki/Finite-state_machine) iliyosambazwa. Hali ya Ethereum ni muundo mkubwa wa data ambao haushikilii tu akaunti na salio zote, bali _hali ya mashine_, ambayo inaweza kubadilika kutoka kitalu hadi kitalu kulingana na seti ya sheria zilizobainishwa mapema, na ambayo inaweza kutekeleza msimbo wowote wa mashine. Sheria mahususi za kubadilisha hali kutoka kitalu hadi kitalu hufafanuliwa na EVM.

![A diagram showing the make up of the EVM](./evm.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Fomula ya mpito wa hali ya Ethereum {#the-ethereum-state-transition-function}

EVM hufanya kazi kama fomula ya hisabati inavyofanya: Ikipewa ingizo, hutoa tokeo thabiti. Kwa hivyo inasaidia sana kuelezea Ethereum rasmi zaidi kama yenye **fomula ya mpito wa hali**:

```
Y(S, T)= S'
```

Ikipewa hali halali ya zamani `(S)` na seti mpya ya miamala halali `(T)`, fomula ya mpito wa hali ya Ethereum `Y(S, T)` hutoa hali mpya halali ya tokeo `S'`

### Hali {#state}

Katika muktadha wa Ethereum, hali ni muundo mkubwa wa data unaoitwa [Trie ya Merkle Patricia iliyorekebishwa](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), ambayo huweka [akaunti](/developers/docs/accounts/) zote zikiwa zimeunganishwa na heshi na zinazoweza kupunguzwa hadi kwenye heshi moja ya mzizi iliyohifadhiwa kwenye mnyororo wa vitalu.

### Miamala {#transactions}

Miamala ni maagizo yaliyotiwa saini kwa njia ya kriptografia kutoka kwenye akaunti. Kuna aina mbili za miamala: ile inayosababisha miito ya ujumbe na ile inayosababisha uundaji wa mkataba.

Uundaji wa mkataba husababisha kuundwa kwa akaunti mpya ya mkataba iliyo na msimbo wa baiti wa [mkataba mahiri](/developers/docs/smart-contracts/anatomy/) uliokusanywa. Kila wakati akaunti nyingine inapofanya mwito wa ujumbe kwenye mkataba huo, hutekeleza msimbo wake wa baiti.

## Maagizo ya EVM {#evm-instructions}

EVM hutekelezwa kama [mashine ya staki](https://wikipedia.org/wiki/Stack_machine) yenye kina cha vipengee 1024. Kila kipengee ni neno la biti 256, ambalo lilichaguliwa kwa urahisi wa matumizi na kriptografia ya biti 256 (kama vile heshi za Keccak-256 au saini za secp256k1).

Wakati wa utekelezaji, EVM hudumisha _kumbukumbu_ ya muda (kama safu ya baiti inayoelekezwa kwa neno), ambayo haidumu kati ya miamala.

### Hifadhi ya muda {#transient-storage}

Hifadhi ya muda ni hifadhi ya ufunguo-thamani kwa kila muamala inayofikiwa kupitia misimbo ya operesheni ya `TSTORE` na `TLOAD`. Inadumu katika miito yote ya ndani wakati wa muamala huo huo lakini inafutwa mwishoni mwa muamala. Tofauti na kumbukumbu, hifadhi ya muda inaundwa kama sehemu ya hali ya EVM badala ya fremu ya utekelezaji, lakini haijatolewa kwa hali ya kimataifa. Hifadhi ya muda huwezesha ushiriki wa hali ya muda unaotumia gesi vizuri katika miito ya ndani wakati wa muamala.

### Hifadhi {#storage}

Mikataba ina trie ya _hifadhi_ ya Merkle Patricia (kama safu ya maneno inayoelekezwa kwa neno), inayohusishwa na akaunti husika na sehemu ya hali ya kimataifa. Hifadhi hii ya kudumu inatofautiana na hifadhi ya muda, ambayo inapatikana tu kwa muda wa muamala mmoja na haifanyi sehemu ya trie ya hifadhi ya kudumu ya akaunti.

### Misimbo ya operesheni {#opcodes}

Msimbo wa baiti wa mkataba mahiri uliokusanywa hutekelezwa kama idadi ya [misimbo ya operesheni](/developers/docs/evm/opcodes) ya EVM, ambayo hufanya operesheni za kawaida za staki kama vile `XOR`, `AND`, `ADD`, `SUB`, n.k. EVM pia hutekeleza idadi ya operesheni za staki mahususi kwa mnyororo wa vitalu, kama vile `ADDRESS`, `BALANCE`, `BLOCKHASH`, n.k. Seti ya msimbo wa operesheni pia inajumuisha `TSTORE` na `TLOAD`, ambayo hutoa ufikiaji wa hifadhi ya muda.

![A diagram showing where gas is needed for EVM operations](../gas/gas.png)
_Michoro imechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Utekelezaji wa EVM {#evm-implementations}

Utekelezaji wote wa EVM lazima ufuate vipimo vilivyoelezwa katika Waraka wa Manjano wa Ethereum.

Katika historia ya miaka kumi ya Ethereum, EVM imepitia marekebisho kadhaa, na kuna utekelezaji kadhaa wa EVM katika lugha mbalimbali za programu.

[Wateja wa utekelezaji wa Ethereum](/developers/docs/nodes-and-clients/#execution-clients) wanajumuisha utekelezaji wa EVM. Zaidi ya hayo, kuna utekelezaji mwingi wa kujitegemea, ikiwa ni pamoja na:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Usomaji Zaidi {#further-reading}

- [Waraka wa Manjano wa Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper au KEVM: Semantiki za EVM katika K](https://jellopaper.org/)
- [Waraka wa Beige](https://github.com/chronaeon/beigepaper)
- [Misimbo ya Operesheni ya Mashine Pepe ya Ethereum](https://www.ethervm.io/)
- [Rejeleo Shirikishi la Misimbo ya Operesheni ya Mashine Pepe ya Ethereum](https://www.evm.codes/)
- [Utangulizi mfupi katika nyaraka za Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Kujua Ethereum - Mashine Pepe ya Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Mada Zinazohusiana {#related-topics}

- [Gesi](/developers/docs/gas/)

## Mafunzo: Mashine Pepe ya Ethereum (EVM) / Misimbo ya Operesheni kwenye Ethereum {#tutorials}

- [Kuelewa Vipimo vya EVM vya Waraka wa Manjano](/developers/tutorials/yellow-paper-evm/) _– Mwongozo wa hatua kwa hatua wa vipimo rasmi vya EVM kutoka kwenye Waraka wa Manjano wa Ethereum._
- [Uhandisi wa Kinyume wa Mkataba](/developers/tutorials/reverse-engineering-a-contract/) _– Jinsi ya kufanya uhandisi wa kinyume wa mkataba mahiri uliokusanywa kwa kutumia misimbo ya operesheni ya EVM._