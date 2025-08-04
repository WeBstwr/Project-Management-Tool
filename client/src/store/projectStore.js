import { create } from 'zustand';

const initialProjects = [
    {
        id: 1,
        name: 'Website Redesign',
        description: 'Update the company website with a new look.',
        members: ['Alice', 'Bob'],
    },
    {
        id: 2,
        name: 'Mobile App Launch',
        description: 'Release the new mobile app to the public.',
        members: ['Charlie', 'Dana'],
    },
];

const useProjectStore = create((set) => ({
    projects: initialProjects,
    addProject: (project) => set((state) => ({
        projects: [
            ...state.projects,
            { ...project, id: Date.now() },
        ],
    })),
    removeProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
    })),
}));

export default useProjectStore;
