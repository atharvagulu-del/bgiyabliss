import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <>
      <div className="adminTopbar">
        <h1 className="adminTopbarTitle">Settings</h1>
      </div>
      <div className="adminContent">
        <div className="adminCard">
          <div className="adminEmptyState">
            <Settings size={48} />
            <h3>Settings Coming Soon</h3>
            <p>Store settings and configuration will be available here.</p>
          </div>
        </div>
      </div>
    </>
  );
}
