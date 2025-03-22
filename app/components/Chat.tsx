'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Chat.module.css';

// 模拟自动回复的消息
const autoReplies = [
    "你好！有什么我可以帮助你的？",
    "这个问题很有趣，让我想想...",
    "我明白你的意思了，你可以尝试这样做...",
    "抱歉，我不太明白你的问题，能否详细解释一下？",
    "好的，我会记住的！"
];

interface Message {
    text: string;
    isUser: boolean;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([
        { text: '欢迎来到聊天室！有什么我可以帮助你的吗？', isUser: false }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 滚动到底部
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 发送消息的函数
    const sendMessage = () => {
        const messageText = inputValue.trim();
        
        if (messageText !== '') {
            // 添加用户消息
            setMessages(prev => [...prev, { text: messageText, isUser: true }]);
            
            // 清空输入框
            setInputValue('');
            
            // 模拟回复（随机选择一条自动回复并延迟显示）
            setTimeout(() => {
                const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
                setMessages(prev => [...prev, { text: randomReply, isUser: false }]);
            }, 1000);
        }
    };

    // 处理按键事件
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <h2>聊天对话</h2>
            </div>
            <div className={styles.chatMessages} id="chatMessages">
                {messages.map((message, index) => (
                    <div key={index} className={styles.messageContainer}>
                        <div className={`${styles.message} ${message.isUser ? styles.userMessage : styles.otherMessage}`}>
                            {message.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={styles.chatInput}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="请输入消息..."
                />
                <button onClick={sendMessage}>发送</button>
            </div>
        </div>
    );
} 