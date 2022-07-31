export class SystemTicketModel {
  userId: number;
  ticketId: number;
  size: number;
  fileName: String;
  used: boolean;

  constructor(userId: number, ticketId: number, size: number, fileName: String, used: boolean) {
    this.userId = userId;
    this.ticketId = ticketId;
    this.size = size;
    this.fileName = fileName;
    this.used = used;
  }
}
