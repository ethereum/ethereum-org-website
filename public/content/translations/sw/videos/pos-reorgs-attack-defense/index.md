---
title: "Mchezo wa mipangilio upya katika Uthibitisho wa Dau (PoS) wa Ethereum"
description: "Caspar Schwarz-Schilling anawasilisha utafiti kuhusu mashambulizi ya mpangilio upya wa kitalu katika Uthibitisho wa Dau (PoS) wa Ethereum, akijumuisha njia za mashambulizi, mbinu za ulinzi, na hatua za kupunguza madhara katika kiwango cha itifaki zilizopo."
lang: sw
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "consensus"
  - "pos"
  - "security"
format: presentation
author: LisCon
breadcrumb: "Mipangilio upya ya PoS"
---

Wasilisho hili linachunguza aina za mipangilio upya ya kitalu inayowezekana katika Uthibitisho wa Dau (PoS) wa Ethereum na hatua za kupunguza madhara zilizoundwa kuzizuia. Caspar Schwarz-Schilling, mtafiti katika Kikundi cha Motisha Imara cha Taasisi ya Ethereum, anapitia taratibu za mipangilio upya ya ex-post na ex-ante, akilinganisha hali ya usalama kati ya Uthibitisho wa Kazi (PoW) na Uthibitisho wa Dau (PoS).

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=xcPxwhrg3Ao) iliyochapishwa na LisCon. Imehaririwa kidogo ili isomeke kwa urahisi.*

#### Utangulizi na usuli (0:03) {#introduction-and-background-003}

Karibuni. Leo nitazungumzia kuhusu mipangilio upya inayowezekana katika Uthibitisho wa Dau (PoS) wa Ethereum.

Hivi karibuni nilijiunga na Taasisi ya Ethereum, hasa Kikundi cha Motisha Imara. Kimsingi sisi ni timu ya utafiti inayoangazia chochote kinachohusu motisha. Nitafanya hili kuwa fupi — mazungumzo haya yamesheheni mambo mengi na unaweza kupata kazi zetu nyingi kwenye GitHub.

#### Aina mbili za mipangilio upya (0:44) {#two-types-of-reorgs-044}

Leo nataka kuzungumzia mipangilio upya, na hasa nataka kuelezea aina mbili tofauti za mipangilio upya zinazowezekana katika ulimwengu wa Uthibitisho wa Dau (PoS) wa Ethereum.

Kwa upande mmoja tuna **mipangilio upya ya ex-post** na kwa upande mwingine **mipangilio upya ya ex-ante**. Mnisamehe kwa majina haya ya Kilatini yanayoonekana ya kujidai kidogo, lakini yanafanya kazi iliyokusudiwa.

Mipangilio upya ya ex-post ni kile tunachofikiria kwa kawaida tunapozungumzia mipangilio upya. Mpinzani anaona kitalu — ikiwa kina thamani wanaweza kutaka kujaribu kukipangilia upya. Kwa hivyo kwenye mchoro hapa tunaona kwamba kitalu N+1 ni kitalu ambacho mshambuliaji anataka kukipangilia upya, na kwa kujenga kwenye kitalu mzazi kile kile N, ikiwa itafanya kazi, kitalu N+3 kisha kinajengwa kwenye kitalu N+2. Hiyo ni mambo kama kawaida.

Sasa mipangilio upya ya ex-ante ni tofauti kidogo. Wazo ni kwamba mshambuliaji anahitaji kuanza shambulio kabla hata ya kujua ni kitalu gani watakachokipangilia upya. Hili linafanyaje kazi kwa ufupi? Kwa kiwango cha juu sana, kitalu N+1 kinajengwa juu ya N lakini hakitolewi mara moja. Nodi waaminifu hata hawajui kwamba N+1 ipo na hivyo wataendelea kujenga kwenye N. Kisha kupitia utaratibu fulani N+1 inatolewa na N+3 inaweza kuona N+1 inaongoza na kujenga juu yake, kiasi kwamba N+2 inakuwa imepangiliwa upya.

Unaweza kujiuliza kwa nini hata ungetaka kufanya aina hii ya mpangilio upya. Kweli, bado kuna MEV ya kunaswa. Ikiwa una bahati, kitalu N+2 kina MEV nyingi — unaweza kuinasa kwa kunakili na kubandika chochote kile kitalu hicho kilivyo. Katika hali mbaya zaidi, kimsingi una miamala ya thamani ya sloti mbili ya kusikiliza.

