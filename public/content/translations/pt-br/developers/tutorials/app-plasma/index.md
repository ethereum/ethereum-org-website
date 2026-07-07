---
title: "Escreva um Plasma específico de aplicativo que preserva a privacidade"
description: "Neste tutorial, construímos um banco semissecreto para depósitos. O banco é um componente centralizado; ele conhece o saldo de cada usuário. No entanto, essa informação não é armazenada onchain. Em vez disso, o banco publica um hash do estado. Toda vez que ocorre uma transação, o banco publica o novo hash, junto com uma prova de conhecimento zero de que possui uma transação assinada que altera o estado do hash para o novo. Após ler este tutorial, você entenderá não apenas como usar provas de conhecimento zero, mas também por que usá-las e como fazer isso com segurança."
author: Ori Pomerantz
tags: ["conhecimento zero", "servidor", "offchain", "privacidade"]
skill: advanced
breadcrumb: "Plasma específico de aplicativo"
lang: pt-br
published: 2025-10-15
---
## Introdução {#introduction}

Em contraste com os [rollups](/developers/docs/scaling/zk-rollups/), os [Plasmas](/developers/docs/scaling/plasma) usam a Rede Principal do Ethereum para integridade, mas não para disponibilidade. Neste artigo, escrevemos um aplicativo que se comporta como um Plasma, com o Ethereum garantindo a integridade (sem alterações não autorizadas), mas não a disponibilidade (um componente centralizado pode cair e desativar todo o sistema).

O aplicativo que escrevemos aqui é um banco que preserva a privacidade. Diferentes endereços têm contas com saldos, e eles podem enviar dinheiro (ETH) para outras contas. O banco publica hashes do estado (contas e seus saldos) e transações, mas mantém os saldos reais offchain, onde podem permanecer privados.

## Design {#design}

Este não é um sistema pronto para produção, mas sim uma ferramenta de ensino. Como tal, ele é escrito com várias suposições simplificadoras.

- Pool de contas fixo. Há um número específico de contas, e cada conta pertence a um endereço predeterminado. Isso torna o sistema muito mais simples, pois é difícil lidar com estruturas de dados de tamanho variável em provas de conhecimento zero. Para um sistema pronto para produção, podemos usar a [raiz de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) como o hash de estado e fornecer provas de Merkle para os saldos exigidos.

- Armazenamento em memória. Em um sistema de produção, precisamos gravar todos os saldos das contas em disco para preservá-los em caso de reinicialização. Aqui, não há problema se a informação for simplesmente perdida.

- Apenas transferências. Um sistema de produção exigiria uma maneira de depositar ativos no banco e sacá-los. Mas o objetivo aqui é apenas ilustrar o conceito, então este banco é limitado a transferências.

### Provas de conhecimento zero {#zero-knowledge-proofs}

Em um nível fundamental, uma prova de conhecimento zero mostra que o provador conhece alguns dados, _Dados<sub>privados</sub>_, de modo que existe um relacionamento _Relacionamento_ entre alguns dados públicos, _Dados<sub>públicos</sub>_, e _Dados<sub>privados</sub>_. O verificador conhece o _Relacionamento_ e os _Dados<sub>públicos</sub>_.

