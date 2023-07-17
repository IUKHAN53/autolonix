<?php

namespace App\Http\Controllers\Api;

use App\Models\ProductDrilldownMaster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DrilldownController extends Controller
{
    public function index(Request $request)
    {
        $query = ProductDrilldownMaster::query();

        // Sorting
        if ($request->has('sort_by')) {
            $sortDirection = $request->input('sort_direction', 'asc');
            $query->orderBy($request->input('sort_by'), $sortDirection);
        }

        // Pagination
        $perPage = $request->input('per_page', 10);
        $query->category()->parent();
        if ($request->type == 'list') {
            $categories = $query->pluck("drilldown_code", "id");
        } else {
//            $categories = $query->paginate($perPage);
            $categories = $query->get();
        }

        return response()->json($categories);
    }

    public function show($id)
    {
        $category = ProductDrilldownMaster::findOrFail($id);

        return response()->json($category);
    }

    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'drilldown_code' => 'required|string|max:50',
            'drilldown_description' => 'required|string|max:250',
            'drilldown_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validatedData->fails()) {
            return response()->json(['error' => $validatedData->errors()], 401);
        }

        $category = new ProductDrilldownMaster();
        $category->drilldown_code = $request->input('drilldown_code');
        $category->drilldown_description = $request->input('drilldown_description');
        $category->cr_on = now();
        $category->cr_by = $request->user()->id;
        $category->drilldown_type = 'Category';

        if($request->hasFile('drilldown_image')){
            $image = $request->file('drilldown_image');
            $name = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/uploads/drilldowns');
            $image->move($destinationPath, $name);
            $category->drilldown_image = $name;
        }

        $category->save();

        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = Validator::make($request->all(), [
            'drilldown_code' => 'nullable|string|max:50',
            'drilldown_description' => 'nullable|string|max:250',
            'drilldown_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validatedData->fails()) {
            return response()->json(['error' => $validatedData->errors()], 401);
        }

        $category = ProductDrilldownMaster::findOrFail($id);
        $category->drilldown_code = $request->input('drilldown_code', $category->drilldown_code);
        $category->drilldown_description = $request->input('drilldown_description', $category->drilldown_description);
        $category->mod_by = $request->user()->id;
        $category->mod_on = now();

        if($request->hasFile('drilldown_image')){
            $image = $request->file('drilldown_image');
            $name = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/uploads/drilldowns');
            $image->move($destinationPath, $name);
            $category->drilldown_image = $name;
        }

        $category->save();

        return response()->json($category);
    }

    public function destroy($id): \Illuminate\Http\JsonResponse
    {
        $category = ProductDrilldownMaster::findOrFail($id);
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
            'drilldown_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validatedData->fails()) {
            return response()->json(['error' => $validatedData->errors()], 401);
        }
        $subcategory = new ProductDrilldownMaster();
        $subcategory->parent_id = $request->input('parent_id');
        $subcategory->drilldown_type = 'Category';
        $subcategory->drilldown_code = $request->input('drilldown_code');
        $subcategory->drilldown_description = $request->input('drilldown_description');

        if($request->hasFile('drilldown_image')){
            $image = $request->file('drilldown_image');
            $name = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/uploads/drilldowns');
            $image->move($destinationPath, $name);
            $subcategory->drilldown_image = $name;
        }

        $subcategory->cr_by = $request->user()->id;
        $subcategory->cr_on = now();
        $subcategory->save();

        return response()->json($subcategory, 201);
    }

    public function subcategoryUpdate(Request $request, $id)
    {
        $validatedData = Validator::make($request->all(), [
            'parent_id' => 'required',
            'drilldown_code' => 'nullable|string|max:50',
            'drilldown_description' => 'nullable|string|max:250',
            'drilldown_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validatedData->fails()) {
            return response()->json(['error' => $validatedData->errors()], 401);
        }

        $subcategory = ProductDrilldownMaster::findOrFail($id);

        $subcategory->drilldown_code = $request->input('drilldown_code', $subcategory->drilldown_code);
        $subcategory->drilldown_description = $request->input('drilldown_description', $subcategory->drilldown_description);
        if($request->hasFile('drilldown_image')){
            $image = $request->file('drilldown_image');
            $name = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/uploads/drilldowns');
            $image->move($destinationPath, $name);
            $subcategory->drilldown_image = $name;
        }
        $subcategory->parent_id = $request->input('parent_id', $subcategory->parent_id);
        $subcategory->mod_by = $request->user()->id;
        $subcategory->mod_on = now();
        $subcategory->save();

        return response()->json($subcategory);
    }

}
