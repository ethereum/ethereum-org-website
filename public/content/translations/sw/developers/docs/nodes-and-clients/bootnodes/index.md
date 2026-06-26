---
title: Utangulizi wa Nodi za Uanzishaji za Ethereum
description: Taarifa za msingi unazohitaji ili kuelewa nodi za uanzishaji
lang: sw
---

Wakati nodi mpya inapojiunga na mtandao wa Ethereum inahitaji kuunganishwa na nodi ambazo tayari ziko kwenye mtandao ili kisha kugundua wenza (peers) wapya. Sehemu hizi za kuingilia kwenye mtandao wa Ethereum zinaitwa nodi za uanzishaji. Wateja (Clients) kwa kawaida huwa na orodha ya nodi za uanzishaji zilizowekwa moja kwa moja kwenye kodi zao (hardcoded). Nodi hizi za uanzishaji kwa kawaida huendeshwa na timu ya devops ya Taasisi ya Ethereum au timu za wateja wenyewe. Kumbuka kwamba nodi za uanzishaji si sawa na nodi tuli (static nodes). Nodi tuli huitwa mara kwa mara, wakati nodi za uanzishaji huitwa tu ikiwa hakuna wenza wa kutosha wa kuunganishwa nao na nodi inahitaji kuanzisha miunganisho mipya.

## Unganisha kwenye nodi ya uanzishaji {#connect-to-a-bootnode}

Wateja wengi wana orodha ya nodi za uanzishaji zilizojengewa ndani, lakini unaweza pia kutaka kuendesha nodi yako ya uanzishaji, au kutumia ambayo si sehemu ya orodha iliyowekwa kwenye kodi ya mteja. Katika hali hii, unaweza kuzibainisha wakati wa kuanzisha mteja wako, kama ifuatavyo (mfano ni wa Geth, tafadhali angalia nyaraka za mteja wako):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Endesha nodi ya uanzishaji {#run-a-bootnode}

Nodi za uanzishaji ni nodi kamili ambazo haziko nyuma ya NAT ([Tafsiri ya Anwani ya Mtandao](https://www.geeksforgeeks.org/network-address-translation-nat/)). Kila nodi kamili inaweza kufanya kazi kama nodi ya uanzishaji mradi tu inapatikana kwa umma.

Unapoanzisha nodi inapaswa kuweka logi ya [enode](/developers/docs/networking-layer/network-addresses/#enode) yako, ambayo ni kitambulisho cha umma ambacho wengine wanaweza kutumia kuunganisha kwenye nodi yako.

Enode kwa kawaida hutengenezwa upya kila inapoanzishwa tena, kwa hivyo hakikisha unaangalia nyaraka za mteja wako kuhusu jinsi ya kutengeneza enode ya kudumu kwa ajili ya nodi yako ya uanzishaji.

Ili kuwa nodi nzuri ya uanzishaji ni wazo zuri kuongeza idadi ya juu zaidi ya wenza wanaoweza kuunganishwa nayo. Kuendesha nodi ya uanzishaji yenye wenza wengi kutaongeza hitaji la kipimo data (bandwidth) kwa kiasi kikubwa.

## Nodi za uanzishaji zinazopatikana {#available-bootnodes}

Orodha ya nodi za uanzishaji zilizojengewa ndani katika go-ethereum inaweza kupatikana [hapa](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Nodi hizi za uanzishaji zinasimamiwa na Taasisi ya Ethereum na timu ya go-ethereum.

Kuna orodha nyingine za nodi za uanzishaji zinazosimamiwa na watu wa kujitolea zinazopatikana. Tafadhali hakikisha kila wakati unajumuisha angalau nodi moja rasmi ya uanzishaji, vinginevyo unaweza kufanyiwa shambulio la eclipse (eclipse attack).