create table products (
     id uuid primary key default uuid_generate_v4(),
     title text not null,
     description text,
     price integer
)

drop table products


create table stocks (
     id uuid primary key default uuid_generate_v4(),
     product_id uuid,
     product_count integer,
     foreign key ("product_id") references "products" ("id")
     on delete cascade
     on update cascade 
)

drop table stocks

insert into products (title, description, price) values
('product1','Good Product', 40),
('product2','Bad Pruduct', 10)

insert into stocks (product_id, product_count) values
('d91a77b4-3fa0-4565-a20f-20dcd1d8c3f3',4),
('f859f5a5-42b6-4c15-99aa-1ed4c96c0852',2)

insert into products (title, description, price) values ('product3', 'Pruduct', 123) RETURNING id

insert into stocks (product_id, product_count) values ('c1f01eb8-95ad-45c2-9e5b-405e50da82de', 10)

create extension if not exists "uuid-ossp";

select p.id, title, description, price, product_count
from products p inner join stocks s 
on p.id = s.product_id

select p.id, title, description, price, product_count
from products p inner join stocks s 
on p.id = s.product_id 
where p.id = 'f859f5a5-42b6-4c15-99aa-1ed4c96c0852'