---
title: Kuongeza Uwezo wa Ethereum
description: Mikusanyiko huweka miamala pamoja nje ya mtandao, na kupunguza gharama kwa mtumiaji. Hata hivyo, jinsi mikusanyiko inavyotumia data kwa sasa ni ghali sana, na kuzuia jinsi miamala inavyoweza kuwa nafuu. Proto-Danksharding inasuluhisha hili.
lang: sw
image: /images/roadmap/roadmap-transactions.png
alt: "Ramani ya njia ya Ethereum"
template: roadmap
---

Uwezo wa Ethereum unaongezwa kwa kutumia [matabaka ya 2](/layer-2/#rollups) (pia inajulikana kama mikusanyiko), ambayo huweka miamala pamoja na kutuma matokeo kwenye Ethereum. Ingawa mikusanyiko ni nafuu hadi mara nane zaidi ya Mtandao Mkuu wa Ethereum, inawezekana kuboresha mikusanyiko zaidi ili kupunguza gharama kwa watumiaji wa mwisho. Mikusanyiko pia inategemea baadhi ya vijenzi vilivyowekwa kati ambavyo wasanidi wanaweza kuviondoa kadiri mikusanyiko inavyokomaa.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Gharama za miamala
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Mikusanyiko ya leo ni nafuu <strong>\~5-20x</strong> kuliko tabaka la 1 la Ethereum</li>
    <li>Mikusanyiko ya ZK hivi karibuni itapunguza ada kwa <strong>\~40-100x</strong></li>
    <li>Mabadiliko yajayo kwenye Ethereum yatatoa ongezeko lingine la uwezo la <strong>\~100-1000x</strong></li>
 <li style={{ marginBottom: 0 }}>Watumiaji wanapaswa kunufaika na miamala <strong>inayogharimu chini ya $0.001</strong></li>
  </ul>
</AlertContent>
</Alert>

## Kufanya data iwe nafuu {#making-data-cheaper}

Mikusanyiko hukusanya idadi kubwa ya miamala, kuitekeleza na kuwasilisha matokeo kwenye Ethereum. Hii inazalisha data nyingi ambayo inahitaji kupatikana wazi ili mtu yeyote aweze kujitekelezea miamala na kuthibitisha kuwa mwendeshaji wa rollup alikuwa mwaminifu. Ikiwa mtu atapata tofauti, anaweza kuibua changamoto.

### Proto-Danksharding {#proto-danksharding}

Data ya rollup kihistoria imekuwa ikihifadhiwa kwenye Ethereum kwa kudumu, jambo ambalo ni ghali. Zaidi ya 90% ya gharama ya muamala ambayo watumiaji hulipa kwenye mikusanyiko inatokana na uhifadhi huu wa data. Ili kupunguza gharama za miamala, tunaweza kuhamisha data kwenye hifadhi mpya ya muda ya 'blobu'. Mablobu ni nafuu kwa sababu si ya kudumu; yanafutwa kutoka kwenye Ethereum mara tu yanapokuwa hayahitajiki tena. Kuhifadhi data ya rollup kwa muda mrefu inakuwa jukumu la watu wanaoihitaji, kama vile waendeshaji wa rollup, mabadilishano, huduma za kuorodhesha n.k. Kuongeza miamala ya blobu kwenye Ethereum ni sehemu ya sasisho linalojulikana kama "Proto-Danksharding".

Kwa Proto-Danksharding, inawezekana kuongeza mablobu mengi kwenye vitalu vya Ethereum. Hii inawezesha ongezeko lingine kubwa (>100x) kwa uwezo wa upitishaji wa Ethereum na kupunguza gharama za miamala.

### Danksharding {#danksharding}

Hatua ya pili ya kupanua data ya blobu ni ngumu kwa sababu inahitaji mbinu mpya za kuangalia kama data ya rollup inapatikana kwenye mtandao na inategemea [wathibitishaji](/glossary/#validator) kutenganisha majukumu yao ya ujenzi wa [kitalu](/glossary/#block) na pendekezo la kitalu. Pia inahitaji njia ya kuthibitisha kwa njia ya kificho kwamba wathibitishaji wamethibitisha vijisehemu vidogo vya data ya blobu.

Hatua hii ya pili inajulikana kama ["danksharding"](/roadmap/danksharding/). Kazi ya utekelezaji inaendelea, huku maendeleo yakifanywa kwenye mahitaji ya awali kama vile [utengano wa ujenzi wa kitalu na pendekezo la kitalu](/roadmap/pbs) na miundo mipya ya mtandao inayowezesha mtandao kuthibitisha kwa ufanisi kwamba data inapatikana kwa kuchukua sampuli za kilobaiti chache kwa wakati mmoja bila mpangilio maalum, inayojulikana kama [uchukuaji sampuli wa upatikanaji wa data (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Zaidi kuhusu danksharding</ButtonLink>

## Kugawa madaraka ya mikusanyiko {#decentralizing-rollups}

[Mikusanyiko](/layer-2) tayari inaongeza uwezo wa Ethereum. [Mfumo ikolojia tajiri wa miradi ya rollup](https://l2beat.com/scaling/tvs) unawawezesha watumiaji kufanya miamala haraka na kwa bei nafuu, kukiwa na anuwai ya hakikisho la usalama. Hata hivyo, mikusanyiko imeanzishwa kwa kutumia mipangaji iliyowekwa kati (kompyuta zinazofanya uchakataji wote wa miamala na ujumuishaji kabla ya kuiwasilisha kwenye Ethereum). Hii iko hatarini kudhibitiwa, kwa sababu waendeshaji wa mpangaji wanaweza kuwekewa vikwazo, kuhongwa au kuathiriwa kwa njia nyingine. Wakati huo huo, [mikusanyiko inatofautiana](https://l2beat.com/scaling/summary) katika jinsi inavyothibitisha data inayoingia. Njia bora ni kwa "wathibitishaji" kuwasilisha [uthibitisho wa ulaghai](/glossary/#fraud-proof) au uthibitisho wa uhalali, lakini si mikusanyiko yote imefikia hapo bado. Hata ile mikusanyiko inayotumia uthibitisho wa uhalali/ulaghai hutumia kundi dogo la wathibitishaji wanaojulikana. Kwa hivyo, hatua muhimu inayofuata katika kuongeza uwezo wa Ethereum ni kusambaza jukumu la kuendesha mipangaji na wathibitishaji kwa watu wengi zaidi.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Zaidi kuhusu mikusanyiko</ButtonLink>

## Maendeleo ya sasa {#current-progress}

Proto-Danksharding ilitekelezwa kwa mafanikio kama sehemu ya sasisho la mtandao la Cancun-Deneb ("Dencun") mnamo Machi 2024. Tangu utekelezaji wake, mikusanyiko imeanza kutumia hifadhi ya blobu, na kusababisha kupungua kwa gharama za miamala kwa watumiaji na mamilioni ya miamala kuchakatwa katika mablobu.

Kazi ya danksharding kamili inaendelea, huku maendeleo yakifanywa kwenye mahitaji yake ya awali kama vile utengano wa mpendekezaji na mjengaji (PBS) na uchukuaji sampuli wa upatikanaji wa data (DAS). Kugawa madaraka ya miundombinu ya rollup ni mchakato wa taratibu - kuna mikusanyiko mingi tofauti inayojenga mifumo tofauti kidogo na itagawa madaraka kikamilifu kwa viwango tofauti.

[Zaidi kuhusu sasisho la mtandao la Dencun na athari zake](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
