export class CustomError {
  message!: string;
  status!: number;
  info!: any;

  constructor(message: string, status: number = 500, info: any = {}) {
    this.message = message;
    this.status = status;
    this.info = info;
  }
}
