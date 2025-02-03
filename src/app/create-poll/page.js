"use client";

import { Fragment, useState } from "react";
import Navbar from "../components/navbar";
import { Dialog, Transition } from "@headlessui/react";
import Head from "next/head";

export default function CreatePoll() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pollId,setPollId]=useState('')
  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!title || options.some((option) => option.trim() === "")) {
      alert("Please provide a title and at least two options!");
      setIsLoading(false);
      return;
    }

    const pollData = { title, options };

    try {
      const response = await fetch("/api/create-poll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pollData),
      });

      if (!response.ok) {
        throw new Error("Failed to create poll");
      }

      const result = await response.json();

      if (result.error) {
        setIsLoading(false);
        alert(result.error);
      } else {
        setPollId(result.poll._id)
        setIsOpen(true);
        console.log(result.poll);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the poll. Please try again.");
    }
    setIsLoading(false);
    setTitle("");
    setOptions(["", ""]);
  };

  // Function to handle sharing the poll
  const handleSharePoll = async () => {
    if (!pollId) return;
  
    const pollUrl = `${window.location.origin}/poll/${pollId}`; 
  
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: "I created a poll, check it out!",
          url: pollUrl,
        });
        setIsOpen(false)
      } catch (error) {
        alert("Error sharing the poll.");
        console.error("Error sharing:", error);
      }
    } else {
      alert("Your browser does not support the Web Share API.");
    }
  };
  

  return (
    <>
      <Head>
        <title>Create Poll</title>
      </Head>
      <Navbar />
      <div>
        {!isLoading ? (
          <div className="min-h-screen bg-gray-900 p-4">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
              Create a New Poll
            </h1>
            <form
              onSubmit={handleSubmit}
              className="mt-8 max-w-2xl mx-auto bg-blue shadow-md rounded-lg p-4"
            >
              <label className="block text-gray-700 font-semibold mb-2">
                Poll Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the poll title"
                />
              </label>

              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Poll Options:
                </label>
                {options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Option ${index + 1}`}
                    />
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddOption}
                  className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg"
                >
                  Add Option
                </button>
              </div>

              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
              >
                Create Poll
              </button>
            </form>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <img src="/animations/loader.gif" alt="loader" />
          </div>
        )}
        <>
          {/* Modal */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              onClose={() => setIsOpen(false)}
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <Dialog.Title className="text-lg font-semibold text-black">
                    Poll Created successfully
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
      </div>
    </>
  );
}
