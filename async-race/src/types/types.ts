export interface FetchRequest {
  url: string;
  params?: {
    [key: string]: string;
  }
}

export interface Car {
  name: string,
  color: string,
  id: number,
}
