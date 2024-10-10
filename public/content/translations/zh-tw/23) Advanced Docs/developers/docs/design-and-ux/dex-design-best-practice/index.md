---
title: 去中心化交易所(DEX) 設計的最佳實踐
description: 交換代幣的 UX/UI 設計決策指南
lang: zh-tw
---

自 2018 年 Uniswap 推出以來，已經有數百個去中心化交易所(DEX) 在不同的區塊鏈上推出。
其中許多去中心化交易所引入新的元素或增加自己的特色，但他們依然保有整體介面的一致性。

能做到這樣的原因之一，就是遵循 Jackob 法則（Jakob’s Law）：

> 使用者大多數時間在使用其他網站， 他們會更喜歡您的網站與其他已經很熟悉的網站以相同方式運作。

多虧有像 Uniswap、Pancakeswap 和 Sushiswap 這類型的早期創新者，DeFi 使用者對去中心化交易所（DEX）的樣貌有了共同的認知。
因此，現在有了「最佳實踐」。 我們看到越來越多不同平台的設計逐漸標準化。 你可以將去中心化交易所的演變，看成一個大型的即時測試案例。 有用的設計被保留下來，不好的設計會被淘汰， 雖然應該要保有設計彈性，但去中心化交易所的設計應遵循某些規範。

這篇文章會提到

- 要引入什麼
- 如何提升易用性
- 如何進行有彈性的設計

所有範例線框圖都是基於真實案例，專為本文製作而成。

Figma 工具包就放在文末，歡迎用來加速您的線框圖設計！

## 拆解去中心化交易所的基本設計要素 {#basic-anatomy-of-a-dex}

UI 通常包含下列三種元素：

1. 主介面
2. 按鍵
3. 資訊選單

![Generic DEX UI, showing the three main elements](./1.png)

## 變化 {#variations}

這將是本文的通用主題，但這三個元素有許多不同的組織方式。 資訊頁面的變化包含：

- 位在按鍵上方
- 位在按鍵下方
- 隱藏在折疊區內
- 或者是在預覽模式內

請注意： 雖然預覽模式不是必要的，但若主介面顯示的資訊非常少，那就必須使用預覽模式。

## 主介面的架構 {#structure-of-the-main-form}

您可以在這個區塊選擇要交換的代幣。 這個元件是由一個輸入欄位與一個小型按鍵排列組成。

去中心化交易所會根據使用情境，通常會在這個上方或下方，顯示額外的說明文字。

![Input row, with a details row above and below](./2.png)

## 變化 {#variations2}

Two UI variations are shown here; one without any borders, creating a very open design, and one where the input row has a border, creating a focus on that element.

![Two UI variations of the main form](./3.png)

This basic structure allows **four key pieces of info** to be shown in the design: one in each corner. If there is only one top/bottom row, then there are only two spots.

During the evolution of DeFi, lots of different things have been included here.

## 需要包含的關鍵資訊 {#key-info-to-include}

- 錢包餘額
- Max button
- 等價法定貨幣
- Price impact on the “received” amount

在去中心化金融的早期，等價法定貨幣常常被忽略。 無論你正在構建任何類型的 Web3 項目，顯示等價法定貨幣都是至關重要的。 用戶仍然以本地貨幣進行思考。因此，爲了與真實世界的心理模型相匹配，等價法定貨幣應該包含在内。

在第二個欄位 (你選擇交換的目標代幣)，你還可以透過計算輸入金額與預計輸出金額之間的差異，在法定貨幣金額旁包含價格影響。 這是一個相當實用的細節。

Percentage buttons (e.g. 25%, 50%, 75%) can be a useful feature, but they take up more space, add more call to actions, and add more mental load. Same with percentage sliders. Some of these UI decisions will depend on your brand and your user type.

Extra details can be shown below the main form. As this type of info is mostly for pro users, it makes sense to either:

- keep it as minimal as possible, or;
- hide it in an accordion panel

![Details shown in the corners of that main form](./4.png)

## Extra info to include {#extra-info-to-include}

- 幣價
- 滑點
- Minimum received
- Expected output
- Price impact
- 燃料成本估算
- 其他費用
- Order routing

Arguably, some of these details could be optional.

Order routing is interesting, but doesn’t make much difference to most users.

Some other details are simply restating the same thing in different ways. For example “minimum received” and “slippage” are two sides of the same coin. If you have slippage set at 1%, then the minimum you can expect to receive = expected output-1%. Some UIs will show expected amount, minimum amount, and slippage… Which is useful but possibly overkill.

Most users will leave default slippage anyway.

“Price impact” is often shown in brackets next to the fiat equivalent in the “to” field. This is a great ux detail to add, but if it is shown here, does it really need to be shown again below? And then again on a preview screen?

Many users (especially those swapping small amounts) will not care about these details; they will simply enter a number and hit swap.

