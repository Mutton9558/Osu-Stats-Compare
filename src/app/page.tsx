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
    previous_usernames: string[];
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
  // const [username, setUsername] = useState("");
  const [searchWarningMsg, setSearchWarningMsg] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    const object = document.getElementById("search-warning") as HTMLElement;

    setSearchWarningMsg(object);
  }, []);

  async function getData(username: string) {
    if (searchWarningMsg) {
      if (username == "" || username == "undefined" || username == null) {
        console.log("Not valid user");
        searchWarningMsg.innerHTML = "Add a user!";
      } else {
        // check to see if user entered an already added user (also takes account previous usernames)
        if (
          users.length == 1 &&
          (users[0].username.toLowerCase() == username.toLowerCase() ||
            users[0].previous_usernames
              .map((e) => e.toLowerCase())
              .includes(username.toLowerCase()))
        ) {
          console.log("User already exists");
          searchWarningMsg.innerHTML = "User already added!";
        } else if (users.length >= 2) {
          searchWarningMsg.innerHTML = "You can only add up to two players!";
        } else {
          try {
            const query = await fetch("/api/compare", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ user: username }),
            });

            const data = await query.json();

            if (!data || !data.statistics) {
              throw new TypeError("Invalid response: missing statistics field");
            }

            const newUser: userStatistics = {
              avatarUrl: data.avatar_url,
              countryCode: data.country_code,
              joinDate: data.join_date,
              username: data.username,
              previous_usernames: data.previous_usernames,
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
            searchWarningMsg.innerHTML = "";
            setUsers((prev) => [...prev, newUser]);
          } catch (err) {
            console.log(err);
            if (searchWarningMsg) {
              searchWarningMsg.innerHTML = "Please add a real user!";
            }
          }
        }
      }
    } else {
      console.log("Can't get warning message element!");
    }
  }

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

  function resetUsers() {
    setUsers([]);
    if (searchWarningMsg) {
      searchWarningMsg.innerHTML = "";
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 font-sans flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[16px] row-start-2 justify-center items-center sm:items-start">
        <h1 className="w-full flex items-center justify-center font-mono text-2xl tracking-wide dark:text-white rounded-lg">
          Osu Stats Comparer
        </h1>
        <p
          className="text-red-400 font-mono tracking-wide w-full flex items-center justify-center"
          id="search-warning"
        ></p>
        <div className="flex flex-col gap-6 w-full items-center">
          <SearchBar onSearch={getData} />
          {users.length > 0 && (
            <button
              onClick={resetUsers}
              className="p-2 w-2xs bg-red-500 text-white rounded-lg font-mono cursor-pointer"
            >
              Reset
            </button>
          )}
          <div className="flex flex-row gap-8 w-full justify-center items-center">
            {users.slice(0, 2).map((user, idx) => (
              <UserStats key={user.username + idx} user={user} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
