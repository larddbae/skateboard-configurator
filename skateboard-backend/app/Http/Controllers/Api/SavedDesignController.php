<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SavedDesign;
use Illuminate\Http\Request;

class SavedDesignController extends Controller
{
    /**
     * Display a listing of user's saved designs.
     */
    public function index(Request $request)
    {
        $designs = $request->user()->savedDesigns()->latest()->get();

        return response()->json([
            'designs' => $designs,
        ]);
    }

    /**
     * Store a newly created design.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'configuration' => 'required|array',
            'thumbnail_url' => 'nullable|string',
        ]);

        $design = $request->user()->savedDesigns()->create($validated);

        return response()->json([
            'message' => 'Design saved successfully',
            'design' => $design,
        ], 201);
    }

    /**
     * Display the specified design.
     */
    public function show(Request $request, string $id)
    {
        $design = $request->user()->savedDesigns()->findOrFail($id);

        return response()->json([
            'design' => $design,
        ]);
    }

    /**
     * Update the specified design.
     */
    public function update(Request $request, string $id)
    {
        $design = $request->user()->savedDesigns()->findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'configuration' => 'sometimes|array',
            'thumbnail_url' => 'nullable|string',
        ]);

        $design->update($validated);

        return response()->json([
            'message' => 'Design updated successfully',
            'design' => $design,
        ]);
    }

    /**
     * Remove the specified design.
     */
    public function destroy(Request $request, string $id)
    {
        $design = $request->user()->savedDesigns()->findOrFail($id);
        $design->delete();

        return response()->json([
            'message' => 'Design deleted successfully',
        ]);
    }
}
