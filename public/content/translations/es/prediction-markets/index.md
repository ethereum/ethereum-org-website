---
title: "Mercados de predicción"
lang: es
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Opera sobre el resultado de eventos futuros"
  - "Los precios funcionan como una estimación pública y en vivo de la probabilidad de que algo ocurra"
buttons:
  - content: Más información
    toId: how-prediction-markets-work
  - content: Explorar aplicaciones
    toId: find-a-prediction-market
    isSecondary: false
---

Los mercados de predicción permiten a las personas comprar y vender participaciones sobre el resultado de eventos futuros. El precio de una participación muestra qué tan probable considera el mercado en su conjunto que sea ese resultado. Atrajeron mucha atención durante las elecciones de EE. UU. de 2024.

## Cómo funcionan los mercados de predicción {#how-prediction-markets-work}

Cada mercado plantea una pregunta con una respuesta clara, como "¿Lloverá mañana en Lisboa?". Una participación por el **Sí** paga 1 $ si la respuesta resulta ser afirmativa y nada si no lo es. Una participación por el **No** funciona al revés.

Si las participaciones por el Sí se cotizan a 67 centavos, el mercado está diciendo que hay aproximadamente un 67 % de probabilidad de lluvia. Cualquiera que piense que la probabilidad real es diferente puede comprar o vender, y eso mueve el precio. Debido a que las personas que tienen más información tienen un motivo para operar, la nueva información tiende a reflejarse rápidamente en el precio. Es por eso que los mercados de predicción pueden ser pronósticos útiles. No son perfectos.

Cada participación ganadora es pagada por alguien que mantuvo la posición perdedora. Los mercados de predicción son de **suma cero**: aparte de las comisiones, lo que ganan los ganadores, lo pierden los perdedores.

## ¿Por qué es importante esto? {#why-does-this-matter}

Los mercados de predicción basados en cadenas de bloques añaden algunas cosas que los sitios de apuestas y los intercambios tradicionales no tienen:

<Grid>
  <Card title="Datos abiertos" emoji="🔍" description="Cada operación se registra en cadena, por lo que cualquiera puede comprobar los precios, los volúmenes y quién ganó o perdió."/>
  <Card title="Liquidación en cadena" emoji="🌎" description="Las posiciones son tokens en su propia billetera, y los contratos inteligentes pagan las participaciones ganadoras una vez que se informa el resultado." />
  <Card title="Probabilidades impulsadas por el mercado" emoji="🤝" description="Los precios son establecidos por los operadores que compran y venden participaciones de resultados, en lugar de estar preestablecidos por un corredor de apuestas centralizado." />
</Grid>

Los datos abiertos son importantes en la práctica. Los investigadores pudieron [estudiar cada operación en Polymarket](https://cepr.org/publications/dp21615), cubriendo a más de 2,4 millones de usuarios desde noviembre de 2022 hasta marzo de 2026, porque sus operaciones se liquidan en una cadena de bloques pública. Ese tipo de verificación independiente no es posible en plataformas centralizadas como Kalshi, donde las operaciones y los pagos ocurren en los propios sistemas de la empresa. No hay un registro público que auditar, ni un contrato inteligente que garantice que se paguen las posiciones ganadoras.

Así es como funciona un mercado de principio a fin:

1. Se crea un mercado en torno a una pregunta con reglas claras sobre cómo se decidirá.
2. Los operadores compran y venden participaciones por el Sí y el No, y el precio se mueve a medida que lo hacen.
3. Una vez que ocurre el evento, un [oráculo](/developers/docs/oracles/) informa el resultado en cadena. En Polymarket, cualquiera puede proponer el resultado haciendo un depósito, y cualquier otra persona puede disputarlo. Si no se resuelve una disputa, los titulares del token UMA votan sobre el resultado.
4. Cada participación ganadora se puede canjear por 1 $. Las participaciones perdedoras no valen nada.
5. Cualquiera puede utilizar el historial de precios y los datos comerciales para investigación o debate.

## Encuentre un mercado de predicción {#find-a-prediction-market}

Estos mercados de predicción liquidan las operaciones en cadena, por lo que cualquiera puede comprobar los precios y el historial de operaciones:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Tenga en cuenta los riesgos</strong></p>
  <p className="mt-2">La mayoría de las personas que operan en los mercados de predicción pierden dinero. Opere solo con lo que pueda permitirse perder y sea consciente de los posibles comportamientos adictivos.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Desafíos y riesgos {#challenges-and-risks}

Los mercados de predicción se enfrentan a desafíos reales que afectan a la equidad, la legalidad y la precisión.

📉 **La mayoría de los operadores pierden**: un [estudio de cada operación en Polymarket](https://cepr.org/publications/dp21615) desde noviembre de 2022 hasta marzo de 2026 descubrió que aproximadamente el 69 % de los usuarios terminaron con pérdidas. Entre los usuarios que ganaron dinero, el 1 % superior se llevó el 76,5 % de las ganancias. Los mayores ganadores fueron en su mayoría operadores que proporcionan liquidez con órdenes limitadas, a menudo de forma profesional y con un alto volumen.

🕵️ **Uso de información privilegiada**: las personas que conocen el resultado de antemano pueden beneficiarse a expensas de otros operadores. [Investigadores de la Facultad de Derecho de Columbia y la Universidad de Haifa](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) estimaron que los presuntos operadores informados ganaron alrededor de 143 millones de dólares en Polymarket entre febrero de 2024 y febrero de 2026.

⚖️ **Resultados disputados**: los contratos inteligentes pueden pagar automáticamente, pero alguien todavía tiene que informar de lo que sucedió. Cuando una pregunta está redactada de forma imprecisa o los hechos no están claros, el resultado informado puede ser impugnado.

⚠️ **Manipulación del mercado**: los operadores con mucho dinero pueden mover los precios, especialmente en mercados pequeños. El comercio de lavado (operar con uno mismo) puede hacer que un mercado parezca más activo de lo que es.

💧 **Problemas de liquidez**: la baja participación ([poca liquidez](https://www.investopedia.com/terms/t/thinmarket.asp)) puede hacer que los precios sean menos fiables.

🏛 **Incertidumbre regulatoria**: las reglas difieren según el país y cambian rápidamente. En EE. UU., los reguladores y los tribunales todavía están decidiendo si algunos contratos de eventos, especialmente en deportes, cuentan como productos financieros o juegos de azar. Muchas plataformas bloquean a los usuarios en ciertos países.

## Experimentar con los mercados de predicción {#experimenting-with-prediction-markets}

Los mercados de predicción pueden ser útiles más allá de operar para obtener ganancias. Una idea, llamada futarquía, va más allá y utiliza los mercados para ayudar a tomar decisiones, no solo para pronosticarlas.

Por ejemplo, una [Propuesta de Mejora de Devcon](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) sugirió que los organizadores de Devcon utilicen los mercados de predicción para pronosticar la asistencia en posibles ubicaciones futuras. Esto podría ayudarles a sopesar qué ciudad atraería el evento más grande frente a cuál sería la más accesible a nivel internacional. También podría ahorrar tiempo dedicado a comparar políticas de visados, acceso a aeropuertos y costo de vida, al tiempo que muestra a dónde estarían emocionados de ir los posibles asistentes.

## Lecturas adicionales {#further-reading}

[De los mercados de predicción a las finanzas de la información](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[¿Quién gana y quién pierde en los mercados de predicción? Evidencia de Polymarket](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie y Martineau  
[El documento técnico del proyecto Augur](https://github.com/AugurProject/whitepaper)
