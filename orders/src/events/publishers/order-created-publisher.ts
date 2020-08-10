import { Publisher, Subjects, OrderCreatedEvent } from '@cktickets/common';
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
