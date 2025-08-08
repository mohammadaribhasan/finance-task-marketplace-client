import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { valueConText } from "../rootlayout/RootLayout";

const AddTask = () => {
    const { user } = useContext(valueConText);
    const [taskTitle, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [budget, setBudget] = useState("");

    const userName = user.displayName;
    const userEmail = user.email;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            taskTitle,
            category,
            description,
            deadline,
            budget,
            userName,
            userEmail,
        };

        try {
            const res = await fetch("https://finance-task-marketplace-sarver.vercel.app/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            const data = await res.json();
            if (data.insertedId || data.acknowledged) {
                toast.success("Task added successfully!");
                setTitle("");
                setCategory("");
                setDescription("");
                setDeadline("");
                setBudget("");
            } else {
                toast.error("Failed to add task");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 bg-background text-foreground shadow-lg rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Add a New Task</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Task Title</label>
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        className="w-full border rounded-lg px-4 py-2 bg-background text-foreground border-input"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 bg-background text-foreground border-input"
                        required
                    >
                        <option value="">Select a category</option>
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
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what needs to be done..."
                        className="w-full border rounded-lg px-4 py-2 bg-background text-foreground border-input"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Deadline</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 bg-background text-foreground border-input"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Budget ($)</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Enter budget"
                        className="w-full border rounded-lg px-4 py-2 bg-background text-foreground border-input"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">User Email</label>
                    <input
                        type="email"
                        value={userEmail}
                        readOnly
                        className="w-full border rounded-lg px-4 py-2 bg-muted text-foreground border-input cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">User Name</label>
                    <input
                        type="text"
                        value={userName}
                        readOnly
                        className="w-full border rounded-lg px-4 py-2 bg-muted text-foreground border-input cursor-not-allowed"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-opacity-90 text-white py-2 px-4 rounded-lg text-lg font-semibold transition"
                >
                    Post Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
