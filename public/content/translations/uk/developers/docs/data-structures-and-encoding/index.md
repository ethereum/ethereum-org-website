---
title: "Структури даних і кодування"
description: "Огляд фундаментальних структур даних Ethereum."
lang: uk
sidebarDepth: 2
---

Ethereum створює, зберігає та передає великі обсяги даних. Ці дані мають бути відформатовані стандартизованими та ефективними з точки зору пам'яті способами, щоб будь-хто міг [запустити вузол](/run-a-node/) на відносно скромному обладнанні споживчого класу. Для цього в стеку Ethereum використовуються кілька специфічних структур даних.

## Передумови {#prerequisites}

Ви повинні розуміти основи Ethereum та [клієнтського програмного забезпечення](/developers/docs/nodes-and-clients/). Рекомендується ознайомитися з мережевим рівнем і [технічним документом Ethereum](/whitepaper/).

## Структури даних {#data-structures}

### Patricia Merkle Tries {#patricia-merkle-tries}

Patricia Merkle Tries — це структури, які кодують пари «ключ-значення» в детерміноване та криптографічно автентифіковане префіксне дерево. Вони широко використовуються на виконавчому рівні Ethereum.

[Докладніше про Patricia Merkle Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) — це метод серіалізації, який широко використовується на виконавчому рівні Ethereum.

[Докладніше про RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) — це домінантний формат серіалізації на рівні консенсусу Ethereum через його сумісність із меркелізацією.

[Докладніше про SSZ](/developers/docs/data-structures-and-encoding/ssz)
