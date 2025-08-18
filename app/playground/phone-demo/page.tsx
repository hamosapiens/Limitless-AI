"use client";

import { useState, useEffect } from 'react';
import { 
  Camera, 
  MessageCircle, 
  Phone, 
  Mail, 
  Music, 
  MapPin, 
  Settings, 
  Calendar,
  Clock,
  Heart,
  Tv,
  Mic,
  Download,
  CreditCard,
  Search,
  Video,
  Image,
  Bell,
  FileText,
  Sun,
  Users
} from 'lucide-react';

type AppIconProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  gradient?: string;
  bg?: string;
  textColor?: string;
  iconColor?: string;
  size?: string;
};

const AppIcon = ({ icon: Icon, name, gradient, bg, textColor = "text-white", iconColor = "text-white", size = "w-7 h-7" }: AppIconProps) => (
  <div className="flex flex-col items-center">
    <div className={`w-14 h-14 rounded-xl shadow-lg flex items-center justify-center ${gradient || bg}`}>
      <Icon className={`${size} ${iconColor}`} />
    </div>
    <span className={`text-xs mt-1 font-medium ${textColor} text-center leading-tight`}>
      {name}
    </span>
  </div>
);

const WeatherWidget = () => (
  <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-4 text-white col-span-2 row-span-2">
    <div className="text-sm opacity-90 mb-1">Cupertino</div>
    <div className="text-4xl font-thin mb-2">56°</div>
    <div className="flex items-center text-sm opacity-90">
      <Sun className="w-4 h-4 mr-1" />
      <span>Sunny</span>
    </div>
    <div className="text-sm opacity-75 mt-1">H:77° L:55°</div>
    <div className="absolute bottom-3 left-4 text-xs font-medium">Weather</div>
  </div>
);

const CalendarWidget = () => (
  <div className="bg-gray-900 rounded-2xl p-4 text-white col-span-2 row-span-2 relative">
    <div className="text-red-500 text-xs font-semibold mb-1">MONDAY</div>
    <div className="text-4xl font-light mb-2">10</div>
    <div className="flex items-center text-sm mb-1">
      <Users className="w-3 h-3 mr-1 opacity-60" />
      <span className="text-xs">2 birthdays</span>
    </div>
    <div className="text-red-500 text-xs mb-1">Portfolio work s...</div>
    <div className="text-xs opacity-60">10 - 10:30AM</div>
    <div className="absolute bottom-3 left-4 text-xs font-medium opacity-75">Calendar</div>
  </div>
);

const SearchBar = () => (
  <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl px-4 py-3 mx-4 mb-6">
    <div className="flex items-center text-gray-300">
      <Search className="w-4 h-4 mr-2" />
      <span className="text-sm">Search</span>
    </div>
  </div>
);

