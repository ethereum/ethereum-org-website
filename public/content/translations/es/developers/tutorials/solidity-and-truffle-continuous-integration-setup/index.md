---
title: "Configuración de Solidity y Truffle de integración continua"
description: Cómo configurar Travis o Circle CI para pruebas de Truffle junto con conplementos útiles
author: Markus Waas
lang: es
tags:
  - "solidity"
  - "contratos Inteligentes"
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

Lo estamos manteniendo simple por ahora y sólo estamos ejecutando el script de prueba que ejecuta las pruebas individuales de Truffle. Pero tenemos un problema, no habrá una blockchain disponible en la máquina Travis CI. Una solución simple para esto es `npm install ganache-cli` y simplemente ejecutarlo antes de la prueba. Puedes hacer esto al agregar un guión basj con la línea npx `ganache-cli > 7dev/null` y antes de `llamada de prueba truffle npx`. El [ejemplo completo de bash script](https://github.com/gorgos/Truffle-CI-Example/blob/master/scripts/run_tests.sh).

## Configurando Circle CI {#setting-up-circle-ci}

[CircleCI](https://circleci.com/) requiere un archivo config más grande. El comando adicional [`npm ci`](https://docs.npmjs.com/cli/ci.html) es automáticante hecho en Travis. Instala las dependencias más rápido y más seguras que `npm install` lo hace. Otra vez usamos el mismo guión de la versión Travis para ejecutar ganache-cli antes de las pruebas.

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

## Añadiendo el plugin de eth-gas-reporter {#adding-the-eth-gas-reporter-plugin}

El puglin de eth-gas-reporter es muy útil para llevar el rastro de los costos de las funciones de gas de tu contrato inteligente. Tenerlo en tu CI seguirá siendo útil para mostrar diferencias cuando se agreguen la solicitud de pull.

### Paso 1: Instalar el plugin de eth-gas-reporter y comprobantes de código {#step-1-install-the-eth-gas-reporter-plugin-and-codechecks}

```bash
npm install --save-dev eth-gas-reporter
npm install --save-dev @codechecks/client
```

### Paso 2: Agrega el plugin a la configuración de moca adentro de tu truffle-config.js {#step-2-add-the-plugin-to-the-mocha-settings-inside-your-truffle-configjs}

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

### Paso 3: Agrega comprobantes de código.yml para el directorio de raíz de tu proyecto {#step-3-add-a-codechecksyml-to-your-projects-root-directory}

```yml
checks:
  - name: eth-gas-reporter/codechecks
```

### Paso 4: Ejecuta el comprobante de código después del comando de prueba {#step-4-run-codechecks-after-the-test-command}

```bash
- npm test
- npx codechecks
```

### Paso 5: Crear una cuenta de comprobación de código {#step-5-create-a-codechecks-account}

- Crea una cuenta con [Codechecks](http://codechecks.io/).
- Agrega el repositorio de GitHub.
- Copia el secreto y agrega el `CC_SECRET=COPIED SECRET` a tu CI (vea aquí para [Travis](https://docs.travis-ci.com/user/environment-variables/), aquí para [CircleCi](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project)).
- Ahora adelante y crea una solicitud de pull.

Eso es todo. Ahora tú encontrarás un buen reporte acerca de los cambios en los costos del gas de tú solicitud de pull.

![Ejemplo de los reportes de gas](./gas-reports.png)

## Agregando el plugin solidity-coverage {#adding-the-solidity-coverage-plugin}

Con el plugin solidity-coverage puedes chequear cuanto de tu rutas de código están cubiertas por tús pruebas. Agregar esto a tu CI lo hace muy conveniente para usar una vez que se coloca.

### Paso 1: Crea un proyecto de metacoin e instala herramientas de cobertura {#step-1-create-a-metacoin-project-and-install-coverage-tools}

```bash
npm install --save-dev truffle coveralls solidity-coverage
```

### Paso 2: Agregar solidity-coverage a la matriz de plugins en truffle-config.js {#step-2-add-solidity-coverage-to-the-plugins-array-in-truffle-configjs}

```js
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```

### Paso 3: Agrega los comandos de cobertura al .travis.yml o Circle CI config.yml {#step-3-add-the-coverage-commands-to-the-travisyml-or-circle-ci-configyml}

```bash
- npx truffle run coverage
- cat coverage/lcov.info | npx coveralls
```

Cobertura de solidity comienza su propio ganache-cli, así que no tenemos que preocuparnos de esto. Sin embargo, no remplaces el comando de prueba normal, la cobertura de ganache-cli funciona diferente y es por lo tanto no reemplazable para ejecutar pruebas unitarias regulares.

### Step 4: Agrega el repositorio a los coveralls {#step-4-add-repository-to-coveralls}

- Crea una cuenta con [Coveralls](https://coveralls.io/).
- Agrega el repositorio de GitHub.
- Ahora adelante y crea una solicitud de pull.

![Ejemplo de coverall](./coverall.png)

## Otras ideas {#further-ideas}

- [MythX](https://mythx.io/): Con MythX puedes automáticamente analizar la seguridad de tu contrato inteligente. Entonces tiene mucho sentido [agregar esto a tu CI](https://blog.mythx.io/howto/mythx-and-continuous-integration-part-1-circleci/).
- [Linting](https://wikipedia.org/wiki/Lint_%28software%29): Un buen código puede ser aplicado hasta cierto grado con herramientas de linting. [Eslint](https://eslint.org/) trabaja genial para JavaScript, es [fácil de configurar](https://eslint.org/docs/user-guide/getting-started), mientras que [Solhint](https://protofire.github.io/solhint/) puede ser usadao por solidity.
- Pruebas largas: Algunas veces es posible que desees agregar pruebas extremas, ej., pruebas a contratos con cientos de usuarios. Esto toma mucho tiempo. En lugar de ejecutar esos en cada ejecución de prueba, agregalos al CI.

Ahí lo tienes. Integración continua es una estrategía muy útil para su desarrollo. Puedes chequear un ejemplo completo en [Truffle-CI-Example](https://github.com/gorgos/Truffle-CI-Example). Solo asegurate de remover Circle-CI o Travis, ¡uno es suficiente!
