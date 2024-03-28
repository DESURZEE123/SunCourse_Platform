-- 创建讨论表
CREATE TABLE `platform_schema`.`Discussion` (
  `idDiscussion` INT NOT NULL,
  `idCourse` INT NOT NULL,
  -- 回复的idDiscussion
  `replayId` INT NULL,
  `DisName` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `data` DATETIME NULL,
  `content` VARCHAR(45) NULL,
  PRIMARY KEY (`idDiscussion`)
);

-- 插入讨论数据
INSERT INTO `platform_schema1`.`Discussion` (`idDiscussion`, `idCourse`, `DisName`, `title`, `data`, `content`) VALUES ('1', '1', '提问者', '作业', '2023-03-15 15:11:30', '作业是什么');
INSERT INTO `platform_schema1`.`Discussion` (`idDiscussion`, `idCourse`, `replayId`, `DisName`, `data`, `content`) VALUES ('2', '1', '1', '回答者1', '2023-03-16 15:11:30', '试卷');
INSERT INTO `platform_schema1`.`Discussion` (`idDiscussion`, `idCourse`, `replayId`, `DisName`, `data`, `content`) VALUES ('3', '1', '1', '回答者2', '2023-03-17 15:11:30', '复习');
INSERT INTO `platform_schema1`.`Discussion` (`idDiscussion`, `idCourse`, `replayId`, `DisName`, `data`, `content`) VALUES ('4', '1', '2', '回答1的回答者', '2023-03-17 15:11:30', '试卷1-2');

-- [{"idDiscussion":1,"idCourse":1,"replayId":0,"DisName":"提问者","title":"作业","data":"2023-03-14T16:00:00.000Z","content":"作业是什么","like":1},{"idDiscussion":2,"idCourse":1,"replayId":1,"DisName":"回答者1","title":null,"data":"2023-03-15T16:00:00.000Z","content":"试卷","like":1},{"idDiscussion":3,"idCourse":1,"replayId":1,"DisName":"回答者2","title":null,"data":"2023-03-16T16:00:00.000Z","content":"复习","like":1},{"idDiscussion":4,"idCourse":1,"replayId":2,"DisName":"回答1的回答者","title":null,"data":"2023-03-17T04:00:00.000Z","content":"试卷1-2","like":null},{"idDiscussion":5,"idCourse":1,"replayId":0,"DisName":"提问者2","title":"问题","data":"2023-03-18T03:20:00.000Z","content":"问题2的详情","like":null}]