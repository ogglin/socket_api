export interface API {

}
export interface Customers {
  id?: number,
  title: string,
  description: string
}
export interface Address {
  id?: number,
  address: string
}
export interface Client {
  id?: number,
  token?: string,
  name: string,
  url: string,
  customers_id: number
}
export interface Info {
  id?: number,
  url: string,
  status: string,
  cartridge: any,
  client_id: number,
  productname: string,
  printcycles: number,
  scancycles: number,
  log: any,
  kit: string,
  company_id: number,
  address_id: number,
  serialnumber: string,
  maintenancekitcount: string,
  adfcycles: number,
  article: string,
  client_article: string,
  datetime: any
}
