---
title: Maelekezo ya uchimbaji
description: Mtazamo wa kina wa kanuni zilizotumika kwa ajili ya uchimbaji wa Ethereum.
lang: sw
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Uthibitisho wa kazi sio msingi tena wa utaratibu wa makubaliano wa Ethereum, kumaanisha uchimbaji umezimwa. Badala yake, Ethereum inalindwa na wathibitishaji ambao wanashiriki ETH. Unaweza kuanza kuweka ETH yako leo. Soma zaidi kwenye <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>ushahidi-wa-stake</a>, na <a href='/staking/'>staking</a>. Ukurasa huu ni kwa ajili ya maslahi ya kihistoria tu.
</AlertDescription>
</AlertContent>
</Alert>

Uchimbaji wa Ethereum ulitumia kanuni inayojulikana kama Ethash. Wazo la msingi la kanuni ni kwamba mchimbaji anajaribu kupata ingizo la nonce kwa kutumia hesabu za nguvu ili hashi inayotokana iwe ndogo kuliko kizingiti kilichowekwa na ugumu uliokokotolewa. Kiwango hiki cha ugumu kinaweza kurekebishwa kwa nguvu, na kuruhusu uzalishaji wa bloku kufanyika kwa muda wa kawaida.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu vizuri, tunapendekeza kwanza usome kuhusu [makubaliano ya uthibitishaji-wa-kazi](/developers/docs/consensus-mechanisms/pow) na [uchimbaji](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto ilikuwa kanuni ya utafiti mtangulizi ya uchimbaji wa Ethereum ambayo Ethash iliichukua nafasi. Ulikuwa ni mchanganyiko wa kanuni mbili tofauti: Dagger na Hashimoto. Lilikuwa tu utekelezaji wa utafiti na lilichukuliwa nafasi na Ethash wakati Mtandao Mkuu wa Ethereum ulizinduliwa.

[Dagger](http://www.hashcash.org/papers/dagger.html) inahusisha uzalishaji wa [Grafu Elekezi Isiyo na Mzunguko](https://en.wikipedia.org/wiki/Directed_acyclic_graph), ambapo vipande vyake nasibu huunganishwa kwa hashi. Kanuni kuu ni kwamba kila nonce inahitaji tu sehemu ndogo ya mti mkuu wa data. Kuhesabu upya mti mdogo kwa kila nonce ni ghali sana kwa uchimbaji - hivyo basi kuna haja ya kuhifadhi mti - lakini ni sawa kwa uthibitishaji wa thamani ya nonce moja. Dagger iliundwa kuwa mbadala wa kanuni zilizopo kama Scrypt, ambazo ni ngumu kwa kumbukumbu lakini ni ngumu kuthibitisha wakati ugumu wao wa kumbukumbu unapoongezeka hadi viwango vya usalama halisi. Hata hivyo, Dagger ilikuwa hatarini kwa uharakishaji wa maunzi ya kumbukumbu ya pamoja na iliachwa ili kupendelea njia nyingine za utafiti.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) ni kanuni inayoongeza ukinzani wa ASIC kwa kufungwa na I/O (yaani, usomaji wa kumbukumbu ndio kipengele kinachozuia katika mchakato wa uchimbaji). Nadharia ni kwamba RAM inapatikana zaidi kuliko hesabu; mabilioni ya dola za utafiti tayari yamechunguza uboreshaji wa RAM kwa matumizi tofauti, ambayo mara nyingi huhusisha mifumo ya ufikiaji isiyo ya kawaida (hivyo “kumbukumbu ya ufikiaji nasibu”). Kwa hiyo, RAM iliyopo inawezekana kuwa karibu na ubora wa juu kwa kutathmini kanuni. Hashimoto hutumia mnyororo wa bloku kama chanzo cha data, na kukidhi (1) na (3) hapo juu kwa wakati mmoja.

Dagger-Hashimoto ilitumia matoleo yaliyorekebishwa ya kanuni za Dagger na Hashimoto. Tofauti kati ya Dagger Hashimoto na Hashimoto ni kwamba, badala ya kutumia mnyororo wa bloku kama chanzo cha data, Dagger Hashimoto hutumia seti ya data iliyoundwa maalum, ambayo husasishwa kulingana na data ya bloku kila baada ya bloku N. Seti ya data inazalishwa kwa kutumia kanuni ya Dagger, ikiruhusu uhesabuji mzuri wa seti ndogo maalum kwa kila nonce kwa ajili ya kanuni ya uthibitishaji ya mteja nyepesi. Tofauti kati ya Dagger Hashimoto na Dagger ni kwamba, tofauti na Dagger ya asili, seti ya data inayotumika kuuliza bloku ni ya kudumu kiasi, ikisasishwa tu kwa vipindi vya nadra (k.m., mara moja kwa wiki). Hii inamaanisha kuwa sehemu ya juhudi ya kuzalisha seti ya data ni karibu na sifuri, kwa hivyo hoja za Sergio Lerner kuhusu ongezeko la kasi ya kumbukumbu ya pamoja zinakuwa si muhimu.

Zaidi kuhusu [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash ilikuwa kanuni ya uchimbaji ambayo ilitumika kwenye Mtandao Mkuu halisi wa Ethereum chini ya usanifu wa uthibitishaji-wa-kazi ambao sasa umeacha kutumika. Ethash kimsingi lilikuwa jina jipya lililopewa toleo maalum la Dagger-Hashimoto baada ya kanuni kusasishwa kwa kiasi kikubwa, huku bado ikirithi kanuni za msingi za mtangulizi wake. Mtandao Mkuu wa Ethereum ulitumia Ethash pekee - Dagger Hashimoto ilikuwa toleo la U&U la kanuni ya uchimbaji ambalo lilichukuliwa nafasi kabla ya uchimbaji kuanza kwenye Mtandao Mkuu wa Ethereum.

[Zaidi kuhusu Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Masomo zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_
