---
title: Kuongeza Ethereum
description: Muunganiko wa miamala pamoja nje ya mtandao, kupunguza gharama kwa mtumiaji. Hata hivyo, namna muunganiko wa miamala inavyotumia data kwa sasa ni ghali sana, na kunazuia miamala kuwa ya bei nafuu zaidi. Proto-Danksharding inarekebisha hili.
lang: sw
image: /images/roadmap/roadmap-transactions.png
alt: "Ramani ya maendeleo ya Ethereum"
template: roadmap
---

Ethereum hupandishwa kiwango kwa kutumia [safu 2](/layer-2/#rollups) (pia zinajulikana kama rollups), ambazo huunganisha miamala pamoja na kutuma matokeo kwa Ethereum. Hata ingawa muunganiko wa miamala ni mara hadi nane nafuu zaidi kuliko Ethereum Mainnet, bado inawezekana kuboresha zaidi muunganiko wa miamala ili kupunguza gharama kwa watumiaji wa mwisho. Muunganiko wa miamala pia hutegemea baadhi ya vipengele vilivyowekwa chini ya uthibiti wa kituo kimoja, ambavyo watengenezaji wanaweza kuondoa kadri muunganiko wa miamala unavyokomaa.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Gharama za muamala
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Muunganiko wa miamala ya leo ni takriban mara 5–20 nafuu kuliko safu 1 ya Ethereum</li>
    <li>Ukusanyaji wa ZK hivi karibuni utapunguza ada kwa <strong>~40-100x</strong></li>
    <li>Mabadiliko yajayo kwa Ethereum yatatoa <strong>~100-1000x</strong> nyingine ya kuongeza</li>
    <li style={{ marginBottom: 0 }}>Watumiaji wanapaswa kufaidika na miamala <strong>ya gharama ya chini ya $0.001</strong></li>
  </ul>
</AlertContent>
</Alert>

## Kufanya data iwe nafuu {#making-data-cheaper}

Ukusanyaji hukusanya idadi kubwa ya shughuli, kuzitekeleza na kuwasilisha matokeo kwa Ethereum. Hii hutoa data nyingi ambayo inahitaji kupatikana kwa uwazi ili mtu yeyote aweze kutekeleza shughuli zake mwenyewe na kuthibitisha kwamba mtoa huduma wa uwasilishaji alikuwa mwaminifu. Ikiwa mtu anapata tofauti, anaweza kuibua changamoto.

### Proto-Danksharding {#proto-danksharding}

Data iliyojumuishwa katika historia imehifadhiwa kwenye Ethereum kabisa, ambayo ni ghali. Zaidi ya 90% ya gharama ya ununuzi ambayo watumiaji hulipa kwenye makusanyo inatokana na hifadhi hii ya data. Ili kupunguza gharama za muamala, tunaweza kuhamisha data hadi kwenye hifadhi mpya ya muda ya 'kundi la data'. Makundi ya data ni nafuu kwa sababu si ya kudumu; hufutwa kutoka Ethereum mara tu zisipohitajika tena. Uhifadhi wa data ya muda mrefu inakuwa jukumu la watu wanaoihitaji, kama vile waendeshaji wa kusambaza, kubadilishana, huduma za kuorodhesha n. k. Kuongeza miamala ya kundi la data kwa Ethereum ni sehemu ya toleo jipya linalojulikana kama "Proto-Dankharding".

Kwa Proto-Dankharding, inawezekana kuongeza makundi ya data mengi kwenye vitalu vya Ethereum. Hii huwezesha ongezeko lingine kubwa (>100x) la upitishaji wa Ethereum na kupunguza gharama za muamala.

### Danksharding {#danksharding}

Hatua ya pili ya kupanua data ya blob ni ngumu kwa sababu inahitaji mbinu mpya za kukagua data ya rollup inapatikana kwenye mtandao na inategemea [wathibitishaji](/glossary/#validator) kutenganisha majukumu yao ya uundaji wa [bloku](/glossary/#block) na mapendekezo ya bloku. Inahitaji pia njia ya kuthibitisha kwa njia fiche kwamba wathibitishaji wamethibitisha vikundi vidogo vya data.

Hatua hii ya pili inajulikana kama [\"Danksharding\"](/roadmap/danksharding/). Kazi ya utekelezaji inaendelea, huku maendeleo yakifanywa kwenye masharti ya awali kama [kutenganisha uundaji wa bloku na pendekezo la bloku](/roadmap/pbs) na miundo mipya ya mtandao ambayo huwezesha mtandao kuthibitisha kwa ufanisi kuwa data inapatikana kwa kuchukua sampuli nasibu za kilobaiti chache kwa wakati mmoja, inayojulikana kama [uchukuaji sampuli wa upatikanaji wa data (DAS)](/developers/docs/data-availability).

<ButtonLink variant=\"outline-color\" href=\"/roadmap/danksharding/\">Zaidi kuhusu Danksharding</ButtonLink>

## Kugatua rollups {#decentralizing-rollups}

[Rollups](/layer-2) tayari zinapanua kiwango cha Ethereum. [Mfumo ikolojia tele wa miradi ya rollup](https://l2beat.com/scaling/tvs) unawawezesha watumiaji kufanya miamala haraka na kwa bei nafuu, kukiwa na dhamana mbalimbali za usalama. Hata hivyo, rollups zimewekwa kujitegemea kuanzishwa kwa kutumia wapangaji wa muamala kati (kompyuta hufanya shughuli zote usindikaji na uchanganuzi kabla ya kuwasilisha yao kwa Ethereum). Hii inaweza kuathiriwa na udhibiti, kwa sababu waendeshaji wa mpangilio wanaweza kuidhinishwa, kuhongwa au kuathiriwa vinginevyo. Wakati huo huo, [rollups hutofautiana](https://l2beat.com/scaling/summary) kwa jinsi zinavyothibitisha data inayoingia. Njia bora zaidi ni kwa \"provers\" kuwasilisha [ushahidi wa ulaghai](/glossary/#fraud-proof) au ushahidi wa uhalali, lakini sio rollups zote zimefika hapo bado. Hata zile orodha zinazotumia uthibitisho wa uhalali/udanganyifu hutumia kundi dogo la methali zinazojulikana. Kwa hiyo, hatua inayofuata muhimu katika kuongeza kiwango cha Ethereum ni kusambaza jukumu la kuendesha vifuatavyo na methali kwa watu wengi zaidi.

<ButtonLink variant=\"outline-color\" href=\"/developers/docs/scaling/\">Zaidi kuhusu rollups</ButtonLink>

## Maendeleo ya sasa {#current-progress}

Proto-Dankharding ilitekelezwa kwa mafanikio kama sehemu ya uboreshaji wa mtandao wa Cancun-Deneb ("Dencun") mnamo Machi 2024. Tangu kutekelezwa kwake, uwasilishaji umeanza kutumia hifadhi ya kundi la data, na kusababisha kupunguza gharama za ununuzi kwa watumiaji na mamilioni ya miamala iliyochakatwa katika vipande vya data.

Kazi ya Dankharding kamili inaendelea, huku maendeleo yakifanywa kuhusu mahitaji yake ya awali kama vile PBS (Mgawanyo wa Wajenzi wa Mpendekezaji) na DAS (Sampuli ya Upatikanaji wa Data). Miundombinu ya mfumo mtawanyo wa madaraka ni mchakato wa taratibu - kuna matoleo mengi tofauti ambayo yanaunda mifumo tofauti kidogo na itatawanya kikamilifu kwa viwango tofauti.

[Zaidi kuhusu uboreshaji wa mtandao wa Dencun na athari zake](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
