---
title: Uthibitisho wa maarifa-sifuri ni nini?
metaTitle: Uthibitisho wa maarifa-sifuri
description: Utangulizi usio wa kiufundi wa uthibitisho wa maarifa-sifuri kwa wanaoanza.
lang: sw
---

Uthibitisho wa maarifa-sifuri ni njia ya kuthibitisha uhalali wa taarifa bila kufichua taarifa yenyewe. 'Mthibitishaji' ni upande unaojaribu kuthibitisha dai, huku 'mhakiki' akiwa na jukumu la kuhalalisha dai hilo.

Uthibitisho wa maarifa-sifuri ulionekana kwa mara ya kwanza katika chapisho la mwaka 1985, "[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)" ambalo linatoa ufafanuzi wa uthibitisho wa maarifa-sifuri unaotumika sana leo:

> Itifaki ya sifuri-maarifa ni mbinu ambayo upande mmoja (mthibitishaji) **unaweza kuthibitisha** kwa upande mwingine (mhakiki) **kuwa jambo fulani ni la kweli, bila kufichua taarifa yoyote** isipokuwa ukweli kwamba taarifa hii mahususi ni ya kweli.

Uthibitisho wa maarifa-sifuri umeboreshwa kwa miaka mingi na sasa unatumika katika matumizi kadhaa ya ulimwengu halisi.

<VideoWatch slug="zero-knowledge-proofs-5-levels" />

## Kwa nini tunahitaji uthibitisho wa maarifa-sifuri? {#why-zero-knowledge-proofs-are-important}

Uthibitisho wa maarifa-sifuri uliwakilisha mafanikio makubwa katika kriptografia tumizi, kwani uliahidi kuboresha usalama wa taarifa kwa watu binafsi. Fikiria jinsi unavyoweza kuthibitisha dai (k.m., "Mimi ni raia wa nchi X") kwa upande mwingine (k.m., mtoa huduma). Utahitaji kutoa "ushahidi" ili kuunga mkono dai lako, kama vile pasipoti ya taifa au leseni ya udereva.

Lakini kuna matatizo na mbinu hii, hasa ukosefu wa faragha. Taarifa Zinazotambulisha Mtu Binafsi (PII) zinazoshirikiwa na huduma za wahusika wengine huhifadhiwa katika hifadhidata kuu, ambazo ziko hatarini kudukuliwa. Huku wizi wa utambulisho ukiwa suala muhimu, kuna wito wa njia zaidi za kulinda faragha za kushiriki taarifa nyeti.

Uthibitisho wa maarifa-sifuri hutatua tatizo hili kwa **kuondoa hitaji la kufichua taarifa ili kuthibitisha uhalali wa madai**. Itifaki ya sifuri-maarifa hutumia taarifa (inayoitwa 'Shahidi') kama ingizo ili kuzalisha uthibitisho mfupi wa uhalali wake. Uthibitisho huu unatoa hakikisho dhabiti kwamba taarifa ni ya kweli bila kufichua taarifa iliyotumika kuunda.

Tukirudi kwenye mfano wetu wa awali, ushahidi pekee unaohitaji ili kuthibitisha dai lako la uraia ni uthibitisho wa maarifa-sifuri. Mhakiki anahitaji tu kuangalia ikiwa sifa fulani za uthibitisho ni za kweli ili kushawishika kwamba taarifa ya msingi pia ni ya kweli.

## Matumizi ya uthibitisho wa maarifa-sifuri {#use-cases-for-zero-knowledge-proofs}

### Malipo yasiyotambulika {#anonymous-payments}

Malipo ya kadi ya mkopo mara nyingi huonekana kwa pande nyingi, ikiwa ni pamoja na mtoa huduma wa malipo, benki, na pande nyingine zinazovutiwa (k.m., mamlaka za serikali). Ingawa ufuatiliaji wa kifedha una faida za kutambua shughuli haramu, pia unadhoofisha faragha ya raia wa kawaida.

Sarafu-fiche zilikusudiwa kutoa njia kwa watumiaji kufanya miamala ya faragha, ya rika-kwa-rika. Lakini miamala mingi ya sarafu-fiche inaonekana wazi kwenye minyororo ya vitalu ya umma. Utambulisho wa watumiaji mara nyingi ni wa majina bandia na ama huunganishwa kwa hiari na utambulisho wa ulimwengu halisi (k.m., kwa kujumuisha anwani za ETH kwenye wasifu wa Twitter au GitHub) au unaweza kuhusishwa na utambulisho wa ulimwengu halisi kwa kutumia uchanganuzi wa kimsingi wa data mnyororoni na nje ya mnyororo.

Kuna "sarafu za faragha" maalum zilizoundwa kwa ajili ya miamala isiyotambulika kabisa. Minyororo ya vitalu inayolenga faragha, kama vile Zcash na Monero, huficha maelezo ya muamala, ikiwa ni pamoja na anwani za mtumaji/mpokeaji, aina ya rasilimali, kiasi, na ratiba ya muamala.

