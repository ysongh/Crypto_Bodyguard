export const RINKEBY_CB_Address = "0x702a3fefe8B324e7Be41911be25Dde714077f1d9"
export const OP_K_CB_Address = "0xe6E7d8636fdff2e3563e00a29A8864554F410714"
export const CB_Address = "0x644D3bE977e264C02ABBbFcA59FA78e86feeE395"
export const POLYGON_ADDRESS = "0xB1b8e37667904c06950773B0bdf779b891b19611"
export const CB_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_dataCid",
				"type": "string"
			}
		],
		"name": "newBodyGuard",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
				"name": "dataCid",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_longitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_latitude",
				"type": "string"
			}
		],
		"name": "setIsAvailable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "setIsNotAvailable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"name": "dataCid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "longitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "latitude",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]