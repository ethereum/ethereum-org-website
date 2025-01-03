---
title: WaffleでERC-20トークンをテストする
description: Waffleを使って、Solidityで作成したスマートコントラクトをテストし、スマートコントラクトのマッチャーを使用する方法について学ぶ
author: Vladislav Starostenko
tags:
  - "Waffle"
  - "スマートコントラクト"
  - "Solidity"
  - "テスト"
  - "ERC-20"
skill: intermediate
lang: ja
published: 2020-10-16
---

このチュートリアルでは、以下について学びます：

- Waffle で、スマートコントラクトのテストを作成する方法
- 人気が高いマッチャーを用いて、Waffle でスマートコントラクトをテストする方法

前提知識：

- ターミナルを使用できる。
- 新規の`JavaScript`プロジェクトを作成できる。
- `Solidity`でコードを書いたことがある。
- `JavaScript`でテストを作成したことがある。
- JavaScripts のパッケージインストーラである`yarn`または`npm`を使用したことがある。

上記に該当しない場合、あるいは実際にコードを書いてみるつもりがない方でも十分理解できる内容です。

## Waffle とは何か {#a-few-words-about-waffle}

[Waffle](https://getwaffle.io)は、スマートコントラクトを作成し、テストするための最も先進的なライブラリです。

[JavaScript API](/developers/docs/apis/javascript/)である ethers-js と共に使用します。

詳細については、[Waffle ドキュメンテーション](https://ethereum-waffle.readthedocs.io/en/latest/#waffle-documentation)をご覧ください！

## クイックチュートリアル {#the-quick-tutorial}

まず、新規の`JavaScript`または`TypeScript`プロジェクトを作成します（ここでは`TS`を使用しますが、`JS`でも構いません）：

構成は、以下のようになります：

<details>
<summary>package.json</summary>

    {
      "name": "tutorial",
      "version": "1.0.0",
      "main": "index.js",
      "license": "MIT",
      "scripts": {
        "test": "export NODE_ENV=test && mocha",
        "lint": "eslint '{src,test}/**/*.ts'",
        "lint:fix": "eslint --fix '{src,test}/**/*.ts'",
        "build": "waffle"
      },
      "devDependencies": {
        "@types/mocha": "^5.2.7",
        "@typescript-eslint/eslint-plugin": "^2.30.0",
        "@typescript-eslint/parser": "^2.30.0",
        "eslint": "^6.8.0",
        "eslint-plugin-import": "^2.20.2",
        "ethers": "^5.0.17",
        "mocha": "^7.1.2",
        "ts-node": "^8.9.1",
        "typescript": "^3.8.3"
      }
    }

</details>

<details>
<summary>tsconfig.json</summary>

    {
      "compilerOptions": {
        "declaration": true,
        "esModuleInterop": true,
        "lib": [
          "ES2018"
        ],
        "module": "CommonJS",
        "moduleResolution": "node",
        "outDir": "dist",
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "strict": true,
        "target": "ES2018"
      }
    }

</details>

<details>
<summary>.gitignore</summary>

    node_modules
    build

</details>

<details>
<summary>.eslintrc.js</summary>

    module.exports = {
      "env": {
      "es6": true
    },
      "extends": [
      "plugin:@typescript-eslint/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript"
    ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
      "project": "./tsconfig.json",
        "sourceType": "module"
    },
      "rules": {
      "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          "accessibility": "no-public",
          "overrides": {
            "parameterProperties": "off"
          }
        }
      ],
        "@typescript-eslint/indent": [
        "error",
        2,
        {
          "ArrayExpression": 1,
          "CallExpression": {
            "arguments": 1
          },
          "FunctionDeclaration": {
            "body": 1,
            "parameters": 1
          },
          "FunctionExpression": {
            "body": 1,
            "parameters": 1
          },
          "ImportDeclaration": 1,
          "MemberExpression": 1,
          "ObjectExpression": 1,
          "SwitchCase": 1,
          "VariableDeclarator": 1,
          "flatTernaryExpressions": false,
          "ignoreComments": false,
          "outerIIFEBody": 1
        }
      ],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/member-delimiter-style": [
        "error",
        {
          "multiline": {
            "delimiter": "semi",
            "requireLast": true
          },
          "singleline": {
            "delimiter": "semi",
            "requireLast": false
          }
        }
      ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "none",
          "ignoreRestSiblings": true,
          "vars": "all"
        }
      ],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/no-var-requires": "warn",
        "accessor-pairs": "error",
        "array-bracket-spacing": [
        "error",
        "never"
      ],
        "arrow-spacing": [
        "error",
        {
          "after": true,
          "before": true
        }
      ],
        "block-spacing": [
        "error",
        "always"
      ],
        "brace-style": [
        "error",
        "1tbs",
        {
          "allowSingleLine": true
        }
      ],
        "camelcase": "off",
        "comma-dangle": [
        "error",
        {
          "arrays": "never",
          "exports": "never",
          "functions": "never",
          "imports": "never",
          "objects": "never"
        }
      ],
        "comma-spacing": [
        "error",
        {
          "after": true,
          "before": false
        }
      ],
        "comma-style": [
        "error",
        "last"
      ],
        "computed-property-spacing": [
        "error",
        "never"
      ],
        "constructor-super": "error",
        "curly": [
        "error",
        "multi-line"
      ],
        "dot-location": [
        "error",
        "property"
      ],
        "eol-last": "error",
        "eqeqeq": [
        "error",
        "always",
        {
          "null": "ignore"
        }
      ],
        "func-call-spacing": [
        "error",
        "never"
      ],
        "generator-star-spacing": [
        "error",
        {
          "after": true,
          "before": true
        }
      ],
        "handle-callback-err": [
        "error",
        "^(err|error)$"
      ],
        "import/default": "off",
        "import/named": "off",
        "import/no-extraneous-dependencies": [
        "error",
        {
          "devDependencies": false
        }
      ],
        "import/no-unresolved": "off",
        "indent": "off",
        "key-spacing": [
        "error",
        {
          "afterColon": true,
          "beforeColon": false
        }
      ],
        "keyword-spacing": [
        "error",
        {
          "after": true,
          "before": true
        }
      ],
        "linebreak-style": [
        "error",
        "unix"
      ],
        "lines-between-class-members": [
        "error",
        "always",
        {
          "exceptAfterSingleLine": true
        }
      ],
        "max-len": [
        "error",
        {
          "code": 120
        }
      ],
        "new-cap": [
        "error",
        {
          "capIsNew": false,
          "newIsCap": true
        }
      ],
        "new-parens": "error",
        "no-array-constructor": "error",
        "no-async-promise-executor": "error",
        "no-caller": "error",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-const-assign": "error",
        "no-constant-condition": [
        "error",
        {
          "checkLoops": false
        }
      ],
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-delete-var": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty-character-class": "error",
        "no-empty-pattern": "error",
        "no-eval": "error",
        "no-ex-assign": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-parens": [
        "error",
        "functions"
      ],
        "no-fallthrough": "error",
        "no-floating-decimal": "error",
        "no-func-assign": "error",
        "no-global-assign": "error",
        "no-implied-eval": "error",
        "no-inner-declarations": [
        "error",
        "functions"
      ],
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-iterator": "error",
        "no-label-var": "error",
        "no-labels": [
        "error",
        {
          "allowLoop": false,
          "allowSwitch": false
        }
      ],
        "no-lone-blocks": "error",
        "no-misleading-character-class": "error",
        "no-mixed-operators": [
        "error",
        {
          "allowSamePrecedence": true,
          "groups": [
            [
              "==",
              "!=",
              "===",
              "!==",
              ">",
              ">=",
              "<",
              "<="
            ],
            [
              "&&",
              "||"
            ],
            [
              "in",
              "instanceof"
            ]
          ]
        }
      ],
        "no-mixed-spaces-and-tabs": "error",
        "no-multi-spaces": "error",
        "no-multi-str": "error",
        "no-multiple-empty-lines": [
        "error",
        {
          "max": 1,
          "maxEOF": 0
        }
      ],
        "no-negated-in-lhs": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-object": "error",
        "no-new-require": "error",
        "no-new-symbol": "error",
        "no-new-wrappers": "error",
        "no-obj-calls": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-path-concat": "error",
        "no-proto": "error",
        "no-prototype-builtins": "error",
        "no-redeclare": [
        "error",
        {
          "builtinGlobals": false
        }
      ],
        "no-regex-spaces": "error",
        "no-return-assign": [
        "error",
        "except-parens"
      ],
        "no-return-await": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-shadow-restricted-names": "error",
        "no-sparse-arrays": "error",
        "no-tabs": "error",
        "no-template-curly-in-string": "error",
        "no-this-before-super": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-unexpected-multiline": "error",
        "no-unmodified-loop-condition": "error",
        "no-unneeded-ternary": [
        "error",
        {
          "defaultAssignment": false
        }
      ],
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-use-before-define": [
        "error",
        {
          "classes": false,
          "functions": false,
          "variables": false
        }
      ],
        "no-useless-call": "error",
        "no-useless-catch": "error",
        "no-useless-computed-key": "error",
        "no-useless-escape": "error",
        "no-useless-rename": "error",
        "no-useless-return": "error",
        "no-whitespace-before-property": "error",
        "no-with": "error",
        "object-curly-spacing": [
        "error",
        "never"
      ],
        "object-property-newline": [
        "error",
        {
          "allowMultiplePropertiesPerLine": true
        }
      ],
        "one-var": [
        "error",
        {
          "initialized": "never"
        }
      ],
        "operator-linebreak": [
        "error",
        "after",
        {
          "overrides": {
            ":": "before",
            "?": "before"
          }
        }
      ],
        "padded-blocks": [
        "error",
        {
          "blocks": "never",
          "classes": "never",
          "switches": "never"
        }
      ],
        "prefer-const": [
        "error",
        {
          "destructuring": "all"
        }
      ],
        "prefer-promise-reject-errors": "error",
        "quote-props": [
        "error",
        "as-needed"
      ],
        "quotes": [
        "error",
        "single"
      ],
        "rest-spread-spacing": [
        "error",
        "never"
      ],
        "semi": [
        "error",
        "always"
      ],
        "semi-spacing": [
        "error",
        {
          "after": true,
          "before": false
        }
      ],
        "space-before-blocks": [
        "error",
        "always"
      ],
        "space-before-function-paren": [
        "error",
        {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always"
        }
      ],
        "space-in-parens": [
        "error",
        "never"
      ],
        "space-infix-ops": "error",
        "space-unary-ops": [
        "error",
        {
          "nonwords": false,
          "words": true
        }
      ],
        "spaced-comment": [
        "error",
        "always",
        {
          "block": {
            "balanced": true,
            "exceptions": [
              "*"
            ],
            "markers": [
              "*package",
              "!",
              ",",
              ":",
              "::",
              "flow-include"
            ]
          },
          "line": {
            "markers": [
              "*package",
              "!",
              "/",
              ",",
              "="
            ]
          }
        }
      ],
        "symbol-description": "error",
        "template-curly-spacing": [
        "error",
        "never"
      ],
        "template-tag-spacing": [
        "error",
        "never"
      ],
        "unicode-bom": [
        "error",
        "never"
      ],
        "use-isnan": "error",
        "valid-typeof": [
        "error",
        {
          "requireStringLiterals": true
        }
      ],
        "wrap-iife": [
        "error",
        "any",
        {
          "functionPrototypeMethods": true
        }
      ],
        "yield-star-spacing": [
        "error",
        "both"
      ],
        "yoda": [
        "error",
        "never"
      ]
    },
      "overrides": [
      {
        "files": [
          "test/**/*.ts"
        ],
        "rules": {
          "@typescript-eslint/no-explicit-any": "off",
          "@typescript-eslint/no-non-null-assertion": "off",
          "@typescript-eslint/no-var-requires": "off",
          "no-unused-expressions": "off",
          "prefer-promise-reject-errors": "off",
          "import/no-extraneous-dependencies": [
            "error",
            {
              "devDependencies": true
            }
          ]
        }
      }
    ]
    }

