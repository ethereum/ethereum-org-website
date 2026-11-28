---
title: "Spusťte uzel Etherea na Raspberry Pi 5"
description: "Nahrajte obraz na Raspberry Pi 5, zapojte ethernetový kabel, připojte NVMe disk a zapněte zařízení, abyste z Raspberry Pi 5 udělali plnohodnotný uzel Etherea a validátor."
author: "EthereumOnArm"
tags: ["klienti", "exekuční vrstva", "konsensuální vrstva", "uzly"]
lang: cs
skill: intermediate
breadcrumb: Uzel na Raspberry Pi
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm je vlastní obraz systému Linux, který dokáže z Raspberry Pi udělat uzel Etherea.**

K použití Ethereum on Arm pro přeměnu Raspberry Pi na uzel Etherea se doporučuje následující hardware:

- Raspberry Pi 5 s 16 GB RAM
- NVMe HAT pro Raspberry Pi 5 k připojení NVMe disku
- NVMe SSD (M.2 2280), minimálně 4 TB. Vyhněte se diskům s řadičem Phison, které mají známé problémy s kompatibilitou.
- MicroSD karta (minimálně 16 GB Class 10)
- Napájecí zdroj
- Ethernetový kabel
- Přesměrování portů (port forwarding) (další informace najdete u klientů)
- Pouzdro s chladičem
- USB klávesnice, monitor a HDMI kabel (micro-HDMI) (volitelné)

Ethereum on Arm podporuje také další desky ARM, jako jsou NanoPC T6, Rock 5B a Orange Pi 5 Plus. Tyto desky mají nativní podporu NVMe, takže je tým Ethereum on Arm doporučuje spíše než Raspberry Pi 5, pokud kupujete nový hardware. Podrobnosti najdete v [seznamu doporučeného hardwaru](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html). Zbytek tohoto návodu je stejný pro všechny podporované desky, s výjimkou souboru obrazu, který stahujete.

## Proč provozovat Ethereum na ARM? {#why-run-ethereum-on-arm}

Desky ARM jsou velmi cenově dostupné, flexibilní a malé počítače. Jsou dobrou volbou pro provozování uzlů Etherea, protože se dají pořídit levně, lze je nakonfigurovat tak, aby se všechny jejich zdroje soustředily pouze na uzel, což je činí efektivními, mají nízkou spotřebu energie a jsou fyzicky malé, takže se nenápadně vejdou do každé domácnosti. Spouštění uzlů je také velmi snadné, protože na MicroSD kartu Raspberry Pi lze jednoduše nahrát předpřipravený obraz, aniž by bylo nutné stahovat nebo sestavovat software.

## Jak to funguje? {#how-does-it-work}

Na paměťovou kartu Raspberry Pi se nahraje předpřipravený obraz. Tento obraz obsahuje vše potřebné ke spuštění uzlu Etherea. S nahranou kartou stačí uživateli pouze zapnout Raspberry Pi. Všechny procesy potřebné ke spuštění uzlu se spustí automaticky. Funguje to proto, že paměťová karta obsahuje operační systém (OS) založený na Linuxu, nad kterým se automaticky spouštějí procesy na systémové úrovni, které z jednotky udělají uzel Etherea.

Obrazy Ethereum on Arm jsou založeny na 64bitové distribuci Linuxu, která je optimalizována pro provoz uzlu Etherea, a obsahují předpřipravené klienty Etherea.

**Obrazy se postarají o všechny nezbytné kroky**, od nastavení prostředí a formátování NVMe disku až po instalaci softwaru Etherea.

## Poznámka k exekučním a konsensuálním klientům {#note-on-execution-and-consensus-clients}

Obraz Ethereum on Arm obsahuje předpřipravené exekuční a konsensuální klienty jako služby. Uzel Etherea vyžaduje, aby byli oba klienti synchronizováni a spuštěni. Stačí pouze stáhnout a nahrát obraz a poté spustit služby. Obraz má předinstalováno několik exekučních klientů (jako jsou Geth, Nethermind, Besu, Erigon a Reth) a konsensuálních klientů (jako jsou Lighthouse, Prysm, Teku, Nimbus a Lodestar). Aktuální seznam najdete v [dokumentaci Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html).

