---
title: "Marchés de prédiction"
lang: fr
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Négociez sur l'issue d'événements futurs"
  - "Les prix servent d'estimation publique et en temps réel de la probabilité d'un événement"
buttons:
  - content: En savoir plus
    toId: how-prediction-markets-work
  - content: Explorer les applications
    toId: find-a-prediction-market
    isSecondary: false
---

Les marchés de prédiction permettent aux utilisateurs d'acheter et de vendre des parts sur l'issue d'événements futurs. Le prix d'une part indique la probabilité que le marché dans son ensemble attribue à cette issue. Ils ont attiré une grande attention lors des élections américaines de 2024.

## Comment fonctionnent les marchés de prédiction {#how-prediction-markets-work}

Chaque marché pose une question avec une réponse claire, comme « Pleuvra-t-il à Lisbonne demain ? ». Une part **Oui** rapporte 1 $ si la réponse s'avère être oui, et rien dans le cas contraire. Une part **Non** fonctionne de manière inverse.

Si les parts Oui s'échangent à 67 centimes, le marché indique qu'il y a environ 67 % de chances qu'il pleuve. Quiconque pense que la probabilité réelle est différente peut acheter ou vendre, ce qui fait bouger le prix. Étant donné que les personnes mieux informées ont une raison de négocier, les nouvelles informations ont tendance à se refléter rapidement dans le prix. C'est pourquoi les marchés de prédiction peuvent être des outils de prévision utiles. Ils ne sont cependant pas parfaits.

Chaque part gagnante est payée par quelqu'un qui détenait le côté perdant. Les marchés de prédiction sont à **somme nulle** : en dehors des frais, ce que les gagnants remportent, les perdants le perdent.

## Pourquoi est-ce important ? {#why-does-this-matter}

Les marchés de prédiction basés sur la chaîne de blocs apportent quelques éléments que les sites de paris et les bourses traditionnels n'offrent pas :

<Grid>
  <Card title="Données ouvertes" emoji="🔍" description="Chaque transaction est enregistrée onchain, de sorte que n'importe qui peut vérifier les prix, les volumes et qui a gagné ou perdu."/>
  <Card title="Règlement onchain" emoji="🌎" description="Les positions sont des jetons dans votre propre portefeuille, et les contrats intelligents paient les parts gagnantes une fois le résultat communiqué." />
  <Card title="Cotes dictées par le marché" emoji="🤝" description="Les prix sont fixés par les traders qui achètent et vendent des parts de résultat, plutôt que d'être prédéfinis par un bookmaker centralisé." />
</Grid>

Les données ouvertes ont une importance pratique. Des chercheurs ont pu [étudier chaque transaction sur Polymarket](https://cepr.org/publications/dp21615), couvrant plus de 2,4 millions d'utilisateurs de novembre 2022 à mars 2026, car ses transactions sont réglées sur une chaîne de blocs publique. Ce type de vérification indépendante n'est pas possible sur des plateformes centralisées comme Kalshi, où les transactions et les paiements s'effectuent sur les propres systèmes de l'entreprise. Il n'y a pas de registre public à auditer, ni de contrat intelligent garantissant que les positions gagnantes seront payées.

Voici comment fonctionne un marché du début à la fin :

1. Un marché est créé autour d'une question avec des règles claires sur la façon dont elle sera tranchée.
2. Les traders achètent et vendent des parts Oui et Non, et le prix évolue en conséquence.
3. Une fois l'événement survenu, un [oracle](/developers/docs/oracles/) rapporte le résultat onchain. Sur Polymarket, n'importe qui peut proposer le résultat en versant un acompte, et n'importe qui d'autre peut le contester. Si un litige n'est pas résolu, les détenteurs du jeton UMA votent sur l'issue.
4. Chaque part gagnante peut être échangée contre 1 $. Les parts perdantes ne valent rien.
5. N'importe qui peut utiliser l'historique des prix et les données de transaction à des fins de recherche ou de discussion.

## Trouver un marché de prédiction {#find-a-prediction-market}

Ces marchés de prédiction règlent les transactions onchain, de sorte que n'importe qui peut vérifier les prix et l'historique des transactions :

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Restez conscient des risques</strong></p>
  <p className="mt-2">La plupart des personnes qui négocient sur les marchés de prédiction perdent de l'argent. Ne négociez que ce que vous pouvez vous permettre de perdre et soyez conscient des comportements addictifs potentiels.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Défis et risques {#challenges-and-risks}

Les marchés de prédiction sont confrontés à de réels défis qui affectent l'équité, la légalité et l'exactitude.

📉 **La plupart des traders perdent** – Une [étude de chaque transaction sur Polymarket](https://cepr.org/publications/dp21615) de novembre 2022 à mars 2026 a révélé qu'environ 69 % des utilisateurs ont terminé avec une perte. Parmi les utilisateurs qui ont gagné de l'argent, le 1 % supérieur a empoché 76,5 % des bénéfices. Les plus grands gagnants étaient principalement des traders qui fournissent de la liquidité avec des ordres à cours limité, souvent de manière professionnelle et avec un volume élevé.

🕵️ **Délit d'initié** – Les personnes qui connaissent l'issue à l'avance peuvent faire des profits aux dépens des autres traders. Des [chercheurs de la Columbia Law School et de l'Université de Haïfa](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) ont estimé que des traders soupçonnés d'être informés ont gagné environ 143 millions de dollars sur Polymarket entre février 2024 et février 2026.

⚖️ **Résultats contestés** – Les contrats intelligents peuvent payer automatiquement, mais quelqu'un doit tout de même rapporter ce qui s'est passé. Lorsqu'une question est formulée de manière vague ou que les faits ne sont pas clairs, le résultat rapporté peut être contesté.

⚠️ **Manipulation du marché** – Les traders disposant de beaucoup d'argent peuvent faire bouger les prix, en particulier sur les petits marchés. Le wash trading (négocier avec soi-même) peut donner l'impression qu'un marché est plus actif qu'il ne l'est en réalité.

💧 **Problèmes de liquidité** – Une faible participation ([faible liquidité](https://www.investopedia.com/terms/t/thinmarket.asp)) peut rendre les prix moins fiables.

🏛 **Incertitude réglementaire** – Les règles diffèrent selon les pays et changent rapidement. Aux États-Unis, les régulateurs et les tribunaux sont encore en train de décider si certains contrats d'événements, en particulier sur le sport, comptent comme des produits financiers ou des jeux d'argent. De nombreuses plateformes bloquent les utilisateurs dans certains pays.

## Expérimenter avec les marchés de prédiction {#experimenting-with-prediction-markets}

Les marchés de prédiction peuvent être utiles au-delà de la négociation à but lucratif. Une idée, appelée futarchie, va plus loin et utilise les marchés pour aider à prendre des décisions, et pas seulement pour les prévoir.

Par exemple, une [proposition d'amélioration de la Devcon](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) a suggéré que les organisateurs de la Devcon utilisent les marchés de prédiction pour prévoir la fréquentation dans d'éventuels futurs lieux. Cela pourrait les aider à évaluer quelle ville attirerait le plus grand événement par rapport à celle qui serait la plus accessible au niveau international. Cela pourrait également faire gagner du temps passé à comparer les politiques de visa, l'accès aux aéroports et le coût de la vie, tout en montrant où les participants potentiels seraient ravis d'aller.

## Complément d'information {#further-reading}

[Des marchés de prédiction à la finance de l'information](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Qui gagne et qui perd sur les marchés de prédiction ? Preuves de Polymarket](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie et Martineau  
[Le livre blanc du projet Augur](https://github.com/AugurProject/whitepaper)
