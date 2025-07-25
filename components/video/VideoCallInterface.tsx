import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Monitor, 
  MonitorOff,
  MessageSquare,
  Settings,
  Users,
  Clock,
  Camera,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ArrowLeft,
  CheckCircle,
  Calendar
} from 'lucide-react';

interface VideoCallInterfaceProps {
  onNavigate: (page: string) => void;
  interviewData?: {
    candidateName: string;
    candidateAvatar?: string;
    position: string;
    company: string;
    scheduledTime: Date;
    duration: number;
  };
}

interface CallState {
  isVideoOn: boolean;
  isAudioOn: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
  isFullscreen: boolean;
  callStatus: 'connecting' | 'connected' | 'ended';
  callDuration: number;
}

export function VideoCallInterface({ onNavigate, interviewData }: VideoCallInterfaceProps) {
  const [callState, setCallState] = useState<CallState>({
    isVideoOn: true,
    isAudioOn: true,
    isScreenSharing: false,
    isRecording: false,
    isFullscreen: false,
    callStatus: 'connecting',
    callDuration: 0
  });
  
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, sender: string, message: string, time: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Mock interview data
  const defaultInterviewData = {
    candidateName: 'Sarah Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150&h=150&fit=crop&crop=face',
    position: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    scheduledTime: new Date(),
    duration: 60
  };

  const interview = interviewData || defaultInterviewData;

  useEffect(() => {
    // Simulate call connection
    const connectionTimer = setTimeout(() => {
      setCallState(prev => ({ ...prev, callStatus: 'connected' }));
    }, 3000);

    // Start call duration timer
    const durationTimer = setInterval(() => {
      if (callState.callStatus === 'connected') {
        setCallState(prev => ({ ...prev, callDuration: prev.callDuration + 1 }));
      }
    }, 1000);

    // Mock video stream setup
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = new MediaStream();
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = new MediaStream();
    }

    return () => {
      clearTimeout(connectionTimer);
      clearInterval(durationTimer);
    };
  }, [callState.callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setCallState(prev => ({ ...prev, isVideoOn: !prev.isVideoOn }));
  };

  const toggleAudio = () => {
    setCallState(prev => ({ ...prev, isAudioOn: !prev.isAudioOn }));
  };

  const toggleScreenShare = () => {
    setCallState(prev => ({ ...prev, isScreenSharing: !prev.isScreenSharing }));
  };

  const endCall = () => {
    setCallState(prev => ({ ...prev, callStatus: 'ended' }));
    setTimeout(() => onNavigate('dashboard'), 2000);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'You',
        message: newMessage.trim(),
        time: new Date()
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-background/90 border-b border-border p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('dashboard')}
              disabled={callState.callStatus === 'connected'}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-lg">Interview Call</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{interview.position} - {interview.company}</span>
                {callState.callStatus === 'connected' && (
                  <>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(callState.callDuration)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={callState.callStatus === 'connected' ? 'default' : 'secondary'}>
              {callState.callStatus === 'connecting' && 'Connecting...'}
              {callState.callStatus === 'connected' && 'Live'}
              {callState.callStatus === 'ended' && 'Ended'}
            </Badge>
            {callState.isRecording && (
              <Badge variant="destructive">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1" />
                Recording
              </Badge>
            )}
          </div>
        </div>
      </motion.header>

      {/* Main Video Area */}
      <div className="flex-1 relative bg-gray-900">
        {callState.callStatus === 'connecting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-10 bg-background/90"
          >
            <Card className="p-8 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Video className="w-8 h-8 text-primary-foreground" />
              </motion.div>
              <h3 className="mb-2">Connecting to interview...</h3>
              <p className="text-muted-foreground">Please wait while we establish the connection</p>
            </Card>
          </motion.div>
        )}

        {callState.callStatus === 'ended' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center z-10 bg-background/90"
          >
            <Card className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="mb-2">Interview Completed</h3>
              <p className="text-muted-foreground mb-4">
                Total duration: {formatDuration(callState.callDuration)}
              </p>
              <Button onClick={() => onNavigate('dashboard')}>
                Return to Dashboard
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Remote Video */}
        <div className="w-full h-full relative">
          {callState.callStatus === 'connected' ? (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <video 
                ref={remoteVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
              />
              {!callState.isVideoOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={interview.candidateAvatar} />
                    <AvatarFallback className="text-2xl">
                      {interview.candidateName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              {/* Remote user info */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={interview.candidateAvatar} />
                  <AvatarFallback>{interview.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-white text-sm">{interview.candidateName}</span>
                {!callState.isAudioOn && <MicOff className="w-4 h-4 text-red-400" />}
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
        </div>

        {/* Local Video (Picture-in-Picture) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-4 right-4 w-64 h-48 bg-gray-700 rounded-lg overflow-hidden border-2 border-border"
        >
          {callState.isVideoOn ? (
            <video 
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <div className="text-center">
                <VideoOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm text-gray-400">Video Off</span>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 rounded px-2 py-1">
            You
          </div>
        </motion.div>

        {/* Screen Share Indicator */}
        {callState.isScreenSharing && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Sharing Screen
          </div>
        )}
      </div>

      {/* Controls */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-background/95 backdrop-blur-lg border-t border-border p-4"
      >
        <div className="flex items-center justify-center space-x-4">
          {/* Audio Control */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant={callState.isAudioOn ? "outline" : "destructive"}
              onClick={toggleAudio}
              className="w-12 h-12 rounded-full p-0"
            >
              {callState.isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
          </motion.div>

          {/* Video Control */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant={callState.isVideoOn ? "outline" : "destructive"}
              onClick={toggleVideo}
              className="w-12 h-12 rounded-full p-0"
            >
              {callState.isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
          </motion.div>

          {/* Screen Share */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant={callState.isScreenSharing ? "default" : "outline"}
              onClick={toggleScreenShare}
              className="w-12 h-12 rounded-full p-0"
            >
              {callState.isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
            </Button>
          </motion.div>

          {/* Chat */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant={showChat ? "default" : "outline"}
              onClick={() => setShowChat(!showChat)}
              className="w-12 h-12 rounded-full p-0 relative"
            >
              <MessageSquare className="w-5 h-5" />
              {chatMessages.length > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {chatMessages.length}
                </Badge>
              )}
            </Button>
          </motion.div>

          {/* End Call */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="destructive"
              onClick={endCall}
              className="w-12 h-12 rounded-full p-0"
            >
              <PhoneOff className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Settings */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="w-12 h-12 rounded-full p-0"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Call Info */}
        <div className="text-center mt-3 text-sm text-muted-foreground">
          {callState.callStatus === 'connected' && (
            <div className="flex items-center justify-center space-x-4">
              <span>Duration: {formatDuration(callState.callDuration)}</span>
              <span>•</span>
              <span>Participants: 2</span>
              {callState.isRecording && (
                <>
                  <span>•</span>
                  <span className="text-red-500">Recording</span>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed right-0 top-16 bottom-0 w-80 bg-background border-l border-border z-40 flex flex-col"
          >
            <div className="p-4 border-b border-border">
              <h3 className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map(msg => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{msg.sender}</span>
                    <span className="text-xs text-muted-foreground">
                      {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="bg-muted p-2 rounded-lg text-sm">
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-sm"
                />
                <Button size="sm" onClick={sendMessage}>
                  Send
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}