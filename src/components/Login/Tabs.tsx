'use-client'
import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[1].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="flex w-full justify-center">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`cursor-pointer px-4 py-2 border-b-2 ${
            activeTab === tab.id
              ? ' border-[#941D39] text-[#941D39]'
              : ' hover:border-gray-300 border-white'
          } transition-all duration-300`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
