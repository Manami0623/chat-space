 README
## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|text  |string|     |
|image |sting|      |
|user_id|reference|foreign key,index true|
|group_id|reference|foreign key,index true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name  |string|primary key,null false,index|

### Association
- has_many :usergroups
- has_many :groups,through: :usergroups
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
- has_many:users,through: :usergroups
- has_many:chats
