---
title: "Úvod do Ethereum bootnodů"
description: "Základní informace, které potřebujete k pochopení bootnodů"
lang: cs
---

Když se nový uzel připojí k síti Ethereum, musí se spojit s uzly, které již v síti jsou, aby mohl objevit další peery. Těmto vstupním bodům do sítě Ethereum se říká bootnody. Klienti v sobě mají obvykle pevně zakódovaný seznam bootnodů. Tyto bootnody jsou obvykle provozovány devops týmem nadace Ethereum nebo samotnými týmy klientů. Všimněte si, že bootnody nejsou totéž co statické uzly. Statické uzly jsou volány stále dokola, zatímco bootnody jsou volány pouze v případě, že není dostatek peerů pro připojení a uzel potřebuje navázat některá nová spojení.

## Připojení k bootnodu {#connect-to-a-bootnode}

Většina klientů má v sobě zabudovaný seznam bootnodů, ale možná budete chtít provozovat vlastní bootnode nebo použít takový, který není součástí pevně zakódovaného seznamu klienta. V takovém případě je můžete určit při spouštění vašeho klienta následujícím způsobem (příklad je pro Geth, podívejte se prosím do dokumentace vašeho klienta):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Provozování bootnodu {#run-a-bootnode}

Bootnody jsou plnohodnotné uzly, které nejsou za NAT ([překlad síťových adres](https://www.geeksforgeeks.org/network-address-translation-nat/)). Každý plnohodnotný uzel může fungovat jako bootnode, pokud je veřejně dostupný.

Když spustíte uzel, měl by se vám zobrazit váš [enode](/developers/docs/networking-layer/network-addresses/#enode), což je veřejný identifikátor, který mohou ostatní použít k připojení k vašemu uzlu.

Enode se obvykle regeneruje při každém restartu, takže se podívejte do dokumentace vašeho klienta, jak vygenerovat trvalý enode pro váš bootnode.

Abyste byli dobrým bootnodem, je dobré navýšit maximální počet peerů, kteří se k němu mohou připojit. Provozování bootnodu s mnoha peery výrazně zvýší nároky na šířku pásma.

## Dostupné bootnody {#available-bootnodes}

Seznam vestavěných bootnodů v go-ethereum naleznete [zde](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Tyto bootnody jsou spravovány nadací Ethereum a týmem go-ethereum.

K dispozici jsou i další seznamy bootnodů spravované dobrovolníky. Ujistěte se prosím, že vždy zahrnete alespoň jeden oficiální bootnode, jinak byste se mohli stát obětí eclipse útoku.