Měli byste si vybrat od každého jednoho, kterého spustíte – všichni exekuční klienti jsou kompatibilní se všemi konsensuálními klienty. Tento návod používá Geth a Lighthouse.

## Stažení obrazu {#downloading-the-image}

Obraz Ethereum on Arm je obraz typu „plug and play“, který automaticky nainstaluje a nastaví exekučního i konsensuálního klienta a nakonfiguruje je tak, aby spolu komunikovali a připojili se k síti Ethereum. Vše, co uživatel musí udělat, je spustit jejich procesy pomocí jednoduchého příkazu.

Stáhněte si nejnovější obraz pro vaši desku ze [stránky pro stahování Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads). Stránka pro stahování také uvádí kontrolní součet SHA-256 každého obrazu. Ověřte stažený soubor podle něj:

```sh
# Z adresáře obsahujícího stažený obraz
sha256sum ethonarm_rpi5_<version>.img.zip
# Porovnejte výstup s kontrolním součtem na stránce pro stažení
```

## Nahrání na MicroSD {#flashing-the-microsd}

MicroSD karta, která se bude používat pro Raspberry Pi, by měla být nejprve vložena do stolního počítače nebo notebooku, aby na ni mohl být nahrán obraz. Následující příkazy terminálu pak nahrají stažený obraz na SD kartu:

```shell
# zkontrolujte název MicroSD karty
sudo fdisk -l

>> sdxxx
```

Je opravdu důležité zadat název správně, protože další příkaz obsahuje `dd`, což zcela vymaže stávající obsah karty před nahráním obrazu na ni. Chcete-li pokračovat, přejděte do adresáře obsahujícího zazipovaný obraz:

