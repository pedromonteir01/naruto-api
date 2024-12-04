CREATE DATABASE narutodata;

\c narutodata;

CREATE TABLE characters (
    name VARCHAR(256),
    description TEXT,
    image TEXT,
    metadata JSONB,
    gender CHAR(1),
    birthdate DATETIME
);

CREATE TABLE affiliations (
    name VARCHAR(256),
    image TEXT
);

CREATE TABLE chakras (
    name VARCHAR(15),
    image TEXT,
    description TEXT
);

CREATE TABLE kekkei_genkai (
    name VARCHAR(100),
    image TEXT,
    description TEXT
);

CREATE TABLE kekkei_touta (
    name VARCHAR(15),
    image TEXT,
    description TEXT
);