#### Mipangilio upya ya ex-post katika Uthibitisho wa Kazi (PoW) (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Kabla ya kuzama kwenye mipangilio upya ya ex-ante, ambayo ndiyo mada kuu ya mazungumzo haya, wacha nirejee kwa ufupi mipangilio upya ya ex-post na hasa nianze na muktadha wa Uthibitisho wa Kazi (PoW).

Kimsingi ni muhtasari wa chapisho la blogu na washukiwa wa kawaida — Georgios na Vitalik. Nenda tu ukaisome, ni nzuri sana.

Kwa ufupi, katika Uthibitisho wa Kazi (PoW) wa Ethereum, mipangilio upya ya ex-post ni ngumu lakini haiwezekani. Mchimbaji wa 10% ana nafasi nzuri kiasi ya kuchimba baadhi ya vitalu mfululizo, na ikiwa motisha ni kubwa ya kutosha — fikiria kuna kitalu kimoja chenye thamani ya 100 ETH ya MEV ya kunasa — basi labda kiwango cha mafanikio cha asilimia moja kinaweza kutosha kufanya iwe na thamani ya kujaribu kupangilia upya.

#### Mipangilio upya ya ex-post katika Uthibitisho wa Dau (PoS) (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

Katika Uthibitisho wa Dau (PoS) ni mchezo tofauti kabisa. Tunazungumzia kiasi kikubwa sana cha dhamana kinachohitajika. Nitawapitisha jinsi mtu anavyoweza kufanya hivyo ili tu kusisitiza jinsi ilivyo ngumu kupita kiasi.

Labda mambo ya msingi kwanza. Muda katika Uthibitisho wa Dau (PoS) wa Ethereum unasonga katika sloti. Kila sloti ina urefu wa sekunde 12. Katika kila sloti kuna majukumu mawili: una mpendekezaji — mpendekezaji mmoja tu — na kamati ya maelfu ya wathibitishaji ambao wanapaswa kutoa uthibitisho kwa vitalu wanavyovisikia kwenye safu ya P2P. Wanaamua kichwa cha mnyororo kwa kuendesha chaguo la mchepuo, ambalo kimsingi ni utendakazi unaochukua mti wa kitalu kama ingizo na kukupa kichwa cha mnyororo.

Unapaswa kutoa uthibitisho kwa vitalu ikiwa unasikia kitalu halali, au sekunde nne ndani ya sloti — chochote kinachokuja kwanza. Kwa hivyo ikiwa kwa sababu fulani mpendekezaji wa kitalu N+1 hayuko mtandaoni na hakuna kitalu sekunde nne ndani ya sloti, unatoa uthibitisho kwa kitalu N. Ikiwa unakisikia kwa wakati, unatoa uthibitisho kwa kitalu N+1. Rahisi.

Uthibitisho huu wote unatoa uzito kwa vitalu, na uzito huu unatumiwa na chaguo la mchepuo kuamua kichwa cha hivi punde ni kipi.

Sasa hebu tupitie mpangilio upya wa kitalu kimoja. Mwanzoni, kila kitu ni kama kawaida — kila mtu anatoa uthibitisho kwa kitalu N, hata mshambuliaji. Kisha N+1 inajengwa juu ya N, na kwa sababu mshambuliaji hataki kutoa uzito kwa kitalu anachojaribu kukipangilia upya, badala yake anatoa uthibitisho kwa kitalu N. Kitalu N kinapata uzito mkubwa kwa sababu mshambuliaji ana theluthi mbili ya kamati — ambayo inamaanisha wanahitaji kudhibiti takriban theluthi mbili ya dhamana yote.

Theluthi moja ya watu waaminifu walitoa uthibitisho kwa N+1, theluthi mbili kwa N. Sasa inakuja kitalu N+2 — ni wazi mshambuliaji anakijenga kwenye N, na anatoa uthibitisho kwa kitalu chake mwenyewe. Kutoka kwa mtazamo wa wathibitishaji waaminifu, N+1 bado inaongoza kwa upande wa uzito kwa sababu N+1 na N+2 zinarithi uzito wote wa kitalu N, lakini N+1 pia ina hii theluthi moja ya uthibitisho ambayo N+2 inakosa.

Tukijumlisha hili — kitalu N+1 kina uthibitisho wa thamani ya theluthi moja jumlisha theluthi moja, ikitoa theluthi mbili, na kitalu N+2 pia kina theluthi mbili. Kwa urahisi hebu tuchukulie kwamba uamuzi wa sare unampendelea mshambuliaji. Kisha N+3 itaona N+2 kama inayoongoza na kujenga juu yake.

