# README
## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|text  |string|     |
|image |sting|      |
|userid|reference|foreign key,index ture|
|groupid|reference|foreign key,index true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name  |string|primaly key,null false,index|
|passward|string|primaly key ,null,false|
|e-mail|string|primaly key,null false|

### Association
- has_many :usergroups
- has_many :groups,through:usergroups
- has_many :chats


## usergroupsテーブル
|Column         |Type      |Options         |
|--------------|----------|----------------|
|group         |references |foreign key true|
|user          |references |foreign key true|

### Association
 belongs_to :user
 belongs_to :group


## groupsテーブル
|Column|Type|Options|
|-----|------|--------|
|name |string|not null|

### Association
- has_many:usergroups
- has_many:users,through:usergroups
- has_many:groups
