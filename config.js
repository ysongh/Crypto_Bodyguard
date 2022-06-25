export const CB_Address = "0x65903CD37C41a6f9aeb99e95ceD652c358a1150c"
export const CB_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "city",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			}
		],
		"name": "NewBodyGuard",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "bodyGuardCount",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bodyGuardList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "city",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			}
		],
		"name": "newBodyGuard",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];