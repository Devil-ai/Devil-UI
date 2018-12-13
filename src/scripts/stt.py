import speech_recognition as sr
import webbrowser
import os
import urllib
import sys

try :
	url = "https://www.google.com"
	urllib.urlopen(url)
	status = "Connected"
except :
	status = "Not Connected"
#print status


if status=="Connected" :
	bashCommand = "rec output.wav rate 32k silence 1 0.1 3% 1 3.0 3% &>/dev/null"
	os.system(bashCommand)

	cred="AIzaSyCRptLxqzkiWw4JBwIefCcMuKDJaWGwadE"

	with sr.AudioFile("output.wav") as source:
		a=sr.Recognizer().recognize_google(sr.Recognizer().record(source), cred)

	sys.stdout.write(a)
	sys.exit(0)
else:
	r = sr.Recognizer()  
	with sr.Microphone() as source:
		os.system("clear") 
	# listen for 1 seconds and create the ambient noise energy level  
	r.adjust_for_ambient_noise(source, duration=1)  
	audio = r.listen(source)  
	try:  
		sys.stdout.write(r.recognize_sphinx(audio))
		sys.exit(0)
	except sr.UnknownValueError:  
		sys.stdout.write(" ")
		sys.exit(0)