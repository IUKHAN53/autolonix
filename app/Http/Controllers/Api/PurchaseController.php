<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function getProducts(Request $request)
    {

    }

    public function index()
    {
        return response()->json(['message' => 'Hello World!']);
    }
}
