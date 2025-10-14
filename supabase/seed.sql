-- Supabase schema for NTU STAR WARS Planner

create extension if not exists pgcrypto;

create table if not exists modules (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  au int not null,
  school text,
  description text
);

create table if not exists prerequisites (
  id uuid primary key default gen_random_uuid(),
  module_code text not null references modules(code) on delete cascade,
  requires_code text not null references modules(code) on delete cascade
);

create table if not exists class_indexes (
  id uuid primary key default gen_random_uuid(),
  module_code text not null references modules(code) on delete cascade,
  index_code text not null,
  capacity int,
  day_of_week int not null check (day_of_week between 1 and 7),
  start_time time not null,
  end_time time not null,
  venue text,
  type text check (type in ('LEC','TUT','LAB','SEM','OTH')),
  unique(module_code, index_code, day_of_week, start_time, end_time)
);

create table if not exists plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists plan_modules (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references plans(id) on delete cascade,
  module_code text not null references modules(code) on delete restrict
);

create table if not exists plan_choices (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references plans(id) on delete cascade,
  module_code text not null references modules(code),
  index_code text not null,
  unique(plan_id, module_code)
);

-- Sample data
insert into modules (code, title, au) values
  ('CZ2001','Algorithms','3'),
  ('CZ2002','Database Systems','3'),
  ('CZ2005','Operating Systems','3'),
  ('CZ2006','Software Engineering','3'),
  ('CZ3001','Advanced Computer Architecture','4'),
  ('CZ3003','Software Systems Analysis & Design','4'),
  ('CZ3004','Multidisciplinary Design Project','3'),
  ('CZ3005','Artificial Intelligence','3'),
  ('CZ3006','Net-Centric Computing','3'),
  ('CZ3007','Compiler Techniques','3'),
  ('CZ4001','Virtual & Augmented Reality','3'),
  ('CZ4003','Computer Vision','3'),
  ('CZ4013','Distributed Systems','3'),
  ('CZ4031','Database System Principles','3'),
  ('CZ4034','Information Retrieval','3')
  on conflict do nothing;

