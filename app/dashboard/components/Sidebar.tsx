// components/Sidebar.tsx

import Image from "next/image";

const Sidebar = () => {
    return (
      <div className="bg-gray-800 text-white w-64 p-5">
        <div className="flex items-center justify-center mb-5">
          <Image width={32} height={32} src="/profile.jpg" alt="GitHub User" className="rounded-full w-16 h-16"/>
          <span className="ml-3 text-xl">GitHub User</span>
        </div>
        <nav>
          <ul>
            <li className="py-2 hover:bg-gray-700 px-2">
              <a href="/dashboard">Overview</a>
            </li>
            <li className="py-2 hover:bg-gray-700 px-2">
              <a href="/dashboard/repositories">Repositories</a>
            </li>
            <li className="py-2 hover:bg-gray-700 px-2">
              <a href="/dashboard/followers">Followers</a>
            </li>
            <li className="py-2 hover:bg-gray-700 px-2">
              <a href="/dashboard/settings">Settings</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
  