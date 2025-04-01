import json
from channels.generic.websocket import AsyncWebsocketConsumer


class Consumer:
    async def connect(self):
        await self.channel_layer.group_add("game_room", self.channel_name)
        await self.accept()
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("game_room", self.channel_name)
        
    async def receive(self, text_data):
        data = json.loads(text_data)
        board = data.get('board')
        
        # Broadcast the board state to all connected clients
        await self.channel_layer.group_send(
            "game_room",
            {
                "type": "game_state",
                "board": board
            }
        )
        
    async def game_state(self, event):
        board = event['board']
        await self.send(text_data=json.dumps({'board': board}))
        