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
            ['name' => 'Classic Street Deck', 'category' => 'deck', 'price' => 45.00, 'stock' => 50, 'description' => 'Standard 8.0" street skateboard deck', 'weight' => 1.2, 'durability' => 80, 'speed' => 90, 'pop' => 85],
            ['name' => 'Pro Series Deck', 'category' => 'deck', 'price' => 65.00, 'stock' => 30, 'description' => 'Professional grade 8.25" deck', 'weight' => 1.1, 'durability' => 95, 'speed' => 95, 'pop' => 92],
            ['name' => 'Cruiser Deck', 'category' => 'deck', 'price' => 55.00, 'stock' => 25, 'description' => 'Wide 8.5" cruiser deck', 'weight' => 1.5, 'durability' => 70, 'speed' => 80, 'pop' => 60],

            // Wheels
            ['name' => 'Street Wheels 52mm', 'category' => 'wheel', 'price' => 35.00, 'stock' => 100, 'description' => '52mm 99A hardness street wheels', 'weight' => 0.2, 'durability' => 85, 'speed' => 90, 'pop' => 75],
            ['name' => 'Soft Cruiser Wheels', 'category' => 'wheel', 'price' => 40.00, 'stock' => 80, 'description' => '60mm 78A soft wheels for cruising', 'weight' => 0.3, 'durability' => 90, 'speed' => 95, 'pop' => 50],
            ['name' => 'Park Wheels 54mm', 'category' => 'wheel', 'price' => 38.00, 'stock' => 60, 'description' => '54mm 101A park wheels', 'weight' => 0.25, 'durability' => 88, 'speed' => 92, 'pop' => 80],

            // Trucks
            ['name' => 'Standard Trucks', 'category' => 'truck', 'price' => 50.00, 'stock' => 40, 'description' => '139mm standard trucks', 'weight' => 0.7, 'durability' => 90, 'speed' => 80, 'pop' => 80],
            ['name' => 'Hollow Light Trucks', 'category' => 'truck', 'price' => 70.00, 'stock' => 20, 'description' => '149mm hollow kingpin trucks', 'weight' => 0.5, 'durability' => 85, 'speed' => 85, 'pop' => 85],
            ['name' => 'Titanium Trucks', 'category' => 'truck', 'price' => 90.00, 'stock' => 15, 'description' => 'Premium titanium 144mm trucks', 'weight' => 0.4, 'durability' => 98, 'speed' => 90, 'pop' => 90],

            // Bolts
            ['name' => 'Standard Hardware', 'category' => 'bolt', 'price' => 8.00, 'stock' => 200, 'description' => '1" allen head bolts set', 'weight' => 0.1, 'durability' => 80, 'speed' => 50, 'pop' => 50],
            ['name' => 'Pro Hardware', 'category' => 'bolt', 'price' => 12.00, 'stock' => 150, 'description' => '7/8" phillips head bolts', 'weight' => 0.05, 'durability' => 95, 'speed' => 60, 'pop' => 60],
        ];

        foreach ($parts as $part) {
            Part::create($part);
        }
    }
}
