---
title: "Adicionando vídeos"
description: "A política para adicionar vídeos ao ethereum.org"
lang: pt-br
---

# Adicionando vídeos {#adding-videos}

A [galeria de vídeos do ethereum.org](/videos/) apresenta vídeos sobre o Ethereum e o ecossistema Ethereum de criadores da comunidade e fontes confiáveis. Qualquer pessoa pode sugerir a adição de um vídeo.

## Política de listagem {#listing-policy}

O ethereum.org é um recurso educacional neutro. A galeria de vídeos é selecionada para:

- **Educar** os usuários sobre a tecnologia, o ecossistema e a comunidade do Ethereum
- **Permanecer precisa** em seu conteúdo técnico
- **Manter-se relevante** para a comunidade do Ethereum

O site não lista vídeos que promovem principalmente um produto específico, token ou serviço comercial.


## Critérios de inclusão {#criteria-for-inclusion}

### Requisitos obrigatórios {#must-haves}

- **Foco no Ethereum** – O vídeo deve ser principalmente sobre o Ethereum, sua tecnologia, ecossistema ou comunidade. Vídeos sobre tópicos gerais de blockchain são aceitáveis apenas se apoiarem substancialmente ou se relacionarem a uma página educacional no site, ou se fizerem referência ao Ethereum.
- **Valor educacional** – O vídeo deve ensinar aos espectadores algo sobre o Ethereum ou celebrar a comunidade global do Ethereum. Conteúdo promocional ou de marketing não será aceito.
- **Informações precisas** – O conteúdo técnico deve ser factualmente correto e atualizado. Vídeos desatualizados sobre recursos obsoletos podem ser removidos.
- **Produção de qualidade** – O vídeo deve ter uma qualidade de áudio e vídeo razoavelmente clara.
- **Disponível publicamente** – O vídeo deve estar hospedado em um recurso aberto ou plataforma acessível como o YouTube, e ser de livre acesso sem a exigência de pagamento (paywall) ou de inscrição.

### Diferenciais desejáveis {#nice-to-haves}

- **Possui uma transcrição** – Vídeos com transcrições melhoram a acessibilidade e o SEO. Se você não tiver uma, a equipe do ethereum.org pode ajudar a gerá-la.
- **De uma fonte confiável** – Conteúdo de educadores, pesquisadores e fontes estabelecidas recebe prioridade.
- **Atemporal e duradouro** – Conteúdo que permanece relevante ao longo do tempo é preferido em relação a materiais sensíveis ao tempo.


## Como adicionar um vídeo {#how-to-add-a-video}

### Opção 1: Abrir uma issue {#open-an-issue}

Se você quiser sugerir um vídeo, mas não quiser criar os arquivos por conta própria, abra uma issue no GitHub com os detalhes do vídeo e um colaborador poderá ajudar a adicioná-lo para você.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Sugerir um vídeo
</ButtonLink>

### Opção 2: Abrir um pull request {#open-a-pull-request}

Se você quiser adicionar o vídeo por conta própria, siga estas etapas:

#### Etapa 1: Criar o arquivo de vídeo {#step-1}

Crie um novo diretório e um arquivo `index.md` em:

```
public/content/videos/{seu-slug-de-video}/index.md
```

O slug deve ser seguro para URL, em letras minúsculas e usar hifens (por exemplo, `blockchain-101-visual-demo`).

#### Etapa 2: Adicionar o frontmatter {#step-2}

Adicione o seguinte frontmatter YAML ao seu `index.md`:

```yaml
---
title: "Your Video Title"
description: "A brief 1–3 sentence summary of the video."
lang: en
youtubeId: "dQw4w9WgXcQ"
uploadDate: 2025-01-15
duration: "12:30"
educationLevel: beginner
topic:
  - "your-topic"
  - "another-topic"
format: explainer
author: Channel Name
---
```

**Referência de campos:**

| Campo | Obrigatório | Descrição |
|---|---|---|
| `title` | Sim | Título do vídeo |
| `description` | Sim | Resumo de 1 a 3 frases |
| `lang` | Sim | Sempre `en` por enquanto |
| `youtubeId` | Sim | O ID do vídeo do YouTube (da URL após `v=`) |
| `uploadDate` | Sim | Data de envio original no formato `YYYY-MM-DD` |
| `duration` | Sim | Duração do vídeo como `H:MM:SS` ou `M:SS` |
| `educationLevel` | Sim | `beginner`, `intermediate` ou `advanced` |
| `topic` | Sim | Matriz de tags de tópicos para filtragem da galeria |
| `format` | Sim | `explainer`, `presentation`, `interview`, `tutorial` ou `panel` |
| `author` | Sim | Nome do criador ou do canal |
| `breadcrumb` | Não | Rótulo curto personalizado para navegação de breadcrumb |
| `customThumbnailUrl` | Não | URL de miniatura personalizada (o padrão é a miniatura do YouTube) |

#### Etapa 3: Adicionar uma transcrição (recomendado) {#step-3}

Abaixo do frontmatter `---`, adicione a transcrição do vídeo no formato markdown:

```markdown
---
title: "..."
# ... resto do frontmatter
---

Uma breve introdução ao conteúdo do vídeo.

### Título da seção (0:00)

Texto da transcrição para esta seção...

### Próxima seção (5:30)

Mais texto da transcrição...
```

Use cabeçalhos `###` com marcações de tempo para marcar as seções principais. Isso torna a transcrição fácil de ler e melhora o SEO.

Se você não tiver uma transcrição, pode deixar o corpo vazio e a equipe gerará uma.

#### Etapa 4: Escolher as tags de tópico

Escolha as tags de tópico na lista abaixo. Cada tag mapeia diretamente para uma categoria de filtro na galeria de vídeos — use o nome da tag exatamente como mostrado.

Um vídeo pode ter várias tags para aparecer em vários filtros da galeria:

| Tag | Filtro da galeria |
|---|---|
| `how-ethereum-works` | Como o Ethereum funciona |
| `network-upgrades` | Atualizações da rede |
| `roadmap-and-priorities` | Roteiro e prioridades |
| `scaling-and-layer-2` | Escalonamento e camada 2 (l2) |
| `use-cases` | Casos de uso |
| `privacy` | Privacidade |
| `security` | Segurança |
| `community-stories` | Histórias da comunidade |
| `events` | Eventos |

Todo vídeo deve ter pelo menos uma tag desta lista. Vídeos sem uma tag reconhecida aparecerão apenas na visualização "Todos" e nos resultados de pesquisa.

A tag `community-stories` também faz com que um vídeo apareça na [página de Histórias](/stories/).
#### Etapa 5: Enviar seu PR {#step-5}

Abra um pull request com suas alterações para a branch `dev`. A equipe revisará seu envio e fornecerá feedback.


## Manutenção {#maintenance}

Os vídeos listados são revisados rotineiramente para garantir que:

- Ainda atendam aos critérios de listagem
- Contenham informações precisas e atualizadas
- Tenham links de hospedagem/YouTube funcionando

Se você notar um problema com um vídeo listado, [crie uma issue](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) ou envie um e-mail para [website@ethereum.org](mailto:website@ethereum.org).


## Termos de uso {#terms-of-use}

Consulte os [termos de uso](/terms-of-use/) do ethereum.org. As informações no ethereum.org são fornecidas exclusivamente para fins de informação geral.
