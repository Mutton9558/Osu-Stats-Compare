import React from "react";
import { StatItem } from "./statItem";
import { Target, Play, Star, Clock, TrendingUp } from "lucide-react";

interface userStatistics {
  avatarUrl: string;
  countryCode: string;
  joinDate: string;
  username: string;
  level: number;
  globalRank: number;
  countryRank: number;
  performancePoints: number;
  accuracy: number;
  playTime: number;
  playCount: number;
  totalScore: number;
  maxCombo: number;
  ssCount: number;
  sshCount: number;
  sCount: number;
  shCount: number;
  aCount: number;
}

interface UserStatsProps {
  user: userStatistics;
}

export default function UserStats({ user }: UserStatsProps) {
  return (
    <div>
      <div className="w-96">
        <div className="bg-red-400/10 p-6 rounded-lg relative max-w-lg w-full">
          {/* User Header */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user.avatarUrl}
              alt={`${user.username}'s avatar`}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold">{user.username}</h3>
                <img
                  src={`https://flagcdn.com/w80/${user.countryCode.toLowerCase()}.png`}
                  alt="Country Flag"
                  className="w-6 h-4 object-cover rounded"
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>Level {user.level}</span>
                <span>Joined {new Date(user.joinDate).getFullYear()}</span>
              </div>
            </div>
          </div>

          {/* Ranks */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {user.globalRank
                  ? `${user.globalRank.toLocaleString()}`
                  : "Not Ranked"}
              </div>
              <div className="text-sm text-gray-400">Global Rank</div>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {user.countryRank
                  ? `${user.countryRank.toLocaleString()}`
                  : "Not Ranked"}
              </div>
              <div className="text-sm text-gray-400">Country Rank</div>
            </div>
          </div>

          {/* Performance Points */}
          <div className="mb-6 p-4 bg-gray-200 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {user.performancePoints.toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">
                Performance Points (pp)
              </div>
            </div>
          </div>

          {/* Main Stats */}
          <div className="space-y-1 mb-6">
            <StatItem
              label="Accuracy"
              value={user.accuracy.toFixed(2) + "%"}
              icon={<Target className="w-4 h-4" />}
            />
            <StatItem
              label="Play Count"
              value={user.playCount.toLocaleString()}
              icon={<Play className="w-4 h-4" />}
            />
            <StatItem
              label="Total Score"
              value={user.totalScore.toLocaleString()}
              icon={<TrendingUp className="w-4 h-4" />}
            />
            <StatItem
              label="Play Time"
              value={user.playTime.toLocaleString()}
              icon={<Clock className="w-4 h-4" />}
            />
            <StatItem
              label="Max Combo"
              value={user.maxCombo}
              icon={<Star className="w-4 h-4" />}
            />
          </div>

          {/* Grade Counts */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 text-gray-400">
              Grade Distribution
            </h4>
            <div className="grid grid-cols-5 gap-2 text-center">
              <div>
                <div className="text-sm font-medium text-yellow-500">SSH</div>
                <div className="text-xs">{user.sshCount}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-yellow-400">SS</div>
                <div className="text-xs">{user.ssCount}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-blue-500">SH</div>
                <div className="text-xs">{user.shCount}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-blue-400">S</div>
                <div className="text-xs">{user.sCount}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-green-500">A</div>
                <div className="text-xs">{user.aCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
