title:  "MYSQL主从同步错误解决"
date:  2012-11-15 19:57
tags: [IT,MYSQL,数据库]
---
首先，如果遇到主键冲突： 
`Last_SQL_Error: Error 'Duplicate entry '1001-164761-0' for key 'PRIMARY'' on query. Default database: 'bug'. Query: 'insert into misdata (uid,mid,pid,state,mtime) values (164761,1001,0,-1,1262623560)'` 

__A.可以先将冲突的记录删除，然后再进行一下方法：__

进入主库锁表，

FLUSH TABLES WITH READ LOCK;
<!--more-->
mysql>show master status;


+-------------------+-----------+--------------+------------------+


| File | Position | Binlog\_Do\_DB | Binlog\_Ignore\_DB |


+-------------------+-----------+--------------+------------------+


| ufo.000063 | 159164526 | | |</p>
+-------------------+-----------+--------------+------------------+


1 row in set (0.00 sec)</p>
进入从库


mysql>slave stop;


mysql>change master to master\_log\_file='ufo.000063', master\_log\_pos=159164526;


完成上面这些后


mysql>slave start;


回到主库


unlock tables; 解锁


回到从库查看


show slave status \G;


__B.另外，可以在热备时跳过冲突的记录：__


slave stop;

set global sql\_slave\_skip\_counter=10;  //跳过10个错误

slave start;

show slave status \G;

__C.修改从库的/etc/my.cnf文件__

在[mysqld]下面加入slave-skip-errors = 1062 (忽略所有的1062错误)

重启下从库的mysql

__D.修改binlog_format的格式为mixed__

进入从库查看show global variables like 'binlog\_format'，如果是statement，修改从库的 my.cfg，在[mysqld]下面添加binlog\_format=mixed，然后重启数据库