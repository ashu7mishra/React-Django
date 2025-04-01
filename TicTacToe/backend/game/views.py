from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .game_logic import check_winner

@api_view(['POST'])
def check_game(request):
    board = request.data.get('board', [None]*9)
    winner = check_winner(board)
    return Response({'winner': winner})
