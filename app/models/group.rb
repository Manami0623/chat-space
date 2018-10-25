class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  validates :name, presence: true
  has_many :messages

  validates :name, presence: true

    def show_last_message
      if (last_message = messages.last).present?
        last_message.content? ? last_message.content : '画像の投稿があります'
      else
        'まだメッセージがありません。'
      end

    # def show_member
    #    if (members = groups.name).present?
    #    members.content ? ?members.content
    #     else
    #   'まだメンバーはいません。'
    #   end
    # end
  end
end
