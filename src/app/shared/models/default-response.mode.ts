export class DefaultResponse {
  status:{
    value: string,
    valor: string,
    description: string,
    reference: string,
    messege: string
  }
  codigo: {
    descricao: string,
    valor: string
  }
  data: any;
  error?:any;
  error_description?: any;
  access_token?: any;
}
