import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://finance-task-marketplace-sarver.vercel.app/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTask(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching task:", err);
                setLoading(false);
                toast.error("Failed to load task");
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        fetch(`https://finance-task-marketplace-sarver.vercel.app/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Task updated successfully!");
                    navigate("/myPostedTasks");
                } else {
                    toast.error("Failed to update task");
                }
            })
            .catch((err) => {
                console.error("Update error:", err);
                toast.error("Something went wrong");
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: value,
        }));
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
            <p className="text-center mt-10 text-lg font-semibold text-red-500">
                Task not found.
            </p>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Edit Task</h2>

            <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Task Title</label>
                    <input
                        type="text"
                        name="taskTitle"
                        value={task.taskTitle}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        name="category"
                        value={task.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    >
                        <option>Web Development</option>
                        <option>Design</option>
                        <option>Writing</option>
                        <option>Marketing</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        value={task.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        value={task.deadline}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Budget ($)</label>
                    <input
                        type="number"
                        name="budget"
                        value={task.budget}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">User Email</label>
                    <input
                        type="email"
                        name="userEmail"
                        value={task.userEmail}
                        readOnly
                        className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">User Name</label>
                    <input
                        type="text"
                        name="userName"
                        value={task.userName}
                        readOnly
                        className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg font-semibold transition"
                >
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default Edit;
