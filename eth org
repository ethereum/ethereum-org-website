import json
import glob
from web3 import Web3
from mnemonic import Mnemonic
from bip44 import Wallet
from binance.client import Client
import cbpro

# ===============================
# Config / Secrets
# ===============================
with open("config/secrets.json") as f:
    config = json.load(f)

INFURA_ID = config["INFURA_PROJECT_ID"]
SEED_PHRASE = config["SEED_PHRASE"]
BINANCE_API_KEY = config["BINANCE_API_KEY"]
BINANCE_API_SECRET = config["BINANCE_API_SECRET"]
COINBASE_API_KEY = config["COINBASE_API_KEY"]
COINBASE_API_SECRET = config["COINBASE_API_SECRET"]
COINBASE_PASSPHRASE = config["COINBASE_PASSPHRASE"]

# ===============================
# Wallets: Seed phrase -> Addresses
# ===============================
def derive_addresses(seed_phrase, num_addresses=5):
    mnemo = Mnemonic("english")
    if not mnemo.check(seed_phrase):
        raise ValueError("Invalid seed phrase")
    wallet = Wallet(seed_phrase)
    return [wallet.get_address("eth", account=i) for i in range(num_addresses)]

# ===============================
# Load EVM Chains
# ===============================
def load_chains(path="_data/chains/*.json"):
    chains = []
    for file in glob.glob(path):
        with open(file, "r") as f:
            data = json.load(f)
            required_keys = ["name", "chain", "rpc", "nativeCurrency", "chainId"]
            if not all(k in data for k in required_keys):
                continue
            chains.append(data)
    return chains

def get_balance(address, chain, infura_id=None):
    for rpc in chain["rpc"]:
        try:
            if "${INFURA_API_KEY}" in rpc and infura_id:
                rpc = rpc.replace("${INFURA_API_KEY}", infura_id)
            w3 = Web3(Web3.HTTPProvider(rpc))
            if w3.is_connected():
                balance = w3.eth.get_balance(address)
                return w3.from_wei(balance, "ether")
        except Exception:
            continue
    return None

# ===============================
# Exchanges
# ===============================
binance_client = Client(BINANCE_API_KEY, BINANCE_API_SECRET)
def get