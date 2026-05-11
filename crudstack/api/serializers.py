from rest_framework import serializers
from .models import Note
from django.contrib.auth.models import User

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at']
        # Read-only fields so the user can't maliciously update them
        read_only_fields = ['id', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    # Make sure password is at least 8 characters and write-only (so it doesn't return in the response)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'password', 'email'] # Add 'first_name', 'last_name' if you want

    def create(self, validated_data):
        # User.objects.create_user automatically hashes the password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user