</details>

## ステップ 1： プロジェクトに Wallfe をインストールする（[ドキュメントのリンク](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation)） {#step-1-install-waffle-in-your-project}

まずはじめに、`ethereum-waffle`をインストールする必要があります。 このチュートリアルでは、`yarn`を使用して`ethereum-waffle`をインストールするので、以下のコマンドを実行してください：

```bash
 yarn add --dev ethereum-waffle
```

## ステップ 2：スマートコントラクトを作成する（[ドキュメントのリンク](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-a-contract)） {#step-2-write-a-smart-contract}

このチュートリアルでは、[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/ded2b0a55c9c13731963ab7b85a70c8e73504bab/contracts/token/ERC20/ERC20.sol)が提供する[ERC-20](https://openzeppelin.com)トークンを使用します。

ですから、`yarn`を使って`OpenZeppelin`をインストールします。

```bash
 yarn add @openzeppelin/contracts -D
```

次に、 `src`ディレクトリで`BasicToken.sol`コントラクトを作成します。

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Example class - a mock class using delivering from ERC20
contract BasicToken is ERC20 {
    constructor(uint256 initialBalance) ERC20("Basic", "BSC") public {
        _mint(msg.sender, initialBalance);
    }
}

```

## ステップ 3：スマートコントラクトをコンパイルする（[ドキュメントのリンク](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract)） {#step-3-compile-your-smart-contract}

スマートコントラクトをコンパイルするには、プロジェクトの`package.json`に、以下のエントリを追加します：

```json
{
  "scripts": {
    "build": "waffle"
  }
}
```

さらに、プロジェクトのメイン ディレクトリに`waffle.json`ファイルを追加します。

以下は、`waffle.json`の設定例です：

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Waffle の設定については、[こちら](https://ethereum-waffle.readthedocs.io/en/latest/configuration.html#configuration)をご覧ください。

次に、`yarn build`を実行して、スマートコントラクトをコンパイルします。

Waffle がコントラクトをコンパイルしたので、JSON の出力結果が`build`ディレクトリ内に配置されたことを確認してください。

<details>
<summary>BasicToken.json</summary>

    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "initialBalance",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "subtractedValue",
              "type": "uint256"
            }
          ],
          "name": "decreaseAllowance",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "addedValue",
              "type": "uint256"
            }
          ],
          "name": "increaseAllowance",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      "evm": {
        "bytecode": {
          "linkReferences": {},
          "object": "60806040523480156200001157600080fd5b506040516200153938038062001539833981810160405260208110156200003757600080fd5b81019080805190602001909291905050506040518060400160405280600581526020017f42617369630000000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f42534300000000000000000000000000000000000000000000000000000000008152508160039080519060200190620000cc92919062000389565b508060049080519060200190620000e592919062000389565b506012600560006101000a81548160ff021916908360ff16021790555050506200011633826200011d60201b60201c565b5062000438565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415620001c1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f45524332303a206d696e7420746f20746865207a65726f20616464726573730081525060200191505060405180910390fd5b620001d560008383620002fb60201b60201c565b620001f1816002546200030060201b62000f2d1790919060201c565b6002819055506200024f816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546200030060201b62000f2d1790919060201c565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b505050565b6000808284019050838110156200037f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620003cc57805160ff1916838001178555620003fd565b82800160010185558215620003fd579182015b82811115620003fc578251825591602001919060010190620003df565b5b5090506200040c919062000410565b5090565b6200043591905b808211156200043157600081600090555060010162000417565b5090565b90565b6110f180620004486000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461025f57806370a08231146102c557806395d89b411461031d578063a457c2d7146103a0578063a9059cbb14610406578063dd62ed3e1461046c576100a9565b806306fdde03146100ae578063095ea7b31461013157806318160ddd1461019757806323b872dd146101b5578063313ce5671461023b575b600080fd5b6100b66104e4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100f65780820151818401526020810190506100db565b50505050905090810190601f1680156101235780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017d6004803603604081101561014757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610586565b604051808215151515815260200191505060405180910390f35b61019f6105a4565b6040518082815260200191505060405180910390f35b610221600480360360608110156101cb57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105ae565b604051808215151515815260200191505060405180910390f35b610243610687565b604051808260ff1660ff16815260200191505060405180910390f35b6102ab6004803603604081101561027557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061069e565b604051808215151515815260200191505060405180910390f35b610307600480360360208110156102db57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610751565b6040518082815260200191505060405180910390f35b610325610799565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561036557808201518184015260208101905061034a565b50505050905090810190601f1680156103925780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103ec600480360360408110156103b657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061083b565b604051808215151515815260200191505060405180910390f35b6104526004803603604081101561041c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610908565b604051808215151515815260200191505060405180910390f35b6104ce6004803603604081101561048257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610926565b6040518082815260200191505060405180910390f35b606060038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561057c5780601f106105515761010080835404028352916020019161057c565b820191906000526020600020905b81548152906001019060200180831161055f57829003601f168201915b5050505050905090565b600061059a6105936109ad565b84846109b5565b6001905092915050565b6000600254905090565b60006105bb848484610bac565b61067c846105c76109ad565b6106778560405180606001604052806028815260200161102660289139600160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600061062d6109ad565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e6d9092919063ffffffff16565b6109b5565b600190509392505050565b6000600560009054906101000a900460ff16905090565b60006107476106ab6109ad565b8461074285600160006106bc6109ad565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610f2d90919063ffffffff16565b6109b5565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108315780601f1061080657610100808354040283529160200191610831565b820191906000526020600020905b81548152906001019060200180831161081457829003601f168201915b5050505050905090565b60006108fe6108486109ad565b846108f98560405180606001604052806025815260200161109760259139600160006108726109ad565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e6d9092919063ffffffff16565b6109b5565b6001905092915050565b600061091c6109156109ad565b8484610bac565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610a3b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806110736024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ac1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180610fde6022913960400191505060405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610c32576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602581526020018061104e6025913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610cb8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180610fbb6023913960400191505060405180910390fd5b610cc3838383610fb5565b610d2e81604051806060016040528060268152602001611000602691396000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e6d9092919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610dc1816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610f2d90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b6000838311158290610f1a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610edf578082015181840152602081019050610ec4565b50505050905090810190601f168015610f0c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b600080828401905083811015610fab576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b50505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122081c840f087cef92feccb03fadc678b2708c331896ec5432b5d4c675f27b6d3e664736f6c63430006020033",
          "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH3 0x11 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH3 0x1539 CODESIZE SUB DUP1 PUSH3 0x1539 DUP4 CODECOPY DUP2 DUP2 ADD PUSH1 0x40 MSTORE PUSH1 0x20 DUP2 LT ISZERO PUSH3 0x37 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x5 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x4261736963000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x3 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x4253430000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP DUP2 PUSH1 0x3 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH3 0xCC SWAP3 SWAP2 SWAP1 PUSH3 0x389 JUMP JUMPDEST POP DUP1 PUSH1 0x4 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH3 0xE5 SWAP3 SWAP2 SWAP1 PUSH3 0x389 JUMP JUMPDEST POP PUSH1 0x12 PUSH1 0x5 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 PUSH1 0xFF AND MUL OR SWAP1 SSTORE POP POP POP PUSH3 0x116 CALLER DUP3 PUSH3 0x11D PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST POP PUSH3 0x438 JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH3 0x1C1 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x1F DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH32 0x45524332303A206D696E7420746F20746865207A65726F206164647265737300 DUP2 MSTORE POP PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH3 0x1D5 PUSH1 0x0 DUP4 DUP4 PUSH3 0x2FB PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST PUSH3 0x1F1 DUP2 PUSH1 0x2 SLOAD PUSH3 0x300 PUSH1 0x20 SHL PUSH3 0xF2D OR SWAP1 SWAP2 SWAP1 PUSH1 0x20 SHR JUMP JUMPDEST PUSH1 0x2 DUP2 SWAP1 SSTORE POP PUSH3 0x24F DUP2 PUSH1 0x0 DUP1 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH3 0x300 PUSH1 0x20 SHL PUSH3 0xF2D OR SWAP1 SWAP2 SWAP1 PUSH1 0x20 SHR JUMP JUMPDEST PUSH1 0x0 DUP1 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP4 PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 DUP3 DUP5 ADD SWAP1 POP DUP4 DUP2 LT ISZERO PUSH3 0x37F JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x1B DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH32 0x536166654D6174683A206164646974696F6E206F766572666C6F770000000000 DUP2 MSTORE POP PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH1 0x1F LT PUSH3 0x3CC JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH3 0x3FD JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH3 0x3FD JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH3 0x3FC JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH3 0x3DF JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH3 0x40C SWAP2 SWAP1 PUSH3 0x410 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH3 0x435 SWAP2 SWAP1 JUMPDEST DUP1 DUP3 GT ISZERO PUSH3 0x431 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH3 0x417 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST SWAP1 JUMP JUMPDEST PUSH2 0x10F1 DUP1 PUSH3 0x448 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0xA9 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x39509351 GT PUSH2 0x71 JUMPI DUP1 PUSH4 0x39509351 EQ PUSH2 0x25F JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x2C5 JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x31D JUMPI DUP1 PUSH4 0xA457C2D7 EQ PUSH2 0x3A0 JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x406 JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x46C JUMPI PUSH2 0xA9 JUMP JUMPDEST DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0xAE JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x131 JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0x197 JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x1B5 JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0x23B JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xB6 PUSH2 0x4E4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0xF6 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0xDB JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x123 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x17D PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x147 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x586 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x19F PUSH2 0x5A4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x221 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x60 DUP2 LT ISZERO PUSH2 0x1CB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x5AE JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x243 PUSH2 0x687 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 PUSH1 0xFF AND PUSH1 0xFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x2AB PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x275 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x69E JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x307 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x2DB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x751 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x325 PUSH2 0x799 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x365 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x34A JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x392 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x3EC PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x3B6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x83B JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x452 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x41C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x908 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x4CE PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x482 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x926 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 ISZERO PUSH2 0x57C JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x551 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x57C JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x55F JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x59A PUSH2 0x593 PUSH2 0x9AD JUMP JUMPDEST DUP5 DUP5 PUSH2 0x9B5 JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x5BB DUP5 DUP5 DUP5 PUSH2 0xBAC JUMP JUMPDEST PUSH2 0x67C DUP5 PUSH2 0x5C7 PUSH2 0x9AD JUMP JUMPDEST PUSH2 0x677 DUP6 PUSH1 0x40 MLOAD DUP1 PUSH1 0x60 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x28 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x1026 PUSH1 0x28 SWAP2 CODECOPY PUSH1 0x1 PUSH1 0x0 DUP12 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 PUSH2 0x62D PUSH2 0x9AD JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0xE6D SWAP1 SWAP3 SWAP2 SWAP1 PUSH4 0xFFFFFFFF AND JUMP JUMPDEST PUSH2 0x9B5 JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x5 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH1 0xFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x747 PUSH2 0x6AB PUSH2 0x9AD JUMP JUMPDEST DUP5 PUSH2 0x742 DUP6 PUSH1 0x1 PUSH1 0x0 PUSH2 0x6BC PUSH2 0x9AD JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP10 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0xF2D SWAP1 SWAP2 SWAP1 PUSH4 0xFFFFFFFF AND JUMP JUMPDEST PUSH2 0x9B5 JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x60 PUSH1 0x4 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 ISZERO PUSH2 0x831 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x806 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x831 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x814 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x8FE PUSH2 0x848 PUSH2 0x9AD JUMP JUMPDEST DUP5 PUSH2 0x8F9 DUP6 PUSH1 0x40 MLOAD DUP1 PUSH1 0x60 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x25 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x1097 PUSH1 0x25 SWAP2 CODECOPY PUSH1 0x1 PUSH1 0x0 PUSH2 0x872 PUSH2 0x9AD JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP11 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0xE6D SWAP1 SWAP3 SWAP2 SWAP1 PUSH4 0xFFFFFFFF AND JUMP JUMPDEST PUSH2 0x9B5 JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x91C PUSH2 0x915 PUSH2 0x9AD JUMP JUMPDEST DUP5 DUP5 PUSH2 0xBAC JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xA3B JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x24 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x1073 PUSH1 0x24 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xAC1 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x22 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0xFDE PUSH1 0x22 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH1 0x1 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 DUP4 PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xC32 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x25 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x104E PUSH1 0x25 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xCB8 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x23 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0xFBB PUSH1 0x23 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0xCC3 DUP4 DUP4 DUP4 PUSH2 0xFB5 JUMP JUMPDEST PUSH2 0xD2E DUP2 PUSH1 0x40 MLOAD DUP1 PUSH1 0x60 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x26 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x1000 PUSH1 0x26 SWAP2 CODECOPY PUSH1 0x0 DUP1 DUP8 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0xE6D SWAP1 SWAP3 SWAP2 SWAP1 PUSH4 0xFFFFFFFF AND JUMP JUMPDEST PUSH1 0x0 DUP1 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP PUSH2 0xDC1 DUP2 PUSH1 0x0 DUP1 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0xF2D SWAP1 SWAP2 SWAP1 PUSH4 0xFFFFFFFF AND JUMP JUMPDEST PUSH1 0x0 DUP1 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP4 PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP4 DUP4 GT ISZERO DUP3 SWAP1 PUSH2 0xF1A JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0xEDF JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0xEC4 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xF0C JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP PUSH1 0x0 DUP4 DUP6 SUB SWAP1 POP DUP1 SWAP2 POP POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 DUP3 DUP5 ADD SWAP1 POP DUP4 DUP2 LT ISZERO PUSH2 0xFAB JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x1B DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH32 0x536166654D6174683A206164646974696F6E206F766572666C6F770000000000 DUP2 MSTORE POP PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST POP POP POP JUMP INVALID GASLIMIT MSTORE NUMBER ORIGIN ADDRESS GASPRICE KECCAK256 PUSH21 0x72616E7366657220746F20746865207A65726F2061 PUSH5 0x6472657373 GASLIMIT MSTORE NUMBER ORIGIN ADDRESS GASPRICE KECCAK256 PUSH2 0x7070 PUSH19 0x6F766520746F20746865207A65726F20616464 PUSH19 0x65737345524332303A207472616E7366657220 PUSH2 0x6D6F PUSH22 0x6E7420657863656564732062616C616E636545524332 ADDRESS GASPRICE KECCAK256 PUSH21 0x72616E7366657220616D6F756E7420657863656564 PUSH20 0x20616C6C6F77616E636545524332303A20747261 PUSH15 0x736665722066726F6D20746865207A PUSH6 0x726F20616464 PUSH19 0x65737345524332303A20617070726F76652066 PUSH19 0x6F6D20746865207A65726F2061646472657373 GASLIMIT MSTORE NUMBER ORIGIN ADDRESS GASPRICE KECCAK256 PUSH5 0x6563726561 PUSH20 0x656420616C6C6F77616E63652062656C6F77207A PUSH6 0x726FA2646970 PUSH7 0x735822122081C8 BLOCKHASH CREATE DUP8 0xCE 0xF9 0x2F 0xEC 0xCB SUB STATICCALL 0xDC PUSH8 0x8B2708C331896EC5 NUMBER 0x2B 0x5D 0x4C PUSH8 0x5F27B6D3E664736F PUSH13 0x63430006020033000000000000 ",
          "sourceMap": "142:152:5:-:0;;;177:115;8:9:-1;5:2;;;30:1;27;20:12;5:2;177:115:5;;;;;;;;;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;177:115:5;;;;;;;;;;;;;;;;2013:141:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2093:4;2085:5;:12;;;;;;;;;;;;:::i;:::-;;2117:6;2107:7;:16;;;;;;;;;;;;:::i;:::-;;2145:2;2133:9;;:14;;;;;;;;;;;;;;;;;;2013:141;;252:33:5::1;258:10;270:14;252:5;;;:33;;:::i;:::-;177:115:::0;142:152;;7835:370:2;7937:1;7918:21;;:7;:21;;;;7910:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7986:49;8015:1;8019:7;8028:6;7986:20;;;:49;;:::i;:::-;8061:24;8078:6;8061:12;;:16;;;;;;:24;;;;:::i;:::-;8046:12;:39;;;;8116:30;8139:6;8116:9;:18;8126:7;8116:18;;;;;;;;;;;;;;;;:22;;;;;;:30;;;;:::i;:::-;8095:9;:18;8105:7;8095:18;;;;;;;;;;;;;;;:51;;;;8182:7;8161:37;;8178:1;8161:37;;;8191:6;8161:37;;;;;;;;;;;;;;;;;;7835:370;;:::o;10695:92::-;;;;:::o;874:176:1:-;932:7;951:9;967:1;963;:5;951:17;;991:1;986;:6;;978:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1042:1;1035:8;;;874:176;;;;:::o;142:152:5:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;"
        },
        "deployedBytecode": {
          "linkReferences": {},
          "object": "608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461025f57806370a08231146102c557806395d89b411461031d578063a457c2d7146103a0578063a9059cbb14610406578063dd62ed3e1461046c576100a9565b806306fdde03146100ae578063095ea7b31461013157806318160ddd1461019757806323b872dd146101b5578063313ce5671461023b575b600080fd5b6100b66104e4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100f65780820151818401526020810190506100db565b50505050905090810190601f1680156101235780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017d6004803603604081101561014757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610586565b604051808215151515815260200191505060405180910390f35b61019f6105a4565b6040518082815260200191505060405180910390f35b610221600480360360608110156101cb57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105ae565b604051808215151515815260200191505060405180910390f35b610243610687565b604051808260ff1660ff16815260200191505060405180910390f35b6102ab6004803603604081101561027557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061069e565b604051808215151515815260200191505060405180910390f35b610307600480360360208110156102db57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610751565b6040518082815260200191505060405180910390f35b610325610799565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561036557808201518184015260208101905061034a565b50505050905090810190601f1680156103925780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103ec600480360360408110156103b657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061083b565b604051808215151515815260200191505060405180910390f35b6104526004803603604081101561041c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610908565b604051808215151515815260200191505060405180910390f35b6104ce6004803603604081101561048257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610926565b6040518082815260200191505060405180910390f35b606060038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561057c5780601f106105515761010080835404028352916020019161057c565b820191906000526020600020905b81548152906001019060200180831161055f57829003601f168201915b5050505050905090565b600061059a6105936109ad565b84846109b5565b6001905092915050565b6000600254905090565b60006105bb848484610bac565b61067c846105c76109ad565b6106778560405180606001604052806028815260200161102660289139600160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600061062d6109ad565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e6d9092919063ffffffff16565b6109b5565b600190509392505050565b6000600560009054906101000a900460ff16905090565b60006107476106ab6109ad565b8461074285600160006106bc6109ad565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610f2d90919063ffffffff16565b6109b5565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108315780601f1061080657610100808354040283529160200191610831565b820191906000526020600020905b81548152906001019060200180831161081457829003601f168201915b5050505050905090565b60006108fe6108486109ad565b846108f98560405180606001604052806025815260200161109760259139600160006108726109ad565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e6d9092919063ffffffff16565b6109b5565b6001905092915050565b600061091c6109156109ad565b8484610bac565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610a3b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806110736024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ac1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180610fde6022913960400191505060405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610c32576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602581526020018061104e6025913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610cb8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526023815260200180610fbb6023913960400191505060405180910390fd5b610cc3838383610fb5565b610d2e81604051806060016040528060268152602001611000602691396000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610e6d9092919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610dc1816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610f2d90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b6000838311158290610f1a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610edf578082015181840152602081019050610ec4565b50505050905090810190601f168015610f0c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385039050809150509392505050565b600080828401905083811015610fab576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b50505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122081c840f087cef92feccb03fadc678b2708c331896ec5432b5d4c675f27b6d3e664736f6c63430006020033",
          "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0xA9 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x39509351 GT PUSH2 0x71 JUMPI DUP1 PUSH4 0x39509351 EQ PUSH2 0x25F JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x2C5 JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x31D JUMPI DUP1 PUSH4 0xA457C2D7 EQ PUSH2 0x3A0 JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x406 JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x46C JUMPI PUSH2 0xA9 JUMP JUMPDEST DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0xAE JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x131 JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0x197 JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x1B5 JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0x23B JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xB6 PUSH2 0x4E4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0xF6 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0xDB JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x123 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x17D PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x147 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x586 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x19F PUSH2 0x5A4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x221 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x60 DUP2 LT ISZERO PUSH2 0x1CB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x5AE JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x243 PUSH2 0x687 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 PUSH1 0xFF AND PUSH1 0xFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x2AB PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x275 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x69E JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x307 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x2DB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x751 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x325 PUSH2 0x799 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x365 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x34A JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x392 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x3EC PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x3B6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x83B JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x452 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x41C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x908 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 ISZERO ISZERO ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x4CE PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x482 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 ADD SWAP1 DUP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 DUP1 CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH1 0x20 ADD SWAP1 SWAP3 SWAP2 SWAP1 POP POP POP PUSH2 0x926 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 ISZERO PUSH2 0x57C JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x551 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x57C JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x55F JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x59A PUSH2 0x593 PUSH2 0x9AD JUMP JUMPDEST DUP5 DUP5 PUSH2 0x9B5 JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x5BB DUP5 DUP5 DUP5 PUSH2 0xBAC JUMP JUMPDEST PUSH2 0x67C DUP5 PUSH2 0x5C7 PUSH2 0x9AD JUMP JUMPDEST PUSH2 0x677 DUP6 PUSH1 0x40 MLOAD DUP1 PUSH1 0x60 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x28 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x1026 PUSH1 0x28 SWAP2 CODECOPY PUSH1 0x1 PUSH1 0x0 DUP12 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 PUSH2 0x62D PUSH2 0x9AD JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0xE6D SWAP1 SWAP3 SWAP2 SWAP1 PUSH4 0xFFFFFFFF AND JUMP JUMPDEST PUSH2 0x9B5 JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x5 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH1 0xFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x747 PUSH2 0x6AB PUSH2 0x9AD JUMP JUMPDEST DUP5 PUSH2 0x742 DUP6 PUSH1 0x1 PUSH1 0x0 PUSH2 0x6BC PUSH2 0x9AD JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP10 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0xF2D SWAP1 SWAP2 SWAP1 PUSH4 0xFFFFFFFF AND JUMP JUMPDEST PUSH2 0x9B5 JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x60 PUSH1 0x4 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 ISZERO PUSH2 0x831 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x806 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x831 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x814 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x8FE PUSH2 0x848 PUSH2 0x9AD JUMP JUMPDEST DUP5 PUSH2 0x8F9 DUP6 PUSH1 0x40 MLOAD DUP1 PUSH1 0x60 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x25 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x1097 PUSH1 0x25 SWAP2 CODECOPY PUSH1 0x1 PUSH1 0x0 PUSH2 0x872 PUSH2 0x9AD JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP11 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0xE6D SWAP1 SWAP3 SWAP2 SWAP1 PUSH4 0xFFFFFFFF AND JUMP JUMPDEST PUSH2 0x9B5 JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x91C PUSH2 0x915 PUSH2 0x9AD JUMP JUMPDEST DUP5 DUP5 PUSH2 0xBAC JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xA3B JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x24 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x1073 PUSH1 0x24 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xAC1 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x22 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0xFDE PUSH1 0x22 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH1 0x1 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 DUP4 PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xC32 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x25 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x104E PUSH1 0x25 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xCB8 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x23 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0xFBB PUSH1 0x23 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0xCC3 DUP4 DUP4 DUP4 PUSH2 0xFB5 JUMP JUMPDEST PUSH2 0xD2E DUP2 PUSH1 0x40 MLOAD DUP1 PUSH1 0x60 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x26 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x1000 PUSH1 0x26 SWAP2 CODECOPY PUSH1 0x0 DUP1 DUP8 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0xE6D SWAP1 SWAP3 SWAP2 SWAP1 PUSH4 0xFFFFFFFF AND JUMP JUMPDEST PUSH1 0x0 DUP1 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP PUSH2 0xDC1 DUP2 PUSH1 0x0 DUP1 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0xF2D SWAP1 SWAP2 SWAP1 PUSH4 0xFFFFFFFF AND JUMP JUMPDEST PUSH1 0x0 DUP1 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP4 PUSH1 0x40 MLOAD DUP1 DUP3 DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP4 DUP4 GT ISZERO DUP3 SWAP1 PUSH2 0xF1A JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0xEDF JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0xEC4 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xF0C JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP PUSH1 0x0 DUP4 DUP6 SUB SWAP1 P

</details>

## ステップ 4：スマートコントラクトをテストする（[ドキュメントのリンク](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)） {#step-4-test-your-smart-contract}

### ステップ 4.1：必要な依存関係をインストールする（[ドキュメントのリンク](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)） {#step-4-1}

スマートコントラクトの作成が完了したら、テストする必要があります。 テストには、`Waffle`を使用します。

`Waffle`のテストは、`Mocha`と`Chai`で書かれています。 その他のテスト環境も使用できますが、`Waffle`マッチャーが動作するのは `Chai`のみです。

このため、`Chai`に依存関係を追加する必要があります：

```bash
 yarn add --dev mocha chai
```

### ステップ 4.2：テストファイルを作成する（[ドキュメントのリンク](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)） {#step-4-2}

テストを書くには、テストディレクトリに`BasicToken.test.ts`ファイルを作成する必要があります。

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import BasicToken from "../build/BasicToken.json"

use(solidity)

describe("BasicToken", () => {
  const [wallet, walletTo] = new MockProvider().getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployContract(wallet, BasicToken, [1000])
  })
})
```

トークンをデプロイするために、`Waffle`の`deployContract`メソッドを使用します。 このコントラクトとデフォルト残高をコンパイルした json ファイルである`wallet`を、引数として渡す必要があります。

`Waffle`では、 `wallet`を作成できるため、コントラクトを手軽にデプロイできます。

`wallet`の詳細については、 [こちら](https://ethereum-waffle.readthedocs.io/en/latest/basic-testing.html?highlight=wallet#getting-wallets)をご覧ください。デプロイの機能に関しては、[こちら](https://ethereum-waffle.readthedocs.io/en/latest/basic-testing.html?highlight=wallet#deploying-contracts)をご覧ください。

ウォレットの残高を確認する簡単なテストを書いてみましょう。 コントラクトのデプロイ時に「1000」の値を送信したため、ウォレット残高は 1000 トークンになっているはずですが、これを最初のテストで確認します。

```ts
it("Assigns initial balance", async () => {
  expect(await token.balanceOf(wallet.address)).to.equal(1000)
})
```

`yarn test`を使ってテストを実行します。

### ステップ 4.3：イベントを発行する（[ドキュメントのリンク](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html?highlight=changeBalance#emitting-events)） {#step-4-3}

このチュートリアルでは、`Waffle`の中で最も便利なマッチャーを紹介したいので、最初のマッチャーから始めましょう。

`Waffle`では、発行したイベントをテストすることができます。

このチュートリアルでは、コントラクトの`transfer`メソッドをテストします。

このテストでは、あるウォレットから別のウォレットへの送金を行い、 `Transfer`イベントが呼ばれたかどうかを確認します。

```ts
it("Transfer emits event", async () => {
  await expect(token.transfer(walletTo.address, 7))
    .to.emit(token, "Transfer")
    .withArgs(wallet.address, walletTo.address, 7)
})
```

このマッチャーの大きな利点は、テストに`withArgs`を追加することで、このイベントがどの引数で呼び出されたかを確認できることです。

これにより、関数が正しく呼び出されていることを確認することができます。

### ステップ 4.4：メッセージと共にリバートする（[ドキュメントのリンク](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html?highlight=changeBalance#revert-with-message)） {#step-4-4}

`Waffle`では、リバートの際にどのメッセージが送信されるかをテストできます。

今回のテストでは、`revertedWith`のマッチャーを使って確認しましょう。

ウォレット残高を上回る額の送信を実行するテストを書くこともできます。 このテストにより、トランザクションが正しいメッセージと共にリバートされたかを確認できます！

```ts
it("Can not transfer above the amount", async () => {
  await expect(token.transfer(walletTo.address, 1007)).to.be.revertedWith(
    "VM Exception while processing transaction: revert ERC20: transfer amount exceeds balance"
  )
})
```

### ステップ 4.5：トークン残高を変更する（[ドキュメントのリンク](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html?highlight=changeBalance#change-balance)） {#step-4-5}

`Waffle`では、ウォレット残高の変更も確認できます！

`changeTokenBalance`マッチャーで、残高の変動を確認できます。複数のアカウントの場合は、`changeTokenBalances`を使用してください。

マッチャーは、残高の変更として`numbers`、`strings`、`BigNumbers`を受け取ることができますが、アドレスについてはウォレットまたはコントラクトとして指定しなければなりません。

次のテストを書いてみましょう：

```ts
it("Send transaction changes receiver balance", async () => {
  await expect(() =>
    wallet.sendTransaction({ to: walletTo.address, gasPrice: 0, value: 200 })
  ).to.changeBalance(walletTo, 200)
})
```

上記は、1 つのウォレットを対象とするテストです。

複数のウォレットを対象とする場合は、以下のようにします：

```ts
it("Send transaction changes sender and receiver balances", async () => {
  await expect(() =>
    wallet.sendTransaction({ to: walletTo.address, gasPrice: 0, value: 200 })
  ).to.changeBalances([wallet, walletTo], [-200, 200])
})
```

このトランザクションは、コールバックとして（呼び出しを実行する前に、残高を確認する必要があります）、あるいはトランザクションに対する応答として渡されることを想定しています。

## おめでとうございます！ {#congratulations}

**おめでとうございます！ このチュートリアルは、以上で完了です。 Waffle を使ってスマートコントラクトをテストする上で、最初の大きな一歩を踏み出すことができました。**

**このチュートリアルに含まれるコードは、[こちら](https://github.com/VladStarostenko/tutorial-for-ethereum-org-website)で入手できます。**

**`Waffle`のドキュメンテーションは、[こちら](https://getwaffle.io)で入手できます。**
