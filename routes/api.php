<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DrilldownController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/me', [AuthController::class, 'me']);
//    Products API
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/create', [ProductController::class, 'create']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

//    Categories API
    Route::get('/categories', [DrilldownController::class, 'index']);
    Route::post('/categories', [DrilldownController::class, 'store']);
    Route::get('/categories/{id}', [DrilldownController::class, 'show']);
    Route::put('/categories/{id}', [DrilldownController::class, 'update']);
    Route::delete('/categories/{id}', [DrilldownController::class, 'destroy']);

//    SubCategories API
    Route::get('/subcategories', [ProductController::class, 'getSubCategories']);
    Route::post('/subcategories', [DrilldownController::class, 'subcategoryStore']);
    Route::get('/subcategories/{id}', [DrilldownController::class, 'show']);
    Route::put('/subcategories/{id}', [DrilldownController::class, 'subcategoryUpdate']);
    Route::delete('/subcategories/{id}', [DrilldownController::class, 'destroy']);
});

