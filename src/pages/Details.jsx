import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Details = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [bidAmount, setBidAmount] = useState("");
    const [submittedBid, setSubmittedBid] = useState(null);

    const userEmail = "example@gmail.com"; // Replace with real user email (from auth)

    const fetchTask = () => {
        setLoading(true);
        fetch(`https://finance-task-marketplace-sarver.vercel.app/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTask(data);
                if (data.bids && Array.isArray(data.bids)) {
                    const existingBid = data.bids.find((bid) => bid.email === userEmail);
                    if (existingBid) {
                        setSubmittedBid(existingBid.amount);
                    } else {
                        setSubmittedBid(null);
                    }
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching task details:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTask();
    }, [id, userEmail]);

    const handleBidSubmit = () => {
        if (!bidAmount) {
            toast.error("Please enter a bid amount");
            return;
        }

        if (submittedBid !== null) {
            toast.info("You already bidded!");
            return;
        }

        fetch(`https://finance-task-marketplace-sarver.vercel.app/users/${id}/bid`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, amount: parseFloat(bidAmount) }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to submit bid");
                }
                return res.json();
            })
            .then(() => {
                toast.success("Bid submitted successfully!");
                setShowModal(false);
                setBidAmount("");
                fetchTask(); // Refresh
            })
            .catch(() => toast.error("Failed to submit bid."));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <p className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Task not found
                </p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-12">
            <ToastContainer />
            {submittedBid !== null && (
                <div className="mb-6 text-center text-lg font-semibold text-blue-600 dark:text-blue-400">
                    You bid for ${submittedBid}
                </div>
            )}
            <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">
                    {task.taskTitle}
                </h2>

                <div className="space-y-6 text-gray-800 dark:text-gray-300 text-lg">
                    <p><strong>Category:</strong> <em>{task.category || "General"}</em></p>
                    <p><strong>Description:</strong><br /><span className="whitespace-pre-wrap">{task.description || "No description provided."}</span></p>
                    <p><strong>Deadline:</strong> <time className="font-mono">{new Date(task.deadline).toLocaleDateString()}</time></p>
                    <p><strong>Budget:</strong> ${task.budget || "N/A"}</p>
                    <p><strong>Posted By:</strong> {task.userName || "Anonymous"} <a href={`mailto:${task.userEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline break-words">({task.userEmail || "No email"})</a></p>
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                    >
                        Bid
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Submit Your Bid
                        </h3>
                        <input
                            type="number"
                            placeholder="Enter your bid amount"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            className="w-full px-4 py-2 mb-4 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBidSubmit}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                            >
                                Submit Bid
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
