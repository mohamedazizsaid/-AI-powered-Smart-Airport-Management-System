import { useState, useCallback } from 'react';
import aiService from '../services/ai.service';
import type { ChatbotResponse } from '../types/api.types';
import { getErrorMessage } from '../services/api';

interface ChatMessage {
    role: 'user' | 'bot';
    text: string;
    sentiment?: string;
    timestamp?: string;
}

export function useChatbot() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'bot',
            text: 'Hello! I am your AI Travel Assistant. How can I help you today?',
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Generate a simple user ID for the session
    const userId = useState(() => `user_${Date.now()}`)[0];

    const sendMessage = useCallback(
        async (query: string) => {
            if (!query.trim()) return;

            // Add user message immediately
            const userMessage: ChatMessage = { role: 'user', text: query };
            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);
            setError(null);

            try {
                const response: ChatbotResponse = await aiService.sendChatMessage(query, userId);

                const botMessage: ChatMessage = {
                    role: 'bot',
                    text: response.response,
                    sentiment: response.sentiment,
                    timestamp: response.timestamp,
                };

                setMessages((prev) => [...prev, botMessage]);
            } catch (err) {
                const errorMsg = getErrorMessage(err);
                setError(errorMsg);

                // Add error message as bot response
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'bot',
                        text: `I'm having trouble connecting to the AI service. ${errorMsg}`,
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        },
        [userId]
    );

    const clearMessages = useCallback(() => {
        setMessages([
            {
                role: 'bot',
                text: 'Hello! I am your AI Travel Assistant. How can I help you today?',
            },
        ]);
        setError(null);
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages,
    };
}

export default useChatbot;
