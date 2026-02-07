<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Part;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display user's order history.
     */
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->latest()->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    /**
     * Process checkout (create new order).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.part_id' => 'required|exists:parts,id',
            'items.*.quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($request, $validated) {
            $totalPrice = 0;
            $orderItems = [];

            foreach ($validated['items'] as $item) {
                $part = Part::findOrFail($item['part_id']);

                // Check stock
                if ($part->stock < $item['quantity']) {
                    return response()->json([
                        'message' => "Insufficient stock for {$part->name}",
                    ], 400);
                }

                // Calculate price
                $itemTotal = $part->price * $item['quantity'];
                $totalPrice += $itemTotal;

                // Add to order items
                $orderItems[] = [
                    'part_id' => $part->id,
                    'name' => $part->name,
                    'price' => $part->price,
                    'quantity' => $item['quantity'],
                    'subtotal' => $itemTotal,
                ];

                // Reduce stock
                $part->decrement('stock', $item['quantity']);
            }

            $order = $request->user()->orders()->create([
                'total_price' => $totalPrice,
                'items' => $orderItems,
                'status' => 'completed',
                'notes' => $validated['notes'] ?? null,
            ]);

            return response()->json([
                'message' => 'Order placed successfully',
                'order' => $order,
            ], 201);
        });
    }

    /**
     * Display the specified order.
     */
    public function show(Request $request, string $id)
    {
        $order = $request->user()->orders()->findOrFail($id);

        return response()->json([
            'order' => $order,
        ]);
    }
}
