---
title: Endesha nodi ya Ethereum kwenye Raspberry Pi 4
description: Weka picha ya programu kwenye Raspberry Pi 4 yako, chomeka kebo ya ethaneti, unganisha diski ya SSD na uwashe kifaa ili kuigeuza Raspberry Pi 4 kuwa nodi kamili ya Ethereum + mthibitishaji.
author: "EthereumOnArm"
tags: ["clients", "execution layer", "consensus layer", "nodes"]
lang: sw
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm ni picha maalum ya Linux inayoweza kuigeuza Raspberry Pi kuwa nodi ya Ethereum.**

Ili kutumia Ethereum on Arm kuigeuza Raspberry Pi kuwa nodi ya Ethereum, vifaa vifuatavyo vinapendekezwa:

- Bodi ya Raspberry 4 (modeli B 8GB), Odroid M1 au Rock 5B (RAM ya 8GB/16GB)
- Kadi ya MicroSD (GB 16 Daraja la 10 angalau)
- Diski ya SSD ya TB 2 angalau ya USB 3.0 au SSD yenye kasha la USB hadi SATA.
- Ugavi wa umeme
- Kebo ya Ethaneti
- Usambazaji wa bandari (angalia wateja kwa maelezo zaidi)
- Kasha lenye heatsink na feni
- Kibodi ya USB, Monita na kebo ya HDMI (micro-HDMI) (Si lazima)

## Kwa nini uendeshe Ethereum kwenye ARM? {#why-run-ethereum-on-arm}

Bodi za ARM ni kompyuta ndogo, rahisi na za bei nafuu sana. Ni chaguo nzuri kwa kuendesha nodi za Ethereum kwa sababu zinaweza kununuliwa kwa bei nafuu, zimesanidiwa ili rasilimali zao zote zielekezwe kwenye nodi pekee, na hivyo kuzifanya zifanye kazi kwa ufanisi, zinatumia kiasi kidogo cha nishati na ni ndogo kimwili hivyo zinaweza kutoshea bila kuleta usumbufu nyumbani popote. Pia ni rahisi sana kuanzisha nodi kwa sababu MicroSD ya Raspberry Pi inaweza kuwekewa picha ya programu iliyotengenezwa tayari, bila kuhitaji kupakua au kutengeneza programu.

## Inafanyaje kazi? {#how-does-it-work}

Kadi ya kumbukumbu ya Raspberry Pi huwekewa picha ya programu iliyotengenezwa tayari. Picha hii ina kila kitu kinachohitajika ili kuendesha nodi ya Ethereum. Ikiwa na kadi iliyowekewa picha ya programu, mtumiaji anachohitaji kufanya ni kuwasha Raspberry Pi. Taratibu zote zinazohitajika ili kuendesha nodi huanzishwa kiotomatiki. Hii inafanya kazi kwa sababu kadi ya kumbukumbu ina mfumo wa uendeshaji (OS) unaotegemea Linux ambao juu yake taratibu za kiwango cha mfumo huendeshwa kiotomatiki na kuigeuza kuwa nodi ya Ethereum.

Ethereum haiwezi kuendeshwa kwa kutumia OS maarufu ya Raspberry Pi Linux "Raspbian" kwa sababu Raspbian bado inatumia usanifu wa 32-bit ambao huwafanya watumiaji wa Ethereum wakumbane na matatizo ya kumbukumbu na wateja wa makubaliano hawaauni mfumo wa 32-bit. Ili kukabiliana na hili, timu ya Ethereum on Arm ilihamia kwenye OS asilia ya 64-bit iitwayo "Armbian".

**Picha za programu hushughulikia hatua zote muhimu**, kuanzia kuweka mazingira na kufomati diski ya SSD hadi kusakinisha na kuendesha programu ya Ethereum pamoja na kuanzisha usawazishaji wa mnyororo wa bloku.

## Kumbuka kuhusu wateja wa utekelezaji na makubaliano {#note-on-execution-and-consensus-clients}

Picha ya Ethereum on Arm inajumuisha wateja wa utekelezaji na makubaliano waliotengenezwa tayari kama huduma. Nodi ya Ethereum inahitaji wateja wote wawili wasawazishwe na wawe wanaendeshwa. Unahitajika tu kupakua na kuweka picha ya programu na kisha kuanzisha huduma. Picha imepakiwa awali na wateja wafuatao wa utekelezaji:

- Geth
- Nethermind
- Besu

na wateja wafuatao wa makubaliano:

- Taa ya taa
- Nimbus
- Prysm
- Teku

