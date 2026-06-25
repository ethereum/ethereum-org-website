---
title: Anwani za mtandao
description: Utangulizi wa anwani za mtandao.
lang: sw
sidebarDepth: 2
---

Nodi za [Ethereum](/) lazima zijitambulishe kwa maelezo fulani ya msingi ili kuunganishwa na wenza. Ili kuhakikisha mwenza yeyote anayetarajiwa anaweza kufasiri maelezo haya, hupitishwa katika mojawapo ya miundo mitatu iliyosanifiwa ambayo nodi yoyote ya Ethereum inaweza kuelewa: multiaddr, enode, au Rekodi za Nodi za Ethereum (ENRs). ENRs ndio kiwango cha sasa cha anwani za mtandao wa Ethereum.

## Mahitaji ya awali {#prerequisites}

Uelewa fulani wa [tabaka la mtandao](/developers/docs/networking-layer/) la Ethereum unahitajika ili kuelewa ukurasa huu.

## Multiaddr {#multiaddr}

Muundo wa asili wa anwani ya nodi ya Ethereum ulikuwa 'multiaddr' (kifupi cha 'multi-addresses'). Multiaddr ni muundo wa ulimwengu wote ulioundwa kwa ajili ya mitandao ya rika-kwa-rika. Anwani zinawakilishwa kama jozi za ufunguo-thamani huku funguo na thamani zikitenganishwa kwa mkwaju. Kwa mfano, multiaddr ya nodi yenye anwani ya IPv4 `192.168.22.27` inayosikiliza lango la TCP `33000` inaonekana kama:

`/ip4/192.168.22.27/tcp/33000`

Kwa nodi ya Ethereum, multiaddr ina kitambulisho cha nodi (heshi ya ufunguo wa umma wao):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode ni njia ya kutambua nodi ya Ethereum kwa kutumia muundo wa anwani ya URL. Kitambulisho cha nodi cha heksadesimali kimesimbwa katika sehemu ya jina la mtumiaji la URL iliyotenganishwa na mwenyeji kwa kutumia alama ya @. Jina la mwenyeji linaweza tu kutolewa kama anwani ya IP; majina ya DNS hayaruhusiwi. Lango katika sehemu ya jina la mwenyeji ni lango la kusikiliza la TCP. Ikiwa lango la TCP na UDP (ugunduzi) yanatofautiana, lango la UDP hubainishwa kama kigezo cha hoja "discport".

Katika mfano ufuatao, URL ya nodi inaelezea nodi yenye anwani ya IP `10.3.58.6`, lango la TCP `30303` na lango la ugunduzi la UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Rekodi za Nodi za Ethereum (ENRs) {#enr}

Rekodi za Nodi za Ethereum (ENRs) ni muundo uliosanifiwa wa anwani za mtandao kwenye Ethereum. Zinachukua nafasi ya multiaddr na enode. Hizi ni muhimu sana kwa sababu zinaruhusu ubadilishanaji mkubwa wa taarifa kati ya nodi. ENR ina sahihi, nambari ya mfuatano na nyanja zinazoelezea mpango wa utambulisho uliotumika kuzalisha na kuthibitisha sahihi. ENR pia inaweza kujazwa na data kiholela iliyopangwa kama jozi za ufunguo-thamani. Jozi hizi za ufunguo-thamani zina anwani ya IP ya nodi na maelezo kuhusu itifaki ndogo ambazo nodi inaweza kutumia. Wateja wa mwafaka hutumia [muundo maalum wa ENR](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) kutambua nodi za kuanzisha na pia hujumuisha uwanja wa `eth2` ulio na maelezo kuhusu mchepuo wa sasa wa Ethereum na mtandao mdogo wa uvumi wa uthibitisho (hii huunganisha nodi kwenye seti fulani ya wenza ambao uthibitisho wao unakusanywa pamoja).

## Usomaji Zaidi {#further-reading}

- [EIP-778: Rekodi za Nodi za Ethereum (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)