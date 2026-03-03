import { createContext, useContext } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
}

export interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onChange, children, className = '' }: TabsProps) {
  return (
    <TabsContext.Provider value={{ activeTab: value, setActiveTab: onChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabList({ children, className = '' }: TabListProps) {
  return (
    <div
      className={`flex space-x-1 border-b border-secondary-200 ${className}`}
      role="tablist"
    >
      {children}
    </div>
  );
}

export interface TabProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function Tab({ value, children, className = '' }: TabProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={`
        px-4 py-2 text-sm font-medium
        transition-colors duration-200
        border-b-2 -mb-px
        ${
          isActive
            ? 'border-primary-600 text-primary-600'
            : 'border-transparent text-secondary-600 hover:text-secondary-900 hover:border-secondary-300'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className = '' }: TabPanelProps) {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) return null;

  return (
    <div role="tabpanel" className={`pt-4 ${className}`}>
      {children}
    </div>
  );
}
