---
title: Saques de staking
description: "Página que resume o que são os saques automáticos (push) de staking, como funcionam e o que os stakers precisam fazer para obter suas recompensas"
lang: pt-br
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie, a rinoceronte, com suas recompensas de staking
sidebarDepth: 2
summaryPoints:
  - Os operadores de validadores devem fornecer um endereço de saque para habilitar os saques
  - Validadores legados têm o saldo excedente acima de 32 ETH sacado automaticamente a cada poucos dias
  - Validadores de composição (compounding) ganham recompensas sobre seu saldo total de até 2048 ETH
  - Validadores que saírem totalmente do staking receberão seu saldo restante
---

**Saques de staking** referem-se a transferências de ETH de uma conta de validador na camada de consenso do Ethereum (a Beacon Chain), para a camada de execução, onde pode ser transacionado.

> Se você faz parte de um [pool de staking](/staking/pools/) ou possui tokens de staking, você deve verificar com seu provedor para obter mais detalhes sobre como os saques de staking são tratados, pois cada serviço opera de maneira diferente.

Como os saques funcionam depende do tipo de credenciais de saque do seu validador:

- **Validadores legados (Tipo 1)**: O saldo excedente acima de 32 ETH é enviado automática e regularmente para o endereço de saque vinculado ao validador. Recompensas acima de 32 ETH não contribuem para o peso do validador na rede.
- **Validadores de composição (Tipo 2)**: As recompensas são compostas no saldo efetivo do validador até 2048 ETH, aumentando o peso do validador e ganhando mais recompensas. Apenas o saldo que excede 2048 ETH é varrido automaticamente.

Os usuários também podem **sair totalmente do staking**, enviando uma transação para sacar, aguardando qualquer prazo da fila de saque (com base na demanda da rede) e desbloqueando o saldo total do seu validador.

## Recompensas de staking {#staking-rewards}

Como as recompensas são tratadas depende do tipo de credencial do validador:

**Validadores legados (Tipo 1)** têm um saldo efetivo limitado a 32 ETH. Qualquer saldo acima de 32 ETH recebido como recompensas da rede não contribui para o saldo efetivo nem aumenta o peso deste validador na rede, e essas recompensas são sacadas automaticamente para o endereço de saque dedicado do validador a cada poucos dias. Além de fornecer um endereço de saque uma vez, reivindicar essas recompensas não exige nenhuma ação do operador do validador. Tudo isso é iniciado na camada de consenso, portanto, nenhum gás (taxa de transação) é exigido em nenhuma etapa.

**Validadores de composição (Tipo 2)** podem ter um saldo efetivo em qualquer lugar entre 32 e 2048 ETH. As recompensas da rede recebidas por esses validadores são compostas em seu saldo efetivo, aumentando o peso do validador e o potencial de receber recompensas futuras. Varreduras automáticas ocorrem apenas para saldos que excedem 2048 ETH. Para sacar recompensas abaixo do limite de 2048 ETH, os validadores de composição devem acionar um saque parcial manualmente a partir da camada de execução, o que exige gás.

### Como chegamos aqui? {#how-did-we-get-here}

Nos últimos anos, o [Ethereum](/) passou por várias atualizações de rede, fazendo a transição para uma rede protegida pelo próprio ETH, em vez da mineração intensiva em energia como era antes. Participar do consenso no Ethereum agora é conhecido como "staking", pois os participantes bloquearam voluntariamente o ETH, colocando-o "em jogo" (at stake) pela capacidade de participar da rede. Os usuários que seguem as regras serão recompensados, enquanto as tentativas de trapacear podem ser penalizadas.

Desde o lançamento do contrato de depósito de staking em novembro de 2020, alguns bravos pioneiros do Ethereum bloquearam fundos voluntariamente para ativar "validadores", contas especiais que têm o direito de atestar formalmente e propor blocos, seguindo as regras da rede.

Antes da atualização Shanghai/Capella, você não podia usar ou acessar seu ETH em stake. Mas agora, você pode optar por receber automaticamente suas recompensas em uma conta escolhida e também pode sacar seu ETH em stake sempre que quiser.

### Como me preparo? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avisos importantes {#important-notices}

As contas de validador são obrigadas a fornecer um endereço de saque antes que possam acessar e sacar as recompensas acumuladas da rede, ou processar um saque total ao sair do staking.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Cada conta de validador só pode receber um único endereço de saque, uma única vez.** Uma vez que um endereço é escolhido e enviado para a camada de consenso, isso não pode ser desfeito ou alterado novamente. Verifique a propriedade e a precisão do endereço fornecido antes de enviar.
</AlertDescription>
</AlertContent>
</Alert>

