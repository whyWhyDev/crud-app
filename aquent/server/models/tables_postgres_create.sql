
-- SQL SCHEMA 

CREATE TABLE public.contacts (
  _id serial PRIMARY KEY NOT NULL,
  first_name varchar NOT NULL,
  last_name varchar NOT NULL,
  email varchar NOT NULL,
  street varchar NOT NULL,
  state varchar NOT NULL,
  city varchar NOT NULL,
  zip_code varchar NOT NULL,
  company_id integer DEFAULT 0,
  company_name varchar DEFAULT ''
);

CREATE TABLE public.companies (
  _id serial PRIMARY KEY NOT NULL,
  name varchar NOT NULL,
  phone varchar NOT NULL,
  uri varchar NOT NULL,
  street varchar NOT NULL,
  state varchar NOT NULL,
  city varchar NOT NULL,
  zip_code varchar NOT NULL
);

ALTER TABLE public.contacts ADD CONSTRAINT "contacts_fk0" FOREIGN KEY (contact_company_id) REFERENCES public.companies(_id);


-- INSERT INTO contacts (contact_first_name, contact_last_name, contact_company_id, contact_email, contact_street, contact_state, contact_city, contact_zip_code) 
-- VALUES ('Kas', 'Qudj', 9, 'bb@bbb.com', '456 ja St', 'New York', 'NY', '10451');