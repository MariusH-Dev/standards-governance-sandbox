const expected = process.env.EXPECTED;
if (process.env.AUTHOR !== expected) {
  console.error(`PR author ${process.env.AUTHOR} is not ${expected}`);
  process.exit(1);
}
