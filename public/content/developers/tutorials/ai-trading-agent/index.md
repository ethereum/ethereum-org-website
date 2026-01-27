---
title: "Make your own AI trading agent"
description: "In this tutorial you learn how to make a simple AI trading agent. This agent reads information from the blockchain, asks an LLM for recommendation based on that information, performs the trade the LLM recommends, and then waits and repeats.

author: Ori Pomerantz
tags: ["ai", "trading", "agent", "python"]
skill: intermediate
published: 2026-02-15
lang: en
sidebarDepth: 3
---

In this tutorial you learn how to make a simple ai trading agent. This agent works using these steps:

1. Read the current and past prices of a token, as well as other potentially relevant information.
2. Build a query with this information, along with background to explain how it might be relevant.
3. Submit the query and receive back a projected price.
4. Trade based on the recommendation. 
5. Wait and repeat.

This agent demonstrates how to read information, turn it into a query that results in a usable answer, and use that answer. All of these are steps required to for an AI agent. This agent is written in Python because that seems to be the most common language used in AI.

## Why do this? 

Automated trading agents allow developers to decide upon and run a trading strategy. [AI agents](/ai-agents) allow for more complex and dynamic trading strategies, potentially using information and algorithms the developer has not even considered using.

## The tools {#tools}

This article uses [Python](https://www.python.org/), the [Web3 library](https://web3py.readthedocs.io/en/stable/), and [Uniswap v. 3](https://github.com/Uniswap/v3-periphery) for quotes and trading. 

### Why Python? {#python}

The most common language in use for AI is [Python](https://www.python.org/), so that's what we use here. Don't worry if you don't know Python. It is a very clear language, and I am going to explain exactly what it is doing.

The [Web3 library](https://web3py.readthedocs.io/en/stable/) is the most common Python Ethereum API. It is pretty easy to use.

### Trading on the blockchain {#trading-on-blockchain}

There are [many distributed exchanges (DEX)](/apps/categories/defi/) that let you trade token on Ethereum. However, they all tend to have similar exchange rates because of [arbitrage](/developers/docs/smart-contracts/composability/#better-user-experience). 

[Uniswap](https://app.uniswap.org/) is a very common DEX, which we can use both for quotes (to see the relative values of tokens) and trades.

## Development, step by step {#step-by-step}

To simplify the development process, we do it in stages. Each step is a branch in Github.

### Getting started {#getting-started}

There are steps the get started under UNIX or Linux (including [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. If you don't already have it, download and install [Python](https://www.python.org/downloads/). 

2. Clone the GitHub repository.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git
   cd 260215-ai-agent
   ```

3. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/). 

   ```sh
   pipx install uv
   ```

4. Download the libraries.

   ```sh
   uv sync
   ```

5. Activate the virtual environment. You will need to do this every time you start a new command-line window.

   ```sh
   source .venv/bin/activate
   ```

6. To verify Python is working correctly, run `python3` and provide it with this program. You can enter it at the `>>>` prompt, there is no need to create a file.

    ```python
    1+2
    from web3 import Web3
    MAINNET_URL = "https://eth.drpc.org"
    w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
    w3.eth.block_number
    quit()
    ```


### Reading from the blockchain {#read-blockchain}

### Query generation {#query-generation}

### Interfacing with an LLM {#interface-llm}

### Submitting transactions {#submit-txn}

### Back testing {#back-testing}

### From AI-bot to AI-agent {#bot-to-agent}

## What if you want to keep your trading strategy a secret? {#secret}

## Conclusion {#conclusion}

