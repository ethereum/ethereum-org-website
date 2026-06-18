---
title: "Odměny a penalizace v Proof-of-Stake"
description: "Přečtěte si o pobídkách v protokolu Etherea s mechanismem Proof-of-Stake."
lang: cs
---

[Ethereum](/) je zabezpečeno pomocí své nativní kryptoměny, etheru (ETH). Provozovatelé uzlů, kteří se chtějí podílet na validaci bloků a určování hlavy řetězce, vloží ether do [depozitního kontraktu](/staking/deposit-contract/) na Ethereu. Následně jsou placeni v etheru za provozování softwaru validátoru, který kontroluje platnost nových bloků přijatých přes peer-to-peer síť a aplikuje algoritmus volby forku k určení hlavy řetězce.

Validátor má dvě hlavní role: 1) kontrolu nových bloků a jejich „atestaci“, pokud jsou platné, 2) navrhování nových bloků, když je náhodně vybrán z celkové skupiny validátorů. Pokud validátor některý z těchto úkolů na vyžádání nesplní, přijde o výplatu v etheru. Validátoři jsou také někdy pověřeni agregací podpisů a účastí v synchronizačních komisích.

Existují také určité akce, které je velmi obtížné provést omylem a které naznačují škodlivý záměr, jako je navržení více bloků pro stejný slot nebo atestace více bloků pro stejný slot. Jedná se o chování, které lze „penalizovat“ (slashable), což vede k tomu, že je validátorovi spáleno určité množství etheru (až 1 ETH), než je ze sítě odstraněn, což trvá 36 dní. Ether penalizovaného validátoru během období výstupu pomalu mizí, ale 18. den obdrží „korelační penalizaci“, která je tím větší, čím více validátorů je penalizováno ve stejnou dobu. Struktura pobídek mechanismu konsensu proto odměňuje poctivost a trestá špatné aktéry.

Všechny odměny a penalizace se uplatňují jednou za epochu.

Čtěte dále pro více podrobností...

## Odměny a penalizace {#rewards}

### Odměny {#rewards-2}

Validátoři dostávají odměny, když odevzdají hlasy, které jsou v souladu s většinou ostatních validátorů, když navrhují bloky a když se účastní synchronizačních komisí. Hodnota odměn v každé epoše se vypočítává z `base_reward`. To je základní jednotka, ze které se počítají ostatní odměny. `base_reward` představuje průměrnou odměnu, kterou validátor obdrží za optimálních podmínek za epochu. Vypočítá se z efektivního zůstatku validátoru a celkového počtu aktivních validátorů takto:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

kde `base_reward_factor` je 64, `base_rewards_per_epoch` je 4 a `sum(active balance)` je celkový ether ve staku napříč všemi aktivními validátory.