Ili kukupa wazo la jinsi mawazo haya yalivyo ya kushangaza — hata kama ungekuwa na mweka dhamana wa 65%, kudhibiti theluthi mbili ya kamati katika sloti yoyote ile una uwezekano wa 0.05%. Hili linaonyesha kwamba nguvu ya uthibitisho sambamba ni halisi — mipangilio upya ya ex-post ni ngumu sana, ikiwa haiwezekani kabisa, katika Uthibitisho wa Dau (PoS) wa Ethereum.

#### Taratibu za shambulio la mpangilio upya wa ex-ante (7:34) {#ex-ante-reorg-attack-mechanics-734}

Sasa nitazungumzia mipangilio upya ya ex-ante. Shambulio hili linatokana na karatasi ya Neuder na wengine. Hivi karibuni tumeboresha shambulio hili kwa kiasi kikubwa. Pia tuliandika karatasi kuihusu na kufanikiwa kuipakia kwenye arXiv kwa wakati muafaka.

Pia mapema — msiwe na wasiwasi, kuna hatua za kupunguza madhara. Zitaunganishwa kabla ya Unganisho.

Shambulio la mpangilio upya wa ex-ante linafanyaje kazi? Hapo awali, kitalu N — mambo kama kawaida, kila mtu anatoa uthibitisho kwake. Sasa wewe ni mpendekezaji wa N+1. Unakipendekeza na kutoa uthibitisho kwake kwa faragha na mthibitishaji mmoja. Muhimu zaidi, unakiweka faragha — hukitoi na hukisambazi kwenye safu ya P2P.

Kinachotokea ni kwamba watu waaminifu hawaoni kitalu N+1, kwa hivyo watatoa uthibitisho kwa kitalu N. Hiyo ndiyo mbinu — unarithi uzito huo na sio lazima upambane nao.

Hebu tuchukulie hakuna ucheleweshaji kwa sasa. Katika sloti N+2, kile tunachofanya kama mshambuliaji ni kutoa kitalu N+1 na uthibitisho wa faragha vyote kwa wakati mmoja. Wathibitishaji waaminifu katika sloti N+2 wanahitaji kutoa uthibitisho kwa kitalu. Kutoka kwa mtazamo wao wanaona kitalu N+2 na kitalu N+1 na uthibitisho huu mmoja wa faragha. Wakiendesha chaguo la mchepuo watagundua kwamba kitalu N+1 kina uzito zaidi kuliko kitalu N+2, kwa sababu N+1 ina uthibitisho wa faragha ambao N+2 haina. Hata wathibitishaji wote waaminifu watatoa uthibitisho kwa kitalu N+1. Katika N+3, kwa urahisi, N+1 itaonekana kama kichwa cha mnyororo.

#### Ucheleweshaji wa mtandao na shambulio (10:25) {#network-latency-and-the-attack-1025}

Nilichukulia hakuna ucheleweshaji, ambayo ni wazi sivyo inavyofanya kazi. Kuna ucheleweshaji — inachukua muda kusambaza vitalu na jumbe kwenye safu ya P2P.

Njia ambayo mshambuliaji bado anaweza kufanikisha aina hii ya shambulio ni kwa kuwa na nodi nyingi kwenye maeneo tofauti kwenye topolojia ya P2P. Wakati mpendekezaji mwaminifu katika sloti N+2 anapendekeza kitalu hicho, unakisikia mapema sana katika mchakato wa usambazaji. Kama matokeo, unaweza kutoa kitalu chako cha faragha kutoka kwa maeneo haya yote tofauti kiasi kwamba wengi watasikia kuhusu kitalu N+1 kabla hawajasikia kuhusu kitalu N+2 — ikimaanisha wanaona kwamba kitalu N+1 kinaongoza kwa uzito na watatoa uthibitisho kwake.

Kusisitiza tena kile kinachotokea hapa: tuna mpendekezaji na mthibitishaji mmoja anayefanikiwa kufanya mpangilio upya wa kitalu kimoja. Sio bora, kusema ukweli.

#### Mikakati ya kusawazisha kwa mipangilio upya mirefu zaidi (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Ikiwa unataka kufanya mambo ya kisasa zaidi, unaweza kufanikisha mipangilio upya mirefu zaidi ukitumia mkakati wa kusawazisha. Wazo ni kugawanya kamati ya waaminifu katika mitazamo tofauti ya mnyororo.

Unatoa kitalu chako cha faragha kwa njia ambayo takriban nusu ya nodi waaminifu wanasikia kuhusu kitalu chako cha faragha na uthibitisho kabla hawajasikia kuhusu kitalu N+2 — kwa hivyo wanatoa uthibitisho kwa kitalu chako. Nusu nyingine unataka wasisikie kitalu chako kabla hawajatoa uthibitisho kwa N+2.

