import React, { useState, useMemo } from 'react';
import { Apple, Search, Plus, X, ChevronRight, Info, Utensils } from 'lucide-react';
import { GlassCard, ProgressBar, AIRecommendationCard, EmptyState } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Mock Food Database (Structured for API Swap)
const foodDB = [
  { id: 'f1', name: 'Greek Yogurt', serving: '1 cup (245g)', cal: 140, pro: 24, carb: 10, fat: 0 },
  { id: 'f2', name: 'Scrambled Eggs', serving: '2 large', cal: 140, pro: 12, carb: 2, fat: 10 },
  { id: 'f3', name: 'Grilled Chicken Breast', serving: '4 oz (113g)', cal: 185, pro: 35, carb: 0, fat: 4 },
  { id: 'f4', name: 'Paneer Tikka', serving: '150g', cal: 400, pro: 25, carb: 10, fat: 28 },
  { id: 'f5', name: 'Brown Rice', serving: '1 cup cooked', cal: 215, pro: 5, carb: 45, fat: 2 },
  { id: 'f6', name: 'Almonds', serving: '1 oz (28g)', cal: 160, pro: 6, carb: 6, fat: 14 },
  { id: 'f7', name: 'Protein Shake (Whey)', serving: '1 scoop', cal: 120, pro: 24, carb: 3, fat: 1 },
  { id: 'f8', name: 'Banana', serving: '1 medium', cal: 105, pro: 1, carb: 27, fat: 0 },
];

