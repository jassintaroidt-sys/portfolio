#!/usr/bin/env bash
# scripts/make-posters.sh — Generate video posters per BRIEF §19.4

mkdir -p public/assets/posters

for video in public/assets/video/*.mp4; do
  [ -e "$video" ] || continue
  filename=$(basename "$video" .mp4)
  out="public/assets/posters/${filename}.jpg"
  if [ ! -f "$out" ]; then
    echo "Generating poster for $filename..."
    ffmpeg -y -i "$video" -ss 00:00:01 -frames:v 1 -vf scale=720:-2 -q:v 3 "$out"
  fi
done

echo "Poster generation finished."
