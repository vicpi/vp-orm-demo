create database author_books default character set 'utf8';

use author_books;

create table author (
    id int(11) not null primary key auto_increment,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    birth_date datetime not null
);

create table book (
    id int(11) not null primary key auto_increment,
    title varchar(255) not null,
    year datetime not null,
    author_id int(11) not null
);

insert into author (first_name, last_name, birth_date)
    values ('Joanne', 'Rowling', '1965-07-31');

insert into author (first_name, last_name, birth_date)
    values ('Hans Christian', 'Andersen', '1805-04-02');

insert into author (first_name, last_name, birth_date)
    values ('Paulo', 'Coelho', '1947-08-24');

insert into book (title, year, author_id)
    values ('Harry Potter and the Philosopher\'s Stone', '1997-07-26', 1);

insert into book (title, year, author_id)
    values ('The Princess and the Pea', '1835-01-01', 2);

insert into book (title, year, author_id)
    values ('The Alchemist', '1988-01-01', 3);

insert into book (title, year, author_id)
    values ('Eleven Minutes', '2003-01-01', 3);

insert into book (title, year, author_id)
    values ('The Pilgrimage', '1987-01-01', 3);

insert into book (title, year, author_id)
    values ('The Zahir', '2005-01-01', 3);
