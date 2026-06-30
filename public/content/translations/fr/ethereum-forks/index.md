---
title: Chronologie de tous les forks d'Ethereum (de 2014 à aujourd'hui)
description: Un historique de la chaîne de blocs Ethereum comprenant les étapes majeures, les versions et les forks.
lang: fr
sidebarDepth: 1
authors: ["Nixo"]
---

Une chronologie de toutes les étapes majeures, des forks et des mises à jour de la chaîne de blocs [Ethereum](/).

<ExpandableCard title="Que sont les forks ?" contentPreview="Modifications des règles du protocole Ethereum qui incluent souvent des mises à jour techniques planifiées.">

Les forks se produisent lorsque des mises à jour ou des modifications techniques majeures doivent être apportées au réseau – ils découlent généralement des [propositions d'amélioration d'Ethereum (EIP)](/eips/) et modifient les « règles » du protocole.

Lorsque des mises à jour sont nécessaires dans un logiciel traditionnel contrôlé de manière centralisée, l'entreprise publie simplement une nouvelle version pour l'utilisateur final. Les chaînes de blocs fonctionnent différemment car il n'y a pas de propriété centrale. Les [clients Ethereum](/developers/docs/nodes-and-clients/) doivent mettre à jour leurs logiciels pour implémenter les nouvelles règles du fork. De plus, les créateurs de blocs (les mineurs dans un monde de preuve de travail (PoW), les validateurs dans un monde de preuve d'enjeu (PoS)) et les nœuds doivent créer des blocs et les valider selon les nouvelles règles. [En savoir plus sur les mécanismes de consensus](/developers/docs/consensus-mechanisms/)

Ces changements de règles peuvent créer une scission temporaire du réseau. De nouveaux blocs pourraient être produits selon les nouvelles règles ou les anciennes. Les forks sont généralement convenus à l'avance afin que les clients adoptent les changements à l'unisson et que le fork avec les mises à jour devienne la chaîne principale. Cependant, dans de rares cas, des désaccords sur les forks peuvent entraîner une scission permanente du réseau – notamment la création d'Ethereum Classic avec le <a href="#dao-fork">fork DAO</a>.

</ExpandableCard>

<ExpandableCard title="Pourquoi certaines mises à jour ont-elles plusieurs noms ?" contentPreview="Les noms des mises à jour suivent un modèle">

