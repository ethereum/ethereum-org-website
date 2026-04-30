---
title: Saques de staking
description: Página que resume o que são os saques de staking, como funcionam e o que os stakers precisam fazer para receber suas recompensas
lang: pt-br
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie, a rinoceronte, com suas recompensas de staking
sidebarDepth: 2
summaryPoints:
  - Os operadores de validadores devem fornecer um endereço de saque para habilitar os saques
  - Validadores legados têm o saldo excedente acima de 32 ETH sacado automaticamente a cada poucos dias
  - Validadores compostos ganham recompensas sobre seu saldo total até 2048 ETH
  - Validadores que saírem totalmente do staking receberão seu saldo restante
---

**Saques de staking** referem-se a transferências de ETH de uma conta de validador na camada de consenso do Ethereum (a beacon chain), para a camada de execução, onde pode ser transacionado.

Como os saques funcionam depende do tipo de credencial de saque do seu validador:

- **Validadores legados (Tipo 1)**: O saldo excedente acima de 32 ETH é enviado automática e regularmente para o endereço de saque vinculado ao validador. Recompensas acima de 32 ETH não contribuem para o peso do validador na rede.
- **Validadores compostos (Tipo 2)**: As recompensas são compostas no saldo efetivo do validador até 2048 ETH, aumentando o peso do validador e ganhando mais recompensas. Apenas o saldo que excede 2048 ETH é varrido automaticamente.

Os usuários também podem **sair totalmente do staking**, desbloqueando todo o saldo do validador.

## Recompensas de staking {#staking-rewards}

Como as recompensas são tratadas depende do tipo de credencial do validador:

**Validadores legados (Tipo 1)** têm um saldo efetivo limitado a 32 ETH. Qualquer saldo acima de 32 ETH ganho por meio de recompensas não contribui para o principal nem aumenta o peso deste validador na rede, e é sacado automaticamente como pagamento de recompensa a cada poucos dias. Além de fornecer um endereço de saque uma vez, essas recompensas não exigem nenhuma ação do operador do validador. Tudo isso é iniciado na camada de consenso, portanto, nenhum gas (taxa de transação) é necessário em nenhuma etapa.

**Validadores compostos (Tipo 2)** podem ter um saldo efetivo em qualquer lugar entre 32 e 2048 ETH. As recompensas ganhas por esses validadores são compostas em seu saldo efetivo, aumentando o peso do validador e as recompensas futuras. Varreduras automáticas ocorrem apenas para saldos que excedem 2048 ETH. Para sacar recompensas abaixo do limite de 2048 ETH, os validadores compostos devem acionar um saque parcial manualmente a partir da camada de execução, o que exige gas.

### Como chegamos aqui? {#how-did-we-get-here}

Nos últimos anos, o [Ethereum](/) passou por várias atualizações de rede, fazendo a transição para uma rede protegida pelo próprio ETH, em vez da mineração com uso intensivo de energia como era antes. A participação no consenso no Ethereum agora é conhecida como "staking", pois os participantes bloquearam voluntariamente o ETH, colocando-o "em jogo" (at stake) pela capacidade de participar da rede. Os usuários que seguirem as regras serão recompensados, enquanto as tentativas de trapacear podem ser penalizadas.

Desde o lançamento do contrato de depósito de staking em novembro de 2020, alguns bravos pioneiros do Ethereum bloquearam fundos voluntariamente para ativar "validadores", contas especiais que têm o direito de atestar formalmente e propor blocos, seguindo as regras da rede.

Antes da atualização Shanghai/Capella, você não podia usar ou acessar seu ETH em staking. Mas agora, você pode optar por receber automaticamente suas recompensas em uma conta escolhida e também pode sacar seu ETH em staking sempre que quiser.

### Como me preparo? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avisos importantes {#important-notices}

Fornecer um endereço de saque é uma etapa obrigatória para qualquer conta de validador antes que ela seja elegível para ter ETH sacado de seu saldo.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Cada conta de validador só pode receber um único endereço de saque, uma vez.** Depois que um endereço é escolhido e enviado para a camada de consenso, isso não pode ser desfeito ou alterado novamente. Verifique a propriedade e a precisão do endereço fornecido antes de enviar.
</AlertDescription>
</AlertContent>
</Alert>

**Não há ameaça aos seus fundos nesse meio tempo** por não fornecer isso, assumindo que sua frase mnemônica/frase semente permaneceu segura offline e não foi comprometida de forma alguma. A falha em adicionar credenciais de saque simplesmente deixará o ETH bloqueado na conta do validador como tem estado até que um endereço de saque seja fornecido.

## Validadores compostos {#compounding-validators}

