<?php

namespace App\Http\Controllers\Api;

use App\Models\AccountHeadMaster;
use App\Models\ProductChild;
use App\Models\ProductChildPrice;
use App\Models\ProductDrilldownMaster;
use App\Models\ProductMaster;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
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
        $uom = uom();
        $product_type = productType();
        return response()->json([
            'categories' => $categories,
            'suppliers' => AccountHeadMaster::query()->where('parent_account_id', getSupplierAccountId())->get()->toArray(),
            'brands' => $brands,
            'departments' => $departments,
            'uom' => $uom,
            'product_type' => $product_type,
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
        try {
            DB::beginTransaction();
            $product = new ProductMaster();
            $product->product_id = getMaxId('product_masters', 'product_id');
            $product->unique_id = $product->product_id;
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
            $product->pack_qty = 1;
            $product->product_type = $request->input('product_type');
            $product->cr_by = $request->user()->id;
            $product->cr_on = now();

            if ($request->hasFile('product_image')) {
                $image = $request->file('product_image')->store('uploads/products');
                $product->product_image = $image;
            }
            $product->save();

            $product_child = new ProductChild();
            $product_child->product_child_id = getMaxId('product_child', 'product_child_id');
            $product_child->product_id = $product->product_id;
            $product_child->unique_id = $product->product_id;
            $product_child->pack_qty = 1;
            $product_child->last_supplier_id = $request->input('last_supplier_id');
            $product_child->last_purchase_cost = $request->input('last_purchase_cost');
            $product_child->it_rate1 = 0;
            $product_child->it_amount1 = 0;
            $product_child->average_cost = $request->input('unit_price');
            $product_child->station_id = getStationId();
            $product_child->cr_by = $request->user()->id;
            $product_child->cr_on = now();
            $product_child->save();

            $product_child_price = new ProductChildPrice();
            $product_child_price->product_child_price_id = getMaxId('product_child_prices', 'product_child_price_id');
            $product_child_price->product_id = $product->product_id;
            $product_child_price->unique_id = $product->product_id;
            $product_child_price->unit_price = $request->input('unit_price');
            $product_child_price->ot_rate1 = $request->input('ot_rate1');
            $product_child_price->ot_amount1 = $request->input('ot_amount1');
            $product_child_price->station_id = getStationId();
            $product_child_price->cr_by = $request->user()->id;
            $product_child_price->cr_on = now();
            $product_child_price->save();
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json(['error' => $exception->getMessage()], 401);
        }


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
        $product = ProductMaster::where('product_id', $id)->first();

        $product_child = ProductChild::where('product_id', $product->product_id)->first();
        $product_child_price = ProductChildPrice::where('product_id', $product->product_id)->first();

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

        $data['last_supplier_id'] = $product_child->last_supplier_id ?? null;
        $data['last_purchase_cost'] = $product_child->last_purchase_cost ?? null;
        $data['it_rate1'] = $product_child->it_rate1 ?? null;
        $data['it_amount1'] = $product_child->it_amount1 ?? null;

        $data['unit_price'] = $product_child_price->unit_price ?? null;
        $data['ot_rate1'] = $product_child_price->ot_rate1 ?? null;
        $data['ot_amount1'] = $product_child_price->ot_amount1 ?? null;

        $data['category'] = $product->category ?? null;
        $data['sub_category'] = $product->subCategory ?? null;
        $data['sub_sub_category'] = $product->subSubCategory ?? null;
        $data['department'] = $product->department ?? null;
        $data['product_brand'] = $product->brand ?? null;

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
        try {
            DB::beginTransaction();

            $product = ProductMaster::findOrFail($id);
            $product_child = ProductChild::firstOrCreate(['product_id' => $product->product_id], []);
            $product_child_price = ProductChildPrice::firstOrCreate(['product_id' => $product->product_id], []);

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
            if ($request->hasFile('product_image')) {
                $image = $request->file('product_image')->store('uploads/products');
                $product->product_image = $image;
            }
            $product_child->last_supplier_id = $request->input('last_supplier_id') ?? $product_child->last_supplier_id;
            $product_child->last_purchase_cost = $request->input('last_purchase_cost') ?? $product_child->last_purchase_cost;
//            $product_child->it_rate1 = $request->input('it_rate1') ?? $product_child->it_rate1;
//            $product_child->it_amount1 = $request->input('it_amount1') ?? $product_child->it_amount1;
            $product_child->it_rate1 = 0;
            $product_child->it_amount1 = 0;

            $product_child_price->unit_price = $request->input('unit_price') ?? $product_child_price->unit_price;
            $product_child_price->ot_rate1 = $request->input('ot_rate1') ?? $product_child_price->ot_rate1;
            $product_child_price->ot_amount1 = $request->input('ot_amount1') ?? $product_child_price->ot_amount1;
            $product->save();
            $product_child->save();
            $product_child_price->save();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 401);
        }
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
        ProductChild::where('product_id', $product->product_id)->delete();
        ProductChildPrice::where('product_id', $product->product_id)->delete();
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
            $categories = $categories->pluck('drilldown_code', 'drilldown_id');
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
                'specification' => 'nullable|string|max:250',
                'category_id' => 'required|exists:product_drilldown_masters,drilldown_id',
                'sub_category_id' => 'nullable|exists:product_drilldown_masters,drilldown_id',
                'sub_sub_category_id' => 'nullable|exists:product_drilldown_masters,drilldown_id',
                'department_id' => 'nullable|exists:product_drilldown_masters,drilldown_id',
                'product_brand_id' => 'nullable|exists:product_drilldown_masters,drilldown_id',
                'description' => 'required',
                'unit' => 'required',
                'pack_details' => 'required',
                'product_type' => 'required|string|max:10',
                'product_image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
                'specification' => 'nullable|string|max:250',
                'category_id' => 'exists:product_drilldown_masters,drilldown_id',
                'sub_category_id' => 'nullable|exists:product_drilldown_masters,drilldown_id',
                'sub_sub_category_id' => 'nullable|exists:product_drilldown_masters,drilldown_id',
                'department_id' => 'nullable|exists:product_drilldown_masters,drilldown_id',
                'product_brand_id' => 'nullable|exists:product_drilldown_masters,drilldown_id',
                'description' => 'nullable',
                'unit' => 'nullable',
                'pack_details' => 'nullable',
                'product_type' => 'string|max:10',
                'product_image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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

