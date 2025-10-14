-- Optional Row Level Security policies for plans
alter table plans enable row level security;
alter table plan_modules enable row level security;
alter table plan_choices enable row level security;

create policy "owner read/write plans" on plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "owner read/write plan modules" on plan_modules
  for all using (
    exists(select 1 from plans p where p.id = plan_id and p.user_id = auth.uid())
  ) with check (
    exists(select 1 from plans p where p.id = plan_id and p.user_id = auth.uid())
  );

create policy "owner read/write plan choices" on plan_choices
  for all using (
    exists(select 1 from plans p where p.id = plan_id and p.user_id = auth.uid())
  ) with check (
    exists(select 1 from plans p where p.id = plan_id and p.user_id = auth.uid())
  );