Os validadores podem optar pela **composição** convertendo suas credenciais de saque do Tipo 1 para o Tipo 2. Isso aumenta o saldo efetivo máximo de 32 ETH para **2048 ETH**, permitindo que as recompensas sejam compostas no saldo efetivo do validador em vez de serem varridas automaticamente.

Com a composição ativada:

- As recompensas aumentam o saldo efetivo do validador em incrementos de 1 ETH (sujeito a um pequeno [buffer de histerese](https://www.attestant.io/posts/understanding-validator-effective-balance/)), ganhando mais recompensas ao longo do tempo
- Varreduras automáticas ocorrem apenas para saldos que excedem 2048 ETH
- Saques parciais abaixo do limite de 2048 ETH devem ser acionados manualmente a partir da camada de execução (isso custa gas)
- Vários validadores podem ser **consolidados** em um único validador composto, reduzindo a sobrecarga operacional

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**A conversão de credenciais de saque do Tipo 1 para o Tipo 2 é irreversível.** Use o [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) como a ferramenta oficial para essa conversão. Para obter mais detalhes sobre o processo de conversão, riscos e consolidação, consulte a [análise aprofundada do MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Saindo totalmente do staking {#exiting-staking-entirely}

Fornecer um endereço de saque é necessário antes que _quaisquer_ fundos possam ser transferidos do saldo de uma conta de validador.

Os usuários que desejam sair totalmente do staking e sacar todo o seu saldo de volta devem iniciar uma "saída voluntária". Isso pode ser feito de duas maneiras:

- **Usando chaves de validador**: Assine e transmita uma mensagem de saída voluntária com seu cliente de validador, enviada ao seu nó de consenso. Isso não exige gas.
- **Usando credenciais de saque**: Acione uma saída a partir da camada de execução usando seu endereço de saque, sem precisar de acesso à chave de assinatura do validador. Isso exige uma transação e custa gas.

O processo de saída de um validador do staking leva uma quantidade variável de tempo, dependendo de quantos outros estão saindo ao mesmo tempo. Uma vez concluído, esta conta não será mais responsável por realizar as funções de rede do validador, não será mais elegível para recompensas e não terá mais seu ETH "em jogo" (at stake). Neste momento, a conta será marcada como totalmente "sacável".

Uma vez que uma conta é sinalizada como "sacável" e as credenciais de saque foram fornecidas, não há mais nada que o usuário precise fazer além de esperar. As contas são varridas automática e continuamente pelos proponentes de bloco em busca de fundos de saída elegíveis, e o saldo da sua conta será transferido integralmente (também conhecido como "saque total") durante a próxima <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>varredura</a>.

## Quando os saques de staking foram habilitados? {#when}

A funcionalidade de saque foi originalmente habilitada como parte da atualização Shanghai/Capella em **12 de abril de 2023**. A [atualização Pectra](/roadmap/pectra/) (maio de 2025) introduziu posteriormente validadores compostos com um saldo efetivo máximo mais alto de 2048 ETH, bem como saídas acionadas pela camada de execução e saques parciais.

A atualização Shanghai/Capella permitiu que o ETH anteriormente em staking fosse recuperado em contas regulares do Ethereum. Isso fechou o ciclo da liquidez de staking e deixou o Ethereum um passo mais perto em sua jornada para construir um ecossistema descentralizado sustentável, escalável e seguro.

- [Mais sobre a história do Ethereum](/ethereum-forks/)
- [Mais sobre o roadmap do Ethereum](/roadmap/)

## Como funcionam os pagamentos de saque? {#how-do-withdrawals-work}

Se um determinado validador é elegível para um saque ou não, é determinado pelo estado da própria conta do validador. Nenhuma entrada do usuário é necessária em nenhum momento para determinar se uma conta deve ter um saque iniciado ou não — todo o processo é feito automaticamente pela camada de consenso em um loop contínuo.

### Prefere aprender visualmente? {#visual-learner}

Confira esta explicação sobre os saques de staking do Ethereum pela Finematics:

<YouTube id="RwwU3P9n3uo" />

### "Varredura" de validadores {#validator-sweeping}

Quando um validador está programado para propor o próximo bloco, ele é obrigado a construir uma fila de saques, de até 16 saques elegíveis. Isso é feito começando originalmente com o índice de validador 0, determinando se há um saque elegível para esta conta de acordo com as regras do protocolo e adicionando-o à fila, se houver. O validador definido para propor o bloco seguinte continuará de onde o último parou, progredindo em ordem indefinidamente.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pense em um relógio analógico. O ponteiro do relógio aponta para a hora, avança em uma direção, não pula nenhuma hora e, eventualmente, volta ao início novamente depois que o último número é alcançado.

Agora, em vez de 1 a 12, imagine que o relógio tenha de 0 a N _(o número total de contas de validadores que já foram registradas na camada de consenso, mais de 500.000 em janeiro de 2023)._

O ponteiro do relógio aponta para o próximo validador que precisa ser verificado quanto a saques elegíveis. Ele começa em 0 e avança por todo o caminho sem pular nenhuma conta. Quando o último validador é alcançado, o ciclo continua de volta ao início.
</AlertDescription>
</AlertContent>
</Alert>

#### Verificando uma conta para saques {#checking-an-account-for-withdrawals}

Enquanto um proponente está varrendo os validadores em busca de possíveis saques, cada validador sendo verificado é avaliado em relação a uma curta série de perguntas para determinar se um saque deve ser acionado e, em caso afirmativo, quanto ETH deve ser sacado.

1. **Um endereço de saque foi fornecido?** Se nenhum endereço de saque tiver sido fornecido, a conta será ignorada e nenhum saque será iniciado.
2. **O validador saiu e é sacável?** Se o validador tiver saído totalmente e tivermos alcançado a época em que sua conta é considerada "sacável", um saque total será processado. Isso transferirá todo o saldo restante para o endereço de saque.
3. **O saldo excede o saldo efetivo máximo?** Para validadores legados (Tipo 1), esse limite é de 32 ETH. Para validadores compostos (Tipo 2), esse limite é de 2048 ETH. Se a conta tiver credenciais de saque, não tiver saído totalmente e tiver saldo acima de seu limite, um saque parcial será processado, transferindo apenas o excesso para o endereço de saque do usuário.

Existem apenas duas ações tomadas pelos operadores de validadores durante o curso do ciclo de vida de um validador que influenciam esse fluxo diretamente:

- Fornecer credenciais de saque para habilitar qualquer forma de saque
- Sair da rede, o que acionará um saque total

### Sem gas {#gas-free}

As varreduras automáticas de saque não exigem que os stakers enviem manualmente uma transação. Isso significa que **nenhum gas (taxa de transação) é necessário** para varreduras automáticas, e elas não competem pelo espaço de bloco existente na camada de execução.

Observe que os [validadores compostos](#compounding-validators) que desejam acionar um saque parcial abaixo do limite de 2048 ETH devem fazê-lo manualmente a partir da camada de execução, o que exige gas.

### Com que frequência receberei minhas recompensas de staking? {#how-soon}

Um máximo de 16 saques pode ser processado em um único bloco. Nesse ritmo, 115.200 saques de validadores podem ser processados por dia (assumindo que não haja slots perdidos). Como observado acima, os validadores sem saques elegíveis serão ignorados, diminuindo o tempo para terminar a varredura.

Expandindo esse cálculo, podemos estimar o tempo que levará para processar um determinado número de saques:

<TableContainer>

| Número de saques | Tempo para concluir |
| :-------------------: | :--------------: |
|        400.000        |     3,5 dias     |
|        500.000        |     4,3 dias     |
|        600.000        |     5,2 dias     |
|        700.000        |     6,1 dias     |
|        800.000        |     7,0 dias     |

</TableContainer>

Como você pode ver, isso diminui a velocidade à medida que mais validadores estão na rede. Um aumento nos slots perdidos pode desacelerar isso proporcionalmente, mas isso geralmente representará o lado mais lento dos resultados possíveis.

## Perguntas frequentes {#faq}

<ExpandableCard
title="Depois de fornecer um endereço de saque, posso alterá-lo para um endereço de saque alternativo?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Não, o processo para fornecer credenciais de saque é um processo único e não pode ser alterado depois de enviado.
</ExpandableCard>

<ExpandableCard
title="Por que um endereço de saque só pode ser definido uma vez?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Ao definir um endereço de saque na camada de execução, as credenciais de saque para esse validador foram alteradas permanentemente. Isso significa que as credenciais antigas não funcionarão mais e as novas credenciais direcionam para uma conta da camada de execução.

Os endereços de saque podem ser um contrato inteligente (controlado por seu código) ou uma conta de propriedade externa (EOA, controlada por sua chave privada). Atualmente, essas contas não têm como comunicar uma mensagem de volta à camada de consenso que sinalizaria uma mudança nas credenciais do validador, e adicionar essa funcionalidade adicionaria complexidade desnecessária ao protocolo.

Como alternativa à alteração do endereço de saque para um validador específico, os usuários podem optar por definir um contrato inteligente como seu endereço de saque, que pode lidar com a rotação de chaves, como um Safe. Os usuários que definem seus fundos para sua própria EOA podem realizar uma saída total para sacar todos os seus fundos em staking e, em seguida, fazer staking novamente usando novas credenciais.
</ExpandableCard>

<ExpandableCard
title="E se eu participar de tokens de staking ou pool de staking?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Se você faz parte de um [pool de staking](/staking/pools/) ou possui tokens de staking, verifique com seu provedor para obter mais detalhes sobre como os saques de staking são tratados, pois cada serviço opera de maneira diferente.

Em geral, os usuários devem ser livres para recuperar seu ETH em staking subjacente ou alterar qual provedor de staking eles utilizam. Se um pool específico estiver ficando muito grande, os fundos podem ser retirados, resgatados e colocados em staking novamente com um [provedor menor](https://rated.network/). Ou, se você acumulou ETH suficiente, pode fazer [staking de casa](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Os pagamentos de recompensa (saques parciais) acontecem automaticamente?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Para **validadores legados (Tipo 1)**, sim — desde que seu validador tenha fornecido um endereço de saque. Isso deve ser fornecido uma vez para habilitar inicialmente quaisquer saques, então os pagamentos de recompensa serão acionados automaticamente a cada poucos dias com cada varredura de validador.

Para **validadores compostos (Tipo 2)**, as recompensas são compostas no saldo efetivo em vez de serem varridas. Varreduras automáticas ocorrem apenas para saldos que excedem 2048 ETH. Para sacar recompensas abaixo desse limite, você deve acionar manualmente um saque parcial a partir da camada de execução.
</ExpandableCard>

<ExpandableCard
title="Os saques totais acontecem automaticamente?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Não, se o seu validador ainda estiver ativo na rede, um saque total não acontecerá automaticamente. Isso requer o início manual de uma saída voluntária.

Depois que um validador concluir o processo de saída e assumindo que a conta tenha credenciais de saque, o saldo restante será _então_ sacado durante a próxima <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>varredura de validador</a>.

</ExpandableCard>

<ExpandableCard title="Posso sacar um valor personalizado?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Para **validadores legados (Tipo 1)**, os saques são enviados automaticamente, transferindo qualquer ETH que não esteja contribuindo ativamente para o stake. Isso inclui saldos totais para contas que concluíram o processo de saída. Não é possível solicitar manualmente valores específicos de ETH a serem sacados para validadores do Tipo 1.

**Validadores compostos (Tipo 2)** podem acionar saques parciais de um valor específico a partir da camada de execução, desde que o saldo restante permaneça em ou acima de 32 ETH. Isso exige uma transação e custa gas.
</ExpandableCard>

<ExpandableCard
title="Eu opero um validador. Onde posso encontrar mais informações sobre como habilitar saques?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Recomenda-se que os operadores de validadores visitem a página [Saques do Staking Launchpad](https://launchpad.ethereum.org/withdrawals/), onde você encontrará mais detalhes sobre como preparar seu validador para saques, cronograma de eventos e mais detalhes sobre como os saques funcionam.

Para testar sua configuração em uma rede de teste primeiro, visite o [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org) para começar.

</ExpandableCard>

<ExpandableCard
title="Posso reativar meu validador após sair depositando mais ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Não. Depois que um validador sair e seu saldo total for sacado, quaisquer fundos adicionais depositados nesse validador serão transferidos automaticamente para o endereço de saque durante a próxima varredura de validador. Para fazer staking de ETH novamente, um novo validador deve ser ativado.
</ExpandableCard>

<ExpandableCard
title="Qual é a diferença entre validadores legados e compostos?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Validadores legados usam credenciais de saque do **Tipo 1** e têm um saldo efetivo limitado a 32 ETH. Qualquer excesso é varrido automaticamente para o endereço de saque a cada poucos dias.

Validadores compostos usam credenciais de saque do **Tipo 2** e podem ter um saldo efetivo de até 2048 ETH. As recompensas são compostas em seu saldo efetivo, aumentando o peso do validador na rede e as recompensas futuras. Varreduras automáticas ocorrem apenas para saldos que excedem 2048 ETH. Para sacar abaixo desse limite, um saque parcial manual deve ser acionado a partir da camada de execução.

Para obter mais detalhes, consulte a [análise aprofundada do MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Como faço para converter para um validador composto?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Você pode converter as credenciais de saque do Tipo 1 para o Tipo 2 usando o [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Esta operação é **irreversível** — depois de converter, você não pode voltar para as credenciais do Tipo 1.

Após a conversão, você também pode **consolidar** vários validadores em um, combinando seus saldos em um único validador composto. Para obter um passo a passo completo do processo de conversão, riscos e ferramentas de consolidação, consulte a [análise aprofundada do MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

## Leitura adicional {#further-reading}

- [Saques do Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Ações de Validador do Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Análise aprofundada do MaxEB: composição e consolidação](/roadmap/pectra/maxeb/)
- [EIP-4895: Saques push da beacon chain como operações](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Saque de ETH em staking (Testes) com Potuz e Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Saques push da beacon chain como operações com Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Entendendo o Saldo Efetivo do Validador](https://www.attestant.io/posts/understanding-validator-effective-balance/)