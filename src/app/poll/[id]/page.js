"use client";

import { redirect, useParams } from "next/navigation";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Navbar from "../../components/navbar";
import PollChart from "@/app/components/pollchart";
import axios from "axios";
const Poll = () => {
  const params = useParams();
  const { id } = params;
  const [pollData, setPollData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [localSelectionOption, setLocalSelectionOption] = useState(null)
  const isVoted = localSelectionOption !== null

  const [title, setTitle] = useState('')
  console.log(isVoted)
  const fetchPoll = async (id) => {
    const response = await fetch(`/api/get-polls/${id}`);
    const data = await response.json();
    setPollData(data.poll);
    setTitle(data.poll.title)
  };


  useEffect(() => {
    const storedVote = localStorage.getItem(id);
    setLocalSelectionOption(storedVote);

    if (storedVote !== null) {
      setSelectedOption(storedVote);
    }
    fetchPoll(id);
  }, [id]);



  const handleVote = async () => {
    if (!selectedOption) {
      setError("Please select an option.");
      return;
    }
    setLoading(true);
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(`/api/get-polls/${id}`, {
        optionId: selectedOption,
      });
      localStorage.setItem(id, selectedOption)
      setPoll(response.data.poll);
      
    } catch (err) {
      setError("Failed to submit vote. Please try again.");
    } finally {
      setLoading(false);
      setIsOpen(true);
      window.location.reload();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 300); 
  };

  const handleSharePoll = async () => {
    setIsOpen(false)
    if (!id) return;
    const pollUrl = `${window.location.origin}/poll/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: "I voted on this poll, vote yourself now!",
          url: pollUrl,
        });

        setIsOpen(false);
        redirect("/");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      alert("Your browser does not support the Web Share API.");
    }
    
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        {pollData && !isLoading ? (
          <div >
            <div className="max-w-lg w-full bg-gray-800 p-6 rounded-xl shadow-lg min-w-64">
              <h2 className="text-2xl font-semibold text-center mb-4">
                {pollData.title}
              </h2>
              <div className="space-y-3">
                {pollData.options.map((option) => (
                  <button
                    key={option._id}
                    className={`w-full p-3 rounded-lg text-lg font-medium flex justify-between items-center transition-all duration-300 
                    ${selectedOption === option._id
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-blue-500"
                      }`}
                    onClick={() => setSelectedOption(option._id)}
                    title={isVoted ? "Do avoid duplicate you can't vote!" : ""}
                  >
                    <span>{option.text}</span>
                    <span className="bg-gray-900 text-gray-300 px-3 py-1 rounded-lg text-sm">
                      {option.votes} votes
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex justify-center items-center w-full">
                {isVoted ?
                  <button
                    className={`w-2/5 p-3 rounded-lg text-lg font-medium flex justify-center items-center self-center transition-all duration-300 bg-pink-500 text-center mt-3`}
                    onClick={handleSharePoll}
                  >
                    Share
                  </button> :
                  <button
                    className={`w-2/5 p-3 rounded-lg text-lg font-medium flex justify-center items-center self-center transition-all duration-300 ${isVoted !== null ? 'bg-blue-700' : 'bg-pink-500'} text-center mt-3`}
                    onClick={handleVote}
                    disabled={isVoted}
                    title={isVoted ? "You have already voted!" : ""}
                  >
                    Submit
                  </button>


                }
              </div>
            </div>
            {isVoted ?
              <div className="text-center mt-7 mb-10 flex justify-center align-center w-full">
                <p className="bg-yellow-700 text-white w-fit p-2 rounded-lg">To avoid duplicates you can't vote again</p>
              </div> : ''
            }
            {isVoted?
          <PollChart pollData={pollData} className="mt-5"/> :''
            }
          </div>
        ) : (
          <img src="/animations/loader.gif" />
        )}
      </div>

      <>
        {/* Modal */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={handleCloseModal}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
                <Dialog.Title className="text-lg font-semibold text-black">
                  Voted Poll successfully
                </Dialog.Title>
                <p className="mt-2 text-black">
                  Share with your's friends to know the their opinion
                </p>
                <div className="mt-6 text-center">
                  <button
                    onClick={handleSharePoll}
                    className="bg-yellow-500 text-white py-2 px-6 rounded-lg"
                  >
                    Share Poll
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  );
};

export default Poll;