Kwa kuingiza teknolojia ya sifuri-maarifa kwenye itifaki, mitandao ya [mnyororo wa vitalu](/glossary/#blockchain) inayolenga faragha inaruhusu [nodi](/glossary/#node) kuhalalisha miamala bila kuhitaji kufikia data ya muamala. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) ni mfano wa muundo uliopendekezwa ambao utawezesha uhamishaji wa thamani wa faragha wa asili kwenye mnyororo wa vitalu wa [Ethereum](/). Mapendekezo kama haya, hata hivyo, ni magumu kutekeleza kutokana na mchanganyiko wa masuala ya usalama, udhibiti, na uzoefu wa mtumiaji (UX).  

**Uthibitisho wa maarifa-sifuri pia unatumika kufanya miamala isitambulike kwenye minyororo ya vitalu ya umma**. Mfano ni Tornado Cash, huduma iliyogatuliwa, isiyo ya udhamini ambayo inaruhusu watumiaji kufanya miamala ya faragha kwenye Ethereum. Tornado Cash hutumia uthibitisho wa maarifa-sifuri kuficha maelezo ya muamala na kuhakikisha faragha ya kifedha. Kwa bahati mbaya, kwa sababu hizi ni zana za faragha za "kujitolea" zinahusishwa na shughuli haramu. Ili kuondokana na hili, faragha inapaswa hatimaye kuwa chaguo-msingi kwenye minyororo ya vitalu ya umma. Jifunze zaidi kuhusu [faragha kwenye Ethereum](/privacy/).

### Ulinzi wa utambulisho {#identity-protection}

Mifumo ya sasa ya usimamizi wa utambulisho inaweka taarifa za kibinafsi hatarini. Uthibitisho wa maarifa-sifuri unaweza kusaidia watu binafsi kuhalalisha utambulisho huku wakilinda maelezo nyeti.

Uthibitisho wa maarifa-sifuri ni muhimu sana katika muktadha wa [utambulisho uliogatuliwa](/decentralized-identity/). Utambulisho uliogatuliwa (pia unaoelezewa kama 'utambulisho wa kujitawala') humpa mtu binafsi uwezo wa kudhibiti ufikiaji wa vitambulisho vya kibinafsi. Kuthibitisha uraia wako bila kufichua kitambulisho chako cha kodi au maelezo ya pasipoti ni mfano mzuri wa jinsi teknolojia ya sifuri-maarifa inavyowezesha utambulisho uliogatuliwa.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Utambulisho katika vitendo: Kitambulisho cha Taifa cha Kidijitali cha Bhutan (NDI) kwenye Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Mfano wa ulimwengu halisi wa kutumia ZKP kwa mifumo ya usimamizi wa utambulisho ni mfumo wa Kitambulisho cha Taifa cha Kidijitali (NDI) cha Ufalme wa Bhutan, uliojengwa kwenye Ethereum. NDI ya Bhutan inatumia ZKP kuruhusu raia kuthibitisha ukweli kuwahusu wao wenyewe kwa njia ya kriptografia, kama vile "Mimi ni raia" au "Nina zaidi ya miaka 18," bila kufichua data nyeti ya kibinafsi kwenye kitambulisho chao.
      </p>
      <p>
        Jifunze zaidi kuhusu NDI ya Bhutan katika <a href="/decentralized-identity/#national-and-government-id">Uchunguzi kifani wa Utambulisho Uliogatuliwa</a>.
      </p>
    </AlertDescription>
  </AlertContent>
</Alert>

### Uthibitisho wa Ubinadamu {#proof-of-humanity}

Mojawapo ya mifano inayotumika sana ya uthibitisho wa maarifa-sifuri katika vitendo leo ni [itifaki ya World ID](https://world.org/blog/world/world-id-faqs), ambayo inaweza kufikiriwa kama "pasipoti ya kidijitali ya kimataifa kwa enzi ya AI." Inaruhusu watu kuthibitisha kuwa wao ni watu wa kipekee bila kufichua taarifa za kibinafsi. Hili linafikiwa kupitia kifaa kinachoitwa Orb, ambacho huchanganua mboni ya jicho la mtu na kuzalisha msimbo wa mboni. Msimbo wa mboni hukaguliwa na kuhakikiwa ili kuthibitisha kuwa mtu huyo ni binadamu wa kipekee kibiolojia. Baada ya uhakiki, ufungamanisho wa utambulisho unaozalishwa kwenye kifaa cha mtumiaji (na haujaunganishwa au kutolewa kutoka kwa data ya kibayometriki) huongezwa kwenye orodha salama kwenye mnyororo wa vitalu. Kisha, wakati wowote mtumiaji anapotaka kuthibitisha kuwa yeye ni binadamu aliyethibitishwa - iwe ni kuingia, kupiga kura, au kuchukua hatua nyingine - anaweza kuzalisha uthibitisho wa maarifa-sifuri ambao unathibitisha uanachama wake katika orodha. Uzuri wa kutumia uthibitisho wa maarifa-sifuri ni kwamba taarifa moja tu inafichuliwa: mtu huyu ni wa kipekee. Kila kitu kingine kinabaki kuwa cha faragha.

World ID inategemea [itifaki ya Semaphore](https://docs.semaphore.pse.dev/) iliyotengenezwa na [timu ya PSE](https://pse.dev/) katika Taasisi ya Ethereum. Semaphore imeundwa kuwa njia nyepesi lakini yenye nguvu ya kuzalisha na kuhakiki uthibitisho wa maarifa-sifuri. Inaruhusu watumiaji kuthibitisha kuwa wao ni sehemu ya kikundi (katika kesi hii, binadamu waliothibitishwa) bila kuonyesha wao ni mwanachama yupi wa kikundi. Semaphore pia inabadilika sana, ikiruhusu vikundi kuundwa kulingana na vigezo mbalimbali kama vile uhakiki wa utambulisho, ushiriki katika matukio, au umiliki wa vitambulisho.

### Uthibitishaji {#authentication}

Kutumia huduma za mtandaoni kunahitaji kuthibitisha utambulisho wako na haki ya kufikia majukwaa hayo. Hili mara nyingi linahitaji kutoa taarifa za kibinafsi, kama vile majina, anwani za barua pepe, tarehe za kuzaliwa, na kadhalika. Unaweza pia kuhitaji kukariri nywila ndefu au kuhatarisha kupoteza ufikiaji.

Uthibitisho wa maarifa-sifuri, hata hivyo, unaweza kurahisisha uthibitishaji kwa majukwaa na watumiaji. Pindi uthibitisho wa ZK unapozalishwa kwa kutumia ingizo la umma (k.m., data inayothibitisha uanachama wa mtumiaji kwenye jukwaa) na ingizo la siri (k.m., maelezo ya mtumiaji), mtumiaji anaweza tu kuuwasilisha ili kuthibitisha utambulisho wake anapohitaji kufikia huduma. Hili linaboresha uzoefu kwa watumiaji na kuzikomboa mashirika kutokana na hitaji la kuhifadhi kiasi kikubwa cha taarifa za watumiaji.

### Ukokotoaji unaoweza kuhakikiwa {#verifiable-computation}

Ukokotoaji unaoweza kuhakikiwa ni matumizi mengine ya teknolojia ya sifuri-maarifa kwa ajili ya kuboresha miundo ya mnyororo wa vitalu. Ukokotoaji unaoweza kuhakikiwa unaturuhusu kutoa ukokotoaji kwa chombo kingine huku tukidumisha matokeo yanayoweza kuhakikiwa. Chombo hicho huwasilisha matokeo pamoja na uthibitisho unaohakiki kwamba programu ilitekelezwa kwa usahihi.

Ukokotoaji unaoweza kuhakikiwa ni **muhimu katika kuboresha kasi ya uchakataji kwenye minyororo ya vitalu** bila kupunguza usalama. Kuelewa hili kunahitaji kujua tofauti katika masuluhisho yaliyopendekezwa ya kuongeza uwezo wa Ethereum.

[Masuluhisho ya kuongeza uwezo mnyororoni](/developers/docs/scaling/#onchain-scaling), kama vile mnyororo wa shadi, yanahitaji marekebisho makubwa ya tabaka la msingi la mnyororo wa vitalu. Hata hivyo, mbinu hii ni ngumu sana na makosa katika utekelezaji yanaweza kudhoofisha muundo wa usalama wa Ethereum.

[Masuluhisho ya kuongeza uwezo nje ya mnyororo](/developers/docs/scaling/#offchain-scaling) hayahitaji kuunda upya itifaki kuu ya Ethereum. Badala yake yanategemea muundo wa ukokotoaji uliotolewa nje ili kuboresha uwezo wa upitishaji kwenye tabaka la msingi la Ethereum.

Hivi ndivyo inavyofanya kazi katika vitendo:

- Badala ya kuchakata kila muamala, Ethereum huhamishia utekelezaji kwenye mnyororo tofauti.

- Baada ya kuchakata miamala, mnyororo mwingine hurudisha matokeo ili yatumike kwenye hali ya Ethereum.

Faida hapa ni kwamba Ethereum haihitaji kufanya utekelezaji wowote na inahitaji tu kutumia matokeo kutoka kwa ukokotoaji uliotolewa nje kwenye hali yake. Hili linapunguza msongamano wa mtandao na pia kuboresha kasi ya muamala (itifaki za nje ya mnyororo huboresha kwa utekelezaji wa haraka).

Mnyororo unahitaji njia ya kuhalalisha miamala ya nje ya mnyororo bila kuitekeleza upya, la sivyo thamani ya utekelezaji wa nje ya mnyororo inapotea.

Hapa ndipo ukokotoaji unaoweza kuhakikiwa unapoingia. Wakati nodi inatekeleza muamala nje ya Ethereum, inawasilisha uthibitisho wa maarifa-sifuri ili kuthibitisha usahihi wa utekelezaji wa nje ya mnyororo. Uthibitisho huu (unaoitwa [uthibitisho wa uhalali](/glossary/#validity-proof)) unahakikisha kwamba muamala ni halali, ukiruhusu Ethereum kutumia matokeo kwenye hali yake—bila kusubiri mtu yeyote aupinge.

[Mikusanyiko ya sifuri-maarifa](/developers/docs/scaling/zk-rollups) na [validiums](/developers/docs/scaling/validium/) ni masuluhisho mawili ya kuongeza uwezo nje ya mnyororo ambayo hutumia uthibitisho wa uhalali kutoa uwezo wa kuongezeka kwa usalama. Itifaki hizi hutekeleza maelfu ya miamala nje ya mnyororo na kuwasilisha uthibitisho kwa ajili ya uhakiki kwenye Ethereum. Matokeo hayo yanaweza kutumika mara moja pindi uthibitisho unapohakikiwa, kuruhusu Ethereum kuchakata miamala zaidi bila kuongeza ukokotoaji kwenye tabaka la msingi.

Zaidi ya kuongeza uwezo wa Tabaka la 2, uthibitisho wa maarifa-sifuri unaweza pia kuhakiki utekelezaji wa kitalu cha Ethereum L1 wenyewe. [zkEVM kwa uhakiki wa L1](/roadmap/zkevm/) itaruhusu wathibitishaji kuhakiki vitalu kwa kuangalia uthibitisho badala ya kutekeleza upya miamala yote—kuwezesha viwango vya juu vya gesi bila kuongeza mahitaji ya maunzi ya mthibitishaji.

### Kupunguza hongo na njama katika upigaji kura mnyororoni {#secure-blockchain-voting}

Mipango ya upigaji kura ya mnyororo wa vitalu ina sifa nyingi nzuri: inakaguliwa kikamilifu, salama dhidi ya mashambulizi, inastahimili udhibiti, na haina vikwazo vya kijiografia. Lakini hata mipango ya upigaji kura mnyororoni haina kinga dhidi ya tatizo la **njama**.

Ikifafanuliwa kama "kuratibu ili kuzuia ushindani wa wazi kwa kudanganya, kulaghai, na kupotosha wengine," njama inaweza kuchukua sura ya mhusika mbaya anayeshawishi upigaji kura kwa kutoa hongo. Kwa mfano, Alice anaweza kupokea hongo kutoka kwa Bob ili kupiga kura kwa `option B` kwenye kura hata kama anapendelea `option A`.

Hongo na njama hupunguza ufanisi wa mchakato wowote unaotumia upigaji kura kama utaratibu wa kuashiria (hasa pale ambapo watumiaji wanaweza kuthibitisha jinsi walivyopiga kura). Hili linaweza kuwa na matokeo makubwa, hasa pale ambapo kura zinawajibika kwa kugawa rasilimali adimu.

Kwa mfano, [taratibu za ufadhili wa kipeo cha pili](https://www.radicalxchange.org/wiki/plural-funding/) zinategemea michango ili kupima upendeleo kwa chaguzi fulani kati ya miradi tofauti ya bidhaa ya umma. Kila mchango huhesabiwa kama "kura" kwa mradi mahususi, huku miradi inayopokea kura nyingi ikipata fedha zaidi kutoka kwa bwawa linalolingana.

Kutumia upigaji kura mnyororoni hufanya ufadhili wa kipeo cha pili kuwa katika hatari ya njama: miamala ya mnyororo wa vitalu ni ya umma, kwa hivyo watoa hongo wanaweza kukagua shughuli za mnyororoni za mpokea hongo ili kuona jinsi "walivyopiga kura". Kwa njia hii ufadhili wa kipeo cha pili unakoma kuwa njia bora ya kugawa fedha kulingana na mapendeleo yaliyojumuishwa ya jamii.

Kwa bahati nzuri, masuluhisho mapya kama vile MACI (Minimum Anti-Collusion Infrastructure) yanatumia uthibitisho wa maarifa-sifuri kufanya upigaji kura mnyororoni (k.m., taratibu za ufadhili wa kipeo cha pili) kustahimili hongo na njama. MACI ni seti ya mikataba mahiri na hati zinazoruhusu msimamizi mkuu (anayeitwa "mratibu") kujumuisha kura na kuhesabu matokeo _bila_ kufichua maelezo mahususi kuhusu jinsi kila mtu alivyopiga kura. Hata hivyo, bado inawezekana kuhakiki kwamba kura zilihesabiwa ipasavyo, au kuthibitisha kwamba mtu fulani alishiriki katika duru ya upigaji kura.

#### Je, MACI inafanyaje kazi na uthibitisho wa maarifa-sifuri? {#how-maci-works-with-zk-proofs}

Mwanzoni, mratibu hupeleka mkataba wa MACI kwenye Ethereum, baada ya hapo watumiaji wanaweza kujiandikisha kwa ajili ya kupiga kura (kwa kusajili ufunguo wa umma wao katika mkataba mahiri). Watumiaji hupiga kura kwa kutuma jumbe zilizosimbwa fiche kwa ufunguo wa umma wao kwenye mkataba mahiri (kura halali lazima itiwe saini na ufunguo wa umma wa hivi karibuni unaohusishwa na utambulisho wa mtumiaji, miongoni mwa vigezo vingine). Baadaye, mratibu huchakata jumbe zote pindi kipindi cha upigaji kura kinapoisha, huhesabu kura, na kuhakiki matokeo mnyororoni.

Katika MACI, uthibitisho wa maarifa-sifuri hutumika kuhakikisha usahihi wa ukokotoaji kwa kufanya iwezekane kwa mratibu kuchakata kura na kuhesabu matokeo kimakosa. Hili linafikiwa kwa kumtaka mratibu kuzalisha uthibitisho wa ZK-SNARK unaohakiki kwamba a) jumbe zote zilichakatwa kwa usahihi b) matokeo ya mwisho yanalingana na jumla ya kura zote _halali_.

Hivyo, hata bila kushiriki mchanganuo wa kura kwa kila mtumiaji (kama ilivyo kawaida), MACI inahakikisha uadilifu wa matokeo yaliyokokotolewa wakati wa mchakato wa kuhesabu. Kipengele hiki ni muhimu katika kupunguza ufanisi wa mipango ya kimsingi ya njama. Tunaweza kuchunguza uwezekano huu kwa kutumia mfano uliopita wa Bob kumhonga Alice ili apige kura kwa chaguo:

- Alice anajiandikisha kupiga kura kwa kutuma ufunguo wa umma wake kwenye mkataba mahiri.
- Alice anakubali kupiga kura kwa `option B` badala ya hongo kutoka kwa Bob.
- Alice anapiga kura kwa `option B`.
- Alice anatuma kwa siri muamala uliosimbwa fiche ili kubadilisha ufunguo wa umma unaohusishwa na utambulisho wake.
- Alice anatuma ujumbe mwingine (uliosimbwa fiche) kwenye mkataba mahiri akipiga kura kwa `option A` akitumia ufunguo wa umma mpya.
- Alice anamuonyesha Bob muamala unaoonyesha alipiga kura kwa `option B` (ambayo ni batili kwa kuwa ufunguo wa umma hauhusishwi tena na utambulisho wa Alice katika mfumo)
- Wakati wa kuchakata jumbe, mratibu anaruka kura ya Alice kwa `option B` na kuhesabu tu kura kwa `option A`. Kwa hivyo, jaribio la Bob la kufanya njama na Alice na kuchezea kura ya mnyororoni linashindwa.

Kutumia MACI _kunahitaji_ kumwamini mratibu kutofanya njama na watoa hongo au kujaribu kuhonga wapiga kura wenyewe. Mratibu anaweza kusimbua jumbe za watumiaji (muhimu kwa kuunda uthibitisho), kwa hivyo wanaweza kuhakiki kwa usahihi jinsi kila mtu alivyopiga kura.

Lakini katika hali ambapo mratibu anabaki mwaminifu, MACI inawakilisha zana yenye nguvu ya kuhakikisha utakatifu wa upigaji kura mnyororoni. Hili linaelezea umaarufu wake miongoni mwa programu za ufadhili wa kipeo cha pili (k.m., [clr.fund](https://clr.fund/#/about/maci)) ambazo zinategemea sana uadilifu wa chaguzi za upigaji kura za kila mtu.

[Jifunze zaidi kuhusu MACI](https://maci.pse.dev/).

## Je, uthibitisho wa maarifa-sifuri unafanyaje kazi? {#how-do-zero-knowledge-proofs-work}

Uthibitisho wa maarifa-sifuri unakuruhusu kuthibitisha ukweli wa taarifa bila kushiriki yaliyomo kwenye taarifa au kufichua jinsi ulivyogundua ukweli. Ili kufanya hili liwezekane, itifaki za sifuri-maarifa zinategemea algoriti zinazochukua baadhi ya data kama ingizo na kurudisha 'kweli' au 'si kweli' kama towe.

Itifaki ya sifuri-maarifa lazima ikidhi vigezo vifuatavyo:

1. **Ukamilifu**: Ikiwa ingizo ni halali, itifaki ya sifuri-maarifa daima hurudisha 'kweli'. Kwa hivyo, ikiwa taarifa ya msingi ni ya kweli, na mthibitishaji na mhakiki wanatenda kwa uaminifu, uthibitisho unaweza kukubaliwa.

2. **Uthabiti**: Ikiwa ingizo ni batili, kinadharia haiwezekani kudanganya itifaki ya sifuri-maarifa kurudisha 'kweli'. Kwa hivyo, mthibitishaji anayedanganya hawezi kumhadaa mhakiki mwaminifu kuamini taarifa batili ni halali (isipokuwa kwa uwezekano mdogo sana).

3. **Sifuri-maarifa**: Mhakiki hajifunzi chochote kuhusu taarifa zaidi ya uhalali au ubatili wake (wana "sifuri-maarifa" ya taarifa). Sharti hili pia linamzuia mhakiki kupata ingizo asili (yaliyomo kwenye taarifa) kutoka kwa uthibitisho.

Katika muundo wa kimsingi, uthibitisho wa maarifa-sifuri unaundwa na vipengele vitatu: **Shahidi**, **changamoto**, na **majibu**.

- **Shahidi**: Kwa uthibitisho wa maarifa-sifuri, mthibitishaji anataka kuthibitisha maarifa ya baadhi ya taarifa zilizofichwa. Taarifa ya siri ni "Shahidi" kwa uthibitisho, na maarifa yanayodhaniwa ya mthibitishaji ya Shahidi huanzisha seti ya maswali ambayo yanaweza kujibiwa tu by upande wenye maarifa ya taarifa hiyo. Hivyo, mthibitishaji huanza mchakato wa kuthibitisha kwa kuchagua swali kwa unasibu, kukokotoa jibu, na kulituma kwa mhakiki.

- **Changamoto**: Mhakiki huchagua swali lingine kwa unasibu kutoka kwenye seti na kumwomba mthibitishaji alijibu.

- **Majibu**: Mthibitishaji anakubali swali, anakokotoa jibu, na kulirudisha kwa mhakiki. Majibu ya mthibitishaji yanamruhusu mhakiki kuangalia ikiwa wa kwanza kweli ana ufikiaji wa Shahidi. Ili kuhakikisha mthibitishaji hakisii tu na kupata majibu sahihi kwa bahati, mhakiki huchagua maswali zaidi ya kuuliza. Kwa kurudia mwingiliano huu mara nyingi, uwezekano wa mthibitishaji kudanganya maarifa ya Shahidi unashuka sana hadi mhakiki aridhike.

Maelezo hapo juu yanaelezea muundo wa 'uthibitisho wa maarifa-sifuri mwingiliano'. Itifaki za mapema za sifuri-maarifa zilitumia uthibitishaji mwingiliano, ambapo kuhakiki uhalali wa taarifa kulihitaji mawasiliano ya kwenda na kurudi kati ya wathibitishaji na wahakiki.

Mfano mzuri unaoonyesha jinsi uthibitisho mwingiliano unavyofanya kazi ni [hadithi maarufu ya pango la Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) ya Jean-Jacques Quisquater. Katika hadithi hiyo, Peggy (mthibitishaji) anataka kumthibitishia Victor (mhakiki) kwamba anajua neno la siri la kufungua mlango wa uchawi bila kufichua neno hilo.

### Uthibitisho wa maarifa-sifuri usio mwingiliano {#non-interactive-zero-knowledge-proofs}

Ingawa ulikuwa wa kimapinduzi, uthibitishaji mwingiliano ulikuwa na manufaa madogo kwa kuwa ulihitaji pande zote mbili kuwepo na kuingiliana mara kwa mara. Hata kama mhakiki alishawishika na uaminifu wa mthibitishaji, uthibitisho haungepatikana kwa uhakiki huru (kukokotoa uthibitisho mpya kulihitaji seti mpya ya jumbe kati ya mthibitishaji na mhakiki).

Ili kutatua tatizo hili, Manuel Blum, Paul Feldman, na Silvio Micali walipendekeza [uthibitisho wa maarifa-sifuri usio mwingiliano](https://dl.acm.org/doi/10.1145/62212.62222) wa kwanza ambapo mthibitishaji na mhakiki wana ufunguo wa pamoja. Hili linamruhusu mthibitishaji kuonyesha maarifa yao ya baadhi ya taarifa (yaani, Shahidi) bila kutoa taarifa yenyewe.

Tofauti na uthibitisho mwingiliano, uthibitisho usio mwingiliano ulihitaji duru moja tu ya mawasiliano kati ya washiriki (mthibitishaji na mhakiki). Mthibitishaji hupitisha taarifa ya siri kwa algoriti maalum ili kukokotoa uthibitisho wa maarifa-sifuri. Uthibitisho huu hutumwa kwa mhakiki, ambaye huangalia kwamba mthibitishaji anajua taarifa ya siri akitumia algoriti nyingine.

Uthibitishaji usio mwingiliano hupunguza mawasiliano kati ya mthibitishaji na mhakiki, na kufanya uthibitisho wa ZK kuwa na ufanisi zaidi. Zaidi ya hayo, pindi uthibitisho unapozalishwa, unapatikana kwa mtu mwingine yeyote (aliye na ufikiaji wa ufunguo wa pamoja na algoriti ya uhakiki) kuhakiki.

Uthibitisho usio mwingiliano uliwakilisha mafanikio makubwa kwa teknolojia ya sifuri-maarifa na kuchochea maendeleo ya mifumo ya kuthibitisha inayotumika leo. Tunajadili aina hizi za uthibitisho hapa chini:

### Aina za uthibitisho wa maarifa-sifuri {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK ni kifupi cha **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Itifaki ya ZK-SNARK ina sifa zifuatazo:

- **Sifuri-maarifa**: Mhakiki anaweza kuhalalisha uadilifu wa taarifa bila kujua chochote kingine kuhusu taarifa hiyo. Maarifa pekee ambayo mhakiki anayo kuhusu taarifa hiyo ni ikiwa ni ya kweli au si kweli.

- **Fupi**: Uthibitisho wa maarifa-sifuri ni mdogo kuliko Shahidi na unaweza kuhakikiwa haraka.

- **Usio mwingiliano**: Uthibitisho ni 'usio mwingiliano' kwa sababu mthibitishaji na mhakiki wanaingiliana mara moja tu, tofauti na uthibitisho mwingiliano unaohitaji duru nyingi za mawasiliano.

- **Hoja**: Uthibitisho unakidhi sharti la 'uthabiti', kwa hivyo kudanganya kuna uwezekano mdogo sana.

- **(Ya) Maarifa**: Uthibitisho wa maarifa-sifuri hauwezi kujengwa bila ufikiaji wa taarifa ya siri (Shahidi). Ni vigumu, ikiwa si haiwezekani, kwa mthibitishaji ambaye hana Shahidi kukokotoa uthibitisho halali wa maarifa-sifuri.

'Ufunguo wa pamoja' uliotajwa hapo awali unarejelea vigezo vya umma ambavyo mthibitishaji na mhakiki wanakubali kutumia katika kuzalisha na kuhakiki uthibitisho. Kuzalisha vigezo vya umma (vinavyojulikana kwa pamoja kama Common Reference String (CRS)) ni operesheni nyeti kwa sababu ya umuhimu wake katika usalama wa itifaki. Ikiwa Entropi (unasibu) inayotumika katika kuzalisha CRS itaingia mikononi mwa mthibitishaji asiye mwaminifu, wanaweza kukokotoa uthibitisho wa uongo.

[Ukokotoaji wa pande nyingi (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ni njia ya kupunguza hatari katika kuzalisha vigezo vya umma. Pande nyingi hushiriki katika [sherehe ya usanidi unaoaminika](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), ambapo kila mtu huchangia baadhi ya thamani za nasibu ili kuzalisha CRS. Mradi tu upande mmoja mwaminifu unaharibu sehemu yao ya Entropi, itifaki ya ZK-SNARK inahifadhi uthabiti wa ukokotoaji.

Misanidi inayoaminika inahitaji watumiaji kuwaamini washiriki katika uzalishaji wa vigezo. Hata hivyo, maendeleo ya ZK-STARKs yamewezesha itifaki za kuthibitisha zinazofanya kazi na usanidi usioaminika.

#### ZK-STARKs {#zk-starks}

ZK-STARK ni kifupi cha **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARKs zinafanana na ZK-SNARKs, isipokuwa kwamba ni:

- **Zinazoweza kuongezwa uwezo**: ZK-STARK ina kasi zaidi kuliko ZK-SNARK katika kuzalisha na kuhakiki uthibitisho wakati ukubwa wa Shahidi ni mkubwa zaidi. Kwa uthibitisho wa STARK, muda wa mthibitishaji na uhakiki huongezeka kidogo tu kadiri Shahidi anavyokua (muda wa mthibitishaji na mhakiki wa SNARK huongezeka kwa mstari na ukubwa wa Shahidi).

- **Wazi**: ZK-STARK inategemea unasibu unaoweza kuhakikiwa hadharani ili kuzalisha vigezo vya umma kwa ajili ya kuthibitisha na kuhakiki badala ya usanidi unaoaminika. Hivyo, ni wazi zaidi ikilinganishwa na ZK-SNARKs.

ZK-STARKs huzalisha uthibitisho mkubwa zaidi kuliko ZK-SNARKs ikimaanisha kwa ujumla zina gharama kubwa zaidi za uhakiki. Hata hivyo, kuna matukio (kama vile kuthibitisha seti kubwa za data) ambapo ZK-STARKs zinaweza kuwa na gharama nafuu zaidi kuliko ZK-SNARKs.

## Hasara za kutumia uthibitisho wa maarifa-sifuri {#drawbacks-of-using-zero-knowledge-proofs}

### Gharama za maunzi {#hardware-costs}

Kuzalisha uthibitisho wa maarifa-sifuri kunahusisha hesabu ngumu sana ambazo hufanywa vyema kwenye mashine maalum. Kwa kuwa mashine hizi ni ghali, mara nyingi ziko nje ya uwezo wa watu wa kawaida. Zaidi ya hayo, programu zinazotaka kutumia teknolojia ya sifuri-maarifa lazima zizingatie gharama za maunzi—ambazo zinaweza kuongeza gharama kwa watumiaji wa mwisho.

### Gharama za uhakiki wa uthibitisho {#proof-verification-costs}

Kuhakiki uthibitisho pia kunahitaji ukokotoaji mgumu na huongeza gharama za kutekeleza teknolojia ya sifuri-maarifa katika programu. Gharama hii inafaa hasa katika muktadha wa kuthibitisha ukokotoaji. Kwa mfano, mikusanyiko ya ZK hulipa ~ gesi 500,000 ili kuhakiki uthibitisho mmoja wa ZK-SNARK kwenye Ethereum, huku ZK-STARKs zikihitaji ada kubwa zaidi.

### Dhana za uaminifu {#trust-assumptions}

Katika ZK-SNARK, Common Reference String (vigezo vya umma) inazalishwa mara moja na inapatikana kwa matumizi tena kwa pande zinazotaka kushiriki katika itifaki ya sifuri-maarifa. Vigezo vya umma vinaundwa kupitia sherehe ya usanidi unaoaminika, ambapo washiriki wanadhaniwa kuwa waaminifu.

Lakini kwa kweli hakuna njia kwa watumiaji kutathmini uaminifu wa washiriki na watumiaji wanapaswa kuamini maneno ya watengenezaji. ZK-STARKs hazina dhana za uaminifu kwa kuwa unasibu unaotumika katika kuzalisha mfuatano unaweza kuhakikiwa hadharani. Wakati huo huo, watafiti wanafanyia kazi misanidi isiyoaminika kwa ZK-SNARKs ili kuongeza usalama wa taratibu za kuthibitisha.

### Vitisho vya ukokotoaji wa kwanta {#quantum-computing-threats}

ZK-SNARK hutumia kriptografia ya tao la duaradufu kwa usimbaji fiche. Ingawa tatizo la logariti tofauti la tao la duaradufu linadhaniwa kuwa gumu kutatuliwa kwa sasa, maendeleo ya kompyuta za kwanta yanaweza kuvunja muundo huu wa usalama katika siku zijazo.

ZK-STARK inachukuliwa kuwa na kinga dhidi ya tishio la ukokotoaji wa kwanta, kwani inategemea tu vitendaji vya heshi vinavyostahimili mgongano kwa usalama wake. Tofauti na uoanishaji wa ufunguo wa umma na ufunguo wa siri unaotumika katika kriptografia ya tao la duaradufu, uheshiji unaostahimili mgongano ni mgumu zaidi kwa algoriti za ukokotoaji wa kwanta kuvunja.

## Usomaji zaidi {#further-reading}

- [Muhtasari wa matumizi ya uthibitisho wa maarifa-sifuri](https://pse.dev/projects) — _Timu ya Uchunguzi wa Faragha na Kuongeza Uwezo_
- [SNARKs dhidi ya STARKS dhidi ya SNARKs Zinazojirudia](https://www.alchemy.com/overviews/snarks-vs-starks) — _Muhtasari wa Alchemy_
- [Uthibitisho wa Maarifa-Sifuri: Kuboresha Faragha kwenye Mnyororo wa Vitalu](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Mfano Halisi wa Maarifa-Sifuri na Uchunguzi wa Kina](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Unda Uaminifu Unaoweza Kuhakikiwa, hata dhidi ya Kompyuta za Kwanta](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Utangulizi wa makadirio wa jinsi zk-SNARKs zinavyowezekana](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Kwa nini Uthibitisho wa Maarifa-Sifuri (ZKPs) ni Mabadiliko Makubwa kwa Utambulisho wa Kujitawala](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [EIP-7503 Imefafanuliwa: Kuwezesha Uhamishaji wa Faragha Kwenye Ethereum Kwa Uthibitisho wa ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Mchezo wa Kadi wa ZK: mchezo wa kujifunza misingi ya ZK na matumizi ya maisha halisi](https://github.com/ZK-card/zk-cards) - _Kadi za ZK_
