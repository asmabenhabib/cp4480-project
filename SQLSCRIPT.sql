
 DROP USER IF EXISTS projectAdmin@localhost;
 FLUSH PRIVILEGES;
 DROP DATABASE IF EXISTS Messagesproject;
 
 create database Messagesproject;
 create user projectAdmin@localhost identified by 'password';
 ALTER USER 'projectAdmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
grant all privileges on *.* to projectAdmin@localhost;
FLUSH PRIVILEGES;
use Messagesproject;
drop table if exists Message;
 Drop table if exists Chat;
drop table if exists users;
create table Users (
    userId int not null primary key,
    userName varchar(50) not null,
    userPassword varchar(100) not null,

	   salt varchar(100) not null
 );
 insert into Users value(0, 'user1',  'f5fadd9727e76b77a72b323fe4ca9c9dde347cbc22cd46d41d6a9376656221ca',  '1234'  );
insert into Users value(1, 'user2', 'c168e0bf782588bc08008fb8e94347a0f0bcf88270ac964f4ba3855e823bb0d9', 'salt');
insert into Users value(2, 'user3', '9f13e3ed8530f84790b7ecaf90fb1088236efa0f54068ad4c6730509b304e2f1', '1245' );
insert into Users value(3, 'user4', '69b0e4db31734a8f948ba29c60734f2fb095947ad1e273a752158d1766e208ed','1122' );
insert into Users value(4, 'user5', 'c0b5a15a7d48c3599179466de09e34ae8990ccfe3d848dfc88140cf354815e43',  '1133');
insert into Users value(5, 'admin','abce24b40530dace5f7f25cf20da1c0f3dba1e302489dec0a19bd8eacf05f9e0',  'admn' );

-- insert into Users value(0, 'user1', 'password1');
-- insert into Users value(1, 'user2', 'password2');
-- insert into Users value(2, 'user3', 'password3');
-- insert into Users value(3, 'user4', 'password4');
-- insert into Users value(4, 'user5', 'password5');
-- insert into Users value(5, 'admin', 'passwordadmin');

 create table Chat (
    chatId int not null primary key,
    user1 int not null,
    user2 int not null,
     CONSTRAINT FK_chat1 FOREIGN KEY (user1)
     REFERENCES Users(userId),
     CONSTRAINT FK_chat2 FOREIGN KEY (user2)
     REFERENCES Users(userId)
 );

create table Message (
   number int not null primary key,
   chatId int not null,
   message varchar(50) not null,

   sender int not null, 
   CONSTRAINT FK_Message FOREIGN KEY (chatId)
    REFERENCES Chat(chatId),
    CONSTRAINT FK_Message2 FOREIGN KEY (sender)
    REFERENCES Users(userId)
);
insert into Chat values (1, 1 , 5);
insert into Message values (0, 1, 'Hii', 1);
 select * from Chat; 
select * from Chat;
select * from Message;
select * from Users
