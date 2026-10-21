### mysql - jsdb

product
+--------------+-------------+------+-----+-------------------+-------------------+
| Field        | Type        | Null | Key | Default           | Extra             |
+--------------+-------------+------+-----+-------------------+-------------------+
| id           | int         | NO   | PRI | NULL              | auto_increment    |
| product_name | varchar(30) | NO   |     | NULL              |                   |
| price        | int         | NO   |     | NULL              |                   |
| created_at   | timestamp   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+--------------+-------------+------+-----+-------------------+-------------------+