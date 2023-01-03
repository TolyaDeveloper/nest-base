export class MFile {
  public originalname: string
  public buffer: Buffer

  constructor(file: Express.Multer.File | MFile) {
    this.buffer = file.buffer
    this.originalname = file.originalname
  }
}
