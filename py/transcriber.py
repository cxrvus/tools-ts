import os
import sys
import whisper


if len(sys.argv) < 2:
	print("<!> directory not provided")
	sys.exit(1)

path = sys.argv[1]

if not path or not os.path.isdir(path):
    print("<!> directory not provided or invalid")
    sys.exit(1)

folder_name = path.split('/')[-1]

all_files = sorted(os.listdir(path))
files = list(filter(lambda file: file.lower().endswith('.wav'), all_files))
file_count = len(files)


model = whisper.load_model('base')

transcript = ''
outfile = os.path.join(path, folder_name) + '.txt'

print('transcribing...')

with open(outfile, 'w') as file:
	file.write('')

for (i, file) in enumerate(files):
	print(f'({i+1:02}/{file_count:02})')
	audio = whisper.load_audio(os.path.join(path, file))
	result = whisper.transcribe(model, audio, language='en', fp16=False)	
	transcript += f'## {file}\n\n'
	transcript += f'{result["text"]}\n\n\n'
	with open(outfile, 'w') as file:
		file.write(transcript)

print('done!')
