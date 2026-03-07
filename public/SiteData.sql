CREATE DATABASE SiteData;

use SiteData;


TRUNCATE TABLE reports;
CREATE Table Users(
  ID int AUTO_INCREMENT,
  Username VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Status VARCHAR(255) NOT NULL,
  Grade VARCHAR(255) NOT NULL,
  Session VARCHAR(255) not NULL,
  PRIMARY key (ID)
)

create Table reports(
    ID int AUTO_INCREMENT,
    UserId int not NULL,
create Table reports(
    ID int AUTO_INCREMENT,
    report JSON,
    Status VARCHAR(255),
    PRIMARY KEY(ID),
    Foreign Key (UserId) REFERENCES Users(ID)
)

create Table Chats(
    ID int AUTO_INCREMENT,
    User1 int not NULL,
    User2 int not NULL,
    Chat JSON not NULL,
    PRIMARY KEY (ID),
    Foreign Key (User1) REFERENCES Users(ID),
    Foreign Key (User2) REFERENCES Users(ID)
    
)