To znamená, že základní odměna je úměrná efektivnímu zůstatku validátoru a nepřímo úměrná počtu validátorů v síti. Čím více validátorů, tím větší je celková emise (jako `sqrt(N)`), ale tím menší je `base_reward` na validátora (jako `1/sqrt(N)`). Tyto faktory ovlivňují APR pro staking uzel. Přečtěte si zdůvodnění v [poznámkách od Vitalika](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

Celková odměna se pak vypočítá jako součet pěti složek, z nichž každá má váhu, která určuje, jak moc každá složka přispívá k celkové odměně. Tyto složky jsou:

```
1. source vote: validátor včas odevzdal hlas pro správný zdrojový checkpoint
2. target vote: validátor včas odevzdal hlas pro správný cílový checkpoint
3. head vote: validátor včas odevzdal hlas pro správný blok hlavy
4. sync committee reward: validátor se zúčastnil synchronizační komise
5. proposer reward: validátor navrhl blok ve správném slotu
```

Váhy pro každou složku jsou následující:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Součet těchto vah je 64. Odměna se vypočítá jako součet příslušných vah vydělený 64. Validátor, který včas odevzdal hlasy pro zdroj, cíl a hlavu, navrhl blok a zúčastnil se synchronizační komise, by mohl obdržet `64/64 * base_reward == base_reward`. Validátor však obvykle není navrhovatelem bloku, takže jeho maximální odměna je `64-8 /64 * base_reward == 7/8 * base_reward`. Validátoři, kteří nejsou navrhovateli bloků ani nejsou v synchronizační komisi, mohou obdržet `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

K motivaci k rychlým atestacím se přidává další odměna. Tou je `inclusion_delay_reward`. Její hodnota se rovná `base_reward` vynásobené `1/delay`, kde `delay` je počet slotů oddělujících návrh bloku a atestaci. Pokud je například atestace odeslána do jednoho slotu od návrhu bloku, atestující obdrží `base_reward * 1/1 == base_reward`. Pokud atestace dorazí v dalším slotu, atestující obdrží `base_reward * 1/2` a tak dále.

Navrhovatelé bloků obdrží `8 / 64 * base_reward` za **každou platnou atestaci** zahrnutou v bloku, takže skutečná hodnota odměny se úměrně zvyšuje s počtem atestujících validátorů. Navrhovatelé bloků mohou také zvýšit svou odměnu tím, že do svého navrhovaného bloku zahrnou důkazy o špatném chování jiných validátorů. Tyto odměny jsou „cukrem“, který podporuje poctivost validátorů. Navrhovatel bloku, který zahrne penalizaci (slashing), bude odměněn pomocí `slashed_validators_effective_balance / 512`.

### Penalizace {#penalties}

Dosud jsme uvažovali o dokonale se chovajících validátorech, ale co validátoři, kteří neodevzdají včas hlasy pro hlavu, zdroj a cíl, nebo tak činí pomalu?

Penalizace za zmeškání hlasů pro cíl a zdroj se rovnají odměnám, které by atestující obdržel, kdyby je odeslal. To znamená, že místo toho, aby se jim odměna přičetla k zůstatku, je jim ze zůstatku odečtena stejná hodnota. Za zmeškání hlasu pro hlavu neexistuje žádná penalizace (tj. hlasy pro hlavu jsou pouze odměňovány, nikdy penalizovány). S `inclusion_delay` není spojena žádná penalizace – odměna se jednoduše nepřičte k zůstatku validátoru. Neexistuje ani žádná penalizace za nenavržení bloku.

Přečtěte si více o odměnách a penalizacích ve [specifikacích konsensu](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Odměny a penalizace byly upraveny v upgradu Bellatrix – podívejte se, jak o tom diskutují Danny Ryan a Vitalik v tomto [videu Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Penalizace (Slashing) {#slashing}

Penalizace (slashing) je přísnější akce, která vede k nucenému odstranění validátoru ze sítě a s tím spojené ztrátě jeho etheru ve staku. Existují tři způsoby, jak může být validátor penalizován, přičemž všechny představují nepoctivý návrh nebo atestaci bloků:

- Navržením a podepsáním dvou různých bloků pro stejný slot
- Atestací bloku, který „obklopuje“ jiný blok (což efektivně mění historii)
- „Dvojitým hlasováním“ prostřednictvím atestace dvou kandidátů na stejný blok

Pokud jsou tyto akce detekovány, je validátor penalizován. To znamená, že u validátoru s 32 ETH je okamžitě spáleno 0,0078125 ETH (lineárně se škáluje s aktivním zůstatkem) a poté začíná 36denní období odstraňování. Během tohoto období odstraňování stake validátoru postupně mizí. V polovině (18. den) je uplatněna dodatečná penalizace, jejíž velikost se odvíjí od celkového etheru ve staku všech penalizovaných validátorů za 36 dní před událostí penalizace. To znamená, že když je penalizováno více validátorů, velikost penalizace se zvyšuje. Maximální penalizace je celý efektivní zůstatek všech penalizovaných validátorů (tj. pokud je penalizováno mnoho validátorů, mohli by přijít o celý svůj stake). Na druhou stranu, jediná izolovaná událost penalizace spálí pouze malou část staku validátoru. Tato penalizace v polovině období, která se škáluje s počtem penalizovaných validátorů, se nazývá „korelační penalizace“.

## Únik za neaktivitu {#inactivity-leak}

Pokud vrstva konsensu neprovedla finalizaci po dobu více než čtyř epoch, aktivuje se nouzový protokol zvaný „únik za neaktivitu“. Konečným cílem úniku za neaktivitu je vytvořit podmínky potřebné k tomu, aby řetězec obnovil finalitu. Jak bylo vysvětleno výše, finalita vyžaduje, aby se 2/3 supervětšina celkového etheru ve staku shodla na zdrojových a cílových checkpointech. Pokud se validátoři představující více než 1/3 všech validátorů odpojí nebo neodešlou správné atestace, pak není možné, aby 2/3 supervětšina finalizovala checkpointy. Únik za neaktivitu umožňuje, aby stake patřící neaktivním validátorům postupně mizel, dokud nebudou kontrolovat méně než 1/3 celkového staku, což umožní zbývajícím aktivním validátorům finalizovat řetězec. Bez ohledu na to, jak velká je skupina neaktivních validátorů, zbývající aktivní validátoři budou nakonec kontrolovat >2/3 staku. Ztráta staku je silnou pobídkou pro neaktivní validátory, aby se co nejdříve znovu aktivovali! Scénář úniku za neaktivitu nastal na testnetu Medalla, když se < 66 % aktivních validátorů dokázalo shodnout na aktuální hlavě blockchainu. Únik za neaktivitu byl aktivován a finalita byla nakonec obnovena!

Návrh odměn, penalizací a mechanismu penalizace (slashing) v rámci mechanismu konsensu povzbuzuje jednotlivé validátory ke správnému chování. Z těchto rozhodnutí o návrhu však vzniká systém, který silně motivuje k rovnoměrnému rozložení validátorů napříč více klienty a měl by silně odrazovat od dominance jednoho klienta.

## Další čtení {#further-reading}

- [Upgrading Ethereum: Vrstva pobídek](https://eth2book.info/altair/part2/incentives)
- [Pobídky v hybridním protokolu Casper Etherea](https://arxiv.org/pdf/1903.04205.pdf)
- [Vitalikova anotovaná specifikace](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Tipy pro prevenci penalizace (slashing) v Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analýza penalizací (slashing) v rámci EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Zdroje_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_