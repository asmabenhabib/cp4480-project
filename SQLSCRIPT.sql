 DROP USER IF EXISTS projectadmin;
 DROP DATABASE IF EXISTS Messagesproject;
 
 create database Messagesproject;
 create user projectadmin@localhost identified by 'tvpassword';
grant all on Messagesproject.* to projectadmin@localhost;
use Messagesproject;
create table Users (
    userId int not null primary key,
    userName varchar(50) not null,
    userPassword varchar(50) not null
 );
insert into Users value(0, 'user1', 'password1');
insert into Users value(0, 'user2', 'password2');
insert into Users value(0, 'user3', 'password3');
insert into Users value(0, 'user4', 'password4');
insert into Users value(0, 'user5', 'password5');
insert into Users value(0, 'admin', 'passwordadmin');
Drop table Chat;

 create table Chat (
    chatId int not null primary key,
    user1 int not null,
    user2 int not null,
     CONSTRAINT FK_chat FOREIGN KEY (user1)
     REFERENCES Users(userId),
     CONSTRAINT FK_chat FOREIGN KEY (user2)
     REFERENCES Users(userId)
 );
 drop table Message;
create table Message (
   number int not null primary key,
   chatId int not null,
   message varchar(50) not null,
   sender varchar(50) not null, 
   CONSTRAINT FK_chat FOREIGN KEY (chatId)
    REFERENCES chat(chatId)
);
insert into Chat values (1, 'admin', 'Lana');
insert into messages values (0, 1, 'Hii', 'Lana');
 select * from Chat; 
select * from Message;
