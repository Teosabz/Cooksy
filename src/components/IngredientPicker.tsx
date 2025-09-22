import React, { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockIngredients, Ingredient } from '../data/mockData';

interface IngredientPickerProps {
  selectedIngredients: Ingredient[];
  onIngredientsChange: (ingredients: Ingredient[]) => void;
}

export function IngredientPicker({ selectedIngredients, onIngredientsChange }: IngredientPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredIngredients = mockIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedIngredients.find(selected => selected.id === ingredient.id)
  );

  const addIngredient = (ingredient: Ingredient) => {
    onIngredientsChange([...selectedIngredients, ingredient]);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const removeIngredient = (ingredientId: string) => {
    onIngredientsChange(selectedIngredients.filter(ingredient => ingredient.id !== ingredientId));
  };

  const ingredientsByCategory = mockIngredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as Record<string, Ingredient[]>);

  return (
    <Card className="glass-card shadow-2xl smooth-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 transition-all duration-300">
          <span className="text-2xl animate-float">🥬</span>
          What's in your kitchen?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
            className="pl-10"
          />
          
          {/* Search Suggestions */}
          {showSuggestions && filteredIngredients.length > 0 && (
            <div className="absolute z-10 w-full mt-1 glass-card rounded-xl shadow-2xl max-h-48 overflow-y-auto">
              {filteredIngredients.slice(0, 8).map((ingredient) => (
                <button
                  key={ingredient.id}
                  onClick={() => addIngredient(ingredient)}
                  className="w-full px-3 py-2 text-left hover:bg-orange-50 flex items-center gap-2 transition-all duration-200 smooth-hover first:rounded-t-xl last:rounded-b-xl"
                >
                  <span className="text-lg">{ingredient.emoji}</span>
                  <span>{ingredient.name}</span>
                  <Badge variant="secondary" className="ml-auto smooth-hover">
                    {ingredient.category}
                  </Badge>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Ingredients */}
        {selectedIngredients.length > 0 && (
          <div>
            <h4 className="mb-2">Selected Ingredients</h4>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <Badge key={ingredient.id} variant="default" className="flex items-center gap-1">
                  <span>{ingredient.emoji}</span>
                  <span>{ingredient.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIngredient(ingredient.id)}
                    className="h-4 w-4 p-0 hover:bg-destructive/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Add Categories */}
        <div>
          <h4 className="mb-3">Quick Add by Category</h4>
          <div className="space-y-3">
            {Object.entries(ingredientsByCategory).map(([category, ingredients]) => (
              <div key={category}>
                <h5 className="text-sm text-muted-foreground mb-2">{category}</h5>
                <div className="flex flex-wrap gap-1">
                  {ingredients.map((ingredient) => {
                    const isSelected = selectedIngredients.find(selected => selected.id === ingredient.id);
                    return (
                      <Button
                        key={ingredient.id}
                        variant={isSelected ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => isSelected ? removeIngredient(ingredient.id) : addIngredient(ingredient)}
                        className="flex items-center gap-1 smooth-hover smooth-focus transition-all duration-200"
                      >
                        <span>{ingredient.emoji}</span>
                        <span>{ingredient.name}</span>
                        {isSelected && <X className="h-3 w-3" />}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}