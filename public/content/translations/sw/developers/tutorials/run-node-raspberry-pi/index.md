---
title: Endesha nodi ya Ethereum kwenye Raspberry Pi 4
description: Weka mfumo kwenye Raspberry Pi 4 yako, chomeka kebo ya ethaneti, unganisha diski ya SSD na uwashe kifaa ili kubadilisha Raspberry Pi 4 kuwa nodi kamili ya Ethereum + mthibitishaji
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

- Bodi ya Raspberry 4 (modeli B 8GB), Odroid M1 au Rock 5B (8GB/16GB RAM)
- Kadi ya MicroSD (Kiwango cha chini cha GB 16 Daraja la 10)
- Diski ya USB 3.0 ya kiwango cha chini cha TB 2 ya SSD au SSD yenye kasha la USB hadi SATA.
- Kifaa cha umeme
- Kebo ya ethaneti
- Usambazaji wa lango (tazama wateja kwa maelezo zaidi)
- Kasha lenye sinki la joto na feni
- Kibodi ya USB, Kichunguzi na kebo ya HDMI (micro-HDMI) (Si lazima)

## Kwa nini uendeshe Ethereum kwenye ARM? {#why-run-ethereum-on-arm}

Bodi za ARM ni kompyuta ndogo, zinazobadilika, na za bei nafuu sana. Ni chaguo zuri kwa kuendesha nodi za Ethereum kwa sababu zinaweza kununuliwa kwa bei rahisi, kusanidiwa ili rasilimali zake zote zilenge tu kwenye nodi, na kuzifanya ziwe na ufanisi, zinatumia kiasi kidogo cha umeme na ni ndogo kimaumbile hivyo zinaweza kutoshea bila kuonekana katika nyumba yoyote. Pia ni rahisi sana kuanzisha nodi kwa sababu MicroSD ya Raspberry Pi inaweza kuwekwa taswira iliyojengwa tayari, bila kuhitaji kupakua au kujenga programu.

## Inafanyaje kazi? {#how-does-it-work}

Kadi ya kumbukumbu ya Raspberry Pi inawekwa taswira iliyojengwa tayari. Taswira hii ina kila kitu kinachohitajika ili kuendesha nodi ya Ethereum. Ukiwa na kadi iliyowekwa mfumo, unachohitaji kufanya ni kuwasha Raspberry Pi. Michakato yote inayohitajika kuendesha nodi huanzishwa kiotomatiki. Hii inafanya kazi kwa sababu kadi ya kumbukumbu ina mfumo wa uendeshaji (OS) unaotegemea Linux ambapo michakato ya kiwango cha mfumo huendeshwa kiotomatiki na kubadilisha kifaa hicho kuwa nodi ya Ethereum.

Ethereum haiwezi kuendeshwa kwa kutumia OS maarufu ya Linux ya Raspberry Pi "Raspbian" kwa sababu Raspbian bado inatumia usanifu wa biti 32 ambao husababisha watumiaji wa Ethereum kukumbana na matatizo ya kumbukumbu na wateja wa mwafaka hawatumii jozi za biti 32. Ili kutatua hili, timu ya Ethereum on Arm ilihamia kwenye OS asili ya biti 64 inayoitwa "Armbian".

**Taswira hushughulikia hatua zote muhimu**, kuanzia kuweka mazingira na kufomati diski ya SSD hadi kusakinisha na kuendesha programu ya Ethereum pamoja na kuanzisha usawazishaji wa mnyororo wa vitalu.

## Dokezo kuhusu wateja wa utekelezaji na mwafaka {#note-on-execution-and-consensus-clients}

Taswira ya Ethereum on Arm inajumuisha wateja wa utekelezaji na mwafaka waliojengwa tayari kama huduma. Nodi ya Ethereum inahitaji wateja wote wawili kusawazishwa na kuendeshwa. Unahitajika tu kupakua na kuweka taswira kisha uanzishe huduma. Taswira imepakiwa mapema na wateja wafuatao wa utekelezaji:

- Geth
- Nethermind
- Besu

na wateja wafuatao wa mwafaka:

- Lighthouse
- Nimbus
- Prysm
- Teku

Unapaswa kuchagua mmoja wa kila mmoja ili kuendesha - wateja wote wa utekelezaji wanaendana na wateja wote wa mwafaka. Ikiwa hutachagua mteja waziwazi, nodi itarudi kwenye chaguo-msingi zake - Geth na Lighthouse - na kuziendesha kiotomatiki wakati bodi inawashwa. Lazima ufungue lango 30303 kwenye kipanga njia chako ili Geth iweze kupata na kuunganishwa na wenza.