Le logiciel qui sous-tend Ethereum est composé de deux moitiés, connues sous le nom de [couche d'exécution](/glossary/#execution-layer) et de [couche de consensus](/glossary/#consensus-layer).

**Nommage des mises à jour d'exécution**

Depuis 2021, les mises à jour de la **couche d'exécution** sont nommées d'après les noms des villes des [précédents lieux de la Devcon et de la Devconnect](https://devcon.org/en/past-events/) par ordre chronologique :

| Nom de la mise à jour | Année de la Devcon(nect) | Numéro de la Devcon | Date de la mise à jour |
| -------------- | ----------------- | ------------- | ------------ |
| Berlin         | 2014              | 0             | 15 avr. 2021 |
| London         | 2015              | I             | 5 août 2021  |
| Shanghai       | 2016              | II            | 12 avr. 2023 |
| Cancun         | 2017              | III           | 13 mars 2024 |
| Prague         | 2018              | IV            | 7 mai 2025   |
| Osaka          | 2019              | V             | 3 déc. 2025  |
| **Amsterdam**  | 2022              | Devconnect    | À déterminer - Suivante |
| _Bogotá_       | 2022              | VI            | À déterminer |
| _Istanbul_     | 2023              | Devconnect    | À déterminer |
| _Bangkok_      | 2024              | VII           | À déterminer |
| _Buenos Aires_ | 2025              | Devconnect    | À déterminer |
| _Mumbai_       | 2026              | VIII          | À déterminer |

**Nommage des mises à jour de consensus**

Depuis le lancement de la [chaîne balise](/glossary/#beacon-chain), les mises à jour de la **couche de consensus** portent le nom d'étoiles célestes commençant par des lettres qui se succèdent par ordre alphabétique :

| Nom de la mise à jour                                     | Date de la mise à jour |
| --------------------------------------------------------- | ------------ |
| Genèse de la chaîne balise                                | 1 déc. 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 27 oct. 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 6 sept. 2022 |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 12 avr. 2023 |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 13 mars 2024 |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 mai 2025   |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 déc. 2025  |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | À déterminer - Suivante |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | À déterminer |

**Nommage combiné**

Les mises à jour d'exécution et de consensus ont d'abord été déployées à des moments différents, mais après [La Fusion](/roadmap/merge/) en 2022, elles ont été déployées simultanément. De ce fait, des termes familiers sont apparus pour simplifier les références à ces mises à jour en utilisant un seul terme conjoint. Cela a commencé avec la mise à jour _Shanghai-Capella_, communément appelée « **Shapella** », et se poursuit avec les mises à jour ultérieures.

| Mise à jour d'exécution | Mise à jour de consensus | Nom court     |
| ----------------- | ----------------- | ------------- |
| Shanghai          | Capella           | « Shapella »  |
| Cancun            | Deneb             | « Dencun »    |
| Prague            | Electra           | « Pectra »    |
| Osaka             | Fulu              | « Fusaka »    |
| Amsterdam         | Gloas             | « Glamsterdam » |
| Bogotá            | Heze              | « Hegotá »    |

</ExpandableCard>

Passez directement aux informations concernant certaines des mises à jour passées particulièrement importantes : [La chaîne balise](/roadmap/beacon-chain/) ; [La Fusion](/roadmap/merge/) ; et l'[EIP-1559](#london)

Vous recherchez les futures mises à jour du protocole ? [Découvrez les prochaines mises à jour sur la feuille de route d'Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Plus d'informations sur Fusaka](/roadmap/fusaka/)

### Prague-Electra (« Pectra »)
<NetworkUpgradeSummary name="pectra" />

La mise à jour Prague-Electra (« Pectra ») a inclus plusieurs améliorations au protocole Ethereum visant à améliorer l'expérience pour tous les utilisateurs, les réseaux de couche 2, les stakers et les opérateurs de nœuds.

Le staking a bénéficié d'une mise à jour avec la composition des rendements des comptes de validateur, et un contrôle amélioré sur les fonds en staking en utilisant l'adresse de retrait d'exécution. L'EIP-7251 a augmenté le solde effectif maximum pour un seul validateur à 2048, améliorant l'efficacité du capital pour les stakers. L'EIP-7002 a permis à un compte d'exécution de déclencher en toute sécurité des actions de validateur, y compris la sortie, ou le retrait d'une partie des fonds, améliorant l'expérience pour les stakers d'ETH, tout en aidant à renforcer la responsabilité des opérateurs de nœuds.

D'autres parties de la mise à jour se sont concentrées sur l'amélioration de l'expérience pour les utilisateurs réguliers. L'EIP-7702 a apporté la capacité pour un compte ordinaire (non-contrat intelligent) ([EOA](/glossary/#eoa)) d'exécuter du code de manière similaire à un contrat intelligent. Cela a débloqué de nouvelles fonctionnalités illimitées pour les comptes Ethereum traditionnels, telles que le traitement par lots des transactions, le sponsoring du gaz, l'authentification alternative, les contrôles de dépenses programmables, les mécanismes de récupération de compte et plus encore.

<ExpandableCard title="EIP de Pectra" contentPreview="Améliorations officielles incluses dans cette mise à jour.">

Meilleure expérience utilisateur :

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Définir le code de compte EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Augmentation du débit des blobs</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Augmentation du coût des données d'appel</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Ajout de la planification des blobs aux fichiers de configuration EL</em></li>
</ul>

Meilleure expérience de staking :

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Augmentation du <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Sorties déclenchables par la couche d'exécution</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Requêtes de la couche d'exécution à usage général</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Fournir les dépôts de validateur onchain</em></li>
</ul>

Améliorations de l'efficacité et de la sécurité du protocole :

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Précompilé pour les opérations sur la courbe BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Sauvegarder les hashs de blocs historiques dans l'état</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Déplacer l'indice de comité en dehors de l'attestation</em></li>
</ul>

</ExpandableCard>

- [Comment Pectra va améliorer l'expérience de staking](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Lire les spécifications de la mise à jour Electra](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [FAQ sur Prague-Electra (« Pectra »)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb (« Dencun ») {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Résumé de Cancun {#cancun-summary}

La mise à jour Cancun contient un ensemble d'améliorations de l'_exécution_ d'Ethereum visant à améliorer la scalabilité, en tandem avec les mises à jour de consensus Deneb.

Cela inclut notamment l'EIP-4844, connu sous le nom de **proto-danksharding**, qui réduit considérablement le coût de stockage des données pour les rollup de couche 2. Ceci est réalisé grâce à l'introduction de « blobs » de données qui permettent aux rollup de publier des données sur le Réseau principal pendant une courte période. Il en résulte des frais de transaction nettement inférieurs pour les utilisateurs des rollup de couche 2.

<ExpandableCard title="EIP de Cancun" contentPreview="Améliorations officielles incluses dans cette mise à jour.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Codes d'opération de stockage transitoire</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Racine de bloc phare dans l'EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transactions de blob de fragment (proto-danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Instruction de copie de mémoire</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> uniquement dans la même transaction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>Code d'opération <code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [Rollup de couche 2](/layer-2/)
- [Proto-danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Lire les spécifications de la mise à jour Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Résumé de Deneb {#deneb-summary}

La mise à jour Deneb contient un ensemble d'améliorations du _consensus_ d'Ethereum visant à améliorer la scalabilité. Cette mise à jour intervient en tandem avec les mises à jour d'exécution Cancun pour activer le proto-danksharding (EIP-4844), ainsi que d'autres améliorations de la chaîne balise.

Les « messages de sortie volontaire » signés et prégénérés n'expirent plus, donnant ainsi plus de contrôle aux utilisateurs effectuant du staking de leurs fonds avec un opérateur de nœud tiers. Avec ce message de sortie signé, les stakers peuvent déléguer l'opération du nœud tout en conservant la possibilité de sortir en toute sécurité et de retirer leurs fonds à tout moment, sans avoir besoin de demander la permission à quiconque.

L'EIP-7514 apporte un resserrement de l'émission d'ETH en plafonnant le taux de « churn » auquel les validateurs peuvent rejoindre le réseau à huit (8) par époque. Étant donné que l'émission d'ETH est proportionnelle au total d'ETH en staking, limiter le nombre de validateurs rejoignant le réseau plafonne le _taux de croissance_ des ETH nouvellement émis, tout en réduisant les exigences matérielles pour les opérateurs de nœuds, ce qui favorise la décentralisation.

<ExpandableCard title="EIP de Deneb" contentPreview="Améliorations officielles incluses dans cette mise à jour">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Racine de bloc phare dans l'EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transactions de blob de fragment</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Sorties volontaires signées perpétuellement valides</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Augmentation du créneau d'inclusion d'attestation maximum</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Ajout d'une limite de churn maximale par époque</em></li>
</ul>

</ExpandableCard>

- [Lire les spécifications de la mise à jour Deneb](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [FAQ sur Cancun-Deneb (« Dencun »)](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Résumé de Shanghai {#shanghai-summary}

La mise à jour Shanghai a apporté les retraits de staking à la couche d'exécution. En tandem avec la mise à jour Capella, cela a permis aux blocs d'accepter les opérations de retrait, ce qui permet aux stakers de retirer leurs ETH de la chaîne balise vers la couche d'exécution.

<ExpandableCard title="EIP de Shanghai" contentPreview="Améliorations officielles incluses dans cette mise à jour.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Démarre l'adresse <code>COINBASE</code> à chaud</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Nouvelle instruction <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limiter et mesurer l'initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Pousser les retraits de la chaîne balise comme opérations</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Déprécier <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Lire les spécifications de la mise à jour Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Résumé de Capella {#capella-summary}

La mise à jour Capella était la troisième mise à jour majeure de la couche de consensus (chaîne balise) et a activé les retraits de staking. Capella s'est produite de manière synchrone avec la mise à jour de la couche d'exécution, Shanghai, et a activé la fonctionnalité de retrait de staking.

Cette mise à jour de la couche de consensus a apporté la possibilité aux stakers qui n'avaient pas fourni d'identifiants de retrait lors de leur dépôt initial de le faire, permettant ainsi les retraits.

La mise à jour a également fourni une fonctionnalité de balayage automatique des comptes, qui traite en continu les comptes de validateur pour tout paiement de récompenses disponible ou retrait complet.

- [En savoir plus sur les retraits de staking](/staking/withdrawals/).
- [Lire les spécifications de la mise à jour Capella](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (La Fusion) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Résumé {#paris-summary}

La mise à jour Paris a été déclenchée lorsque la chaîne de blocs à preuve de travail (PoW) a dépassé une [difficulté totale terminale](/glossary/#terminal-total-difficulty) de 58750000000000000000000. Cela s'est produit au bloc 15537393 le 15 septembre 2022, déclenchant la mise à jour Paris au bloc suivant. Paris était la transition de [La Fusion](/roadmap/merge/) - sa caractéristique principale était la désactivation de l'algorithme de minage à [preuve de travail](/developers/docs/consensus-mechanisms/pow) et de la logique de consensus associée, pour passer à la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos). Paris elle-même était une mise à jour des [clients d'exécution](/developers/docs/nodes-and-clients/#execution-clients) (équivalente à Bellatrix sur la couche de consensus) qui leur a permis de recevoir des instructions de leurs [clients de consensus](/developers/docs/nodes-and-clients/#consensus-clients) connectés. Cela a nécessité l'activation d'un nouvel ensemble de méthodes d'API internes, collectivement connues sous le nom d'[API Engine](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Il s'agissait sans doute de la mise à jour la plus importante de l'histoire d'Ethereum depuis [Homestead](#homestead) !

- [Lire les spécifications de la mise à jour Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP de Paris" contentPreview="Améliorations officielles incluses dans cette mise à jour.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Mise à niveau du consensus vers la preuve d'enjeu</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Remplacer le code d'opération DIFFICULTY par PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Résumé {#bellatrix-summary}

La mise à jour Bellatrix était la deuxième mise à jour programmée pour la [chaîne balise](/roadmap/beacon-chain), préparant la chaîne pour [La Fusion](/roadmap/merge/). Elle porte les pénalités des validateurs à leurs valeurs maximales en cas d'inactivité et d'infractions passibles de réduction. Bellatrix inclut également une mise à jour des règles de choix de fork pour préparer la chaîne à La Fusion et à la transition du dernier bloc à preuve de travail au premier bloc à preuve d'enjeu. Cela implique d'informer les clients de consensus de la [difficulté totale terminale](/glossary/#terminal-total-difficulty) de 58750000000000000000000.

- [Lire les spécifications de la mise à jour Bellatrix](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Résumé {#gray-glacier-summary}

La mise à jour du réseau Gray Glacier a repoussé la [bombe de difficulté](/glossary/#difficulty-bomb) de trois mois. C'est le seul changement introduit dans cette mise à jour, et il est de nature similaire aux mises à jour [Arrow Glacier](#arrow-glacier) et [Muir Glacier](#muir-glacier). Des changements similaires ont été effectués lors des mises à jour du réseau [Byzantium](#byzantium), [Constantinople](#constantinople) et [London](#london).

- [Blog de la Fondation Ethereum - Annonce de la mise à jour Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="EIP de Gray Glacier" contentPreview="Améliorations officielles incluses dans cette mise à jour.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>retarde la bombe de difficulté jusqu'en septembre 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Résumé {#arrow-glacier-summary}

La mise à jour du réseau Arrow Glacier a repoussé la [bombe de difficulté](/glossary/#difficulty-bomb) de plusieurs mois. Il s'agit du seul changement introduit par cette mise à jour, qui est de nature similaire à la mise à jour [Muir Glacier](#muir-glacier). Des changements similaires ont été effectués lors des mises à jour du réseau [Byzantium](#byzantium), [Constantinople](#constantinople) et [London](#london).

- [Blog de la Fondation Ethereum - Annonce de la mise à jour Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - Mise à jour Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP d'Arrow Glacier" contentPreview="Améliorations officielles incluses dans cette mise à jour.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>repousse la bombe de difficulté jusqu'en juin 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Résumé {#altair-summary}

La mise à jour Altair a été la première mise à jour programmée pour la [chaîne balise](/roadmap/beacon-chain). Elle a ajouté la prise en charge des « comités de synchronisation » (sync committees) — permettant les clients légers, et a augmenté les pénalités d'inactivité des validateurs et de réduction (slashing) à mesure que le développement progressait vers La Fusion.

- [Lire les spécifications de la mise à jour Altair](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> Fait amusant ! {#altair-fun-fact}

Altair a été la première mise à jour majeure du réseau à avoir une heure de déploiement exacte. Toutes les mises à jour précédentes étaient basées sur un numéro de bloc déclaré sur la chaîne de preuve de travail (PoW), où les temps de bloc varient. La chaîne balise ne nécessite pas de résoudre une preuve de travail, et fonctionne plutôt sur un système d'époques basé sur le temps, composé de 32 « créneaux » (slots) de douze secondes pendant lesquels les validateurs peuvent proposer des blocs. C'est pourquoi nous savions exactement quand nous atteindrions l'époque 74 240 et qu'Altair serait activée !

- [Temps de bloc](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Résumé {#london-summary}

La mise à jour London a introduit l'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), qui a réformé le marché des frais de transaction, ainsi que des modifications sur la façon dont les remboursements de gaz sont gérés et le calendrier de l'[Ère glaciaire (Ice Age)](/glossary/#ice-age).

#### Qu'était la mise à jour London / EIP-1559 ? {#eip-1559}

Avant la mise à jour London, Ethereum avait des blocs de taille fixe. En période de forte demande sur le réseau, ces blocs fonctionnaient à pleine capacité. Par conséquent, les utilisateurs devaient souvent attendre que la demande diminue pour être inclus dans un bloc, ce qui entraînait une mauvaise expérience utilisateur. La mise à jour London a introduit des blocs de taille variable sur Ethereum.

La façon dont les frais de transaction sur le réseau Ethereum étaient calculés a changé avec [la mise à jour London](/ethereum-forks/#london) d'août 2021. Avant la mise à jour London, les frais étaient calculés sans séparer les frais de `base` et de `priority`, comme suit :

Disons qu'Alice devait payer 1 ETH à Bob. Dans la transaction, la limite de gaz est de 21 000 unités, et le prix du gaz est de 200 gwei.

Les frais totaux auraient été de : `Gas units (limit) * Gas price per unit` soit `21,000 * 200 = 4,200,000 gwei` ou 0,0042 ETH

L'implémentation de l'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) dans la mise à jour London a rendu le mécanisme des frais de transaction plus complexe, mais a rendu les frais de gaz plus prévisibles, ce qui a permis d'obtenir un marché des frais de transaction plus efficace. Les utilisateurs peuvent soumettre des transactions avec un `maxFeePerGas` correspondant au montant qu'ils sont prêts à payer pour que la transaction soit exécutée, sachant qu'ils ne paieront pas plus que le prix du marché pour le gaz (`baseFeePerGas`), et se verront rembourser tout excédent, moins leurs frais de priorité (tip).

Cette vidéo explique l'EIP-1559 et les avantages qu'il apporte : [Explication de l'EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Êtes-vous un développeur d'application décentralisée (dapp) ? Assurez-vous de mettre à jour vos bibliothèques et vos outils.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Lire les explications des Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP de London" contentPreview="Améliorations officielles incluses dans cette mise à jour.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>améliore le marché des frais de transaction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>renvoie le <code>BASEFEE</code> d'un bloc</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>réduit les remboursements de gaz pour les opérations de l'EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>empêche le déploiement de contrats commençant par <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>repousse l'Ère glaciaire jusqu'en décembre 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Résumé {#berlin-summary}

La mise à jour Berlin a optimisé le coût en gaz pour certaines actions de l'EVM, et augmente la prise en charge de multiples types de transactions.

- [Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Lire les explications des Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP de Berlin" contentPreview="Améliorations officielles incluses dans cette mise à jour.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>réduit le coût en gaz de ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>facilite la prise en charge de multiples types de transactions</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>augmente le coût en gaz pour les codes d'opération (opcodes) d'accès à l'état</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>ajoute des listes d'accès optionnelles</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Genèse de la chaîne balise {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Résumé {#beacon-chain-genesis-summary}

La [chaîne balise](/roadmap/beacon-chain/) nécessitait 16 384 dépôts de 32 ETH stakés pour être lancée en toute sécurité. Cela s'est produit le 27 novembre, et la chaîne balise a commencé à produire des blocs le 1er décembre 2020.

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  La chaîne balise
</DocLink>

---

### Déploiement du contrat de dépôt de staking {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Résumé {#deposit-contract-summary}

Le contrat de dépôt de staking a introduit le [staking](/glossary/#staking) dans l'écosystème Ethereum. Bien qu'il s'agisse d'un contrat du [Réseau principal](/glossary/#mainnet), il a eu un impact direct sur le calendrier de lancement de la [chaîne balise](/roadmap/beacon-chain/), une importante [mise à jour d'Ethereum](/roadmap/).

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Résumé {#muir-glacier-summary}

Le fork Muir Glacier a retardé la [bombe de difficulté](/glossary/#difficulty-bomb). L'augmentation de la difficulté des blocs du mécanisme de consensus par [preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow/) menaçait de dégrader l'utilisabilité d'Ethereum en augmentant les temps d'attente pour l'envoi de transactions et l'utilisation des dapps.

- [Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Lire les explications des Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP de Muir Glacier" contentPreview="Améliorations officielles incluses dans ce fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>retarde la bombe de difficulté de 4 000 000 de blocs supplémentaires, soit environ 611 jours.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Résumé {#istanbul-summary}

Le fork Istanbul :

- A optimisé le coût en [gaz](/glossary/#gas) de certaines actions dans l'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- A amélioré la résilience face aux attaques par déni de service.
- A rendu les solutions de [mise à l'échelle de couche 2](/developers/docs/scaling/#layer-2-scaling) basées sur les SNARK et les STARK plus performantes.
- A permis à Ethereum et Zcash d'interopérer.
- A permis aux contrats d'introduire des fonctions plus créatives.

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="EIP d'Istanbul" contentPreview="Améliorations officielles incluses dans ce fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>permet à Ethereum de fonctionner avec des monnaies préservant la confidentialité comme Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>cryptographie moins chère pour améliorer les coûts en [gaz](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>protège Ethereum contre les attaques par rejeu en ajoutant le [code d'opération](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>optimisation des prix en gaz des codes d'opération en fonction de la consommation.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>réduit le coût des données d'appel pour permettre plus de données dans les blocs – bénéfique pour la [mise à l'échelle de couche 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>autres modifications du prix en gaz des codes d'opération.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Résumé {#constantinople-summary}

Le fork Constantinople :

- A réduit les récompenses de [minage](/developers/docs/consensus-mechanisms/pow/mining/) de bloc de 3 à 2 ETH.
- S'est assuré que la chaîne de blocs ne gèle pas avant que la [preuve d'enjeu (PoS) ne soit implémentée](#beacon-chain-genesis).
- A optimisé le coût en [gaz](/glossary/#gas) de certaines actions dans l'[EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- A ajouté la capacité d'interagir avec des adresses qui n'ont pas encore été créées.

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="EIP de Constantinople" contentPreview="Améliorations officielles incluses dans ce fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>optimise le coût de certaines actions onchain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>vous permet d'interagir avec des adresses qui n'ont pas encore été créées.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>introduit l'instruction <code>EXTCODEHASH</code> pour récupérer le hash du code d'un autre contrat.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>s'assure que la chaîne de blocs ne gèle pas avant la preuve d'enjeu (PoS) et réduit la récompense de bloc de 3 à 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Résumé {#byzantium-summary}

Le fork Byzantium :

- A réduit les récompenses de [minage](/developers/docs/consensus-mechanisms/pow/mining/) de bloc de 5 à 3 ETH.
- A retardé la [bombe de difficulté](/glossary/#difficulty-bomb) d'un an.
- A ajouté la possibilité d'effectuer des appels ne modifiant pas l'état vers d'autres contrats.
- A ajouté certaines méthodes de cryptographie pour permettre la [mise à l'échelle de couche 2](/developers/docs/scaling/#layer-2-scaling).

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="EIP de Byzantium" contentPreview="Améliorations officielles incluses dans ce fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>ajoute le code d'opération <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>champ d'état ajouté aux reçus de transaction pour indiquer le succès ou l'échec.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>ajoute la courbe elliptique et la multiplication scalaire pour permettre les [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>ajoute la courbe elliptique et la multiplication scalaire pour permettre les [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>active la vérification de signature RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>ajoute la prise en charge des valeurs de retour de longueur variable.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>ajoute le code d'opération <code>STATICCALL</code>, permettant des appels ne modifiant pas l'état vers d'autres contrats.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>modifie la formule d'ajustement de la difficulté.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>retarde la [bombe de difficulté](/glossary/#difficulty-bomb) d'un an et réduit la récompense de bloc de 5 à 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Résumé {#spurious-dragon-summary}

Le fork Spurious Dragon a été la deuxième réponse aux attaques par déni de service (DoS) sur le réseau (septembre/octobre 2016), comprenant :

- l'ajustement de la tarification des codes d'opération pour prévenir de futures attaques sur le réseau.
- le désengorgement de l'état de la chaîne de blocs.
- l'ajout d'une protection contre les attaques par rejeu.

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="EIP de Spurious Dragon" contentPreview="Améliorations officielles incluses dans ce fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>empêche les transactions d'une chaîne Ethereum d'être rediffusées sur une chaîne alternative, par exemple une transaction d'un réseau de test rejouée sur la chaîne Ethereum principale.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>ajuste les prix du code d'opération <code>EXP</code> – rend plus difficile le ralentissement du réseau via des opérations de contrat coûteuses en calcul.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>permet la suppression des comptes vides ajoutés via les attaques DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>modifie la taille maximale du code qu'un contrat sur la chaîne de blocs peut avoir – à 24576 octets.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Résumé {#tangerine-whistle-summary}

Le fork Tangerine Whistle a été la première réponse aux attaques par déni de service (DoS) sur le réseau (septembre/octobre 2016), comprenant :

- la résolution des problèmes urgents de santé du réseau concernant les codes d'opération sous-évalués.

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="EIP de Tangerine Whistle" contentPreview="Améliorations officielles incluses dans ce fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>augmente les coûts en gaz des codes d'opération pouvant être utilisés dans des attaques de spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>réduit la taille de l'état en supprimant un grand nombre de comptes vides qui ont été placés dans l'état à très bas coût en raison de failles dans les versions antérieures du protocole Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Fork DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Résumé {#dao-fork-summary}

Le fork DAO a été réalisé en réponse à [l'attaque de la DAO de 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/) au cours de laquelle un contrat [DAO](/glossary/#dao) non sécurisé a été vidé de plus de 3,6 millions d'ETH lors d'un piratage. Le fork a déplacé les fonds du contrat défectueux vers un [nouveau contrat](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) doté d'une seule fonction : le retrait. Toute personne ayant perdu des fonds pouvait retirer 1 ETH pour chaque 100 jetons DAO présents dans son portefeuille.

Cette ligne de conduite a été soumise au vote de la communauté Ethereum. Tout détenteur d'ETH pouvait voter via une transaction sur [une plateforme de vote](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La décision de procéder au fork a recueilli plus de 85 % des voix.

Certains mineurs ont refusé le fork car l'incident de la DAO n'était pas un défaut du protocole. Ils ont par la suite formé [Ethereum Classic](https://ethereumclassic.org/).

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Résumé {#homestead-summary}

Le fork Homestead était tourné vers l'avenir. Il comprenait plusieurs modifications du protocole et un changement de mise en réseau qui a donné à Ethereum la capacité d'effectuer d'autres mises à jour du réseau.

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="EIP de Homestead" contentPreview="Améliorations officielles incluses dans ce fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>apporte des modifications au processus de création de contrat.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>ajoute un nouveau code d'opération : <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>introduit des exigences de compatibilité ascendante pour devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Dégel de Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Résumé {#frontier-thawing-summary}

Le fork de dégel de Frontier a levé la limite de 5 000 [gaz](/glossary/#gas) par [bloc](/glossary/#block) et a fixé le prix du gaz par défaut à 51 [gwei](/glossary/#gwei). Cela a permis d'effectuer des transactions – les transactions nécessitent 21 000 gaz. La [bombe de difficulté](/glossary/#difficulty-bomb) a été introduite pour garantir un futur hard fork vers la [preuve d'enjeu (PoS)](/glossary/#pos).

- [Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Lire la mise à jour 1 du protocole Ethereum](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Résumé {#frontier-summary}

Frontier était une implémentation opérationnelle, mais minimaliste, du projet Ethereum. Elle a fait suite à la phase de test réussie d'Olympic. Elle était destinée aux utilisateurs techniques, en particulier aux développeurs. Les [blocs](/glossary/#block) avaient une limite de [gaz](/glossary/#gas) de 5 000. Cette période de « dégel » a permis aux mineurs de démarrer leurs opérations et aux premiers adoptants d'installer leurs clients sans avoir à se précipiter.

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Vente d'ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

L'ether a été officiellement mis en vente pendant 42 jours. Il était possible d'en acheter avec du BTC.

[Lire l'annonce de la Fondation Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Publication du Livre jaune {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Le Livre jaune, rédigé par le Dr Gavin Wood, est une définition technique du protocole Ethereum.

[Consulter le Livre jaune](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Publication du livre blanc {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Le document introductif, publié en 2013 par Vitalik Buterin, le fondateur d'Ethereum, avant le lancement du projet en 2015.

<DocLink href="/whitepaper/">
  Livre blanc
</DocLink>
