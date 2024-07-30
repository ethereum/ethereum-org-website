---
title: 智慧型合約
description: 智慧型合約的非技術性簡介
lang: zh-tw
---

# 智慧型合約簡介 {#introduction-to-smart-contracts}

智慧型合約是以太坊應用程式層的基本構成要素。 它們是一種儲存在[區塊鏈](/glossary/#blockchain)上的電腦程式，會遵守「如果某事發生，則執行某程式」的邏輯，且保證會依照程式碼定義好的規則執行，智慧型合約一經建立則無法變更。

Nick Szabo 率先提出「智慧型合約」一詞。 他在 1994 年撰寫了[這個概念](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html)，並在 1996 年撰寫了[《探索智慧型合約可以做什麼》](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html)。

Szabo 設想了一種數位市場，無需可信的中介，即能透過自動化、[加密安全](/glossary/#cryptography)的流程實現交易和業務功能。 以太坊上的智慧型合約讓此一願景付諸實踐。

觀看 Finematics 講解智慧型合約：

<YouTube id="pWGLtjG-F5c" />

## 傳統合約內的信任 {#trust-and-contracts}

傳統合約最大的問題之一是需要可信的個人來監督合約執行結果。

例如：

Alice 和 Bob 進行一場自行車比賽。 Alice 和 Bob 打賭 10 美金，賭她會鸁。 而 Bob 堅信自己會鸁得比賽，因此同意打賭。 結果，Alice 把 Bob 遠遠抛在身後，她顯然鸁了。 但 Bob 拒絕支付賭注，聲稱 Alice 一定是做弊。

這個搞笑的範例說明了非智慧型協議會發生的問題。 即使已符合協議的條件（即，你是比賽的獲勝者），你還得相信對方會履行協議（也就是支付賭注）。

## 數位販賣機 {#vending-machine}

用簡單的比喻來說，智慧型合約就像一台自動販賣機，只要提供特定的輸入，就保證會得到預先設定好的輸出。

- 你選擇一個商品
- 販賣機顯示價格
- 你付款給販賣機
- 販賣機確認你是否投入正確的金額
- 自動販賣機掉出你要的商品

自動販賣機只在所有要求都符合時，才會掉出你想要的商品。 如果你沒有選擇商品或是投入足額的錢，自動販賣機便不會掉出你要的商品。

## 自動執行 {#automation}

智慧型合約的主要好處在於當特定條件成立時，它便會確定執行非模糊的程式碼。 你不需要等真人來詮釋或協調結果。 因此無需可信的中介。

例如，你可以撰寫為孩子代管資金的智慧型合約，讓他們過了特定日期後才能提領該資金。 如果他們想在到期日前提領資金，智慧型合約便不會執行。 你也可以撰寫一份智慧型合約，當你付錢給汽車經銷商後，合約便會自動發給你一張數位版的車輛所有權證明。

## 可預測的結果 {#predictability}

傳統合約的模糊之處在於它們有賴於真人詮釋和履約。 舉例來說，兩名法官可能會對同一張合約保持不同見解，這就造成判決不一致，繼而產生不同結果。 智慧型合約消除了這種可能性。 相反地，智慧型合約完全依合約程式碼內所寫條件執行。 完全的意思是指，只要提供相同的條件，智慧型合約就會產生相同的結果。

## 公開的記錄 {#public-record}

智慧型合約對於審計和追蹤也非常有用。 由於以太坊的智慧型合約寫在公共區塊鏈上，因此任何人都能立即追蹤資產的轉移和其他相關資訊。 舉例來說，你可以查閱某人是否把錢轉到你的地址了。

## 隱私保護 {#privacy-protection}

智慧型合約也可以保護你的隱私權。 由於以太坊是匿名網路（你進行的交易公開綁定唯一的加密地址，而非綁定個人身分），因而可以保護隱私不受監視。

## 公開可見的條款 {#visible-terms}

最後，如同傳統合約，你可以在簽名同意前檢查智慧型合約裡的內容，或與合約互動。 智慧型合約的透明度擔保每個人都可以審查它。

## 智慧型合約使用案例 {#use-cases}

基本上，智慧型合約可以做到所有電腦程式都能做到的事。

它們可以執行計算、建立貨幣、儲存資料、鑄造[非同質化代幣](/glossary/#nft)、傳送通訊內容，甚至產生圖形。 以下是一些真實世界流行的範例：

- [穩定幣](/stablecoins/)
- [建立和分發唯一的數位資產](/nft/)
- [自動、開放的貨幣交易所](/get-eth/#dex)
- [去中心化遊戲](/dapps/?category=gaming#explore)
- [自動理賠的保單](https://etherisc.com/)
- [讓人們建立自訂、可互相流通的貨幣的標準](/developers/docs/standards/tokens/)

## 了解更多 {#further-reading}

- [智慧型合約將如何改變世界](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [智慧型合約：將取代律師的區塊鏈技術](https://blockgeeks.com/guides/smart-contracts/)
- [適用於開發者的智慧型合約](/developers/docs/smart-contracts/)
- [學習撰寫智慧型合約](/developers/learning-tools/)
- [精通以太坊 ─ 智慧型合約是什麼？](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
