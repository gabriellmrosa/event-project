beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((msg) => {
    const knownMessages = [
      'null value in column',
      'invalid input syntax for type uuid',
      'insert or update on table',
      'violates foreign key constraint',
      'violates not-null constraint',
      'violates check constraint',
      'violates unique constraint',
      'invalid input value',
    ];

    if (
      typeof msg === 'string' &&
      knownMessages.some((knownMsg) => msg.includes(knownMsg))
    ) {
      return;
    }

    // Remova o console.log para evitar ruído extra
  });
});
