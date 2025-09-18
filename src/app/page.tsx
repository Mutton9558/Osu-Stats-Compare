"use client";
import { useState } from "react";

export default function Home() {
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

  const [users, setUsers] = useState<userStatistics[]>([]);
  async function getData(username: string) {
    try {
      const query = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: username }),
      });

      const data = await query.json();

      let newUser: userStatistics = {
        avatarUrl: data.avatar_url,
        countryCode: data.country_code,
        joinDate: data.join_date,
        username: data.username,
        level: data.statistics.level.current,
        globalRank: data.statistics.global_rank,
        countryRank: data.statistics.country_rank,
        performancePoints: data.statistics.pp,
        accuracy: data.statistics.hit_accuracy,
        playTime: data.statistics.play_time,
        playCount: data.statistics.play_count,
        totalScore: data.statistics.total_score,
        maxCombo: data.statistics.maximum_combo,
        ssCount: data.statistics.grade_counts.ss,
        sshCount: data.statistics.grade_counts.ssh,
        sCount: data.statistics.grade_counts.s,
        shCount: data.statistics.grade_counts.sh,
        aCount: data.statistics.grade_counts.a,
      };
      setUsers((prev) => [...prev, newUser]);
    } catch (err) {
      console.log(err);
    }
    console.log(users);
  }

  return (
    <div>
      <h1>Hello</h1>
      <button
        className="w-32 h-8 bg-gray-300 border-gray-300 text-black justify-center items-center flex rounded-lg"
        onClick={() => getData("MuttonIsTrash")}
      >
        + Add User
      </button>
    </div>
  );
}
