<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    protected $fillable = [
        'name',
        'category',
        'texture_url',
        'model_3d_ref',
        'price',
        'stock',
        'description',
        'weight',
        'durability',
        'speed',
        'pop',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'weight' => 'decimal:2',
    ];

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
