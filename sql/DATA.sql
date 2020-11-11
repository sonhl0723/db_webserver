-- 2~8층 20개, 9층 10개, 10층 5개
-- 방 호수 저장해주는 파일
DELIMITER $$
DROP PROCEDURE IF EXISTS InsertRoom$$
CREATE PROCEDURE InsertRoom()
BEGIN
	DECLARE i INT DEFAULT 201;
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
    
    SET i = 601;
    while i <= 620 DO
		INSERT INTO room VALUES (i,"AVAILABLE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 701;
    while i <= 720 DO
		INSERT INTO room VALUES (i,"AVAILABLE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 801;
    while i <= 820 DO
		INSERT INTO room VALUES (i,"AVAILABLE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 901;
    while i <= 910 DO
		INSERT INTO room VALUES (i,"AVAILABLE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 1001;
    while i <= 1005 DO
		INSERT INTO room VALUES (i,"AVAILABLE");
        SET i = i + 1;
	END WHILE;
END$$
DELIMITER $$

CALL InsertRoom();