Sasa una nusu ya kamati ya waaminifu inayotoa uthibitisho kwa N+1 na nusu nyingine inayotoa uthibitisho kwa N+2. Hilo linasaidiaje? Kamati ya waaminifu sasa inafutana yenyewe, na wewe kama mshambuliaji sio lazima hata upambane nao — ambayo kimsingi ni ndoto ya mshambuliaji kutimia.

Kupitia mchoro: kitalu N mambo kama kawaida, kitalu N+1 — hadithi ile ile, hukitoi. Wathibitishaji waaminifu wanatoa uthibitisho kwa kitalu N. Kitalu N+2 kinakuja, unakisikia mapema, na unatoa kitalu N+1 na uthibitisho mmoja — "kura ya ushawishi" — kwa njia ambayo nusu ya kamati ya waaminifu inaiona kabla na nusu baada. Nusu wanapiga kura kwa N+1, nusu nyingine kwa N+2. Kwa kweli unataka mgawanyiko wa kupishana kwa moja kiasi kwamba N+2 ina uthibitisho mmoja zaidi, kwa hivyo N+3 inajenga kwenye N+2 na kuendeleza mpangilio upya.

Ili kuhitimisha mpangilio upya wa vitalu viwili: kitalu N+3 kinapendekezwa, unakisikia mapema, unatoa kitalu N+1 na uthibitisho wako miwili iliyobaki, ukifurika safu ya P2P ili wengi wa watu waaminifu wapige kura kwa kitalu N+1 — kiasi kwamba kina uzito zaidi kuliko kitalu N+3 na N+4 inajengwa juu ya N+1.

Ukifikiria juu yake, ni rahisi kiasi kufanya mipangilio upya hii chini ya mawazo haya. Hata kama huna migawanyiko kamili, kwa sababu safu ya P2P ni kubwa sana una usambazaji wa uwezekano ambao unaweza kulenga kiasi kwamba gharama ya shambulio inakua katika kipeo cha pili cha ukubwa wa kamati.

#### Hatua ya kupunguza madhara ya nyongeza ya mpendekezaji (15:17) {#proposer-boost-mitigation-1517}

Hebu tuzungumzie hatua ya kupunguza madhara. Wazo la msingi ni nini? Tutampa mpendekezaji nguvu zaidi kidogo. Ikiwa kitalu halali kinafika kwa wakati, hebu tuongeze uzito wa kitalu hiki kwa muda wa sloti. Baada ya sloti hiyo kukamilika, tunaendelea na alama ya kawaida ya LMD-GHOST na mambo yanakuwa kama kawaida.

Kwa hivyo ikiwa kitalu N+2 kinapendekezwa kwa wakati na ni halali, kitalu hiki kitakuwa na nyongeza — tuseme 80% ya ukubwa wa kamati. Sasa uthibitisho huu mdogo mzuri wa N+1 kutoka kwa mshambuliaji hautafanya kazi. Haiwezekani.

Mambo ya kusawazisha pia hayafanyi kazi tena kwa sababu una mgawanyiko wa 50/50 lakini nyongeza kila wakati inaitupa upande mmoja. Hakuna njia unaweza kuweka mgawanyiko huo wa 50/50.

Wazo ni kwamba kukiwa na hatua hii ya kupunguza madhara, uthibitisho wa mpinzani unapaswa kushindana na nyongeza ili kuwashawishi wathibitishaji waaminifu kupiga kura kulingana na matakwa yao. Hili linavunja mikakati ya kusawazisha na kimsingi linazuia mipangilio upya yote kabisa. Habari njema — kuna PR wazi, kwa hivyo kimsingi itaunganishwa kabla ya Unganisho.

#### Mambo muhimu ya kuzingatia (16:48) {#key-takeaways-1648}

Baadhi ya mambo muhimu ya kuzingatia. Nimezungumzia tofauti kati ya mipangilio upya ya ex-post na ex-ante. Nilielezea kwa ufupi mazingira tofauti ya mipangilio upya katika Uthibitisho wa Kazi (PoW) dhidi ya Uthibitisho wa Dau (PoS). Niliwaonyesha jinsi ya kufanikisha mpangilio upya wa ex-ante lakini pia muhimu zaidi jinsi ya kuirekebisha.

Ikiwa una nia na hili, kuna karatasi — yenye maelezo zaidi, yenye ufafanuzi zaidi. Slaidi zitapakiwa. Njoo uzungumze nami ikiwa una nia, na pia unaweza kunipata kwenye Twitter.

Natumai hili lilikuwa la kuvutia kwenu. Asanteni sana.