Se você ainda não forneceu um endereço de saque para sua conta de validador, **não há ameaça aos seus fundos nesse meio tempo**, assumindo que sua frase semente/mnemônica permaneceu segura offline e não foi comprometida de forma alguma. A falha em adicionar credenciais de saque simplesmente deixará o ETH bloqueado na conta do validador até que um endereço de saque seja fornecido.

## Validadores de composição {#compounding-validators}

Os validadores podem optar pela **composição** convertendo suas credenciais de saque do Tipo 1 para o Tipo 2. Isso aumenta o saldo efetivo máximo de 32 ETH para **2048 ETH**, permitindo que as recompensas sejam compostas no saldo efetivo do validador em vez de serem varridas automaticamente.

Com a composição ativada:

- As recompensas aumentam o saldo efetivo do validador em incrementos de 1 ETH (sujeito a um pequeno [buffer de histerese](https://www.attestant.io/posts/understanding-validator-effective-balance/)), ganhando mais recompensas ao longo do tempo
- Varreduras automáticas ocorrem apenas para saldos que excedem 2048 ETH
- Saques parciais abaixo do limite de 2048 ETH devem ser acionados manualmente a partir da camada de execução (isso custa gás)
- Vários validadores podem ser **consolidados** em um único validador de composição, reduzindo a sobrecarga operacional

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**A conversão de credenciais de saque do Tipo 1 para o Tipo 2 é irreversível.** Use o [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) como a ferramenta oficial para esta conversão. Para obter mais detalhes sobre o processo de conversão, riscos e consolidação, consulte a [análise detalhada do MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Saindo totalmente do staking {#exiting-staking-entirely}

Fornecer um endereço de saque é exigido antes que _quaisquer_ fundos possam ser transferidos do saldo de uma conta de validador.

Os usuários que desejam sair totalmente do staking e sacar todo o seu saldo de volta devem iniciar uma "saída voluntária". Isso pode ser feito de duas maneiras:

- **Usando chaves de validador**: Assine e transmita uma mensagem de saída voluntária com seu cliente de validador, enviada ao seu nó de consenso. Isso não exige gás.
- **Usando credenciais de saque**: Acione uma saída a partir da camada de execução usando seu endereço de saque, sem precisar de acesso à chave de assinatura do validador. Isso exige uma transação e custa gás.

O processo de saída de um validador do staking leva uma quantidade variável de tempo, dependendo de quantos outros estão saindo ao mesmo tempo. Uma vez concluído, esta conta não será mais responsável por realizar as funções de validador na rede, não será mais elegível para recompensas e não terá mais seu ETH "em jogo" (at stake). Neste momento, a conta será marcada como totalmente "sacável".

Uma vez que uma conta é sinalizada como "sacável" e as credenciais de saque foram fornecidas, não há mais nada que o usuário precise fazer além de esperar. As contas são varridas automática e continuamente pelos proponentes de blocos em busca de fundos de saída elegíveis, e o saldo da sua conta será transferido integralmente (também conhecido como "saque total") durante a próxima <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>varredura</a>.

## Como funcionam as recompensas automáticas (validador Tipo 1)? {#how-do-withdrawals-work}

Se um determinado validador é elegível para um saque ou não, é determinado pelo estado da própria conta do validador. Nenhuma entrada do usuário é necessária em nenhum momento para determinar se uma conta deve ter um saque iniciado ou não — todo o processo é feito automaticamente pela camada de consenso em um loop contínuo.

### Prefere aprender visualmente? {#visual-learner}

Confira esta explicação sobre os saques de staking do Ethereum feita pela Finematics:

<VideoWatch slug="ethereum-staking-withdrawals" />

### "Varredura" de validadores {#validator-sweeping}

Quando um validador está programado para propor o próximo bloco, ele é obrigado a construir uma fila de saque, de até 16 saques elegíveis. Isso é feito começando originalmente com o índice de validador 0, determinando se há um saque elegível para esta conta de acordo com as regras do protocolo e adicionando-o à fila, se houver. O validador definido para propor o bloco seguinte continuará de onde o último parou, progredindo em ordem indefinidamente.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pense em um relógio analógico. O ponteiro do relógio aponta para a hora, avança em uma direção, não pula nenhuma hora e, eventualmente, volta ao início novamente depois que o último número é alcançado.

Agora, em vez de 1 a 12, imagine que o relógio tenha de 0 a N _(sendo N o número total de contas de validador que já foram registradas na camada de consenso, mais de 1,2 milhão em abril de 2026)._

O ponteiro do relógio aponta para o próximo validador que precisa ser verificado quanto a saques elegíveis. Ele começa em 0 e avança por todo o caminho sem pular nenhuma conta. Quando o último validador é alcançado, o ciclo continua de volta ao início.
</AlertDescription>
</AlertContent>
</Alert>

#### Verificando uma conta para saques {#checking-an-account-for-withdrawals}

Enquanto um proponente está varrendo os validadores em busca de possíveis saques, cada validador sendo verificado é avaliado em relação a uma curta série de perguntas para determinar se um saque deve ser acionado e, em caso afirmativo, quanto ETH deve ser sacado.

1. **Um endereço de saque foi fornecido?** Se nenhum endereço de saque tiver sido fornecido, a conta será ignorada e nenhum saque será iniciado.
2. **O validador saiu e é sacável?** Se o validador tiver saído totalmente e tivermos alcançado a época em que sua conta é considerada "sacável", um saque total será processado. Isso transferirá todo o saldo restante para o endereço de saque.
3. **O saldo excede seu saldo efetivo máximo?** Para validadores legados (Tipo 1), esse limite é de 32 ETH. Para validadores de composição (Tipo 2), esse limite é de 2048 ETH. Se a conta tiver credenciais de saque, não tiver saído totalmente, tiver um saldo efetivo no máximo e tiver saldo acima desse limite, um saque parcial será processado, transferindo apenas o excesso para o endereço de saque do usuário.

Existem apenas duas ações tomadas pelos operadores de validadores durante o curso do ciclo de vida de um validador que influenciam esse fluxo diretamente:

- Fornecer credenciais de saque para habilitar qualquer forma de saque
- Sair da rede, o que acionará um saque total

### Sem gás {#gas-free}

As varreduras automáticas de saque não exigem que os stakers enviem manualmente uma transação. Isso significa que **não é exigido gás (taxa de transação)** para varreduras automáticas, e elas não competem pelo espaço de bloco existente na camada de execução.

Observe que os [validadores de composição](#compounding-validators) que desejam acionar um saque parcial abaixo do limite de 2048 ETH devem fazê-lo manualmente a partir da camada de execução, o que exige gás.

### Com que frequência minhas recompensas de staking serão desbloqueadas e estarão disponíveis na minha carteira? {#how-soon}

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

Como você pode ver, isso diminui a velocidade à medida que mais validadores estão na rede. Um aumento nos slots perdidos pode diminuir a velocidade proporcionalmente, mas isso geralmente representará o lado mais lento dos resultados possíveis.

## Perguntas frequentes {#faq}

<ExpandableCard
title="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Não, o processo para fornecer credenciais de saque é um processo único e não pode ser alterado depois de enviado.
</ExpandableCard>

<ExpandableCard
title="Why can a validator's withdrawal address only be set once?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
Definir o endereço de saque da camada de execução de um validador é uma alteração permanente nas credenciais do validador na camada de consenso. Não há como atualizar as credenciais da camada de consenso depois que elas são registradas.

As credenciais de endereço de saque de um validador podem ser definidas para apontar para um contrato inteligente (controlado por seu código) ou para uma conta de propriedade externa (EOA, controlada por sua chave privada). Atualmente, essas contas não têm como comunicar uma mensagem de volta à camada de consenso que sinalizaria uma mudança nas credenciais do validador, e adicionar essa funcionalidade adicionaria complexidade desnecessária ao protocolo.

Os usuários que buscam um gerenciamento flexível de saques podem definir uma carteira de contrato inteligente capaz de rotação de chaves (como uma [Safe](https://safe.global/)) como o endereço de saque do validador, permitindo efetivamente que a EOA destinatária final seja atualizada. Se um usuário já definiu uma EOA como a credencial de saque, ele deve iniciar uma saída total para recuperar seu ETH em stake e, em seguida, usar esses fundos para ativar um novo validador com credenciais diferentes.
</ExpandableCard>

<ExpandableCard
title="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
Se você usa um pool de staking ou possui tokens de staking, entre em contato com seu provedor para saber como eles lidam com os saques, pois os processos variam de acordo com o serviço. 

Em geral, ao fazer staking por meio de um provedor ou pool, você deve estar livre para recuperar seu ETH em stake subjacente ou para sacar e alterar qual provedor de staking você utiliza. Se um pool específico estiver ficando muito grande, o ETH em stake pode ser retirado, resgatado e colocado em stake novamente com um [provedor menor](https://rated.network/). Ou, se você acumulou ETH suficiente, você pode [fazer stake de casa](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Does claiming network rewards (partial withdrawals) happen automatically?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
Para **validadores legados (Tipo 1)**, sim — desde que seu validador tenha fornecido um endereço de saque. Isso deve ser fornecido uma vez para habilitar quaisquer saques, então a distribuição de recompensas da rede para o endereço de saque será acionada automaticamente a cada poucos dias com cada varredura de validador.

Para **validadores de composição (Tipo 2)**, as recompensas são compostas no saldo efetivo do validador (até 2048 ETH) em vez de serem varridas para o endereço de saque. Varreduras automáticas ocorrem apenas para saldos que excedem 2048 ETH. Para sacar recompensas abaixo desse limite, você deve acionar manualmente um saque parcial a partir da camada de execução.
</ExpandableCard>

<ExpandableCard title="Can I withdraw a custom amount?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Para **validadores legados (Tipo 1)**, quaisquer recompensas da rede em ETH que tenham se acumulado acima do saldo efetivo de 32 ETH do validador são enviadas automaticamente para o endereço de saque. Validadores do Tipo 1 que enviaram uma transação de saque total e concluíram o processo de saída do staking têm seu saldo total de ETH sacado para seu endereço de saque. Não é possível para um validador do Tipo 1 solicitar manualmente o saque de quantias específicas de ETH.

**Validadores de composição (Tipo 2)** podem acionar saques parciais de uma quantia específica a partir da camada de execução, desde que o saldo restante do validador permaneça em ou acima de 32 ETH. Isso exige o envio de uma transação de saque parcial e custa gás.
</ExpandableCard>

<ExpandableCard
title="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

Recomenda-se que os operadores de validadores visitem a página [Saques do Staking Launchpad](https://launchpad.ethereum.org/withdrawals/), onde você encontrará mais detalhes sobre como preparar seu validador para saques, cronograma de eventos e mais detalhes sobre como os saques funcionam.

Para testar sua configuração em uma rede de teste primeiro, visite o [Staking Launchpad da rede de teste Hoodi](https://hoodi.launchpad.ethereum.org) para começar.

</ExpandableCard>

<ExpandableCard
title="Can I re-activate my validator after exiting by depositing more ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Não. Uma vez que um validador tenha saído e seu saldo total tenha sido sacado, qualquer ETH adicional depositado nesse validador será transferido automaticamente para o endereço de saque durante a próxima varredura do validador. Para começar a fazer staking novamente usando esse ETH, você deve ativar um novo validador.
</ExpandableCard>

<ExpandableCard
title="What is the difference between legacy and compounding validators?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Validadores legados usam credenciais de saque do **Tipo 1** (o endereço da credencial de saque começa com 0x01) e têm um saldo efetivo limitado a 32 ETH. Qualquer excesso de ETH recebido como recompensas da rede é varrido automaticamente para o endereço de saque a cada poucos dias.

Validadores de composição usam credenciais de saque do **Tipo 2** (o endereço da credencial de saque começa com 0x02) e podem ter um saldo efetivo de até 2048 ETH. As recompensas são compostas no saldo efetivo do validador, aumentando o peso do validador na rede e o potencial de receber recompensas futuras. Varreduras automáticas ocorrem apenas para saldos que excedem 2048 ETH. Para sacar ETH abaixo desse limite, um saque parcial manual deve ser acionado a partir da camada de execução.

Para obter mais detalhes, consulte a [análise detalhada do MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="How do I convert to a compounding validator?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Você pode converter as credenciais de saque do Tipo 1 para o Tipo 2 usando o [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Esta operação é **irreversível** — uma vez que você converte, não pode voltar para as credenciais do Tipo 1.

Após a conversão, você também pode **consolidar** vários validadores em um, combinando seus saldos em um único validador de composição. Para um passo a passo completo do processo de conversão, riscos e ferramentas de consolidação, consulte a [análise detalhada do MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="When were staking withdrawals enabled?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
A funcionalidade de saque foi originalmente habilitada como parte da atualização Shanghai/Capella em **12 de abril de 2023**. A [atualização Pectra](/roadmap/pectra/) (maio de 2025) introduziu posteriormente validadores de composição com um saldo efetivo máximo mais alto de 2048 ETH, bem como saídas e saques parciais acionados pela camada de execução.

A atualização Shanghai/Capella permitiu que o ETH anteriormente em stake fosse recuperado em contas regulares do Ethereum. Isso fechou o ciclo da liquidez de staking e deixou o Ethereum um passo mais perto em sua jornada para construir um ecossistema descentralizado sustentável, escalável e seguro.

- [Mais sobre a história do Ethereum](/ethereum-forks/)
- [Mais sobre o roteiro do Ethereum](/roadmap/)
</ExpandableCard>

## Leitura adicional {#further-reading}

- [Saques do Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Ações de validador do Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Análise detalhada do MaxEB: composição e consolidação](/roadmap/pectra/maxeb/)
- [EIP-4895: Saques automáticos (push) da Beacon Chain como operações](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Saque de ETH em stake (Testes) com Potuz e Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Saques automáticos (push) da Beacon Chain como operações com Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Entendendo o saldo efetivo do validador](https://www.attestant.io/posts/understanding-validator-effective-balance/)