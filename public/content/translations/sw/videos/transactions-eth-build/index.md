---
title: "Miamala — ETH.BUILD"
description: "Onyesho la jinsi miamala ya Ethereum inavyofanya kazi kwa kutumia zana ya kuelimisha ya ETH.BUILD. Tazama jinsi miamala inavyoundwa, kusainiwa, na kutumwa kwenye mtandao wa Ethereum."
lang: sw
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "miamala"
format: tutorial
author: Austin Griffith
breadcrumb: "Miamala (ETH.BUILD)"
---

Mafunzo na **Austin Griffith** yanayoonyesha jinsi miamala ya Ethereum inavyofanya kazi kwa kutumia zana ya programu inayoonekana ya ETH.BUILD — ikijumuisha muundo wa muamala, bei za gesi, kusaini, kutangaza, na kusanyiko la miamala.

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=er-0ihqFQB0) iliyochapishwa na Austin Griffith. Imehaririwa kidogo ili isomeke kwa urahisi.*

#### Ada za muamala na vivutio vya mchimbaji (0:00) {#transaction-fees-and-miner-incentives-000}

Kwenye ETH.BUILD leo tutazungumzia miamala. Hadi sasa, tuna miamala hii ikichimbwa kwenye vitalu, kufungashwa kwenye vitalu, na kuchimbwa kwenye mnyororo. Tunataka kuzungumzia kile kinachomvutia mchimbaji — mbali na tuzo ya bloku — kutoa muamala wetu kutoka kwenye kusanyiko la miamala na kuuweka kwenye kitalu na kuuchimba kwenye mnyororo, ikilinganishwa na watu wengine kwenye kusanyiko. Kunaweza kuwa na maelfu ya watu kwenye kusanyiko ambao wote wanashindana kwa zabuni, na zabuni hiyo ni kwa kutumia ada hii.

Ninaweza kuwa na ada kwenye muamala wangu inayosema "Mimi ni Alice na ninatuma tano kwa Bob, na nonsi yangu ni moja kwa ajili ya ulinzi dhidi ya kurudiwa." Pia, yeyote anayechimba hii anaweza kuchukua ada kwa ajili yake mwenyewe. Kimsingi, Alice anatuma tano kwa Bob lakini pia anamlipa mchimbaji senti tano ili kuiweka kwenye mnyororo.

#### Muundo wa muamala wa Ethereum (1:10) {#anatomy-of-an-ethereum-transaction-110}

Je, muamala unaonekanaje kwenye Ethereum? Hatutakuwa na "Bob" na "Alice" tena — tutakuwa na anwani. Thamani itakuwa katika Wei, si katika ETH. Na ada pia itakuwa katika Wei.

Hebu tuingie na tuangalie muamala huu. Nina akaunti iliyowekwa maneno ya siri (mnemonic), na nimeunganishwa kwenye Mtandao Mkuu wa Ethereum. Pia ninaendesha moduli ya kupata data ya bei kutoka CoinMarketCap, kwa hivyo ninaweza kuona kwamba nukta-moja-kitu ETH inatafsiriwa kuwa takriban dola ishirini na tatu.

#### Kuweka muamala (2:25) {#setting-up-the-transaction-225}

Kile nitakachofanya ni kuunda muamala na kumpa motisha mchimbaji kuuchukua na kuuunganisha mnyororoni. Nina wahusika wawili — Alice na Bob. Alice atatuma kwa kutumia ufunguo wa siri wake thamani fulani kwa Bob. Hakuna sehemu ya anwani ya "kutoka" hapa kwa sababu — kumbuka — tunasaini na kurejesha kwa kutumia jozi yetu ya ufunguo. Muamala unafungashwa, kusainiwa, na kisha kutumwa kwenye mtandao. Hakuna anayeweza kuuchezea, na upande wa pili mtu anaweza kuurejesha na kugundua kuwa kweli ni sisi tuliousaini. Anwani ya "kutoka" inapatikana kutokana na saini.

#### Mkakati wa bei ya gesi (4:20) {#gas-price-strategy-420}

Bei ya gesi imewekwa kuwa takriban Gwei 4.1 kwa chaguo-msingi — hiyo ni Wei bilioni 4.1. Lakini tunataka kuwa na mkakati zaidi kuhusu hilo na kuona kinachoendelea mnyororoni sasa hivi. Tunaweza kuona kwamba kitalu cha mwisho kilikuwa na miamala 78, na bei ya gesi ilianzia takriban 5 hadi kiwango cha chini fulani. Kimsingi, tungehitaji kuwa juu ya 5 ili kuchimbwa kwenye kitalu hicho. Kwa hivyo hebu tuweke bei ya gesi kuwa 5.001 — zaidi kidogo tu.

