DROP TABLE IF EXISTS radnik CASCADE;
DROP TABLE IF EXISTS sektor CASCADE;
DROP TABLE IF EXISTS obrazovanje CASCADE;
DROP TABLE IF EXISTS preduzece CASCADE;

--**********************************************************************

DROP SEQUENCE IF EXISTS radnik_seq;
DROP SEQUENCE IF EXISTS sektor_seq;
DROP SEQUENCE IF EXISTS obrazovanje_seq;
DROP SEQUENCE IF EXISTS preduzece_seq;

--**********************************************************************
CREATE TABLE obrazovanje (
    id integer not null,
    naziv varchar(100) not null,
    stepen_strucne_spreme varchar(10) not null,
	opis varchar(500) not null
);
ALTER TABLE obrazovanje
	ADD CONSTRAINT PK_Obrazovanje PRIMARY KEY(id);
--**********************************************************************
CREATE TABLE preduzece
(
	id int not null,
	naziv varchar(100) not null,
	pib int not null,
	sediste varchar(100) not null,
	opis varchar(500) not null
);
ALTER TABLE preduzece
	ADD CONSTRAINT PK_preduzece PRIMARY KEY (id);
--**********************************************************************
CREATE TABLE sektor
(
	id int not null,
	naziv varchar(100) not null,
	oznaka varchar(10) not null,
	preduzece int not null
);
ALTER TABLE sektor
	ADD CONSTRAINT PK_Sektor PRIMARY KEY (id),
	ADD CONSTRAINT FK_Sektor_Preduzece FOREIGN KEY (preduzece)
		REFERENCES preduzece(id);
--**********************************************************************
CREATE TABLE radnik (
    id integer not null,
    ime varchar(50) not null,
    prezime varchar(50) not null,
	broj_lk integer not null,
	obrazovanje int not null,
	sektor int not null
);
ALTER TABLE radnik
	ADD CONSTRAINT PK_Radnik PRIMARY KEY(id),
	ADD CONSTRAINT FK_Radnik_Obrazovanje FOREIGN KEY(obrazovanje)
		REFERENCES obrazovanje(id),
	ADD CONSTRAINT FK_Radnik_Sektor FOREIGN KEY (sektor)
		REFERENCES sektor(id);
--**********************************************************************
CREATE INDEX IDXFK_Sektor_Preduzece
	ON sektor(preduzece);

CREATE INDEX IDXFK_Radnik_Obrazovanje
	ON radnik(obrazovanje);

CREATE INDEX IDXFK_Radnik_Sektor
	ON radnik(sektor);
--**********************************************************************
CREATE SEQUENCE radnik_seq
	INCREMENT 1;
	
CREATE SEQUENCE sektor_seq
	INCREMENT 1;
	
CREATE SEQUENCE obrazovanje_seq
	INCREMENT 1;
	
CREATE SEQUENCE preduzece_seq
	INCREMENT 1;
--**********************************************************************