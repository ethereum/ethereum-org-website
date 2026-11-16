---
title: "Mercados de previsão"
lang: pt-br
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Negocie sobre o resultado de eventos futuros"
  - "Os preços funcionam como uma estimativa pública e em tempo real da probabilidade de algo acontecer"
buttons:
  - content: Saiba mais
    toId: how-prediction-markets-work
  - content: Explorar aplicativos
    toId: find-a-prediction-market
    isSecondary: false
---

Os mercados de previsão permitem que as pessoas comprem e vendam ações no resultado de eventos futuros. O preço de uma ação mostra a probabilidade que o mercado como um todo atribui àquele resultado. Eles chamaram muita atenção durante as eleições dos EUA em 2024.

## Como funcionam os mercados de previsão {#how-prediction-markets-work}

Cada mercado faz uma pergunta com uma resposta clara, como "Vai chover em Lisboa amanhã?". Uma ação de **Sim** paga US$ 1 se a resposta for sim e nada se não for. Uma ação de **Não** funciona da maneira inversa.

Se as ações de Sim são negociadas a 67 centavos, o mercado está dizendo que há cerca de 67% de chance de chuva. Qualquer pessoa que ache que a chance real é diferente pode comprar ou vender, e isso movimenta o preço. Como as pessoas que sabem mais têm um motivo para negociar, novas informações tendem a aparecer no preço rapidamente. É por isso que os mercados de previsão podem ser previsões úteis. Eles não são perfeitos.

Cada ação vencedora é paga por alguém que estava do lado perdedor. Os mercados de previsão são de **soma zero**: tirando as taxas, o que os vencedores ganham, os perdedores perdem.

## Por que isso importa? {#why-does-this-matter}

Os mercados de previsão baseados em blockchain adicionam algumas coisas que os sites de apostas e corretoras tradicionais não têm:

<Grid>
  <Card title="Dados abertos" emoji="🔍" description="Cada negociação é registrada onchain, para que qualquer pessoa possa verificar preços, volumes e quem ganhou ou perdeu."/>
  <Card title="Liquidação onchain" emoji="🌎" description="As posições são tokens na sua própria carteira, e os contratos inteligentes pagam as ações vencedoras assim que o resultado é relatado." />
  <Card title="Probabilidades impulsionadas pelo mercado" emoji="🤝" description="Os preços são definidos por traders comprando e vendendo ações de resultados, em vez de serem predefinidos por uma casa de apostas centralizada." />
</Grid>

Dados abertos importam na prática. Pesquisadores conseguiram [estudar cada negociação na Polymarket](https://cepr.org/publications/dp21615), cobrindo mais de 2,4 milhões de usuários de novembro de 2022 a março de 2026, porque suas negociações são liquidadas em uma blockchain pública. Esse tipo de verificação independente não é possível em plataformas centralizadas como a Kalshi, onde as negociações e os pagamentos acontecem nos próprios sistemas da empresa. Não há registro público para auditar e nenhum contrato inteligente garantindo que as posições vencedoras sejam pagas.

Veja como um mercado funciona do início ao fim:

1. Um mercado é criado em torno de uma pergunta com regras claras de como ela será decidida.
2. Os traders compram e vendem ações de Sim e Não, e o preço se move conforme eles fazem isso.
3. Assim que o evento acontece, um [oráculo](/developers/docs/oracles/) relata o resultado onchain. Na Polymarket, qualquer pessoa pode propor o resultado fazendo um depósito, e qualquer outra pessoa pode contestá-lo. Se uma disputa não for resolvida, os detentores do token UMA votam no resultado.
4. Cada ação vencedora pode ser resgatada por US$ 1. As ações perdedoras não valem nada.
5. Qualquer pessoa pode usar o histórico de preços e os dados de negociação para pesquisa ou discussão.

## Encontre um mercado de previsão {#find-a-prediction-market}

Esses mercados de previsão liquidam negociações onchain, para que qualquer pessoa possa verificar os preços e o histórico de negociações:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Esteja ciente dos riscos</strong></p>
  <p className="mt-2">A maioria das pessoas que negociam em mercados de previsão perde dinheiro. Negocie apenas o que você pode perder e esteja ciente de possíveis comportamentos viciantes.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Desafios e Riscos {#challenges-and-risks}

Os mercados de previsão enfrentam desafios reais que afetam a justiça, a legalidade e a precisão.

📉 **A maioria dos traders perde** – Um [estudo de cada negociação na Polymarket](https://cepr.org/publications/dp21615) de novembro de 2022 a março de 2026 descobriu que cerca de 69% dos usuários terminaram com prejuízo. Entre os usuários que ganharam dinheiro, o 1% do topo ficou com 76,5% dos lucros. Os maiores vencedores foram, em sua maioria, traders que fornecem liquidez com ordens limitadas, muitas vezes profissionalmente e em alto volume.

🕵️ **Insider trading (uso de informações privilegiadas)** – Pessoas que sabem o resultado com antecedência podem lucrar às custas de outros traders. [Pesquisadores da Columbia Law School e da Universidade de Haifa](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) estimaram que traders suspeitos de terem informações privilegiadas ganharam cerca de US$ 143 milhões na Polymarket entre fevereiro de 2024 e fevereiro de 2026.

⚖️ **Resultados contestados** – Os contratos inteligentes podem pagar automaticamente, mas alguém ainda precisa relatar o que aconteceu. Quando uma pergunta é formulada de forma vaga ou os fatos não são claros, o resultado relatado pode ser contestado.

⚠️ **Manipulação de mercado** – Traders com muito dinheiro podem movimentar os preços, especialmente em mercados pequenos. O wash trading (negociar consigo mesmo) pode fazer um mercado parecer mais movimentado do que realmente é.

💧 **Problemas de liquidez** – A baixa participação ([baixa liquidez](https://www.investopedia.com/terms/t/thinmarket.asp)) pode tornar os preços menos confiáveis.

🏛 **Incerteza regulatória** – As regras diferem por país e mudam rapidamente. Nos EUA, os reguladores e os tribunais ainda estão decidindo se alguns contratos de eventos, especialmente em esportes, contam como produtos financeiros ou jogos de azar. Muitas plataformas bloqueiam usuários em determinados países.

## Experimentando com mercados de previsão {#experimenting-with-prediction-markets}

Os mercados de previsão podem ser úteis além da negociação com fins lucrativos. Uma ideia, chamada futarquia, vai além e usa os mercados para ajudar a tomar decisões, não apenas prevê-las.

Por exemplo, uma [Proposta de Melhoria da Devcon](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) sugeriu que os organizadores da Devcon usassem mercados de previsão para prever o comparecimento em possíveis locais futuros. Isso poderia ajudá-los a pesar qual cidade atrairia o maior evento em comparação com qual seria a mais acessível internacionalmente. Também poderia economizar o tempo gasto comparando políticas de vistos, acesso a aeroportos e custo de vida, ao mesmo tempo em que mostraria para onde os possíveis participantes estariam animados em ir.

## Leitura adicional {#further-reading}

[Dos mercados de previsão às finanças da informação](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Quem ganha e quem perde nos mercados de previsão? Evidências da Polymarket](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie e Martineau  
[O Whitepaper do Projeto Augur](https://github.com/AugurProject/whitepaper)
