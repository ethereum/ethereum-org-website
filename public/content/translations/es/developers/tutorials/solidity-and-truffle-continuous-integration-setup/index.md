---
title: "Configuración de integración continua de Solidity y Truffle"
description: Cómo configurar Travis o Circle CI para pruebas de Truffle junto con complementos útiles
author: Markus Waas
lang: es
tags:
  - "solidity"
  - "contratos inteligentes"
  - "pruebas"
  - "truffle"
  - "ganache"
skill: intermediate
published: 2020-06-05
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/continuous-integration
---

La integración continua (CI) con Truffle es genial para el desarrollo una vez que se implementa un conjunto básico de pruebas. Le permite realizar pruebas muy largas, asegurarse de que todas las pruebas pasen antes de combinar una [solicitud de pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) y llevar un seguimiento de varias estadísticas utilizando herramientas adicionales.

Utilizaremos el [Truffle Metacoin Box](https://www.trufflesuite.com/boxes/metacoin) para configurar nuestra integración continua. Puede elegir Travis CI o Circle CI.

## Configurar Travis CI {#setting-up-travis-ci}

Añadir [Travis CI](https://travis-ci.org/) es sencillo. Solo necesitará añadir un archivo de configuración `.travis.yml` a la carpeta raíz del proyecto:

```yml
language: node_js
node_js:
  - 10

cache: npm

before_script:
  - echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

script:
  - npm test
```

Lo haremos simple por ahora y solo ejecutaremos el script de prueba que ejecuta las pruebas unitarias o individuales de Truffle. Pero tenemos un problema, no habrá una cadena de bloques disponible en la máquina de Travis CI. Una solución simple para esto es `npm install ganache-cli` y simplemente ejecutarlo antes de la prueba. Puede hacer esto agregando un bash script con la línea npx `ganache-cli > 7dev/null` y antes de la llamada `npx truffle test`. El [bash script de ejemplo completo](https://github.com/gorgos/Truffle-CI-Example/blob/master/scripts/run_tests.sh).

## Configurar Circle CI {#setting-up-circle-ci}

[CircleCI](https://circleci.com/) requiere un archivo de configuración más grande. El comando adicional [`npm ci`](https://docs.npmjs.com/cli/ci.html) se hace automáticante en Travis. Instala las dependencias más rápido y de forma más segura que `npm install`. Otra vez usamos el mismo script de la versión de Travis para ejecutar ganache-cli antes de las pruebas.

```yml
version: 2

aliases:
  - &defaults
    docker:
      - image: circleci/node:10

  - &cache_key_node_modules
    key: v1-node_modules-{{ checksum "package-lock.json" }}

jobs:
  dependencies:
    <<: *defaults
    steps:
      - checkout
      - restore_cache:
          <<: *cache_key_node_modules
      - run:
          name: Install npm dependencies
          command: |
            if [ ! -d node_modules ]; then
              npm ci
            fi
      - persist_to_workspace:
          root: .
          paths:
            - node_modules
            - build
      - save_cache:
          paths:
            - node_modules
          <<: *cache_key_node_modules

  test:
    <<: *defaults
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run:
          name: Unit tests
          command: npm test

workflows:
  version: 2
  everything:
    jobs:
      - dependencies
      - test:
          requires:
            - dependencies
```

## Añadir el complemento eth-gas-reporter {#adding-the-eth-gas-reporter-plugin}

El complemento eth-gas-reporter es muy útil para llevar un seguimiento de los costos de gas de las funciones de su contrato inteligente. Tenerlo en su CI será útil además para mostrar diferencias cuando se agreguen solicitudes de pull.

### Paso 1: Instalar el complemento eth-gas-reporter y comprobaciones de código {#step-1-install-the-eth-gas-reporter-plugin-and-codechecks}

```bash
npm install --save-dev eth-gas-reporter
npm install --save-dev @codechecks/client
```

### Paso 2: Agrega el complemento a la configuración de moca dentro de su truffle-config.js {#step-2-add-the-plugin-to-the-mocha-settings-inside-your-truffle-configjs}

[Ver opciones](https://github.com/cgewecke/eth-gas-reporter#options)

```js
module.exports = {
  networks: { ... },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      excludeContracts: ['Migrations']
    }
  }
};
```

### Paso 3: Agregar un codechecks.yml al directorio raíz de su proyecto {#step-3-add-a-codechecksyml-to-your-projects-root-directory}

```yml
checks:
  - name: eth-gas-reporter/codechecks
```

### Paso 4: Ejecutar comprobaciones de código después del comando de prueba {#step-4-run-codechecks-after-the-test-command}

```bash
- npm test
- npx codechecks
```

### Paso 5: Crear una cuenta de Codechecks {#step-5-create-a-codechecks-account}

- Cree una cuenta con [Codechecks](http://codechecks.io/).
- Agregue el repositorio de GitHub a ella.
- Copie el secreto y agregue el `CC_SECRET=COPIED SECRET` a su CI (vea aquí para [Travis](https://docs.travis-ci.com/user/environment-variables/), aquí para [CircleCi](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project)).
- Ahora cree una solicitud de pull.

Eso es todo. Ahora encontrará un buen reporte acerca de los cambios en los costos del gas de sus solicitud de pull.

![Reportes de gas de ejemplo](./gas-reports.png)

## Agregar el complemento solidity-coverage {#adding-the-solidity-coverage-plugin}

Con el complemento solidity-coverage puede chequear cuánto de sus rutas de código están cubiertas por sus pruebas. Agregar esto a su CI es muy conveniente una vez hecha la configuración.

### Paso 1: Crear un proyecto de metacoin e instalar herramientas de cobertura {#step-1-create-a-metacoin-project-and-install-coverage-tools}

```bash
npm install --save-dev truffle coveralls solidity-coverage
```

### Paso 2: Agregar solidity-coverage a la matriz de complementos en truffle-config.js {#step-2-add-solidity-coverage-to-the-plugins-array-in-truffle-configjs}

```js
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

### Paso 3: Agregar los comandos de cobertura al .travis.yml o Circle CI config.yml {#step-3-add-the-coverage-commands-to-the-travisyml-or-circle-ci-configyml}

```bash
- npx truffle run coverage
- cat coverage/lcov.info | npx coveralls
```

La cobertura de Solidity inicia su propio ganache-cli, así que no tenemos que preocuparnos de esto. Sin embargo, no remplace el comando de prueba normal, la cobertura de ganache-cli funciona diferente y es por lo tanto no reemplazable para ejecutar pruebas unitarias regulares.

### Step 4: Agregar repositorio a Coveralls {#step-4-add-repository-to-coveralls}

- Cree una cuenta con [Coveralls](https://coveralls.io/).
- Agregue el repositorio de GitHub a ella.
- Ahora cree una solicitud de pull.

![Ejemplo de coverall](./coverall.png)

## Otras ideas {#further-ideas}

- [MythX](https://mythx.io/): Con MythX puede analizar automáticamente la seguridad de su contrato inteligente. Así que tiene mucho sentido [agregar esto a su CI](https://blog.mythx.io/howto/mythx-and-continuous-integration-part-1-circleci/).
- [Linting](https://wikipedia.org/wiki/Lint_%28software%29): Un buen código puede ser aplicado hasta cierto grado con herramientas de linting. [Eslint](https://eslint.org/) funciona bien para JavaScript, es [fácil de configurar](https://eslint.org/docs/user-guide/getting-started), mientras que [Solhint](https://protofire.github.io/solhint/) se puede usar para Solidity.
- Pruebas largas: Algunas veces es posible que desee agregar pruebas extremas, p. ej., probar contratos con cientos de usuarios. Esto toma mucho tiempo. En lugar de ejecutarlos en cada ejecución de prueba, agréguelos a la CI.

Ahí lo tiene. La integración continua es una estrategía muy útil para sus desarrollos. Puede ver un ejemplo completo en [Truffle-CI-Example](https://github.com/gorgos/Truffle-CI-Example). Solo asegúrese de eliminar Circle-CI o Travis, ¡con uno es suficiente!