## Kupakua Taswira {#downloading-the-image}

Taswira ya Ethereum ya Raspberry Pi 4 ni taswira ya "chomeka na utumie" ambayo husakinisha na kuweka kiotomatiki wateja wote wa utekelezaji na mwafaka, ikiwasanidi ili kuwasiliana na kuunganishwa kwenye mtandao wa Ethereum. Anachohitaji kufanya mtumiaji ni kuanzisha michakato yao kwa kutumia amri rahisi.

Pakua taswira ya Raspberry Pi kutoka [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) na uthibitishe heshi ya SHA256:

```sh
# Kutoka kwenye saraka iliyo na taswira iliyopakuliwa
shasum -a 256 ethonarm_22.04.00.img.zip
# Heshi inapaswa kutoa: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Kumbuka kwamba taswira za bodi za Rock 5B na Odroid M1 zinapatikana kwenye [ukurasa wa vipakuliwa](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) wa Ethereum-on-Arm.

## Kuweka Mfumo kwenye MicroSD {#flashing-the-microsd}

Kadi ya MicroSD itakayotumika kwa Raspberry Pi inapaswa kwanza kuingizwa kwenye kompyuta ya mezani au kompyuta mpakato ili iweze kuwekwa mfumo. Kisha, amri zifuatazo za terminali zitaweka taswira iliyopakuliwa kwenye kadi ya SD:

```shell
# kagua jina la kadi ya MicroSD
sudo fdisk -l

>> sdxxx
```

Ni muhimu sana kupata jina sahihi kwa sababu amri inayofuata inajumuisha `dd` ambayo inafuta kabisa maudhui yaliyopo kwenye kadi kabla ya kuweka taswira ndani yake. Ili kuendelea, nenda kwenye saraka iliyo na taswira iliyobanwa:

```shell
# toa kwenye zipu na uflashi taswira
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Kadi sasa imewekwa mfumo, hivyo inaweza kuingizwa kwenye Raspberry Pi.

## Anzisha nodi {#start-the-node}

Ukiwa umeingiza kadi ya SD kwenye Raspberry Pi, unganisha kebo ya ethaneti na SSD kisha uwashe umeme. OS itawaka na kuanza kiotomatiki kufanya kazi zilizosanidiwa mapema ambazo hubadilisha Raspberry Pi kuwa nodi ya Ethereum, ikiwa ni pamoja na kusakinisha na kujenga programu ya mteja. Hii huenda ikachukua dakika 10-15.

Mara tu kila kitu kitakapowekwa na kusanidiwa, ingia kwenye kifaa kupitia muunganisho wa ssh au kwa kutumia terminali moja kwa moja ikiwa kichunguzi na kibodi vimeunganishwa kwenye bodi. Tumia akaunti ya `ethereum` kuingia, kwani hii ina ruhusa zinazohitajika kuanzisha nodi.

```shell
User: ethereum
Password: ethereum
```

Kiteja cha utekelezaji cha chaguo-msingi, Geth, kitaanza kiotomatiki. Unaweza kuthibitisha hili kwa kuangalia logi ukitumia amri ifuatayo ya terminali:

```sh
sudo journalctl -u geth -f
```

Mteja wa mwafaka anahitaji kuanzishwa waziwazi. Ili kufanya hivi, kwanza fungua lango 9000 kwenye kipanga njia chako ili Lighthouse iweze kupata na kuunganishwa na wenza. Kisha wezesha na uanzishe huduma ya lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Angalia mteja ukitumia logi:

```sh
sudo journalctl -u lighthouse-beacon
```

Kumbuka kwamba mteja wa mwafaka atafanya usawazishaji ndani ya dakika chache kwa sababu anatumia usawazishaji wa kituo cha ukaguzi. Kiteja cha utekelezaji kitachukua muda mrefu zaidi - huenda saa kadhaa, na hakitaanza hadi mteja wa mwafaka awe amemaliza usawazishaji (hii ni kwa sababu kiteja cha utekelezaji kinahitaji lengo la kusawazisha, ambalo mteja wa mwafaka aliyesawazishwa hutoa).

