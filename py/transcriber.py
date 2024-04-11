import os
import sys
import whisper

# directory = sys.argv[1]

# if not directory or not os.path.isdir(directory):
#     print("directory provided or invalid")
#     sys.exit(1)

# files = os.listdir(directory)


file = sys.argv[1]


model = whisper.load_model('base')
audio = whisper.load_audio(file)
result = whisper.transcribe(model, audio)

print(result['text'])
