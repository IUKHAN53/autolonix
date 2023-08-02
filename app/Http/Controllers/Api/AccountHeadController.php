<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AccountHeadMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AccountHeadController extends Controller
{
    public function index(Request $request)
    {
        $query = AccountHeadMaster::query();
        if ($request->has('sort_by')) {
            $sortDirection = $request->input('sort_direction', 'asc');
            $query->orderBy($request->input('sort_by'), $sortDirection);
        }
        if ($request->has('type')) {
            if ($request->type == 'customer') {
                $data = $query->where('parent_account_id', getCustomerAccountId())->get();
            }else if ($request->type == 'supplier') {
                $data = $query->where('parent_account_id', getSupplierAccountId())->get();
            }else{
                $data = $query->where('parent_account_id', null)->get();
            }
        }
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->getValidationRules());

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $account_head = AccountHeadMaster::create($request->except('type'));
        if ($request->has('type')) {
            if ($request->type == 'customer'){
                $account_head->account_id = getMaxId('account_head_masters', 'account_id');
                $account_head->parent_account_id = getCustomerAccountId();
            }else if ($request->type == 'supplier'){
                $account_head->account_id = getMaxId('account_head_masters', 'account_id');
                $account_head->parent_account_id = getSupplierAccountId();
            }
        }
        $account_head->station_id = getStationId();
        $account_head->account_type = 'BS';
        $account_head->save();


        return response()->json($account_head, 201);
    }

    public function show($id)
    {
        return AccountHeadMaster::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $customer = AccountHeadMaster::findOrFail($id);

        $validator = Validator::make($request->all(), $this->getValidationRules());

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
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

    private function getValidationRules()
    {
        return [
            'account_code' => ['required', 'string', 'max:255'],
            'account_name' => 'required|string|max:255',
            'telephone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'trn_no' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
        ];
    }
}
