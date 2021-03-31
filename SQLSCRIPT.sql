 DROP USER IF EXISTS projectadmin@localhost;
 FLUSH PRIVILEGES;
 DROP DATABASE IF EXISTS Messagesproject;
 
 create database Messagesproject;
 create user projectadmin@localhost identified by 'tvpassword';
grant all on Messagesproject.* to projectadmin@localhost;
use Messagesproject;
create table Users (
    userId int not null primary key,
    userName varchar(50) not null,
    userPassword varchar(100) not null,
	   salt varchar(100) not null
 );
 insert into Users value(0, 'user1',  '2d36c9cb2ab3b18ca572cb6a596c010524ce59d4ece9728a74e679249eb1242a',  '1234'  );
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
Drop table if exists Chat;

 create table Chat (
    chatId int not null primary key,
    user1 int not null,
    user2 int not null,
     CONSTRAINT FK_chat1 FOREIGN KEY (user1)
     REFERENCES Users(userId),
     CONSTRAINT FK_chat2 FOREIGN KEY (user2)
     REFERENCES Users(userId)
 );
 drop table if exists Message;
create table Message (
   number int not null primary key,
   chatId int not null,
   message varchar(50) not null,
   sender varchar(50) not null, 
   CONSTRAINT FK_chat3 FOREIGN KEY (chatId)
    REFERENCES Chat(chatId)
);
insert into Chat values (1, 5, 4);
insert into Message values (0, 1, 'Hii', 'Lana');
 select * from Chat; 
select * from Message;
