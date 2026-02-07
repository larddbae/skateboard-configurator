<?php

namespace Database\Seeders;

use App\Models\Part;
use Illuminate\Database\Seeder;

class PartSeeder extends Seeder
{
    public function run(): void
    {
        $parts = [
            // Decks
            ['name' => 'Classic Street Deck', 'category' => 'deck', 'price' => 45.00, 'stock' => 50, 'description' => 'Standard 8.0" street skateboard deck'],
            ['name' => 'Pro Series Deck', 'category' => 'deck', 'price' => 65.00, 'stock' => 30, 'description' => 'Professional grade 8.25" deck'],
            ['name' => 'Cruiser Deck', 'category' => 'deck', 'price' => 55.00, 'stock' => 25, 'description' => 'Wide 8.5" cruiser deck'],

            // Wheels
            ['name' => 'Street Wheels 52mm', 'category' => 'wheel', 'price' => 35.00, 'stock' => 100, 'description' => '52mm 99A hardness street wheels'],
            ['name' => 'Soft Cruiser Wheels', 'category' => 'wheel', 'price' => 40.00, 'stock' => 80, 'description' => '60mm 78A soft wheels for cruising'],
            ['name' => 'Park Wheels 54mm', 'category' => 'wheel', 'price' => 38.00, 'stock' => 60, 'description' => '54mm 101A park wheels'],

            // Trucks
            ['name' => 'Standard Trucks', 'category' => 'truck', 'price' => 50.00, 'stock' => 40, 'description' => '139mm standard trucks'],
            ['name' => 'Hollow Light Trucks', 'category' => 'truck', 'price' => 70.00, 'stock' => 20, 'description' => '149mm hollow kingpin trucks'],
            ['name' => 'Titanium Trucks', 'category' => 'truck', 'price' => 90.00, 'stock' => 15, 'description' => 'Premium titanium 144mm trucks'],

            // Bolts
            ['name' => 'Standard Hardware', 'category' => 'bolt', 'price' => 8.00, 'stock' => 200, 'description' => '1" allen head bolts set'],
            ['name' => 'Pro Hardware', 'category' => 'bolt', 'price' => 12.00, 'stock' => 150, 'description' => '7/8" phillips head bolts'],
        ];

        foreach ($parts as $part) {
            Part::create($part);
        }
    }
}
