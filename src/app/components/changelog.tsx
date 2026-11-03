"use client"

import { version } from "../../../package.json"
import { X } from "lucide-react";
import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

async function getLatestRelease() {
  try {
    const octokit = new Octokit()

    const response = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
      owner: 'Mutton9558',
      repo: 'Osu-Stats-Compare',
      headers: {
        'X-GitHub-Api-Version': '2026-03-10',
      },
    });

    const formattedDate = response.data.published_at 
      ? new Date(response.data.published_at).toLocaleDateString() 
      : 'Recent';

    return {
      body: response.data.body,
      date: formattedDate,
      url: response.data.html_url,
    };
  } catch (error) {
    return null;
  }
}

export default function ChangelogPopUp(){

    const [changelogBody, setChangelogBody] = useState<string | undefined>("N/A");
    const [changelogDate, setChangelogDate] = useState<string>("N/A");
    const [changelogUrl, setChangelogUrl] = useState("N/A");
    const [open, setOpen] = useState(false);

    useEffect(() => {

        const hasSeenChangelog = localStorage.getItem("changelog_version_seen");

        if (hasSeenChangelog !== version) {
            setOpen(true);
        } else {
            return
        }

        async function getData(){
            const data = await getLatestRelease();
            if(data){
                if(data.body === null || data.body === undefined){
                    setChangelogBody("No release notes provided.");
                } else {
                    setChangelogBody(data.body);
                }

                setChangelogDate(data.date);
                setChangelogUrl(data.url);
            }
        }

        getData();
    }, [])

    return(
        <div className={`w-full h-full p-12 sm:p-32 ${open ? "flex" : "hidden"} justify-center items-center z-100 absolute pointer-events-none`}>
            <div className="bg-gray-200 opacity-95 text-black border-black dark:bg-gray-700 dark:border-white dark:text-white font-mono border-2 rounded-2xl sm:w-auto pointer-events-auto max-h-11/12 overflow-y-auto">
                <button onClick={() => {setOpen(false); localStorage.setItem("changelog_version_seen", version)}} className="float-right mr-4 mt-4 cursor-pointer">
                    <X className='w-8 h-8 stroke-3'/>
                </button>
                <div className="p-8">
                    <div id="top-text" className="flex flex-col w-full mt-4 mb-8">
                        <span className="flex flex-row items-center justify-center">
                            <img src="/sitelogo.png" className="w-8 h-8 mr-4"></img>
                            <h1 className="sm:text-3xl text-lg text-center font-bold">Changelogs</h1>
                        </span>
                        <h2 className="sm:text-2xl text-xl text-center font-semibold">Osu Stats Compare Version: {version} - {changelogDate}</h2>
                    </div>
                    <div id="content" className="w-full mb-6 flex flex-col">
                        <p className="italic sm:text-lg text-md mb-2">Changes:</p>
                        <div className="sm:text-base text-sm text-justify prose dark:prose-invert max-w-none space-y-2 pr-2 
                            [&>ul]:list-disc [&>ul]:pl-5 
                            [&>ol]:list-decimal [&>ol]:pl-5
                            [&_a]:text-blue-600 [&_a]:underline [&_a]:dark:text-blue-400
                            [&_strong]:font-bold [&_em]:italic">
                            <ReactMarkdown>{changelogBody}</ReactMarkdown>
                        </div>
                    </div>

                    <div id="url" className="w-full flex flex-row sm:text-md text-xs">
                        <p className="mr-2">Check out the changes on GitHub:</p>
                        <a href={changelogUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Here</a>
                    </div>
                </div>
            </div>
        </div>
    )
}    
