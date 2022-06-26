create table public.users
(
	id_user varchar not null
		constraint users_pk
			primary key,
	email varchar not null,
	password varchar not null,
	firstname varchar,
	lastname varchar,
	birthday date,
	permission integer not null,
	"createdAt" date,
	"updatedAt" date
);

alter table public.users owner to root;

create unique index users_id_user_uindex
	on public.users (id_user);

create table public.miniatures
(
	id_miniature varchar not null
		constraint miniatures_pk
			primary key,
	path varchar not null,
	"createdAt" date not null,
	"updatedAt" date not null
);

alter table public.miniatures owner to root;

create table public.songs
(
	id_song varchar not null
		constraint songs_pk
			primary key,
	title varchar not null,
	path varchar not null,
	"createdAt" date not null,
	"updatedAt" date,
	id_miniature varchar not null
		constraint id_miniature_pk
			references public.miniatures
);

alter table public.songs owner to root;

create unique index songs_id_song_uindex
	on public.songs (id_song);

create unique index songs_path_uindex
	on public.songs (path);

create unique index songs_title_uindex
	on public.songs (title);

create unique index miniatures_id_miniature_uindex
	on public.miniatures (id_miniature);

INSERT INTO public.users (id_user, email, password, firstname, lastname, birthday, permission, "createdAt", "updatedAt") VALUES ('717baaa6-8bf2-4107-aa97-cdc6e4001c92', 'tomasz.bortacki99@gmail.com', '$2a$10$L6uofNpi47oQ1jqcNpKkYucDdQqrV5Q4xSFtp.l2Crnr3zkjl6I7m', null, null, null, 1, '2022-06-16', '2022-06-16');
INSERT INTO public.users (id_user, email, password, firstname, lastname, birthday, permission, "createdAt", "updatedAt") VALUES ('3c33a3e0-514a-4420-b0a9-39ee9fbadba2', 'user@vendor.pl', '$2a$10$s6n7GIvpF1r3NxY0mK1cHepMK1qiQ7qNpsflTmE9aB/4Gx6k6ZLii', null, null, null, 1, '2022-06-16', '2022-06-16');
INSERT INTO public.users (id_user, email, password, firstname, lastname, birthday, permission, "createdAt", "updatedAt") VALUES ('a7041136-2e10-4348-9ce5-14d75e68a6f3', 'admin@vendor.pl', '$2a$10$.ssQsnPQRfUNytvPRt81C.RhtNc8o4K4oZHTPTBvnA9cuzbeXMoQ6', null, null, null, 0, '2022-06-16', '2022-06-16');

INSERT INTO public.miniatures (id_miniature, path, "createdAt", "updatedAt") VALUES ('default', '/miniatures/default.png', '2022-06-26', '2022-06-26');


