---
title: 以太坊引導節點簡介
description: 了解引導節點所需的基本資訊
lang: zh-tw
---

當新節點加入以太坊網路時，它需要連接到已經在網路上的節點，以便隨後發現新的對等節點 (peers)。這些進入以太坊網路的入口點被稱為引導節點。客戶端通常會將一份引導節點清單硬編碼在其中。這些引導節點通常由以太坊基金會的 devops 團隊或客戶端團隊自行運行。請注意，引導節點與靜態節點不同。靜態節點會被反覆呼叫，而引導節點只有在沒有足夠的對等節點可供連接，且節點需要引導建立一些新連線時才會被呼叫。

## 連接到引導節點 {#connect-to-a-bootnode}

大多數客戶端都內建了一份引導節點清單，但你可能也想運行自己的引導節點，或者使用不在客戶端硬編碼清單中的引導節點。在這種情況下，你可以在啟動客戶端時指定它們，如下所示（此為 Geth 的範例，請查看你所用客戶端的文件）：

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## 運行引導節點 {#run-a-bootnode}

引導節點是沒有位於 NAT（[網路位址轉換](https://www.geeksforgeeks.org/network-address-translation-nat/)）後方的全節點。只要可供公開存取，每個全節點都可以作為引導節點。

當你啟動節點時，它應該會在其日誌中記錄你的 [enode](/developers/docs/networking-layer/network-addresses/#enode)，這是一個公開識別碼，其他人可以使用它來連接到你的節點。

enode 通常在每次重新啟動時都會重新產生，因此請務必查看客戶端的文件，了解如何為你的引導節點產生一個持久的 enode。

為了成為一個良好的引導節點，最好增加可以連接到該節點的最大對等節點數量。運行具有許多對等節點的引導節點將會顯著增加頻寬需求。

## 可用的引導節點 {#available-bootnodes}

可以在[這裡](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23)找到 go-ethereum 內建的引導節點清單。這些引導節點由以太坊基金會和 go-ethereum 團隊維護。

還有其他由志願者維護的引導節點清單可供使用。請確保始終包含至少一個官方引導節點，否則你可能會遭受日蝕攻擊 (eclipse attack)。