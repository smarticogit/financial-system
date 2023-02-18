create database cobranca;

drop table if exists users;

create table if not exists users (
	id serial primary key,
  	name text not null,
  	email text unique not null,
  	password text not null
);