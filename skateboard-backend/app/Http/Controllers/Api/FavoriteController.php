<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Display user's favorite parts.
     */
    public function index(Request $request)
    {
        $favorites = $request->user()->favorites()->with('part')->get();

        return response()->json([
            'favorites' => $favorites,
        ]);
    }

    /**
     * Add a part to favorites.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'part_id' => 'required|exists:parts,id',
        ]);

        $existing = $request->user()->favorites()
            ->where('part_id', $validated['part_id'])
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Part already in favorites',
            ], 409);
        }

        $favorite = $request->user()->favorites()->create($validated);

        return response()->json([
            'message' => 'Added to favorites',
            'favorite' => $favorite->load('part'),
        ], 201);
    }

    /**
     * Remove a part from favorites.
     */
    public function destroy(Request $request, string $id)
    {
        $favorite = $request->user()->favorites()->findOrFail($id);
        $favorite->delete();

        return response()->json([
            'message' => 'Removed from favorites',
        ]);
    }
}
