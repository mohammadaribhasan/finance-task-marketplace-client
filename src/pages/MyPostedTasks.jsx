import React, { useContext, useEffect, useState } from "react";
import { valueConText } from "../rootlayout/RootLayout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyPostedTasks = () => {
    const { user } = useContext(valueConText);
    const [myTasks, setMyTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null); // 🔹 For modal
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetch(`https://finance-task-marketplace-sarver.vercel.app/users?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setMyTasks(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching tasks:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`https://finance-task-marketplace-sarver.vercel.app/users/${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    setMyTasks((prev) => prev.filter((task) => task._id !== id));
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                } else {
                    Swal.fire("Failed!", "Failed to delete the task.", "error");
                }
            } catch (error) {
                console.error("Error deleting task:", error);
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        }
    };

    const openBidModal = (task) => {
        setSelectedTask(task);
    };

    const closeBidModal = () => {
        setSelectedTask(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 text-base-content">
            <h2 className="text-3xl font-bold mb-6">My Posted Tasks</h2>

            {myTasks.length === 0 ? (
                <p className="text-center text-lg text-base-content opacity-70">
                    You haven’t posted any tasks yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-base-100 border border-base-300 rounded-xl overflow-hidden text-sm">
                        <thead className="bg-base-200 text-left">
                            <tr>
                                <th className="py-3 px-4">Title</th>
                                <th className="py-3 px-4">Category</th>
                                <th className="py-3 px-4">Budget</th>
                                <th className="py-3 px-4">Deadline</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myTasks.map((task) => (
                                <tr key={task._id} className="border-t border-base-300 hover:bg-base-200 transition-colors">
                                    <td className="py-3 px-4 font-semibold">{task.taskTitle}</td>
                                    <td className="py-3 px-4">{task.category || "General"}</td>
                                    <td className="py-3 px-4">${task.budget || "N/A"}</td>
                                    <td className="py-3 px-4">
                                        <time dateTime={task.deadline}>
                                            {new Date(task.deadline).toLocaleDateString()}
                                        </time>
                                    </td>
                                    <td className="py-3 px-4 text-center space-x-2">
                                        <button onClick={() => navigate(`/edit/${task._id}`)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-base-700 text-sm">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(task._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">
                                            Delete
                                        </button>
                                        <button onClick={() => openBidModal(task)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">
                                            Bids
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 🔹 Bids Modal */}
            {selectedTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-base-200 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                        <button
                            onClick={closeBidModal}
                            className="absolute top-2 right-2 text-xl font-bold text-red-600 hover:text-red-800"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-semibold mb-2">
                            Bids for: <span className="text-primary">{selectedTask.taskTitle}</span>
                        </h3>

                        {selectedTask.bids?.length > 0 ? (
                            <ul className="space-y-2 max-h-60 overflow-y-auto">
                                {selectedTask.bids.map((bid, index) => (
                                    <li key={index} className="border border-gray-300 dark:border-base-300 rounded p-2">
                                        <p className="font-semibold">Email: {bid.email}</p>
                                        <p>Bid Amount: <span className="font-medium">${bid.amount}</span></p>
                                        <p className="text-sm text-gray-500">Date: {new Date(bid.date).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500">No bids yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPostedTasks;
