CREATE DATABASE Caritas;
USE Caritas; 

CREATE TABLE users (UserId INT NOT NULL IDENTITY(1,1), FirstName NVARCHAR(20) NOT NULL, LastName NVARCHAR(20) NOT NULL, Email NVARCHAR(20) NOT NULL, Password NVARCHAR(255) NOT NULL,PRIMARY KEY (Userid));

INSERT INTO users (FirstName,LastName,email,password) VALUES ('Juan','Perez','jaun@caritas.com', '1234')
INSERT INTO users (FirstName,LastName,email,password) VALUES ('Lorena','Garza','lorena@caritas.com', '1234')
INSERT INTO users (FirstName,LastName,email,password) VALUES ('Gerardo','Rojo','gerardo@caritas.com', '1234')
INSERT INTO users (FirstName,LastName,email,password) VALUES ('Ruben','Velazques','ruben@caritas.com', '1234')
INSERT INTO users (FirstName,LastName,email,password) VALUES ('Sara','Connor','sara@caritas.com', '1234')
INSERT INTO users (FirstName,LastName,email,password) VALUES ('Sofia','Gomez','sofia@caritas.com', '1234')
INSERT INTO users (FirstName,LastName,email,password) VALUES ('Ana','Garza','ana@caritas.com', '1234')
INSERT INTO users (FirstName,LastName,email,password) VALUES ('John','Connor','john@caritas.com', '1234')


CREATE TABLE tickets(TicketId INT NOT NULL IDENTITY(1,1), Title NVARCHAR(40) NOT NULL, Department NVARCHAR(20) NOT NULL, Description NVARCHAR(255) NOT NULL, Date DATE NOT NULL, Status BIT, UserId INT, PRIMARY KEY (TicketId), FOREIGN KEY (UserId) REFERENCES users(UserId))



INSERT INTO tickets (title,department,description,date,status,userid) VALUES ('Impresa sin tinta', 'Finanzas','En la tarde se quedo sin tinta', '2021-11-03','0','7');
INSERT INTO tickets (title,department,description,date,status,userid) VALUES ('Clima fallando', 'Finanzas','Durante la tarde el clima comenzo a tirar agua', '2021-11-03','0','7');
INSERT INTO tickets (title,department,description,date,status,userid) VALUES ('Problemas con mi ordenador','Sistemas','Mi computadora no me deja entrar al sistema','2021-11-03','0','8');
INSERT INTO tickets (title,department,description,date,status,userid) VALUES ('El internet falla', 'Sistemas','Desde las 8 am el internet esta muy lento', '2021-11-03','0','8');


