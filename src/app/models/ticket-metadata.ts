export class TicketMetadata {
  userId:number;
  fileName:String;
  fileSize:number;

  constructor(userId: number, fileName: String, fileSize: number) {
    this.userId = userId;
    this.fileName = fileName;
    this.fileSize = fileSize;
  }

  public toDict(){
    return {
      "userId": String(this.userId),
      "fileName": this.fileName,
      "fileSize": String(this.fileSize)
    }
  }
}
