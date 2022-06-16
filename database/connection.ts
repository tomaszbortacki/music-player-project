import { Client } from "pg";

type Request = (query: string) => Promise<any>;

const client = new Client({
  host: process.env.PG_HOST,
  port: (process.env?.PG_PORT as unknown as number) || 5432,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

const request: Request = async (query) => {
  await client.connect();

  return client.query(query, (err, res) => {
    client.end();
    return res;
  });
};

export default request;
