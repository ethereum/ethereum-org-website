---
title: Algoriti za uchimbaji
description: Mtazamo wa kina wa algoriti zinazotumika kwa uchimbaji wa Ethereum.
lang: sw
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Uthibitisho wa Kazi (PoW) haupo tena chini ya utaratibu wa makubaliano wa Ethereum, ikimaanisha uchimbaji umezimwa. Badala yake, Ethereum inalindwa na wathibitishaji wanaoweka dhamana ya ETH. Unaweza kuanza kuweka dhamana ya ETH yako leo. Soma zaidi kuhusu <a href='/roadmap/merge/'>Unganisho</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Uthibitisho wa Dau (PoS)</a>, na <a href='/staking/'>uwekaji dhamana</a>. Ukurasa huu ni kwa ajili ya historia tu.
</AlertDescription>
</AlertContent>
</Alert>

Uchimbaji wa Ethereum ulitumia algoriti inayojulikana kama Ethash. Wazo la msingi la algoriti ni kwamba mchimbaji anajaribu kutafuta ingizo la nonsi akitumia ukokotoaji wa nguvu ghafi (brute force) ili heshi inayotokana iwe ndogo kuliko kiwango kilichowekwa na ugumu uliokokotolewa. Kiwango hiki cha ugumu kinaweza kurekebishwa kwa kubadilika, kuruhusu uzalishaji wa kitalu kufanyika kwa muda wa kawaida.

## Masharti ya awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza kuhusu [mwafaka wa Uthibitisho wa Kazi (PoW)](/developers/docs/consensus-mechanisms/pow) na [uchimbaji](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto ilikuwa algoriti ya utafiti ya awali kwa ajili ya uchimbaji wa Ethereum ambayo Ethash iliichukua nafasi yake. Ilikuwa ni muunganiko wa algoriti mbili tofauti: Dagger na Hashimoto. Ilikuwa tu utekelezaji wa utafiti na ilichukuliwa nafasi na Ethash wakati Mtandao Mkuu wa Ethereum ulipozinduliwa.

[Dagger](http://www.hashcash.org/papers/dagger.html) inahusisha uzalishaji wa [Directed Acyclic Graph (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph), ambapo vipande vyake vya nasibu vinaunganishwa pamoja kuwa heshi. Kanuni kuu ni kwamba kila nonsi inahitaji tu sehemu ndogo ya mti mkubwa wa jumla wa data. Kukokotoa upya mti mdogo kwa kila nonsi ni kizuizi kwa uchimbaji - hivyo kuna haja ya kuhifadhi mti - lakini ni sawa kwa uthibitishaji wa thamani ya nonsi moja. Dagger ilibuniwa kuwa mbadala wa algoriti zilizopo kama Scrypt, ambazo ni ngumu kwa kumbukumbu lakini ni ngumu kuthibitisha wakati ugumu wao wa kumbukumbu unapoongezeka hadi viwango salama vya kweli. Hata hivyo, Dagger ilikuwa hatarini kwa uongezaji kasi wa maunzi ya kumbukumbu ya pamoja na ikaachwa kwa ajili ya njia nyingine za utafiti.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) ni algoriti inayoongeza ukinzani wa ASIC kwa kuwa na kikomo cha I/O (yaani, usomaji wa kumbukumbu ndio kikwazo katika mchakato wa uchimbaji). Nadharia ni kwamba RAM inapatikana zaidi kuliko ukokotoaji; mabilioni ya dola ya utafiti tayari yamechunguza uboreshaji wa RAM kwa matumizi tofauti, ambayo mara nyingi yanahusisha mifumo ya ufikiaji inayokaribia nasibu (hivyo "random access memory"). Kama matokeo, RAM iliyopo inaelekea kuwa karibu na kiwango bora kwa kutathmini algoriti. Hashimoto inatumia mnyororo wa vitalu kama chanzo cha data, ikikidhi kwa wakati mmoja (1) na (3) hapo juu.

Dagger-Hashimoto ilitumia matoleo yaliyorekebishwa ya algoriti za Dagger na Hashimoto. Tofauti kati ya Dagger Hashimoto na Hashimoto ni kwamba, badala ya kutumia mnyororo wa vitalu kama chanzo cha data, Dagger Hashimoto inatumia seti ya data iliyozalishwa maalum, ambayo inasasishwa kulingana na data ya kitalu kila baada ya vitalu N. Seti ya data inazalishwa kwa kutumia algoriti ya Dagger, ikiruhusu kukokotoa kwa ufanisi seti ndogo maalum kwa kila nonsi kwa ajili ya algoriti ya uthibitishaji ya kiteja chepesi. Tofauti kati ya Dagger Hashimoto na Dagger ni kwamba, tofauti na Dagger ya asili, seti ya data inayotumika kuulizia kitalu ni ya nusu-kudumu, inasasishwa tu kwa vipindi vya mara kwa mara (k.m., mara moja kwa wiki). Hii inamaanisha kuwa sehemu ya juhudi za kuzalisha seti ya data inakaribia sifuri, hivyo hoja za Sergio Lerner kuhusu uongezaji kasi wa kumbukumbu ya pamoja zinakuwa hazina maana.

Zaidi kuhusu [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash ilikuwa algoriti ya uchimbaji ambayo ilitumika hasa kwenye Mtandao Mkuu wa Ethereum halisi chini ya usanifu wa Uthibitisho wa Kazi (PoW) uliopitwa na wakati sasa. Ethash ilikuwa kwa ufanisi jina jipya lililopewa toleo maalum la Dagger-Hashimoto baada ya algoriti kusasishwa kwa kiasi kikubwa, huku bado ikirithi kanuni za msingi za mtangulizi wake. Mtandao Mkuu wa Ethereum ulitumia Ethash pekee - Dagger Hashimoto ilikuwa toleo la R&D la algoriti ya uchimbaji ambalo lilichukuliwa nafasi kabla ya uchimbaji kuanza kwenye Mtandao Mkuu wa Ethereum.

[Zaidi kuhusu Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Usomaji zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_