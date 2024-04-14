import os
import sys
import whisper


if len(sys.argv) < 2:
	print("<!> directory not provided")
	sys.exit(1)

path = sys.argv[1]
lang = sys.argv[2] if len(sys.argv) > 2 else 'en'

if not path or not os.path.isdir(path):
    print("<!> directory not provided or invalid")
    sys.exit(1)

folder_name = path.split('/')[-1]

all_files = sorted(os.listdir(path))
files = list(filter(lambda file: file.lower().endswith('.wav'), all_files))
file_count = len(files)


model = whisper.load_model('base')

transcript = ''
outfile = os.path.join(path, folder_name) + '.md'

print('transcribing...')

with open(outfile, 'w') as file:
	file.write('')


for (i, file) in enumerate(files):
	print(f'({i+1:02}/{file_count:02})')

	audio = whisper.load_audio(os.path.join(path, file))
	result = whisper.transcribe(model, audio, language=lang, fp16=False)	
	text = result['text']
	index = int(file.split('.')[0][3:])

	transcript += f'## {index}\n\n'
	transcript += f'{text}\n\n\n'

	with open(outfile, 'w') as file:
		file.write(transcript)


print('done!')
