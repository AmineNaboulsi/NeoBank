-- Active: 1735159369330@@127.0.0.1@3304@bankdb

--Use Bank
 use bankdb ;



--Table Account
CREATE TABLE Account(
    Numero INT AUTO_INCREMENT ,
    Owner VARCHAR(150) UNIQUE,
    Solde DECIMAL,
    Active INT,
    primary key (Numero)
);
INSERT INTO `Account` (Owner , Solde ) VALUES (
        "MainBankAccount" , 14000
);


CALL getAccounts(1,3);

--Table SavingAccount
CREATE TABLE SavingAccount(
    Numero INT AUTO_INCREMENT ,
    Interest_Rate DECIMAL NULL,
    PRIMARY key (Numero),
    Foreign Key (Numero) REFERENCES Account(Numero) ON DELETE CASCADE
);

--Table CurrentAccount
CREATE TABLE CurrentAccount(
    Numero INT AUTO_INCREMENT NOT NULL,
    limitR DECIMAL NULL,
    PRIMARY key (Numero),
    Foreign Key (Numero) REFERENCES Account(Numero) ON DELETE CASCADE
);

--Table BusinessAccount
CREATE TABLE BusinessAccount(
    Numero INT AUTO_INCREMENT NOT NULL,
    FeeT DECIMAL NULL,
    PRIMARY key (Numero),
    Foreign Key (Numero) REFERENCES Account(Numero) ON DELETE CASCADE
);

--Table Transaction
create TABLE Transaction(
    NumeroT INT AUTO_INCREMENT ,
    NumeroSender INT NOT NULL,
    NumeroReceiver INT NOT NULL,
    AMOUNT DECIMAL NOT NULL,
    DateTransaction Date NOT NULL,
    Status INT NOT NULL,
    PRIMARY key (NumeroT),
    Foreign Key (NumeroSender) REFERENCES Account(Numero)  ON DELETE SET NULL,
    Foreign Key (NumeroReceiver) REFERENCES Account(Numero)  ON DELETE SET NULL
);

-- AddSavingAccount Procedure
CREATE PROCEDURE `AddSavingAccount`(
    IN p_Owner VARCHAR(150) ,
    IN p_Solde DECIMAL ,
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

    INSERT INTO `SavingAccount` (Numero  , Interest_Rate ) VALUES (
        IdAccount  , p_Interest_Rate
    );
END

-- AddCurrentAccount Procedure
CREATE PROCEDURE `AddCurrentAccount`(
    IN p_Owner VARCHAR(150) ,
    IN p_Solde DECIMAL ,
    IN p_limitR DECIMAL
)
BEGIN
    -- GET Id Accoutn after inserting 
    DECLARE IdAccount INT;


    INSERT INTO `Account` (Owner , Solde ) VALUES (
        p_Owner , p_Solde
    );

    -- GET last Id inserted
    SET IdAccount = LAST_INSERT_ID();

    INSERT INTO `CurrentAccount` (Numero ,limitR ) VALUES (
        IdAccount , p_limitR 
    );
END

CREATE DEFINER=`bankdb`@`%` PROCEDURE `AddBusinessAccount`(
    IN p_Owner VARCHAR(150) ,
    IN p_Solde DECIMAL ,
    IN p_fee DECIMAL 
)
BEGIN
    -- GET Id Accoutn after inserting 
    DECLARE IdAccount INT;

    INSERT INTO `Account` (Owner , Solde ) VALUES (
        p_Owner , p_Solde
    );

    -- GET last Id inserted
    SET IdAccount = LAST_INSERT_ID();

    INSERT INTO `BusinessAccount` (Numero  , `FeeT` ) VALUES (
        IdAccount  , p_fee
    );
END


DELIMITER //
CREATE PROCEDURE TRANSACTIONMoney(
    IN sender_account VARCHAR(150),
    IN receiver_account VARCHAR(150),
    IN amount_ DECIMAL(10,2),
    OUT status_ INT,
    OUT msg VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Handle SQL exceptions
        ROLLBACK;
        SET status_ = 0;
        SET msg = 'Error transaction';
        
        INSERT INTO `Transaction` (Owner,Receiver,Amount,DateTransaction,Status
        ) VALUES (
            sender_account,
            receiver_account,
            amount_,
            NOW(),
            0
        );
    END;

    -- Start transaction
    START TRANSACTION;

    -- Check amount
    IF (SELECT Solde FROM Account WHERE Numero = sender_account) >= amount_ THEN

        UPDATE Account 
        SET Solde = Solde - amount_ 
        WHERE Numero = sender_account;

        UPDATE Account 
        SET Solde = Solde + amount_ 
        WHERE Numero = receiver_account;

        COMMIT;

        INSERT INTO `Transaction` (
            Owner,
            Receiver,
            Amount,
            DateTransaction,
            Status
        ) VALUES (
            sender_account,
            receiver_account,
            amount,
            NOW(),
            1
        );

        SET status_ = 1;
        SET msg = 'Transaction completed successfully';
    ELSE
        -- Insufficient funds
        ROLLBACK;
        SET status_ = 0;
        SET msg = 'Insufficient funds';
        
        INSERT INTO `Transaction` (
            Owner,
            Receiver,
            Amount,
            DateTransaction,
            Status
        ) VALUES (
            sender_account,
            receiver_account,
            amount,
            NOW(),
            0
        );
    END IF;
END //

CREATE PROCEDURE `getAccounts`(
)
BEGIN
    -- GET Id Accoutn after inserting 
    select "Business Account" as type , a.*  from `BusinessAccount` 
    NATURAL JOIN `Account` a
    UNION 
    select "Current Account" as type , a.*   from `CurrentAccount` 
    NATURAL JOIN `Account` a
    UNION 
    select "Saving Account" as type  , a.*   from `SavingAccount`  
    NATURAL JOIN `Account` a;

END

