from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

class ContactView(APIView):

    def post(self, request):
        data = request.data

        name = data.get('name')
        email = data.get('email')
        profession = data.get('profession')
        subject = data.get('subject')
        message = data.get('message')

        if not all([name, email, subject, message]):
            return Response(
                {"error": "Champs obligatoires manquants"},
                status=status.HTTP_400_BAD_REQUEST
            )

        email_message = f"""
Nom : {name}
Email : {email}
Profession : {profession}

Message :
{message}
        """

        send_mail(
            subject=f"[Sociora] {subject}",
            message=email_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=['socioratech@gmail.com'],
            fail_silently=False,
        )

        return Response(
            {"success": "Message envoyé avec succès"},
            status=status.HTTP_200_OK
        )
