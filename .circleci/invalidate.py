import os 
import sys
import boto3
import argparse
from time import time
from urllib.parse import quote

# I want to add actual argparsing eventually
# parser=argparse.ArgumentParser()

# parser.add_argument('--distribution', 
# 	help='AWS Cloudfront Distribution ID to invalidate')

# parser.add_argument('--directory', 
# 	help='Root web directory (location of index.html entry point)')
	


PATHS = []
CLIENT = boto3.client('cloudfront')
PUBLIC_DIR = '../public'

try:
	DISTRIBUTION_ID = sys.argv[1]
except IndexError: 
	print('Please provide distribution ID as argument')
	sys.exit(1)


def format_path(paths):
	path = ''
	for string in paths: 
		path += string

	return "%20".join(path.split())\
		.replace(PUBLIC_DIR, '')\
		.replace('//', '/')\
		.replace(' ', '%20')


for directory in os.walk(PUBLIC_DIR):
	for filename in directory[2]:

		if filename == 'index.html':
			path = directory[0] + '/'
			PATHS.append(format_path([path, filename]))
			PATHS.append(format_path([path]))

		if ".pdf" in filename:
			PATHS.append(format_path([
				directory[0] + '/', 
				filename]))


print(f'Invalidating {len(PATHS)} paths:')
print(PATHS)


response = CLIENT.create_invalidation(
    DistributionId=DISTRIBUTION_ID,
    InvalidationBatch={
        'Paths': {
            'Quantity': len(PATHS),
            'Items': PATHS,
            },
        'CallerReference': str(time()).replace(".", "")
        }
    )


