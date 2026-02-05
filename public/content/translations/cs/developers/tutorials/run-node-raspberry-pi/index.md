---
title: "Spuštění uzlu Etherea na Raspberry Pi 4"
description: "Flashněte své Raspberry Pi 4, zapojte ethernetový kabel, připojte disk SSD a zapněte zařízení, abyste z Raspberry Pi 4 udělali plnohodnotný uzel Etherea + validátor."
author: "EthereumOnArm"
tags:
  [
    "klienti",
    "exekuční vrstva",
    "konsensuální vrstva",
    "uzly"
  ]
lang: cs
skill: intermediate
published: 2022-06-10
source: Ethereum na ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm je vlastní obraz systému Linux, který může z Raspberry Pi udělat uzel Etherea.**

Pro použití Etherea na Arm a přeměnu Raspberry Pi na uzel Etherea se doporučuje následující hardware:

- Deska Raspberry 4 (model B 8GB), Odroid M1 nebo Rock 5B (8GB/16GB RAM)
- MicroSD karta (minimálně 16 GB, třída 10)
- Minimálně 2TB disk SSD USB 3.0 nebo SSD s pouzdrem USB na SATA.
- Zdroj napájení
- Ethernetový kabel
- Přesměrování portů (další informace najdete u klientů)
- Pouzdro s chladičem a ventilátorem
- USB klávesnice, monitor a kabel HDMI (micro-HDMI) (volitelně)

## Proč provozovat Ethereum na ARM? {#why-run-ethereum-on-arm}

Desky ARM jsou velmi cenově dostupné, flexibilní a malé počítače. Jsou dobrou volbou pro provozování uzlů Etherea, protože je lze levně koupit, nakonfigurovat tak, aby se všechny jejich zdroje soustředily pouze na uzel, což je činí efektivními, spotřebovávají málo energie a jsou fyzicky malé, takže se nenápadně vejdou do každé domácnosti. Je také velmi snadné zprovoznit uzly, protože MicroSD kartu Raspberry Pi lze jednoduše flashnout předpřipraveným obrazem, aniž by bylo nutné stahovat nebo sestavovat software.

## Jak to funguje? {#how-does-it-work}

Paměťová karta Raspberry Pi se flashne předpřipraveným obrazem. Tento obraz obsahuje vše potřebné pro spuštění uzlu Etherea. S flashnutou kartou stačí uživateli pouze zapnout Raspberry Pi. Všechny procesy potřebné ke spuštění uzlu se spustí automaticky. Funguje to proto, že paměťová karta obsahuje operační systém (OS) na bázi Linuxu, na kterém se automaticky spouštějí procesy na úrovni systému, které z jednotky udělají uzel Etherea.

Ethereum nelze provozovat pomocí oblíbeného OS pro Raspberry Pi „Raspbian“, protože Raspbian stále používá 32bitovou architekturu, což způsobuje uživatelům Etherea problémy s pamětí, a konsensuální klienti nepodporují 32bitové binární soubory. Aby se to překonalo, tým Ethereum on Arm přešel na nativní 64bitový OS s názvem „Armbian“.

**Obrazy se postarají o všechny nezbytné kroky**, od nastavení prostředí a formátování disku SSD až po instalaci a spuštění softwaru Etherea a zahájení synchronizace blockchainu.

## Poznámka k exekučním a konsensuálním klientům {#note-on-execution-and-consensus-clients}

Obraz Ethereum on Arm zahrnuje předpřipravené exekuční a konsensuální klienty jako služby. Uzel Etherea vyžaduje, aby byli oba klienti synchronizováni a spuštěni. Stačí si pouze stáhnout a flashnout obraz a poté spustit služby. V obrazu jsou předinstalováni následující exekuční klienti:

- Geth
- Nethermind
- Besu

a následující konsensuální klienti:

- Lighthouse
- Nimbus
- Prysm
- Teku

Měli byste si vybrat po jednom z každého typu – všichni exekuční klienti jsou kompatibilní se všemi konsensuálními klienty. Pokud si klienta explicitně nevyberete, uzel se vrátí ke svým výchozím hodnotám – Geth a Lighthouse – a spustí je automaticky po zapnutí desky. Na routeru musíte otevřít port 30303, aby Geth mohl najít peery a připojit se k nim.

## Stažení obrazu {#downloading-the-image}

Obraz Ethereum pro Raspberry Pi 4 je obraz typu „plug and play“, který automaticky nainstaluje a nastaví exekuční i konsensuální klienty, nakonfiguruje je pro vzájemnou komunikaci a připojení k síti Ethereum. Uživatel musí pouze spustit jejich procesy pomocí jednoduchého příkazu.

Stáhněte si obraz Raspberry Pi z [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) a ověřte haš SHA256:

```sh
# Z adresáře obsahujícího stažený obraz
shasum -a 256 ethonarm_22.04.00.img.zip
# Haš by měl mít výstup: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Upozorňujeme, že obrazy pro desky Rock 5B a Odroid M1 jsou k dispozici na [stránce pro stažení](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) Ethereum-on-Arm.

## Flashování MicroSD {#flashing-the-microsd}

MicroSD karta, která bude použita pro Raspberry Pi, by měla být nejprve vložena do stolního počítače nebo notebooku, aby mohla být flashnuta. Poté následující příkazy v terminálu flashnou stažený obraz na SD kartu:

```shell
# zkontrolujte název MicroSD karty
sudo fdisk -l

>> sdxxx
```

Je opravdu důležité zadat správný název, protože další příkaz obsahuje `dd`, který před nahráním obrazu na kartu zcela vymaže její stávající obsah. Chcete-li pokračovat, přejděte do adresáře obsahujícího zazipovaný obraz:

```shell
# rozbalte a flashněte obraz
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Karta je nyní flashnutá, takže ji lze vložit do Raspberry Pi.

