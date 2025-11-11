#!/usr/bin/env bash
curl -X POST http://localhost:4000/api/_seed -H "Content-Type: application/json" -d '{"items":[{"name":"Taj Mahal","slug":"taj-mahal","description":"Agra, India"},{"name":"Hampi","slug":"hampi","description":"Historic ruins"},{"name":"Ladakh","slug":"ladakh","description":"Mountain region"}]}'
