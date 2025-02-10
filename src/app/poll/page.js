"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import Link from "next/link";

const Poll = () => {
  const [pollsData, setPollsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const fetchPolls = async () => {
    const response = await axios.get("/api/get-polls");
    const data = await response.data.poll;
    setIsLoading(false);
    setPollsData(data);
  };
  console.log(pollsData);
  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center align-center min-h-screen">
        {isLoading ? (
          <img src="/animations/loader.gif" className="h-fit self-center"/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {pollsData?.map((poll, index) => (
              <Link
                key={index}
                className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700"
                href={`/poll/${poll._id}`}
              >
                <h1 className="text-white-400 font-semibold md:text-md text-lg">
                  {poll.title}
                </h1>
                <ul className="mt-2">
                  {poll.options?.map((option, idx) => (
                    <li
                      key={idx}
                      className="text-white bg-blue-600 hover:bg-blue-500 transition p-2 rounded-md mt-1"
                    >
                      {option.text}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Poll;
