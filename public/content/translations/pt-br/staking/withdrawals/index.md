---
title: Saque de staking
description: Página que resume o que são os saques por staking, como eles funcionam e o que os stakers (participantes) precisam fazer para obter suas recompensas
lang: pt-br
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie, o rinoceronte, com suas recompensas de staking
sidebarDepth: 2
summaryPoints:
  - A atualização Shanghai/Capella permitiu saques de stake no Ethereum
  - Os operadores validadores devem fornecer um endereço de saque para ativá-los
  - As recompensas são distribuídas automaticamente a cada dois ou três dias
  - Validadores que saírem por completo do staking receberão o seu saldo restante
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Os saques de stake foram ativados com a atualização Shanghai/Capella, que ocorreu em 12 de abril de 2023.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Mais sobre Shanghai/Capella</a>
</UpgradeStatus>

**Saques de stake** referem-se a transferências de ETH de uma conta do validador na camada de consenso do Ethereum (a Beacon Chain) para a camada de execução na qual ela pode efetuar a transação.

**Pagamentos de recompensas de saldo excedente** acima de 32 ETH serão enviados de forma automática e regular para um endereço de saque vinculado a cada validador, uma vez fornecido pelo usuário. Usuários também podem **sair totalmente do staking**, desbloqueando seu saldo total do validador.

## Recompensas de staking {#staking-rewards}

Os pagamentos de recompensa são processados automaticamente para contas validadoras ativas, com um saldo efetivo máximo de 32 ETH.

Qualquer saldo acima de 32 ETH ganho por meio de recompensas, não contribui realmente para o principal, ou aumenta o peso desse validador na rede e, portanto, é retirado automaticamente como pagamento de recompensa a cada dois ou três dias. Além de fornecer um endereço de saque uma vez, essas recompensas não exigem nenhuma ação do operador validador. Tudo isso é iniciado na camada de consenso, portanto, nenhum gás (taxa de transação) é necessário em nenhuma etapa.

### Como chegamos aqui? {#how-did-we-get-here}

Nos últimos anos, o Ethereum passou por várias atualizações de rede, fazendo a transição para uma rede protegida pelo próprio ETH, em vez da mineração intensiva de energia, como era antes. A participação em consenso no Ethereum agora é conhecida como "staking", pois os participantes têm bloqueado voluntariamente o ETH, colocando-o "em stake" para poder participar da rede. Os usuários que seguem as regras serão recompensados, enquanto as tentativas de trapaça podem ser penalizadas.

Desde o lançamento do contrato de depósito de staking em novembro de 2020, alguns corajosos pioneiros do Ethereum bloquearam voluntariamente fundos para ativar “validadores”, contas especiais que têm o direito de atestar formalmente e propor blocos, seguindo as regras da rede.

Antes da atualização Shanghai/Capella, não era possível usar ou acessar seu ETH em stake. Mas agora, você pode optar por receber automaticamente suas recompensas em uma conta escolhida, e também pode sacar seu ETH em stake sempre que quiser.

### Como me preparo? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avisos importantes {#important-notices}

Fornecer um endereço de saque é uma etapa necessária para qualquer conta de validador, antes que ele seja elegível para sacar ETH de seu saldo.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Cada conta de validador pode ser atribuída a um único endereço de saque, uma única vez.</strong> Após a seleção e envio do endereço à camada de consenso, isso não pode ser desfeito ou alterado novamente. Verifique a propriedade e a precisão do endereço fornecido antes de enviar.
</InfoBanner>

Não há <strong>nenhuma ameaça aos seus fundos</strong> enquanto não fornecer essa conta, contanto que sua frase mnemônica/de recuperação tenha permanecido segura offline e não tenha sido comprometida de nenhuma forma. A falha em adicionar credenciais de saque simplesmente deixará o ETH bloqueado na conta do validador como tem estado até que um endereço de saque seja fornecido.

## Saindo do staking por completo {#exiting-staking-entirely}

Fornecer um endereço de saque é necessário antes que _quaisquer_ fundos possam ser transferidos de um saldo de uma conta do validador.

Os usuários que procuram sair totalmente do staking e sacar seu saldo total de volta, também devem assinar e transmitir uma mensagem de "saída voluntária", com as chaves do validador que iniciarão o processo de saída do staking. Isso é feito com o seu cliente validador e enviado ao seu nó de consenso, e não exige gás.

O processo de saída de um validador do staking leva uma quantidade variável de tempo, dependendo de quantos outros estão saindo ao mesmo tempo. Uma vez concluída, esta conta não será mais responsável por executar as obrigações de rede do validador, não será mais elegível para recompensas e não terá mais seu ETH "em stake". Nesse momento, a conta será marcada como totalmente “sacável”.

Uma vez que uma conta é marcada como "sacável" e as credenciais de saque são fornecidas, não há mais nada que o usuário precise fazer além de esperar. As contas são automática e continuamente varridas por proponentes de bloco para fundos elegíveis de saída, e o saldo da sua conta será transferido integralmente (também conhecido como "saque total") durante a próxima <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>varredura</a>.

