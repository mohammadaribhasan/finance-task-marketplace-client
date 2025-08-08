import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const BrowseTask = () => {
    const data = useLoaderData();
    const navigate = useNavigate();

    return (
        <div className="p-6 max-w-full overflow-x-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Browse Tasks</h1>

            <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-indigo-900 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Task Title</th>
                        <th className="py-3 px-4 text-left">Category</th>
                        <th className="py-3 px-4 text-left">Deadline</th>
                        <th className="py-3 px-4 text-left">Budget</th>
                        <th className="py-3 px-4 text-left">Posted By</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data && data.length > 0 ? (
                        data.map((task) => (
                            <tr
                                key={task._id}
                                className="border-b border-gray-300 hover:bg-base-700 transition-colors"
                            >
                                <td className="py-3 px-4">{task.taskTitle}</td>
                                <td className="py-3 px-4">{task.category}</td>
                                <td className="py-3 px-4">
                                    {new Date(task.deadline).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">${task.budget}</td>
                                <td className="py-3 px-4">{task.userName}</td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => navigate(`/details/${task._id}`)}
                                        className="bg-indigo-700 cursor-pointer text-white px-3 py-1 rounded hover:bg-indigo-800 transition-colors"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-4 text-gray-600 font-medium"
                            >
                                No tasks found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BrowseTask;
