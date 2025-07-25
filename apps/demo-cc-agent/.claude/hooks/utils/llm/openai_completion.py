#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "openai",
#     "python-dotenv",
# ]
# ///

"""
OpenAI completion utility for contextual responses.
Uses the new OpenAI Responses API for generating contextual completions.
"""

import os
import json
import sys
from openai import OpenAI

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass


def detect_casual_request(prompt):
    """
    Detect if this is a casual request (joke, story, etc.) vs coding task.
    Returns (is_casual, request_type)
    """
    prompt_lower = prompt.lower().strip()
    
    casual_patterns = {
        'joke': ['joke', 'funny', 'humor', 'laugh', 'comedy'],
        'story': ['story', 'tale', 'narrative'],
        'greeting': ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
        'question': ['what is', 'how do', 'explain', 'tell me about'],
    }
    
    for request_type, patterns in casual_patterns.items():
        for pattern in patterns:
            if pattern in prompt_lower:
                return True, request_type
    
    return False, None


def generate_contextual_response(prompt, repo_name, request_type="joke"):
    """
    Generate contextual response using OpenAI's new Responses API.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None
    
    try:
        client = OpenAI(api_key=api_key)
        
        # Create context-aware system instruction
        system_instruction = f"""You are a helpful AI assistant working in the {repo_name} repository. 
The user has made a casual request during their coding session. 
Respond in a friendly, contextual way that acknowledges their current work environment.
Keep responses concise and appropriate for a developer taking a quick break."""
        
        # Customize prompt based on request type
        if request_type == "joke":
            enhanced_prompt = f"""The user is working in the {repo_name} repository and asked: "{prompt}"

Tell a programming or tech-related joke that's appropriate for a developer. 
Make it short and punchy - perfect for a quick laugh during coding."""
        
        elif request_type == "story":
            enhanced_prompt = f"""The user is working in the {repo_name} repository and asked: "{prompt}"

Tell a very brief story (2-3 sentences) related to programming or their current work."""
        
        else:
            enhanced_prompt = f"""The user is working in the {repo_name} repository and asked: "{prompt}"

Respond helpfully and contextually."""
        
        # Use the new Responses API
        response = client.responses.create(
            model="gpt-4.1-nano",  # Using fastest, most cost-effective model
            input=enhanced_prompt,
            instructions=system_instruction,
            temperature=0.8,  # Slightly creative for jokes/stories
            max_output_tokens=150,  # Keep it concise
            store=False,  # Don't store casual responses
        )
        
        # Extract the text response
        if response.output and len(response.output) > 0:
            message = response.output[0]
            if message.content and len(message.content) > 0:
                return message.content[0].text.strip()
        
        return None
        
    except Exception as e:
        print(f"OpenAI API error: {e}", file=sys.stderr)
        return None


def main():
    """CLI interface for testing."""
    if len(sys.argv) < 2:
        print("Usage: openai_completion.py <prompt> [repo_name]")
        sys.exit(1)
    
    prompt = sys.argv[1]
    repo_name = sys.argv[2] if len(sys.argv) > 2 else "current-project"
    
    is_casual, request_type = detect_casual_request(prompt)
    
    if is_casual:
        response = generate_contextual_response(prompt, repo_name, request_type)
        if response:
            print(response)
        else:
            print("Sorry, couldn't generate a response right now.")
    else:
        print("This doesn't appear to be a casual request.")


if __name__ == "__main__":
    main()