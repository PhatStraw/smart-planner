import { create } from 'zustand';

const usePlans = create((set) => ({
    plans: [],
    selectedPlan: [],
    onNewPlans: (newPlans) => set({ plans: newPlans }),
    onNewSelectedPlan: (newPlan) => set({ selectedPlan: newPlan })
}));


export default usePlans;