INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme","opis")
VALUES (nextval('obrazovanje_seq'), 'osnovne akademske studije', 'sesti nivo', 'neki opis');
INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme","opis")
VALUES (nextval('obrazovanje_seq'), 'osnovne strukovne studije', 'sesti nivo', 'neki opis 2');
INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme","opis")
VALUES (nextval('obrazovanje_seq'), 'srednja strucna sprema', '4. nivo', 'neki opis 3');
INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme","opis")
VALUES (nextval('obrazovanje_seq'), 'osnovne akademske studije', 'sesti nivo', 'neki opis 4');
INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme","opis")
VALUES (nextval('obrazovanje_seq'), 'doktorske studije', 'osmi nivo', 'neki opis 5');

INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme","opis")
VALUES (-100, 'insert skripta', 'osmi nivo', 'neki opis 5');
--**********************************************************************
INSERT INTO "preduzece"("id", "naziv", "pib","sediste","opis")
VALUES (nextval('preduzece_seq'), 'Vega IT', 568745,'Novi Sad', 'neki opis');
INSERT INTO "preduzece"("id", "naziv", "pib","sediste","opis")
VALUES (nextval('preduzece_seq'), 'Execom Serbia', 967458,'Novi Sad', 'neki opis');
INSERT INTO "preduzece"("id", "naziv", "pib","sediste","opis")
VALUES (nextval('preduzece_seq'), 'levi nine', 420158,'Muiderstraat 11011 PZ AmsterdamThe Netherlands', 'neki opis');
INSERT INTO "preduzece"("id", "naziv", "pib","sediste","opis")
VALUES (nextval('preduzece_seq'), 'Schneider Electric', 568745,'Rueil-Malmaison, Paris, France', 'neki opis');
INSERT INTO "preduzece"("id", "naziv", "pib","sediste","opis")
VALUES (nextval('preduzece_seq'), 'Nova Lite', 123456,'Novi Sad', 'neki opis');
INSERT INTO "preduzece"("id", "naziv", "pib","sediste","opis")
VALUES (-100, 'insertPreduzece', 568745,'Novi Sad', 'neki opis');
--**********************************************************************
INSERT INTO "sektor"("id", "naziv", "oznaka","preduzece")
VALUES (nextval('sektor_seq'), 'Front end', '1a',1);
INSERT INTO "sektor"("id", "naziv", "oznaka","preduzece")
VALUES (nextval('sektor_seq'), 'Back end', '2b',2);
INSERT INTO "sektor"("id", "naziv", "oznaka","preduzece")
VALUES (nextval('sektor_seq'), 'QA', '3c',1);
INSERT INTO "sektor"("id", "naziv", "oznaka","preduzece")
VALUES (nextval('sektor_seq'), 'Marketing', '4d',4);
INSERT INTO "sektor"("id", "naziv", "oznaka","preduzece")
VALUES (nextval('sektor_seq'), 'HR', '5e',3);
INSERT INTO "sektor"("id", "naziv", "oznaka","preduzece")
VALUES (-100, 'insert into', '1a',1);
--**********************************************************************
INSERT INTO "radnik"("id", "ime", "prezime","broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Aca', 'Ilic',123123, 1, 2);
INSERT INTO "radnik"("id", "ime", "prezime","broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Pera', 'Peric',456456, 3, 4);
INSERT INTO "radnik"("id", "ime", "prezime","broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'John', 'Doe',789789, 2, 1);
INSERT INTO "radnik"("id", "ime", "prezime","broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Nikola', 'Nikolic',987654, 5, 2);
INSERT INTO "radnik"("id", "ime", "prezime","broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Marko', 'Markovic',654321, 1, 2);
INSERT INTO "radnik"("id", "ime", "prezime","broj_lk", "obrazovanje", "sektor")
VALUES (-100, 'La', 'La',123123, 1, 2);
--**********************************************************************