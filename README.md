## chatテーブル
|Column|Type|Options|
|------|----|-------|
|text  |string|     |
|image |sting|      |
|userid|reference|foreign key,index|
|groupid|reference|foreign key,index|

## usersテーブル
Column|Type|Options|
|------|----|-------|
|name  |string|primaly key,not null index|
|passward|string|primaly key ,not null index|
|e-mail|string|primaly key,not null index|

## usergroupsテーブル
Column         |Type      |Options    |
|--------------|----------|-----------|
|users grounps |reference |foreign key
|group id      |reference |foreign key

## groupsテーブル
Column|Type|Options|
|-----|------|--------|
|name |string|not null|



### Association
- belongs_to :group
- belongs_to :user
-has_many :user, through: :chat
-has_many :group, through: :chat
