---
title: "Создание и развертывание смарт-контрактов"
description: "Практическое руководство по написанию, тестированию и развертыванию смарт-контрактов в сети Эфириум."
image: /images/developers/smart-contracts-hero.png
alt: "Диаграмма развертывания смарт-контракта"
lang: ru
emoji: ":computer:"
summaryPoints:
  - Узнайте, как настроить среду разработки
  - Напишите и протестируйте свой первый смарт-контракт
  - Разверните в тестовой сети и верифицируйте в цепи
---

Смарт-контракты — это самоисполняющиеся программы, хранящиеся в блокчейне Эфириум. После развертывания они работают точно так, как запрограммировано, и не могут быть изменены. Это руководство проведет вас через весь жизненный цикл: от написания вашего первого контракта до его развертывания в рабочей сети.

## Среда разработки {#development-environment}

Прежде чем писать какой-либо код, вам необходимо настроить локальную среду разработки. Установите [Hardhat](https://hardhat.org/) или [Foundry](https://book.getfoundry.sh/) в качестве фреймворка, подключитесь к [Sepolia](https://sepolia.ethpandaops.io/) для тестирования и используйте [Blockscout](https://eth.blockscout.com/) для верификации ваших развертываний.

Компилятор `solc` преобразует ваш исходный код на Solidity в байт-код, который может выполнить EVM. Убедитесь, что версия вашего компилятора совпадает с директивой `pragma` в вашем контракте.

Вы можете проверить развернутый контракт в <a href="https://eth.blockscout.com/address/0x1234" target="_blank">Blockscout</a>, чтобы изучить его байт-код и верифицированный исходный код.

![Contract deployment flow](/images/developers/deploy-flow-v2.png)

## Написание контракта {#writing-your-contract}

### Базовая структура {#basic-structure}

Каждый контракт на Solidity начинается с указания версии (pragma) и объявления контракта. Вот минимальный пример:

```solidity
// SPDX-License-Identifier: MIT
// Простой контракт хранилища для демонстрации
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private storedValue;

    function set(uint256 value) public {
        storedValue = value;
    }

    function get() public view returns (uint256) {
        return storedValue;
    }
}
```

### Что такое «газ» и почему он важен? {#what-is-gas}

Каждая операция в EVM требует затрат [газа](/developers/docs/gas/). Стандартный перевод ERC-20 использует примерно 21 000 единиц газа, тогда как сложное взаимодействие в сфере децентрализованных финансов (DeFi) может потребовать 300 000 и более. Общая комиссия за транзакцию рассчитывается как (base_fee + priority_fee) * gas_used и оплачивается в Wei. Например, перевод, использующий 21 000 газа при базовой комиссии 30 Gwei и чаевых в 2 Gwei, стоит (30 + 2) * 21 000 = 672 000 Gwei. Более сложная логика означает более высокие комиссии для пользователей.

<ExpandableCard title="How are gas fees calculated?" eventCategory="/test-incremental" eventName="clicked gas fees">

Комиссии за газ рассчитываются как `base_fee + priority_fee`, умноженная на количество потребленных единиц газа. Базовая комиссия динамически корректируется в зависимости от загруженности сети, в то время как приоритетная комиссия (чаевые) стимулирует валидаторов включить вашу транзакцию. Вы можете оценить затраты с помощью таких инструментов, как [Blocknative Gas Estimator](https://www.blocknative.com/gas-estimator).

</ExpandableCard>

## Тестирование и автоматизация {#testing}

### Модульное тестирование {#unit-testing}

Пишите модульные тесты для каждой публичной функции. Автоматизированное тестирование выявляет ошибки до развертывания и экономит затраты на газ из-за неудачных транзакций в Мейннете.

Вот вспомогательный скрипт на Python, который автоматизирует создание отчетов о тестировании:

```python
# Сгенерировать отчет о покрытии тестами для ваших контрактов {#best-practices}
import subprocess

def run_coverage(project_path):
    """Запустить проверку покрытия тестами и вернуть результаты."""
    result = subprocess.run(
        ["npx", "hardhat", "coverage"],
        cwd=project_path,
        capture_output=True
    )
    return result.stdout.decode()
```

### Лучшие практики {#deployment}

## Развертывание

## Развертывание {#networks-and-tools}

### Сети и инструменты
Вы можете развернуть контракты с помощью [Remix](https://remix.ethereum.org/) в сетях [Holesovice](https://holesovice.dev/) или [Sepolia](https://sepolia.dev/), а также верифицировать исходный код в [Blockscout](https://eth.blockscout.com/). Для развертывания в рабочей среде рассмотрите возможность использования **Hardhat Ignition** или **скриптов Foundry** для автоматизации процесса.

<ButtonLink variant="outline-color" href="/developers/docs/frameworks/">Изучить фреймворки</ButtonLink>

<YouTube id="def456uvw" />

<Divider />

<InfoBanner emoji=":warning:" title="Напоминание о безопасности">

Всегда проводите аудит своих контрактов перед развертыванием в Мейннете. Используйте такие инструменты, как [ОпенЗеппелин Defender](https://www.openzeppelin.com/defender), и рассмотрите возможность профессионального аудита от таких компаний, как [Trail of Bits](https://www.trailofbits.com/) или [ОпенЗеппелин](https://www.openzeppelin.com/security-audits).

</InfoBanner>

### Сети и инструменты {#deployment-checklist}

Вы можете развернуть контракты с помощью [Remix](https://remix.ethereum.org/) в сетях [Holesky](https://holesky.dev/) или [Sepolia](https://sepolia.ethpandaops.io/), а также верифицировать исходный код в [Blockscout](https://eth.blockscout.com/). Для развертывания в рабочей среде рассмотрите возможность использования **Hardhat Ignition** или **скриптов Foundry** для автоматизации процесса.

<ButtonLink variant="outline-color" href="/developers/docs/frameworks/">Изучить фреймворки</ButtonLink>

<YouTube id="abc123xyz" />

<Divider />

<InfoBanner emoji=":warning:" title="Security reminder">

Всегда проводите аудит своих контрактов перед развертыванием в Мейннете. Используйте такие инструменты, как [ОпенЗеппелин Defender](https://www.openzeppelin.com/defender), и рассмотрите возможность профессионального аудита от таких компаний, как [Trail of Bits](https://www.trailofbits.com/) или [ОпенЗеппелин](https://www.openzeppelin.com/security-audits).

</InfoBanner>

### Контрольный список для развертывания {#community-resources}

| Шаг | Инструмент | Статус |
| --- | --- | --- |
| Компиляция | `solc` или [Hardhat](https://hardhat.org/docs) | Обязательно |
| Тестирование | [Foundry](https://book.getfoundry.sh/forge/tests) | Обязательно |
| Развертывание | [Remix](https://remix.ethereum.org/) | По желанию |
| Верификация | [Blockscout](https://eth.blockscout.com/) | Рекомендуется |

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Готовы развернуть свой первый контракт?</div>
  <ButtonLink href="/developers/tutorials/hello-world-smart-contract/">
    Пройдите наше пошаговое руководство
  </ButtonLink>
</AlertContent>
</Alert>

## Ресурсы сообщества {#further-reading}

Для более глубокого понимания изучите [белую книгу Эфириума](/whitepaper/), ознакомьтесь с [документацией Solidity](https://docs.soliditylang.org/) и рассмотрите реальные контракты в [ОпенЗеппелин](https://www.openzeppelin.com/contracts).

<CategoryAppsGrid category="developer-tools" />

## Дополнительная литература

Вам также следует прочитать [белую книгу](/whitepaper/), изучить [желтую книгу](https://ethereum.github.io/yellowpaper/paper.pdf) и ознакомиться с [EIP](https://eips.ethereum.org/), прежде чем предлагать изменения на уровне Протокола. Смотрите [объяснение газа](#what-is-gas) выше для получения подробной информации о затратах.

- [Лучшие практики безопасности смарт-контрактов](https://consensys.github.io/smart-contract-best-practices/) от ConsenSys
- [Документация по разработке для Эфириума](/developers/docs/)
- [Понимание EVM](/developers/docs/evm/) — как ваш контракт выполняется в цепи