import { create } from 'zustand';

const initialTasks = [
    {
        id: 1,
        projectId: 1,
        title: 'Design homepage',
        status: 'todo',
        assignee: 'Alice',
    },
    {
        id: 2,
        projectId: 1,
        title: 'Write API docs',
        status: 'in progress',
        assignee: 'Bob',
    },
    {
        id: 3,
        projectId: 2,
        title: 'App store submission',
        status: 'todo',
        assignee: 'Charlie',
    },
];

const useTaskStore = create((set) => ({
    tasks: initialTasks,
    addTask: (task) => set((state) => ({
        tasks: [
            ...state.tasks,
            { ...task, id: Date.now() },
        ],
    })),
    removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
    })),
    updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t),
    })),
    getTasksByProject: (projectId) => {
        return useTaskStore.getState().tasks.filter((t) => t.projectId === projectId);
    },
}));

export default useTaskStore;
