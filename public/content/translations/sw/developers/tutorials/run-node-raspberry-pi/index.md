---
title: Endesha nodi ya Ethereum kwenye Raspberry Pi 5
description: Weka taswira kwenye Raspberry Pi 5 yako, chomeka kebo ya ethaneti, unganisha diski ya NVMe na uwashe kifaa ili kubadilisha Raspberry Pi 5 kuwa nodi kamili ya Ethereum + mthibitishaji
author: "EthereumOnArm"
tags: ["wateja", "tabaka la utekelezaji", "tabaka la mwafaka", "nodi"]
lang: sw
skill: intermediate
breadcrumb: Nodi ya Rasp Pi
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm ni taswira maalum ya Linux inayoweza kubadilisha Raspberry Pi kuwa nodi ya Ethereum.**

Ili kutumia Ethereum on Arm kubadilisha Raspberry Pi kuwa nodi ya Ethereum, maunzi yafuatayo yanapendekezwa:

- Raspberry Pi 5 yenye RAM ya GB 16
- NVMe HAT kwa ajili ya Raspberry Pi 5, ili kuunganisha diski ya NVMe
- NVMe SSD (M.2 2280), angalau TB 4. Epuka diski zenye kidhibiti cha Phison, ambazo zina matatizo yanayojulikana ya utangamano.
- Kadi ya MicroSD (angalau GB 16 Daraja la 10)
- Kifaa cha umeme
- Kebo ya ethaneti
- Usambazaji wa lango (tazama wateja kwa maelezo zaidi)
- Kasha lenye sinki la joto
- Kibodi ya USB, Kichunguzi na kebo ya HDMI (micro-HDMI) (Si lazima)

Ethereum on Arm pia inasaidia bodi nyingine za ARM, kama vile NanoPC T6, Rock 5B, na Orange Pi 5 Plus. Bodi hizi zina usaidizi wa asili wa NVMe, kwa hivyo timu ya Ethereum on Arm inazipendekeza badala ya Raspberry Pi 5 ikiwa unanunua maunzi mapya. Tazama [orodha ya maunzi yanayopendekezwa](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html) kwa maelezo. Sehemu iliyosalia ya mafunzo haya ni sawa kwa bodi zote zinazotumika, isipokuwa faili ya taswira unayopakua.

## Kwa nini uendeshe Ethereum kwenye ARM? {#why-run-ethereum-on-arm}

Bodi za ARM ni kompyuta ndogo, zinazobadilika, na za bei nafuu sana. Ni chaguo zuri kwa kuendesha nodi za Ethereum kwa sababu zinaweza kununuliwa kwa bei rahisi, kusanidiwa ili rasilimali zake zote zilenge tu kwenye nodi, na kuzifanya ziwe na ufanisi, zinatumia kiasi kidogo cha umeme na ni ndogo kimaumbile hivyo zinaweza kutoshea bila kuonekana katika nyumba yoyote. Pia ni rahisi sana kuanzisha nodi kwa sababu MicroSD ya Raspberry Pi inaweza kuwekwa taswira iliyojengwa tayari, bila kuhitaji kupakua au kujenga programu.

## Inafanyaje kazi? {#how-does-it-work}

Kadi ya kumbukumbu ya Raspberry Pi inawekwa taswira iliyojengwa tayari. Taswira hii ina kila kitu kinachohitajika ili kuendesha nodi ya Ethereum. Kwa kadi iliyowekwa taswira, mtumiaji anachohitaji kufanya ni kuwasha Raspberry Pi. Michakato yote inayohitajika kuendesha nodi huanzishwa kiotomatiki. Hii inafanya kazi kwa sababu kadi ya kumbukumbu ina mfumo wa uendeshaji (OS) unaotegemea Linux ambapo michakato ya kiwango cha mfumo huendeshwa kiotomatiki na kubadilisha kifaa kuwa nodi ya Ethereum.

Taswira za Ethereum on Arm zinategemea usambazaji wa Linux wa biti 64 ambao umeboreshwa kwa ajili ya kuendesha nodi ya Ethereum, na zinajumuisha wateja wa Ethereum waliojengwa tayari.

**Taswira hushughulikia hatua zote muhimu**, kuanzia kuweka mazingira na kufomati diski ya NVMe hadi kusakinisha programu ya Ethereum.

## Dokezo kuhusu viteja vya utekelezaji na wateja wa mwafaka {#note-on-execution-and-consensus-clients}

Taswira ya Ethereum on Arm inajumuisha viteja vya utekelezaji na wateja wa mwafaka waliojengwa tayari kama huduma. Nodi ya Ethereum inahitaji wateja wote wawili kusawazishwa na kufanya kazi. Unahitajika tu kupakua na kuweka taswira kisha uanzishe huduma. Taswira imepakiwa mapema na viteja kadhaa vya utekelezaji (kama vile Geth, Nethermind, Besu, Erigon, na Reth) na wateja wa mwafaka (kama vile Lighthouse, Prysm, Teku, Nimbus, na Lodestar). Tazama [nyaraka za Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html) kwa orodha ya sasa.

