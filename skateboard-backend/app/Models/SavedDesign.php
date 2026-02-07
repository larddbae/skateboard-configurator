<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavedDesign extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'configuration',
        'thumbnail_url',
    ];

    protected $casts = [
        'configuration' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
