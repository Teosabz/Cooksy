import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check, X, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { MealPlan, Ingredient } from '../data/mockData';

interface ShoppingListProps {
  mealPlan: MealPlan[];
  availableIngredients: Ingredient[];
}

interface ShoppingItem {
  ingredient: Ingredient;
  totalAmount: string;
  recipes: string[];
  checked: boolean;
}

export function ShoppingList({ mealPlan, availableIngredients }: ShoppingListProps) {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [showOnlyNeeded, setShowOnlyNeeded] = useState(true);

  useEffect(() => {
    generateShoppingList();
  }, [mealPlan, availableIngredients]);

  const generateShoppingList = () => {
    const ingredientMap = new Map<string, ShoppingItem>();

    // Process each meal plan item
    mealPlan.forEach((mealItem) => {
      if (!mealItem.recipe) return;

      mealItem.recipe.ingredients.forEach((recipeIngredient) => {
        const ingredient = recipeIngredient.ingredient;
        const existingItem = ingredientMap.get(ingredient.id);

        if (existingItem) {
          // Combine amounts (simplified - in real app would parse and add quantities)
          existingItem.totalAmount = `${existingItem.totalAmount} + ${recipeIngredient.amount}`;
          if (!existingItem.recipes.includes(mealItem.recipe!.title)) {
            existingItem.recipes.push(mealItem.recipe!.title);
          }
        } else {
          ingredientMap.set(ingredient.id, {
            ingredient,
            totalAmount: recipeIngredient.amount,
            recipes: [mealItem.recipe.title],
            checked: false
          });
        }
      });
    });

    const items = Array.from(ingredientMap.values());
    
    // Filter out ingredients the user already has
    const neededItems = items.filter(item => 
      !availableIngredients.find(available => available.id === item.ingredient.id)
    );

    setShoppingItems(showOnlyNeeded ? neededItems : items);
  };

  const toggleItem = (ingredientId: string) => {
    setShoppingItems(items =>
      items.map(item =>
        item.ingredient.id === ingredientId
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  };

  const toggleShowOnlyNeeded = () => {
    setShowOnlyNeeded(!showOnlyNeeded);
    generateShoppingList();
  };

  const checkedCount = shoppingItems.filter(item => item.checked).length;
  const totalCount = shoppingItems.length;

  // Group items by category
  const itemsByCategory = shoppingItems.reduce((acc, item) => {
    const category = item.ingredient.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  const calculateTotalCost = () => {
    // Mock pricing for demonstration
    const mockPrices: Record<string, number> = {
      'Vegetables': 2.50,
      'Protein': 8.99,
      'Grains': 3.25,
      'Dairy': 4.50,
      'Oils': 5.99,
      'Fruits': 3.75,
      'Herbs': 2.99,
      'Legumes': 1.99
    };

    return shoppingItems
      .filter(item => !item.checked)
      .reduce((total, item) => total + (mockPrices[item.ingredient.category] || 3.00), 0);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping List
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleShowOnlyNeeded}
            >
              {showOnlyNeeded ? 'Show All' : 'Show Needed Only'}
            </Button>
          </div>
        </div>
        {totalCount > 0 && (
          <div className="text-sm text-muted-foreground">
            {checkedCount} of {totalCount} items completed • Estimated cost: ${calculateTotalCost().toFixed(2)}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {shoppingItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Add recipes to your meal plan to generate a shopping list!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(itemsByCategory).map(([category, items]) => (
              <div key={category}>
                <h4 className="mb-3 flex items-center gap-2">
                  <span className="text-lg">
                    {category === 'Vegetables' && '🥬'}
                    {category === 'Protein' && '🍖'}
                    {category === 'Grains' && '🌾'}
                    {category === 'Dairy' && '🥛'}
                    {category === 'Oils' && '🫒'}
                    {category === 'Fruits' && '🍎'}
                    {category === 'Herbs' && '🌿'}
                    {category === 'Legumes' && '🫘'}
                  </span>
                  {category}
                  <Badge variant="secondary">{items.length}</Badge>
                </h4>
                
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.ingredient.id}
                      className={`flex items-start gap-3 p-3 border rounded-lg transition-colors ${
                        item.checked ? 'bg-muted/50 text-muted-foreground' : 'bg-card'
                      }`}
                    >
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => toggleItem(item.ingredient.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{item.ingredient.emoji}</span>
                          <span className={item.checked ? 'line-through' : ''}>
                            {item.ingredient.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {item.totalAmount}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <span>For: {item.recipes.join(', ')}</span>
                        </div>
                        
                        {/* Nutrition info */}
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.ingredient.nutritionPer100g.calories} cal/100g • 
                          {item.ingredient.nutritionPer100g.protein}g protein
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShoppingItems(items =>
                  items.map(item => ({ ...item, checked: true }))
                )}
                className="flex-1"
              >
                <Check className="w-4 h-4 mr-2" />
                Check All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShoppingItems(items =>
                  items.map(item => ({ ...item, checked: false }))
                )}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Uncheck All
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}