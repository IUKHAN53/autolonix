<?php

namespace App\Http\Controllers;

use App\Models\AccountHeadMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CustomerController extends Controller
{
    public function index()
    {
        return AccountHeadMaster::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->getValidationRules());

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $customer = AccountHeadMaster::create($request->all());
        return response()->json($customer, 201);
    }

    public function show($id)
    {
        return AccountHeadMaster::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $customer = AccountHeadMaster::findOrFail($id);

        $validator = Validator::make($request->all(), $this->getValidationRules($id));

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $customer->update($request->all());
        return response()->json($customer, 200);
    }

    public function destroy($id)
    {
        $customer = AccountHeadMaster::findOrFail($id);
        $customer->delete();
        return response()->json(['message' => 'AccountHeadMaster deleted successfully'], 200);
    }

    private function getValidationRules($customerId = null)
    {
        $rules = [
            'account_code' => ['required', 'string', 'max:255', Rule::unique('account_head_masters')->ignore($customerId)],
            'account_name' => 'required|string|max:255',
            'telephone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'trn_no' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
        ];

        return $rules;
    }
}
