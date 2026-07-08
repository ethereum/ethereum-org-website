---
title: "Spuštění uzlu Etherea na Raspberry Pi 4"
description: "Nahrajte obraz na Raspberry Pi 4, zapojte ethernetový kabel, připojte SSD disk a zapněte zařízení, abyste z Raspberry Pi 4 udělali plnohodnotný uzel Etherea a validátor."
author: "EthereumOnArm"
tags: ["klienti", "exekuční vrstva", "konsensuální vrstva", "uzly"]
lang: cs
skill: intermediate
breadcrumb: Uzel na Raspberry Pi
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm je vlastní obraz Linuxu, který dokáže proměnit Raspberry Pi v uzel Etherea.**

Pro použití Ethereum on Arm k přeměně Raspberry Pi na uzel Etherea se doporučuje následující hardware:

- Deska Raspberry Pi 4 (model B 8GB), Odroid M1 nebo Rock 5B (8GB/16GB RAM)
- MicroSD karta (minimálně 16 GB Class 10)
- SSD disk s kapacitou minimálně 2 TB (USB 3.0) nebo SSD s adaptérem USB na SATA.
- Napájecí zdroj
- Ethernetový kabel
- Přesměrování portů (port forwarding) (další informace viz klienti)
- Pouzdro s chladičem a ventilátorem
- USB klávesnice, monitor a HDMI kabel (micro-HDMI) (volitelné)

## Proč provozovat Ethereum na ARM? {#why-run-ethereum-on-arm}

Desky ARM jsou velmi cenově dostupné, flexibilní a malé počítače. Jsou dobrou volbou pro provozování uzlů Etherea, protože se dají pořídit levně, lze je nakonfigurovat tak, aby se všechny jejich zdroje soustředily pouze na uzel, což je činí efektivními, mají nízkou spotřebu energie a jsou fyzicky malé, takže se nenápadně vejdou do každé domácnosti. Spouštění uzlů je také velmi snadné, protože na MicroSD kartu Raspberry Pi lze jednoduše nahrát předpřipravený obraz, aniž by bylo nutné stahovat nebo sestavovat software.

## Jak to funguje? {#how-does-it-work}

Na paměťovou kartu Raspberry Pi se nahraje předpřipravený obraz. Tento obraz obsahuje vše potřebné k provozu uzlu Etherea. S nahranou kartou stačí uživateli pouze zapnout Raspberry Pi. Všechny procesy potřebné k běhu uzlu se spustí automaticky. Funguje to tak, že paměťová karta obsahuje operační systém (OS) založený na Linuxu, nad kterým se automaticky spouštějí procesy na systémové úrovni, které ze zařízení udělají uzel Etherea.

Ethereum nelze provozovat pomocí populárního linuxového OS pro Raspberry Pi „Raspbian“, protože Raspbian stále používá 32bitovou architekturu, což vede uživatele Etherea k problémům s pamětí a konsensuální klienti nepodporují 32bitové binární soubory. K překonání tohoto problému přešel tým Ethereum on Arm na nativní 64bitový OS s názvem „Armbian“.

**Obrazy se postarají o všechny nezbytné kroky**, od nastavení prostředí a formátování SSD disku až po instalaci a spuštění softwaru Etherea a zahájení synchronizace blockchainu.

## Poznámka k exekučním a konsensuálním klientům {#note-on-execution-and-consensus-clients}

Obraz Ethereum on Arm obsahuje předpřipravené exekuční a konsensuální klienty jako služby. Uzel Etherea vyžaduje, aby oba klienti byli synchronizováni a běželi. Stačí pouze stáhnout a nahrát obraz a poté spustit služby. Obraz má předinstalované následující exekuční klienty:

- Geth
- Nethermind
- Besu

a následující konsensuální klienty:

- Lighthouse
- Nimbus
- Prysm
- Teku

Měli byste si vybrat od každého jednoho, kterého spustíte – všichni exekuční klienti jsou kompatibilní se všemi konsensuálními klienty. Pokud klienta výslovně nevyberete, uzel se vrátí ke svým výchozím hodnotám – Geth a Lighthouse – a spustí je automaticky po zapnutí desky. Na svém routeru musíte otevřít port 30303, aby Geth mohl najít a připojit se k ostatním uzlům (peers).

## Stažení obrazu {#downloading-the-image}

Obraz Etherea pro Raspberry Pi 4 je typu „plug and play“, který automaticky nainstaluje a nastaví exekučního i konsensuálního klienta a nakonfiguruje je tak, aby spolu komunikovali a připojili se k síti Ethereum. Vše, co uživatel musí udělat, je spustit jejich procesy pomocí jednoduchého příkazu.

Stáhněte si obraz pro Raspberry Pi z [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) a ověřte hash SHA-256:

```sh
# Z adresáře obsahujícího stažený obraz
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash by měl vypsat: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Vezměte na vědomí, že obrazy pro desky Rock 5B a Odroid M1 jsou k dispozici na [stránce pro stahování](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) Ethereum-on-Arm.

## Nahrání na MicroSD kartu {#flashing-the-microsd}

MicroSD karta, která se bude používat pro Raspberry Pi, by měla být nejprve vložena do stolního počítače nebo notebooku, aby na ni mohl být nahrán obraz. Poté následující příkazy terminálu nahrají stažený obraz na SD kartu:

```shell
# zkontrolujte název MicroSD karty
sudo fdisk -l

