import React from 'react'
import { StatItem } from './statItem'

const UserStats = () => {
  return (
    <div>
      <div className="">
        <div className="bg-red-400/10 p-6 rounded-lg relative max-w-lg w-full">
          <button
            aria-label="Close"
            className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <span className="w-4 h-4">×</span>
          </button>

          {/* User Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold">username</h3>
                {/*<img
                  src=""
                  alt="Country Flag"
                  className="w-6 h-4 object-cover rounded"
                />*/}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Level</span>
                <span>Joined</span>
              </div>
            </div>
          </div>

          {/* Ranks */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <div className="text-2xl font-bold text-primary">{/*#{formatNumber(user.statistics.global_rank)}*/}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <div className="text-2xl font-bold text-primary">{/*#{formatNumber(user.statistics.country_rank)}*/}</div>
              <div className="text-sm text-muted-foreground">Country Rank</div>
            </div>
          </div>

          {/* Performance Points */}
          <div className="mb-6 p-4 bg-gray-200 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {/*{formatPP(user.statistics.pp)}*/}
              </div>
              <div className="text-sm text-muted-foreground">Performance Points</div>
            </div>
          </div>

          {/* Main Stats */}
          <div className="space-y-1 mb-6">
            <StatItem
              label="Accuracy"
              value=""
              icon=""
            />
            <StatItem
              label="Play Count"
              value=""
              icon=""
            />
            <StatItem
              label="Total Score"
              value=""
              icon=""
            />
            <StatItem
              label="Play Time"
              value=""
              icon=""
            />
            <StatItem
              label="Max Combo"
              value=""
              icon=""
            />
          </div>

          {/* Grade Counts */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Grade Distribution</h4>
            <div className="grid grid-cols-5 gap-2 text-center">
              <div>
                <div className="text-sm font-medium text-yellow-500">SSH</div>
                <div className="text-xs">{/*{user.statistics.grade_counts.ssh}*/}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-yellow-400">SS</div>
                <div className="text-xs">{/*{user.statistics.grade_counts.ss}*/}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-blue-500">SH</div>
                <div className="text-xs">{/*{user.statistics.grade_counts.sh}*/}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-blue-400">S</div>
                <div className="text-xs">{/*{user.statistics.grade_counts.s}*/}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-green-500">A</div>
                <div className="text-xs">{/*{user.statistics.grade_counts.a}*/}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserStats