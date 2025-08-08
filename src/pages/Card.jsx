import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ tasks }) => {
    const navigate = useNavigate();

    const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    const firstSixTasks = sortedTasks.slice(0, 6);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {firstSixTasks.map((task) => (
                <article
                    key={task._id} // use _id instead of taskTitle for uniqueness
                    onClick={() => navigate(`/details/${task._id}`)}
                    className="bg-card-bg bg-opacity-40 backdrop-blur-md rounded-xl shadow-md p-6 flex flex-col justify-between
                     hover:shadow-lg hover:scale-[1.04] transition-transform duration-300 cursor-pointer"
                >
                    <div>
                        <h2 className="text-2xl font-extrabold text-primary mb-3 hover:text-primary-hover transition-colors duration-200">
                            {task.taskTitle}
                        </h2>
                        <p className="text-secondary font-semibold mb-1 uppercase tracking-wide">{task.category}</p>
                        <p className="text-muted mb-4 line-clamp-4">{task.description}</p>
                        <p className="text-sm text-muted-light">
                            <span className="font-semibold">Deadline:</span>{" "}
                            <time dateTime={task.deadline}>{new Date(task.deadline).toLocaleDateString()}</time>
                        </p>
                    </div>

                    <div className="mt-6 border-t border-border pt-4 flex flex-col gap-1">
                        <p className="text-xl font-bold text-primary">${task.budget}</p>
                        <p className="text-foreground font-medium">{task.userName}</p>
                        <p className="text-sm text-muted-light">{task.userEmail}</p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default Card;