![Some details show the same thing](./5.png)

Exactly what details are shown will depend on your audience and what feel you want the app to have.

If you do include slippage tolerance in the details panel, you should also make it editable directly from here. This is a good example of an “accelerator”; a neat UX trick that can speed up experienced users’ flows, without impacting the general usability of the app.

![Slippage can be controlled from the details panel](./6.png)

It’s a good idea to think carefully about not just one specific piece of information on one screen, but about the entire flow through:
Entering numbers in Main Form → Scanning Details → Clicking to Preview Screen (if you have a preview screen).
Should the details panel be visible at all times, or does the user need to click it to expand?
Should you create friction by adding a preview screen? This forces the user to slow down and consider their trade, which can be useful. But do they want to see all the same info again? What is most useful to them at this point?

## 設計選項 {#design-options}

As mentioned, a lot of this comes down to your personal style
Who is your user?
What is your brand?
Do you want a “pro” interface showing every detail, or do you want to be minimalist?
Even if you’re aiming for the pro users who want all info possible, you should still remember Alan Cooper’s wise words:

> No matter how beautiful, no matter how cool your interface, it would be better if there were less of it.

### 結構 {#structure}

- 代幣在左邊或是右邊
- 2 行或 3 行
- details above or below the button
- details expanded, minimized, or not shown

### Component style {#component-style}

- empty
- outlined
- filled

From a pure UX point of view, UI style matters less than you think. Visual trends come and go in cycles, and a lot of preference is subjective.

The easiest way to get a feel for this - and think about the various different configurations - is to take a look at some examples and then do some experimenting yourself.

The included Figma kit contains empty, outlined and filled components.

Take a look at the below examples to see different ways you can put it all together:

![3 rows in a filled style](./7.png)

![3 rows in a outlined style](./8.png)

![2 rows in an empty style](./9.png)

![3 rows in an outlined style, with a details panel](./10.png)

![3 rows with the input row in an outlined style](./11.png)

![2 rows in a filled style](./12.png)

## But which side should the token go on? {#but-which-side-should-the-token-go-on}

The bottom line is that it probably doesn’t make a huge difference to usability. There are a few things to bear in mind, however, which might sway you one way or the other.

It’s been mildly interesting to see the fashion change with time. Uniswap initially had the token on the left, but has since moved it to the right. Sushiswap also made this change during a design upgrade. Most, but not all, protocols have followed suit.

Financial convention traditionally puts the currency symbol before the number, e.g. $50, €50, £50, but we _say_ 50 dollars, 50 Euros, 50 pounds.

對於一般用戶，特別是從左到右、從上到下閱讀的人，在右邊的代幣可能感覺更自然。

![A UI with tokens on the left](./13.png)

Putting the token on the left and all the numbers on the right looks pleasingly symmetrical, which is a plus, but there is another downside to this layout.

The law of proximity states that items that are close together are perceived as related. Accordingly, we want to place related items next to each other. The token balance is directly related to the token itself, and will change whenever a new token is selected. It therefore makes slightly more sense for the token balance to be next to the token select button. It could be moved underneath the token, but that breaks the symmetry of the layout.

Ultimately, there are pluses and minuses for both options, but it is interesting how the trend appears to be towards token on the right.

# 按鍵行為 {#button-behavior}

Don’t have a separate button for Approve. Also don’t have a separate click for Approve. The user wants to Swap, so just say “swap” on the button and initiate the approval as the first step. A modal can show progress with a stepper, or a simple “tx 1 of 2 - approving” notification.

![A UI with separate buttons for approve and swap](./14.png)

![A UI with one button that says approve](./15.png)

## Button as contextual help {#button-as-contextual-help}

The button can do double duty as an alert!

This is actually a fairly unusual design pattern outside of Web3, but has become standard within it. This is a good innovation as it saves space, and keeps attention focused.

If the main action - SWAP - is unavailable due to an error, the reason why can be explained with the button, e.g.:

- switch network
- 連結錢包
- various errors

The button can also be **mapped to the action** that needs to be performed. For example, if the user cannot swap because they are on the wrong network, the button should say “switch to Ethereum”, and when the user clicks on the button, it should switch the network to Ethereum. This speeds up the user flow significantly.

![Key actions being initiated from the main CTA](./16.png)

![Error message shown within the main CTA](./17.png)

## Build your own with this figma file {#build-your-own-with-this-figma-file}

Thanks to the hard work of multiple protocols, DEX design has improved a lot. We know what info the user needs, how we should show it, and how to make the flow as smooth as possible.
Hopefully this article provides a solid overview of the UX principles.

If you want to experiment, please feel free to use the Figma wireframe kit. It is kept as simple as possible, but has enough flexibility to build the basic structure in various ways.

[Figma wireframe kit](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi will continue to evolve, and there is always room for improvement.

祝你好運！