>> sdxxx
```

Je opravdu důležité zadat správný název, protože další příkaz obsahuje `dd`, což zcela vymaže stávající obsah karty před nahráním obrazu. Chcete-li pokračovat, přejděte do adresáře obsahujícího zazipovaný obraz:

```shell
# rozbalte a zapište obraz
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Karta je nyní nahrána, takže ji lze vložit do Raspberry Pi.

## Spuštění uzlu {#start-the-node}

S vloženou SD kartou do Raspberry Pi připojte ethernetový kabel a SSD disk a poté zapněte napájení. OS se nabootuje a automaticky začne provádět předkonfigurované úlohy, které z Raspberry Pi udělají uzel Etherea, včetně instalace a sestavení klientského softwaru. To bude pravděpodobně trvat 10–15 minut.

Jakmile je vše nainstalováno a nakonfigurováno, přihlaste se k zařízení přes SSH připojení nebo přímo pomocí terminálu, pokud je k desce připojen monitor a klávesnice. K přihlášení použijte účet `ethereum`, protože ten má oprávnění potřebná ke spuštění uzlu.

```shell
User: ethereum
Password: ethereum
```

Výchozí exekuční klient, Geth, se spustí automaticky. Můžete to potvrdit kontrolou logů pomocí následujícího příkazu v terminálu:

```sh
sudo journalctl -u geth -f
```

Konsensuální klient musí být spuštěn explicitně. Chcete-li to provést, nejprve na svém routeru otevřete port 9000, aby Lighthouse mohl najít a připojit se k ostatním uzlům. Poté povolte a spusťte službu Lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Zkontrolujte klienta pomocí logů:

```sh
sudo journalctl -u lighthouse-beacon
```

Vezměte na vědomí, že konsensuální klient se synchronizuje během několika minut, protože používá synchronizaci přes kontrolní bod (checkpoint sync). Exekučnímu klientovi to bude trvat déle – potenciálně několik hodin, a nespustí se, dokud konsensuální klient nedokončí synchronizaci (je to proto, že exekuční klient potřebuje cíl pro synchronizaci, který poskytuje synchronizovaný konsensuální klient).

S běžícími a synchronizovanými službami Geth a Lighthouse je nyní vaše Raspberry Pi uzlem Etherea! Nejběžnější je interakce se sítí Ethereum pomocí JavaScriptové konzole Gethu, kterou lze připojit ke klientovi Geth na portu 8545. Je také možné odesílat příkazy formátované jako objekty JSON pomocí nástroje pro požadavky, jako je Curl. Více informací najdete v [dokumentaci Gethu](https://geth.ethereum.org/).

Geth je předkonfigurován tak, aby hlásil metriky do řídicího panelu Grafana, který lze zobrazit v prohlížeči. Pokročilejší uživatelé mohou chtít tuto funkci využít ke sledování stavu svého uzlu tak, že přejdou na `ipaddress:3000` a zadají `user: admin` a `passwd: ethereum`.

## Validátory {#validators}

Ke konsensuálnímu klientovi lze volitelně přidat také validátor. Software validátoru umožňuje vašemu uzlu aktivně se účastnit konsensu a poskytuje síti kryptoekonomickou bezpečnost. Za tuto práci jste odměňováni v ETH. Chcete-li provozovat validátor, musíte mít nejprve 32 ETH, které musí být vloženy do depozitního kontraktu. Vklad lze provést podle podrobného průvodce na [Launchpadu](https://launchpad.ethereum.org/). Udělejte to na stolním počítači/notebooku, ale negenerujte klíče — to lze provést přímo na Raspberry Pi.

Otevřete terminál na Raspberry Pi a spuštěním následujícího příkazu vygenerujte depozitní klíče:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Nebo si stáhněte [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) pro spuštění na počítači odpojeném od sítě (airgapped) a spusťte příkaz `deposit new-mnemnonic`)

Uchovávejte mnemotechnickou frázi v bezpečí! Výše uvedený příkaz vygeneroval dva soubory v úložišti klíčů uzlu: klíče validátoru a soubor s údaji o vkladu. Údaje o vkladu je nutné nahrát do Launchpadu, takže je nutné je zkopírovat z Raspberry Pi do stolního počítače/notebooku. To lze provést pomocí SSH připojení nebo jakoukoli jinou metodou kopírování a vkládání.

Jakmile je soubor s údaji o vkladu k dispozici na počítači, na kterém běží Launchpad, lze jej přetáhnout na `+` na obrazovce Launchpadu. Postupujte podle pokynů na obrazovce a odešlete transakci do depozitního kontraktu.

Zpět na Raspberry Pi lze spustit validátor. To vyžaduje import klíčů validátoru, nastavení adresy pro shromažďování odměn a následné spuštění předkonfigurovaného procesu validátoru. Níže uvedený příklad je pro Lighthouse — pokyny pro ostatní konsensuální klienty jsou k dispozici v [dokumentaci Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

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

Tato stránka poskytla přehled o tom, jak nastavit uzel Geth-Lighthouse a validátor pomocí Raspberry Pi. Podrobnější pokyny jsou k dispozici na [webu Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Zpětná vazba je vítána {#feedback-appreciated}

Víme, že Raspberry Pi má obrovskou uživatelskou základnu, která by mohla mít velmi pozitivní dopad na zdraví sítě Ethereum.
Ponořte se prosím do podrobností v tomto tutoriálu, zkuste jej spustit na testovacích sítích (testnets), podívejte se na GitHub Ethereum on Arm, poskytněte zpětnou vazbu, nahlaste problémy (issues), vytvořte pull requesty a pomozte posunout technologii a dokumentaci kupředu!

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org