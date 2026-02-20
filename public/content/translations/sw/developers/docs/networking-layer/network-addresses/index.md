---
title: Anwani ya mtandao
description: Utangulizi wa anwani za mtandao.
lang: sw
sidebarDepth: 2
---

Nodi za Ethereum zinapaswa kujitambulisha na maelezo ya msingi ili kuunganishwa na rika. Ili kuhakikisha rika yoyote inayowezekana inaweza kufasiri maelezo haya, hutumwa katika mojawapo ya miundo mitatu sanifu ambayo nodi yoyote ya Ethereum inaweza kuelewa: multiaddr, enode, au Rekodi za Nodi za Ethereum (ENRs). ENRs ni kiwango cha sasa cha anwani za mtandao wa Ethereum.

## Mahitaji ya awali {#prerequisites}

Uelewa fulani wa [safu ya mtandao](/developers/docs/networking-layer/) ya Ethereum unahitajika ili kuelewa ukurasa huu.

## Multiaddr {#multiaddr}

Muundo halisi wa anwani ya nodi ya Ethereum ulikuwa 'multiaddr' (fupi ya 'anwani-nyingi'). Multiaddr ni muundo wa ulimwengu wote ulioundwa kwa ajili ya mitandao ya rika kwa rika. Anwani zinawakilishwa kama jozi za ufunguo-thamani na funguo na thamani zimetenganishwa na mkwaju wa mbele. Kwa mfano, multiaddr ya nodi iliyo na anwani ya IPv4 `192.168.22.27` inayosikiliza kwenye bandari ya TCP `33000` inaonekana hivi:

/ip4/192.168.22.27/tcp/33000

Kwa nodi ya Ethereum, multiaddr ina kitambulisho cha nodi (hashi ya ufunguo wao wa umma):

/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br

## Enode {#enode}

Enode ni njia ya kutambua nodi ya Ethereum kwa kutumia muundo wa anwani ya URL. Kitambulisho cha nodi cha heksadesimali kimesimbwa katika sehemu ya jina la mtumiaji ya URL kimetenganishwa na mwenyeji kwa kutumia alama ya @. Jina la mwenyeji linaweza tu kutolewa kama anwani ya IP; majina ya DNS hayaruhusiwi. Bandari katika sehemu ya jina la mwenyeji ni bandari ya kusikiliza ya TCP. Ikiwa bandari za TCP na UDP (ugunduzi) zinatofautiana, bandari ya UDP imebainishwa kama kigezo cha hoja "discport".

Katika mfano ufuatao, URL ya nodi inaelezea nodi iliyo na anwani ya IP `10.3.58.6`, bandari ya TCP `30303` na bandari ya ugunduzi ya UDP `30301`.

enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301

## Rekodi za Nodi za Ethereum (ENRs) {#enr}

Rekodi za Nodi za Ethereum (ENRs) ni muundo sanifu wa anwani za mtandao kwenye Ethereum. Zinachukua nafasi ya multiaddr na enodes. Hizi ni muhimu hasa kwa sababu zinaruhusu ubadilishanaji mkubwa wa habari kati ya nodi. ENR ina sahihi, nambari ya mfuatano na sehemu zinazoelezea mpango wa utambulisho unaotumiwa kutengeneza na kuthibitisha sahihi. ENR inaweza pia kujazwa na data holela iliyoandaliwa kama jozi za ufunguo-thamani. Jozi hizi za ufunguo-thamani zina anwani ya IP ya nodi na maelezo kuhusu itifaki ndogo ambayo nodi inaweza kutumia. Wateja wa makubaliano hutumia [muundo maalum wa ENR](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) kutambua nodi za mwanzo na pia hujumuisha sehemu ya `eth2` iliyo na maelezo kuhusu uma wa sasa wa Ethereum na subneti ya uvumi wa uthibitishaji (hii inaunganisha nodi na seti maalum ya rika ambao uthibitishaji wao umekusanywa pamoja).

## Masomo zaidi {#further-reading}

- [EIP-778: Rekodi za Nodi za Ethereum (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
