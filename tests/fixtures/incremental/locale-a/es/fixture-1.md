---
title: "Comprender las licencias de código abierto"
description: "Una guía práctica sobre licencias de software libre y desarrollo colaborativo"
image: /images/open-source/hero-licensing.png
alt: "Diagrama que muestra diferentes tipos de licencias"
template: tutorial
lang: es
published: 2025-06-15
tags: ["código abierto", "licencias", "cumplimiento"]
summaryPoints:
  - Las licencias de código abierto definen cómo se puede usar, modificar y compartir el código
  - Las licencias copyleft requieren que las obras derivadas sigan siendo de código abierto
  - Las licencias permisivas permiten el uso privativo con restricciones mínimas
---

# Comprender las licencias de código abierto {#understanding-open-source-licensing}

El software de código abierto se basa en el principio de que el código debe compartirse, estudiarse y mejorarse libremente. Esta guía cubre las principales familias de licencias, cómo elegir entre ellas y las mejores prácticas para el desarrollo colaborativo.

**Recuerde: la concesión de licencias es un asunto legal. Esta guía es educativa, no un asesoramiento legal. Consulte a un abogado calificado para su situación específica.**

<Divider />

## ¿Qué es el código abierto? {#what-is-open-source}

Una licencia de software determina cómo otros pueden usar, modificar y distribuir su código. Las licencias de código abierto otorgan estos derechos explícitamente, a diferencia de las licencias privativas que los restringen.

