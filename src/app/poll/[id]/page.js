"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

const Poll = () => {
  const params = useParams();
  const { id } = params;
  const [pollData, setPollData] = useState(null);
  useEffect(() => {
    if (id) {
      const fetchPoll = async () => {
        console.log("Fetch");
        const response = await fetch(`/api/get-polls/${id}`);
        const data = await response.json();
        setPollData(data);
      };

      fetchPoll();
    }
  }, [id]);
  l;

  return (
    <>
      <Navbar />
    </>
  );
};
export default Poll;
