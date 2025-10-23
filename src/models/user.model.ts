export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export const users: User[] = [
  {
    id: 1,
    username: "maryjane",
    email: "maryjane@test.com",
    password: "123456",
  },
];
