export type Nft = {
    id?: number,
    owner?: string,
    price?: number,
    image?: string,
    isSale: boolean,
    name: string,
    date?: string,
    description?: string,
    series_number?: number,
    series?: number,
    vr_id?: string,
    contract?: string,
    amount?: number,
    max?: number,
    type?: "market" | "collection"
}
export type MetaData = {
    name: string,
    description: string,
    image: string,
    vr_id: string,
    date?: string
}

export type DetaiData = {
    amount: number
    id: number
    isSale: boolean
    max: number
    price: number
    url: string
}