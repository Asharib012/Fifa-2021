import consumer from './consumer'

consumer.subscriptions.create('ChatChannel', {
  received (data) {
    if (data.cableReady) CableReady.perform(data.operations)
  }
})
