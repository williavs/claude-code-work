"""
Prompt management utility for hooks.
Centralizes all AI prompts for consistency and maintainability.
"""

from pathlib import Path


def load_prompt(prompt_name: str) -> str:
    """Load a prompt from the prompts directory."""
    prompts_dir = Path(__file__).parent.parent / "prompts"
    prompt_file = prompts_dir / f"{prompt_name}.txt"
    
    if not prompt_file.exists():
        raise FileNotFoundError(f"Prompt file not found: {prompt_file}")
    
    return prompt_file.read_text().strip()


def get_stop_completion_prompt() -> str:
    """Get the stop completion prompt."""
    return load_prompt("stop_completion")


def get_notification_request_prompt() -> str:
    """Get the notification request prompt."""
    return load_prompt("notification_request")


def get_subagent_completion_prompt() -> str:
    """Get the subagent completion prompt."""
    return load_prompt("subagent_completion")