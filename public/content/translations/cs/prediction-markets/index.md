---
title: "Predikční trhy"
lang: cs
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Obchodujte s výsledky budoucích událostí"
  - "Ceny fungují jako živý, veřejný odhad pravděpodobnosti, že se něco stane"
buttons:
  - content: Zjistit více
    toId: how-prediction-markets-work
  - content: Prozkoumat aplikace
    toId: find-a-prediction-market
    isSecondary: false
---

Predikční trhy umožňují lidem kupovat a prodávat podíly na výsledku budoucích událostí. Cena podílu ukazuje, jak pravděpodobný se daný výsledek zdá trhu jako celku. Získaly si širokou pozornost během voleb v USA v roce 2024.

## Jak fungují predikční trhy {#how-prediction-markets-work}

Každý trh klade otázku s jasnou odpovědí, například „Bude zítra v Lisabonu pršet?“. Podíl **Ano** vyplatí 1 $, pokud se ukáže, že odpověď je ano, a nic, pokud ne. Podíl **Ne** funguje přesně naopak.

Pokud se podíly Ano obchodují za 67 centů, trh tím říká, že je zhruba 67% šance na déšť. Kdokoli, kdo si myslí, že skutečná šance je jiná, může nakupovat nebo prodávat, a to hýbe s cenou. Protože lidé, kteří vědí více, mají důvod obchodovat, nové informace se v ceně obvykle projeví rychle. Proto mohou být predikční trhy užitečnými nástroji pro předpovídání. Nejsou však dokonalé.

Každý vítězný podíl je zaplacen někým, kdo držel stranu, která prohrála. Predikční trhy mají **nulový součet**: kromě poplatků platí, že to, co vítězové vydělají, poražení ztratí.

## Proč na tom záleží? {#why-does-this-matter}

Predikční trhy založené na blockchainu přidávají několik věcí, které tradiční sázkové weby a burzy nemají:

<Grid>
  <Card title="Otevřená data" emoji="🔍" description="Každý obchod je zaznamenán onchain, takže kdokoli může zkontrolovat ceny, objemy a to, kdo vyhrál nebo prohrál."/>
  <Card title="Onchain vypořádání" emoji="🌎" description="Pozice jsou tokeny ve vaší vlastní peněžence a chytré kontrakty vyplatí vítězné podíly, jakmile je nahlášen výsledek." />
  <Card title="Kurzy řízené trhem" emoji="🤝" description="Ceny jsou určovány obchodníky, kteří kupují a prodávají podíly na výsledku, spíše než aby byly předem stanoveny centralizovaným bookmakerem." />
</Grid>

Otevřená data mají v praxi význam. Výzkumníci mohli [studovat každý obchod na Polymarketu](https://cepr.org/publications/dp21615), což zahrnovalo více než 2,4 milionu uživatelů od listopadu 2022 do března 2026, protože jeho obchody se vypořádávají na veřejném blockchainu. Taková nezávislá kontrola není možná na centralizovaných platformách, jako je Kalshi, kde obchodování a výplaty probíhají na vlastních systémech společnosti. Neexistuje žádný veřejný záznam k auditu a žádný chytrý kontrakt, který by zaručoval, že vítězné pozice budou vyplaceny.

Zde je ukázka toho, jak trh funguje od začátku do konce:

1. Trh je vytvořen kolem otázky s jasnými pravidly, jak se o ní rozhodne.
2. Obchodníci kupují a prodávají podíly Ano a Ne a cena se pohybuje podle toho, jak obchodují.
3. Jakmile událost nastane, [orákulum](/developers/docs/oracles/) nahlásí výsledek onchain. Na Polymarketu může kdokoli navrhnout výsledek složením zálohy a kdokoli jiný jej může zpochybnit. Pokud se spor nevyřeší, držitelé tokenu UMA hlasují o výsledku.
4. Každý vítězný podíl lze vyměnit za 1 $. Prohrávající podíly nemají žádnou hodnotu.
5. Kdokoli může použít historii cen a údaje o obchodech pro výzkum nebo diskusi.

## Najděte si predikční trh {#find-a-prediction-market}

Tyto predikční trhy vypořádávají obchody onchain, takže kdokoli může zkontrolovat ceny a historii obchodování:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Mějte na paměti rizika</strong></p>
  <p className="mt-2">Většina lidí, kteří obchodují na predikčních trzích, prodělá. Obchodujte pouze s tím, co si můžete dovolit ztratit, a buďte si vědomi možného návykového chování.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Výzvy a rizika {#challenges-and-risks}

Predikční trhy čelí skutečným výzvám, které ovlivňují spravedlnost, legalitu a přesnost.

📉 **Většina obchodníků prodělá** – [Studie každého obchodu na Polymarketu](https://cepr.org/publications/dp21615) od listopadu 2022 do března 2026 zjistila, že asi 69 % uživatelů skončilo ve ztrátě. Mezi uživateli, kteří vydělali peníze, si horní 1 % odneslo 76,5 % zisků. Největšími vítězi byli většinou obchodníci, kteří poskytují likviditu pomocí limitních příkazů, často profesionálně a ve velkém objemu.

🕵️ **Obchodování zasvěcených osob (insider trading)** – Lidé, kteří znají výsledek předem, mohou profitovat na úkor ostatních obchodníků. [Výzkumníci z Columbia Law School a University of Haifa](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) odhadli, že podezřelí informovaní obchodníci vydělali na Polymarketu mezi únorem 2024 a únorem 2026 přibližně 143 milionů dolarů.

⚖️ **Sporné výsledky** – Chytré kontrakty mohou vyplácet automaticky, ale někdo stále musí nahlásit, co se stalo. Když je otázka formulována volně nebo jsou fakta nejasná, nahlášený výsledek může být zpochybněn.

⚠️ **Manipulace s trhem** – Obchodníci s velkým množstvím peněz mohou hýbat cenami, zejména na malých trzích. Wash trading (obchodování se sebou samým) může způsobit, že trh vypadá rušněji, než ve skutečnosti je.

💧 **Problémy s likviditou** – Nízká účast ([slabá likvidita](https://www.investopedia.com/terms/t/thinmarket.asp)) může způsobit, že ceny budou méně spolehlivé.

🏛 **Regulační nejistota** – Pravidla se liší podle země a rychle se mění. V USA regulační orgány a soudy stále rozhodují o tom, zda se některé kontrakty na události, zejména ve sportu, počítají jako finanční produkty nebo hazardní hry. Mnoho platforem blokuje uživatele v určitých zemích.

## Experimentování s predikčními trhy {#experimenting-with-prediction-markets}

Predikční trhy mohou být užitečné i nad rámec obchodování za účelem zisku. Jedna myšlenka, zvaná futarchie, jde ještě dále a využívá trhy k pomoci při rozhodování, nejen k jejich předpovídání.

Například [návrh na vylepšení Devconu](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) navrhl, aby organizátoři Devconu využili predikční trhy k předpovědi účasti v možných budoucích lokalitách. To by jim mohlo pomoci zvážit, které město by přilákalo největší událost, v porovnání s tím, které by bylo mezinárodně nejdostupnější. Mohlo by to také ušetřit čas strávený porovnáváním vízových politik, dostupnosti letišť a životních nákladů, a zároveň ukázat, kam by se potenciální účastníci těšili.

## Další čtení {#further-reading}

[Od predikčních trhů k informačním financím](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Kdo vyhrává a kdo prohrává na predikčních trzích? Důkazy z Polymarketu](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie a Martineau  
[Bílá kniha projektu Augur](https://github.com/AugurProject/whitepaper)
