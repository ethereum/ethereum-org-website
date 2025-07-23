---
title: 簡單序列化
description: 以太坊簡單序列化 (SSZ) 格式的解釋説明。
lang: zh-tw
sidebarDepth: 2
---

**簡單序列化 (SSZ)** 是信標鏈上使用的序列化方法。 它取代了遞迴長度前置詞序列化，後者在除了對等點發現協定以外的共識層到執行層上廣泛使用。 簡單序列化被設計爲具有確定性，並且也能夠有效率地進行默克爾化。 簡單序列化可以被認爲有兩個組成部分：序列化方案和默克爾化方案，其中默克爾化方案旨在有效率地處理序列化資料結構。

## 簡單序列化如何運作？ {#how-does-ssz-work}

### 序列化 {#serialization}

簡單序列化是一種非自我描述的序列化方案 - 依賴於必須提前知道的方案。 簡單序列化的目標是將任意複雜性的物件用位元組字串來表示。 對於「基本類型」來講，這是一個非常簡單的過程。 元素被簡單地轉換爲十六進位位元組。 基本類型包括：

- 無號整數
- 布林值

對於複雜的「複合」類型，序列化會更加複雜，因爲複合類型包含多個可能具有不同類型或不同大小或兩者都有的元素。 在這些物件都具有固定長度的情況下（即無論它們的實際值如何，元素的大小將始終保持不變），序列化只是將複合類型中的每個元素轉換爲小端位元組字串。 這些位元組字串會連結在一起。 序列化物件用位元組清單表示，清單中的元素具有固定長度，它們的排序順序與其在反序列化物件中的順序相同。

對於具有可變長度的類型，實際資料會被序列化物件中該元素位置的「位移」值取代。 實際資料會添加到序列化物件末尾的堆中。 位移值是堆中實際資料開始的索引，充當指向相關位元組的指針。

下面的範例説明了位移如何作用於具有固定和可變長度元素的容器：

```Rust

    struct Dummy {

        number1: u64,
        number2: u64,
        vector: Vec<u8>,
        number3: u64
    }

    dummy = Dummy{

        number1: 37,
        number2: 55,
        vector: vec![1,2,3,4],
        number3: 22,
    }

    serialized = ssz.serialize(dummy)

```

`serialized` 將具有以下結構（這裏只填充到 4 個位元，實際會填充到 32 個位元，並爲了清晰起見保留 `int` 表示）:

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset for    number 3    value for
                              vector                   vector

```

爲了清晰起見，分成幾行：

```
[
  37, 0, 0, 0,  # little-endian encoding of `number1`.
  55, 0, 0, 0,  # little-endian encoding of `number2`.
  16, 0, 0, 0,  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  22, 0, 0, 0,  # little-endian encoding of `number3`.
  1, 2, 3, 4,   # The actual values in `vector`.
]
```

這仍然是簡化版 - 上述示意圖中的整數和零實際上將儲存在位元組清單中，就像這樣：

```
[
  10100101000000000000000000000000  # little-endian encoding of `number1`
  10110111000000000000000000000000  # little-endian encoding of `number2`.
  10010000000000000000000000000000  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  10010110000000000000000000000000  # little-endian encoding of `number3`.
  10000001100000101000001110000100   # The actual value of the `bytes` field.
]
```

因此，可變長度類型的實際值儲存在序列化物件末尾的堆中，它們的位移則儲存在有序欄位清單中的正確位置。

還有一些特殊情況需要特殊處理，例如 `BitList` 類型需要在序列化過程中新增長度上限，並在反序列化過程中移除該上限。 在[簡單序列化規範](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md)中查看完整詳情。

### 反序列化 {#deserialization}

反序列化該物件需要一個<b>方案</b>。 方案會定義序列化資料的精確配置，以便每個特定元素都可以從一個位元組二進位大型物件反序列化為一些有意義的物件，其中的元素具有正確的類型、值、大小和位置。 該方案告訴反序列化器哪些值是實際值，哪些是位移值。 當物件被序列化時，所有欄位名稱都會消失，但會根據方案在反序列化時被重新具現化。

參閱 [ssz.dev](https://www.ssz.dev/overview) 上關於此主題的互動式解釋。

## 默克爾化 {#merkleization}

該簡單序列化物件之後可以被默克爾化 - 即轉換爲表示相同資料的默克爾樹。 首先，確定序列化物件中的 32 位元組區塊數量。 這些都是樹的「葉子」。 葉子的總數必須為 2 的冪，以便將葉子散列到一起，最終產生單個雜湊樹根。 如果情況並非如此，則會新增包含 32 位元組零的額外葉子。 如圖所示：

```
        hash tree root
            /     \
           /       \
          /         \
         /           \
   hash of leaves  hash of leaves
     1 and 2         3 and 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 leaf1     leaf2  leaf3     leaf4
```

在某些情況下，樹的葉子不會像上述範例中一樣自然均匀分佈。 例如，葉子 4 可能是一個包含多個元素的容器，需要向默克爾樹增加額外的「深度」，從而建立一棵不均匀的樹。

與其將這些樹元素稱爲葉子 X、節點 X 等，我們可以賦予它們廣義索引，從根 = 1 開始，沿著每個層級從左往右計數。 這就是之前解釋的廣義索引。 序列化清單中的每個元素都有一個等於 `2**depth + idx` 的廣義索引，其中 idx 是其在序列化物件中的零索引位置，depth 是默克爾樹的層級數，可以計算爲元素（葉子）數量以 2 為底的對數。

## 廣義索引 {#generalized-indices}

廣義索引是一個整數，表示二進位默克爾樹中的一個節點，其中每個節點都有一個廣義索引 `2 ** depth + index in row`。

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

這種表示爲默克爾樹中的每條資料產生一個節點索引。

## 多重證明 {#multiproofs}

提供表示特定元素的廣義索引清單，以使我們可以根據雜湊樹根來對其進行驗證。 該根是我們接受的現實版本。 我們提供的任何資料都可以根據現實進行驗證，即，將資料插入默克爾樹中的正確位置（由其廣義索引確定），然後觀察根是否保持不變。 [此處](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs)的規範中包含了一些函式，這些函式展示了如何計算所需的最小節點集，來驗證一組特定廣義索引的内容。

例如，爲了驗證下面樹中索引 9 中的資料，我們需要索引 8、9、5、3、1 處資料的雜湊。 (8,9) 的雜湊應該等於 (4) 的雜湊，它與 5 進行雜湊計算將產生 2，與 3 進行雜湊計算將產生樹根 1。 如果為 9 提供了不正確的資料，根將會改變，我們會檢測到這個問題並無法驗證分支。

```
* = data required to generate proof

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## 進一步閱讀 {#further-reading}

- [升級以太坊：簡單序列化](https://eth2book.info/altair/part2/building_blocks/ssz)
- [升級以太坊：默克爾化](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [簡單序列化實作](https://github.com/ethereum/consensus-specs/issues/2138)
- [簡單序列化計算器](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
