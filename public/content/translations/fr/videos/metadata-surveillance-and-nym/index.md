---
title: "Spécial Journée de la confidentialité des données - Surveillance des métadonnées et Nym"
description: "Une conversation à l'occasion de la Journée de la confidentialité des données sur la surveillance des métadonnées : ce que les métadonnées révèlent sur vous même lorsque le contenu des messages est chiffré, et comment les outils de confidentialité au niveau du réseau comme Nym fonctionnent pour les protéger."
lang: fr
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Confidentialité"
---

Un reportage de **Nym** avec Claudia Diaz, scientifique en chef chez Nym, explorant la mécanique des métadonnées, leur rôle critique dans la surveillance moderne, les détails personnels qu'elles exposent, et les mesures que nous pouvons prendre pour reprendre le contrôle de notre confidentialité.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=QBX5AK3DXqw) publiée par Nym. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:04) {#intro-004}

Que sont les métadonnées de communication ? Cela désigne tout ce qui concerne une communication et qui n'est pas le contenu de ce qui est réellement dit. Cela inclut, par exemple, l'origine de la communication, la destination, l'heure à laquelle l'information est envoyée, la quantité d'informations envoyées, et tout modèle détectable, y compris la chronologie et la taille des paquets échangés.

#### Métadonnées de communication (0:27) {#communications-metadata-027}

Les métadonnées de communication sont exposées par défaut dans tous les protocoles Internet : TCP/IP, HTTP, UDP, FTP. Même les protocoles sécurisés tels que TLS ou le DNS sécurisé, qui protègent le contenu avec un chiffrement de bout en bout, affichent toujours les métadonnées de communication : l'origine, la destination, la chronologie, la longueur, etc.

Ces informations sont donc exposées, mais à qui ? Qui peut les obtenir ?

#### Qui a accès aux métadonnées (1:10) {#who-gets-access-to-metadata-110}

Il existe un certain nombre d'entités qui sont des intermédiaires dans les communications Internet et qui sont capables d'accéder à ces métadonnées de communication. Cela inclut les grands acteurs de l'infrastructure Internet, tels que les fournisseurs d'accès à Internet, les points d'échange, les systèmes autonomes, les routeurs BGP et les participants à la dorsale Internet en général ; ils peuvent avoir accès à un grand nombre de métadonnées de communication. 

Mais même les petits acteurs, comme la personne qui gère le routeur Wi-Fi ou un réseau local, ou quelqu'un qui est capable d'écouter localement, ont également accès aux métadonnées de communication. Et bien sûr, il est de notoriété publique que des adversaires au niveau des États-nations, comme la NSA, collectent des métadonnées à grande échelle et les analysent afin d'en extraire toutes sortes de renseignements.

#### Pourquoi les métadonnées sont-elles importantes (2:00) {#why-is-metadata-important-200}

Il y a d'autres raisons pour lesquelles les métadonnées constituent un type de données très intéressant à collecter et à exploiter. Elles sont lisibles par machine, car elles parlent le langage des ordinateurs ; c'est essentiellement un langage permettant aux ordinateurs d'acheminer correctement les communications de leur source à leur destination. Elles sont donc lisibles par machine, ce qui signifie que les machines peuvent facilement leur donner un sens à grande échelle, contrairement au langage humain naturel, qui est beaucoup plus difficile à interpréter, car les gens utilisent peut-être les mots d'une certaine manière, ou ils ont des nuances, et c'est beaucoup plus difficile à interpréter. Les métadonnées, en revanche, sont vraiment simples.

Elles ont également un volume beaucoup plus faible que le contenu. Si vous pensez à une vidéo YouTube, par exemple, le contenu lui-même peut faire plusieurs gigaoctets, mais les métadonnées incluraient simplement l'URL de la vidéo, le nombre d'octets qu'elle contient et l'heure à laquelle elle a été regardée. Cela peut donc représenter beaucoup moins que le contenu réel, et c'est également gérable en termes de taille.

Les métadonnées bénéficient également d'une protection bien moindre que le contenu. Il n'est pas légal d'intercepter simplement les communications des gens et d'en examiner le contenu, cela est protégé par la loi. Mais les métadonnées, parce qu'elles ne sont pas considérées comme aussi sensibles, ont une protection beaucoup plus faible. De nombreuses entités peuvent donc légalement collecter ces métadonnées et les analyser afin d'obtenir des informations sur ce que font les gens sur Internet.

Est-ce donc si grave ? Nous pourrions dire : « Eh bien, ce ne sont que des métadonnées. Tant que vous ne savez pas ce que je dis, devrais-je vraiment m'inquiéter du fait que vous sachiez à qui je parle et à quelle heure ? » 

