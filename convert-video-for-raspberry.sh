#!/bin/bash

# Script to convert video to Raspberry Pi optimized format
# Usage: ./convert-video-for-raspberry.sh input.mp4 output.mp4

INPUT_VIDEO="${1:-public/videos/GENTEC_EN_720p-LQ-30-s.mp4}"
OUTPUT_VIDEO="${2:-public/videos/GENTEC_EN_720p-LQ-30-s-rpi.mp4}"

echo "Converting video for Raspberry Pi optimization..."
echo "Input: $INPUT_VIDEO"
echo "Output: $OUTPUT_VIDEO"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed."
    echo "Install it with: brew install ffmpeg (on macOS)"
    echo "or: sudo apt-get install ffmpeg (on Linux)"
    exit 1
fi

# Convert video optimized for Raspberry Pi:
# - H.264 codec (libx264) - best supported on Raspberry Pi
# - Main profile (good balance of compatibility and quality)
# - CRF 23 (good quality, reasonable file size)
# - Preset medium (balance between encoding speed and file size)
# - AAC audio codec (widely supported)
# - Max resolution 720p (optimal for Raspberry Pi performance)
# - 30fps (reduces processing load)
ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 \
  -profile:v main \
  -preset medium \
  -crf 23 \
  -maxrate 2M \
  -bufsize 4M \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -r 30 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -pix_fmt yuv420p \
  "$OUTPUT_VIDEO"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Conversion successful!"
    echo "Optimized video saved to: $OUTPUT_VIDEO"
    echo ""
    echo "File sizes:"
    ls -lh "$INPUT_VIDEO" "$OUTPUT_VIDEO"
else
    echo ""
    echo "❌ Conversion failed!"
    exit 1
fi