## Spuštění uzlu {#start-the-node}

S SD kartou vloženou do Raspberry Pi připojte ethernetový kabel a SSD a poté zapněte napájení. OS se spustí a automaticky začne provádět předkonfigurované úlohy, které z Raspberry Pi udělají uzel Etherea, včetně instalace a sestavení klientského softwaru. To bude pravděpodobně trvat 10-15 minut.

Jakmile je vše nainstalováno a nakonfigurováno, přihlaste se k zařízení přes ssh připojení nebo přímo pomocí terminálu, pokud je k desce připojen monitor a klávesnice. Pro přihlášení použijte účet `ethereum`, protože má oprávnění potřebná ke spuštění uzlu.

```shell
Uživatel: ethereum
Heslo: ethereum
```

Výchozí exekuční klient, Geth, se spustí automaticky. To můžete potvrdit kontrolou protokolů pomocí následujícího příkazu v terminálu:

```sh
sudo journalctl -u geth -f
```

Konsensuální klient je třeba spustit explicitně. Chcete-li to provést, nejprve na routeru otevřete port 9000, aby Lighthouse mohl najít peery a připojit se k nim. Poté povolte a spusťte službu lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Zkontrolujte klienta pomocí protokolů:

```sh
sudo journalctl -u lighthouse-beacon
```

Všimněte si, že konsensuální klient se synchronizuje během několika minut, protože používá synchronizaci z kontrolního bodu. Exekučnímu klientovi to bude trvat déle – potenciálně několik hodin, a nespustí se, dokud se konsensuální klient nedosynchronizuje (je to proto, že exekuční klient potřebuje cíl, se kterým se synchronizuje, a ten mu poskytne synchronizovaný konsensuální klient).

Se spuštěnými a synchronizovanými službami Geth a Lighthouse je vaše Raspberry Pi nyní uzlem Etherea! Nejběžnější způsob interakce se sítí Ethereum je pomocí javascriptové konzole Geth, kterou lze připojit ke klientovi Geth na portu 8545. Je také možné odesílat příkazy formátované jako objekty JSON pomocí nástroje pro požadavky, jako je Curl. Více informací naleznete v [dokumentaci Geth](https://geth.ethereum.org/).

Geth je předkonfigurován tak, aby hlásil metriky na řídicí panel Grafana, který lze zobrazit v prohlížeči. Pokročilejší uživatelé mohou chtít tuto funkci využít ke sledování stavu svého uzlu přechodem na `ipaddress:3000` a zadáním `user: admin` a `passwd: ethereum`.

## Validátoři {#validators}

K konsensuálnímu klientovi lze volitelně přidat také validátor. Software validátoru umožňuje vašemu uzlu aktivně se podílet na konsensu a poskytuje síti kryptoekonomickou bezpečnost. Za tuto práci dostanete odměnu v ETH. Abyste mohli spustit validátor, musíte mít nejprve 32 ETH, které musí být vloženy do vkladové smlouvy. Vklad lze provést podle podrobného průvodce na [Launchpadu](https://launchpad.ethereum.org/). Udělejte to na stolním počítači/notebooku, ale negenerujte klíče — to lze provést přímo na Raspberry Pi.

Otevřete terminál na Raspberry Pi a spuštěním následujícího příkazu vygenerujte vkladové klíče:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Nebo si stáhněte [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) pro spuštění na air-gapped zařízení a spusťte příkaz `deposit new-mnemnonic`)

Uchovejte mnemotechnickou frázi v bezpečí! Výše uvedený příkaz vygeneroval v úložišti klíčů uzlu dva soubory: klíče validátoru a soubor s daty vkladu. Data vkladu je třeba nahrát do Launchpadu, takže je nutné je zkopírovat z Raspberry Pi do stolního počítače/notebooku. To lze provést pomocí ssh připojení nebo jakoukoli jinou metodou kopírování a vkládání.

Jakmile je soubor s daty vkladu k dispozici na počítači, na kterém běží Launchpad, lze jej přetáhnout na `+` na obrazovce Launchpadu. Podle pokynů na obrazovce odešlete transakci do vkladové smlouvy.

Zpět na Raspberry Pi lze spustit validátor. To vyžaduje import klíčů validátoru, nastavení adresy pro sběr odměn a následné spuštění předkonfigurovaného procesu validátoru. Níže uvedený příklad je pro Lighthouse – pokyny pro ostatní konsensuální klienti jsou k dispozici v [dokumentaci Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# importujte klíče validátoru
lighthouse account validator import --directory=/home/ethereum/validator_keys

# nastavte adresu pro odměny
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# spusťte validátor
sudo systemctl start lighthouse-validator
```

Gratulujeme, nyní máte na Raspberry Pi spuštěný plnohodnotný uzel Etherea a validátor!

## Další podrobnosti {#more-details}

Tato stránka poskytla přehled o tom, jak nastavit uzel a validátor Geth-Lighthouse pomocí Raspberry Pi. Podrobnější pokyny jsou k dispozici na [webu Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Zpětná vazba je vítána {#feedback-appreciated}

Víme, že Raspberry Pi má obrovskou uživatelskou základnu, která by mohla mít velmi pozitivní dopad na zdraví sítě Ethereum.
Projděte si prosím podrobnosti v tomto návodu, vyzkoušejte spuštění na testnetech, podívejte se na GitHubu na Ethereum on Arm, poskytněte zpětnou vazbu, nahlašujte problémy a posílejte pull requesty a pomozte tak posunout technologii a dokumentaci!

## Odkazy {#references}

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
