INSERT INTO payment_methods (payment_id, description) VALUES (0, 'Card');
INSERT INTO payment_methods (payment_id, description) VALUES (1, 'Cash');


INSERT INTO users(username, password, first_name, middle_name, last_name, birth_date, email, /*role_id,*/ payment_id, first_access, enabled) VALUES ('admin','$2a$10$0Y/GEZlcuywGyTY1pk86BubbsxlfnJCl.GycZE/NlngN9jBa/63Dm','admin', 'admin', 'admin', '2000-12-11', 'admin@gmail.com', /*2,*/ 0, true, 1);
INSERT INTO users(username, password, first_name, middle_name, last_name, birth_date, email, /*role_id,*/ payment_id, first_access, enabled) VALUES ('diego','$2a$10$0Y/GEZlcuywGyTY1pk86BubbsxlfnJCl.GycZE/NlngN9jBa/63Dm','Diego', 'Castreje', 'Dominguez', '2000-12-11', 'diegocastreje@gmail.com', /*2,*/ 0, true, 1);
INSERT INTO users(username, password, first_name, middle_name, last_name, birth_date, email, /*role_id,*/ payment_id, first_access, enabled) VALUES ('niqui','$2a$10$td/wccN3kvnP2wG05OtCWuZfcwRb4wIuiF3HHPSHydvs41CfVMtLe','Hector', 'Niqui', 'Piñeiro', '1995-12-01', 'hectorniqui@gmail.com', /*1,*/ 1, true, 1);
INSERT INTO users(username, password, first_name, middle_name, last_name, birth_date, email, /*role_id,*/ payment_id, first_access, enabled) VALUES ('fran','$2a$10$TDL4qV1uTaAygvU3KawGnuQgwl2xNbq6io4N6C48tECodWdG3b7IW','Fran', 'Novo', 'Rodriguez', '1994-05-23', 'frannovo@gmail.com', /*3,*/ 0, true, true);
INSERT INTO users(username, password, first_name, middle_name, last_name, birth_date, email, /*role_id,*/ payment_id, first_access, enabled) VALUES ('marcos','$2a$10$L2GXanpjmIsHn5zrUlKr0ux9SGHk2QIbyFmj1WNSfAQQDA5SCEvYy','Marcos', 'Pastoriza', 'Perez', '1999-08-15', 'marcospastoriza@gmail.com', /*1,*/ 1, true, 1);
INSERT INTO users(username, password, first_name, middle_name, last_name, birth_date, email, /*role_id,*/ payment_id, first_access, enabled) VALUES ('leandro','$2a$10$Xe.dH2P8pVsRYOKjggTRMOlarUzQzsZnhGNDyL1lm7wB4lpuDXQoO','Leandro', 'Tulian', 'Deus', '1998-02-18', 'leandrotulian@gmail.com', /*2,*/ 1, true, 1);

INSERT INTO roles (name) VALUES ('ROLE_CLIENT');
INSERT INTO roles (name) VALUES ('ROLE_CLERK');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');

INSERT INTO users_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO users_roles (user_id, role_id) VALUES (2, 3);
INSERT INTO users_roles (user_id, role_id) VALUES (3, 2);
INSERT INTO users_roles (user_id, role_id) VALUES (4, 1);
INSERT INTO users_roles (user_id, role_id) VALUES (5, 1);
INSERT INTO users_roles (user_id, role_id) VALUES (6, 2);

INSERT INTO items(name, description, amount, price, category) VALUES ('','', 0, 0, '');

INSERT INTO items(name, description, amount, price, category) VALUES ('Pienso 12kg','Pienso Marca Blanca 12kg', 20, 25, 'Comida');
INSERT INTO items(name, description, amount, price, category) VALUES ('Pienso Premium 12kg','Pienso Marca Premium 12kg', 10, 50, 'Comida');
INSERT INTO items(name, description, amount, price, category) VALUES ('Pelota','Pelota pequeña roja', 15, 10, 'Juguete');
INSERT INTO items(name, description, amount, price, category) VALUES ('Collar','Collar azul grande', 10, 15, 'Accesorios');
INSERT INTO items(name, description, amount, price, category) VALUES ('Correa','Correa negra 2m', 10, 15, 'Accesorios');

INSERT INTO orders (user_id, price) VALUES (2, 60);
INSERT INTO orders (user_id, price) VALUES (4, 250);

INSERT INTO `order_items` (amount, price, item_id, order_id) VALUES (2, 50, 2, 1);
INSERT INTO `order_items` (amount, price, item_id, order_id) VALUES (1, 10, 3, 1);
INSERT INTO `order_items` (amount, price, item_id, order_id) VALUES (5, 250, 4, 2);
