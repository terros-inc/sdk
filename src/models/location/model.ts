export type LatLng = {
  latitude: number
  longitude: number
}

/** A postal address, broken into structured components. */
export type Address = {
  country: 'US' | 'CA' | 'PR'
  /** State/province code. */
  countrySubd: string
  line1: string
  line2: string
  /** City/town name. */
  locality: string
  /** The full address formatted as a single string. */
  oneLine: string
  /** ZIP/postal code. */
  postal1: string
  postal2?: string
  postal3?: string
  unitNbr?: string
}

/** A partial address including coordinates, used where a full {@link Address} isn't needed. */
export type SmallAddress = Pick<
  Address,
  'countrySubd' | 'line1' | 'locality' | 'postal1' | 'postal2' | 'postal3' | 'unitNbr'
> & {
  line2?: string
  oneLine?: string
  latlng: LatLng
}