Para preservar a privacidade, precisamos que os estados e as transações sejam privados. Mas para garantir a integridade, precisamos que o [hash criptográfico](https://en.wikipedia.org/wiki/Cryptographic_hash_function) dos estados seja público. Para provar às pessoas que enviam transações que essas transações realmente aconteceram, também precisamos publicar os hashes das transações.

Na maioria dos casos, os _Dados<sub>privados</sub>_ são a entrada para o programa de prova de conhecimento zero, e os _Dados<sub>públicos</sub>_ são a saída.

Estes campos em _Dados<sub>privados</sub>_:

- _Estado<sub>n</sub>_, o estado antigo
- _Estado<sub>n+1</sub>_, o novo estado
- _Transação_, uma transação que muda do estado antigo para o novo. Esta transação precisa incluir estes campos:
  - _Endereço de destino_ que recebe a transferência
  - _Valor_ sendo transferido
  - _Nonce_ para garantir que cada transação só possa ser processada uma vez.
    O endereço de origem não precisa estar na transação, pois pode ser recuperado a partir da assinatura.
- _Assinatura_, uma assinatura que está autorizada a realizar a transação. Em nosso caso, o único endereço autorizado a realizar uma transação é o endereço de origem. Como nosso sistema de conhecimento zero funciona da maneira que funciona, também precisamos da chave pública da conta, além da assinatura do Ethereum.

Estes são os campos em _Dados<sub>públicos</sub>_:

- _Hash(Estado<sub>n</sub>)_ o hash do estado antigo
- _Hash(Estado<sub>n+1</sub>)_ o hash do novo estado
- _Hash(Transação)_ o hash da transação que muda o estado de _Estado<sub>n</sub>_ para _Estado<sub>n+1</sub>_.

O relacionamento verifica várias condições:

- Os hashes públicos são de fato os hashes corretos para os campos privados.
- A transação, quando aplicada ao estado antigo, resulta no novo estado.
- A assinatura vem do endereço de origem da transação.

Devido às propriedades das funções de hash criptográfico, provar essas condições é suficiente para garantir a integridade.

### Estruturas de dados {#data-structures}

A estrutura de dados primária é o estado mantido pelo servidor. Para cada conta, o servidor rastreia o saldo da conta e um [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), usado para evitar [ataques de repetição](https://en.wikipedia.org/wiki/Replay_attack).

### Componentes {#components}

Este sistema requer dois componentes:

- O _servidor_ que recebe transações, as processa e publica hashes na cadeia junto com as provas de conhecimento zero.
- Um _contrato inteligente_ que armazena os hashes e verifica as provas de conhecimento zero para garantir que as transições de estado sejam legítimas.

### Fluxo de dados e controle {#flows}

Estas são as maneiras pelas quais os vários componentes se comunicam para transferir de uma conta para outra.

1. Um navegador da web envia uma transação assinada solicitando uma transferência da conta do signatário para uma conta diferente.

2. O servidor verifica se a transação é válida:

   - O signatário tem uma conta no banco com saldo suficiente.
   - O destinatário tem uma conta no banco.

3. O servidor calcula o novo estado subtraindo o valor transferido do saldo do signatário e adicionando-o ao saldo do destinatário.

4. O servidor calcula uma prova de conhecimento zero de que a mudança de estado é válida.

5. O servidor envia ao Ethereum uma transação que inclui:

   - O hash do novo estado
   - O hash da transação (para que o remetente da transação possa saber que ela foi processada)
   - A prova de conhecimento zero que prova que a transição para o novo estado é válida

6. O contrato inteligente verifica a prova de conhecimento zero.

7. Se a prova de conhecimento zero for validada, o contrato inteligente executa estas ações:
   - Atualiza o hash do estado atual para o hash do novo estado
   - Emite uma entrada de log com o hash do novo estado e o hash da transação

### Ferramentas {#tools}

Para o código do lado do cliente, usaremos [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) e [Wagmi](https://wagmi.sh/). Estas são ferramentas padrão da indústria; se você não estiver familiarizado com elas, pode usar [este tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

A maior parte do servidor é escrita em JavaScript usando [Node](https://nodejs.org/en). A parte de conhecimento zero é escrita em [Noir](https://noir-lang.org/). Precisamos da versão `1.0.0-beta.10`, então, depois de [instalar o Noir conforme as instruções](https://noir-lang.org/docs/getting_started/quick_start), execute:

```
noirup -v 1.0.0-beta.10
```

A blockchain que usamos é a `anvil`, uma blockchain de teste local que faz parte do [Foundry](https://getfoundry.sh/introduction/installation).

## Implementação {#implementation}

Como este é um sistema complexo, nós o implementaremos em etapas.

### Etapa 1 - Conhecimento zero manual {#stage-1}

Para a primeira etapa, assinaremos uma transação no navegador e, em seguida, forneceremos manualmente as informações para a prova de conhecimento zero. O código de conhecimento zero espera obter essas informações em `server/noir/Prover.toml` (documentado [aqui](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Para ver isso em ação:

1. Certifique-se de ter o [Node](https://nodejs.org/en/download) e o [Noir](https://noir-lang.org/install) instalados. De preferência, instale-os em um sistema UNIX, como macOS, Linux ou [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Baixe o código da etapa 1 e inicie o servidor web para servir o código do cliente.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   O motivo pelo qual você precisa de um servidor web aqui é que, para evitar certos tipos de fraude, muitas carteiras (como a MetaMask) não aceitam arquivos servidos diretamente do disco

3. Abra um navegador com uma carteira.

4. Na carteira, insira uma nova frase secreta (passphrase). Observe que isso excluirá sua frase secreta existente, portanto, _certifique-se de ter um backup_.

   A frase secreta é `test test test test test test test test test test test junk`, a frase secreta de teste padrão para o anvil.

5. Navegue até [o código do lado do cliente](http://localhost:5173/).

6. Conecte-se à carteira e selecione sua conta de destino e o valor.

7. Clique em **Sign** (Assinar) e assine a transação.

8. Sob o título **Prover.toml**, você encontrará um texto. Substitua `server/noir/Prover.toml` por esse texto.

9. Execute a prova de conhecimento zero.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   A saída deve ser semelhante a

      ```
ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
      ```

10. Compare os dois últimos valores com o hash que você vê no navegador web para ver se a mensagem foi submetida ao hash corretamente.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Este arquivo](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) mostra o formato de informação esperado pelo Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

A mensagem está em formato de texto, o que facilita a compreensão do usuário (o que é necessário ao assinar) e a análise pelo código Noir. O valor é cotado em finneys para permitir transferências fracionárias, por um lado, e ser facilmente legível, por outro. O último número é o [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

A string tem 100 caracteres. As provas de conhecimento zero não lidam bem com dados de tamanho variável, por isso muitas vezes é necessário preencher (pad) os dados.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Esses três parâmetros são matrizes de bytes de tamanho fixo.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

Esta é a maneira de especificar uma matriz de estruturas. Para cada entrada, especificamos o endereço, o saldo (em milliETH, também conhecido como [finney](https://cryptovalleyjournal.com/glossary/finney/)) e o próximo valor do nonce.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Este arquivo](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) implementa o processamento do lado do cliente e gera o arquivo `server/noir/Prover.toml` (aquele que inclui os parâmetros de conhecimento zero).

Aqui está a explicação das partes mais interessantes.

```tsx
export default attrs =>  {
```

Esta função cria o componente React `Transfer`, que outros arquivos podem importar.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Estes são os endereços de conta, os endereços criados pela frase secreta `test ... test junk`. Se você quiser usar seus próprios endereços, basta modificar esta definição.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Esses [hooks do Wagmi](https://wagmi.sh/react/api/hooks) nos permitem acessar a biblioteca [Viem](https://viem.sh/) e a carteira.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Esta é a mensagem, preenchida com espaços. Toda vez que uma das variáveis [`useState`](https://react.dev/reference/react/useState) muda, o componente é redesenhado e `message` é atualizado.

```tsx
  const sign = async () => {
```

Esta função é chamada quando o usuário clica no botão **Sign** (Assinar). A mensagem é atualizada automaticamente, mas a assinatura exige a aprovação do usuário na carteira, e não queremos solicitá-la a menos que seja necessário.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Peça à carteira para [assinar a mensagem](https://viem.sh/docs/accounts/local/signMessage). 

```tsx
    const hash = hashMessage(message)
```

Obtenha o hash da mensagem. É útil fornecê-lo ao usuário para depuração (do código Noir). 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Obtenha a chave pública](https://viem.sh/docs/utilities/recoverPublicKey). Isso é exigido para a função [`ecrecover` do Noir](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Defina as variáveis de estado. Fazer isso redesenha o componente (após a saída da função `sign`) e mostra ao usuário os valores atualizados.

```tsx
    let proverToml = `
```

O texto para `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

O Viem nos fornece a chave pública como uma string hexadecimal de 65 bytes. O primeiro byte é `0x04`, um marcador de versão. Isso é seguido por 32 bytes para o `x` da chave pública e, em seguida, 32 bytes para o `y` da chave pública.

No entanto, o Noir espera obter essas informações como duas matrizes de bytes, uma para `x` e outra para `y`. É mais fácil analisá-las aqui no cliente do que como parte da prova de conhecimento zero.

Observe que essa é uma boa prática em conhecimento zero em geral. O código dentro de uma prova de conhecimento zero é caro, portanto, qualquer processamento que possa ser feito fora da prova de conhecimento zero _deve_ ser feito fora da prova de conhecimento zero.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

A assinatura também é fornecida como uma string hexadecimal de 65 bytes. No entanto, o último byte é necessário apenas para recuperar a chave pública. Como a chave pública já será fornecida ao código Noir, não precisamos dela para verificar a assinatura, e o código Noir não a exige.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Forneça as contas.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

Este é o formato HTML (mais precisamente, [JSX](https://react.dev/learn/writing-markup-with-jsx)) do componente.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Este arquivo](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) é o código real de conhecimento zero.

```
use std::hash::pedersen_hash;
```

O [hash de Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) é fornecido com a [biblioteca padrão do Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). As provas de conhecimento zero comumente usam essa função de hash. É muito mais fácil de calcular dentro de [circuitos aritméticos](https://rareskills.io/post/arithmetic-circuit) em comparação com as funções de hash padrão.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Essas duas funções são bibliotecas externas, definidas em [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Elas são exatamente o que seus nomes indicam: uma função que calcula o [hash keccak256](https://emn178.github.io/online-tools/keccak_256.html) e uma função que verifica assinaturas do Ethereum e recupera o endereço Ethereum do signatário.

```
global ACCOUNT_NUMBER : u32 = 5;
```

O Noir é inspirado no [Rust](https://www.rust-lang.org/). As variáveis, por padrão, são constantes. É assim que definimos constantes de configuração globais. Especificamente, `ACCOUNT_NUMBER` é o número de contas que armazenamos.

Os tipos de dados nomeados `u<number>` representam esse número de bits, sem sinal. Os únicos tipos suportados são `u8`, `u16`, `u32`, `u64` e `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Esta variável é usada para o hash de Pedersen das contas, conforme explicado abaixo.

```
global MESSAGE_LENGTH : u32 = 100;
```

Conforme explicado acima, o comprimento da mensagem é fixo. Ele é especificado aqui.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

As [assinaturas EIP-191](https://eips.ethereum.org/EIPS/eip-191) exigem um buffer com um prefixo de 26 bytes, seguido pelo comprimento da mensagem em ASCII e, finalmente, a própria mensagem.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

As informações que armazenamos sobre uma conta. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) é um número, normalmente de até 253 bits, que pode ser usado diretamente no [circuito aritmético](https://rareskills.io/post/arithmetic-circuit) que implementa a prova de conhecimento zero. Aqui usamos o `Field` para armazenar um endereço Ethereum de 160 bits.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

As informações que armazenamos para uma transação de transferência.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Uma definição de função. O parâmetro é a informação de `Account`. O resultado é uma matriz de variáveis `Field`, cujo comprimento é `FLAT_ACCOUNT_FIELDS`

```
let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

O primeiro valor na matriz é o endereço da conta. O segundo inclui tanto o saldo quanto o nonce. As chamadas `.into()` alteram um número para o tipo de dados que ele precisa ser. `account.nonce` é um valor `u32`, mas para adicioná-lo a `account.balance << 32`, um valor `u128`, ele precisa ser um `u128`. Esse é o primeiro `.into()`. O segundo converte o resultado `u128` em um `Field` para que ele caiba na matriz.

```
flat
}
```

No Noir, as funções só podem retornar um valor no final (não há retorno antecipado). Para especificar o valor de retorno, você o avalia logo antes da chave de fechamento da função.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Esta função transforma a matriz de contas em uma matriz `Field`, que pode ser usada como entrada para um Hash de Petersen.

```
let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

É assim que você especifica uma variável mutável, ou seja, _não_ uma constante. As variáveis no Noir devem sempre ter um valor, então inicializamos essa variável com todos os zeros.

```
for i in 0..ACCOUNT_NUMBER {
```

Este é um loop `for`. Observe que os limites são constantes. Os loops no Noir precisam ter seus limites conhecidos em tempo de compilação. O motivo é que os circuitos aritméticos não suportam controle de fluxo. Ao processar um loop `for`, o compilador simplesmente coloca o código dentro dele várias vezes, uma para cada iteração.

```
let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Finalmente, chegamos à função que faz o hash da matriz de contas.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Esta função encontra a conta com um endereço específico. Esta função seria terrivelmente ineficiente em código padrão porque ela itera sobre todas as contas, mesmo depois de ter encontrado o endereço.

No entanto, em provas de conhecimento zero, não há controle de fluxo. Se precisarmos verificar uma condição, teremos que verificá-la todas as vezes.

Uma coisa semelhante acontece com as instruções `if`. A instrução `if` no loop acima é traduzida para estas instruções matemáticas.

_condition<sub>result</sub> = accounts[i].address == address_ // um se forem iguais, zero caso contrário

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

A função [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) faz com que a prova de conhecimento zero falhe se a asserção for falsa. Neste caso, se não conseguirmos encontrar uma conta com o endereço relevante. Para relatar o endereço, usamos uma [string de formato](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Esta função aplica uma transação de transferência e retorna a nova matriz de contas.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Não podemos acessar elementos de estrutura dentro de uma string de formato no Noir, então criamos uma cópia utilizável.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

Estas são duas condições que poderiam tornar uma transação inválida.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Crie a nova matriz de contas e, em seguida, retorne-a.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Esta função lê o endereço da mensagem. 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

O endereço tem sempre 20 bytes (ou seja, 40 dígitos hexadecimais) de comprimento e começa no caractere nº 7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Leia o valor e o nonce da mensagem. 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Na mensagem, o primeiro número após o endereço é a quantidade de finney (ou seja, milésimo de um ETH) a ser transferida. O segundo número é o nonce. Qualquer texto entre eles é ignorado.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // Acabamos de encontrá-lo
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Retornar uma [tupla](https://noir-lang.org/docs/noir/concepts/data_types/tuples) é a maneira do Noir de retornar vários valores de uma função.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Esta função converte a mensagem em bytes e, em seguida, converte os valores em um `TransferTxn`.

```rust
// O equivalente ao hashMessage do Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Conseguimos usar o Hash de Pedersen para as contas porque elas só são submetidas ao hash dentro da prova de conhecimento zero. No entanto, neste código, precisamos verificar a assinatura da mensagem, que é gerada pelo navegador. Para isso, precisamos seguir o formato de assinatura do Ethereum na [EIP-191](https://eips.ethereum.org/EIPS/eip-191). Isso significa que precisamos criar um buffer combinado com um prefixo padrão, o comprimento da mensagem em ASCII e a própria mensagem, e usar o keccak256 padrão do Ethereum para fazer o hash.

```rust
    // Prefixo ASCII
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Para evitar casos em que um aplicativo pede ao usuário para assinar uma mensagem que pode ser usada como uma transação ou para algum outro propósito, a EIP-191 especifica que todas as mensagens assinadas começam com o caractere 0x19 (não é um caractere ASCII válido) seguido por `Ethereum Signed Message:` e uma nova linha.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

Lide com comprimentos de mensagem de até 999 e falhe se for maior. Adicionei este código, embora o comprimento da mensagem seja uma constante, porque facilita a alteração. Em um sistema de produção, você provavelmente apenas assumiria que `MESSAGE_LENGTH` não muda para obter um melhor desempenho.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Use a função `keccak256` padrão do Ethereum.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // endereço, primeiros 16 bytes do hash, últimos 16 bytes do hash        
{
```

Esta função verifica a assinatura, o que exige o hash da mensagem. Em seguida, ela nos fornece o endereço que a assinou e o hash da mensagem. O hash da mensagem é fornecido em dois valores `Field` porque eles são mais fáceis de usar no resto do programa do que uma matriz de bytes.

Precisamos usar dois valores `Field` porque os cálculos de campo são feitos em [módulo](https://en.wikipedia.org/wiki/Modulo) de um número grande, mas esse número é normalmente menor que 256 bits (caso contrário, seria difícil realizar esses cálculos na EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Especifique `hash1` e `hash2` como variáveis mutáveis e grave o hash nelas byte a byte.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
Isso é semelhante ao [`ecrecover` do Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), com duas diferenças importantes:

- Se a assinatura não for válida, a chamada falha em um `assert` e o programa é abortado.
- Embora a chave pública possa ser recuperada da assinatura e do hash, esse é um processamento que pode ser feito externamente e, portanto, não vale a pena fazer dentro da prova de conhecimento zero. Se alguém tentar nos enganar aqui, a verificação da assinatura falhará.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash do array de contas antigas
        Field,  // Hash do array de novas contas
        Field,  // Primeiros 16 bytes do hash da mensagem
        Field,  // Últimos 16 bytes do hash da mensagem
    )
```

Finalmente, chegamos à função `main`. Precisamos provar que temos uma transação que altera validamente o hash das contas do valor antigo para o novo. Também precisamos provar que ela tem esse hash da transação específico para que a pessoa que a enviou saiba que sua transação foi processada.

```rust
{
    let mut txn = readTransferTxn(message);
```

Precisamos que `txn` seja mutável porque não lemos o endereço de origem (from) da mensagem, nós o lemos da assinatura. 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Etapa 2 - Adicionando um servidor {#stage-2}

Na segunda etapa, adicionamos um servidor que recebe e implementa transações de transferência do navegador.

Para ver isso em ação:

1. Pare o Vite se ele estiver em execução.

2. Baixe a branch que inclui o servidor e certifique-se de ter todos os módulos necessários.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Não há necessidade de compilar o código Noir, é o mesmo código que você usou para a etapa 1.

3. Inicie o servidor.

   ```sh
   npm run start
   ```

4. Em uma janela de linha de comando separada, execute o Vite para servir o código do navegador.

   ```sh
   cd client
   npm run dev
   ```

5. Navegue até o código do cliente em [http://localhost:5173](http://localhost:5173)

6. Antes de poder emitir uma transação, você precisa saber o nonce, bem como o valor que pode enviar. Para obter essas informações, clique em **Update account data** (Atualizar dados da conta) e assine a mensagem.

   Temos um dilema aqui. Por um lado, não queremos assinar uma mensagem que possa ser reutilizada (um [ataque de repetição](https://en.wikipedia.org/wiki/Replay_attack)), e é por isso que queremos um nonce em primeiro lugar. No entanto, ainda não temos um nonce. A solução é escolher um nonce que possa ser usado apenas uma vez e que já tenhamos em ambos os lados, como a hora atual.

   O problema com essa solução é que o tempo pode não estar perfeitamente sincronizado. Então, em vez disso, assinamos um valor que muda a cada minuto. Isso significa que nossa janela de vulnerabilidade a ataques de repetição é de no máximo um minuto. Considerando que na produção a solicitação assinada será protegida por TLS, e que o outro lado do túnel---o servidor---já pode divulgar o saldo e o nonce (ele precisa conhecê-los para funcionar), este é um risco aceitável.

7. Assim que o navegador receber de volta o saldo e o nonce, ele mostrará o formulário de transferência. Selecione o endereço de destino e o valor e clique em **Transfer** (Transferir). Assine esta solicitação.

8. Para ver a transferência, clique em **Update account data** (Atualizar dados da conta) ou olhe na janela onde você executa o servidor. O servidor registra o estado em log toda vez que ele muda.

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
        ```

#### `server/index.mjs` {#server-index-mjs-1}

[Este arquivo](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) contém o processo do servidor e interage com o código Noir em [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Aqui está uma explicação das partes interessantes.

```js
import { Noir } from '@noir-lang/noir_js'
```

A biblioteca [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) faz a interface entre o código JavaScript e o código Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Carregue o circuito aritmético---o programa Noir compilado que criamos na etapa anterior---e prepare-se para executá-lo.

```js
// Fornecemos informações da conta apenas em resposta a uma solicitação assinada
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Para fornecer informações da conta, precisamos apenas da assinatura. O motivo é que já sabemos qual será a mensagem e, portanto, o hash da mensagem.

```js
const processMessage = async (message, signature) => {
```

Processe uma mensagem e execute a transação que ela codifica.

```js
    // Obter a chave pública
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Agora que executamos o JavaScript no servidor, podemos recuperar a chave pública lá em vez de no cliente.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` executa o programa Noir. Os parâmetros são equivalentes aos fornecidos em [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Observe que valores longos são fornecidos como uma matriz de strings hexadecimais (`["0x60", "0xA7"]`), não como um único valor hexadecimal (`0x60A7`), da maneira que o Viem faz.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Se houver um erro, capture-o e, em seguida, retransmita uma versão simplificada para o cliente.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Aplique a transação. Já fizemos isso no código Noir, mas é mais fácil fazer de novo aqui do que extrair o resultado de lá.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

A estrutura inicial de `Accounts`.

### Etapa 3 - Contratos inteligentes do Ethereum {#stage-3}

1. Pare os processos do servidor e do cliente.

2. Baixe a branch com os contratos inteligentes e certifique-se de ter todos os módulos necessários.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Execute `anvil` em uma janela de linha de comando separada.

4. Gere a chave de verificação e o verificador em Solidity e, em seguida, copie o código do verificador para o projeto Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Vá para os contratos inteligentes e defina as variáveis de ambiente para usar a blockchain `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Implante `Verifier.sol` e armazene o endereço em uma variável de ambiente.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Implante o contrato `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   O valor `0x199..67b` é o hash de Pederson do estado inicial de `Accounts`. Se você modificar esse estado inicial em `server/index.mjs`, poderá executar uma transação para ver o hash inicial relatado pela prova de conhecimento zero.

8. Execute o servidor.

   ```sh
   cd ../server
   npm run start
   ```

9. Execute o cliente em uma janela de linha de comando diferente.

   ```sh
   cd client
   npm run dev
   ```

10. Execute algumas transações.

11. Para verificar se o estado mudou onchain, reinicie o processo do servidor. Veja que `ZkBank` não aceita mais transações, porque o valor de hash original nas transações difere do valor de hash armazenado onchain.

    Este é o tipo de erro esperado.

        ```
ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
        ```

#### `server/index.mjs` {#server-index-mjs-2}

As alterações neste arquivo referem-se principalmente à criação da prova real e ao seu envio onchain.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Precisamos usar [o pacote Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) para criar a prova real para enviar onchain. Podemos usar este pacote executando a interface de linha de comando (`bb`) ou usando a [biblioteca JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). A biblioteca JavaScript é muito mais lenta do que executar o código nativamente, então usamos [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) aqui para usar a linha de comando.

Observe que, se você decidir usar `bb.js`, precisará usar uma versão compatível com a versão do Noir que você está usando. No momento da redação deste artigo, a versão atual do Noir (1.0.0-beta.11) usa a versão 0.87 do `bb.js`.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

O endereço aqui é aquele que você obtém quando começa com um `anvil` limpo e segue as instruções acima.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Esta chave privada é uma das contas pré-financiadas padrão no `anvil`. 

```js
const generateProof = async (witness, fileID) => {
```

Gere uma prova usando o executável `bb`.

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Grave a testemunha em um arquivo.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Crie a prova de fato. Esta etapa também cria um arquivo com as variáveis públicas, mas não precisamos disso. Já obtivemos essas variáveis de `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

A prova é uma matriz JSON de valores `Field`, cada um representado como um valor hexadecimal. No entanto, precisamos enviá-la na transação como um único valor `bytes`, que o Viem representa por uma grande string hexadecimal. Aqui, alteramos o formato concatenando todos os valores, removendo todos os `0x` e, em seguida, adicionando um no final.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Limpe e retorne a prova.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Os campos públicos precisam ser uma matriz de valores de 32 bytes. No entanto, como precisávamos dividir o hash da transação entre dois valores `Field`, ele aparece como um valor de 16 bytes. Aqui adicionamos zeros para que o Viem entenda que na verdade são 32 bytes.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Cada endereço usa cada nonce apenas uma vez para que possamos usar uma combinação de `fromAddress` e `nonce` como um identificador exclusivo para o arquivo de testemunha e o diretório de saída.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

Envie a transação para a cadeia.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Este é o código onchain que recebe a transação.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

O código onchain precisa acompanhar duas variáveis: o verificador (um contrato separado que é criado por `nargo`) e o hash de estado atual.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Toda vez que o estado muda, emitimos um evento `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Esta função processa transações. Ela obtém a prova (como `bytes`) e as entradas públicas (como uma matriz `bytes32`), no formato que o verificador exige (para minimizar o processamento onchain e, portanto, os custos de gás).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

A prova de conhecimento zero precisa ser que a transação muda do nosso hash atual para um novo.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Chame o contrato verificador para verificar a prova de conhecimento zero. Esta etapa reverte a transação se a prova de conhecimento zero estiver errada.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Se tudo estiver correto, atualize o hash de estado para o novo valor e emita um evento `TransactionProcessed`.

## Abusos pelo componente centralizado {#abuses}

A segurança da informação consiste em três atributos:

- _Confidencialidade_, os usuários não podem ler informações que não estão autorizados a ler.
- _Integridade_, as informações não podem ser alteradas, exceto por usuários autorizados de maneira autorizada.
- _Disponibilidade_, os usuários autorizados podem usar o sistema.

Neste sistema, a integridade é fornecida por meio de provas de conhecimento zero. A disponibilidade é muito mais difícil de garantir, e a confidencialidade é impossível, porque o banco precisa saber o saldo de cada conta e todas as transações. Não há como impedir que uma entidade que possui informações compartilhe essas informações.

Pode ser possível criar um banco verdadeiramente confidencial usando [endereços furtivos](https://vitalik.eth.limo/general/2023/01/20/stealth.html), mas isso está além do escopo deste artigo.

### Informações falsas {#false-info}

Uma maneira pela qual o servidor pode violar a integridade é fornecer informações falsas quando [os dados são solicitados](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Para resolver isso, podemos escrever um segundo programa Noir que recebe as contas como uma entrada privada e o endereço para o qual as informações são solicitadas como uma entrada pública. A saída é o saldo e o nonce desse endereço, e o hash das contas.

Claro, essa prova não pode ser verificada onchain, porque não queremos publicar nonces e saldos onchain. No entanto, ela pode ser verificada pelo código do cliente em execução no navegador.

### Transações forçadas {#forced-txns}

O mecanismo usual para garantir a disponibilidade e evitar a censura em L2s são as [transações forçadas](https://docs.optimism.io/stack/transactions/forced-transaction). Mas as transações forçadas não combinam com provas de conhecimento zero. O servidor é a única entidade que pode verificar as transações.

Podemos modificar `smart-contracts/src/ZkBank.sol` para aceitar transações forçadas e impedir que o servidor altere o estado até que elas sejam processadas. No entanto, isso nos expõe a um simples ataque de negação de serviço. E se uma transação forçada for inválida e, portanto, impossível de processar?

A solução é ter uma prova de conhecimento zero de que uma transação forçada é inválida. Isso dá ao servidor três opções:

- Processar a transação forçada, fornecendo uma prova de conhecimento zero de que ela foi processada e o novo hash de estado.
- Rejeitar a transação forçada e fornecer uma prova de conhecimento zero ao contrato de que a transação é inválida (endereço desconhecido, nonce incorreto ou saldo insuficiente).
- Ignorar a transação forçada. Não há como forçar o servidor a realmente processar a transação, mas isso significa que todo o sistema está indisponível.

#### Garantias de disponibilidade {#avail-bonds}

Em uma implementação na vida real, provavelmente haveria algum tipo de motivo de lucro para manter o servidor em execução. Podemos fortalecer esse incentivo fazendo com que o servidor deposite uma garantia de disponibilidade que qualquer um pode queimar se uma transação forçada não for processada dentro de um determinado período.

### Código Noir ruim {#bad-noir-code}

Normalmente, para fazer com que as pessoas confiem em um contrato inteligente, fazemos o upload do código-fonte para um [explorador de blocos](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). No entanto, no caso de provas de conhecimento zero, isso é insuficiente.

`Verifier.sol` contém a chave de verificação, que é uma função do programa Noir. No entanto, essa chave não nos diz qual era o programa Noir. Para realmente ter uma solução confiável, você precisa fazer o upload do programa Noir (e da versão que o criou). Caso contrário, as provas de conhecimento zero podem refletir um programa diferente, um com um backdoor.

Até que os exploradores de blocos comecem a nos permitir fazer o upload e verificar programas Noir, você deve fazer isso por conta própria (de preferência no [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Então, usuários sofisticados poderão baixar o código-fonte, compilá-lo eles mesmos, criar `Verifier.sol` e verificar se é idêntico ao que está onchain.

## Conclusão {#conclusion}

Aplicativos do tipo Plasma exigem um componente centralizado como armazenamento de informações. Isso abre espaço para possíveis vulnerabilidades, mas, em contrapartida, nos permite preservar a privacidade de maneiras que não estão disponíveis na própria blockchain. Com provas de conhecimento zero, podemos garantir a integridade e possivelmente tornar economicamente vantajoso para quem estiver executando o componente centralizado manter a disponibilidade.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).

## Agradecimentos {#acknowledgements}

- Josh Crites leu um rascunho deste artigo e me ajudou com um problema espinhoso no Noir.

Quaisquer erros remanescentes são de minha responsabilidade.