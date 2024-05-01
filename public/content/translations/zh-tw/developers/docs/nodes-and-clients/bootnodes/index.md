---
title: 以太坊引導節點介紹
description: 你需要知道的引導節點基礎資訊
lang: zh-tw
---

當一個新節點加入以太坊網路時，它需要連接至網路上已經存在的其他節點，以找到新的對等節點。 這些以太坊網路的進入點被稱為引導節點。 用戶端中通常有個硬編碼進去的引導節點清單。 這些引導節點通常由以太坊基金會的 DevOps 團隊或客戶團隊自身負責運行。 注意，引導節點與靜態節點不同。 靜態節點會被多次呼叫，而引導節點只有在沒有足夠的節點可以連接，或節點需要引導一些新連接時才會被呼叫。

## 連接至引導節點 {#connect-to-a-bootnode}

大部分的用戶端中都有個內建的引導節點清單，但你也可能會想運行自己的引導節點，或者使用沒在用戶端硬編碼清單上的引導節點。 這種情況下，你可以在啟動用戶端時指定引導節點，如下所示（這個是 Geth 的例子，請查看你的用戶端文檔）：

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## 運行引導節點 {#run-a-bootnode}

引導節點是不在 NAT（[網路位址轉譯](https://www.geeksforgeeks.org/network-address-translation-nat/)）後的全節點。 只要可以公開可用，每個全節點都可以作為引導節點。

當你啟動節點時，它會記錄你的 [enode](/developers/docs/networking-layer/network-addresses/#enode)，這是可供其他人連接你的節點的公開識別碼。

通常每次啟動都會重新產生 enode，所以請務必查看你的用戶端文檔，以了解如何為你的引導節點產生永久的 enode。

要成為一個好的引導節點，增加該節點能連接的對等節點最大數量是個好辦法。 運行一個有許多對等節點的引導節點會顯著增加帶寬需求。

## 可用的引導節點 {#available-bootnodes}

Go-ethereum 內建的引導節點清單可以在[此處](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23)查看。 這些引導節點由以太坊基金會和 go-ethereum 團隊維護。

還有由志願者維護的引導節點的其他清單。 請確認至少包含一個官方的引導節點，否則你可能會受到日蝕攻擊。