#### Kubadilisha kuwa Wei (5:20) {#converting-to-wei-520}

Tunahitaji kufanya ubadilishaji kuwa Wei. Kwenye Ethereum, unashughulika zaidi na viwango viwili: ETH, ambayo ndiyo watu huizungumzia kwa kawaida, na kisha Wei, ambayo ni kama sehemu ndogo sana ya ETH. Gwei — kile tunachotumia kwa bei za gesi — iko katikati. Sababu ya hii ni sawa na kwa nini hatutembei tukizungumza kwa sehemu za senti.

Alice ana ETH 0.18, na tutatuma ETH 0.05 kwa Bob. Tunaweka bei ya gesi ya Gwei 5.

#### Kusaini na kutangaza (7:02) {#signing-and-broadcasting-702}

Wakati Alice anachagua kusaini muamala, unatoka kama muamala uliosainiwa ambao unaweza kwenda kwenye mtandao. Hakuna anayeweza kuuchezea — upande wa pili, mtu anaweza kugundua kuwa ni Alice aliyeusaini, na una taarifa zote kuhusu nani tunataka kumtumia na gesi inayoenda kwa mchimbaji.

Tunachukua muamala huo uliosainiwa na kuuweka kwenye kitendakazi cha kutuma cha moduli ya mnyororo wa vitalu. Ninapobofya tuma, inatupa heshi — heshi ya muamala. Kimsingi, niliutuma kwenye mtandao uliosambazwa na wakanirudishia heshi ya muamala. Unatoka kwenye mtandao, na kisha kuna kusanyiko hili la miamala — watu wote wakishindana kwa zabuni ili muamala wao upite.

#### Kuangalia kitalu (8:41) {#checking-the-block-841}

Tunaweza kuuliza mnyororo wa vitalu kuhusu muamala wetu. Hakika, tayari umechimbwa. Tunaweza kuangalia kitalu, kupanga kwa bei ya gesi, na kujipata. Kuna muamala wetu kwa bei ya gesi 5.001 — Alice akituma kwa Bob, bila data ya ziada. Tuko hapo, takriban nafasi nne au tano kutoka chini.

#### Kutuma data pamoja na muamala (9:54) {#sending-data-with-a-transaction-954}

Tuna uwezo wa kutuma thamani na zabuni ili muamala wetu utambuliwe mnyororoni. Lakini hebu tuangalie jambo moja zaidi — sehemu ya data. Tunaweza kutuma vitu pamoja na muamala wetu. Itakuwa katika mfumo wa heksadesimali (hexadecimal). Alice atatuma dola nyingine sita kwa Bob, na tutaambatanisha ujumbe: "hey Bob." Tunaweza kuona "hey Bob" ikibadilishwa kuwa hex.

Tunasaini muamala huo, tunautuma kwa mchimbaji, unaenda kwenye mtandao, na tunapata heshi kurudi. Tunautazama ili uchimbwe, na inakuwa hivyo. Tunapoangalia kitalu hicho, tunaweza kuona muamala wetu ukiwa na data iliyoambatishwa.

#### Kusanyiko la miamala na kuongeza gesi (12:43) {#transaction-pool-and-gas-bumping-1243}

Kwa onyesho moja la mwisho, niliweka muamala kwenye kusanyiko ukiwa na bei ya gesi ya chini sana — takriban Gwei 1.001. Umekaa hapo bila kuchimbwa kwa sababu hatuwapi wachimbaji motisha ya kutosha. Tunaweza kuona muamala unasubiri kwenye kusanyiko la miamala. Kusanyiko lina kati ya miamala mia moja na mia tatu, lakini vitalu vya hivi karibuni vinavyochimbwa vinaonyesha bei ya gesi ndogo zaidi ni takriban 5.

Kwa hivyo tunahitaji kuwasilisha tena muamala huu — hebu tuuongeze hadi 10. Hiyo ni zaidi ya inavyohitajika kuwa, lakini tutawasilisha tena muamala ule ule na nonsi ile ile lakini kwa bei ya gesi ya juu zaidi. Mtandao unasema "mtu yule yule, muamala ule ule, yuko tayari kulipa zaidi." Unachukuliwa na kuchimbwa kwenye kitalu kinachofuata.

#### Muhtasari (14:52) {#summary-1452}

Tulituma muamala, tulilipa gesi fulani ili kumpa motisha mchimbaji auweke kwenye mnyororo wa vitalu. Pia tulituma data pamoja na muamala — kuna kila aina ya mambo mazuri sana tunaweza kufanya sasa kwa kuwa tuna data za mwito hizi zinazokuja pamoja, na tutaingia kwenye mikataba mahiri na mambo mengi ya kufurahisha baadaye.