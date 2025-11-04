from flask import Flask, request, send_file
from gtts import gTTS
import os
from moviepy.editor import ImageClip, AudioFileClip

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate_video():
    topic = request.json.get('topic', 'No topic provided')
    
    # AI Voiceover (gTTS - no API key, unlimited)
    tts = gTTS(f"Hi! Today's trending topic is: {topic}. This is an AI-generated summary for educational purposes.", lang='en')
    tts.save("speech.mp3")
    
    # Combine with static image (upload your own presenter.jpg to repo)
    audio = AudioFileClip("speech.mp3")
    clip = ImageClip("presenter.jpg").set_duration(audio.duration + 1)
    clip = clip.set_audio(audio)
    clip.write_videofile("output.mp4", fps=24, codec="libx264", audio_codec="aac")
    
    return send_file("output.mp4", as_attachment=True)