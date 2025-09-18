"use client";
import React, { useState } from "react";
import SearchBar from "./components/searchbar";
import UserStats from "./components/userstats";

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

  const [username, setUsername] = useState("");
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <SearchBar onSearch={setUsername} />
        {username && <UserStats username={username} />}
      </main>
    </div>
  );
}
