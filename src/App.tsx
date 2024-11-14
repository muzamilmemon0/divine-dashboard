import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DailyImaanTracker } from '@/components/DailyImaanTracker';
import { PrayerTracker } from '@/components/PrayerTracker';
import { DhikrCounter } from '@/components/DhikrCounter';
import { QuranTracker } from '@/components/QuranTracker';
import { GoodDeedsTracker } from '@/components/GoodDeedsTracker';
import { CharityTracker } from '@/components/CharityTracker';
import { SpiritualNotes } from '@/components/SpiritualNotes';
import { GoalSetting } from '@/components/GoalSetting';
import { AnalyticsInsights } from '@/components/AnalyticsInsights';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="divine-dashboard-theme">
      <div className="min-h-screen bg-background p-8">
        <header className="container mx-auto mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Divine Dashboard</h1>
          <ThemeToggle />
        </header>
        <main className="container mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            <AnalyticsInsights />
            <DailyImaanTracker />
            <PrayerTracker />
            <DhikrCounter />
            <QuranTracker />
            <GoodDeedsTracker />
            <CharityTracker />
            <SpiritualNotes />
            <GoalSetting />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;