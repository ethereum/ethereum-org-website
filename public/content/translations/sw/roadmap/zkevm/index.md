---
title: zkEVM kwa uthibitishaji wa kitalu cha L1
description: Jifunze jinsi uthibitisho wa zero-knowledge unavyoweza kuthibitisha utekelezaji wa kitalu cha Ethereum, kuwezesha uwezo mkubwa wa kuchakata na mahitaji madogo ya mthibitishaji.
lang: sw
---

# zkEVM kwa uthibitishaji wa kitalu cha L1 {#zkevm-l1}

zkEVM ni teknolojia inayotumia [uthibitisho wa zero-knowledge](/zero-knowledge-proofs/) kuthibitisha utekelezaji wa kitalu cha Ethereum. Badala ya kuhitaji kila [mthibitishaji](/glossary/#validator) kutekeleza upya miamala yote katika kitalu, mhusika mmoja maalum (anayeitwa "mtoa uthibitisho") hutekeleza kitalu na kuzalisha uthibitisho wa kriptografia kwamba utekelezaji ulikuwa sahihi. Nodi yoyote inaweza kisha kuthibitisha uthibitisho huu—mchakato ambao ni rahisi sana kuliko kutekeleza upya miamala yote.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Isichanganywe na rollups za zkEVM</AlertTitle>
<AlertDescription>
Ukurasa huu unajadili matumizi ya zkEVM kuthibitisha utekelezaji wa kitalu cha L1 cha Ethereum. Kwa rollups za zkEVM zinazotumia uthibitisho wa ZK kuboresha uwezo wa Ethereum kama suluhisho la safu ya 2, tazama [rollup ya ujuzi sifuri](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Tatizo la kutekeleza upya {#reexecution-problem}

Leo, Ethereum inatumia mfumo wa uthibitishaji wa "N-ya-N": kila mthibitishaji lazima atekeleze upya kila muamala katika kila kitalu kwa kujitegemea ili kuthibitisha kwamba mabadiliko ya hali yaliyopendekezwa ni sahihi. Ingawa mbinu hii haina uhitaji wa kuaminiana kabisa, inaunda kikwazo cha msingi.

Tatizo ni kwamba uwezo wa kuchakata wa Ethereum unazuiwa na kile ambacho mthibitishaji wa kawaida anaweza kuchakata. Kuongeza [kikomo cha gesi](/glossary/#gas-limit) kungeruhusu miamala zaidi kwa kila kitalu, lakini pia kungeongeza mahitaji ya vifaa kwa wathibitishaji. Hili linatishia mfumo mtawanyo—ikiwa kuendesha mthibitishaji kunahitaji vifaa vya gharama kubwa, watu wachache wanaweza kushiriki katika kulinda mtandao.

zkEVM inatoa njia ya kutatua mabadilishano haya. Kwa kuhama kutoka "kila mtu anatekeleza upya" hadi "mmoja anathibitisha, kila mtu anahakiki," Ethereum inaweza kuongeza kikomo cha gesi kwa usalama bila kuongeza mahitaji ya vifaa vya mthibitishaji.

## Jinsi uthibitishaji wa zkEVM L1 unavyofanya kazi {#how-it-works}

Uthibitishaji wa zkEVM unabadilisha uhakiki wa kitalu kuwa mfumo wa "1-ya-N":

1. **Utekelezaji**: Mtoa uthibitisho hutekeleza miamala yote katika kitalu, akifuatilia kila mabadiliko ya hali
2. **Kuthibitisha**: Mtoa uthibitisho huzalisha uthibitisho wa kriptografia ([SNARK au STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) unaothibitisha usahihi wa utekelezaji
3. **Uhakiki**: Wathibitishaji huhakiki uthibitisho badala ya kutekeleza upya miamala—hii ni rahisi sana kuliko utekelezaji kamili wa upya

Dhamana ya usalama inabaki kuwa ileile: ikiwa utekelezaji ulikuwa si sahihi, hakuna uthibitisho halali unaoweza kuzalishwa. Lakini sasa, badala ya kila nodi kufanya ukokotoaji wa gharama kubwa, ni mtoa uthibitisho pekee anayefanya hivyo—na uhakiki ni rahisi kiasi kwamba hauzuii kikomo cha gesi.

### Aina ya 1 ya zkEVMs {#type-1-zkevm}

zkEVMs zimeainishwa katika aina kulingana na utangamano wao na Ethereum:

- **Aina ya 1**: Sawa kabisa na Ethereum. Hakuna marekebisho kwenye EVM, kwa hivyo kitalu chochote cha Ethereum kinaweza kuthibitishwa kama kilivyo
- **Aina ya 2-4**: Hufanya mabadilishano mbalimbali, kurekebisha tabia ya EVM ili kurahisisha uthibitishaji

Kwa uthibitishaji wa L1, Aina ya 1 ni muhimu. zkEVM lazima iweze kuthibitisha kitalu chochote halali cha Ethereum, ikiwa ni pamoja na matukio ya kipekee na bloku za kihistoria. Mkengeuko wowote kutoka kwa tabia halisi ya Ethereum ungesababisha matatizo ya makubaliano.

Utafiti wa zkEVM wa Ethereum Foundation unalenga katika utekelezaji wa Aina ya 1 ambao unatangamana kikamilifu na utekelezaji uliopo wa Ethereum.

## Faida kwa Ethereum {#benefits}

### Uwezo mkubwa wa kuchakata {#higher-throughput}

Wakati uhakiki ni rahisi, kikomo cha gesi kinaweza kuongezeka kwa usalama. Hii inapanua uwezo wa mtandao na kusaidia kuleta utulivu wa ada wakati wa vipindi vya mahitaji makubwa. Kikomo cha gesi cha sasa kinazuiwa kwa kiasi na vifaa vya mthibitishaji—zkEVM inaondoa kizuizi hiki.

### Mfumo mtawanyo imara zaidi {#stronger-decentralization}

Kwa uthibitishaji wa zkEVM, wathibitishaji wanahitaji tu kuhakiki uthibitisho badala ya kutekeleza miamala. Hii inapunguza kwa kiasi kikubwa mahitaji ya vifaa kwa ajili ya kuendesha mthibitishaji, na kuwezesha watu wengi zaidi kushiriki katika kulinda mtandao. Utofauti mkubwa wa wathibitishaji unaimarisha upinzani wa udhibiti na uthabiti wa Ethereum.

Kumbuka kwamba uthibitishaji wenyewe unahitaji rasilimali kubwa za ukokotoaji, kubwa zaidi kuliko zile za vifaa vya sasa vya mthibitishaji. Hata hivyo, tofauti na uhakiki, uthibitishaji hauhitaji kuwa mfumo mtawanyo kwa njia sawa: uthibitisho mmoja tu sahihi unahitajika kwa kila kitalu, na mtu yeyote anaweza kuuhakiki haraka. Utafiti kuhusu masoko ya watoa uthibitisho, ujumuishaji wa uthibitisho, na uongezaji kasi wa vifaa unalenga kuhakikisha kwamba uthibitishaji unabaki kuwa wa ushindani na unaofikika badala ya kujilimbikizia miongoni mwa waendeshaji wachache wakubwa.

### Mwisho unaotabirika {#predictable-finality}

Uhakiki wa uthibitisho hufanya kazi katika muda usiobadilika bila kujali ugumu wa kitalu. Hii inafanya muda wa uthibitisho kutabirika zaidi na kupunguza uthibitisho uliokosa ambao unaweza kutokea wakati wathibitishaji wanapata shida kuchakata bloku ngumu kwa wakati.

## Changamoto za uthibitishaji wa wakati halisi {#realtime-proving}

Changamoto kuu kwa uthibitishaji wa zkEVM L1 ni kasi. Bloku za Ethereum huzalishwa kila sekunde 12, ikimaanisha uthibitisho unahitaji kuzalishwa ndani ya muda sawa ili kuwa na manufaa kwa makubaliano.

Utekelezaji wa sasa wa zkEVM unaweza kuchukua dakika hadi saa kuthibitisha kitalu kimoja. Utafiti unalenga kuziba pengo hili kupitia:

- **Usambamba**: Kusambaza kazi ya uthibitishaji kwenye mashine nyingi
- **Vifaa maalum**: Kubuni saketi na vifaa vilivyoboreshwa kwa uthibitishaji wa ZK
- **Maboresho ya algoriti**: Mifumo bora zaidi ya uthibitisho na miundo ya saketi
- **Uthibitishaji wa hatua kwa hatua**: Kuzalisha uthibitisho wakati miamala inatekelezwa, badala ya baada ya hapo

## Utafiti na utekelezaji wa sasa {#current-research}

Ethereum Foundation inafadhili utafiti wa zkEVM kupitia timu ya [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Njia kuu za utafiti ni pamoja na:

- **Uthibitishaji wa wakati halisi**: Kuzalisha uthibitisho kamili wa kitalu ndani ya nafasi za sekunde 12
- **Ujumuishaji wa mteja**: Kuweka viwango vya miingiliano kati ya wateja wa utekelezaji na watoa uthibitisho
- **Vivutio vya kiuchumi**: Kubuni masoko endelevu ya watoa uthibitisho na miundo ya ada

### Hali ya utekelezaji {#implementations}

Utekelezaji kadhaa wa zkVM unatengenezwa na kujaribiwa kwa uthibitishaji wa kitalu cha Ethereum:

| Utekelezaji | Usanifu |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Hizi zinatumia mashine pepe zinazotegemea RISC-V kutekeleza msimbo wa baiti wa EVM, kisha kuzalisha uthibitisho wa ZK wa utekelezaji sahihi. Matokeo ya majaribio ya hivi punde na maendeleo yanafuatiliwa kwenye [kifuatiliaji cha zkVM cha Ethereum Foundation](https://zkevm.ethereum.foundation/zkvm-tracker).

## Jinsi zkEVM inavyoendana na maboresho mengine {#related-upgrades}

Uthibitishaji wa zkEVM L1 unaunganishwa na vipengele vingine kadhaa vya mpango wa utekelezaji wa Ethereum:

- **[Miti ya Verkle](/roadmap/verkle-trees/)**: Kuwezesha mashahidi wadogo kwa uhakiki usio na hali, kupunguza data ambayo watoa uthibitisho wanahitaji kufanyia kazi
- **[Hali ya kutokuwa na hali](/roadmap/statelessness/)**: zkEVM ni kiwezeshaji kikuu—kwa uthibitisho wa ZK wa utekelezaji, nodi hazihitaji hali kamili ili kuhakiki bloku
- **[PBS](/roadmap/pbs/)**: Wajenzi wa kitalu wanaweza kujumuisha uzalishaji wa uthibitisho, au soko tofauti la watoa uthibitisho linaweza kuibuka
- **[Mwisho wa Nafasi Moja](/roadmap/single-slot-finality/)**: Uzalishaji wa haraka wa uthibitisho unaweza kuwezesha mwisho wa nafasi moja na dhamana za kriptografia

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
Uthibitishaji wa zkEVM L1 upo katika utafiti unaoendelea na bado haujajumuishwa katika wateja wa uzalishaji wa Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Usomaji zaidi {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - Kituo rasmi cha utafiti cha zkEVM cha Ethereum Foundation
- [Ethproofs](https://ethproofs.org/) - Fuatilia mbio za kuthibitisha Ethereum katika wakati halisi
- [zkevm.fyi](https://zkevm.fyi) - Kitabu cha kiufundi kuhusu zkEVM kwa L1
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) - Maelezo ya kiufundi
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Muhtasari wa Vitalik wa maboresho ya uhakiki
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) - Uchambuzi wa utendaji kutoka kwa timu ya EF