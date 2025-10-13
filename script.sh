#!/bin/bash

# Path to Python script
PYTHON_SCRIPT="script.py"

# Run script every minute for 24 hours
END=$(( $(date +%s) + 24*60*60 ))

while [ $(date +%s) -lt $END ]; do
    /Users/noahbradley/Desktop/code/fantasy_hockey/venv/bin/python3 "$PYTHON_SCRIPT"
    sleep 60
done
