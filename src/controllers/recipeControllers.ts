import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';


const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
interface RecipeResponse {
    id: string;
    title: string;
    servings: number;
    prepTime: number;
    cookTime: number;
    description: string;
    ingredients: string[];
    directions: string[];
}

interface FoodItem {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    quantity?: string;
}

interface RecipeRequest {
    id: string;
    name: "breakfast" | "lunch" | "dinner";
    foods: FoodItem[];
}

export const getRecipe = async(req: any, res: any) => {
    if(req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
    }
    const recipeRequest = req.body as RecipeRequest;

    if(!recipeRequest) {
        res.status(400).json({ error: 'Invalid request' });
    }
    //return 400 error if recipeRequest is not valid
    const name = recipeRequest.name;
    const foodList = recipeRequest.foods.map((food) => `${food.quantity} ${food.name}`).join(', ');
    const formatInstructions = `Please put your answer in the following json format:
       {
           "title": "Title of the recipe",
           "servings": "Number of servings",
           "prepTime": "Prep time in minutes",
           "cookTime": "Cook time in minutes",
           "description": "Description of the recipe",
           "ingredients": ["List of ingredients"],
           "directions": ["List of directions"]
       }`
       const prompt = `Generate a recipe for ${name} that uses the following ingredients: ${foodList}.
       ${formatInstructions}`;

       const response = await openaiClient.chat.completions.create({
           model: 'gpt-3.5-turbo',
           messages: [{ role: 'user', content: prompt }],
           max_tokens: 1000
       })
       console.log(response);
       if(!response) {
           res.status(500).json({ error: 'No response from OpenAI' });
       } else if(!response.choices[0]) {
           res.status(500).json({ error: 'No response choices from OpenAI' });
       } else if(!response.choices[0].message) {
           res.status(500).json({ error: 'No response message from OpenAI' });
       } else if(!response.choices[0].message.content) {
           res.status(500).json({ error: 'No response content from OpenAI' });
       } else {
        const recipeResponse = JSON.parse(response.choices[0].message.content) as RecipeResponse;
        if(!recipeResponse) {
            res.status(500).json({ error: 'Recipe response from OpenAI is not valid' });
        }
        res.status(200).json(recipeResponse);
       }
}



