<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DrilldownController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/me', [AuthController::class, 'me']);

    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::get('/create', [ProductController::class, 'create']);
        Route::post('/', [ProductController::class, 'store']);
        Route::get('/{id}', [ProductController::class, 'show']);
        Route::post('/update/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
    });

    Route::prefix('categories')->group(function () {
        Route::post('/', [DrilldownController::class, 'index']);
        Route::post('/store', [DrilldownController::class, 'store']);
        Route::get('/{id}', [DrilldownController::class, 'show']);
        Route::post('/update/{id}', [DrilldownController::class, 'update']);
        Route::delete('/{id}', [DrilldownController::class, 'destroy']);
    });

    Route::prefix('subcategories')->group(function () {
        Route::post('/', [ProductController::class, 'getSubCategories']);
        Route::post('/store', [DrilldownController::class, 'subcategoryStore']);
        Route::get('/{id}', [DrilldownController::class, 'show']);
        Route::post('/update/{id}', [DrilldownController::class, 'subcategoryUpdate']);
        Route::delete('/{id}', [DrilldownController::class, 'destroy']);
    });

//    Customers
    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomerController::class, 'index']);
        Route::post('/', [CustomerController::class, 'store']);
        Route::get('/{id}', [CustomerController::class, 'show']);
        Route::post('/update/{id}', [CustomerController::class, 'update']);
        Route::delete('/{id}', [CustomerController::class, 'destroy']);
    });
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
