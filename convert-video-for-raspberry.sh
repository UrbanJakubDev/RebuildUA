#!/bin/bash

# Script to convert video to Raspberry Pi optimized format
# Usage: ./convert-video-for-raspberry.sh input.mp4 output.mp4 1280x720
#  - input.mp4:  source file (default: public/videos/GENTEC_EN_720p-LQ-30-s.mp4)
#  - output.mp4: destination file (default: same directory as input, suffix with resolution)
#  - 1280x720:   target resolution in WIDTHxHEIGHT format (default: 1280x720)

INPUT_VIDEO="${1:-public/videos/GENTEC_EN_720p-LQ-30-s.mp4}"
TARGET_RESOLUTION="${3:-1280x720}"

# Validate target resolution format WIDTHxHEIGHT (e.g., 1920x1080)
if [[ ! "$TARGET_RESOLUTION" =~ ^[0-9]+x[0-9]+$ ]]; then
    echo "Error: Target resolution must be in WIDTHxHEIGHT format (e.g., 1920x1080)."
    exit 1
fi

TARGET_WIDTH="${TARGET_RESOLUTION%x*}"
TARGET_HEIGHT="${TARGET_RESOLUTION#*x}"

# Determine default output path if not provided
if [ -z "$2" ]; then
    INPUT_DIR="$(dirname "$INPUT_VIDEO")"
    INPUT_FILENAME="$(basename "$INPUT_VIDEO")"
    INPUT_NAME_NO_EXT="${INPUT_FILENAME%.*}"
    OUTPUT_VIDEO="${INPUT_DIR}/${INPUT_NAME_NO_EXT}-${TARGET_RESOLUTION}-rpi.mp4"
else
    OUTPUT_VIDEO="$2"
fi

echo "Converting video for Raspberry Pi optimization..."
echo "Input: $INPUT_VIDEO"
echo "Output: $OUTPUT_VIDEO"
echo "Target resolution: $TARGET_RESOLUTION"

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
# - Max resolution configurable (default 720p)
# - 30fps (reduces processing load)

if [ "$TARGET_HEIGHT" -ge 1080 ]; then
  MAX_RATE="5M"
  BUF_SIZE="10M"
else
  MAX_RATE="2M"
  BUF_SIZE="4M"
fi

ffmpeg -i "$INPUT_VIDEO" \
  -c:v libx264 \
  -profile:v main \
  -preset medium \
  -crf 23 \
  -maxrate "$MAX_RATE" \
  -bufsize "$BUF_SIZE" \
  -vf "scale=${TARGET_WIDTH}:${TARGET_HEIGHT}:force_original_aspect_ratio=decrease,pad=${TARGET_WIDTH}:${TARGET_HEIGHT}:(ow-iw)/2:(oh-ih)/2" \
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
