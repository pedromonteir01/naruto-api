CREATE DATABASE narutodata;

\c narutodata;

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    metadata JSONB,
    gender CHAR(1) NOT NULL,
    birthdate DATE
);

CREATE TABLE affiliations (
    name VARCHAR(256) PRIMARY KEY,
    image TEXT NOT NULL
);

CREATE TABLE kekkei_genkai (
    name VARCHAR(100) PRIMARY KEY,
    image TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE kekkei_touta (
    name VARCHAR(15) PRIMARY KEY,
    image TEXT NOT NULL,
    description TEXT NOT NULL
);