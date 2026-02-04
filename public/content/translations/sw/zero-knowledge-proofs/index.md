---
title: Ushahidi usio na utambuzi
description: Utangulizi usio wa kiufundi kwa uthibitisho wa maarifa ya sifuri kwa Kompyuta.
lang: sw
---

# Je! Uthibitisho wa maarifa ya sifuri ni nini? {#what-are-zk-proofs}

Uthibitisho wa maarifa sifuri ni njia ya kudhibitish uhalali wa taarifa bila kufunua taarifa yenyewe. 'Prover' ni chama kinachojaribu kudhibitisha madai, wakati 'sifa' inawajibika kwa kudhibitisha madai.

Uthibitisho wa maarifa-sifuri ulionekana kwa mara ya kwanza katika karatasi ya 1985, “[Utata wa maarifa wa mifumo ya uthibitisho inayoingiliana](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)” ambayo inatoa ufafanuzi wa uthibitisho wa maarifa-sifuri unaotumika sana leo:

> Itifaki ya maarifa-sifuri ni mbinu ambayo kwayo upande mmoja (mthibitishaji) **unaweza kuthibitisha** kwa upande mwingine (mhakiki) **kwamba kitu ni kweli, bila kufichua taarifa yoyote** isipokuwa ukweli kwamba taarifa hii mahususi ni ya kweli.

Uthibitisho wa Ero-Ujuzi umeboreka zaidi ya miaka na sasa zinatumika katika programu kadhaa za ulimwengu wa kweli.

<YouTube id="fOGdb1CTu5c" />

## Kwa nini tunahitaji uthibitisho wa maarifa ya sifuri? {#why-zero-knowledge-proofs-are-important}

Uthibitisho wa maarifa ya Zero uliwakilisha mafanikio katika maandishi ya maandishi, kwani waliahidi kuboresha usalama wa habari kwa watu binafsi. Fikiria jinsi unavyoweza kudhibitisha madai (k.v., "Mimi ni raia wa X Nchi") kwa chama kingine (k.v. mtoaji wa huduma). Unahitaji kutoa "ushahidi" ili kuunga mkono madai yako, kama pasipoti ya kitaifa au leseni ya dereva.

Lakini kuna shida na njia hii, haswa ukosefu wa faragha. Habari inayotambulika ya kibinafsi (PII) iliyoshirikiwa na huduma za mtu wa tatu huhifadhiwa katika hifadhidata kuu, ambazo ziko katika hatari ya hacks. Kwa wizi wa kitambulisho kuwa suala muhimu, kuna wito wa njia zaidi za kulinda faragha za kushiriki habari nyeti.

Uthibitisho wa maarifa-sifuri hutatua tatizo hili kwa **kuondoa hitaji la kufichua taarifa ili kuthibitisha uhalali wa madai**. Itifaki ya maarifa ya sifuri hutumia taarifa hiyo (inayoitwa 'shahidi') kama pembejeo ili kutoa uthibitisho dhahiri wa uhalali wake. Uthibitisho huu hutoa dhamana kubwa kwamba taarifa ni kweli bila kufunua habari inayotumiwa katika kuijenga.

Kurudi kwenye mfano wetu wa mapema, ushahidi pekee unahitaji kudhibitisha madai yako ya uraia ni dhibitisho la maarifa. Mthibitishaji lazima aangalie tu ikiwa mali fulani ya dhibitisho inashikilia kuwa kweli kuwa na hakika kuwa taarifa ya msingi inashikilia pia.

## Matukio ya matumizi ya uthibitisho wa maarifa-sifuri {#use-cases-for-zero-knowledge-proofs}

### Malipo yasiyojulikana {#anonymous-payments}

Malipo ya kadi ya mkopo mara nyingi huonekana kwa vyama vingi, pamoja na mtoaji wa malipo, benki, na vyama vingine vinavyovutiwa (k.v., viongozi wa serikali). Wakati uchunguzi wa kifedha una faida za kutambua shughuli haramu, pia inadhoofisha faragha ya raia wa kawaida.

Cryptocurrencyzilikusudiwa kutoa njia kwa watumiaji kufanya shughuli za kibinafsi, za rika. Lakini shughuli nyingi za cryptocurrency zinaonekana wazi kwenye blockchains za umma. Vitambulisho vya watumiaji mara nyingi huwa na majina bandia na ama huunganishwa kwa makusudi na vitambulisho vya ulimwengu halisi (k.m., kwa kujumuisha anwani za ETH kwenye wasifu wa Twitter au GitHub) au vinaweza kuhusishwa na vitambulisho vya ulimwengu halisi kwa kutumia uchanganuzi wa data wa msingi wa kwenye na nje ya mnyororo.