## Quando os saques de staking são ativados? {#when}

Os saques de stake já estão disponíveis! A funcionalidade de saque foi habilitada como parte da atualização Shanghai/Capella que ocorreu em 12 de abril de 2023.

A atualização Shanghai/Capella permitiu que o ETH previamente em stake fosse recuperado em contas normais do Ethereum. Isso fechou o ciclo de liquidez de stake e trouxe o Ethereum a um passo mais perto de sua jornada para a construção de um ecossistema descentralizado sustentável, dimensionável e seguro.

- [Mais sobre a história do Ethereum](/history/)
- [Mais sobre o roteiro do Ethereum](/roadmap/)

## Como funcionam os pagamentos de saque? {#how-do-withdrawals-work}

Se um determinado validador é elegível para um saque ou não é determinado pelo estado da própria conta do validador. Nenhuma entrada de usuário é necessária a um dado momento para determinar se uma conta deveria ter um saque iniciado ou não — todo o processo é realizado automaticamente pela camada de consenso em um loop contínuo.

### Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

Confira esta explicação sobre saques de staking do Ethereum pela Finematics:

<YouTube id="RwwU3P9n3uo" />

### Validador de "varredura" {#validator-sweeping}

Quando um validador está agendado para propor o próximo bloco, ele é necessário para construir uma fila de saque de até 16 saques elegíveis. Isso é feito originalmente começando com o validador de índice 0, determinando se há um saque elegível para essa conta, conforme as regras do protocolo, e adicionando-o à fila, se houver. O validador definido para propor o bloco seguinte continuará de onde o último parou, progredindo em ordem indefinidamente.

<InfoBanner emoji="🕛">
Pense em um relógio analógico. O ponteiro no relógio aponta para a hora, avança em uma direção, não pula nenhuma hora e, por fim, volta ao início após alcançar o último número.<br/><br/>
Agora, em vez de 1 a 12, imagine que o relógio é de 0 a N <em>(o total de números de contas de validador que foram registradas na camada de consenso, mais de 500 mil em janeiro de 2023).</em><br/><br/>
O ponteiro do relógio aponta para o próximo validador que precisa ser verificado quanto a saques elegíveis. Começa em 0 e avança ao longo de todo o caminho sem pular nenhuma conta. Quando o último validador é alcançado, o ciclo continua de volta ao início.
</InfoBanner>

#### Verificando os saques de uma conta {#checking-an-account-for-withdrawals}

Enquanto um proponente está verificando os validadores para possíveis saques, cada validador que está sendo verificado é avaliado em relação a uma pequena série de perguntas para determinar se um saque deve ser acionado e, em caso afirmativo, o quanto de ETH deve ser sacado.

1. **Foi fornecido um endereço para saque?** Se nenhum endereço para saque foi fornecido, a conta é ignorada e nenhum saque é iniciado.
2. **O validador saiu e pode ser sacado?** Se o validador saiu completamente, e chegamos à época em que sua conta é considerada "sacável", então um saque total será processado. Isso transferirá todo o saldo restante para o endereço de saque.
3. **O saldo efetivo é maximizado em 32?** Se a conta que tiver credenciais de saque não for completamente encerrada e tiver recompensas acima de 32 em espera, um saque parcial será processado, o qual transfere apenas as recompensas acima de 32 para o endereço de saque do usuário.

Existem apenas duas ações tomadas pelos operadores do validador ao longo do seu ciclo de vida que influenciam diretamente esse fluxo:

- Fornecer credenciais de saque para habilitar qualquer forma de saque
- Sair da rede, o que desencadeará um saque total

### Gás gratuito {#gas-free}

Essa abordagem para saques de staking evita exigir que os stakers (participantes) enviem manualmente uma transação solicitando que uma quantia específica de ETH seja sacada. Isso significa que **nenhum gás (taxa de transação) é necessário** e os saques também não competem pelo espaço do bloco da camada de execução existente.

### Com que frequência receberei minhas recompensas de staking? {#how-soon}

Um máximo de 16 saques pode ser processado em um único bloco. A esse ritmo, 115.200 saques de validadores podem ser processados por dia (supondo que não haja slots perdidos). Conforme observado acima, os validadores sem saques elegíveis serão ignorados, diminuindo o tempo para concluir a varredura.

Expandindo esse cálculo, podemos estimar o tempo que levará para processar um determinado número de saques:

<TableContainer>

| Número de saques | Tempo de execução |
| :-------------------: | :--------------: |
|        400.000        |     3,5 dias     |
|        500.000        |     4,3 dias     |
|        600.000        |     5,2 dias     |
|        700.000        |     6,1 dias     |
|        800.000        |     7,0 dias     |

</TableContainer>

