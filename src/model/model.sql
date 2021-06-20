create database supernews;

create extension pgcrypto;

create table users (
  username varchar(24) not null,
  first_name varchar(24) not null,
  last_name varchar(24) not null,
  email varchar(32) not null,
  password varchar(64) not null,
  avatar varchar(64),
  user_id serial not null primary key,
  created_at timestamptz default current_timestamp
);

insert into users (username, first_name, last_name, email, password) values ('john', 'Jhones', 'Doe', 'john@gmail.com', crypt('123', gen_salt('bf')));


create table news (
  title varchar(256) not null,
  content varchar not null,
  img varchar(128) not null,
  category varchar(12),
  created_at timestamp default current_timestamp,
  views int default 0,
  likes smallint default 0,
  dislike int default 0,
  news_id serial not null primary key
);

insert into news values ('Bugun dubayda 2- xalqaro nfgfs hdhdhd dhhdshh!', 'lorem ipsum dolor set amet jfhfgiu dksjjf fmmduu jnjsdkdn', '/images/man.png');

select title, content, img, views, likes, dislike, news_id, extract(year from created_at) as year, extract(month from created_at) as month, extract(day from created_at) as day from news;