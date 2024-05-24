import SettingsSideBar from "./ui/SettingsSideBar";

const SettingsPage = () => {
  return (
    <div className="w-full h-screen flex bg-neutral-800 py-6">
      <SettingsSideBar />
      <p className="text-white">Settings Space</p>
    </div>
  );
};

export default SettingsPage;
