---
title: Muundo wa data na usimbuaji
description: Muhtasari wa miundo ya msingi ya data ya Ethereum.
lang: sw
sidebarDepth: 2
---

Ethereum hutengeneza, huhifadhi na huhamisha idadi kubwa ya data. Data hii lazima iumbizwe kwa njia sanifu na zenye ufanisi wa kumbukumbu ili kumruhusu yeyote [kuendesha nodi](/run-a-node/) kwenye maunzi ya kiwango cha watumiaji ya kawaida. Ili kufanikisha hili, miundo kadhaa maalum ya data hutumika kwenye mkusanyiko wa Ethereum.

## Mahitaji ya awali {#prerequisites}

Unapaswa kuelewa misingi ya Ethereum na [programu za wateja](/developers/docs/nodes-and-clients/). Ufahamu wa safu ya mtandao na [Karatasi nyeeupe ya Ethereum](/whitepaper/) unapendekezwa.

## Miundo ya data {#data-structures}

### Patricia merkle tries {#patricia-merkle-tries}

Patricia Merkle Tries ni miundo ambayo huweka msimbo jozi za thamani muhimu katika trie iliyothibitishwa kwa njia fiche na ya uhakika. Hizi hutumiwa sana katika safu ya utekelezaji ya Ethereum.

[Zaidi kuhusu Patricia Merkle Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Kiambishi awali cha urefu kinachojirudia {#recursive-length-prefix}

Kiambishi awali cha urefu kinachojirudia (RLP) ni mbinu ya uratibishaji inayotumika sana katika safu ya utekelezaji ya Ethereum.

[Zaidi kuhusu RLP](/developers/docs/data-structures-and-encoding/rlp)

### Uratibishaji Rahisi {#simple-serialize}

Uratibishaji Rahisi (SSZ) ndiyo muundo mkuu wa uratibishaji kwenye safu ya makubaliano ya Ethereum kwa sababu ya uoanifu wake na uwekaji wa merkle.

[Zaidi kuhusu SSZ](/developers/docs/data-structures-and-encoding/ssz)
