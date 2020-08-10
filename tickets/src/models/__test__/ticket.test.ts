import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
  // Create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  // Save the ticket to the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstace = await Ticket.findById(ticket.id);

  // console.log('step 1 - firstInstance: ', firstInstance);
  // console.log('step 1 - secondInstace: ', secondInstace);

  // make two separate changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstace!.set({ price: 15 });

  // save the first fetched ticket
  await firstInstance!.save();

  // console.log('step 2 - firstInstance: ', firstInstance);
  // console.log('step 2  - secondInstace: ', secondInstace);

  // save the second fetched ticket and expect an error
  // await secondInstace!.save();

  // option 1
  // expect(async () => {
  //   await secondInstace!.save();
  // }).toThrow();

  // option 2
  try {
    await secondInstace!.save();
  } catch (err) {
    return done();
  }

  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
