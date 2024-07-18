#!/bin/bash

# Download video
node download.js

# Check the exit code of the download.js script (optional)
if [[ $? -eq 0 ]]; then
    echo "Downloading completed successfully!"
    
    # Start transcoding
    ./transcode.sh

    if [[ $? -eq 0 ]]; then
        echo "Transcoding completed successfully!"
        # Upload video to S3 bucket
        node upload.js
    else
        echo "Transcoding failed with exit code: $?"
    fi
else
    echo "Node script failed with exit code: $?"
    # Handle the failure (e.g., log error, exit script)
fi