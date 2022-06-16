create table public.users
(
    id_user     varchar not null
        constraint users_pk
            primary key,
    email       varchar not null,
    password    varchar not null,
    firstname   varchar,
    lastname    varchar,
    birthday    date,
    permission  integer not null,
    "createdAt" date,
    "updatedAt" date
);

alter table public.users
    owner to root;

create unique index users_id_user_uindex
    on public.users (id_user);

INSERT INTO public.users (id_user, email, password, firstname, lastname, birthday, permission, "createdAt", "updatedAt") VALUES ('717baaa6-8bf2-4107-aa97-cdc6e4001c92', 'tomasz.bortacki99@gmail.com', '$2a$10$L6uofNpi47oQ1jqcNpKkYucDdQqrV5Q4xSFtp.l2Crnr3zkjl6I7m', null, null, null, 1, '2022-06-16', '2022-06-16');
INSERT INTO public.users (id_user, email, password, firstname, lastname, birthday, permission, "createdAt", "updatedAt") VALUES ('3c33a3e0-514a-4420-b0a9-39ee9fbadba2', 'user@vendor.pl', '$2a$10$s6n7GIvpF1r3NxY0mK1cHepMK1qiQ7qNpsflTmE9aB/4Gx6k6ZLii', null, null, null, 1, '2022-06-16', '2022-06-16');
INSERT INTO public.users (id_user, email, password, firstname, lastname, birthday, permission, "createdAt", "updatedAt") VALUES ('a7041136-2e10-4348-9ce5-14d75e68a6f3', 'admin@vendor.pl', '$2a$10$.ssQsnPQRfUNytvPRt81C.RhtNc8o4K4oZHTPTBvnA9cuzbeXMoQ6', null, null, null, 0, '2022-06-16', '2022-06-16');


