<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Part;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIController extends Controller
{
    /**
     * Get AI-powered skateboard recommendations based on user preferences.
     */
    public function getRecommendation(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:500',
            'context' => 'nullable|array',
        ]);

        // Get available parts for context
        $parts = Part::all()->groupBy('category');

        // Build parts context for AI
        $partsContext = "Available skateboard parts:\n";
        foreach ($parts as $category => $items) {
            $partsContext .= "\n{$category}s:\n";
            foreach ($items as $part) {
                $partsContext .= "- {$part->name} (ID: {$part->id}, Price: \${$part->price}): {$part->description}\n";
            }
        }

        // System prompt for the AI
        $systemPrompt = <<<PROMPT
You are a helpful skateboard expert assistant for a skateboard configurator app.
Your job is to help users choose the right skateboard parts based on their skill level, skating style, and preferences.

{$partsContext}

Guidelines:
1. Be friendly and conversational
2. When recommending parts, ALWAYS include the exact part ID in your response
3. Format recommendations as: "I recommend the [Part Name] (ID: X)"
4. Consider the user's skill level (beginner, intermediate, advanced)
5. Consider skating style (street, park, cruising, tricks)
6. Keep responses concise but helpful
7. If asked for a complete setup, recommend one part from each category (deck, wheel, truck, bolt)
PROMPT;

        try {
            $response = Http::timeout(60)->withHeaders([
                'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
                'Content-Type' => 'application/json',
                'HTTP-Referer' => env('APP_URL', 'http://localhost:3000'),
                'X-Title' => 'Skateboard AI Configurator',
            ])->post('https://openrouter.ai/api/v1/chat/completions', [
                        'model' => 'google/gemini-2.0-flash-exp:free',
                        'messages' => [
                            [
                                'role' => 'system',
                                'content' => $systemPrompt,
                            ],
                            [
                                'role' => 'user',
                                'content' => $validated['message'],
                            ],
                        ],
                        'temperature' => 0.7,
                        'max_tokens' => 500,
                    ]);

            if ($response->failed()) {
                return response()->json([
                    'error' => 'AI service unavailable',
                    'details' => $response->json(),
                    'status' => $response->status(),
                ], 500);
            }

            $aiResponse = $response->json();
            $message = $aiResponse['choices'][0]['message']['content'] ?? 'Sorry, I could not generate a response.';

            // Extract part IDs from the response (pattern: ID: X)
            preg_match_all('/ID:\s*(\d+)/', $message, $matches);
            $recommendedPartIds = array_unique($matches[1] ?? []);

            // Get recommended parts details
            $recommendedParts = [];
            if (!empty($recommendedPartIds)) {
                $recommendedParts = Part::whereIn('id', $recommendedPartIds)->get();
            }

            return response()->json([
                'message' => $message,
                'recommended_parts' => $recommendedParts,
                'model' => $aiResponse['model'] ?? 'unknown',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to get AI recommendation',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Quick style quiz to get personalized recommendations.
     */
    public function styleQuiz(Request $request)
    {
        $validated = $request->validate([
            'skill_level' => 'required|in:beginner,intermediate,advanced',
            'style' => 'required|in:street,park,cruising,all-around',
            'budget' => 'nullable|in:low,medium,high',
        ]);

        $message = "I'm a {$validated['skill_level']} skater who mainly does {$validated['style']} skating.";

        if (isset($validated['budget'])) {
            $budgetText = match ($validated['budget']) {
                'low' => 'on a tight budget',
                'medium' => 'with a moderate budget',
                'high' => 'willing to spend more for quality',
            };
            $message .= " I'm {$budgetText}.";
        }

        $message .= " Please recommend a complete skateboard setup for me.";

        // Reuse the recommendation logic
        $request->merge(['message' => $message]);
        return $this->getRecommendation($request);
    }
}
