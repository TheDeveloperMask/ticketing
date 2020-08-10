import { Publisher, OrderCancelledEvent, Subjects } from '@cktickets/common';
export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
