// components/FollowerList.tsx

import Image from "next/image";

interface Follower {
  id: number;
  avatar_url: string;
  login: string;
  followers: number;
}

interface FollowerListProps {
  followers: Follower[];
}

const FollowerList: React.FC<FollowerListProps> = ({ followers }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {followers.map((follower) => (
          <div key={follower.id} className="bg-white p-4 rounded-lg shadow-md">
            <Image width={32} height={32} src={follower.avatar_url} alt={follower.login} className="rounded-full w-16 h-16"/>
            <h3 className="text-lg font-semibold mt-2">{follower.login}</h3>
            <p className="text-sm text-gray-500">{follower.followers} followers</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default FollowerList;
  