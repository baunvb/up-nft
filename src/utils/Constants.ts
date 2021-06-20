// export const BASE_PINATA_URL = "https://gateway.pinata.cloud/ipfs/"
export const BASE_PINATA_URL = ""

export const BASE_BSCSCAN_URL = "https://testnet.bscscan.com/"
export const PROVIDER = "https://apis.ankr.com/cc6cbaa7d14f4bfab6efbdd4b17594c0/2146606aabd8e0a6683c9920dccf924b/binance/full/main"

export const ROPSTEN_PROVIDER = "https://ropsten.infura.io/v3/901c7a2bcb15419d9973e6e71be1378b"
export const MAINNET_PROVIDER = "https://mainnet.infura.io/v3/901c7a2bcb15419d9973e6e71be1378b"

// https://eth-ropsten.alchemyapi.io/v2/zm6nzudIjSr-tgreiywiwnrr6QVhLbWa
export const tokenCgkIdMap: any = {
    IRON: "iron-stablecoin",
    STEEL: "steel",
	YFI: "yearn-finance",
	PICKLE: "pickle-finance",
	BTC: "bitcoin",
	ETH: "ethereum",
	LINK: "chainlink",
	USDT: "tether",
	YFV: "yfv-finance",
	USDC: "usd-coin",
	WBTC: "wrapped-bitcoin",
	crvRenWSBTC: "wrapped-bitcoin",
	vUSD: "usd-coin",
	DAI: "usd-coin",
	aLINK: "aave-link",
	YCURVE: "curve-fi-ydai-yusdc-yusdt-ytusd",
	yCRV: "curve-fi-ydai-yusdc-yusdt-ytusd",
	BFI: "bearn",
	Cure3Crv: "lp-3pool-curve",
	CRV: "curve-dao-token",
	BNB: "binancecoin"
}
export const COINGECKO_API = "https://api.coingecko.com/api/v3/simple/price";

export const NETWORK = {
	BSC_MAINNET: {
		chainId: 56,
		scanUrl: "https://bscscan.com/"
	},

	BSC_TESTNET: {
		chainId: 97,
		scanUrl: "https://testnet.bscscan.com/"
	}
}