Unapaswa kuchagua mmoja wa kila mmoja ili kuendesha - viteja vyote vya utekelezaji vinaendana na wateja wote wa mwafaka. Mafunzo haya yanatumia Geth na Lighthouse.

## Kupakua Taswira {#downloading-the-image}

Taswira ya Ethereum on Arm ni taswira ya "chomeka na utumie" ambayo husakinisha na kuweka kiotomatiki kiteja cha utekelezaji na mteja wa mwafaka, na kuwasanidi ili wawasiliane na kuunganishwa kwenye mtandao wa Ethereum. Mtumiaji anachohitaji kufanya ni kuanzisha michakato yao kwa kutumia amri rahisi.

Pakua taswira ya hivi punde kwa ajili ya bodi yako kutoka kwenye [ukurasa wa kupakua wa Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads). Ukurasa wa kupakua pia unaorodhesha hundi ya SHA256 ya kila taswira. Thibitisha faili iliyopakuliwa dhidi yake:

```sh
# Kutoka kwenye saraka iliyo na taswira iliyopakuliwa
sha256sum ethonarm_rpi5_<version>.img.zip
# Linganisha matokeo na checksum kwenye ukurasa wa kupakua
```

## Kuweka taswira kwenye MicroSD {#flashing-the-microsd}

Kadi ya MicroSD itakayotumika kwa Raspberry Pi inapaswa kwanza kuingizwa kwenye kompyuta ya mezani au kompyuta mpakato ili iweze kuwekwa taswira. Kisha, amri zifuatazo za terminal zitaweka taswira iliyopakuliwa kwenye kadi ya SD:

```shell
# Angalia jina la kadi ya MicroSD
sudo fdisk -l

>> sdxxx
```

Ni muhimu sana kupata jina sahihi kwa sababu amri inayofuata inajumuisha `dd` ambayo inafuta kabisa maudhui yaliyopo kwenye kadi kabla ya kuweka taswira ndani yake. Ili kuendelea, nenda kwenye saraka iliyo na taswira iliyobanwa:

