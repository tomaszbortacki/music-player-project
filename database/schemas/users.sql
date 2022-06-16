create table public.users
(
    id_user     serial
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

