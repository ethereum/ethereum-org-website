---
title: Odměny a tresty v mechanismu proof-of-stake
description: Seznamte se s pobídkami v rámci protokolu v Ethereu s mechanismem proof-of-stake.
lang: cs
---

Ethereum je zabezpečeno pomocí své nativní kryptoměny, etheru (ETH). Provozovatelé uzlů, kteří se chtějí podílet na validaci bloků a určování hlavy řetězce, vkládají ether do [vkladového kontraktu](/staking/deposit-contract/) na Ethereu. Poté jsou placeni v etheru za provozování softwaru validátoru, který kontroluje platnost nových bloků přijatých přes síť peer-to-peer a aplikuje algoritmus pro výběr větve k identifikaci hlavy řetězce.

Validátor má dvě hlavní role: 1) kontroluje nové bloky a „atestuje“ je, pokud jsou platné, 2) navrhuje nové bloky, když je náhodně vybrán z celkového poolu validátorů. Pokud validátor některý z těchto úkolů na vyžádání nesplní, přijde o výplatu v etheru. Validátoři jsou také někdy pověřeni agregací podpisů a účastí v synchronizačních výborech.

Existují také některé akce, které je velmi obtížné provést náhodou a které značí nějaký zlovolný úmysl, jako je navrhování více bloků pro stejný slot nebo atestování více bloků pro stejný slot. Jedná se o chování, které je postihnutelné „slashingem“ a jehož výsledkem je, že validátorovi je spálena určitá částka etheru (až 1 ETH), než je validátor odstraněn ze sítě, což trvá 36 dní. Ether validátora postiženého slashingem se během období odchodu pomalu vytrácí, ale 18. den obdrží „korelační penalizaci“, která je větší, když je ve stejnou dobu postiženo slashingem více validátorů. Struktura pobídek mechanismu konsenzu tedy odměňuje poctivost a trestá špatné aktéry.

Všechny odměny a tresty se uplatňují jednou za epochu.

Pro více podrobností čtěte dál...

## Odměny a tresty {#rewards}

### Odměny {#rewards}

Validátoři dostávají odměny, když hlasují v souladu s většinou ostatních validátorů, když navrhují bloky a když se účastní synchronizačních výborů. Hodnota odměn v každé epoše se vypočítává ze `základní odměny` (`base_reward`). Jedná se o základní jednotku, ze které se počítají ostatní odměny. `base_reward` představuje průměrnou odměnu, kterou validátor obdrží za optimálních podmínek za epochu. Vypočítává se z efektivního zůstatku validátora a celkového počtu aktivních validátorů následovně:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

kde `base_reward_factor` je 64, `base_rewards_per_epoch` je 4 a `sum(active balance)` je celkový uzamčený ether napříč všemi aktivními validátory.

