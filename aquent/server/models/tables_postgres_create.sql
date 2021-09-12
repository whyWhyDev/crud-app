
-- SQL SCHEMA 

CREATE TABLE public.contacts (
  _id serial PRIMARY KEY NOT NULL,
  contact_first_name varchar NOT NULL,
  contact_last_name varchar NOT NULL,
  contact_company_id integer DEFAULT 0,
  contact_company_name varchar,
  contact_email varchar NOT NULL,
  contact_street varchar NOT NULL,
  contact_state varchar NOT NULL,
  contact_city varchar NOT NULL,
  contact_zip_code varchar NOT NULL
);

CREATE TABLE public.companies (
  _id serial PRIMARY KEY NOT NULL,
  company_name varchar NOT NULL,
  company_phone varchar NOT NULL,
  company_uri varchar NOT NULL,
  company_street varchar NOT NULL,
  company_state varchar NOT NULL,
  company_city varchar NOT NULL,
  company_zip_code varchar NOT NULL
);

ALTER TABLE public.contacts ADD CONSTRAINT "contacts_fk0" FOREIGN KEY (contact_company_id) REFERENCES public.companies(_id);


-- INSERT INTO contacts (contact_first_name, contact_last_name, contact_company_id, contact_email, contact_street, contact_state, contact_city, contact_zip_code) 
-- VALUES ('Kas', 'Qudj', 9, 'bb@bbb.com', '456 ja St', 'New York', 'NY', '10451');