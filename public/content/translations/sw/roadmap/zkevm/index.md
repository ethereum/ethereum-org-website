---
title: zkEVM kwa uthibitishaji wa kitalu cha tabaka la 1 (l1)
description: Jifunze jinsi uthibitisho wa maarifa-sifuri unavyoweza kuthibitisha utekelezaji wa kitalu cha Ethereum, kuwezesha uwezo wa upitishaji wa juu zaidi na mahitaji ya chini ya mthibitishaji.
lang: sw
---

zkEVM ni teknolojia inayotumia [uthibitisho wa maarifa-sifuri](/zero-knowledge-proofs/) kuthibitisha utekelezaji wa kitalu cha Ethereum. Badala ya kuhitaji kila [mthibitishaji](/glossary/#validator) kutekeleza upya miamala yote katika kitalu, mhusika mmoja maalum (anayeitwa "mthibitishaji") hutekeleza kitalu na kuzalisha uthibitisho wa kificho kwamba utekelezaji ulikuwa sahihi. Nodi yoyote inaweza kisha kuthibitisha uthibitisho huu—mchakato ambao ni wa bei nafuu sana kuliko kutekeleza upya miamala yote.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Isichanganywe na mikusanyiko ya zkEVM</AlertTitle>
<AlertDescription>
Ukurasa huu unajadili matumizi ya zkEVM kuthibitisha utekelezaji wa kitalu cha tabaka la 1 (l1) cha Ethereum. Kwa mikusanyiko ya zkEVM inayotumia uthibitisho wa ZK kuongeza uwezo wa Ethereum kama suluhisho za tabaka la 2 (l2), tazama [mikusanyiko ya sifuri-maarifa](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Tatizo la kutekeleza upya {#reexecution-problem}

Leo, Ethereum inatumia muundo wa uthibitishaji wa "N-ya-N": kila mthibitishaji lazima atekeleze upya kwa kujitegemea kila muamala katika kila kitalu ili kuthibitisha kwamba mabadiliko ya hali yaliyopendekezwa ni sahihi. Ingawa mbinu hii ni bila hitaji la uaminifu kwa kiwango cha juu, inaunda kikwazo cha msingi.

Tatizo ni kwamba uwezo wa upitishaji wa Ethereum unazuiwa na kile ambacho mthibitishaji wa kawaida anaweza kuchakata. Kuongeza [kikomo cha gesi](/glossary/#gas-limit) kungeruhusu miamala zaidi kwa kila kitalu, lakini pia kungeongeza mahitaji ya vifaa kwa wathibitishaji. Hili linatishia ugatuzi—ikiwa kuendesha mthibitishaji kunahitaji vifaa vya gharama kubwa, watu wachache wanaweza kushiriki katika kulinda mtandao.

zkEVM inatoa njia ya kuepuka maelewano haya. Kwa kuhama kutoka "kila mtu anatekeleza upya" hadi "mmoja anatoa uthibitisho, kila mtu anahakiki," Ethereum inaweza kuongeza kikomo cha gesi kwa usalama bila kuongeza mahitaji ya vifaa vya mthibitishaji.

## Jinsi uthibitishaji wa tabaka la 1 (l1) wa zkEVM unavyofanya kazi {#how-it-works}

Uthibitishaji wa zkEVM unabadilisha uthibitishaji wa kitalu kuwa muundo wa "1-ya-N":

1. **Utekelezaji**: Mthibitishaji hutekeleza miamala yote katika kitalu, akifuatilia kila mabadiliko ya hali
2. **Kuthibitisha**: Mthibitishaji huzalisha uthibitisho wa kificho ([SNARK au STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) unaoshuhudia usahihi wa utekelezaji
3. **Uhakiki**: Wathibitishaji huhakiki uthibitisho badala ya kutekeleza upya miamala—hii ni nafuu sana kuliko utekelezaji upya kamili

Dhamana ya usalama inabaki kuwa ileile: ikiwa utekelezaji ulikuwa si sahihi, hakuna uthibitisho halali unaoweza kuzalishwa. Lakini sasa, badala ya kila nodi kufanya ukokotoaji wa gharama kubwa, ni mthibitishaji pekee anayefanya hivyo—na uhakiki ni wa bei nafuu kiasi kwamba hauzuii kikomo cha gesi.

### Aina ya 1 ya zkEVMs {#type-1-zkevm}

zkEVMs zimeainishwa katika aina kulingana na utangamano wao na Ethereum:

- **Aina ya 1**: Sawa kabisa na Ethereum. Hakuna marekebisho kwa EVM, kwa hivyo kitalu chochote cha Ethereum kinaweza kuthibitishwa kama kilivyo
- **Aina ya 2-4**: Hufanya maelewano mbalimbali, kurekebisha tabia ya EVM ili kurahisisha uthibitishaji

Kwa uthibitishaji wa tabaka la 1 (l1), Aina ya 1 ni muhimu. zkEVM lazima iweze kuthibitisha kitalu chochote halali cha Ethereum, ikijumuisha matukio ya nadra na vitalu vya kihistoria. Mkengeuko wowote kutoka kwa tabia halisi ya Ethereum ungesababisha matatizo ya mwafaka.

Utafiti wa zkEVM wa Taasisi ya Ethereum unalenga utekelezaji wa Aina ya 1 ambao unatangamana kikamilifu na utekelezaji uliopo wa Ethereum.

## Faida kwa Ethereum {#benefits}

### Uwezo wa upitishaji wa juu zaidi {#higher-throughput}

Wakati uthibitishaji ni wa bei nafuu, kikomo cha gesi kinaweza kuongezeka kwa usalama. Hii inapanua uwezo wa mtandao na kusaidia kuleta utulivu wa ada wakati wa vipindi vya mahitaji makubwa. Kikomo cha gesi cha sasa kinazuiwa kwa kiasi na vifaa vya mthibitishaji—zkEVM inaondoa kizuizi hiki.

### Ugatuzi imara zaidi {#stronger-decentralization}

Pamoja na uthibitishaji wa zkEVM, wathibitishaji wanahitaji tu kuhakiki uthibitisho badala ya kutekeleza miamala. Hii inapunguza sana mahitaji ya vifaa kwa ajili ya kuendesha mthibitishaji, na kuwezesha watu wengi zaidi kushiriki katika kulinda mtandao. Utofauti mkubwa wa wathibitishaji unaimarisha upinzani wa udhibiti na uthabiti wa Ethereum.

Kumbuka kwamba kutoa uthibitisho kwenyewe kunahitaji rasilimali kubwa za ukokotoaji, kubwa zaidi kuliko zile za vifaa vya sasa vya mthibitishaji. Hata hivyo, tofauti na uthibitishaji wa kitalu, kutoa uthibitisho hakuhitaji kugatuliwa kwa njia sawa: uthibitisho mmoja tu sahihi unahitajika kwa kila kitalu, na mtu yeyote anaweza kuuhakiki haraka. Utafiti kuhusu masoko ya wathibitishaji, ujumuishaji wa uthibitisho, na uongezaji kasi wa vifaa unalenga kuhakisha kwamba utoaji wa uthibitisho unabaki kuwa wa ushindani na unaofikika badala ya kujilimbikizia miongoni mwa waendeshaji wachache wakubwa.

### Ukamilifu unaotabirika {#predictable-finality}

Uhakiki wa uthibitisho hufanya kazi kwa muda usiobadilika bila kujali ugumu wa kitalu. Hii inafanya muda wa uthibitisho kuwa unaotabirika zaidi na kupunguza uthibitisho uliokosa ambao unaweza kutokea wakati wathibitishaji wanapata shida kuchakata vitalu vigumu kwa wakati.

## Changamoto za kutoa uthibitisho katika wakati halisi {#realtime-proving}

Changamoto kuu kwa uthibitishaji wa tabaka la 1 (l1) wa zkEVM ni kasi. Vitalu vya Ethereum huzalishwa kila sekunde 12, ikimaanisha uthibitisho unahitaji kuzalishwa ndani ya muda sawa ili uwe na manufaa kwa mwafaka.

Utekelezaji wa sasa wa zkEVM unaweza kuchukua dakika hadi saa kuthibitisha kitalu kimoja. Utafiti unalenga kuziba pengo hili kupitia:

- **Usambamba**: Kusambaza kazi ya kuthibitisha kwenye mashine nyingi
- **Vifaa maalum**: Kubuni saketi na vifaa vilivyoboreshwa kwa ajili ya uthibitishaji wa ZK
- **Maboresho ya algoriti**: Mifumo ya uthibitisho yenye ufanisi zaidi na miundo ya saketi
- **Uthibitishaji wa nyongeza**: Kuzalisha uthibitisho kadiri miamala inavyotekelezwa, badala ya baada ya hapo

## Utafiti na utekelezaji wa sasa {#current-research}

Taasisi ya Ethereum inafadhili utafiti wa zkEVM kupitia timu ya [Wasimamizi wa Faragha wa Ethereum (PSE)](https://pse.dev/). Njia kuu za utafiti ni pamoja na:

- **Kutoa uthibitisho katika wakati halisi**: Kuzalisha uthibitisho kamili wa kitalu ndani ya sloti za sekunde 12
- **Ujumuishaji wa mteja**: Kusanifisha miingiliano kati ya wateja wa utekelezaji na wathibitishaji
- **Vivutio vya kiuchumi**: Kubuni masoko endelevu ya wathibitishaji na miundo ya ada

### Hali ya utekelezaji {#implementations}

Utekelezaji kadhaa wa zkVM unatengenezwa na kujaribiwa kwa ajili ya uthibitishaji wa kitalu cha Ethereum:

| Utekelezaji | Usanifu |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Hizi zinatumia mashine pepe zinazotegemea RISC-V kutekeleza msimbo wa baiti wa EVM, kisha kuzalisha uthibitisho wa ZK wa utekelezaji sahihi. Matokeo ya majaribio ya hivi punde na maendeleo yanafuatiliwa kwenye [kifuatiliaji cha zkVM cha Taasisi ya Ethereum](https://zkevm.ethereum.foundation/zkvm-tracker).

## Jinsi zkEVM inavyoendana na maboresho mengine {#related-upgrades}

Uthibitishaji wa tabaka la 1 (l1) wa zkEVM unaungana na vipengele vingine kadhaa vya ramani ya njia ya Ethereum:

- **[Miti ya Verkle](/roadmap/verkle-trees/)**: Huwezesha mashahidi wadogo kwa ajili ya uthibitishaji wa ubilahali, kupunguza data ambayo wathibitishaji wanahitaji kufanyia kazi
- **[Ubilahali](/roadmap/statelessness/)**: zkEVM ni kiwezeshaji kikuu—pamoja na uthibitisho wa ZK wa utekelezaji, nodi hazihitaji hali kamili ili kuthibitisha vitalu
- **[Utengano wa mpendekezaji na mjengaji (PBS)](/roadmap/pbs/)**: Wajengaji wa kitalu wangeweza kujumuisha uzalishaji wa uthibitisho, au soko tofauti la wathibitishaji linaweza kuibuka
- **[Uthibitisho wa mwisho wa sloti moja](/roadmap/single-slot-finality/)**: Uzalishaji wa haraka wa uthibitisho unaweza kuwezesha uthibitisho wa mwisho wa sloti moja na dhamana za kificho

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
Uthibitishaji wa tabaka la 1 (l1) wa zkEVM upo katika utafiti unaoendelea na bado haujajumuishwa katika wateja wa uzalishaji wa Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Usomaji zaidi {#further-reading}

- [Taasisi ya zkEVM](https://zkevm.ethereum.foundation) - Kituo rasmi cha utafiti cha zkEVM cha Taasisi ya Ethereum
- [Ethproofs](https://ethproofs.org/) - Fuatilia mbio za kuthibitisha Ethereum katika wakati halisi
- [zkevm.fyi](https://zkevm.fyi) - Kitabu cha kiufundi kuhusu zkEVM kwa tabaka la 1 (l1)
- [Vipimo vya zkEVM vya PSE](https://github.com/privacy-scaling-explorations/zkevm-specs) - Vipimo vya kiufundi
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Muhtasari wa Vitalik wa maboresho ya uthibitishaji
- [Blogu ya zkEVM ya EF](https://zkevm.ethereum.foundation/blog) - Uchambuzi wa utendaji kutoka kwa timu ya EF