create database cobranca;

drop table if exists users;

create table if not exists users (
	id serial primary key,
  	name text not null,
  	email text unique not null,
  	password text not null
);

drop table if exists customers;

create table if not exists customers (
	id serial primary key,
	name text not null,
	cpf text unique,
	phone text,
	email text not null unique,
	address text,
	number text,
	complement text,
	zipcode text,
	district text,
	city text,
	uf text,
	created date,
	updated date,
	createdBy text
);

select * from customers;

ALTER TABLE customers ADD COLUMN status text;

drop table if exists billings;

create table if not exists billings (
	id serial primary key,
	customer_id integer not null,
	description text not null,
	status text not null,
  	amount decimal(10,2),
  	due_date date not null,
	created date,
	updated date,
	createdBy text,
  	foreign key (customer_id) references customers (id)
);

ALTER TABLE billings ALTER COLUMN amount decimal(10,2);

ALTER TABLE billings ALTER COLUMN amount TYPE decimal(10,2) USING amount::numeric(10,2);