insert into class_indexes (module_code, index_code, day_of_week, start_time, end_time, venue, type) values
  -- CZ2001 Algorithms
  ('CZ2001','101',1,'10:30','12:30','LT1','LEC'),
  ('CZ2001','101',3,'10:30','11:30','TR+1','TUT'),
  ('CZ2001','102',2,'14:30','16:30','LT2','LEC'),
  ('CZ2001','102',4,'09:30','10:30','TR+2','TUT'),
  ('CZ2001','103',3,'16:30','18:30','LT1','LEC'),
  ('CZ2001','103',5,'14:30','15:30','TR+1','TUT'),

  -- CZ2002 Database Systems
  ('CZ2002','201',1,'08:30','10:30','LT3','LEC'),
  ('CZ2002','201',5,'10:30','11:30','TR+3','TUT'),
  ('CZ2002','202',2,'12:30','14:30','LT3','LEC'),
  ('CZ2002','202',4,'11:30','12:30','TR+3','TUT'),
  ('CZ2002','203',4,'14:30','16:30','LT3','LEC'),
  ('CZ2002','203',1,'15:30','16:30','TR+3','TUT'),

  -- CZ2005 Operating Systems
  ('CZ2005','301',3,'14:30','16:30','LT4','LEC'),
  ('CZ2005','301',5,'08:30','09:30','TR+4','TUT'),
  ('CZ2005','302',1,'12:30','14:30','LT4','LEC'),
  ('CZ2005','302',4,'12:30','13:30','TR+4','TUT'),

  -- CZ2006 Software Engineering
  ('CZ2006','401',2,'09:30','11:30','LT19','LEC'),
  ('CZ2006','401',4,'16:30','17:30','TR+5','TUT'),
  ('CZ2006','402',1,'14:30','16:30','LT19','LEC'),
  ('CZ2006','402',3,'13:30','14:30','TR+5','TUT'),

  -- CZ3001 Advanced Computer Architecture
  ('CZ3001','501',1,'16:30','18:30','LT5','LEC'),
  ('CZ3001','501',2,'08:30','10:30','LAB1','LAB'),
  ('CZ3001','502',3,'09:30','11:30','LT5','LEC'),
  ('CZ3001','502',4,'08:30','10:30','LAB2','LAB'),

  -- CZ3003 Software Systems Analysis & Design
  ('CZ3003','601',2,'16:30','18:30','LT7','LEC'),
  ('CZ3003','601',5,'13:30','15:30','TR+6','TUT'),
  ('CZ3003','602',4,'09:30','11:30','LT7','LEC'),
  ('CZ3003','602',1,'09:30','11:30','TR+6','TUT'),

  -- CZ3004 Multidisciplinary Design Project
  ('CZ3004','701',2,'10:30','12:30','LT8','LEC'),
  ('CZ3004','701',3,'16:30','19:30','LAB3','LAB'),
  ('CZ3004','702',5,'09:30','11:30','LT8','LEC'),
  ('CZ3004','702',1,'16:30','19:30','LAB4','LAB'),

  -- CZ3005 Artificial Intelligence
  ('CZ3005','801',1,'09:30','11:30','LT9','LEC'),
  ('CZ3005','801',4,'14:30','15:30','TR+7','TUT'),
  ('CZ3005','802',3,'13:30','15:30','LT9','LEC'),
  ('CZ3005','802',2,'15:30','16:30','TR+7','TUT'),

  -- CZ3006 Net-Centric Computing
  ('CZ3006','901',2,'08:30','10:30','LT10','LEC'),
  ('CZ3006','901',5,'16:30','17:30','TR+8','TUT'),
  ('CZ3006','902',4,'13:30','15:30','LT10','LEC'),
  ('CZ3006','902',1,'11:30','12:30','TR+8','TUT'),

  -- CZ3007 Compiler Techniques
  ('CZ3007','1001',3,'08:30','10:30','LT11','LEC'),
  ('CZ3007','1001',1,'13:30','15:30','LAB5','LAB'),
  ('CZ3007','1002',5,'11:30','13:30','LT11','LEC'),
  ('CZ3007','1002',3,'13:30','15:30','LAB6','LAB'),

  -- CZ4001 Virtual & Augmented Reality
  ('CZ4001','1101',1,'11:30','13:30','LT12','LEC'),
  ('CZ4001','1101',3,'11:30','13:30','LAB7','LAB'),
  ('CZ4001','1102',4,'16:30','18:30','LT12','LEC'),
  ('CZ4001','1102',2,'13:30','15:30','LAB8','LAB'),

  -- CZ4003 Computer Vision
  ('CZ4003','1201',2,'11:30','13:30','LT13','LEC'),
  ('CZ4003','1201',5,'09:30','11:30','TR+9','TUT'),
  ('CZ4003','1202',4,'08:30','10:30','LT13','LEC'),
  ('CZ4003','1202',1,'16:30','18:30','TR+9','TUT'),

  -- CZ4013 Distributed Systems
  ('CZ4013','1301',3,'12:30','14:30','LT14','LEC'),
  ('CZ4013','1301',5,'15:30','16:30','TR+10','TUT'),
  ('CZ4013','1302',1,'08:30','10:30','LT14','LEC'),
  ('CZ4013','1302',2,'16:30','17:30','TR+10','TUT'),

  -- CZ4031 Database System Principles
  ('CZ4031','1401',2,'14:30','16:30','LT15','LEC'),
  ('CZ4031','1401',4,'10:30','12:30','LAB9','LAB'),
  ('CZ4031','1402',5,'14:30','16:30','LT15','LEC'),
  ('CZ4031','1402',3,'09:30','11:30','LAB10','LAB'),

  -- CZ4034 Information Retrieval
  ('CZ4034','1501',1,'15:30','17:30','LT16','LEC'),
  ('CZ4034','1501',4,'15:30','16:30','TR+11','TUT'),
  ('CZ4034','1502',3,'10:30','12:30','LT16','LEC'),
  ('CZ4034','1502',5,'12:30','13:30','TR+11','TUT')
  on conflict do nothing;
