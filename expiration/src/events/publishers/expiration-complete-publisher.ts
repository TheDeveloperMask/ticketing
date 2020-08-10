import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@cktickets/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