```shell
# Fungua zipu na u-flash taswira
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Kadi sasa imewekwa taswira, kwa hivyo inaweza kuingizwa kwenye Raspberry Pi.

## Anzisha nodi {#start-the-node}

Ukiwa umeingiza kadi ya SD kwenye Raspberry Pi, unganisha kebo ya ethaneti na diski ya NVMe kisha uwashe umeme. OS itawaka na kuanza kiotomatiki kutekeleza majukumu yaliyosanidiwa mapema ambayo hubadilisha Raspberry Pi kuwa nodi ya Ethereum, ikijumuisha kufomati diski ya NVMe na kusakinisha programu ya mteja. Hii labda itachukua dakika 10-15, na bodi itajiwasha upya kiotomatiki itakapomaliza. Usikatishe usambazaji wa umeme wakati huu.

Mara tu kila kitu kitakaposakinishwa na kusanidiwa, ingia kwenye kifaa kupitia muunganisho wa ssh au kwa kutumia terminal moja kwa moja ikiwa kichunguzi na kibodi vimeunganishwa kwenye bodi. Tumia akaunti ya `ethereum` kuingia, kwani hii ina ruhusa zinazohitajika kuanzisha nodi.

```shell
User: ethereum
Password: ethereum
```

Utaulizwa kubadilisha nenosiri la msingi kwenye kuingia kwako kwa kwanza. Fanya hivyo, kwa sababu mtu yeyote anayeweza kufikia nodi yako angeweza kuingia kwa kutumia nenosiri la msingi. Ngome ya mfumo imezimwa kwa chaguo-msingi, kwa hivyo ikiwa nodi yako ina anwani ya IP ya umma, tazama [mwongozo wa usalama wa Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html) ili kuiwasha.

Anzisha mteja wa mwafaka kwanza. Fungua lango 9000 (TCP na UDP) kwenye kipanga njia chako ili Lighthouse iweze kupata na kuunganishwa na wenza. Kisha washa na uanzishe huduma ya lighthouse, ili iweze pia kuanza upya baada ya kuwasha upya:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Angalia mteja kwa kutumia logi:

```sh
sudo journalctl -u lighthouse-beacon -f
```

Kisha, anzisha kiteja cha utekelezaji. Fungua lango 30303 (TCP na UDP) kwenye kipanga njia chako ili Geth iweze kupata na kuunganishwa na wenza. Kisha washa na uanzishe huduma ya geth:

```sh
sudo systemctl enable --now geth
```

Unaweza kuthibitisha kuwa inafanya kazi kwa kuangalia logi:

```sh
sudo journalctl -u geth -f
```

Kumbuka kwamba mteja wa mwafaka atafanya usawazishaji ndani ya dakika chache kwa sababu anatumia usawazishaji wa kituo cha ukaguzi. Kiteja cha utekelezaji kitachukua muda mrefu zaidi - huenda saa kadhaa. Wateja wote wawili hufanya kazi kwa wakati mmoja: mteja wa mwafaka humwambia kiteja cha utekelezaji ni kitalu kipi kilicho kichwa cha mnyororo, na kiteja cha utekelezaji hupakua na kuthibitisha vitalu hadi hapo.

Huku huduma za Geth na Lighthouse zikifanya kazi na kusawazishwa, Raspberry Pi yako sasa ni nodi ya Ethereum! Ni jambo la kawaida sana kuingiliana na mtandao wa Ethereum kwa kutumia kiweko cha JavaScript cha Geth, ambacho kinaweza kuambatishwa kwenye kiteja cha Geth kwenye lango 8545. Inawezekana pia kuwasilisha amri zilizoumbizwa kama vitu vya JSON kwa kutumia zana ya ombi kama vile Curl. Tazama zaidi katika [nyaraka za Geth](https://geth.ethereum.org/).

Taswira pia inajumuisha dashibodi ya Grafana ambayo watumiaji wa hali ya juu zaidi wanaweza kuitumia kufuatilia afya ya nodi yao, kwa kwenda kwenye `ipaddress:3000` katika kivinjari.

## Wathibitishaji {#validators}

Mthibitishaji pia anaweza kuongezwa kwa hiari kwa mteja wa mwafaka. Programu ya mthibitishaji inaruhusu nodi yako kushiriki kikamilifu katika mwafaka na kuupa mtandao usalama wa kiuchumi wa kificho. Unapata thawabu kwa kazi hii katika ETH. Ili kuendesha mthibitishaji, lazima kwanza uwe na ETH 32, ambazo lazima ziwekwe kwenye mkataba wa amana. Amana inaweza kufanywa kwa kufuata mwongozo wa hatua kwa hatua kwenye [Launchpad](https://launchpad.ethereum.org/). Fanya hivi kwenye kompyuta ya mezani/kompyuta mpakato, lakini usitengeneze funguo — hii inaweza kufanywa moja kwa moja kwenye Raspberry Pi.

Zana ya [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) hutengeneza funguo za mthibitishaji. Taswira za sasa zinaijumuisha; ikiwa unaendesha taswira ya zamani, isakinishe kwanza. Kisha tengeneza funguo za amana, ukibadilisha `<YOUR_ETH_ADDRESS>` na anwani inayopaswa kupokea uondoaji wako:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Au pakua [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) ili kuendesha kwenye mashine iliyotengwa na mtandao, na uendeshe amri ya `deposit new-mnemonic` hapo)

Weka salama kirai cha kukumbukia! Amri iliyo hapo juu ilitengeneza faili mbili katika saraka ya `validator_keys`: funguo za mthibitishaji na faili ya data ya amana. Data ya amana inahitaji kupakiwa kwenye launchpad, kwa hivyo lazima inakiliwe kutoka kwenye Raspberry Pi hadi kwenye kompyuta ya mezani/kompyuta mpakato. Hii inaweza kufanywa kwa kutumia muunganisho wa ssh au mbinu nyingine yoyote ya kunakili/kubandika.

Mara tu faili ya data ya amana inapopatikana kwenye kompyuta inayoendesha launchpad, inaweza kuburutwa na kudondoshwa kwenye `+` kwenye skrini ya launchpad. Fuata maagizo kwenye skrini ili kutuma muamala kwenye mkataba wa amana.

Tukirudi kwenye Raspberry Pi, mthibitishaji anaweza kuanzishwa. Hii inahitaji kuingiza funguo za mthibitishaji, kuweka anwani ya kukusanya thawabu, na kisha kuanzisha mchakato wa mthibitishaji uliosanidiwa mapema. Mfano ulio hapa chini ni wa Lighthouse—maagizo kwa wateja wengine wa mwafaka yanapatikana kwenye [nyaraka za Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html):

```shell
# Ingiza funguo za mthibitishaji
lighthouse account validator import --directory=/home/ethereum/validator_keys

# Weka anwani ya zawadi (badilisha <YOUR_ETH_ADDRESS> na anwani yako)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# Anzisha mthibitishaji
sudo systemctl enable --now lighthouse-validator
```

Hongera, sasa una nodi kamili ya Ethereum na mthibitishaji anayefanya kazi kwenye Raspberry Pi!

## Maelezo zaidi {#more-details}

Ukurasa huu umetoa muhtasari wa jinsi ya kuweka nodi ya Geth-Lighthouse na mthibitishaji kwa kutumia Raspberry Pi. Maagizo ya kina zaidi yanapatikana kwenye [tovuti ya Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Tunathamini maoni {#feedback-appreciated}

Tunajua Raspberry Pi ina idadi kubwa ya watumiaji ambayo inaweza kuwa na athari chanya sana kwa afya ya mtandao wa Ethereum.
Tafadhali chunguza kwa kina maelezo katika mafunzo haya, jaribu kuendesha kwenye mitandao ya majaribio, angalia [GitHub ya Ethereum on Arm](https://github.com/EOA-Blockchain-Labs/ethereumonarm), toa maoni, wasilisha matatizo na maombi ya kuvuta na usaidie kuendeleza teknolojia na nyaraka!

## Marejeleo {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