Como você poder ver, isso fica lento à medida que mais validadores estão na rede. Um aumento nos slots perdidos poderia diminuir proporcionalmente, mas isso geralmente representará o lado mais lento dos resultados possíveis.

## Perguntas frequentes {#faq}

<ExpandableCard
title="Após ter fornecido um endereço de saque, posso alterá-lo para um endereço de saque alternativo?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Não, o processo para fornecer credenciais de saque é um processo único e não pode ser modificado após o envio.
</ExpandableCard>

<ExpandableCard
title="Por que um endereço de saque só pode ser definido uma vez?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Ao definir um endereço de saque da camada de execução, as credenciais de saque para esse validador foram permanentemente alteradas. Isso significa que as credenciais antigas não funcionarão mais, e as novas credenciais serão direcionadas para uma conta de camada de execução.

Os endereços de saque podem ser ou um contrato inteligente (controlado por seu código), ou uma conta de propriedade externa (EOA, controlada por sua chave privada). Atualmente, essas contas não têm como comunicar uma mensagem de volta para a camada de consenso, que sinalizaria uma mudança nas credenciais do validador, e adicionar essa funcionalidade aumentaria a complexidade do protocolo desnecessariamente.

Uma alternativa para mudar o endereço de saque de um validador específico implicaria os usuários poderem optar por definir um contrato inteligente como seu endereço de saque, o que permitiria lidar com a rotação de chaves, como um cofre. Os usuários que definem seus fundos para seu próprio EOA podem realizar uma saída completa para sacar todos os seus fundos em stake e, em seguida, refazer o stake usando novas credenciais.
</ExpandableCard>

<ExpandableCard
title="E se eu me envolver em tokens participados ou participação combinada?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Se você faz parte de uma <a href="/staking/pools/">participação combinada</a> (participação em pool) ou mantém tokens participados, deve solicitar ao seu provedor mais detalhes sobre o processamento de saques de participação, pois cada serviço funciona de maneira diferente.

Em geral, os usuários podem recuperar seu ETH subjacente em stake ou alterar o provedor de stake que utilizam quando quiserem. Se um pool em particular estiver ficando muito grande, os fundos podem ser encerrados, resgatados e reinvestidos com um <a href="https://rated.network/">provedor menor</a>. Ou então, se você acumulou ETH suficiente, pode fazer <a href="/staking/solo/">stake em casa</a>.

</ExpandableCard>

<ExpandableCard
title="Os pagamentos de recompensa (saques parciais) acontecem automaticamente?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Sim, desde que seu validador forneça um endereço de saque. Isso deve ser fornecido uma vez para permitir, inicialmente, quaisquer saques. Em seguida, os pagamentos de recompensa serão acionados automaticamente em poucos dias a cada varredura do validador.
</ExpandableCard>

<ExpandableCard
title="Os saques totais acontecem automaticamente?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Não, se o seu validador ainda estiver ativo na rede, um saque total não acontecerá automaticamente. Isso exige iniciar manualmente uma saída voluntária.

Após um validador ter concluído o processo de saída, e presumindo que a conta tenha credenciais de saque, o saldo restante será <em>então</em> sacado durante a próxima <a href="#validator-sweeping">varredura do validador</a>.

</ExpandableCard>

<ExpandableCard title="Posso sacar uma quantia personalizada?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Os saques foram projetados para serem enviados automaticamente, transferindo qualquer ETH que não esteja contribuindo ativamente para o stake. Isso inclui saldos completos das contas que completaram o processo de saída.

Não é possível solicitar manualmente o saque de quantidades específicas de ETH.
</ExpandableCard>

<ExpandableCard
title="Eu opero um validador. Onde posso encontrar mais informações sobre como habilitar saques?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

É recomendável que os operadores de validadores visitem a página <a href="https://launchpad.ethereum.org/withdrawals/">Retiradas do Staking Launchpad</a>, onde você encontrará mais detalhes sobre como preparar seu validador para retiradas, o momento dos eventos e mais detalhes sobre como as retiradas funcionam.

Para testar sua configuração em uma rede de teste primeiro, visite o <a href="https://holesky.launchpad.ethereum.org">Holesky Testnet Staking Launchpad</a> para começar.

</ExpandableCard>

<ExpandableCard
title="Posso reativar meu validador depois de sair depositando mais ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Não. Uma vez que um validador tenha saído e seu saldo completo tenha sido sacado, quaisquer fundos adicionais depositados nesse validador serão automaticamente transferidos para o endereço de saque durante a próxima varredura do validador. Para recolocar o ETH em stake, um novo validador deve ser ativado.
</ExpandableCard>

## Leitura adicional {#further-reading}

- [Saques da plataforma de staking](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Saques por push da Beacon chain como operações](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Saque de ETH em skate (teste) com Potus e Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain envia as retiradas como operações com Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Compreendendo como o Saldo Efetivo do Validador funciona](https://www.attestant.io/posts/understanding-validator-effective-balance/)
