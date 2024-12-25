-- Active: 1735159369330@@127.0.0.1@3304@bankdb
use bankdb ;

SELECT * from `Account`
NATURAL JOIN `SavingAccount`;
CREATE TABLE Account(
    Numero INT AUTO_INCREMENT ,
    Owner VARCHAR(150),
    Solde DECIMAL,
    primary key (Numero)
);
  
CREATE TABLE SavingAccount(
    Numero INT NOT NULL,
    Minimum_Solde DECIMAL NULL,
    Interest_Rate DECIMAL NULL,
    Foreign Key (Numero) REFERENCES Account(Numero) on Delete Set NULL
);
CREATE TABLE CurrentAccount(
    Numero INT NOT NULL,
    limitR DECIMAL NULL,
    Foreign Key (Numero) REFERENCES Account(Numero)
);

-- Active: 1735159369330@@127.0.0.1@3304@bankdb
CREATE PROCEDURE AddSavingAccount
(
    IN p_Owner VARCHAR(150) ,
    IN p_Solde DECIMAL ,
    IN p_Minimum_Solde DECIMAL ,
    IN p_Interest_Rate DECIMAL 
)
BEGIN
    -- GET Id Accoutn after inserting 
    DECLARE IdAccount INT;


    INSERT INTO `Account` (Owner , Solde ) VALUES (
        p_Owner , p_Solde
    );

    -- GET last Id inserted
    SET IdAccount = LAST_INSERT_ID();

    INSERT INTO `SavingAccount` (Numero ,Minimum_Solde , Interest_Rate ) VALUES (
        IdAccount , p_Minimum_Solde , p_Interest_Rate
    );
END;

select * from Account;