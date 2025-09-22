import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Activity, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { MealPlan } from '../data/mockData';

interface NutritionDashboardProps {
  mealPlan: MealPlan[];
}

export function NutritionDashboard({ mealPlan }: NutritionDashboardProps) {
  // Calculate daily nutrition from meal plan
  const calculateDailyNutrition = () => {
    const dailyNutrition: Record<string, any> = {};

    mealPlan.forEach((mealItem) => {
      if (!mealItem.recipe) return;

      if (!dailyNutrition[mealItem.day]) {
        dailyNutrition[mealItem.day] = {
          day: mealItem.day,
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
          meals: []
        };
      }

      const nutrition = mealItem.recipe.nutrition;
      dailyNutrition[mealItem.day].calories += nutrition.calories;
      dailyNutrition[mealItem.day].protein += nutrition.protein;
      dailyNutrition[mealItem.day].carbs += nutrition.carbs;
      dailyNutrition[mealItem.day].fat += nutrition.fat;
      dailyNutrition[mealItem.day].fiber += nutrition.fiber;
      dailyNutrition[mealItem.day].meals.push({
        meal: mealItem.meal,
        recipe: mealItem.recipe.title,
        calories: nutrition.calories
      });
    });

    return Object.values(dailyNutrition);
  };

  const dailyNutrition = calculateDailyNutrition();

  // Calculate weekly averages
  const weeklyAverages = dailyNutrition.length > 0 ? {
    calories: Math.round(dailyNutrition.reduce((sum, day) => sum + day.calories, 0) / dailyNutrition.length),
    protein: Math.round(dailyNutrition.reduce((sum, day) => sum + day.protein, 0) / dailyNutrition.length),
    carbs: Math.round(dailyNutrition.reduce((sum, day) => sum + day.carbs, 0) / dailyNutrition.length),
    fat: Math.round(dailyNutrition.reduce((sum, day) => sum + day.fat, 0) / dailyNutrition.length),
    fiber: Math.round(dailyNutrition.reduce((sum, day) => sum + day.fiber, 0) / dailyNutrition.length)
  } : { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };

  // Daily targets (example values)
  const dailyTargets = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67,
    fiber: 25
  };

  // Macro distribution for pie chart
  const macroData = [
    { name: 'Protein', value: weeklyAverages.protein * 4, color: '#8b5cf6' },
    { name: 'Carbs', value: weeklyAverages.carbs * 4, color: '#06b6d4' },
    { name: 'Fat', value: weeklyAverages.fat * 9, color: '#f59e0b' }
  ];

  const getMacroPercentage = (macro: string) => {
    const totalCalories = macroData.reduce((sum, item) => sum + item.value, 0);
    const macroCalories = macroData.find(item => item.name === macro)?.value || 0;
    return totalCalories > 0 ? Math.round((macroCalories / totalCalories) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Calories</p>
                <p className="text-2xl font-bold">{weeklyAverages.calories}</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <Progress 
              value={(weeklyAverages.calories / dailyTargets.calories) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((weeklyAverages.calories / dailyTargets.calories) * 100)}% of target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="text-2xl font-bold">{weeklyAverages.protein}g</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
            <Progress 
              value={(weeklyAverages.protein / dailyTargets.protein) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((weeklyAverages.protein / dailyTargets.protein) * 100)}% of target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Carbs</p>
                <p className="text-2xl font-bold">{weeklyAverages.carbs}g</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <Progress 
              value={(weeklyAverages.carbs / dailyTargets.carbs) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((weeklyAverages.carbs / dailyTargets.carbs) * 100)}% of target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fat</p>
                <p className="text-2xl font-bold">{weeklyAverages.fat}g</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                F
              </div>
            </div>
            <Progress 
              value={(weeklyAverages.fat / dailyTargets.fat) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((weeklyAverages.fat / dailyTargets.fat) * 100)}% of target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fiber</p>
                <p className="text-2xl font-bold">{weeklyAverages.fiber}g</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                Fi
              </div>
            </div>
            <Progress 
              value={(weeklyAverages.fiber / dailyTargets.fiber) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((weeklyAverages.fiber / dailyTargets.fiber) * 100)}% of target
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Calories Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Calories</CardTitle>
          </CardHeader>
          <CardContent>
            {dailyNutrition.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyNutrition}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Add meals to see daily calorie breakdown
              </div>
            )}
          </CardContent>
        </Card>

        {/* Macro Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Macro Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {macroData.some(item => item.value > 0) ? (
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="60%" height={300}>
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${Math.round(value)} cal`, 'Calories']} />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-3">
                  {macroData.map((macro) => (
                    <div key={macro.name} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded" 
                        style={{ backgroundColor: macro.color }}
                      />
                      <div>
                        <p className="text-sm font-medium">{macro.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {getMacroPercentage(macro.name)}% • {Math.round(macro.value)} cal
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Add meals to see macro distribution
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Daily Breakdown */}
      {dailyNutrition.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Daily Meal Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {dailyNutrition.map((day) => (
                <div key={day.day} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{day.day}</h4>
                    <Badge variant="secondary">
                      {day.calories} calories
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Protein:</span>
                      <span className="ml-1">{day.protein}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Carbs:</span>
                      <span className="ml-1">{day.carbs}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fat:</span>
                      <span className="ml-1">{day.fat}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fiber:</span>
                      <span className="ml-1">{day.fiber}g</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-1">Meals:</p>
                    <div className="flex flex-wrap gap-2">
                      {day.meals.map((meal: any, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {meal.meal}: {meal.recipe} ({meal.calories} cal)
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}