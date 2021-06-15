import BigNumber from "bignumber.js";
BigNumber.config({
	EXPONENTIAL_AT: 1000,
	DECIMAL_PLACES: 80,
})

export const formatCurrency = (value: number): string => {
    if (value <= 1) return value + ""
    return Boolean(value) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

}

export function unit256ToNumber(value: number, decimal = 18, fixNumber = 3): number {
	return Number(new BigNumber(value).div(new BigNumber(10).pow(decimal)).toFixed(fixNumber))
}

export const formatShortWalletAddress = (address: string): string => {
    return address.substr(0, 6) + '...' + address.substr(address.length-4, address.length);
      
}