---
title: Jinsi ya kuunda na kujaribu dapp kwenye mtandao wa majaribio wa ndani wa wateja wengi
description: Mwongozo huu kwanza utakuelekeza jinsi ya kuanzisha na kusanidi mtandao wa majaribio wa ndani wa Ethereum wa wateja wengi kabla ya kutumia mtandao wa majaribio kusambaza na kujaribu dapp.
author: "Tedi Mitiku"
tags:
  [
    "wateja",
    "nodi",
    "mikataba mahiri",
    "uwezo wa kuunganishwa",
    "tabaka la mwafaka",
    "tabaka la utekelezaji",
    "majaribio",
  ]
skill: intermediate
breadcrumb: Mtandao wa majaribio wa wateja wengi
lang: sw
published: 2023-04-11
---

## Utangulizi {#introduction}

Mwongozo huu unakuelekeza katika mchakato wa kuanzisha mtandao wa majaribio wa ndani wa Ethereum unaoweza kusanidiwa, kusambaza mkataba mahiri kwake, na kutumia mtandao wa majaribio kuendesha majaribio dhidi ya programu tumizi iliyogatuliwa (dapp) yako. Mwongozo huu umeundwa kwa ajili ya wasanidi wa dapp wanaotaka kuunda na kujaribu dapp zao ndani ya nchi dhidi ya usanidi tofauti wa mtandao kabla ya kusambaza kwenye mtandao wa majaribio wa moja kwa moja au Mtandao Mkuu.

Katika mwongozo huu, uta:

