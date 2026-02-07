<?php

use App\Http\Controllers\Api\AIController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PartController;
use App\Http\Controllers\Api\SavedDesignController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Parts - Public access
Route::get('/parts', [PartController::class, 'index']);
Route::get('/parts/{id}', [PartController::class, 'show']);
Route::get('/parts/category/{category}', [PartController::class, 'byCategory']);

// AI Recommendations - Public access
Route::post('/ai/recommend', [AIController::class, 'getRecommendation']);
Route::post('/ai/quiz', [AIController::class, 'styleQuiz']);

// Auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Routes (Require Authentication)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Saved Designs (My Garage)
    Route::apiResource('/user/designs', SavedDesignController::class);

    // Orders (Checkout & History)
    Route::get('/user/orders', [OrderController::class, 'index']);
    Route::post('/checkout', [OrderController::class, 'store']);
    Route::get('/user/orders/{id}', [OrderController::class, 'show']);

    // Favorites (Wishlist)
    Route::get('/user/favorites', [FavoriteController::class, 'index']);
    Route::post('/user/favorites', [FavoriteController::class, 'store']);
    Route::delete('/user/favorites/{id}', [FavoriteController::class, 'destroy']);
});
