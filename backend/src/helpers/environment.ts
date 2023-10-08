const environment = {
  password: {
    SALT_ROUNDS: Number.parseInt(process.env.SALT_ROUNDS || '0'),
  },
  jwt: {
    SECRET: process.env.JWT_SECRET,
  },
};

export { environment };
