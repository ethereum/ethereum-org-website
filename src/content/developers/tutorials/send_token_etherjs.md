## send Token Using ethers.js(5.0)

this send_token() is not only for ether transfer 
but also for other erc20 tokens too.

### Prerequisite
1. include ethers.js(5.0) - it might not be necessary to implement it with version code but the code below is version 5.0

### Parameter
1. contract_address - token contract address(contract address is needed when the token you want to transfer is not ether(any other erc20 token)))
2. send_token_amount - the amount you want to send to the receiver
3. to_address - the receiever's address
4. send_account - the sender's address
5. private_key - private key of the sender to sign the transaction and actually transfer the tokens

signTransaction(tx) is removed because sendTransaction() does it internally.

```
function send_token(contract_address, send_token_amount, to_address, send_account, private_key)
{
	let wallet = new ethers.Wallet(private_key);
	let walletSigner = wallet.connect(window.ethersProvider);

	window.ethersProvider.getGasPrice().then((currentGasPrice) => 
	{
		let gasPrice = ethers.utils.hexlify(parseInt(currentGasPrice));
		console.log(`gasPrice: ${ gasPrice }`);

		if(contract_address)// general token send
		{
			let contract = new ethers.Contract(contract_address, send_abi, walletSigner)
			
			// How many tokens?
			let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18);
			console.log(`numberOfTokens: ${ numberOfTokens }`);
			
			// Send tokens
			contract.transfer(to_address, numberOfTokens).then((transferResult) =>
			{
				console.dir(transferResult);
				alert("sent token");
				clear_input_value();
			});
		}
		else // ether send
		{
			const tx = 
			{
				from : send_account,
				to : to_address,
				value : ethers.utils.parseEther(send_token_amount),
				nonce : window.ethersProvider.getTransactionCount(send_account, 'latest'),
				gasLimit : ethers.utils.hexlify(gas_limit), // 100000
				gasPrice : gasPrice
			}
			console.dir(tx);
			try{
				wallet.connect(window.ethersProvider).sendTransaction(tx).then((transaction) => 
				{
					console.dir(transaction);
					alert('Send finished!');
					clear_input_value();
				});
			}catch(error){
				alert("failed to send!!");
			}

	}
	});
}
```
