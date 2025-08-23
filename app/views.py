from django.shortcuts import render,redirect
from .utils.scam_predict import audio_to_text
from .models import SignUp
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib import auth



def home(request):
    return render(request,'index.html')



import tempfile

def analyze(request):
    result = ''
    final_result=''
    if request.method == 'POST':
        input_audio_file = request.FILES.get("audioFile")
        if not input_audio_file:
            print("no file find")
            return render(request, 'analyze.html', {'result': 'No audio file uploaded.'})

        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
            for chunk in input_audio_file.chunks():
                temp_audio.write(chunk)
            temp_audio_path = temp_audio.name

        predicted_result = audio_to_text(temp_audio_path)
        if predicted_result is None:
            result = "Could not analyze the audio. Please try again."
        else:
            label_map = {
                0: "Debt Collection Scam",
                1: "Extortion Scam",
                2: "Fake Law Enforcement Scam",
                3: "Normal",
                4: "Romance Scam",
                5: "Tech Support Scam",
                6: "Workplace Harassment Scam"
            }
            scam_info = {
            "Debt Collection Scam": "Scammers pose as debt collectors, demanding payment for fake or exaggerated debts. They often use threats of arrest or legal action to intimidate victims.",
            "Extortion Scam": "Fraudsters threaten victims with harm, exposure, or legal consequences unless money is paid. These scams often involve impersonation of officials or blackmail tactics.",
            "Fake Law Enforcement Scam": "Criminals impersonate police or government agents, claiming you're under investigation. They demand payment to 'clear your name' or 'secure your assets'.",
            "Romance Scam": "Scammers build emotional relationships online, then fabricate emergencies or financial needs to extract money. Often targets vulnerable individuals seeking companionship.",
            "Tech Support Scam": "Victims receive fake alerts or calls claiming their device is infected. Scammers request remote access or payment for bogus repairs or software.",
            "Workplace Harassment Scam": "Involves threats or manipulation within professional settings, exploiting power dynamics to coerce or defraud individuals. May overlap with extortion or blackmail.",
            "Normal": "No scam detected. The audio appears to be safe and free from fraudulent or manipulative content."
                }
            result = label_map.get(predicted_result, "Unknown label")
            final_result=scam_info.get(result,result)

    return render(request, 'analyze.html', {'result': final_result})

  

from django.contrib.auth.models import User
from django.contrib import messages
from django.shortcuts import render, redirect

def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('signup')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists. Please choose another.")
            return redirect('signup')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect('signup')

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        messages.success(request, "Account created successfully. Please log in.")
        return redirect('login')

    return render(request, 'signup.html')

def login(request):
    if request.method=='POST':
        username=request.POST.get('username')
        password=request.POST.get('password')
        
        user=authenticate(username=username,password=password)

        if user is None :
            messages.success(request,"Invalid credentials")
            print('login failed')
            return redirect('login')
            
        else:
            auth.login(request,user)
            print('login success')
            return redirect('home')    
    return render(request,'login.html')             


def logout(request):
    auth.logout(request)
    return redirect('signup')