- Kuanzisha mtandao wa majaribio wa ndani wa Ethereum na [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) ukitumia [Kurtosis](https://www.kurtosis.com/),
- Kuunganisha mazingira yako ya uundaji wa dapp ya Hardhat kwenye mtandao wa majaribio wa ndani ili kukusanya, kusambaza, na kujaribu dapp, na
- Kusanidi mtandao wa majaribio wa ndani, ikijumuisha vigezo kama vile idadi ya nodi na uoanishaji maalum wa kiteja cha EL/CL, ili kuwezesha utiririshaji wa kazi wa uundaji na majaribio dhidi ya usanidi mbalimbali wa mtandao.

### Kurtosis ni nini? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) ni mfumo wa ujenzi unaoweza kuunganishwa ulioundwa kwa ajili ya kusanidi mazingira ya majaribio ya kontena nyingi. Huwawezesha wasanidi programu haswa kuunda mazingira yanayoweza kuzalishwa tena ambayo yanahitaji mantiki ya usanidi inayobadilika, kama vile mitandao ya majaribio ya mnyororo wa vitalu.

Katika mwongozo huu, `ethereum-package` ya Kurtosis, inayodumishwa na [ethPandaOps](https://ethpandaops.io/), inaanzisha mtandao wa majaribio wa ndani wa Ethereum. Inasaidia wateja wote wakuu wa Tabaka la Utekelezaji (EL), kama vile [`geth`](https://geth.ethereum.org/), na wateja wa Tabaka la Mwafaka (CL), kama vile [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), na [`lodestar`](https://lodestar.chainsafe.io/). Kifurushi hiki hutumika kama mbadala unaoweza kusanidiwa na kuunganishwa kwa mitandao katika mifumo kama vile Hardhat Network na Anvil. Kurtosis inawapa wasanidi udhibiti mkubwa zaidi na unyumbufu juu ya mitandao ya majaribio wanayotumia, ambayo ni sababu kuu kwa nini timu za wateja wa Ethereum huitumia kwa kujaribu uboreshaji wa mtandao.

## Kusanidi Kurtosis {#setting-up-kurtosis}

Kabla ya kuendelea, hakikisha una:

- [Umesakinisha na kuanzisha injini ya Docker](https://docs.kurtosis.com/install/#i-install--start-docker) kwenye mashine yako ya ndani
- [Umesakinisha Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (au umeiboresha hadi toleo la hivi punde, ikiwa tayari umesakinisha CLI)
- Umesakinisha [Node.js](https://nodejs.org/en) (kwa mazingira yako ya dapp)

## Kuanzisha mtandao wa majaribio wa ndani wa Ethereum {#instantiate-testnet}

Ili kuanzisha mtandao wa majaribio wa ndani wa Ethereum, endesha:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Kumbuka: Amri hii inaupa mtandao wako jina la "local-eth-testnet" kwa kutumia alama ya `--enclave`.

Kurtosis itachapisha hatua inazochukua kiufundi inapofanya kazi kutafsiri, kuthibitisha, na kisha kutekeleza maagizo. Mwishoni, inachapisha muhtasari wa enklavu iliyounda. Muhtasari unajumuisha orodha ya **vizalia vya faili** na orodha ya **huduma za watumiaji**. Kwa usanidi chaguomsingi, huduma za watumiaji zinajumuisha nodi moja:

- `el-1-geth-lighthouse`, kiteja cha utekelezaji cha `geth`
- `cl-1-lighthouse-geth`, nodi ya kinara ya `lighthouse`
- `vc-1-geth-lighthouse`, kiteja cha mthibitishaji cha `lighthouse`

Kila huduma imeorodheshwa na milango inayoonyesha na mlango wa ndani ambao kila mmoja umechorwa. Kwa mfano, mlango wa `rpc` wa huduma ya `el-1-geth-lighthouse` ni mwisho wa JSON-RPC ambao zana zako za dapp zitatumia. Huduma halisi na nambari za milango zitakuwa tofauti kwenye mashine yako.

Unaweza kutazama muhtasari huu tena wakati wowote kwa kuendesha:

```sh
kurtosis enclave inspect local-eth-testnet
```

Hongera! Umetumia Kurtosis kuanzisha mtandao wa majaribio wa ndani wa Ethereum, ukiwa na kiteja cha CL (`lighthouse`) na EL (`geth`), kupitia Docker.

### Mapitio {#review-instantiate-testnet}

Katika sehemu hii, ulitekeleza amri iliyoelekeza Kurtosis kutumia [`ethereum-package` iliyopangishwa kwa mbali kwenye GitHub](https://github.com/ethpandaops/ethereum-package) ili kuanzisha mtandao wa majaribio wa ndani wa Ethereum ndani ya [Enklavu](https://docs.kurtosis.com/advanced-concepts/enclaves/) ya Kurtosis. Ndani ya enklavu yako, utapata "vizalia vya faili" na "huduma za watumiaji".

[Vizalia vya Faili](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) katika enklavu yako vinajumuisha data yote iliyozalishwa na kutumika kuanzisha wateja wa EL na CL, kama vile faili za mwanzo na funguo za mthibitishaji. Data ya mwanzo iliundwa kwa kutumia [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

Huduma za watumiaji zinaonyesha huduma zote zilizowekwa kwenye kontena zinazofanya kazi katika enklavu yako. Utagundua kuwa nodi moja, inayoangazia kiteja cha EL na kiteja cha CL, imeundwa.

## Unganisha mazingira yako ya uundaji wa dapp kwenye mtandao wa majaribio wa ndani wa Ethereum {#connect-your-dapp}

### Sanidi mazingira ya uundaji wa dapp {#set-up-dapp-env}

Kwa kuwa sasa una mtandao wa majaribio wa ndani unaofanya kazi, unaweza kuunganisha mazingira yako ya uundaji wa dapp ili kutumia mtandao wako wa majaribio wa ndani. Mfumo wa Hardhat utatumika katika mwongozo huu kusambaza dapp ya blackjack kwenye mtandao wako wa majaribio wa ndani.

Ili kusanidi mazingira yako ya uundaji wa dapp, nakili hazina iliyo na sampuli yetu ya dapp na usakinishe vitegemezi vyake, endesha:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

Alama ya `--legacy-peer-deps` inahitajika kwa sababu baadhi ya programu-jalizi za Hardhat za mradi wa sampuli zinatangaza matoleo yanayokinzana ya utegemezi wa mwenza.

Folda ya [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) inayotumika hapa ina usanidi wa kawaida kwa msanidi wa dapp anayetumia mfumo wa [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) ina mikataba mahiri michache rahisi kwa dapp ya Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) ina hati ya kusambaza mkataba wa tokeni kwenye mtandao wako wa ndani wa Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) ina jaribio rahisi la .js kwa mkataba wako wa tokeni ili kuthibitisha kila mchezaji katika dapp yetu ya Blackjack ana 1000 zilizotengenezwa kwa ajili yao
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) inasanidi usanidi wako wa Hardhat

### Sanidi Hardhat kutumia mtandao wa majaribio wa ndani {#configure-hardhat}

Ukiwa na mazingira yako ya uundaji wa dapp yaliyosanidiwa, sasa utaunganisha Hardhat ili kutumia mtandao wa majaribio wa ndani wa Ethereum uliotengenezwa kwa kutumia Kurtosis. Kwanza, tafuta anwani ya ndani ya mwisho wa JSON-RPC wa kiteja cha utekelezaji:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

Matokeo ni URL kama vile `http://127.0.0.1:32769`. Mlango wako utakuwa tofauti. Badilisha `<PORT>` katika muundo wa `localnet` katika faili yako ya usanidi ya `hardhat.config.ts` na mlango huu.

Mfano katika `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: BADILISHA <PORT> NA LANGO LA URI YA NODI INAYOZALISHWA NA KIFURUSHI CHA KURTOSIS CHA MTANDAO WA ETH
  // Hizi ni funguo za siri zinazohusishwa na akaunti za majaribio zilizofadhiliwa mapema zilizoundwa na eth-network-package
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

Funguo hizi za faragha ni funguo za majaribio zinazojulikana hadharani. Usizitumie kamwe kwenye Mtandao Mkuu au mtandao wowote wa umma.

Mara tu unapohifadhi faili yako, mazingira yako ya uundaji wa dapp ya Hardhat sasa yameunganishwa kwenye mtandao wako wa majaribio wa ndani wa Ethereum! Unaweza kuthibitisha kuwa mtandao wako wa majaribio unafanya kazi kwa kuendesha:

```sh
npx hardhat balances --network localnet
```

Matokeo yanaorodhesha anwani na salio la kila moja ya akaunti zilizo hapo juu. Kwa mfano, mstari wa kwanza unapaswa kuonekana hivi:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

Hii inathibitisha kuwa Hardhat inatumia mtandao wako wa majaribio wa ndani na inatambua akaunti zilizofadhiliwa mapema zilizoundwa na `ethereum-package`.

### Sambaza na ujaribu dapp yako ndani ya nchi {#deploy-and-test-dapp}

Huku mazingira ya uundaji wa dapp yakiwa yameunganishwa kikamilifu kwenye mtandao wa majaribio wa ndani wa Ethereum, sasa unaweza kuendesha utiririshaji wa kazi wa uundaji na majaribio dhidi ya dapp yako ukitumia mtandao wa majaribio wa ndani.

Ili kukusanya na kusambaza mkataba mahiri wa `ChipToken.sol` kwa ajili ya uundaji wa mfano na uundaji wa ndani, endesha:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Matokeo yanapaswa kuonekana kama hivi:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Sasa jaribu kuendesha jaribio la `ChipToken.js` dhidi ya dapp yako ya ndani ili kuthibitisha kila mchezaji katika dapp yetu ya Blackjack ana 1000 zilizotengenezwa kwa ajili yao. Jaribio la sampuli bado linatumia chaguo la kukokotoa la ethers v5 `deployed()`, ambalo ethers v6 ilibadilisha na `waitForDeployment()`, kwa hivyo isasishe kwanza:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Kisha endesha jaribio:

```sh
npx hardhat test --network localnet
```

Matokeo yanapaswa kuonekana kama hivi:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Mapitio {#review-dapp-workflows}

Kufikia hapa, sasa umesanidi mazingira ya uundaji wa dapp, ukayaunganisha kwenye mtandao wa ndani wa Ethereum ulioundwa na Kurtosis, na umekusanya, kusambaza, na kuendesha jaribio rahisi dhidi ya dapp yako.

Sasa hebu tuchunguze jinsi unavyoweza kusanidi mtandao wa msingi kwa ajili ya kujaribu dapp zetu chini ya usanidi tofauti wa mtandao.

## Kusanidi mtandao wa majaribio wa ndani wa Ethereum {#configure-testnet}

### Kubadilisha usanidi wa kiteja na idadi ya nodi {#configure-client-config-and-num-nodes}

Mtandao wako wa majaribio wa ndani wa Ethereum unaweza kusanidiwa kutumia jozi tofauti za kiteja cha EL na CL, pamoja na idadi tofauti ya nodi, kulingana na hali na usanidi maalum wa mtandao unaotaka kuunda au kujaribu. Hii inamaanisha kuwa, mara tu unaposanidiwa, unaweza kuanzisha mtandao wa majaribio wa ndani uliobinafsishwa na kuutumia kuendesha utiririshaji wa kazi sawa (usambazaji, majaribio, n.k.) chini ya usanidi mbalimbali wa mtandao ili kuhakikisha kila kitu kinafanya kazi kama inavyotarajiwa. Ili kujifunza zaidi kuhusu vigezo vingine unavyoweza kurekebisha, tazama [nyaraka za usanidi za `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

Ijaribu! Unaweza kupitisha chaguo mbalimbali za usanidi kwa `ethereum-package` kupitia faili ya YAML. Faili hii ya vigezo vya mtandao hutoa usanidi maalum ambao Kurtosis itatumia kusanidi mtandao wa ndani wa Ethereum.

Unda faili inayoitwa `network_params.yaml` inayoanzisha nodi tatu zilizo na jozi tofauti za EL/CL:

- Nodi 1 yenye `geth`/`lighthouse`
- Nodi 2 yenye `geth`/`lodestar`
- Nodi 3 yenye `geth`/`teku`

Usanidi huu unaunda mtandao tofauti wa utekelezaji wa nodi za Ethereum kwa ajili ya kujaribu dapp yako. Faili yako ya usanidi inapaswa kuonekana kama:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

Kila ingizo katika `participants` huchorwa kwa nodi kwenye mtandao, kwa hivyo maingizo 3 ya `participants` yataiambia Kurtosis kuanzisha nodi 3 kwenye mtandao wako. Kila ingizo hukuruhusu kubainisha jozi ya EL na CL inayotumika kwa nodi hiyo mahususi. Vigezo vyovyote usivyobainisha huweka thamani zake chaguomsingi.

Muundo wa `network_params` husanidi mipangilio ya mtandao inayotumika kuunda faili za mwanzo kwa kila nodi pamoja na mipangilio mingine kama vile sekunde kwa kila sloti ya mtandao.

Hifadhi faili yako ya vigezo na kisha uitumie kuendesha kifurushi chako cha Kurtosis kwa kuendesha:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Kumbuka: amri ya `kurtosis clean -a` inatumika hapa kuelekeza Kurtosis kuharibu mtandao wa majaribio wa zamani na yaliyomo kabla ya kuanzisha mpya.

Tena, Kurtosis itafanya kazi kwa muda na kuchapisha hatua za kibinafsi zinazofanyika. Hatimaye, inachapisha muhtasari wa enklavu. Wakati huu, huduma za watumiaji zinajumuisha nodi tatu, kwa mfano `el-1-geth-lighthouse`, `el-2-geth-lodestar`, na `el-3-geth-teku` kwa wateja wa utekelezaji, pamoja na wateja wanaolingana wa mwafaka na mthibitishaji.

Hongera! Umefaulu kusanidi mtandao wako wa majaribio wa ndani kuwa na nodi 3 badala ya 1. Ili kuendesha utiririshaji wa kazi sawa na uliofanya hapo awali dhidi ya dapp yako (kusambaza na kujaribu), fanya shughuli zilezile tulizofanya hapo awali kwa kubadilisha `<PORT>` katika muundo wa `localnet` katika faili yako ya usanidi ya `hardhat.config.ts` na mlango wa `rpc` wa huduma yoyote ya `el-<num>-...` katika mtandao wako mpya wa majaribio wa ndani wa nodi 3.

## Hitimisho {#conclusion}

Na ndivyo hivyo! Ili kurejelea mwongozo huu mfupi, wewe:

- Umeunda mtandao wa majaribio wa ndani wa Ethereum kupitia Docker ukitumia Kurtosis
- Umeunganisha mazingira yako ya uundaji wa dapp ya ndani kwenye mtandao wa ndani wa Ethereum
- Umesambaza dapp na kuendesha jaribio rahisi dhidi yake kwenye mtandao wa ndani wa Ethereum
- Umesanidi mtandao wa msingi wa Ethereum kuwa na nodi 3

Tungependa kusikia kutoka kwako kuhusu kile kilichokuendea vizuri, kile kinachoweza kuboreshwa, au kujibu maswali yako yoyote. Usisite kuwasiliana kupitia [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)!

### Mifano na miongozo mingine {#other-examples-guides}

Tunakuhimiza uangalie [kuanza haraka](https://docs.kurtosis.com/quickstart) kwetu na mifano yetu mingine katika [hazina yetu ya awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis).

`ethereum-package` inaweza pia kuanzisha huduma za ziada kando ya mtandao wako, kama vile mtumaji taka wa miamala (ili kuiga miamala), kichunguza bloku, na matukio yaliyounganishwa ya Grafana na Prometheus. Ili kuziwezesha, ziorodheshe chini ya `additional_services` katika faili yako ya vigezo, kama ilivyoelezwa katika [nyaraka za kifurushi](https://github.com/ethpandaops/ethereum-package#configuration).
