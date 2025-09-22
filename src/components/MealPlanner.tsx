import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Calendar, Plus, X, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Recipe, MealPlan, weekDays, mealTypes, mockMealPlan } from '../data/mockData';

interface MealPlannerProps {
  recipes: Recipe[];
  onGenerateShoppingList: (mealPlan: MealPlan[]) => void;
}

interface DragItem {
  type: string;
  recipe: Recipe;
}

interface MealSlotProps {
  day: string;
  meal: typeof mealTypes[number];
  recipe?: Recipe;
  onDrop: (recipe: Recipe, day: string, meal: typeof mealTypes[number]) => void;
  onRemove: (day: string, meal: typeof mealTypes[number]) => void;
}

function MealSlot({ day, meal, recipe, onDrop, onRemove }: MealSlotProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'recipe',
    drop: (item: DragItem) => {
      onDrop(item.recipe, day, meal);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getMealEmoji = (meal: string) => {
    switch (meal) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      case 'snack': return '🍎';
      default: return '🍽️';
    }
  };

  return (
    <div
      ref={drop}
      className={`border-2 border-dashed rounded-lg p-3 min-h-[120px] transition-colors ${
        isOver 
          ? 'border-primary bg-primary/5' 
          : recipe 
            ? 'border-border bg-card' 
            : 'border-muted-foreground/30 bg-muted/20 hover:border-muted-foreground/50'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground capitalize flex items-center gap-1">
          {getMealEmoji(meal)} {meal}
        </span>
        {recipe && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(day, meal)}
            className="h-6 w-6 p-0 hover:bg-destructive/20"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      {recipe ? (
        <div className="space-y-2">
          <h4 className="line-clamp-2 text-sm">{recipe.title}</h4>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{recipe.cookTime}min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{recipe.servings}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <Plus className="w-6 h-6 mx-auto mb-1 opacity-50" />
            <p className="text-xs">Drop a recipe here</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface DraggableRecipeProps {
  recipe: Recipe;
}

function DraggableRecipe({ recipe }: DraggableRecipeProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'recipe',
    item: { recipe },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <h4 className="line-clamp-1 text-sm mb-2">{recipe.title}</h4>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{recipe.cookTime}min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{recipe.servings}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function MealPlanner({ recipes, onGenerateShoppingList }: MealPlannerProps) {
  const [mealPlan, setMealPlan] = useState<MealPlan[]>(mockMealPlan);

  const handleDrop = (recipe: Recipe, day: string, meal: typeof mealTypes[number]) => {
    const newMealPlan = mealPlan.filter(item => !(item.day === day && item.meal === meal));
    newMealPlan.push({
      id: `${day}-${meal}-${Date.now()}`,
      day,
      meal,
      recipe
    });
    setMealPlan(newMealPlan);
  };

  const handleRemove = (day: string, meal: typeof mealTypes[number]) => {
    setMealPlan(mealPlan.filter(item => !(item.day === day && item.meal === meal)));
  };

  const getMealForSlot = (day: string, meal: typeof mealTypes[number]) => {
    return mealPlan.find(item => item.day === day && item.meal === meal);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Weekly Meal Planner
              </CardTitle>
              <Button onClick={() => onGenerateShoppingList(mealPlan)}>
                Generate Shopping List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Meal Planning Grid */}
            <div className="space-y-4">
              {weekDays.map((day) => (
                <div key={day} className="grid gap-3">
                  <h3 className="font-medium border-b pb-2">{day}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {mealTypes.map((meal) => {
                      const mealItem = getMealForSlot(day, meal);
                      return (
                        <MealSlot
                          key={`${day}-${meal}`}
                          day={day}
                          meal={meal}
                          recipe={mealItem?.recipe}
                          onDrop={handleDrop}
                          onRemove={handleRemove}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Recipes */}
        {recipes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Available Recipes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Drag and drop recipes into your meal plan
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {recipes.map((recipe) => (
                  <DraggableRecipe key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DndProvider>
  );
}