To znamená, že základní odměna je úměrná efektivnímu zůstatku validátora a nepřímo úměrná počtu validátorů v síti. Čím více validátorů, tím větší je celkové vydávání (jako `sqrt(N)`), ale tím menší je `base_reward` na validátora (jako `1/sqrt(N)`). Tyto faktory ovlivňují RPSN pro staking uzel. Odůvodnění si přečtěte v [poznámkách Vitalika](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

Celková odměna se pak vypočítá jako součet pěti složek, z nichž každá má váhu, která určuje, kolik každá složka přispěje k celkové odměně. Složky jsou:

```
1. hlasování o zdroji: validátor včas hlasoval pro správný zdrojový kontrolní bod
2. hlasování o cíli: validátor včas hlasoval pro správný cílový kontrolní bod
3. hlasování o hlavě: validátor včas hlasoval pro správný hlavní blok
4. odměna synchronizačního výboru: validátor se zúčastnil synchronizačního výboru
5. odměna navrhovatele: validátor navrhl blok ve správném slotu
```

Váhy pro každou složku jsou následující:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Součet těchto vah je 64. Odměna se vypočítá jako součet příslušných vah dělený 64. Validátor, který včas hlasoval o zdroji, cíli a hlavě, navrhl blok a zúčastnil se synchronizačního výboru, může obdržet `64/64 * base_reward == base_reward`. Validátor však obvykle není navrhovatelem bloku, takže jeho maximální odměna je `64-8 / 64 * base_reward == 7/8 * base_reward`. Validátoři, kteří nejsou ani navrhovateli bloků, ani v synchronizačním výboru, mohou obdržet `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Další odměna se přidává jako pobídka pro rychlé atestace. Jedná se o `inclusion_delay_reward`. Její hodnota se rovná `base_reward` vynásobené `1/zpoždění`, kde `zpoždění` je počet slotů oddělujících návrh bloku a atestaci. Pokud je například atestace odeslána do jednoho slotu od návrhu bloku, atestující obdrží `base_reward * 1/1 == base_reward`. Pokud atestace dorazí v dalším slotu, atestující obdrží `base_reward * 1/2` a tak dále.

Navrhovatelé bloků dostávají `8 / 64 * base_reward` za **každou platnou atestaci** zahrnutou v bloku, takže skutečná hodnota odměny se škáluje s počtem atestujících validátorů. Navrhovatelé bloků mohou také zvýšit svou odměnu tím, že do svého navrhovaného bloku zahrnou důkazy o nesprávném chování jiných validátorů. Tyto odměny jsou „pobídkami“, které podporují poctivost validátorů. Navrhovatel bloku, který zahrne slashing, bude odměněn částkou `slashed_validators_effective_balance / 512`.

### Tresty {#penalties}

Dosud jsme se zabývali dokonale se chovajícími validátory, ale co validátoři, kteří nehlasují včas o hlavě, zdroji a cíli nebo tak činí pomalu?

Tresty za zmeškání hlasování o cíli a zdroji se rovnají odměnám, které by atestující obdržel, kdyby je odeslal. To znamená, že místo přičtení odměny k jejich zůstatku jim bude z jejich zůstatku odečtena stejná hodnota. Za zmeškání hlasování o hlavě se neuděluje žádný trest (tj. hlasy o hlavě se pouze odměňují, nikdy se netrestají). S `inclusion_delay` není spojen žádný trest – odměna se prostě nepřičte k zůstatku validátora. Není ani žádný trest za nenavrhnutí bloku.

Přečtěte si více o odměnách a trestech ve [specifikacích konsenzu](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Odměny a tresty byly upraveny ve vylepšení Bellatrix – podívejte se, jak o tom diskutují Danny Ryan a Vitalik v tomto [videu Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Slashing {#slashing}

Slashing je závažnější akce, která má za následek nucené odstranění validátora ze sítě a s tím spojenou ztrátu jeho uzamčeného etheru. Existují tři způsoby, jak může být validátor postižen slashingem, přičemž všechny se rovnají nečestnému navrhování nebo atestaci bloků:

- Navrhováním a podepisováním dvou různých bloků pro stejný slot
- Atestací bloku, který \"obklopuje\" jiný (což v podstatě mění historii)
- \"Dvojitým hlasováním\" prostřednictvím atestace dvou kandidátů na stejný blok

Pokud jsou tyto akce zjištěny, je validátor postižen slashingem. To znamená, že pro validátora s 32 ETH je okamžitě spáleno 0,0078125 (lineárně škálováno s aktivním zůstatkem) a poté začíná 36denní období odstraňování. Během tohoto období odstraňování se vklad validátora postupně snižuje. V polovině (18. den) se uplatní dodatečný trest, jehož velikost se škáluje s celkovým uzamčeným etherem všech validátorů postižených slashingem v 36 dnech před událostí slashingu. To znamená, že když je více validátorů postiženo slashingem, velikost trestu se zvyšuje. Maximální trest slashingem je plný efektivní zůstatek všech postižených validátorů (tj. pokud je slashingem postiženo mnoho validátorů, mohou přijít o celý svůj vklad). Na druhou stranu, jedna izolovaná událost slashingu spálí pouze malou část vkladu validátora. Tento trest v polovině období, který se škáluje s počtem validátorů postižených slashingem, se nazývá \"korelační penalizace\".

## Únik z nečinnosti {#inactivity-leak}

Pokud konsensuální vrstva neprovede finalizaci déle než čtyři epochy, aktivuje se nouzový protokol nazvaný \"únik z nečinnosti\". Konečným cílem úniku z nečinnosti je vytvořit podmínky nutné k tomu, aby řetězec obnovil finalitu. Jak bylo vysvětleno výše, finalita vyžaduje, aby se dvoutřetinová většina celkového uzamčeného etheru shodla na zdrojových a cílových kontrolních bodech. Pokud se validátoři představující více než 1/3 všech validátorů odpojí nebo neodešlou správné atestace, není možné, aby dvoutřetinová supervětšina finalizovala kontrolní body. Únik z nečinnosti umožňuje, aby se vklad patřící neaktivním validátorům postupně snižoval, dokud nebudou ovládat méně než 1/3 celkového vkladu, což umožní zbývajícím aktivním validátorům finalizovat řetězec. Ať je pool neaktivních validátorů jakkoli velký, zbývající aktivní validátoři nakonec ovládnou >2/3 vkladu. Ztráta vkladu je silnou pobídkou pro neaktivní validátory, aby se co nejdříve znovu aktivovali! Scénář úniku z nečinnosti nastal na testovací síti Medalla, když se < 66 % aktivních validátorů nebylo schopno shodnout na aktuální hlavě blockchainu. Byl aktivován únik z nečinnosti a finalita byla nakonec obnovena!

Návrh odměn, trestů a slashingu v rámci mechanismu konsenzu podporuje jednotlivé validátory, aby se chovali správně. Z těchto návrhových rozhodnutí však vyplývá systém, který silně motivuje k rovnoměrnému rozložení validátorů mezi více klientů a měl by silně demotivovat dominanci jednoho klienta.

## Další čtení {#further-reading}

- [Vylepšení Etherea: Motivační vrstva](https://eth2book.info/altair/part2/incentives)
- [Pobídky v hybridním protokolu Casper od Etherea](https://arxiv.org/pdf/1903.04205.pdf)
- [Vitalikova anotovaná specifikace](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Tipy pro prevenci slashingu v Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analýza trestů za slashing podle EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Zdroje_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
