conda activate talkieai-server
pip3 install -r requirements.txt
start /b uvicorn app.main:app --host 0.0.0.0 --port 8097