Huku huduma za Geth na Lighthouse zikiendeshwa na kusawazishwa, Raspberry Pi yako sasa ni nodi ya Ethereum! Ni jambo la kawaida kuingiliana na mtandao wa Ethereum kwa kutumia kiweko cha JavaScript cha Geth, ambacho kinaweza kuunganishwa kwenye mteja wa Geth kwenye lango 8545. Pia inawezekana kuwasilisha amri zilizoumbizwa kama vitu vya JSON kwa kutumia zana ya ombi kama vile Curl. Tazama zaidi katika [nyaraka za Geth](https://geth.ethereum.org/).

Geth imesanidiwa mapema kuripoti vipimo kwenye dashibodi ya Grafana ambayo inaweza kutazamwa kwenye kivinjari. Watumiaji wa hali ya juu zaidi wanaweza kutaka kutumia kipengele hiki kufuatilia afya ya nodi yao kwa kwenda kwenye `ipaddress:3000`, kupitisha `user: admin` na `passwd: ethereum`.

## Wathibitishaji {#validators}

Mthibitishaji pia anaweza kuongezwa kwa hiari kwa mteja wa mwafaka. Programu ya mthibitishaji inaruhusu nodi yako kushiriki kikamilifu katika mwafaka na kuupa mtandao usalama wa kiuchumi wa kificho. Unapata thawabu kwa kazi hii katika ETH. Ili kuendesha mthibitishaji, lazima kwanza uwe na ETH 32, ambazo lazima ziwekwe kwenye mkataba wa amana. Amana inaweza kufanywa kwa kufuata mwongozo wa hatua kwa hatua kwenye [Launchpad](https://launchpad.ethereum.org/). Fanya hivi kwenye kompyuta ya mezani/kompyuta mpakato, lakini usitengeneze funguo — hii inaweza kufanywa moja kwa moja kwenye Raspberry Pi.

Fungua terminali kwenye Raspberry Pi na uendeshe amri ifuatayo ili kutengeneza funguo za amana:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Au pakua [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) ili kuendesha kwenye mashine iliyotengwa na mtandao, na uendeshe amri ya `deposit new-mnemnonic`)

Weka salama fungu la maneno la kukumbuka! Amri iliyo hapo juu ilitengeneza faili mbili katika hifadhi ya funguo ya nodi: funguo za mthibitishaji na faili la data ya amana. Data ya amana inahitaji kupakiwa kwenye launchpad, hivyo lazima inakiliwe kutoka kwenye Raspberry Pi hadi kwenye kompyuta ya mezani/kompyuta mpakato. Hii inaweza kufanywa kwa kutumia muunganisho wa ssh au mbinu nyingine yoyote ya kunakili/kubandika.

Mara tu faili la data ya amana linapopatikana kwenye kompyuta inayoendesha launchpad, linaweza kuburutwa na kudondoshwa kwenye `+` kwenye skrini ya launchpad. Fuata maagizo kwenye skrini ili kutuma muamala kwenye mkataba wa amana.

Ukirudi kwenye Raspberry Pi, mthibitishaji anaweza kuanzishwa. Hii inahitaji kuingiza funguo za mthibitishaji, kuweka anwani ya kukusanya thawabu, na kisha kuanzisha mchakato wa mthibitishaji uliosanidiwa mapema. Mfano ulio hapa chini ni wa Lighthouse—maagizo kwa wateja wengine wa mwafaka yanapatikana kwenye [nyaraka za Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# ingiza funguo za mthibitishaji
lighthouse account validator import --directory=/home/ethereum/validator_keys

# weka anwani ya tuzo
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# anzisha mthibitishaji
sudo systemctl start lighthouse-validator
```

Hongera, sasa una nodi kamili ya Ethereum na mthibitishaji anayeendeshwa kwenye Raspberry Pi!

## Maelezo zaidi {#more-details}

Ukurasa huu umetoa muhtasari wa jinsi ya kuweka nodi ya Geth-Lighthouse na mthibitishaji kwa kutumia Raspberry Pi. Maagizo ya kina zaidi yanapatikana kwenye [tovuti ya Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Maoni yanathaminiwa {#feedback-appreciated}

Tunajua Raspberry Pi ina idadi kubwa ya watumiaji ambayo inaweza kuwa na athari chanya sana kwa afya ya mtandao wa Ethereum.
Tafadhali chimba kwa kina maelezo katika somo hili, jaribu kuendesha kwenye mitandao ya majaribio, angalia GitHub ya Ethereum on Arm, toa maoni, wasilisha matatizo na maombi ya kuvuta na usaidie kuendeleza teknolojia na nyaraka!

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org