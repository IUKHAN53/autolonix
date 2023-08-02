<?php

namespace App\Http\Controllers\Api;

use App\Models\ProductDrilldownMaster;
use App\Models\ProductMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DrilldownController extends Controller
{
    public function index(Request $request)
    {
        $query = ProductDrilldownMaster::query()->with('children');

        // Sorting
        if ($request->has('sort_by')) {
            $sortDirection = $request->input('sort_direction', 'asc');
            $query->orderBy($request->input('sort_by'), $sortDirection);
        }
        if (isset($request->type)) {
            if ($request->type == 'brand') {
                $query = $query->brand();
            } else if ($request->type == 'department') {
                $query = $query->department();
            } else {
                $query = $query->category();
            }
        } else {
            $query = $query->category();
        }
        if(isset($request->parent_id)){
            $query = $query->where('parent_id', $request->parent_id);
        }else{
            $query = $query->parent();
        }
        return response()->json($query->get());
    }

    public function show($id)
    {
        $category = ProductDrilldownMaster::with('children')->where('drilldown_id',$id)->first();
        return response()->json($category);
    }

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'drilldown_code' => 'required|string|max:50',
            'drilldown_description' => 'required|string|max:250',
            'drilldown_image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'drilldown_type' => 'nullable',
        ]);

        if ($validatedData->fails()) {
            return response()->json(['error' => $validatedData->errors()], 401);
        }

        $category = new ProductDrilldownMaster();
        $category->drilldown_id = getMaxId('product_drilldown_masters','drilldown_id');
        $category->drilldown_code = $request->input('drilldown_code');
        $category->drilldown_description = $request->input('drilldown_description');
        $category->drilldown_status = 'ACTIVE';
        $category->upload_status = 0;
        $category->station_id = getStationId();
        $category->cr_on = now();
        $category->cr_by = $request->user()->id;
        $category->drilldown_type = $request->drilldown_type ?? 'Category';

        if ($request->hasFile('drilldown_image')) {
            $image = $request->file('drilldown_image')->store('uploads/drilldowns');
            $category->drilldown_image = $image;
        }

        $category->save();

        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = Validator::make($request->all(), [
            'drilldown_code' => 'nullable|string|max:50',
            'drilldown_description' => 'nullable|string|max:250',
            'drilldown_image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'drilldown_type' => 'nullable',
        ]);

        if ($validatedData->fails()) {
            return response()->json(['error' => $validatedData->errors()], 401);
        }

        $category = ProductDrilldownMaster::where('drilldown_id',$id)->first();
        $category->drilldown_code = $request->input('drilldown_code', $category->drilldown_code);
        $category->drilldown_description = $request->input('drilldown_description', $category->drilldown_description);
        $category->drilldown_status = 'ACTIVE';
        $category->upload_status = 0;
        $category->mod_by = $request->user()->id;
        $category->mod_on = now();

        if ($request->hasFile('drilldown_image')) {
            $image = $request->file('drilldown_image')->store('uploads/drilldowns');
            $category->drilldown_image = $image;
        }

        $category->save();

        return response()->json($category);
    }

    public function destroy($id): \Illuminate\Http\JsonResponse
    {
        $category = ProductDrilldownMaster::where('drilldown_id',$id)->first();
        if(ProductMaster::query()
            ->where('category_id', $id)
            ->Orwhere('sub_category_id', $id)
            ->Orwhere('sub_sub_category_id', $id)
            ->Orwhere('department_id', $id)
            ->Orwhere('product_brand_id', $id)
            ->exists())
        {
            return response()->json([
                'message' => 'Cannot delete. Because it has Products associated with it.'
            ], 400);
        }
        ProductDrilldownMaster::query()->where('parent_id', $id)->delete();
        $category->delete();

        return response()->json(null, 204);
    }

    public function subcategoryStore(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'parent_id' => 'required',
            'drilldown_code' => 'required|string|max:50',
            'drilldown_description' => 'required|string|max:250',
            'drilldown_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validatedData->fails()) {
            return response()->json(['error' => $validatedData->errors()], 401);
        }
        $subcategory = new ProductDrilldownMaster();
        $subcategory->drilldown_id = getMaxId('product_drilldown_masters','drilldown_id');
        $subcategory->parent_id = $request->input('parent_id');
        $subcategory->drilldown_type = 'Category';
        $subcategory->drilldown_status = 'ACTIVE';
        $subcategory->upload_status = 0;
        $subcategory->station_id = getStationId();
        $subcategory->drilldown_code = $request->input('drilldown_code');
        $subcategory->drilldown_description = $request->input('drilldown_description');

        if ($request->hasFile('drilldown_image')) {
            $image = $request->file('drilldown_image')->store('uploads/drilldowns');
            $subcategory->drilldown_image = $image;
        }

        $subcategory->cr_by = $request->user()->id;
        $subcategory->cr_on = now();
        $subcategory->save();

        return response()->json($subcategory, 201);
    }

    public function subcategoryUpdate(Request $request, $id)
    {
        $validatedData = Validator::make($request->all(), [
            'parent_id' => 'nullable',
            'drilldown_code' => 'nullable|string|max:50',
            'drilldown_description' => 'nullable|string|max:250',
            'drilldown_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validatedData->fails()) {
            return response()->json(['error' => $validatedData->errors()], 401);
        }

        $subcategory = ProductDrilldownMaster::where('drilldown_id',$id)->first();

        $subcategory->drilldown_code = $request->input('drilldown_code', $subcategory->drilldown_code);
        $subcategory->drilldown_description = $request->input('drilldown_description', $subcategory->drilldown_description);
        if ($request->hasFile('drilldown_image')) {
            $image = $request->file('drilldown_image')->store('uploads/drilldowns');
            $subcategory->drilldown_image = $image;
        }
        $subcategory->drilldown_status = 'ACTIVE';
        $subcategory->upload_status = 0;
        $subcategory->parent_id = $request->input('parent_id', $subcategory->parent_id);
        $subcategory->mod_by = $request->user()->id;
        $subcategory->mod_on = now();
        $subcategory->save();

        return response()->json($subcategory);
    }



}
