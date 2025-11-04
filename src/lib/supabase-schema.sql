-- Enable Row Level Security
alter database set row_security = on;

-- Create priority enum type
create type priority as enum ('urgent', 'high', 'medium', 'low');

-- Create status enum type
create type status as enum ('active', 'completed');

-- Create todos table
create table if not exists public.todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  category text not null default '其他',
  priority priority not null default 'medium',
  status status not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  due_date timestamptz
);

-- Create boards table
create table if not exists public.boards (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  data jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create indexes for better performance
create index if not exists idx_todos_user_id on public.todos(user_id);
create index if not exists idx_todos_status on public.todos(status);
create index if not exists idx_todos_priority on public.todos(priority);
create index if not exists idx_boards_user_id on public.boards(user_id);

-- Enable Row Level Security on todos
alter table public.todos enable row level security;

-- Enable Row Level Security on boards
alter table public.boards enable row level security;

-- Create RLS policies for todos
create policy "Users can view their own todos" on public.todos
  for select using (auth.uid() = user_id);

create policy "Users can insert their own todos" on public.todos
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own todos" on public.todos
  for update using (auth.uid() = user_id);

create policy "Users can delete their own todos" on public.todos
  for delete using (auth.uid() = user_id);

-- Create RLS policies for boards
create policy "Users can view their own boards" on public.boards
  for select using (auth.uid() = user_id);

create policy "Users can insert their own boards" on public.boards
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own boards" on public.boards
  for update using (auth.uid() = user_id);

create policy "Users can delete their own boards" on public.boards
  for delete using (auth.uid() = user_id);

-- Create function to automatically update the updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at on todos
create trigger update_todos_updated_at
  before update on public.todos
  for each row
  execute procedure public.handle_updated_at();

-- Create trigger to automatically update updated_at on boards
create trigger update_boards_updated_at
  before update on public.boards
  for each row
  execute procedure public.handle_updated_at();
