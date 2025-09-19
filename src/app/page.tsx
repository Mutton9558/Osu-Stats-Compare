"use client";
import React, { useEffect, useState } from "react";
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
  const [username, setUsername] = useState("");
  const [searchWarningMsg, setSearchWarningMsg] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    const object = document.getElementById("search-warning") as HTMLElement;

    setSearchWarningMsg(object);
  }, []);

  useEffect(() => {
    console.log(username);
    if (searchWarningMsg) {
      if (username == "" || username == "undefined" || username == null) {
        console.log("Not valid user");
        searchWarningMsg.innerHTML = "Add a user!";
      } else {
        if (users.length == 1 && users[0].username == username) {
          console.log("User already exists");
          searchWarningMsg.innerHTML = "User already added!";
        } else if (users.length >= 2) {
          console.log("You can only add up to two players!");
          searchWarningMsg.innerHTML = "You can only add up to two players!";
        } else {
          async function getData(username: string) {
            try {
              const query = await fetch("/api/compare", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: username }),
              });

              const data = await query.json();

              if (!data || !data.statistics) {
                throw new TypeError(
                  "Invalid response: missing statistics field"
                );
              }

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
              console.log(newUser);
              setUsers((prev) => [...prev, newUser]);
            } catch (err) {
              console.log(err);
              if (searchWarningMsg) {
                searchWarningMsg.innerHTML = "Please add a real user!";
              }
            }
          }

          getData(username);
        }
      }
    }
  }, [username]);

  // debugging
  useEffect(() => {
    if (users.length > 0) {
      console.log("Users updated:", users);
      console.log("First user's username:", users[0].username);
    }
    if (users.length > 1) {
      console.log("Second user's username:", users[1].username);
    }
  }, [users]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[16px] row-start-2 justify-center items-center sm:items-start">
        <h1 className="w-full flex items-center justify-center font-mono text-2xl tracking-wide">
          Osu Stats Comparer
        </h1>
        <p
          className="text-red-400 font-mono tracking-wide w-full flex items-center justify-center"
          id="search-warning"
        ></p>
        <SearchBar onSearch={setUsername} />
        {/* {username && <UserStats username={username} />} */}
      </main>
    </div>
  );
}
