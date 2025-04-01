from rest_framework import serializers


class GameStateSerializer(serializers.Serializer):
    board = serializers.ListField(
        child = serializers.CharField(allow_null=True),
        min_length = 9,
        max_length = 9
    )