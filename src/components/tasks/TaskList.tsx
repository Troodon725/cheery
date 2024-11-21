import React, { useEffect } from 'react';
import { CheckCircle2, Clock, Trophy, Trash2, Loader } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';

export default function TaskList() {
  const { 
    tasks, 
    loading, 
    error, 
    fetchTasks,
    updateTaskStatus,
    deleteTask
  } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center min-h-[200px]">
        <Loader className="w-6 h-6 animate-spin text-holiday-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-holiday-green-700 flex items-center">
        <Trophy className="w-5 h-5 mr-2" />
        Holiday Tasks
      </h2>
      
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No tasks added yet. Start adding holiday tasks!
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group relative p-4 rounded-lg border border-gray-200 hover:border-holiday-green-200 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateTaskStatus(
                        task.id,
                        task.status === 'completed' ? 'pending' : 'completed'
                      )}
                      className={`p-1 rounded-full mr-3 ${
                        task.status === 'completed'
                          ? 'text-holiday-green-600 hover:text-holiday-green-700'
                          : 'text-gray-400 hover:text-holiday-green-600'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <div>
                      <h3 className={`font-medium ${
                        task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'
                      }`}>{task.title}</h3>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${task.priority === 'high'
                        ? 'bg-holiday-red-100 text-holiday-red-800'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {task.category}
                    </span>
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-holiday-green-100 text-holiday-green-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <button 
                    className="p-1 text-gray-400 hover:text-holiday-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-gray-500">
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-holiday-green-600">
                    {task.points} points
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}