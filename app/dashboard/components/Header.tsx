// components/Header.tsx

import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-5">
      <input
        type="text"
        placeholder="Search GitHub users..."
        className="border border-gray-300 p-2 rounded-lg w-1/3"
      />
      <div className="flex items-center space-x-4">
        <button className="p-2">
          <i className="fa fa-bell"></i> {/* Add a notification icon */}
        </button>
        <div className="flex items-center space-x-2">
          <Image
            width={32}
            height={32}
            src="/profile.jpg"
            alt="GitHub User"
            className="rounded-full w-8 h-8"
          />
          <span className="text-sm">GitHub User</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
