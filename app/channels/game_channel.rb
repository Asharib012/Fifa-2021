class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "GameChannel"
  end

 
end
