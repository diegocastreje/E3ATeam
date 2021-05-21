INSERT INTO `roles` (name) VALUES ('ROLE_CLIENT');
INSERT INTO `roles` (name) VALUES ('ROLE_CLERK');
INSERT INTO `roles` (name) VALUES ('ROLE_ADMIN');

INSERT INTO `payment_methods` (payment_id, description) VALUES (0, 'Card');
INSERT INTO `payment_methods` (payment_id, description) VALUES (1, 'Cash');

INSERT INTO users(nie, username, password, first_name, middle_name, last_name, birth_date, email, role_id, payment_id, first_access) VALUES ('12345678A','diego','1234','Diego', 'Castreje', 'Dominguez', '2000-12-11', 'diegocastreje@gmail.com', 2, 0, true);
INSERT INTO users(nie, username, password, first_name, middle_name, last_name, birth_date, email, role_id, payment_id, first_access) VALUES ('23456789B','niqui','1234','Hector', 'Niqui', 'Piñeiro', '1995-12-01', 'hectorniqui@gmail.com', 1, 1, true);
INSERT INTO users(nie, username, password, first_name, middle_name, last_name, birth_date, email, role_id, payment_id, first_access) VALUES ('34567891C','fran','1234','Fran', 'Novo', 'Rodriguez', '1994-05-23', 'frannovo@gmail.com', 3, 0, true);
INSERT INTO users(nie, username, password, first_name, middle_name, last_name, birth_date, email, role_id, payment_id, first_access) VALUES ('45678912D','marcos','1234','Marcos', 'Pastoriza', 'Perez', '1999-08-15', 'marcospastoriza@gmail.com', 1, 1, true);
INSERT INTO users(nie, username, password, first_name, middle_name, last_name, birth_date, email, role_id, payment_id, first_access) VALUES ('56789123E','leandro','1234','Leandro', 'Tulian', 'Deus', '1998-02-18', 'leandrotulian@gmail.com', 2, 1, true);

INSERT INTO items(name, description, amount, price, category) VALUES ('Pienso 12kg','Pienso Marca Blanca 12kg', 20, 25, 'Comida');
INSERT INTO items(name, description, amount, price, category) VALUES ('Pienso Premium 12kg','Pienso Marca Premium 12kg', 10, 50, 'Comida');
INSERT INTO items(name, description, amount, price, category) VALUES ('Pelota','Pelota pequeña roja', 15, 10, 'Juguete');
INSERT INTO items(name, description, amount, price, category) VALUES ('Collar','Collar azul grande', 10, 15, 'Accesorios');
INSERT INTO items(name, description, amount, price, category) VALUES ('Correa','Correa negra 2m', 10, 15, 'Accesorios');

INSERT INTO `orders` (nie, price) VALUES ('12345678A', 60)
INSERT INTO `orders` (nie, price) VALUES ('34567891C', 60)

INSERT INTO `order_items` (amount, price, item_id, order_id) VALUES (2, 50, 1, 1);
INSERT INTO `order_items` (amount, price, item_id, order_id) VALUES (1, 10, 3, 1);
INSERT INTO `order_items` (amount, price, item_id, order_id) VALUES (5, 250, 2, 2);
