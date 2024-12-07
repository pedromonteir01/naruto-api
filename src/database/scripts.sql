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

CREATE TABLE attributes (
    name VARCHAR(256) PRIMARY KEY,
    description TEXT NOT NULL,
    generate_by_comunnity BOOLEAN NOT NULL
);

CREATE TABLE affiliations (
    name VARCHAR(256) PRIMARY KEY,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    generate_by_comunnity BOOLEAN NOT NULL
);

CREATE TABLE kekkei_genkai (
    name VARCHAR(100) PRIMARY KEY,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    generate_by_comunnity BOOLEAN NOT NULL
);

CREATE TABLE kekkei_touta (
    name VARCHAR(15) PRIMARY KEY,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    generate_by_comunnity BOOLEAN NOT NULL
);

INSERT INTO kekkei_genkai (name, image, description, generate_by_comunnity) VALUES
('Sharingan', 'test.png', 'O Sharingan é uma habilidade ocular dos membros do clã Uchiha, permitindo copiar jutsus e prever movimentos.', FALSE),
('Byakugan', 'test.png', 'O Byakugan é uma habilidade ocular do clã Hyuga que proporciona uma visão quase completa ao redor do usuário e permite enxergar o fluxo de chakra.', FALSE),
('Rinnegan', 'test.png', 'O Rinnegan é uma das três grandes técnicas oculares, dando ao usuário acesso a habilidades incríveis, incluindo o controle sobre a gravidade.', FALSE),
('Shikotsumyaku', 'test.png', 'A Kekkei Genkai do clã Kaguya permite manipular os ossos como armas ou ferramentas em batalha.', FALSE),
('Jinton', 'test.png', 'O Jinton é uma Kekkei Tōta que combina Fogo, Terra e Vento para criar um poder destrutivo que desintegra qualquer coisa em seu alcance.', FALSE),
('Mokuton', 'test.png', 'A liberação de Madeira permite manipular a madeira e usá-la como armas ou estruturas defensivas.', FALSE),
('Ice Release', 'test.png', 'A liberação de Gelo combina as naturezas de Água e Vento para criar e manipular gelo.', FALSE),
('Boil Release', 'test.png', 'A liberação de Fervura combina Fogo e Água para criar vapor altamente corrosivo.', FALSE),
('Lava Release', 'test.png', 'A liberação de Lava combina Fogo e Terra para criar lava e outros materiais fundidos.', FALSE),
('Storm Release', 'test.png', 'A liberação de Tempestade combina Raio e Água para criar feixes de energia controlados.', FALSE),
('Explosion Release', 'test.png', 'A liberação de Explosão combina Terra e Raio para criar explosões poderosas.', FALSE),
('Scorch Release', 'test.png', 'A liberação de Escaldante combina Fogo e Vento para criar calor extremo capaz de vaporizar o alvo.', FALSE),
('Magnet Release', 'test.png', 'A liberação de Magnetismo combina Terra e Raio para manipular metais e criar ataques magnéticos.', FALSE),
('Crystal Release', 'test.png', 'A liberação de Cristal permite a criação e manipulação de cristais sólidos em várias formas.', FALSE),
('Dust Release', 'test.png', 'A liberação de Pó combina Fogo, Terra e Vento para desintegrar alvos com precisão.', FALSE),
('Swift Release', 'test.png', 'A liberação de Velocidade permite movimentos tão rápidos que o usuário parece desaparecer.', FALSE),
('Dark Release', 'test.png', 'A liberação Escura permite absorver e manipular chakra inimigo.', FALSE),
('Wood Release', 'test.png', 'A liberação de Madeira combina Terra e Água para criar madeira e manipular plantas.', FALSE),
('Steel Release', 'test.png', 'A liberação de Aço aumenta a durabilidade e resistência física do corpo do usuário.', FALSE),
('Blaze Release', 'test.png', 'A liberação de Chamas Negras permite manipular o Amaterasu para criar ataques mortais de fogo.', FALSE);

INSERT INTO kekkei_touta (name, image, description, generate_by_comunnity) VALUES
('Jinton', 'teste.png', 'A Kekkei Tōta que combina as naturezas Fogo, Terra e Vento, criando a Liberação de Poeira.', FALSE),
('Shakuton', 'teste.png', 'Uma Kekkei Tōta que combina as naturezas Fogo e Vento, permitindo criar calor intenso.', FALSE),
('Yoton', 'teste.png', 'A Kekkei Tōta que combina Fogo e Terra, criando lava em várias formas.', FALSE);