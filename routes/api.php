<?php

namespace App\Http\Controllers\Api;
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
    Route::prefix('account-head')->group(function () {
        Route::post('/', [AccountHeadController::class, 'index']);
        Route::post('/store', [AccountHeadController::class, 'store']);
        Route::get('/{id}', [AccountHeadController::class, 'show']);
        Route::post('/update/{id}', [AccountHeadController::class, 'update']);
        Route::delete('/{id}', [AccountHeadController::class, 'destroy']);
    });

//    purchase
    Route::prefix('purchase')->group(function (){
        Route::post('/', [PurchaseController::class, 'index']);
        Route::post('/getDetails', [PurchaseController::class, 'getDetails']);
        Route::post('/getProducts', [PurchaseController::class, 'getProducts']);
        Route::post('/store', [PurchaseController::class, 'storePurchase']);
        Route::get('/edit/{id}', [PurchaseController::class, 'editPurchase']);
        Route::post('/update/{id}', [PurchaseController::class, 'updatePurchase']);
        Route::post('/cancel/{id}', [PurchaseController::class, 'cancelPurchase']);
        Route::post('/post/{id}', [PurchaseController::class, 'postPurchase']);
    });
});

//    purchase
//Route::prefix('purchase')->group(function (){
//    Route::get('/getDetails', [PurchaseController::class, 'getDetails']);
//    Route::get('/getProducts', [PurchaseController::class, 'getProducts']);
//});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
