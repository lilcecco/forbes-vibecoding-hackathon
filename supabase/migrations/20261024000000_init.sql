-- Coach: schema iniziale. Lettura pubblica per la demo dell'hackathon (nessun login).
create table public.members (
  id text primary key,
  name text not null,
  role text not null,
  area text not null,
  level text not null,
  practice_minutes int not null default 0,
  roleplays int not null default 0,
  avg_score numeric(2,1) not null default 0,
  trend numeric(2,1) not null default 0,
  last_active date not null default current_date
);

create table public.documents (
  id text primary key,
  name text not null,
  kind text not null,
  status text not null default 'in elaborazione',
  lessons int not null default 0,
  size_kb int not null default 0,
  uploaded_at date not null default current_date,
  uploaded_by text not null
);

create table public.lessons (
  id text primary key,
  document_id text not null references public.documents(id) on delete cascade,
  title text not null,
  minutes int not null,
  progress int not null default 0,
  chapters text[] not null default '{}'
);

create table public.scenarios (
  id text primary key,
  title text not null,
  persona text not null,
  persona_role text not null,
  area text not null,
  difficulty text not null,
  minutes int not null,
  description text not null,
  competencies text[] not null default '{}'
);

create table public.sessions (
  id text primary key,
  scenario_id text not null references public.scenarios(id) on delete cascade,
  member_id text not null references public.members(id) on delete cascade,
  date date not null default current_date,
  duration_sec int not null,
  score numeric(2,1) not null,
  competency_scores jsonb not null default '{}',
  feedback jsonb not null default '[]'
);

create index on public.lessons (document_id);
create index on public.sessions (scenario_id);
create index on public.sessions (member_id);

alter table public.members enable row level security;
alter table public.documents enable row level security;
alter table public.lessons enable row level security;
alter table public.scenarios enable row level security;
alter table public.sessions enable row level security;

create policy "demo read" on public.members for select to anon, authenticated using (true);
create policy "demo read" on public.documents for select to anon, authenticated using (true);
create policy "demo read" on public.lessons for select to anon, authenticated using (true);
create policy "demo read" on public.scenarios for select to anon, authenticated using (true);
create policy "demo read" on public.sessions for select to anon, authenticated using (true);
