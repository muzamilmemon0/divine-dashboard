import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Prayer {
  name: string;
  time: string;
  completed: boolean;
}

interface GoodDeed {
  id: string;
  description: string;
  timestamp: string;
}

interface CharityDonation {
  id: string;
  amount: number;
  description: string;
  timestamp: string;
}

interface SpiritualNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: string;
}

interface Goal {
  id: string;
  title: string;
  category: 'prayer' | 'quran' | 'dhikr' | 'charity' | 'other';
  target: number;
  current: number;
  deadline: string;
  completed: boolean;
}

interface DailyState {
  date: string;
  imaanLevel: number;
  note: string;
  prayers: Prayer[];
  dhikrCount: number;
  quranPages: number;
  quranMinutes: number;
  goodDeeds: GoodDeed[];
  charityDonations: CharityDonation[];
  spiritualNotes: SpiritualNote[];
  goals: Goal[];
}

interface DashboardState {
  dailyState: DailyState;
  setImaanLevel: (level: number) => void;
  setNote: (note: string) => void;
  togglePrayer: (prayerName: string) => void;
  incrementDhikr: () => void;
  resetDhikr: () => void;
  setQuranPages: (pages: number) => void;
  setQuranMinutes: (minutes: number) => void;
  addGoodDeed: (description: string) => void;
  removeGoodDeed: (id: string) => void;
  addCharityDonation: (amount: number, description: string) => void;
  removeCharityDonation: (id: string) => void;
  addSpiritualNote: (title: string, content: string, tags: string[]) => void;
  removeSpiritualNote: (id: string) => void;
  addGoal: (
    title: string,
    category: Goal['category'],
    target: number,
    deadline: string
  ) => void;
  updateGoalProgress: (id: string, current: number) => void;
  removeGoal: (id: string) => void;
  toggleGoalCompletion: (id: string) => void;
}

const defaultPrayers: Prayer[] = [
  { name: 'Fajr', time: '05:30', completed: false },
  { name: 'Dhuhr', time: '13:00', completed: false },
  { name: 'Asr', time: '16:30', completed: false },
  { name: 'Maghrib', time: '19:30', completed: false },
  { name: 'Isha', time: '21:00', completed: false },
];

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      dailyState: {
        date: new Date().toISOString().split('T')[0],
        imaanLevel: 5,
        note: '',
        prayers: defaultPrayers,
        dhikrCount: 0,
        quranPages: 0,
        quranMinutes: 0,
        goodDeeds: [],
        charityDonations: [],
        spiritualNotes: [],
        goals: [],
      },
      setImaanLevel: (level) =>
        set((state) => ({
          dailyState: { ...state.dailyState, imaanLevel: level },
        })),
      setNote: (note) =>
        set((state) => ({
          dailyState: { ...state.dailyState, note },
        })),
      togglePrayer: (prayerName) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            prayers: state.dailyState.prayers.map((prayer) =>
              prayer.name === prayerName
                ? { ...prayer, completed: !prayer.completed }
                : prayer
            ),
          },
        })),
      incrementDhikr: () =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            dhikrCount: state.dailyState.dhikrCount + 1,
          },
        })),
      resetDhikr: () =>
        set((state) => ({
          dailyState: { ...state.dailyState, dhikrCount: 0 },
        })),
      setQuranPages: (pages) =>
        set((state) => ({
          dailyState: { ...state.dailyState, quranPages: pages },
        })),
      setQuranMinutes: (minutes) =>
        set((state) => ({
          dailyState: { ...state.dailyState, quranMinutes: minutes },
        })),
      addGoodDeed: (description) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            goodDeeds: [
              {
                id: crypto.randomUUID(),
                description,
                timestamp: new Date().toISOString(),
              },
              ...state.dailyState.goodDeeds,
            ],
          },
        })),
      removeGoodDeed: (id) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            goodDeeds: state.dailyState.goodDeeds.filter((deed) => deed.id !== id),
          },
        })),
      addCharityDonation: (amount, description) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            charityDonations: [
              {
                id: crypto.randomUUID(),
                amount,
                description,
                timestamp: new Date().toISOString(),
              },
              ...state.dailyState.charityDonations,
            ],
          },
        })),
      removeCharityDonation: (id) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            charityDonations: state.dailyState.charityDonations.filter(
              (donation) => donation.id !== id
            ),
          },
        })),
      addSpiritualNote: (title, content, tags) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            spiritualNotes: [
              {
                id: crypto.randomUUID(),
                title,
                content,
                tags,
                timestamp: new Date().toISOString(),
              },
              ...state.dailyState.spiritualNotes,
            ],
          },
        })),
      removeSpiritualNote: (id) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            spiritualNotes: state.dailyState.spiritualNotes.filter(
              (note) => note.id !== id
            ),
          },
        })),
      addGoal: (title, category, target, deadline) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            goals: [
              {
                id: crypto.randomUUID(),
                title,
                category,
                target,
                current: 0,
                deadline,
                completed: false,
              },
              ...state.dailyState.goals,
            ],
          },
        })),
      updateGoalProgress: (id, current) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            goals: state.dailyState.goals.map((goal) =>
              goal.id === id ? { ...goal, current } : goal
            ),
          },
        })),
      removeGoal: (id) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            goals: state.dailyState.goals.filter((goal) => goal.id !== id),
          },
        })),
      toggleGoalCompletion: (id) =>
        set((state) => ({
          dailyState: {
            ...state.dailyState,
            goals: state.dailyState.goals.map((goal) =>
              goal.id === id ? { ...goal, completed: !goal.completed } : goal
            ),
          },
        })),
    }),
    {
      name: 'divine-dashboard',
    }
  )
);