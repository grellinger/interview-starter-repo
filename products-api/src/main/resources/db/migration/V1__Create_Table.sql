CREATE TABLE if not exists products (
  id SERIAL PRIMARY KEY,
  name varchar(250) NOT NULL,
  brand varchar(250) NOT NULL,
  price numeric(12, 2) NOT NULL
);