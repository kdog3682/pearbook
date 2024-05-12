const assignments = [
    {
        id: 1,
        title: "Write a Research Paper",
        description:
            "Conduct research and write a 10-page paper on a topic of your choice.",
        dueDate: "2024-05-20",
    },
    {
        id: 2,
        title: "Prepare a Presentation",
        description:
            "Create a 20-slide presentation on the importance of sustainability.",
        dueDate: "2024-06-01",
    },
    {
        id: 3,
        title: "Complete a Case Study",
        description:
            "Analyze a provided case study and submit a report.",
        dueDate: "2024-06-15",
    },
]
export const useAssignmentStore = defineStore(
    "assignments",
    () => {
        const get = (id) => {
            return assignments.find((assignment) =>
                assignment.id == id
            )
        }
        return { assignments, get }
    },
)
