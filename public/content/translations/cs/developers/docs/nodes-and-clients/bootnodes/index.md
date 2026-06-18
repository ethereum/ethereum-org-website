---
title: Úvod do zaváděcích uzlů Etherea
description: Základní informace, které potřebujete k pochopení zaváděcích uzlů
lang: cs
---

Když se nový uzel připojí do sítě Ethereum, musí se připojit k uzlům, které již v síti jsou, aby mohl následně objevit nové peery. Tyto vstupní body do sítě Ethereum se nazývají zaváděcí uzly. Klienti mají obvykle seznam zaváděcích uzlů pevně zakódovaný. Tyto zaváděcí uzly obvykle provozuje devops tým Nadace Ethereum nebo samotné týmy klientů. Všimněte si, že zaváděcí uzly nejsou totéž co statické uzly. Statické uzly jsou volány znovu a znovu, zatímco zaváděcí uzly jsou volány pouze tehdy, pokud není k dispozici dostatek peerů pro připojení a uzel potřebuje navázat nějaká nová spojení.

## Připojení k zaváděcímu uzlu {#connect-to-a-bootnode}

Většina klientů má seznam zaváděcích uzlů zabudovaný, ale možná budete chtít provozovat svůj vlastní zaváděcí uzel nebo použít takový, který není součástí pevně zakódovaného seznamu klienta. V takovém případě je můžete specifikovat při spouštění klienta následovně (příklad je pro Geth, zkontrolujte prosím dokumentaci vašeho klienta):

```
geth --bootnodes "enode://<ID uzlu>@<IP adresa>:<port>"
```

## Provozování zaváděcího uzlu {#run-a-bootnode}

Zaváděcí uzly jsou plné uzly, které nejsou za NAT ([Network Address Translation](https://www.geeksforgeeks.org/network-address-translation-nat/)). Každý plný uzel může fungovat jako zaváděcí uzel, pokud je veřejně dostupný.

Když spustíte uzel, měl by do logu zaznamenat váš [enode](/developers/docs/networking-layer/network-addresses/#enode), což je veřejný identifikátor, který mohou ostatní použít k připojení k vašemu uzlu.

Enode se obvykle při každém restartu generuje znovu, takže se nezapomeňte podívat do dokumentace vašeho klienta, jak vygenerovat trvalý enode pro váš zaváděcí uzel.

Aby byl zaváděcí uzel dobrý, je vhodné zvýšit maximální počet peerů, kteří se k němu mohou připojit. Provozování zaváděcího uzlu s mnoha peery významně zvýší nároky na šířku pásma.

## Dostupné zaváděcí uzly {#available-bootnodes}

Seznam zabudovaných zaváděcích uzlů v rámci go-ethereum naleznete [zde](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Tyto zaváděcí uzly spravuje Nadace Ethereum a tým go-ethereum.

K dispozici jsou i další seznamy zaváděcích uzlů spravované dobrovolníky. Ujistěte se prosím, že vždy zahrnete alespoň jeden oficiální zaváděcí uzel, jinak byste se mohli stát obětí eclipse útoku.