```shell
# rozbalte a zapište obraz
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Karta je nyní nahraná, takže ji lze vložit do Raspberry Pi.

## Spuštění uzlu {#start-the-node}

S SD kartou vloženou do Raspberry Pi připojte ethernetový kabel a NVMe disk a poté zapněte napájení. OS se spustí a automaticky začne provádět předkonfigurované úlohy, které z Raspberry Pi udělají uzel Etherea, včetně formátování NVMe disku a instalace klientského softwaru. To bude pravděpodobně trvat 10–15 minut a po dokončení se deska automaticky restartuje. Během této doby nepřerušujte napájení.

Jakmile je vše nainstalováno a nakonfigurováno, přihlaste se k zařízení přes SSH připojení nebo přímo pomocí terminálu, pokud je k desce připojen monitor a klávesnice. K přihlášení použijte účet `ethereum`, protože má oprávnění potřebná ke spuštění uzlu.

```shell
User: ethereum
Password: ethereum
```

Při prvním přihlášení budete vyzváni ke změně výchozího hesla. Udělejte to, protože kdokoli, kdo se může dostat k vašemu uzlu, by se jinak mohl přihlásit pomocí výchozího hesla. Systémový firewall je ve výchozím nastavení zakázán, takže pokud má váš uzel veřejnou IP adresu, podívejte se do [průvodce zabezpečením Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html), jak jej povolit.

Nejprve spusťte konsensuálního klienta. Otevřete port 9000 (TCP a UDP) na svém routeru, aby Lighthouse mohl najít a připojit se k peerům. Poté povolte a spusťte službu lighthouse, aby se restartovala i po restartu systému:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Zkontrolujte klienta pomocí logů:

```sh
sudo journalctl -u lighthouse-beacon -f
```

Dále spusťte exekučního klienta. Otevřete port 30303 (TCP a UDP) na svém routeru, aby Geth mohl najít a připojit se k peerům. Poté povolte a spusťte službu geth:

```sh
sudo systemctl enable --now geth
```

Můžete potvrdit, že běží, kontrolou logů:

```sh
sudo journalctl -u geth -f
```

Vezměte na vědomí, že konsensuální klient se synchronizuje za několik minut, protože používá synchronizaci pomocí kontrolních bodů (checkpoint sync). Exekučnímu klientovi to bude trvat déle – potenciálně několik hodin. Oba klienti běží současně: konsensuální klient řekne exekučnímu klientovi, který blok je na vrcholu řetězce, a exekuční klient stáhne a ověří bloky až k němu.

S běžícími a synchronizovanými službami Geth a Lighthouse je nyní vaše Raspberry Pi uzlem Etherea! Nejběžnější je interakce se sítí Ethereum pomocí konzole JavaScriptu klienta Geth, kterou lze připojit ke klientovi Geth na portu 8545. Je také možné odesílat příkazy formátované jako objekty JSON pomocí nástroje pro požadavky, jako je Curl. Více najdete v [dokumentaci Geth](https://geth.ethereum.org/).

Obraz také obsahuje řídicí panel Grafana, který mohou pokročilejší uživatelé použít ke sledování stavu svého uzlu tak, že v prohlížeči přejdou na `ipaddress:3000`.

## Validátory {#validators}

Ke konsensuálnímu klientovi lze volitelně přidat také validátor. Software validátoru umožňuje vašemu uzlu aktivně se účastnit konsensu a poskytuje síti kryptoekonomickou bezpečnost. Za tuto práci jste odměňováni v ETH. Chcete-li provozovat validátor, musíte mít nejprve 32 ETH, které musí být vloženy do depozitního kontraktu. Vklad lze provést podle podrobného průvodce na [Launchpadu](https://launchpad.ethereum.org/). Udělejte to na stolním počítači/notebooku, ale negenerujte klíče — to lze provést přímo na Raspberry Pi.

Nástroj [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) generuje klíče validátoru. Aktuální obrazy jej obsahují; pokud používáte starší obraz, nejprve jej nainstalujte. Poté vygenerujte depozitní klíče a nahraďte `<YOUR_ETH_ADDRESS>` adresou, která by měla přijímat vaše výběry:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Nebo si stáhněte [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) pro spuštění na počítači odpojeném od sítě (airgapped) a spusťte tam příkaz `deposit new-mnemonic`)

Uchovávejte mnemotechnickou frázi v bezpečí! Výše uvedený příkaz vygeneroval dva soubory v adresáři `validator_keys`: klíče validátoru a soubor s daty o vkladu. Data o vkladu je třeba nahrát do Launchpadu, takže je nutné je zkopírovat z Raspberry Pi do stolního počítače/notebooku. To lze provést pomocí SSH připojení nebo jakékoli jiné metody kopírování a vkládání.

Jakmile je soubor s daty o vkladu k dispozici na počítači, na kterém běží Launchpad, lze jej přetáhnout na `+` na obrazovce Launchpadu. Postupujte podle pokynů na obrazovce a odešlete transakci do depozitního kontraktu.

Zpět na Raspberry Pi lze spustit validátor. To vyžaduje import klíčů validátoru, nastavení adresy pro shromažďování odměn a následné spuštění předkonfigurovaného procesu validátoru. Níže uvedený příklad je pro Lighthouse — pokyny pro ostatní konsensuální klienty jsou k dispozici v [dokumentaci Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html):

```shell
# importujte klíče validátoru
lighthouse account validator import --directory=/home/ethereum/validator_keys

# nastavte adresu pro odměny (nahraďte <YOUR_ETH_ADDRESS> svou adresou)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# spusťte validátor
sudo systemctl enable --now lighthouse-validator
```

Gratulujeme, nyní máte na Raspberry Pi spuštěný plnohodnotný uzel Etherea a validátor!

## Další podrobnosti {#more-details}

Tato stránka poskytla přehled o tom, jak nastavit uzel Geth-Lighthouse a validátor pomocí Raspberry Pi. Podrobnější pokyny jsou k dispozici na [webu Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Zpětná vazba je vítána {#feedback-appreciated}

Víme, že Raspberry Pi má obrovskou uživatelskou základnu, která by mohla mít velmi pozitivní dopad na zdraví sítě Ethereum.
Prosím, ponořte se do detailů v tomto návodu, zkuste jej spustit na testovacích sítích, podívejte se na [GitHub Ethereum on Arm](https://github.com/EOA-Blockchain-Labs/ethereumonarm), poskytněte zpětnou vazbu, nahlaste problémy (issues), vytvořte pull requesty a pomozte posunout technologii a dokumentaci kupředu!

## Odkazy {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
