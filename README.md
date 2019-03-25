1) sqlite3.exe  :(2 commands)

 .open users.db 

CREATE TABLE users(
 
  ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,

  Name VARCHAR,
  
  Surname VARCHAR,
  
  Mail VARCHAR,
  
  Date_of_registration DATE,
  
  Phone INTEGER);

2) in CLI Node.js : 
   ts-node app.js

3) How to see resalts? :
   sqlite3.exe:
   
   SELECT * FROM users;

   .mode column

   SELECT * FROM users;

4) For exit
 
  .quit