Il y a quelques citations qui montrent à quel point les métadonnées sont en réalité considérées comme extrêmement précieuses. L'avocat général de la NSA, Stewart Baker, a déclaré que les métadonnées vous disent absolument tout sur la vie de quelqu'un : si vous avez suffisamment de métadonnées, vous n'avez pas vraiment besoin du contenu. C'est à ce point puissant pour comprendre ce qui intéresse quelqu'un, quel est son réseau social, quels sont ses passe-temps, quelles sont ses intentions, quels sont ses centres d'intérêt. Vous n'avez pas vraiment besoin d'entendre ce qu'ils disent ; il suffit que vous soyez capable d'observer toutes les métadonnées.

Et Whitfield Diffie et Susan Landau, dans leur livre *Privacy on the Line*, affirment que l'analyse du trafic, et non la cryptanalyse, est l'épine dorsale du renseignement sur les communications. C'est parce que vous pouvez la collecter à grande échelle, vous pouvez l'analyser à grande échelle, et cela vous donnera tous les grands modèles, la vue d'ensemble, qui vous permet ensuite de zoomer afin de pénétrer les cibles spécifiques que vous trouvez les plus intéressantes. Mais vous les trouvez d'abord grâce à l'analyse du trafic sur les métadonnées.

L'analyse du trafic des métadonnées peut même être utilisée pour récupérer du contenu chiffré sans casser la cryptographie. Supposons que nous ayons une cryptographie parfaite : aucune quantité de cryptanalyse n'est capable de la casser, et les clés secrètes sont parfaitement secrètes. Nous devrions avoir l'assurance que ce contenu est protégé et qu'un adversaire n'est pas en mesure d'en prendre connaissance. 

Cependant, il existe de nombreuses situations où l'analyse du trafic des métadonnées de communication peut agir comme un canal auxiliaire qui révèle ce contenu chiffré.

#### Surveillance des métadonnées (5:15) {#metadata-surveillance-515}

Un exemple est lorsque vous naviguez sur un site Web avec HTTPS. En principe, comme la communication avec ce site Web est chiffrée, quelqu'un qui observe votre communication ne peut pas dire à quelle page spécifique vous accédez sur le site Web. Par exemple, si vous allez sur WebMD pour vérifier des maladies, un observateur ou une personne sur écoute pourra voir : « D'accord, vous consultez des informations médicales sur WebMD », mais il ne pourra pas dire quelle maladie spécifique vous recherchez.

Cependant, la façon de découvrir ce que fait quelqu'un dans ce scénario serait pour un adversaire de télécharger d'abord toutes les pages du site et d'enregistrer, pour chaque page, le modèle de paquets qui sont vus sur la ligne de communication. En gros, quel nombre de paquets va dans quelle direction, quelles sont les tailles de ces paquets, et quelle est la période inter-paquets entre un paquet et le suivant. 

En faisant cela, vous pouvez créer une empreinte numérique de chacune de ces pages, de sorte que lorsque la cible télécharge une page à partir du site chiffré, vous êtes en mesure de faire correspondre le nombre de paquets dans chaque direction et leurs tailles afin de deviner quelle page Web spécifique elle regarde, même si la page Web elle-même est chiffrée et que vous ne devriez pas être en mesure d'apprendre ce contenu.

C'est évidemment préoccupant. Même si nous pouvons avoir un chiffrement de bout en bout, nous sommes très loin d'en avoir terminé en termes de protection de la confidentialité de nos communications.

#### Une liste de souhaits pour des communications privées (6:40) {#a-wish-list-for-private-communications-640}

Donc, si nous voulions avoir une liste de souhaits de ce qu'un réseau de communication parfaitement sécurisé offrirait, quelles sont les propriétés que nous voulons ? 

Évidemment, nous voulons protéger ce qu'un utilisateur dit sur le canal chiffré, et le chiffrement de bout en bout est déjà une étape très importante pour y parvenir. Mais pas seulement, nous voulons également dissimuler avec qui l'utilisateur communique, donc qui est le partenaire de communication, de qui vous recevez des paquets ou à qui vous envoyez des paquets. Également l'emplacement, donc d'où vous communiquez ; quand et pendant combien de temps vous communiquez ; combien d'octets de données vous échangez ; et tout autre modèle dans la communication. Et vous pourriez même aller jusqu'à dire que nous voulons dissimuler si quelqu'un communique ou non.

Ce sont toutes des propriétés que les systèmes de communication anonymes visent à fournir, et dans l'espace des solutions, les mixnets sont l'une des meilleures solutions dont nous disposons pour fournir ce type de propriétés.