const DAILY_GOALS = {
  cal: 2000,
  pro: 150, // grams
  carb: 250, // grams
  fat: 65 // grams
};

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export const Nutrition = () => {
  const [log, setLog] = useLocalStorage('eudaimix_nutrition_log', []);
  
  // Search Modal State
  const [searchMealType, setSearchMealType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Derived Totals
  const totals = useMemo(() => {
    return log.reduce((acc, item) => ({
      cal: acc.cal + item.cal,
      pro: acc.pro + item.pro,
      carb: acc.carb + item.carb,
      fat: acc.fat + item.fat
    }), { cal: 0, pro: 0, carb: 0, fat: 0 });
  }, [log]);

  // AI Suggestions Logic
  const getAISuggestion = () => {
    const remCal = DAILY_GOALS.cal - totals.cal;
    const remPro = DAILY_GOALS.pro - totals.pro;

    if (remCal < 0) {
      return { title: 'Goal Reached', message: 'You have reached your calorie goal for today! Keep an eye on hydration.', action: null };
    }
    
    if (remPro > 30 && remCal > 300) {
      return { 
        title: 'Protein Shortfall', 
        message: `You're ${remPro}g short of your protein goal. Consider adding Greek yogurt, grilled chicken, paneer, or tofu to your next meal.`,
        action: 'Search High Protein'
      };
    }
    if (totals.carb < DAILY_GOALS.carb * 0.5 && remCal > 500) {
      return {
        title: 'Energy Fuel Needed',
        message: 'Your carbohydrate intake is low. If you have a workout planned, consider eating a banana or brown rice for sustained energy.',
        action: 'Search Carbs'
      };
    }
    return {
      title: 'On Track!',
      message: 'Your macros look balanced. Keep hitting those goals!',
      action: null
    };
  };
  const aiSuggestion = getAISuggestion();

  // Handlers
  const handleAddFood = (food) => {
    const newEntry = { ...food, logId: Date.now().toString(), type: searchMealType };
    setLog([...log, newEntry]);
    setSearchMealType(null);
    setSearchQuery('');
  };

  const handleDeleteFood = (logId) => {
    setLog(log.filter(item => item.logId !== logId));
  };

  const searchResults = foodDB.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="page-animate" style={{ paddingBottom: '7rem' }}>
      
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '2rem' }}>Nutrition</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Fuel your body to feel your best.</p>
      </header>

      {/* Daily Summary */}
      <section style={{ marginBottom: '2.5rem' }}>
        <GlassCard style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Calories</div>
              <div style={{ fontSize: '2.5rem', color: 'var(--color-brand-navy)', fontWeight: 700, lineHeight: 1 }}>{totals.cal}</div>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>/ {DAILY_GOALS.cal} kcal</div>
          </div>
          <ProgressBar progress={(totals.cal / DAILY_GOALS.cal) * 100} color="var(--color-brand-gold)" height="12px" />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Protein</div>
              <div style={{ fontWeight: 600, color: 'var(--color-brand-navy)', marginBottom: '0.25rem' }}>{totals.pro}g <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>/ {DAILY_GOALS.pro}g</span></div>
              <ProgressBar progress={(totals.pro / DAILY_GOALS.pro) * 100} color="var(--color-alert-red)" height="6px" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Carbs</div>
              <div style={{ fontWeight: 600, color: 'var(--color-brand-navy)', marginBottom: '0.25rem' }}>{totals.carb}g <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>/ {DAILY_GOALS.carb}g</span></div>
              <ProgressBar progress={(totals.carb / DAILY_GOALS.carb) * 100} color="var(--color-brand-sky)" height="6px" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Fats</div>
              <div style={{ fontWeight: 600, color: 'var(--color-brand-navy)', marginBottom: '0.25rem' }}>{totals.fat}g <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>/ {DAILY_GOALS.fat}g</span></div>
              <ProgressBar progress={(totals.fat / DAILY_GOALS.fat) * 100} color="var(--color-brand-mid)" height="6px" />
            </div>
          </div>
        </GlassCard>
      </section>

      {/* AI Suggestion */}
      <div style={{ marginBottom: '2.5rem' }}>
        <AIRecommendationCard 
          title={aiSuggestion.title}
          message={aiSuggestion.message}
          actionLabel={aiSuggestion.action}
          onAction={() => { if(aiSuggestion.action) setSearchMealType('Snacks'); }}
        />
      </div>

      {/* Meal Sections */}
      {log.length === 0 ? (
        <EmptyState 
          icon={Utensils} 
          title="No Meals Logged" 
          message="Start tracking your nutrition to hit your goals."
          actionLabel="Add Breakfast"
          onAction={() => setSearchMealType('Breakfast')}
        />
      ) : (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {MEAL_TYPES.map(mealType => {
            const mealItems = log.filter(item => item.type === mealType);
            const mealCals = mealItems.reduce((sum, item) => sum + item.cal, 0);

            return (
              <GlassCard key={mealType} style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mealItems.length > 0 ? '1rem' : '0' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-brand-navy)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Utensils size={18} color="var(--color-brand-gold)" /> {mealType}
                  </h3>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{mealCals} kcal</span>
                </div>

                {mealItems.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                    {mealItems.map(item => (
                      <div key={item.logId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--color-brand-navy)' }}>{item.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                            {item.serving} • P: {item.pro}g • C: {item.carb}g • F: {item.fat}g
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.cal}</span>
                          <button onClick={() => handleDeleteFood(item.logId)} style={{ background: 'none', border: 'none', color: 'var(--color-alert-red)', cursor: 'pointer', padding: '0.25rem' }}>
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => setSearchMealType(mealType)}
                  style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: '1px dashed var(--color-brand-mid)', borderRadius: '12px', color: 'var(--color-brand-mid)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
                >
                  <Plus size={18} /> Add {mealType}
                </button>
              </GlassCard>
            );
          })}
        </section>
      )}

      {/* Search/Add Food Bottom Sheet */}
      {searchMealType && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} onClick={() => setSearchMealType(null)}>
          <div style={{ backgroundColor: 'var(--color-bg)', height: '80vh', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.3s ease-out' }} onClick={e => e.stopPropagation()}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--color-brand-navy)' }}>Add to {searchMealType}</h3>
              <button onClick={() => setSearchMealType(null)} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-brand-mid)' }} />
              <input 
                type="text" 
                placeholder="Search food database..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.1)', background: 'white', fontSize: '1rem', outline: 'none' }}
              />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '2rem' }}>No foods found.</div>
              ) : (
                searchResults.map(food => (
                  <div key={food.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.7)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-brand-navy)' }}>{food.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                        {food.serving} • <span style={{ color: 'var(--color-brand-gold)' }}>{food.cal} kcal</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.7rem', color: 'var(--color-brand-mid)', marginTop: '0.25rem' }}>
                        <span>P: {food.pro}g</span>
                        <span>C: {food.carb}g</span>
                        <span>F: {food.fat}g</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddFood(food)}
                      style={{ background: 'var(--color-brand-navy)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(30, 58, 95, 0.2)' }}
                    >
                      ADD
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