Unapaswa kuchagua mmoja wa kila aina ili kuendesha - wateja wote wa utekelezaji wanaendana na wateja wote wa makubaliano. Ikiwa hautachagua mteja waziwazi, nodi itarudi kwenye chaguo-msingi zake - Geth na Lighthouse - na kuzindua kiotomatiki bodi inapowashwa. Ni lazima ufungue bandari 30303 kwenye ruta yako ili Geth iweze kupata na kuungana na rika.

## Kupakua Picha ya Programu {#downloading-the-image}

Picha ya Ethereum ya Raspberry Pi 4 ni picha ya "chomeka na cheza" ambayo husakinisha na kuweka kiotomatiki wateja wa utekelezaji na makubaliano, na kuwasanidi ili wawasiliane na kuungana na mtandao wa Ethereum. Mtumiaji anachohitaji kufanya ni kuanzisha taratibu zake kwa kutumia amri rahisi.

Pakua picha ya Raspberry Pi kutoka [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) na uhakiki hashi ya SHA256:

```sh
# Kutoka kwenye folda yenye picha iliyopakuliwa
shasum -a 256 ethonarm_22.04.00.img.zip
# Hashi inapaswa kutoa: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Kumbuka kuwa picha za bodi za Rock 5B na Odroid M1 zinapatikana kwenye [ukurasa wa upakuaji](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) wa Ethereum-on-Arm.

## Kuweka Picha ya Programu kwenye MicroSD {#flashing-the-microsd}

Kadi ya MicroSD itakayotumika kwa Raspberry Pi inapaswa kwanza kuingizwa kwenye kompyuta ya mezani au laptop ili iweze kuwekewa picha ya programu. Kisha, amri zifuatazo za terminal zitaweka picha iliyopakuliwa kwenye kadi ya SD:

```shell
# angalia jina la kadi ya MicroSD
sudo fdisk -l

>> sdxxx
```

Ni muhimu sana kupata jina sahihi kwa sababu amri inayofuata inajumuisha `dd` ambayo hufuta kabisa maudhui yaliyopo kwenye kadi kabla ya kuweka picha juu yake. Ili kuendelea, nenda kwenye folda iliyo na picha iliyobanwa:

```shell
# fungua na weka picha ya programu
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Kadi sasa imewekewa picha ya programu, hivyo inaweza kuingizwa kwenye Raspberry Pi.

## Anzisha nodi {#start-the-node}

Ukiwa umeingiza kadi ya SD kwenye Raspberry Pi, unganisha kebo ya ethaneti na SSD kisha washa umeme. OS itawaka na kuanza kiotomatiki kufanya kazi zilizosanidiwa awali ambazo huigeuza Raspberry Pi kuwa nodi ya Ethereum, ikiwa ni pamoja na kusakinisha na kutengeneza programu ya mteja. Hii itachukua takriban dakika 10-15.

Mara tu kila kitu kitakaposakinishwa na kusanidiwa, ingia kwenye kifaa kupitia muunganisho wa ssh au kwa kutumia terminal moja kwa moja ikiwa monita na kibodi vimeunganishwa kwenye bodi. Tumia akaunti ya `ethereum` kuingia, kwani hii ina ruhusa zinazohitajika kuanzisha nodi.

```shell
Mtumiaji: ethereum
Nenosiri: ethereum
```

Mteja wa utekelezaji chaguo-msingi, Geth, ataanza kiotomatiki. Unaweza kuthibitisha hili kwa kuangalia kumbukumbu kwa kutumia amri ifuatayo ya terminal:

```sh
sudo journalctl -u geth -f
```

Mteja wa makubaliano anahitaji kuanzishwa waziwazi. Ili kufanya hivi, kwanza fungua bandari 9000 kwenye ruta yako ili Lighthouse iweze kupata na kuungana na rika. Kisha wezesha na uanzishe huduma ya lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Angalia mteja kwa kutumia kumbukumbu:

```sh
sudo journalctl -u lighthouse-beacon
```

Kumbuka kuwa mteja wa makubaliano atasawazishwa ndani ya dakika chache kwa sababu anatumia usawazishaji wa kituo cha ukaguzi. Mteja wa utekelezaji atachukua muda mrefu zaidi - uwezekano wa saa kadhaa, na haitaanza hadi mteja wa makubaliano awe amemaliza kusawazisha (hii ni kwa sababu mteja wa utekelezaji anahitaji lengo la kusawazisha, ambalo hutolewa na mteja wa makubaliano aliyesawazishwa).

