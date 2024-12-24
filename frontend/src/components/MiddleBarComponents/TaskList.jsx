import React from "react";

const TaskList = ({
  tasks,
  title,
  selectedTask,
  handleTaskClick,
  handleToggleCompletion,
  isDarkMode,
}) => {
  return (
    <div className="mb-8">
      <h2
        className={`text-lg font-semibold mb-4 ${
          isDarkMode ? "text-gray-100" : "text-gray-700"
        }`}
      >
        {title}
      </h2>
      <ul className="space-y-3">
        {tasks.length === 0 ? (
          <p
            className={`text-sm italic ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No {title.toLowerCase()} tasks
          </p>
        ) : (
          tasks.map((task) => (
            <div
              style={{ userSelect: "none" }}
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className={`group flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:shadow-md border ${
                selectedTask && selectedTask.id === task.id
                  ? isDarkMode
                    ? "bg-blue-900/50 border-blue-500 shadow-sm"
                    : "bg-blue-50 border-blue-500 shadow-sm"
                  : isDarkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span
                className={`font-medium ${
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                }`}
              >
                {task.title}
              </span>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {new Date(task.due_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompletion(task)}
                  className={`h-5 w-5 rounded-md text-blue-600 focus:ring-blue-500 transition-colors duration-200 ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700"
                      : "border-gray-300 bg-white"
                  }`}
                />
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
