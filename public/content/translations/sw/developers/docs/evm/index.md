---
title: Mashine Halisi ya Ethereum (EVM)
description: Utangulizi wa mashine halisi ya Ethereum na jinsi inavyohusiana na serikali, miamala na mikataba mahiri.
lang: sw
---

Mashine halisi ya ethereum(EVM) ni mazingira ya mtandaoni yaliyotawanywa ambayo hutekeleza msimbo kwa uthabiti na kwa usalama katika nodi zote za Ethereum. Nodi huendesha EVM kutekeleza mkataba-erevu, kwa kutumia "[gesi](/developers/docs/gas/)" kupima juhudi za kikokotozi zinazohitajika kwa [shughuli](/developers/docs/evm/opcodes/), kuhakikisha ugawaji bora wa rasilimali na usalama wa mtandao.

## Mahitaji ya awali {#prerequisites}

Uelewa fulani wa msingi wa istilahi za kawaida katika sayansi ya kompyuta kama vile [baiti](https://wikipedia.org/wiki/Byte), [kumbukumbu](https://wikipedia.org/wiki/Computer_memory), na [rundo](https://wikipedia.org/wiki/Stack_\(abstract_data_type\)) ni muhimu ili kuelewa EVM. Pia itasaidia kuwa na uelewa mzuri wa dhana za kriptografia/mnyororo wa bloku kama vile [kazi za hashi](https://wikipedia.org/wiki/Cryptographic_hash_function) na [Merkle tree](https://wikipedia.org/wiki/Merkle_tree).

## Kutoka leja hadi mashine ya hali {#from-ledger-to-state-machine}

Mfano wa “daftari lililosambazwa” mara nyingi hutumika kuelezea kiambajengo kama sarafu ya mtandao, ambazo zinawezesha sarafu isiyo na kituo kimoja kwa kutumia zana za msingi za usimbaji fiche. Daftari hilo linaweka rekodi za shughuli ambazo lazima zizingatie seti ya sheria zinazodhibiti ni nini mtu anaweza na hawezi kufanya ili kubadilisha daftari hilo. Kwa mfano, anwani ya sarafu ya mtandaoni haiwezi kutumia sarafu ya mtandaoni zaidi ya ile ambayo tayari imepokea. Sheria hizi ndizo msingi wa miamala yote kwenye sarafu mtandaoni na viambajengo vingine vingi.

Ingawa Ethereum ina sarafu yake ya kidigitali ya asili (ether) inayofuata karibu sheria zilezile angavu, pia huwezesha kazi yenye nguvu zaidi: [mkataba-erevu](/developers/docs/smart-contracts/). Kwa kipengele hiki ngumu zaidi, mlinganisho wa kisasa zaidi unahitajika. Badala ya kuwa leja iliyosambazwa, Ethereum ni [mashine ya hali](https://wikipedia.org/wiki/Finite-state_machine) iliyosambazwa. Hali ya Ethereum ni muundo mkubwa wa data ambao hauhifadhi tu akaunti zote na salio, bali pia _hali ya mashine_, ambayo inaweza kubadilika kutoka bloku moja hadi nyingine kulingana na seti ya sheria zilizobainishwa awali, na ambayo inaweza kutekeleza msimbo wowote wa mashine. Sheria maalum za kubadilisha hali kutoka kizuizi hadi kizuizi zinafafanuliwa na EVM.

![Mchoro unaoonyesha muundo wa EVM](./evm.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Kazi ya mpito ya hali ya Ethereum {#the-ethereum-state-transition-function}

EVM hufanya kama kazi ya hisabati ingekuwa: Kwa kuzingatia ingizo, hutoa matokeo ya kubaini. Kwa hivyo, inasaidia sana kuelezea Ethereum rasmi zaidi kama kuwa na **kazi ya mpito ya hali**:

```
Y(S, T)= S'
```

Kutokana na hali `(S)` ya zamani iliyo halali na seti mpya ya miamala halali `(T)`, kazi ya mpito ya hali ya Ethereum `Y(S, T)` hutoa hali mpya halali ya towe `S'`

### Hali {#state}

Katika muktadha wa Ethereum, hali ni muundo mkubwa wa data unaoitwa [modified Merkle Patricia Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), unaoshikilia [akaunti](/developers/docs/accounts/) zote zikiwa zimeunganishwa kwa hashi na kupunguzwa hadi hashi moja ya mzizi iliyohifadhiwa kwenye mnyororo wa bloku.

### Miamala {#transactions}

Miamala ni maagizo yaliyosainiwa kwa njia fiche kutoka kwa akaunti. Kuna aina mbili za miamala: zile zinazosababisha simu za ujumbe na zile zinazosababisha kuundwa kwa mkataba.

Uundaji wa mkataba husababisha kuundwa kwa akaunti mpya ya mkataba yenye bytecode ya [mkataba-erevu](/developers/docs/smart-contracts/anatomy/) iliyokusanywa. Wakati wowote akaunti nyingine inapopiga simu kwa mkataba huo, hutekeleza bytecode yake.

## Maagizo ya EVM {#evm-instructions}

EVM hutekeleza kama [mashine ya rundo](https://wikipedia.org/wiki/Stack_machine) yenye kina cha vipengee 1024. Kila kipengee ni neno la biti 256, ambalo lilichaguliwa kwa urahisi wa matumizi na ufichaji wa taarifa wa 256-biti (kama vile heshi za Keccak-256 au saini za secp256k1).

Wakati wa utekelezaji, EVM hudumisha _kumbukumbu_ ya muda mfupi (kama safu ya baiti yenye anwani ya neno), ambayo haidumu kati ya miamala.

### Ghala la muda

Ghala la muda ni hifadhi ya ufunguo-thamani kwa kila muamala inayofikiwa kupitia opcodes za `TSTORE` na `TLOAD`. Hudumu katika wito wote wa ndani wakati wa muamala mmoja lakini husafishwa mwishoni mwa muamala. Tofauti na kumbukumbu, ghala la muda huundwa kama sehemu ya hali ya EVM badala ya fremu ya utekelezaji, lakini haihifadhiwi kwenye hali ya kimataifa. Ghala la muda huwezesha ugawanaji wa hali ya muda kwa ufanisi wa gesi katika wito wa ndani wakati wa muamala.

### Ghala

Mikataba ina _ghala_ la Merkle Patricia trie (kama safu ya maneno yenye anwani ya neno), inayohusishwa na akaunti husika na ni sehemu ya hali ya kimataifa. Ghala hili la kudumu ni tofauti na ghala la muda, ambalo linapatikana tu kwa muda wa muamala mmoja na haliundi sehemu ya trie ya ghala la kudumu ya akaunti.

### Opcodes

Bytecode iliyokusanywa ya mkataba-erevu hutekelezwa kama idadi ya [opcode](/developers/docs/evm/opcodes) za EVM, ambazo hufanya shughuli za kawaida za rundo kama `XOR`, `AND`, `ADD`, `SUB`, n.k. EVM pia inatekeleza idadi ya shughuli za rundo maalum kwa mnyororo wa bloku, kama vile `ADDRESS`, `BALANCE`, `BLOCKHASH`, n.k. Seti ya opcode pia inajumuisha `TSTORE` na `TLOAD`, ambazo hutoa ufikiaji wa ghala la muda.

![Mchoro unaoonyesha wapi gesi inahitajika kwa shughuli za EVM](../gas/gas.png)
_Michoro imechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Utekelezaji wa EVM {#evm-implementations}

Utekelezaji wote wa EVM lazima uzingatie vipimo vilivyoelezwa katika karatasi ya kiufundi ya Ethereum.

Katika historia ya miaka kumi ya Ethereum, EVM imefanyiwa marekebisho kadhaa, na kuna utekelezaji kadhaa wa EVM katika lugha mbalimbali za programu.

[Programu za utekelezaji za Ethereum](/developers/docs/nodes-and-clients/#execution-clients) zinajumuisha utekelezaji wa EVM. Kwa kuongezea, kuna utekelezaji mwingi wa pekee, pamoja na:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Masomo zaidi {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper aka KEVM: Semantics of EVM in K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Opcodes za Mashine Halisi ya Ethereum](https://www.ethervm.io/)
- [Marejeleo Mwingiliano ya Opcodes za Mashine Halisi ya Ethereum](https://www.evm.codes/)
- [Utangulizi mfupi katika nyaraka za Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum - Mashine Halisi ya Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Mada Husika {#related-topics}

- [Gesi](/developers/docs/gas/)