export default function PhoneDemo() {
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const apps: AppIconProps[] = [
    // Row 1
    { icon: Video, name: "FaceTime", bg: "bg-green-500" },
    { icon: Calendar, name: "Calendar", bg: "bg-white", iconColor: "text-red-500", textColor: "text-white" },
    { icon: Image, name: "Photos", bg: "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500" },
    { icon: Camera, name: "Camera", bg: "bg-gray-600" },
    
    // Row 2
    { icon: Mail, name: "Mail", bg: "bg-blue-600" },
    { icon: FileText, name: "Notes", bg: "bg-gradient-to-b from-yellow-300 to-yellow-500" },
    { icon: Bell, name: "Reminders", bg: "bg-white", iconColor: "text-blue-500", textColor: "text-white" },
    { icon: Clock, name: "Clock", bg: "bg-black" },
    
    // Row 3
    { icon: FileText, name: "News", bg: "bg-white", iconColor: "text-red-500", textColor: "text-white" },
    { icon: Tv, name: "TV", bg: "bg-black" },
    { icon: Mic, name: "Podcasts", bg: "bg-purple-600" },
    { icon: Download, name: "App Store", bg: "bg-blue-500" },
    
    // Row 4
    { icon: MapPin, name: "Maps", bg: "bg-white", iconColor: "text-blue-500", textColor: "text-white" },
    { icon: Heart, name: "Health", bg: "bg-white", iconColor: "text-red-500", textColor: "text-white" },
    { icon: CreditCard, name: "Wallet", bg: "bg-gradient-to-br from-gray-800 to-black" },
    { icon: Settings, name: "Settings", bg: "bg-gray-500" }
  ];

  const dockApps: AppIconProps[] = [
    { icon: Phone, name: "Phone", bg: "bg-green-500" },
    { icon: MessageCircle, name: "Safari", bg: "bg-blue-500", iconColor: "text-white" },
    { icon: MessageCircle, name: "Messages", bg: "bg-green-500" },
    { icon: Music, name: "Music", bg: "bg-red-500" }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* iPhone Frame - More Accurate */}
      <div className="relative">
        {/* Outer Frame with proper iPhone proportions */}
        <div 
          className="bg-black rounded-[3.5rem] p-[6px] shadow-2xl"
          style={{ width: '340px', height: '720px' }}
        >
          {/* Inner Screen */}
          <div className="w-full h-full bg-black rounded-[3.2rem] overflow-hidden relative">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-black rounded-full z-30 shadow-inner"></div>
            
            {/* Screen Content with gradient background like iOS */}
            <div className="w-full h-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-600 relative">
              
              {/* Status Bar */}
              <div className="flex justify-between items-center text-white text-sm font-semibold px-6 pt-4 pb-2 z-20 relative">
                <div>{currentTime}</div>
                <div className="flex items-center space-x-1">
                  {/* Signal bars */}
                  <div className="flex space-x-1">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                    <div className="w-1 h-3 bg-white rounded-full"></div>
                    <div className="w-1 h-4 bg-white rounded-full"></div>
                    <div className="w-1 h-4 bg-white rounded-full"></div>
                  </div>
                  {/* WiFi */}
                  <div className="w-4 h-3 relative">
                    <div className="absolute bottom-0 left-0 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-0 left-1 w-1 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-0 left-2 w-1 h-3 bg-white rounded-full"></div>
                  </div>
                  {/* Battery */}
                  <div className="w-6 h-3 border border-white rounded-sm relative">
                    <div className="w-4 h-2 bg-white rounded-sm absolute top-0.5 left-0.5"></div>
                    <div className="w-0.5 h-1 bg-white rounded-r absolute top-1 -right-1"></div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="px-4 pb-28 h-full overflow-y-auto scrollbar-hide">
                
                {/* Widgets Section */}
                <div className="grid grid-cols-4 gap-3 mb-6 auto-rows-max" style={{ gridTemplateRows: 'repeat(2, 140px)' }}>
                  <WeatherWidget />
                  <CalendarWidget />
                </div>

                {/* App Icons Grid */}
                <div className="grid grid-cols-4 gap-6 px-2">
                  {apps.map((app, index) => (
                    <AppIcon
                      key={index}
                      icon={app.icon}
                      name={app.name}
                      bg={app.bg}
                      gradient={app.gradient}
                      iconColor={app.iconColor}
                      textColor={app.textColor}
                    />
                  ))}
                </div>

                {/* Search Bar */}
                <div className="mt-8">
                  <SearchBar />
                </div>

                {/* Extra space for scrolling */}
                <div className="h-20"></div>
              </div>

              {/* Dock - Fixed at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-2xl">
                {/* Dock Icons */}
                <div className="flex justify-center items-center px-8 py-4 space-x-6">
                  {dockApps.map((app, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-14 h-14 rounded-xl shadow-lg flex items-center justify-center ${app.bg}`}>
                        <app.icon className={`w-7 h-7 ${app.iconColor || 'text-white'}`} />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Home Indicator */}
                <div className="flex justify-center pb-2">
                  <div className="w-32 h-1 bg-white/60 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Physical Buttons - More Accurate Positioning */}
        {/* Volume buttons */}
        <div className="absolute -left-0.5 top-32 w-0.5 h-8 bg-gray-700 rounded-l-sm"></div>
        <div className="absolute -left-0.5 top-44 w-0.5 h-8 bg-gray-700 rounded-l-sm"></div>
        {/* Power button */}
        <div className="absolute -right-0.5 top-40 w-0.5 h-12 bg-gray-700 rounded-r-sm"></div>
      </div>
    </div>
  );
}