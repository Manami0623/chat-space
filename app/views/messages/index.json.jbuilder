json.array! @new_messages do |message|
  json.content    message.content
  json.id         message.id
  json.user_id    message.user_id
  json.user_name  message.user.name
  json.created_at message.created_at.strftime('%Y/%m/%d %H:%M:%S')
  json.image      message.image.url
end
