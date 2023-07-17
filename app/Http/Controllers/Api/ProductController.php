<?php

namespace App\Http\Controllers\Api;

use App\Models\ProductChild;
use App\Models\ProductChildPrice;
use App\Models\ProductDrilldownMaster;
use App\Models\ProductMaster;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $sortField = $request->input('sort_field', 'id');
        $sortOrder = $request->input('sort_order', 'asc');

        $query = ProductMaster::query()->with(['category', 'subCategory', 'subSubCategory', 'department', 'brand', 'child', 'childPrice']);

        // Sorting
        $query->orderBy($sortField, $sortOrder);

        // Pagination
//        $products = $query->paginate($perPage);
        $products = $query->get();

        return response()->json($products);
    }

    /**
     * Get list of data for creating products.
     *
     * @return JsonResponse
     */
    public function create(): JsonResponse
    {
        $categories = ProductDrilldownMaster::query()->category()->parent()->get();
        $brands = ProductDrilldownMaster::query()->brand()->parent()->get();
        $departments = ProductDrilldownMaster::query()->department()->parent()->get();
        $uom = ProductMaster::UOM;
        return response()->json([
            'categories' => $categories,
            'brands' => $brands,
            'departments' => $departments,
            'uom' => $uom,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = Validator::make($request->all(), $this->rules('store'));
        if ($validatedData->fails()) {
            return response()->json(['error' => $validatedData->errors()], 401);
        }

        $product = new ProductMaster();
        $product->product_code = $request->input('product_code');
        $product->barcode = $request->input('barcode');
        $product->product_name = $request->input('product_name');
        $product->specification = $request->input('specification');
        $product->category_id = $request->input('category_id');
        $product->sub_category_id = $request->input('sub_category_id');
        $product->sub_sub_category_id = $request->input('sub_sub_category_id');
        $product->department_id = $request->input('department_id');
        $product->product_brand_id = $request->input('product_brand_id');
        $product->description = $request->input('description');
        $product->unit = $request->input('unit');
        $product->pack_details = $request->input('pack_details');
        $product->product_type = $request->input('product_type');
        $product->cr_by = $request->user()->id;
        $product->cr_on = now();

        if($request->hasFile('product_image')){
            $image = $request->file('product_image')->store('uploads/products');
            $product->product_image = $image;
        }
        $product->save();

        $product_child = new ProductChild();
        $product_child->product_id = $product->id;
        $product_child->unique_id = $product->id;
        $product_child->last_supplier_id = $request->input('last_supplier_id');
        $product_child->last_purchase_cost = $request->input('last_purchase_cost');
        $product_child->it_rate1 = $request->input('it_rate1');
        $product_child->it_amount1 = $request->input('it_amount1');
        $product_child->cr_by = $request->user()->id;
        $product_child->cr_on = now();
        $product_child->save();

        $product_child_price = new ProductChildPrice();
        $product_child_price->product_id = $product->id;
        $product_child_price->unique_id = $product->id;
        $product_child_price->unit_price = $request->input('unit_price');
        $product_child_price->ot_rate1 = $request->input('ot_rate1');
        $product_child_price->ot_amount1 = $request->input('ot_amount1');
        $product_child_price->cr_by = $request->user()->id;
        $product_child_price->cr_on = now();
        $product_child_price->save();
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $product = ProductMaster::findOrFail($id);
        $product_child = ProductChild::where('product_id', $product->id)->first();
        $product_child_price = ProductChildPrice::where('product_id', $product->id)->first();

        $data = [];
        $data['product_code'] = $product->product_code;
        $data['barcode'] = $product->barcode;
        $data['description'] = $product->description;
        $data['product_name'] = $product->product_name;
        $data['specification'] = $product->specification;
        $data['category_id'] = $product->category_id;
        $data['sub_category_id'] = $product->sub_category_id;
        $data['sub_sub_category_id'] = $product->sub_sub_category_id;
        $data['department_id'] = $product->department_id;
        $data['product_brand_id'] = $product->product_brand_id;
        $data['unit'] = $product->unit;
        $data['pack_details'] = $product->pack_details;
        $data['product_type'] = $product->product_type;
        $data['product_image'] = $product->product_image;

        $data['last_supplier_id'] = $product_child->last_supplier_id;
        $data['last_purchase_cost'] = $product_child->last_purchase_cost;
        $data['it_rate1'] = $product_child->it_rate1;
        $data['it_amount1'] = $product_child->it_amount1;

        $data['unit_price'] = $product_child_price->unit_price;
        $data['ot_rate1'] = $product_child_price->ot_rate1;
        $data['ot_amount1'] = $product_child_price->ot_amount1;

        $data['category'] = $product->category;
        $data['sub_category'] = $product->subCategory;
        $data['sub_sub_category'] = $product->subSubCategory;
        $data['department'] = $product->department;
        $data['product_brand'] = $product->brand;


        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        $validatedData = Validator::make($request->all(), $this->rules('update'));
        if ($validatedData->fails()) {
            return response()->json(['error' => $validatedData->errors()], 401);
        }
        $product = ProductMaster::findOrFail($id);
        $product_child = ProductChild::where('product_id', $product->id)->first();
        $product_child_price = ProductChildPrice::where('product_id', $product->id)->first();

        $product->product_code = $request->input('product_code') ?? $product->product_code;
        $product->barcode = $request->input('barcode') ?? $product->barcode;
        $product->product_name = $request->input('product_name') ?? $product->product_name;
        $product->specification = $request->input('specification') ?? $product->specification;
        $product->category_id = $request->input('category_id') ?? $product->category_id;
        $product->sub_category_id = $request->input('sub_category_id') ?? $product->sub_category_id;
        $product->sub_sub_category_id = $request->input('sub_sub_category_id') ?? $product->sub_sub_category_id;
        $product->department_id = $request->input('department_id') ?? $product->department_id;
        $product->product_brand_id = $request->input('product_brand_id') ?? $product->product_brand_id;
        $product->description = $request->input('description') ?? $product->description;
        $product->unit = $request->input('unit') ?? $product->unit;
        $product->pack_details = $request->input('pack_details') ?? $product->pack_details;
        $product->product_type = $request->input('product_type') ?? $product->product_type;
        $product->mod_by = $request->user()->id;
        if($request->hasFile('product_image')){
            $image = $request->file('product_image')->store('uploads/products');
            $product->product_image = $image;
        }
        $product->mod_on = now();

        $product_child->last_supplier_id = $request->input('last_supplier_id') ?? $product_child->last_supplier_id;
        $product_child->last_purchase_cost = $request->input('last_purchase_cost') ?? $product_child->last_purchase_cost;
        $product_child->it_rate1 = $request->input('it_rate1') ?? $product_child->it_rate1;
        $product_child->it_amount1 = $request->input('it_amount1') ?? $product_child->it_amount1;
        $product_child->mod_by = $request->user()->id;
        $product_child->mod_on = now();

        $product_child_price->unit_price = $request->input('unit_price') ?? $product_child_price->unit_price;
        $product_child_price->ot_rate1 = $request->input('ot_rate1') ?? $product_child_price->ot_rate1;
        $product_child_price->ot_amount1 = $request->input('ot_amount1') ?? $product_child_price->ot_amount1;
        $product_child_price->mod_by = $request->user()->id;
        $product_child_price->mod_on = now();

        $product->save();
        $product_child->save();
        $product_child_price->save();

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $product = ProductMaster::findOrFail($id);
        ProductChild::where('product_id', $product->id)->delete();
        ProductChildPrice::where('product_id', $product->id)->delete();
        $product->delete();
        return response()->json(null, 204);
    }

    public function getSubCategories(Request $request): JsonResponse
    {
        $parent_id = $request->input('parent_id');
        $perPage = $request->input('per_page', 10);
        $sortField = $request->input('sort_field', 'id');
        $sortOrder = $request->input('sort_order', 'asc');

        $categories = ProductDrilldownMaster::query()->category();
        $categories = $categories->orderBy($sortField, $sortOrder);
        if ($parent_id)
            $categories = $categories->where('parent_id', $parent_id);
        else
            $categories = $categories->child();
        if ($request->type == "list") {
            $categories = $categories->pluck('drilldown_code', 'id');
        } else {
//            $categories = $categories->paginate($perPage);
            $categories = $categories->get();
        }
        return response()->json($categories);
    }

    public function rules($method): array
    {
        if ($method == 'store') {
            return [
                'product_code' => 'required|max:255',
                'barcode' => 'required|max:255',
                'product_name' => 'required|max:255',
                'specification' => 'required|string|max:250',
                'category_id' => 'nullable|exists:product_drilldown_masters,id',
                'sub_category_id' => 'nullable|exists:product_drilldown_masters,id',
                'sub_sub_category_id' => 'nullable|exists:product_drilldown_masters,id',
                'department_id' => 'nullable|exists:product_drilldown_masters,id',
                'product_brand_id' => 'nullable|exists:product_drilldown_masters,id',
                'description' => 'required',
                'unit' => 'required|in:' . implode(',', ProductMaster::UOM),
                'pack_details' => 'required|numeric',
                'product_type' => 'required|string|max:10',
                'product_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'last_supplier_id' => 'required',
                'pack_qty' => 'required',
                'last_purchase_cost' => 'required',
                'it_rate1' => 'required',
                'it_amount1' => 'required',
                'unit_price' => 'required',
                'ot_rate1' => 'required',
                'ot_amount1' => 'required',
            ];
        } else {
            return [
                'product_code' => 'max:255',
                'barcode' => 'max:255',
                'product_name' => 'max:255',
                'specification' => 'string|max:250',
                'category_id' => 'exists:product_drilldown_masters,id',
                'sub_category_id' => 'exists:product_drilldown_masters,id',
                'sub_sub_category_id' => 'exists:product_drilldown_masters,id',
                'department_id' => 'exists:product_drilldown_masters,id',
                'product_brand_id' => 'exists:product_drilldown_masters,id',
                'description' => '',
                'unit' => 'in:' . implode(',', ProductMaster::UOM),
                'pack_details' => 'numeric',
                'product_type' => 'string|max:10',
                'product_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'last_supplier_id' => '',
                'pack_qty' => '',
                'last_purchase_cost' => '',
                'it_rate1' => '',
                'it_amount1' => '',
                'unit_price' => '',
                'ot_rate1' => '',
                'ot_amount1' => '',
            ];
        }
    }
}

