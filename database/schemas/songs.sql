create table public.songs
(
	id_song varchar not null
		constraint songs_pk
			primary key,
	title varchar not null,
	path varchar not null,
	"createdAt" date not null,
	"updatedAt" date
);

alter table public.songs owner to root;

create unique index songs_id_song_uindex
	on public.songs (id_song);

create unique index songs_path_uindex
	on public.songs (path);

create unique index songs_title_uindex
	on public.songs (title);


