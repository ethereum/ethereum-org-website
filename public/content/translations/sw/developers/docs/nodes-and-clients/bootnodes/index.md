---
title: Utangulizi wa Ethereum Bootnodes
description: Taarifa ya msingi unahitaji kuelewa bootnodes
lang: sw
---

Wakati nodi mpya anajiunga na Mtandao Ethereum inahitaji kuungana na nodes ambayo tayari ni juu ya Mtandao ili kisha kugundua wenzao mpya. Pointi hizi za kuingia kwenye Mtandao wa Ethereum zinaitwa bootnodes. Wateja kawaida kuwa na orodha ya bootnodes hardcoded ndani yao. Hizi bootnodes ni kawaida kukimbia na Ethereum Msingi
ya devops timu au timu mteja wenyewe. Kumbuka kwamba bootnodes si sawa na nodi tuli. Nodi tuli huitwa tena na tena, ambapo bootnodes ni tu kuitwa juu kama hakuna wenzao kutosha kuungana na nodi mahitaji ya bootstrap baadhi ya uhusiano mpya.

## Ungana na bootnode {#connect-to-a-bootnode}

Wateja wengi kuwa na orodha ya bootnodes kujengwa katika, lakini unaweza pia wanataka kuendesha bootnode yako mwenyewe, au kutumia moja ambayo si sehemu ya orodha ya wateja hardcoded. Katika kesi hii, unaweza kutaja yao wakati wa kuanza mteja wako, kama ifuatavyo (mfano ni kwa ajili ya Geth, tafadhali angalia nyaraka mteja wako):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Endesha bootnode {#run-a-bootnode}

Bootnodes ni nodi kamili ambazo haziko nyuma ya NAT ([Tafsiri ya Anwani ya Mtandao](https://www.geeksforgeeks.org/network-address-translation-nat/)). Kila nodi kamili inaweza kutenda kama bootnode muda mrefu kama ni inapatikana kwa umma.

Unapoanzisha nodi, inapaswa kurekodi [enode](/developers/docs/networking-layer/network-addresses/#enode) yako, ambayo ni kitambulisho cha umma ambacho wengine wanaweza kutumia kuungana na nodi yako.

Enodi ni kawaida kuzaliwa upya juu ya kila kuanzisha upya, hivyo kuwa na uhakika wa kuangalia nyaraka mteja wako juu ya jinsi ya kuzalisha enode kudumu kwa bootnode yako.

Ili kuwa nzuri bootnode ni wazo nzuri ya kuongeza idadi ya juu ya wenzao ambayo inaweza kuungana na hayo. Kukimbia bootnode na wenzao wengi itaongeza mahitaji bandwidth kwa kiasi kikubwa.

## Bootnodes zinazopatikana {#available-bootnodes}

Orodha ya bootnodes zilizojengewa ndani ya go-ethereum inaweza kupatikana [hapa](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Hizi bootnodes ni kudumishwa na Ethereum Msingi na go-ethereum timu.

Kuna orodha nyingine ya bootnodes kudumishwa na kujitolea inapatikana. Tafadhali kuhakikisha daima ni pamoja na angalau moja rasmi bootnode, vinginevyo unaweza kuwa kupatwa na kushambuliwa.
