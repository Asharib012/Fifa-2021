import CableReady from 'cable_ready'

import consumer from "./consumer"

consumer.subscriptions.create("GameChannel", {
  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log(CableReady)
    if (data.cableReady) {
      CableReady.perform(data.operations)
    }
  }
});
