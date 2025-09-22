import React, { useState } from 'react';
import { ChefHat, ShoppingCart, BarChart3, Calendar, Utensils, Sparkles, Star, Users, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { IngredientPicker } from './components/IngredientPicker';
import { RecipeGenerator } from './components/RecipeGenerator';
import { MealPlanner } from './components/MealPlanner';
import { ShoppingList } from './components/ShoppingList';
import { NutritionDashboard } from './components/NutritionDashboard';
import { Ingredient, Recipe, MealPlan, mockRecipes } from './data/mockData';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan[]>([]);

  const handleRecipeGenerated = (recipe: Recipe) => {
    if (!generatedRecipes.find(r => r.id === recipe.id)) {
      setGeneratedRecipes([...generatedRecipes, recipe]);
    }
  };

  const handleAddToMealPlan = (recipe: Recipe) => {
    // This would normally open a dialog to select day/meal
    // For demo, we'll just add it to the available recipes
    handleRecipeGenerated(recipe);
  };

  const handleGenerateShoppingList = (currentMealPlan: MealPlan[]) => {
    setMealPlan(currentMealPlan);
  };

  // All available recipes for meal planning (generated + predefined)
  const allAvailableRecipes = [...mockRecipes, ...generatedRecipes];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-amber-200/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-orange-300/10 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Exquisite Header */}
      <header className="relative overflow-hidden">
        {/* Enhanced Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>
        
        {/* Enhanced Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>

        {/* Main Header Content */}
        <div className="relative">
          {/* Navigation Bar */}
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="glass-strong rounded-2xl p-3 shadow-2xl animate-glow smooth-hover">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <div className="transition-all duration-300">
                  <h1 className="text-2xl font-bold text-white smooth-hover">Cooksy</h1>
                  <p className="text-orange-100 text-sm transition-all duration-300">AI-Powered Culinary Assistant</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  className="glass text-white glass-hover rounded-xl transition-all duration-300"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Community
                </Button>
                <Button 
                  variant="ghost" 
                  className="glass text-white glass-hover rounded-xl transition-all duration-300"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Premium
                </Button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="container mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="glass-strong text-white animate-float smooth-hover">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Powered by Advanced AI
                  </Badge>
                  <h2 className="text-5xl font-bold text-white leading-tight transition-all duration-500 hover:scale-[1.02]">
                    Transform Your
                    <span className="bg-gradient-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent block animate-glow">
                      Kitchen Ingredients
                    </span>
                    Into Culinary Magic
                  </h2>
                  <p className="text-xl text-orange-100 leading-relaxed transition-all duration-300 hover:text-white">
                    Discover personalized recipes, plan your meals effortlessly, and make cooking 
                    an adventure with our AI-powered culinary assistant.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="glass-card text-orange-600 hover:bg-white/90 shadow-2xl font-semibold px-8 smooth-hover smooth-focus animate-glow"
                  >
                    <ChefHat className="w-5 h-5 mr-2" />
                    Start Cooking
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="glass text-white glass-hover font-semibold px-8 smooth-focus"
                  >
                    <Clock className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="glass rounded-2xl p-4 text-center smooth-hover" style={{animationDelay: '0.1s'}}>
                    <div className="text-3xl font-bold text-white">10K+</div>
                    <div className="text-orange-100 text-sm transition-colors duration-300">Recipes Generated</div>
                  </div>
                  <div className="glass rounded-2xl p-4 text-center smooth-hover" style={{animationDelay: '0.2s'}}>
                    <div className="text-3xl font-bold text-white">5K+</div>
                    <div className="text-orange-100 text-sm transition-colors duration-300">Happy Cooks</div>
                  </div>
                  <div className="glass rounded-2xl p-4 text-center smooth-hover" style={{animationDelay: '0.3s'}}>
                    <div className="text-3xl font-bold text-white">98%</div>
                    <div className="text-orange-100 text-sm transition-colors duration-300">Success Rate</div>
                  </div>
                </div>
              </div>

              <div className="relative animate-float">
                <div className="relative glass-strong rounded-3xl p-8 shadow-2xl smooth-hover">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1757621788643-395dc581dc6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwY2hlZiUyMGtpdGNoZW4lMjBtb2Rlcm58ZW58MXx8fHwxNzU4NTI4OTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Modern cooking kitchen"
                    className="w-full h-80 object-cover rounded-2xl shadow-lg transition-all duration-500 hover:scale-[1.02]"
                  />
                  
                  {/* Floating Cards */}
                  <div className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 shadow-2xl animate-float smooth-hover" style={{animationDelay: '1s'}}>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-sm">AI Recipe</span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 shadow-2xl animate-float smooth-hover" style={{animationDelay: '2s'}}>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-sm">Smart Planning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <Tabs defaultValue="ingredients" className="space-y-8">
          {/* Enhanced Tab Navigation */}
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-4xl grid-cols-5 h-16 glass-card shadow-2xl rounded-2xl p-2 smooth-hover">
              <TabsTrigger value="ingredients" className="flex flex-col items-center gap-1 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300 hover:scale-105 smooth-focus">
                <Utensils className="w-5 h-5 transition-transform duration-300" />
                <span className="text-xs">Ingredients</span>
              </TabsTrigger>
              <TabsTrigger value="recipes" className="flex flex-col items-center gap-1 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300 hover:scale-105 smooth-focus">
                <ChefHat className="w-5 h-5 transition-transform duration-300" />
                <span className="text-xs">AI Recipes</span>
              </TabsTrigger>
              <TabsTrigger value="planner" className="flex flex-col items-center gap-1 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300 hover:scale-105 smooth-focus">
                <Calendar className="w-5 h-5 transition-transform duration-300" />
                <span className="text-xs">Meal Planner</span>
              </TabsTrigger>
              <TabsTrigger value="shopping" className="flex flex-col items-center gap-1 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300 hover:scale-105 smooth-focus">
                <ShoppingCart className="w-5 h-5 transition-transform duration-300" />
                <span className="text-xs">Shopping</span>
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="flex flex-col items-center gap-1 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all duration-300 hover:scale-105 smooth-focus">
                <BarChart3 className="w-5 h-5 transition-transform duration-300" />
                <span className="text-xs">Nutrition</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="ingredients" className="space-y-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                What's in your kitchen?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Select the ingredients you have available, and our AI will create personalized recipes 
                that transform your everyday ingredients into extraordinary meals.
              </p>
            </div>
            
            <IngredientPicker
              selectedIngredients={selectedIngredients}
              onIngredientsChange={setSelectedIngredients}
            />

            {selectedIngredients.length > 0 && (
              <Card className="glass-card border-orange-200 smooth-hover animate-float">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-orange-500 rounded-full p-2 animate-glow smooth-hover">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    Ready to create magic?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 transition-colors duration-300">
                    Excellent! You've selected {selectedIngredients.length} ingredients. 
                    Head to the AI Recipes tab to generate personalized recipes using your ingredients.
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600 smooth-hover smooth-focus animate-glow">
                    Generate AI Recipes →
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recipes" className="space-y-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                AI-Powered Recipe Generation
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our advanced AI analyzes your ingredients and creates personalized recipes 
                tailored to your taste preferences and dietary requirements.
              </p>
            </div>

            <RecipeGenerator
              selectedIngredients={selectedIngredients}
              onAddToMealPlan={handleAddToMealPlan}
            />
          </TabsContent>

          <TabsContent value="planner" className="space-y-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Smart Meal Planner
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Drag and drop recipes into your weekly meal plan. Stay organized and 
                automatically generate shopping lists for effortless meal preparation.
              </p>
            </div>

            <MealPlanner
              recipes={allAvailableRecipes}
              onGenerateShoppingList={handleGenerateShoppingList}
            />
          </TabsContent>

          <TabsContent value="shopping" className="space-y-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Intelligent Shopping Lists
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Automatically generated shopping lists based on your meal plan. 
                Organized by category and optimized to save you time and money.
              </p>
            </div>

            <ShoppingList
              mealPlan={mealPlan}
              availableIngredients={selectedIngredients}
            />
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-8">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Nutrition Intelligence
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Track your nutritional goals with detailed analytics. Monitor calories, 
                macros, and nutrients to maintain a balanced and healthy lifestyle.
              </p>
            </div>

            <NutritionDashboard mealPlan={mealPlan} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Elegant Footer */}
      <footer className="relative mt-20 overflow-hidden">
        {/* Enhanced Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/5 to-transparent"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-orange-500/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-amber-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>
        
        {/* Content */}
        <div className="relative">
          <div className="container mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {/* Brand Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-500 rounded-2xl p-3 shadow-2xl animate-glow smooth-hover">
                    <ChefHat className="w-8 h-8 text-white" />
                  </div>
                  <div className="transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white smooth-hover">Cooksy</h3>
                    <p className="text-gray-400 text-sm transition-colors duration-300">Culinary Intelligence</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed transition-colors duration-300 hover:text-gray-200">
                  Transform your cooking experience with AI-powered recipe generation, 
                  smart meal planning, and intelligent nutrition tracking.
                </p>
                <div className="flex space-x-4">
                  <div className="glass-dark rounded-full p-3 hover:bg-orange-500 transition-all duration-300 cursor-pointer smooth-hover">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div className="glass-dark rounded-full p-3 hover:bg-orange-500 transition-all duration-300 cursor-pointer smooth-hover">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="glass-dark rounded-full p-3 hover:bg-orange-500 transition-all duration-300 cursor-pointer smooth-hover">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Features</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">AI Recipe Generation</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Smart Meal Planning</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Nutrition Tracking</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Shopping Lists</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Dietary Preferences</li>
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Resources</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Recipe Database</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Cooking Tips</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Nutrition Guide</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Video Tutorials</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Community</li>
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Company</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">About Us</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Careers</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Press Kit</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Contact</li>
                  <li className="hover:text-orange-400 transition-colors cursor-pointer">Support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700">
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-gray-400 text-sm">
                  © 2024 Cooksy by <span className="font-semibold text-orange-400">Matthew Sabeta</span>. All rights reserved.
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <span className="hover:text-orange-400 transition-colors cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-orange-400 transition-colors cursor-pointer">Terms of Service</span>
                  <span className="hover:text-orange-400 transition-colors cursor-pointer">Cookie Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}