Kuna “sarafu za faragha” maalum zilizoundwa kwa ajili ya miamala isiyojulikana kabisa. Minyororo inayolenga faragha, kama vile Zcash na Monero, hulinda maelezo ya muamala, ikijumuisha anwani za mtumaji/mpokezi, aina ya mali, kiasi na ratiba ya shughuli za ununuzi.

Kwa kuingiza teknolojia ya maarifa-sifuri kwenye itifaki, mitandao ya [mnyororo wa bloku](/glossary/#blockchain) inayolenga faragha inaruhusu [nodi](/glossary/#node) kuhalalisha miamala bila kuhitaji kufikia data ya miamala. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) ni mfano wa muundo uliopendekezwa ambao utawezesha uhamishaji wa thamani wa asili wa faragha kwenye mnyororo wa bloku wa Ethereum. Mapendekezo kama hayo, hata hivyo, ni magumu kutekeleza kutokana na mchanganyiko wa masuala ya usalama, udhibiti na UX.

**Uthibitisho wa maarifa-sifuri pia unatumika kufanya miamala isijulikane kwenye minyororo ya bloku ya umma**. Mfano ni Tornado Cash, huduma iliyogatuliwa, isiyo ya dhamana inayowaruhusu watumiaji kufanya miamala ya faragha kwenye Ethereum. Tornado Cash hutumia uthibitisho wa maarifa-sifuri kuficha maelezo ya miamala na kuhakikisha faragha ya kifedha. Kwa bahati mbaya, kwa sababu hizi ni zana za faragha za "kujijumuisha" zinahusishwa na shughuli haramu. Ili kukabiliana na hili, faragha hatimaye inapaswa kuwa chaguo-msingi kwenye minyororo ya bloku ya umma. Jifunze zaidi kuhusu [faragha kwenye Ethereum](/privacy/).

### Ulinzi wa utambulisho {#identity-protection}

Mifumo ya sasa ya usimamizi wa utambulisho huweka taarifa za kibinafsi hatarini. Uthibitisho wa maarifa-sifuri unaweza kusaidia watu binafsi kuhalalisha utambulisho huku wakilinda maelezo nyeti.

Uthibitisho wa maarifa-sifuri ni muhimu hasa katika muktadha wa [utambulisho uliogatuliwa](/decentralized-identity/). Utambulisho uliogatuliwa (pia unaofafanuliwa kama 'utambulisho wa kujitawala') humpa mtu binafsi uwezo wa kudhibiti ufikiaji wa vitambulisho vya kibinafsi. Kuthibitisha uraia wako bila kufichua kitambulisho chako cha kodi au maelezo ya pasipoti ni mfano mzuri wa jinsi teknolojia isiyo na maarifa huwezesha utambulisho uliotawanywa.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + Utambulisho katika utekelezaji: Kitambulisho cha Kitaifa cha Kidijitali cha Bhutan (NDI) kwenye Ethereum
    </AlertTitle>
    <AlertDescription>
      <p>
        Mfano halisi wa kutumia ZKP kwa mifumo ya usimamizi wa utambulisho ni mfumo wa Kitambulisho cha Kitaifa cha Kidijitali (NDI) cha Ufalme wa Bhutan, uliojengwa kwenye Ethereum. NDI ya Bhutan hutumia ZKP kuruhusu raia kuthibitisha kwa njia ya kisimbaji ukweli kujihusu, kama vile "Mimi ni raia" au "Nina zaidi ya miaka 18," bila kufichua data nyeti ya kibinafsi kwenye kitambulisho chao.
      </p>
      <p>
        Jifunze zaidi kuhusu NDI ya Bhutan katika <a href="/decentralized-identity/#national-and-government-id">utafiti kifani wa Utambulisho Uliogatuliwa</a>.
      </p>
    </AlertDescription>
  </AlertContent>
</Alert>

### Uthibitisho wa Ubinadamu {#proof-of-humanity}

Moja ya mifano inayotumika sana ya uthibitisho wa maarifa-sifuri leo ni [itifaki ya World ID](https://world.org/blog/world/world-id-faqs), ambayo inaweza kufikiriwa kama "pasipoti ya kidijitali ya kimataifa kwa enzi ya AI." Inawaruhusu watu kuthibitisha kuwa wao ni watu wa kipekee bila kufichua taarifa za kibinafsi. Hili linafikiwa kupitia kifaa kiitwacho Orb, ambacho huchanganua mboni ya jicho la mtu na kutoa msimbo wa mboni. Msimbo wa mboni hukaguliwa na kuthibitishwa ili kuthibitisha kuwa mtu huyo ni binadamu wa kipekee kibayolojia. Baada ya uthibitishaji, ahadi ya utambulisho inayotolewa kwenye kifaa cha mtumiaji (na haijaunganishwa au inayotokana na data ya kibayometriki) huongezwa kwenye orodha salama kwenye kiambajengo. Kisha, wakati wowote mtumiaji anapotaka kuthibitisha kuwa yeye ni binadamu aliyethibitishwa - ama kuingia, kupiga kura au kuchukua hatua nyingine - anaweza kutoa uthibitisho wa kutojua maarifa ambao unathibitisha uanachama wao katika orodha. Uzuri wa kutumia uthibitisho wa maarifa-sifuri ni kwamba ni kauli moja tu inayofichuliwa: mtu huyu ni wa kipekee. Kila kitu kingine kinabaki kuwa siri.

World ID inategemea [itifaki ya Semaphore](https://docs.semaphore.pse.dev/) iliyotengenezwa na [timu ya PSE](https://pse.dev/) katika Msingi wa Ethereum. Semaphore imeundwa kuwa njia nyepesi lakini yenye nguvu ya kuzalisha na kuthibitisha uthibitisho wa maarifa-sifuri. Inawaruhusu watumiaji kuthibitisha wao ni sehemu ya kundi (katika hali hii, wanadamu waliothibitishwa) bila kuonyesha ni mwanachama gani wa kundi hilo. Semaphore pia inaweza kunyumbulika sana, ikiruhusu vikundi kuundwa kulingana na anuwai ya vigezo kama vile uthibitishaji wa utambulisho, kushiriki katika matukio, au umiliki wa vitambulisho.

### Uthibitishaji {#authentication}

Kutumia huduma za mtandaoni kunahitaji kuthibitisha utambulisho wako na haki ya kufikia mifumo hiyo. Hii mara nyingi inahitaji kutoa taarifa za kibinafsi, kama vile majina, anwani za barua pepe, tarehe za kuzaliwa, na kadhalika. Unaweza pia kuhitaji kukariri nywila ndefu au kuhatarisha kupoteza ufikiaji.

Uthibitisho wa maarifa-sifuri, hata hivyo, unaweza kurahisisha uthibitishaji kwa mifumo na watumiaji. Pindi tu uthibitisho wa ZK unapotolewa kwa kutumia pembejeo za umma (kwa mfano, data inayothibitisha uanachama wa mtumiaji wa jukwaa) na pembejeo za kibinafsi (k.m., maelezo ya mtumiaji), mtumiaji anaweza kuiwasilisha kwa urahisi ili kuthibitisha utambulisho wao wakati wanahitaji kufikia huduma. Hii inaboresha uzoefu kwa watumiaji na huondoa mashirika kutoka kwa hitaji la kuhifadhi kiasi kikubwa cha taarifa za watumiaji.

### Hesabu inayoweza kuthibitishwa {#verifiable-computation}

Hesabu inayoweza kuthibitishwa ni matumizi mengine ya teknolojia ya maarifa-sifuri kwa kuboresha miundo ya mnyororo wa bloku. Hesabu inayoweza kuthibitishwa inaturuhusu kukabidhi hesabu kwa chombo kingine huku tukidumisha matokeo yanayoweza kuthibitishwa. Chombo hicho huwasilisha matokeo pamoja na uthibitisho unaohakiki kuwa programu ilitekelezwa ipasavyo.

Hesabu inayoweza kuthibitishwa ni **muhimu sana katika kuboresha kasi ya uchakataji kwenye minyororo ya bloku** bila kupunguza usalama. Kuelewa hili kunahitaji kujua tofauti katika suluhu zilizopendekezwa za upanuzi wa Ethereum.

[Suluhu za upanuzi wa kwenye mnyororo](/developers/docs/scaling/#onchain-scaling), kama vile ugawanyaji, zinahitaji marekebisho makubwa ya safu ya msingi ya mnyororo wa bloku. Hata hivyo, mbinu hii ni tata sana na makosa katika utekelezaji yanaweza kudhoofisha mfumo wa usalama wa Ethereum.

[Suluhu za upanuzi wa nje ya mnyororo](/developers/docs/scaling/#offchain-scaling) hazihitaji kuunda upya itifaki ya msingi ya Ethereum. Badala yake, zinategemea mtindo wa hesabu uliokabidhiwa ili kuboresha upitishaji kwenye safu ya msingi ya Ethereum.

Hivi ndivyo inavyofanya kazi kwa vitendo:

- Badala ya kuchakata kila muamala, Ethereum inakabidhi utekelezaji kwa mnyororo tofauti.

- Baada ya kuchakata miamala, mnyororo mwingine unarudisha matokeo ili yatumike kwenye hali ya Ethereum.

Faida hapa ni kwamba Ethereum haihitaji kufanya utekelezaji wowote na inahitaji tu kutumia matokeo kutoka kwa hesabu iliyokabidhiwa kwenye hali yake. Hii inapunguza msongamano wa mtandao na pia inaboresha kasi ya miamala (itifaki za nje ya mnyororo huboresha utekelezaji wa haraka).

Mnyororo unahitaji njia ya kuhalalisha miamala ya nje ya mnyororo bila kuitekeleza tena, la sivyo thamani ya utekelezaji wa nje ya mnyororo itapotea.

Hapa ndipo hesabu inayoweza kuthibitishwa inapoingia. Wakati nodi inapotekeleza muamala nje ya Ethereum, inawasilisha uthibitisho wa maarifa-sifuri ili kuthibitisha usahihi wa utekelezaji wa nje ya mnyororo. Uthibitisho huu (unaoitwa [uthibitisho wa uhalali](/glossary/#validity-proof)) unahakikisha kuwa muamala ni halali, na kuruhusu Ethereum kutumia matokeo kwenye hali yake—bila kungoja mtu yeyote kuupinga.

[Zero-knowledge rollups](/developers/docs/scaling/zk-rollups) na [validiums](/developers/docs/scaling/validium/) ni suluhu mbili za upanuzi za nje ya mnyororo zinazotumia uthibitisho wa uhalali ili kutoa upanuzi salama. Itifaki hizi hutekeleza maelfu ya miamala nje ya mnyororo na kuwasilisha uthibitisho kwa ajili ya uhakiki kwenye Ethereum. Matokeo hayo yanaweza kutumika mara moja baada ya uthibitisho kuhakikiwa, na kuruhusu Ethereum kuchakata miamala zaidi bila kuongeza hesabu kwenye safu ya msingi.

### Kupunguza hongo na njama katika upigaji kura wa kwenye mnyororo {#secure-blockchain-voting}

Miradi ya upigaji kura ya kiambajengo ina sifa nyingi zinazofaa: inaweza kukaguliwa kikamilifu, ni salama dhidi ya mashambulizi, ni sugu kwa udhibiti, na haina vikwazo vya kijiografia. Lakini hata mifumo ya upigaji kura ya kwenye mnyororo haiko salama kutokana na tatizo la **njama**.

Inafafanuliwa kama "kuratibu kuzuia ushindani wa wazi kwa kuwahadaa, kuwahadaa na kuwapotosha wengine," kula njama kunaweza kuchukua sura ya mwigizaji hasidi anayeshawishi upigaji kura kwa kutoa hongo. Kwa mfano, Alice anaweza kupokea hongo kutoka kwa Bob ili kupigia kura `chaguo B` kwenye kura hata kama anapendelea `chaguo A`.

Hongo na kula njama huzuia ufanisi wa mchakato wowote unaotumia upigaji kura kama njia ya kuashiria (hasa ambapo watumiaji wanaweza kuthibitisha jinsi walivyopiga kura). Hii inaweza kuwa na madhara makubwa, hasa pale ambapo kura zinahusika na ugawaji wa rasilimali adimu.

Kwa mfano, [mifumo ya ufadhili wa kipeo](https://www.radicalxchange.org/wiki/plural-funding/) inategemea michango ili kupima upendeleo kwa chaguzi fulani miongoni mwa miradi tofauti ya bidhaa za umma. Kila mchango huhesabiwa kama "kura" kwa mradi maalum, huku miradi inayopokea kura nyingi ikipata fedha zaidi kutoka kwa hazina ya ulinganifu.

Kutumia upigaji kura kwa njia ya mtandao hufanya ufadhili wa mara nne kuhusika katika kula njama: miamala ya kiambajengo ni ya umma, kwa hivyo watoa rushwa wanaweza kukagua shughuli ya minyororo ya hongo ili kuona jinsi "walivyopiga kura. Kwa njia hii ufadhili wa mara nne hukoma kuwa njia bora ya kutenga fedha kulingana na matakwa yaliyojumlishwa ya jumuiya.

Kwa bahati nzuri, suluhu mpya zaidi kama vile MACI (Minimum Anti-Collusion Infrastructure) zinatumia uthibitisho wa maarifa-sifuri kufanya upigaji kura wa kwenye mnyororo (k.m., mifumo ya ufadhili wa kipeo) kuwa sugu kwa hongo na njama. MACI ni seti ya mikataba-erevu na hati zinazomruhusu msimamizi mkuu (anayeitwa "mratibu") kujumlisha kura na kuhesabu matokeo _bila_ kufichua maelezo mahususi kuhusu jinsi kila mtu alivyopiga kura. Hata hivyo, bado inawezekana kuthibitisha kwamba kura zilihesabiwa ipasavyo, au kuthibitisha kwamba mtu fulani alishiriki katika duru ya upigaji kura.

#### Je, MACI inafanyaje kazi na uthibitisho wa maarifa-sifuri? {#how-maci-works-with-zk-proofs}

Mwanzoni, mratibu anatumia mkataba wa MACI kwenye Ethereum, baada ya hapo watumiaji wanaweza kujiandikisha kupiga kura (kwa kusajili ufunguo wao wa umma katika mkataba mahiri). Watumiaji hupiga kura kwa kutuma ujumbe uliosimbwa kwa njia fiche kwa ufunguo wao wa umma kwa mkataba mahiri (kura halali lazima isainiwe kwa ufunguo wa hivi sasa wa umma unaohusishwa na utambulisho wa mtumiaji, miongoni mwa vigezo vingine). Baadaye, mratibu huchakata jumbe zote mara tu kipindi cha upigaji kura kinapoisha, huhesabu kura, na kuthibitisha matokeo kwenye mnyororo.

Katika MACI, uthibitisho wa maarifa-sifuri hutumiwa kuhakikisha usahihi wa hesabu kwa kufanya isiwezekane kwa mratibu kuchakata kura na kuhesabu matokeo isivyo sahihi. Hili linafikiwa kwa kumtaka mratibu atengeneze uthibitisho wa ZK-SNARK unaohakiki kwamba a) jumbe zote zilichakatwa ipasavyo b) matokeo ya mwisho yanalingana na jumla ya kura zote _halali_.

Kwa hivyo, hata bila kushiriki uchanganuzi wa kura kwa kila mtumiaji (kama ilivyo kawaida), MACI inahakikisha uadilifu wa matokeo yanayokokotolewa wakati wa mchakato wa kujumlisha. Kipengele hiki ni muhimu katika kupunguza ufanisi wa mifumo ya msingi ya njama. Tunaweza kuchunguza uwezekano huu kwa kutumia mfano uliopita wa Bob kumhonga Alice ili apigie kura chaguo fulani:

- Alice anajiandikisha kupiga kura kwa kutuma ufunguo wake wa umma kwa mkataba-erevu.
- Alice anakubali kupigia kura `chaguo B` badala ya hongo kutoka kwa Bob.
- Alice anapigia kura `chaguo B`.
- Alice anatuma kwa siri muamala uliosimbwa kwa njia fiche ili kubadilisha ufunguo wa umma unaohusishwa na utambulisho wake.
- Alice anatuma ujumbe mwingine (uliosimbwa kwa njia fiche) kwa mkataba-erevu akipigia kura `chaguo A` kwa kutumia ufunguo mpya wa umma.
- Alice anamuonyesha Bob muamala unaoonyesha alipigia kura `chaguo B` (ambao si halali kwani ufunguo wa umma hauhusiani tena na utambulisho wa Alice kwenye mfumo)
- Wakati wa kuchakata jumbe, mratibu anaruka kura ya Alice ya `chaguo B` na kuhesabu tu kura ya `chaguo A`. Kwa hivyo, jaribio la Bob la kula njama na Alice na kuendesha kura ya kwenye mnyororo linashindwa.

Kutumia MACI _kunahitaji_ kumwamini mratibu kwamba hatashirikiana na wahongaji au kujaribu kuwahonga wapiga kura wenyewe. Mratibu anaweza kusimbua jumbe za watumiaji (muhimu kwa kuunda uthibitisho), hivyo wanaweza kuthibitisha kwa usahihi jinsi kila mtu alivyopiga kura.

Lakini katika hali ambapo mratibu anabaki mkweli, MACI inawakilisha zana yenye nguvu ya kuhakikisha utakatifu wa upigaji kura wa kwenye mnyororo. Hii inaelezea umaarufu wake miongoni mwa matumizi ya ufadhili wa kipeo (k.m., [clr.fund](https://clr.fund/#/about/maci)) ambayo yanategemea sana uadilifu wa chaguzi za upigaji kura za kila mtu.

[Jifunze zaidi kuhusu MACI](https://maci.pse.dev/).

## Uthibitisho wa maarifa-sifuri hufanyaje kazi? {#how-do-zero-knowledge-proofs-work}

Uthibitisho wa maarifa-sifuri unakuruhusu kuthibitisha ukweli wa kauli bila kushiriki yaliyomo kwenye kauli hiyo au kufichua jinsi ulivyogundua ukweli. Ili kufanikisha hili, itifaki za maarifa-sifuri zinategemea kanuni zinazochukua data fulani kama ingizo na kurudisha 'kweli' au 'siyo kweli' kama tokeo.

Itifaki ya maarifa-sifuri lazima ikidhi vigezo vifuatavyo:

1. **Ukamilifu**: Ikiwa ingizo ni halali, itifaki ya maarifa-sifuri daima hurudisha 'kweli'. Kwa hivyo, ikiwa kauli ya msingi ni ya kweli, na mthibitishaji na mhakiki wanafanya kazi kwa uaminifu, uthibitisho unaweza kukubaliwa.

2. **Uthabiti**: Ikiwa ingizo si halali, kinadharia haiwezekani kuidanganya itifaki ya maarifa-sifuri irudishe 'kweli'. Kwa hivyo, methali ya uwongo haiwezi kuhadaa mthibitishaji mwaminifu kuamini kuwa taarifa batili ni halali (isipokuwa kwa ukingo mdogo wa uwezekano).

3. **Maarifa-sifuri**: Mhakiki hajifunzi chochote kuhusu kauli zaidi ya uhalali wake au uongo (wana “maarifa sifuri” ya kauli hiyo). Sharti hili pia linamzuia mhakiki kupata ingizo la asili (yaliyomo kwenye kauli) kutoka kwenye uthibitisho.

Katika muundo wa msingi, uthibitisho wa maarifa-sifuri unaundwa na vipengele vitatu: **shahidi**, **changamoto**, na **majibu**.

- **Shahidi**: Kwa uthibitisho wa maarifa-sifuri, mthibitishaji anataka kuthibitisha maarifa ya taarifa fulani iliyofichwa. Taarifa ya siri ndiyo “shahidi” wa uthibitisho, na maarifa yanayodhaniwa ya mthibitishaji kuhusu shahidi huanzisha seti ya maswali ambayo yanaweza kujibiwa tu na upande wenye maarifa ya taarifa hiyo. Kwa hivyo, mthibitishaji anaanza mchakato wa kuthibitisha kwa kuchagua swali bila mpangilio, kukokotoa jibu, na kulituma kwa mhakiki.

- **Changamoto**: Mhakiki anachagua swali lingine bila mpangilio kutoka kwenye seti na kumwomba mthibitishaji alijibu.

- **Majibu**: Mthibitishaji anakubali swali, anakokotoa jibu, na kulirudisha kwa mhakiki. Majibu ya mthibitishaji yanamruhusu mhakiki kuangalia kama mthibitishaji kweli ana ufikiaji wa shahidi. Ili kuhakikisha mthibitishaji habahatishi na kupata majibu sahihi kwa bahati, mhakiki anachagua maswali zaidi ya kuuliza. Kwa kurudia mwingiliano huu mara nyingi, uwezekano wa mthibitishaji kughushi maarifa ya shahidi hupungua sana hadi mhakiki atakaporidhika.

Hapo juu panaelezea muundo wa 'uthibitisho wa maarifa-sifuri unaoingiliana'. Itifaki za mwanzo za maarifa-sifuri zilitumia uthibitishaji unaoingiliana, ambapo kuhakiki uhalali wa kauli kulihitaji mawasiliano ya kwenda na kurudi kati ya wathibitishaji na wahakiki.

Mfano mzuri unaoonyesha jinsi uthibitisho unaoingiliana unavyofanya kazi ni hadithi maarufu ya Jean-Jacques Quisquater ya [pango la Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave). Katika hadithi, Peggy (mthibitishaji) anataka kumthibitishia Victor (mhakiki) kwamba anajua kifungu cha siri cha kufungua mlango wa uchawi bila kufichua kifungu hicho.

### Uthibitisho wa maarifa-sifuri usioingiliana {#non-interactive-zero-knowledge-proofs}

Ingawa ulikuwa wa kimapinduzi, uthibitishaji unaoingiliana ulikuwa na manufaa machache kwani ulihitaji pande zote mbili zipatikane na kuingiliana mara kwa mara. Hata kama mhakiki alishawishika na uaminifu wa mthibitishaji, uthibitisho haungepatikana kwa uhakiki huru (kukokotoa uthibitisho mpya kulihitaji seti mpya ya jumbe kati ya mthibitishaji na mhakiki).

Ili kutatua tatizo hili, Manuel Blum, Paul Feldman, na Silvio Micali walipendekeza [uthibitisho wa kwanza wa maarifa-sifuri usioingiliana](https://dl.acm.org/doi/10.1145/62212.62222) ambapo mthibitishaji na mhakiki wana ufunguo wa pamoja. Hii inamruhusu mthibitishaji kuonyesha maarifa yake ya taarifa fulani (yaani, shahidi) bila kutoa taarifa yenyewe.

Tofauti na uthibitisho unaoingiliana, uthibitisho usioingiliana ulihitaji duru moja tu ya mawasiliano kati ya washiriki (mthibitishaji na mhakiki). Mthibitishaji anapitisha taarifa ya siri kwa kanuni maalum ili kukokotoa uthibitisho wa maarifa-sifuri. Uthibitisho huu unatumwa kwa mhakiki, ambaye huangalia kuwa mthibitishaji anajua taarifa ya siri kwa kutumia kanuni nyingine.

Uthibitishaji usioingiliana unapunguza mawasiliano kati ya mthibitishaji na mhakiki, na kufanya uthibitisho wa ZK kuwa na ufanisi zaidi. Zaidi ya hayo, mara tu uthibitisho unapozalishwa, unapatikana kwa mtu mwingine yeyote (mwenye ufikiaji wa ufunguo wa pamoja na kanuni ya uhakiki) kuuhakiki.

Uthibitisho usioingiliana uliwakilisha mafanikio makubwa kwa teknolojia ya maarifa-sifuri na kuchochea maendeleo ya mifumo ya uthibitishaji inayotumika leo. Tunajadili aina hizi za uthibitisho hapa chini:

### Aina za uthibitisho wa maarifa-sifuri {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK ni kifupi cha **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Itifaki ya ZK-SNARK ina sifa zifuatazo:

- **Maarifa-sifuri**: Mhakiki anaweza kuhalalisha uadilifu wa kauli bila kujua chochote kingine kuhusu kauli hiyo. Maarifa pekee ambayo mhakiki anayo kuhusu kauli ni kama ni ya kweli au si ya kweli.

- **Fupi**: Uthibitisho wa maarifa-sifuri ni mdogo kuliko shahidi na unaweza kuhakikiwa haraka.

- **Isiyoingiliana**: Uthibitisho ni 'usioingiliana' kwa sababu mthibitishaji na mhakiki huingiliana mara moja tu, tofauti na uthibitisho unaoingiliana ambao unahitaji duru nyingi za mawasiliano.

- **Hoja**: Uthibitisho unakidhi sharti la 'uthabiti', kwa hivyo udanganyifu hauwezekani sana.

- **(Ya) Maarifa**: Uthibitisho wa maarifa-sifuri hauwezi kuundwa bila ufikiaji wa taarifa ya siri (shahidi). Ni vigumu, kama siyo haiwezekani, kwa mthibitishaji ambaye hana shahidi kukokotoa uthibitisho halali wa maarifa-sifuri.

'Ufunguo wa pamoja' uliotajwa hapo awali unarejelea vigezo vya umma ambavyo mthibitishaji na mhakiki wanakubali kutumia katika kuzalisha na kuhakiki uthibitisho. Kuzalisha vigezo vya umma (vinavyojulikana kwa pamoja kama Common Reference String (CRS)) ni operesheni nyeti kwa sababu ya umuhimu wake katika usalama wa itifaki. Ikiwa entropia (randomness) inayotumika katika kuzalisha CRS itaingia mikononi mwa mthibitishaji asiye mwaminifu, anaweza kukokotoa uthibitisho wa uongo.

[Hesabu ya pande nyingi (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ni njia ya kupunguza hatari katika kuzalisha vigezo vya umma. Pande nyingi hushiriki katika [sherehe ya usanidi inayoaminika](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), ambapo kila mtu anachangia baadhi ya thamani za nasibu ili kuzalisha CRS. Muda wote upande mmoja mwaminifu unapoharibu sehemu yake ya entropia, itifaki ya ZK-SNARK huhifadhi uthabiti wa kikokotoo.

Usanidi unaoaminika unahitaji watumiaji kuwaamini washiriki katika uzalishaji wa vigezo. Hata hivyo, maendeleo ya ZK-STARKs yamewezesha itifaki za uthibitishaji zinazofanya kazi na usanidi usioaminika.

#### ZK-STARKs {#zk-starks}

ZK-STARK ni kifupi cha **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARKs zinafanana na ZK-SNARKs, isipokuwa kwamba:

- **Inayoweza kupanuliwa**: ZK-STARK ni ya haraka kuliko ZK-SNARK katika kuzalisha na kuhakiki uthibitisho wakati ukubwa wa shahidi ni mkubwa. Kwa uthibitisho wa STARK, nyakati za mthibitishaji na uhakiki huongezeka kidogo tu kadri shahidi anavyokua (nyakati za mthibitishaji na mhakiki wa SNARK huongezeka sawia na ukubwa wa shahidi).

- **Uwazi**: ZK-STARK inategemea unakisi unaoweza kuthibitishwa na umma ili kuzalisha vigezo vya umma vya kuthibitisha na kuhakiki badala ya usanidi unaoaminika. Kwa hivyo, zina uwazi zaidi ikilinganishwa na ZK-SNARKs.

ZK-STARKs huzalisha uthibitisho mkubwa kuliko ZK-SNARKs kumaanisha kwa ujumla zina gharama kubwa zaidi za uhakiki. Hata hivyo, kuna hali (kama vile kuthibitisha seti kubwa za data) ambapo ZK-STARKs zinaweza kuwa na gharama nafuu zaidi kuliko ZK-SNARKs.

## Hasara za kutumia uthibitisho wa maarifa-sifuri {#drawbacks-of-using-zero-knowledge-proofs}

### Gharama za maunzi {#hardware-costs}

Kuzalisha uthibitisho wa maarifa-sifuri kunahusisha hesabu ngumu sana zinazofanywa vizuri zaidi kwenye mashine maalum. Kwa kuwa mashine hizi ni ghali, mara nyingi huwa haziwezi kufikiwa na watu wa kawaida. Kwa kuongeza, programu zinazotaka kutumia teknolojia ya maarifa-sifuri lazima zizingatie gharama za maunzi—ambazo zinaweza kuongeza gharama kwa watumiaji wa mwisho.

### Gharama za uhakiki wa uthibitisho {#proof-verification-costs}

Kuhakiki uthibitisho pia kunahitaji hesabu ngumu na huongeza gharama za kutekeleza teknolojia ya maarifa-sifuri katika programu. Gharama hii ni muhimu hasa katika muktadha wa kuthibitisha hesabu. Kwa mfano, ZK-rollups hulipa ~ 500,000 gesi ili kuhakiki uthibitisho mmoja wa ZK-SNARK kwenye Ethereum, huku ZK-STARKs zikihitaji ada za juu zaidi.

### Dhana za uaminifu {#trust-assumptions}

Katika ZK-SNARK, Neno la Marejeleo la Kawaida (vigezo vya umma) huzalishwa mara moja na linapatikana kwa matumizi tena kwa pande zinazotaka kushiriki katika itifaki ya maarifa-sifuri. Vigezo vya umma huundwa kupitia sherehe ya usanidi inayoaminika, ambapo washiriki wanadhaniwa kuwa waaminifu.

Lakini hakuna njia yoyote kwa watumiaji kutathmini uaminifu wa washiriki na watumiaji lazima wawaamini wasanidi programu kwa neno lao. ZK-STARKs hazina dhana za uaminifu kwani unakisi unaotumika katika kuzalisha neno unaweza kuthibitishwa na umma. Wakati huo huo, watafiti wanafanyia kazi usanidi usioaminika kwa ZK-SNARKs ili kuongeza usalama wa mifumo ya uthibitishaji.

### Vitisho vya kompyuta ya quantum {#quantum-computing-threats}

ZK-SNARK hutumia usimbaji fiche wa curve ya duaradufu kwa ajili ya usimbaji fiche. Ingawa tatizo la logariti kamili ya curve ya duaradufu linadhaniwa kuwa haliwezi kutatuliwa kwa sasa, maendeleo ya kompyuta za quantum yanaweza kuvunja mfumo huu wa usalama katika siku zijazo.

ZK-STARK inachukuliwa kuwa salama dhidi ya tishio la kompyuta za quantum, kwani inategemea tu vitendakazi vya hashi sugu kwa mgongano kwa usalama wake. Tofauti na uoanishaji wa funguo za umma-binafsi zinazotumiwa katika usimbaji fiche wa curve ya duaradufu, u-hashi sugu kwa mgongano ni mgumu zaidi kwa kanuni za kompyuta za quantum kuvunja.

## Masomo zaidi {#further-reading}

- [Muhtasari wa matukio ya matumizi ya uthibitisho wa maarifa-sifuri](https://pse.dev/projects) — _Timu ya Uchunguzi wa Faragha na Upanuzi_
- [SNARKs dhidi ya STARKS dhidi ya SNARKs Zinazojirudia](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Uthibitisho wa Maarifa-Sifuri: Kuboresha Faragha kwenye Mnyororo wa Bloku](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Mfano Halisi wa Maarifa-Sifuri na Uchambuzi wa Kina](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Unda Uaminifu Unaoweza Kuthibitishwa, hata dhidi ya Kompyuta za Quantum](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Utangulizi wa takriban wa jinsi zk-SNARKs zinavyowezekana](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Kwa nini Uthibitisho wa Maarifa Sifuri (ZKPs) ni Kigeuzi cha Mchezo kwa Utambulisho wa Kujitawala](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [EIP-7503 Imefafanuliwa: Kuwezesha Uhamisho wa Faragha kwenye Ethereum na Uthibitisho wa ZK](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Mchezo wa Kadi za ZK: mchezo wa kujifunza misingi ya ZK na matukio ya matumizi ya maisha halisi](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
