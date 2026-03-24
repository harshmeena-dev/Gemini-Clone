import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

class GeminiChat:
    def __init__(self):  # Fixed: Added double underscores
        # Initialize the new GenAI Client
        self.client = genai.Client(api_key=os.getenv("API_KEY"))
        self.model_id = "gemini-3-flash-preview"
        # The new SDK handles history more efficiently using start_chat
        self.chat_session = self.client.chats.create(model=self.model_id)

    def send(self, prompt):
        if not prompt or not prompt.strip():
            return ""
        try:
            # We use the chat session so the model remembers previous context
            response = self.chat_session.send_message(prompt)
            return response.text
        except Exception as e:
            return f"Error: {e}"

    def history(self):
        # Returns the message history from the session
        history_list = []
        for message in self.chat_session.history:
            history_list.append({
                "role": message.role,
                "content": message.parts[0].text
            })
        return history_list

    def clear(self):
        # Reset the session to clear memory
        self.chat_session = self.client.chats.create(model=self.model_id)


if __name__ == "__main__":
    g = GeminiChat()
    
    print("--- First Message ---")
    print(g.send("Hi, my name is Alex."))
    
    print("\n--- Second Message (Context Check) ---")
    print(g.send("What is my name?")) 
