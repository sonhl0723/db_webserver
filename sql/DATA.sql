DELIMITER $$
DROP PROCEDURE IF EXISTS InsertRoom$$
CREATE PROCEDURE InsertRoom()
BEGIN
	DECLARE i INT DEFAULT 101;
	WHILE i <= 120 DO
		INSERT INTO room VALUES (i,"AVAILABLE");
		SET i = i + 1;
	END WHILE;
    
    SET i = 201;
    while i <= 220 DO
		INSERT INTO room VALUES (i,"AVAILABLE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 301;
    while i <= 320 DO
		INSERT INTO room VALUES (i,"AVAILABLE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 401;
    while i <= 420 DO
		INSERT INTO room VALUES (i,"AVAILABLE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 501;
    while i <= 520 DO
		INSERT INTO room VALUES (i,"AVAILABLE");
        SET i = i + 1;
	END WHILE;
END$$
DELIMITER $$

CALL InsertRoom();
