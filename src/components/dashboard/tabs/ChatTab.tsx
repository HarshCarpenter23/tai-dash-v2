import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Upload, Bot, User, Activity } from "lucide-react";
import { aiChatMessages, aiMonitorLogs } from "@/data/mockData";

export function ChatTab() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(aiChatMessages);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      message: message,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: "assistant",
        message: "I'll analyze that request and provide insights based on current market conditions and portfolio metrics.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-danger';
      default: return 'text-primary';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'success': return 'bg-success/10 border-success/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'error': return 'bg-danger/10 border-danger/20';
      default: return 'bg-primary/10 border-primary/20';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)] animate-fade-in">
      {/* AI Chat */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>TAI Assistant</span>
            <Badge variant="outline" className="status-active">Online</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      {msg.sender === 'user' ? 
                        <User className="h-3 w-3" /> : 
                        <Bot className="h-3 w-3" />
                      }
                      <span className="text-xs opacity-70">{msg.timestamp}</span>
                    </div>
                    <div className="text-sm">{msg.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="space-y-3">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask TAI about trading strategies, market analysis, or portfolio optimization..."
              className="min-h-[80px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
              
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Monitor */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-success" />
            <span>AI-to-AI Monitor</span>
            <Badge variant="outline" className="status-active">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-3">
              {aiMonitorLogs.map((log, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getSeverityBg(log.severity)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {log.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${getSeverityColor(log.severity).replace('text-', 'bg-')}`} />
                  </div>
                  <div className="text-sm">{log.message}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}