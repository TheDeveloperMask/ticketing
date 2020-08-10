import mongoose from 'mongoose';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledEvent, OrderStatus } from '@cktickets/common';
import { Order } from '../../../models/order';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = await Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: 'dafa',
    version: 0,
  });

  await order.save();

  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: 'dfads',
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};

it('', async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('acks the message', async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
