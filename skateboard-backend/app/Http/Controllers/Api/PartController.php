<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Part;
use Illuminate\Http\Request;

class PartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Part::query();

        // Filter by category if provided
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Filter by in-stock only
        if ($request->boolean('in_stock')) {
            $query->where('stock', '>', 0);
        }

        $parts = $query->get();

        return response()->json([
            'parts' => $parts,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $part = Part::findOrFail($id);

        return response()->json([
            'part' => $part,
        ]);
    }

    /**
     * Get parts by category.
     */
    public function byCategory(string $category)
    {
        $parts = Part::where('category', $category)->get();

        return response()->json([
            'parts' => $parts,
        ]);
    }
}
