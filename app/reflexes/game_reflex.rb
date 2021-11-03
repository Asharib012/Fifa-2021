class GameReflex < ApplicationReflex
  def update(game_id, minutes, user_id)
    game = Game.find(game_id)
    minute = game.minutes

    if game.update(minutes: minutes)
      morph "#game_#{game_id}", render(partial: "games/game", locals: { game: game })
      morph "#add-minutes-text", "#{Game.sum(:minutes)} minutes added to compaign"
      morph "#notify", "#{Game.sum(:minutes)} minutes added to compaign"
    end

    if minute < game.minutes 
       Notification.create(recipient_id: "1", user_id: User.find(user_id).id, action: "bought")
    else 
      Notification.create( recipient_id: "1",user_id: User.find(user_id).id, action: "returned")
    end
    cable_ready.console_log(message: "Cable Ready rocks!").broadcast
    
    cable_ready["GameChannel"].prepend(
      selector: ".notify",
      html: render(partial: "games/notifications", locals: { notifications: Notification.last })
    ).broadcast 
    cable_ready["GameChannel"].inner_html(
      selector: "#badge",
      html: " "
    ).broadcast 
   
  end
end
