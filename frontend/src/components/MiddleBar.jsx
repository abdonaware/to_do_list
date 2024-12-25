import React, { useState } from "react";
import TasksService from "../Service/TasksService";
import { useAppContext } from "../contexts/AppContext";
import AddTaskModal from "./MiddleBarComponents/AddTaskModal";
import TaskList from "./MiddleBarComponents/TaskList";
import Calendar from "./MiddleBarComponents/Calender";
import TagList from "./MiddleBarComponents/TagList.jsx";
import TagsService from "../Service/TagsService.js";
import { FaTrash } from "react-icons/fa";
import DeleteTagModal from "./MiddleBarComponents/DeleteTagModal";
function MiddleBar({ isSidebarOpen, setSidebarOpen, isDarkMode }) {
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    dueDate: "",
    priority: "",
  });
  const {
    uncompletedTasks,
    completedTasks,
    getUnCompletedTasks,
    getCompletedTasks,
    setSelectedTask,
    selectedTask,
    getSubTasks,
    getTaskTags,
    activeCategory,
    setActiveCategory,
    getUserTags,
  } = useAppContext();

  const handleAddTask = async (e) => {
    e.preventDefault();
    const task = {
      title: taskDetails.title,
      dueDate: taskDetails.dueDate,
      priority: taskDetails.priority,
    };
    await TasksService.addTask(task);
    await getUnCompletedTasks();
    setTaskDetails({ title: "", dueDate: "", priority: "" });
    setShowModal(false);
  };

  const handleToggleCompletion = async (task) => {
    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(task);
    } else {
      setSelectedTask(null);
    }
    await TasksService.toggleTask(task.id, { completed: !task.completed });
    await getUnCompletedTasks();
    await getCompletedTasks();
  };

  const handleTaskClick = async (task) => {
    console.log(task);

    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(null);
    } else {
      setSelectedTask(task);
      await getSubTasks(task.id);
      await getTaskTags(task.id);
    }
  };
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const DeleteTag = () => {
    setIsConfirmDeleteOpen(true);
  };
  const ConfirmDelete = async () => {
    await TagsService.deleteTag(activeCategory.id);
    setActiveCategory("My List");
    await getUserTags();
    setIsConfirmDeleteOpen(false);
  };
  const CancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  return (
    <div
      className={`relative overflow-y-scroll ${
        selectedTask ? "hidden ml:block" : "w-screen"
      } ${selectedTask ? "ml:w-2/5" : "ml:w-4/5"} ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } min-h-screen max-h-fit shadow-lg transition-colors duration-200`}
    >
      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className={`fixed inset-0 ${
            isDarkMode ? "bg-black" : "bg-gray-700"
          } bg-opacity-50 z-20`}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <AddTaskModal
        showModal={showModal}
        taskDetails={taskDetails}
        setTaskDetails={setTaskDetails}
        handleAddTask={handleAddTask}
        setShowModal={setShowModal}
        isDarkMode={isDarkMode}
      />
      {activeCategory === "My List" && (
        <>
          <div
            className={`middle-bar p-6 overflow-auto custom-scrollbar relative z-10 transition-all duration-300 ${
              isSidebarOpen ? "opacity-50" : "opacity-100"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Tasks
              </h2>
              <button
                onClick={() => setShowModal(true)}
                className={`w-10 h-10 flex items-center justify-center ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded-full shadow-md transition-colors duration-200`}
              >
                <span className="text-xl">+</span>
              </button>
            </div>

            <TaskList
              tasks={uncompletedTasks}
              title="Uncompleted Tasks"
              selectedTask={selectedTask}
              handleTaskClick={handleTaskClick}
              handleToggleCompletion={handleToggleCompletion}
              isDarkMode={isDarkMode}
            />
            <TaskList
              tasks={completedTasks}
              title="Completed Tasks"
              selectedTask={selectedTask}
              handleTaskClick={handleTaskClick}
              handleToggleCompletion={handleToggleCompletion}
              isDarkMode={isDarkMode}
            />
          </div>
        </>
      )}

      {activeCategory === "Calendar" && (
        <>
          <div
            className={`middle-bar p-6 overflow-auto custom-scrollbar relative z-10 transition-all duration-300 ${
              isSidebarOpen ? "opacity-50" : "opacity-100"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                My Calendar
              </h2>
            </div>
            <Calendar />
          </div>
        </>
      )}

      {activeCategory !== "Calendar" && activeCategory !== "My List" && (
        <>
          <div
            className={`middle-bar p-6 overflow-auto custom-scrollbar relative z-10 transition-all duration-300 ${
              isSidebarOpen ? "opacity-50" : "opacity-100"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Tasks With Tag: {activeCategory.name}
              </h2>
              <button
                className="p-3 rounded-lg text-white hover:text-red-600  hover:bg-red-300 transition-colors duration-200 bg-red-600"
                onClick={DeleteTag}
              >
                <FaTrash size={20} />
              </button>
            </div>
            <TagList />
          </div>
        </>
      )}
      {isConfirmDeleteOpen && (
        <DeleteTagModal
          isOpen={isConfirmDeleteOpen}
          onConfirm={ConfirmDelete}
          onCancel={CancelDelete}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

export default MiddleBar;