La [Open Source Initiative](https://opensource.org/osd) mantiene la Definición de Código Abierto oficial, que requiere que las licencias permitan la libre redistribución, el acceso al código fuente y las obras derivadas.

_Sin licencias claras_, cada proyecto necesitaría una revisión legal personalizada. El archivo `LICENSE` en un repositorio indica exactamente qué permisos se otorgan, de manera similar a cómo el archivo `README.md` explica el propósito del proyecto.

Puede verificar la licencia de un proyecto en <a href="https://choosealicense.com/">Choose a License</a> para comprender lo que permite.

![License comparison chart](/images/open-source/license-comparison.png)

### Las cuatro libertades {#the-four-freedoms}

La [Free Software Foundation](https://www.fsf.org/about/what-is-free-software) define cuatro libertades esenciales:

- **Libertad 0**: La libertad de ejecutar el programa para cualquier propósito
- **Libertad 1**: La libertad de estudiar cómo funciona el programa y adaptarlo
- **Libertad 2**: La libertad de redistribuir copias
- **Libertad 3**: La libertad de mejorar el programa y publicar las mejoras

Estas libertades forman la base de todas las licencias de software libre y de código abierto (FOSS).

<InfoBanner title="Important distinction" description="Free as in freedom, not free as in price">

La palabra "free" (libre) en el software libre se refiere a la libertad, no al costo. El software privativo puede ser gratuito y el software libre puede venderse comercialmente. Consulte la [filosofía de GNU](https://www.gnu.org/philosophy/free-sw.html) para obtener una explicación detallada.

</InfoBanner>

## Elegir una licencia {#choosing-a-license}

### Licencias copyleft {#copyleft-licenses}

Las licencias copyleft como `GPL-3.0` requieren que las obras derivadas usen la misma licencia. Esto asegura que el software y todas las modificaciones sigan siendo libres. La `AGPL-3.0` extiende este requisito al software al que se accede a través de una red.

```solidity
// SPDX-License-Identifier: GPL-3.0
// Este contrato demuestra un registro simple
pragma solidity ^0.8.0;

contract ProjectRegistry {
  mapping(address => string) public projects;

  function register(string memory name) public {
    require(bytes(name).length > 0, "Name required");
    projects[msg.sender] = name;
  }
}
```

La ventaja clave del copyleft es que las mejoras deben compartirse con la comunidad. Si alguien desarrolla sobre su biblioteca con licencia GPL, sus modificaciones también tendrán licencia GPL.

<ExpandableCard title="When should I use copyleft?" contentPreview="Copyleft is ideal when you want to ensure derivatives stay open" eventCategory="/open-source/copyleft">

Use copyleft cuando:

1. Quiera asegurarse de que todas las obras derivadas sigan siendo de código abierto
2. Esté construyendo una biblioteca o framework que otros ampliarán
3. Quiera evitar forks privativos de su trabajo

La desventaja es que algunas empresas evitan las dependencias con licencia copyleft debido a la naturaleza "viral" de la licencia.

Consulte las <a href="https://www.gnu.org/licenses/gpl-faq.html">Preguntas frecuentes sobre GPL</a> para conocer las preguntas comunes sobre el cumplimiento del copyleft.

</ExpandableCard>

### Licencias permisivas {#permissive-licenses}

Las licencias permisivas como `MIT` y `Apache-2.0` permiten derivados privativos. La `BSD-2-Clause` es otra opción permisiva popular con restricciones mínimas.

```python
# Ejemplo: leer el archivo de licencia de un proyecto
def read_license(path: str) -> str:
  """Leer y devolver el contenido de un archivo LICENSE."""
  with open(path, "r") as f:
    return f.read()

# Comprobar si la licencia es permisiva
def is_permissive(license_text: str) -> bool:
  permissive_keywords = ["MIT", "Apache", "BSD"]
  return any(kw in license_text for kw in permissive_keywords)
```

La principal ventaja de las licencias permisivas es la máxima adopción. Es más probable que las empresas utilicen y contribuyan a proyectos con licencias permisivas porque no hay restricciones sobre cómo se puede usar el código.

Puede desplegar proyectos usando [GitHub](https://github.com/) en cualquier plataforma de alojamiento, y verificar el cumplimiento con [SPDX](https://spdx.org/).

Use [Remix](https://remix.ethereum.org/) en [Sepolia](https://sepolia.dev/) con un [explorador de bloques](https://eth.blockscout.com/) para probar [contratos inteligentes](/glossary/#smart-contract) antes de desplegar en producción.

### Tabla comparativa {#comparison-table}

| Licencia | Tipo | Obras derivadas | Concesión de patentes |
|---------|------|-----------------|-------------|
| GPL-3.0 | Copyleft | Debe ser GPL | Sí |
| AGPL-3.0 | Copyleft de red | Debe ser AGPL | Sí |
| LGPL-3.0 | Copyleft débil | La biblioteca puede ser privativa | Sí |
| MIT | Permisiva | Cualquier licencia | No |
| Apache-2.0 | Permisiva | Cualquier licencia | Sí |
| BSD-2-Clause | Permisiva | Cualquier licencia | No |
| MPL-2.0 | Copyleft a nivel de archivo | Los archivos modificados deben ser MPL | Sí |

## Colaboración comunitaria {#community-collaboration}

### Contribuir a proyectos {#contributing-to-projects}

Contribuir al código abierto comienza por comprender el flujo de trabajo del proyecto. La mayoría de los proyectos utilizan issue trackers para coordinar el trabajo y pull requests para proponer cambios.

<ButtonLink href="/contributing/guide/">Comience a contribuir hoy</ButtonLink>

<DocLink href="/contributing/">
  Cómo contribuir a este proyecto
</DocLink>

<DocLink href="/community/">
  Únase a nuestra comunidad
</DocLink>

Antes de enviar una contribución, siempre revise el archivo `CONTRIBUTING.md` del proyecto para conocer las pautas. El estilo de código, los requisitos de prueba y los procesos de revisión varían entre proyectos.

```md
## Plantilla de Pull Request

**Descripción:** Breve resumen de los cambios
**Issue relacionado:** Enlace al issue que esto aborda
**Pruebas:** ¿Cómo se probó esto?
```

### <Emoji text=":bulb:" size={1} className="me-2" /> Mejores prácticas para la revisión de código {#code-review}

La revisión de código es esencial para mantener la calidad en proyectos colaborativos. Los revisores deben verificar la exactitud, la consistencia del estilo y los posibles problemas de seguridad.

<Alert variant="update">
<AlertEmoji text=":mag:"/>
<AlertContent>
<AlertDescription>
  Las buenas revisiones de código se centran en la lógica y el diseño, no solo en el formato. Utilice herramientas automatizadas como linters para la aplicación del estilo, y reserve la revisión humana para decisiones arquitectónicas y casos extremos.
</AlertDescription>
</AlertContent>
</Alert>

<QuizWidget quizKey="open-source-licensing" />

## Cumplimiento y auditoría {#compliance-and-auditing}

Las organizaciones que utilizan software de código abierto deben rastrear sus dependencias y garantizar el cumplimiento de las licencias<sup>1</sup>. Herramientas como [FOSSA](https://fossa.com/) y [Snyk](https://snyk.io/) pueden automatizar este proceso.

<CardGrid>
  <Card title="License Audit" description="Scan your project for license conflicts" href="/tools/audit/" />
  <Card title="SBOM Generator" description="Create a software bill of materials" href="/tools/sbom/" />
</CardGrid>

### Escaneo de licencias {#license-scanning}

El escaneo automatizado de licencias debe ser parte de cada CI/CD pipeline. Detecta licencias incompatibles antes de que entren en su árbol de dependencias.

```bash
# Ejecutar un escaneo de licencias en tu proyecto
npx license-checker --production --json > licenses.json

# Comprobar si hay licencias copyleft en las dependencias de producción
npx license-checker --production --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;ISC"
```

Considere usar <a href="https://docs.github.com/en/code-security/dependabot" target="_blank">Dependabot</a> para mantener las dependencias actualizadas y monitorear los cambios de licencia.

### Generación de SBOM {#sbom-generation}

Una lista de materiales de software (SBOM) enumera todos los componentes de su software. La generación de un SBOM es cada vez más necesaria para el cumplimiento normativo, especialmente en industrias sensibles a la seguridad.

<YouTube id="spec-fixture-001" />

### Términos clave {#key-terms}

<GlossaryDefinition term="open-source" />

<GlossaryDefinition term="copyleft" />

Comprender estos términos es <em>esencial</em> para tomar <strong>decisiones informadas</strong> sobre las licencias.

<Alert variant="info">
<Emoji text="📋" />
<div>

Revise el [glosario de términos](/glossary/) completo para obtener definiciones adicionales. Este recurso es mantenido por la comunidad y se actualiza regularmente.

</div>
</Alert>

## Lecturas adicionales {#further-reading}

_Esta guía está adaptada de materiales de la [Open Source Initiative](https://opensource.org/) y la [Free Software Foundation](https://www.fsf.org/)._

- [Guía Choose a License](https://choosealicense.com/) - _Herramienta sencilla para ayudar a elegir la licencia adecuada para su proyecto_
- [Lista de licencias SPDX](https://spdx.org/licenses/) - _Identificadores estandarizados para más de 500 licencias de código abierto_
- [Guía de código abierto](https://opensource.guide/) - _Recursos mantenidos por la comunidad para ejecutar y contribuir a proyectos_
- Herramientas de cumplimiento en [FOSSA](https://fossa.com/) - _Escaneo automatizado de licencias y gestión de dependencias_