Huduma za Geth na Lighthouse zikiwa zinaendeshwa na kusawazishwa, Raspberry Pi yako sasa ni nodi ya Ethereum! Ni kawaida zaidi kuingiliana na mtandao wa Ethereum kwa kutumia koni ya Javascript ya Geth, ambayo inaweza kuunganishwa na mteja wa Geth kwenye bandari 8545. Inawezekana pia kuwasilisha amri zilizoumbizwa kama vitu vya JSON kwa kutumia zana ya ombi kama vile Curl. Angalia zaidi katika [nyaraka za Geth](https://geth.ethereum.org/).

Geth imesanidiwa awali kuripoti vipimo kwenye dashibodi ya Grafana ambayo inaweza kutazamwa kwenye kivinjari. Watumiaji wa hali ya juu wanaweza kutaka kutumia kipengele hiki kufuatilia afya ya nodi yao kwa kwenda kwenye `ipaddress:3000`, wakipitisha `user: admin` na `passwd: ethereum`.

## Wathibitishaji {#validators}

Mthibitishaji anaweza pia kuongezwa kwa hiari kwa mteja wa makubaliano. Programu ya mthibitishaji inaruhusu nodi yako kushiriki kikamilifu katika makubaliano na huupa mtandao usalama wa kiuchumi wa kripto. Unalipwa zawadi kwa kazi hii kwa ETH. Ili kuendesha mthibitishaji, lazima kwanza uwe na ETH 32, ambayo lazima iwekwe kwenye mkataba wa amana. Amana inaweza kuwekwa kwa kufuata mwongozo wa hatua kwa hatua kwenye [Launchpad](https://launchpad.ethereum.org/). Fanya hivi kwenye kompyuta ya mezani/laptop, lakini usitengeneze funguo — hii inaweza kufanywa moja kwa moja kwenye Raspberry Pi.

Fungua terminal kwenye Raspberry Pi na uendeshe amri ifuatayo ili kutengeneza funguo za amana:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Au pakua [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) ili kuiendesha kwenye mashine isiyounganishwa na mtandao, na endesha amri ya `deposit new-mnemnonic`)

Weka kirai chako cha mnemonic salama! Amri iliyo hapo juu ilitengeneza faili mbili kwenye keystore ya nodi: funguo za mthibitishaji na faili ya data ya amana. Data ya amana inahitaji kupakiwa kwenye launchpad, kwa hivyo ni lazima inakiliwe kutoka kwa Raspberry Pi hadi kwenye kompyuta ya mezani/laptop. Hii inaweza kufanywa kwa kutumia muunganisho wa ssh au njia nyingine yoyote ya kunakili/kubandika.

Faili ya data ya amana inapopatikana kwenye kompyuta inayoendesha launchpad, inaweza kuburutwa na kuangushwa kwenye `+` kwenye skrini ya launchpad. Fuata maagizo kwenye skrini ili kutuma muamala kwa mkataba wa amana.

Rudi kwenye Raspberry Pi, mthibitishaji anaweza kuanzishwa. Hii inahitaji kuingiza funguo za mthibitishaji, kuweka anwani ya kukusanya zawadi, na kisha kuanzisha mchakato wa mthibitishaji uliosanidiwa awali. Mfano ulio hapa chini ni wa Lighthouse—maagizo ya wateja wengine wa makubaliano yanapatikana kwenye [nyaraka za Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# ingiza funguo za mthibitishaji
lighthouse account validator import --directory=/home/ethereum/validator_keys

# weka anwani ya zawadi
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# anzisha mthibitishaji
sudo systemctl start lighthouse-validator
```

Hongera, sasa una nodi kamili ya Ethereum na mthibitishaji inayoendeshwa kwenye Raspberry Pi!

## Maelezo zaidi {#more-details}

Ukurasa huu umetoa muhtasari wa jinsi ya kuweka nodi na mthibitishaji wa Geth-Lighthouse kwa kutumia Raspberry Pi. Maagizo ya kina zaidi yanapatikana kwenye [tovuti ya Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Maoni yanakaribishwa {#feedback-appreciated}

Tunajua Raspberry Pi ina idadi kubwa ya watumiaji ambayo inaweza kuwa na athari chanya sana kwa afya ya mtandao wa Ethereum.
Tafadhali chunguza kwa kina maelezo katika mafunzo haya, jaribu kuendesha kwenye testnet, angalia GitHub ya Ethereum on Arm, toa maoni, ripoti matatizo na maombi ya pull request, na usaidie kuendeleza teknolojia na nyaraka!

## Marejeleo {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
