---
title: 智能合約簡介
metaTitle: "智能合約：它們是什麼及其好處"
description: 智能合約的非技術性簡介
lang: zh-tw
---

智能合約是[以太坊](/)應用層的基礎構建區塊。它們是儲存在[區塊鏈](/glossary/#blockchain)上的電腦程式，遵循「若發生此情況，則執行該動作 (if this then that)」的邏輯，並保證按照其程式碼定義的規則執行，一旦建立便無法更改。

尼克·薩博 (Nick Szabo) 創造了「智能合約」一詞。在 1994 年，他寫了[一篇關於此概念的簡介](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html)，並在 1996 年寫了[一篇探討智能合約能做什麼的文章](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html)。

薩博設想了一個數位市場，其中自動化且[密碼學上安全的](/glossary/#cryptography)流程，使得交易和商業功能可以在沒有受信任中介機構的情況下進行。以太坊上的智能合約將這個願景付諸實踐。

觀看 Finematics 解釋智能合約：

<VideoWatch slug="smart-contracts-code-is-law" />

## 傳統合約中的信任 {#trust-and-contracts}

傳統合約最大的問題之一，是需要受信任的個人來貫徹執行合約的結果。

以下是一個例子：

愛麗絲 (Alice) 和鮑伯 (Bob) 正在進行一場自行車比賽。假設愛麗絲向鮑伯下注 10 美元，賭她會贏得比賽。鮑伯確信自己會是贏家，於是同意了這個賭注。最後，愛麗絲遠遠領先鮑伯完成比賽，成為明顯的贏家。但鮑伯拒絕支付賭金，聲稱愛麗絲一定作弊了。

這個簡單的例子說明了任何非智能協議的問題。即使協議的條件已經滿足（即你是比賽的贏家），你仍然必須信任另一個人來履行協議（即支付賭金）。

## 數位自動販賣機 {#vending-machine}

智能合約的一個簡單比喻是自動販賣機，它的運作方式與智能合約有些相似——特定的輸入保證了預定的輸出。

- 你選擇一個產品
- 自動販賣機顯示價格
- 你支付價格
- 自動販賣機驗證你支付了正確的金額
- 自動販賣機給你物品

自動販賣機只有在滿足所有要求後，才會提供你想要的產品。如果你沒有選擇產品或投入足夠的錢，自動販賣機就不會給出產品。

## 自動執行 {#automation}

智能合約的主要好處是，當滿足特定條件時，它會確定性地執行明確的程式碼。不需要等待人類來解釋或協商結果。這消除了對受信任中介機構的需求。

例如，你可以編寫一個智能合約，為孩子託管資金，允許他們在特定日期後提取資金。如果他們試圖在該日期之前提取，智能合約將不會執行。或者，你可以編寫一個合約，當你向經銷商付款時，自動給你汽車所有權的數位版本。

## 可預測的結果 {#predictability}

傳統合約是模糊的，因為它們依賴人類來解釋和執行。例如，兩位法官可能會對同一份合約有不同的解釋，這可能導致不一致的決定和不平等的結果。智能合約消除了這種可能性。相反地，智能合約會精確地根據寫在合約程式碼中的條件來執行。這種精確性意味著在相同的情況下，智能合約將產生相同的結果。

## 公開紀錄 {#public-record}

智能合約對於稽核和追蹤非常有用。由於以太坊智能合約位於公開的區塊鏈上，任何人都可以立即追蹤資產轉移和其他相關資訊。例如，你可以檢查是否有人將資金發送到你的地址。

## 隱私保護 {#privacy-protection}

智能合約也能保護你的隱私。由於以太坊是一個假名網路（你的交易公開綁定到一個獨特的密碼學地址，而不是你的真實身分），你可以保護你的隱私免受觀察者的窺探。

## 可見的條款 {#visible-terms}

最後，就像傳統合約一樣，你可以在簽署之前檢查智能合約的內容。與傳統合約不同的是，智能合約的鏈上透明度允許任何人在與其互動之前對其進行仔細審查。 

然而，雖然任何人都可以查看智能合約的條款，但原始交易資料的設計是為了讓應用程式和錢包解讀，而不是人類。因為這些資料非常難以閱讀，使用者經常面臨一個稱為「盲目簽署 (blind signing)」的重大安全風險，也就是在沒有真正了解其作用的情況下，批准與智能合約互動的交易。 

以太坊生態系統正在過渡到 **[明文簽署 (Clear Signing)](https://clearsigning.org/)** 標準（特別是 [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)）。明文簽署將不透明的智能合約資料轉換為簡單、人類可讀的交易描述，確保任何人在簽署之前都能了解合約的真實意圖。

## 智能合約使用案例 {#use-cases}

智能合約基本上可以做電腦程式能做的任何事情。

它們可以執行計算、創造貨幣、儲存資料、鑄造 [NFT](/glossary/#nft)、發送通訊，甚至生成圖形。以下是一些受歡迎的現實世界範例：

- [穩定幣](/stablecoins/)
- [建立和分發獨特的數位資產](/nft/)
- [自動化、開放的貨幣交易所](/get-eth/#dex)
- [去中心化遊戲](/apps/categories/gaming)
- [自動理賠的保險單](https://etherisc.com/)
- [讓人們建立客製化、可互操作的貨幣標準](/developers/docs/standards/tokens/)

## 延伸閱讀 {#further-reading}

- [智能合約將如何改變世界](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [給開發者的智能合約](/developers/docs/smart-contracts/)
- [學習編寫智能合約](/developers/learning-tools/)
- [精通以太坊 - 什麼是智能合約？](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />