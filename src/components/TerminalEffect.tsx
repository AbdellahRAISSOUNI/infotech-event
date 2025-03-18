'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalEffectProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const TerminalEffect: React.FC<TerminalEffectProps> = ({ 
  position = 'bottom-right' 
}) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Commands to display
  const commands = [
    'ping system.infotech.edu',
    'nmap -sS system.infotech.edu',
    'ssh admin@infotech.edu',
    'cd /var/www/html',
    'sudo chmod 755 countdown.sh',
    './countdown.sh --start',
    'cat /etc/passwd',
    'sudo service apache2 restart',
    'git clone https://github.com/infotech/event.git',
    'npm run build',
    'access_code --decrypt 26042024',
    'mv payload.exe /usr/bin/',
    './execute --force',
  ];
  
  // Response for commands
  const getCommandResponse = (cmd: string): string => {
    if (cmd.includes('ping')) return 'PING successful: 4 packets transmitted, 4 received, 0% packet loss';
    if (cmd.includes('nmap')) return 'Scan completed: 4 ports open (22/ssh, 80/http, 443/https, 1337/custom)';
    if (cmd.includes('ssh')) return 'Access granted. Welcome, admin';
    if (cmd.includes('cd')) return 'Directory changed';
    if (cmd.includes('chmod')) return 'Permissions updated';
    if (cmd.includes('./countdown')) return 'Countdown initialized...';
    if (cmd.includes('cat')) return 'File contents displayed: 7 user accounts found';
    if (cmd.includes('service')) return 'Service restarted successfully';
    if (cmd.includes('git clone')) return 'Cloning into event.git... Complete';
    if (cmd.includes('npm')) return 'Build completed successfully';
    if (cmd.includes('access_code')) return 'Code decryption successful. Verification: DELTA-SIX-ECHO';
    if (cmd.includes('mv')) return 'File moved successfully';
    if (cmd.includes('./execute')) return 'Execution in progress... 100% Complete';
    return 'Command executed successfully';
  };
  
  // Simulate typing and executing commands
  useEffect(() => {
    const executeRandomCommand = () => {
      setIsTyping(true);
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      let typedCmd = '';
      
      const typeInterval = setInterval(() => {
        if (typedCmd.length < randomCommand.length) {
          typedCmd += randomCommand[typedCmd.length];
          setCurrentCommand(typedCmd);
        } else {
          clearInterval(typeInterval);
          
          // Command completed - show response
          setTimeout(() => {
            setIsTyping(false);
            setCommandHistory(prev => [
              ...prev, 
              `$ ${randomCommand}`, 
              getCommandResponse(randomCommand)
            ].slice(-6)); // Keep only last 6 items
            setCurrentCommand('');
            
            // Schedule next command
            timeoutRef.current = setTimeout(executeRandomCommand, 4000 + Math.random() * 4000);
          }, 500);
        }
      }, 100 + Math.random() * 50);
    };
    
    // Start the sequence
    timeoutRef.current = setTimeout(executeRandomCommand, 2000);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  // Position classes
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  }[position];
  
  return (
    <motion.div 
      className={`fixed ${positionClasses} w-80 h-48 bg-black/90 z-10 rounded-md overflow-hidden border border-green-500/40`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.9, y: 0 }}
      transition={{ duration: 0.5, delay: 3 }}
    >
      <div className="h-5 bg-green-900/30 flex items-center px-2">
        <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></div>
        <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
        <span className="text-xs text-green-400 font-mono">terminal@infotech:~</span>
      </div>
      
      <div className="p-2 font-mono text-xs text-green-400 h-[calc(100%-20px)] overflow-auto">
        {commandHistory.map((line, index) => (
          <div key={index} className={line.startsWith('$') ? 'font-bold' : 'opacity-80 pl-2'}>
            {line}
          </div>
        ))}
        
        {isTyping && (
          <div className="font-bold flex">
            <span>$ {currentCommand}</span>
            <span className="w-2 h-4 bg-green-500 ml-0.5 animate-pulse"></span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TerminalEffect; 