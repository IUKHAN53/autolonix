<?php

namespace Database\Seeders;

use App\Models\AccountHeadMaster;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AccountHeadMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'account_id' => 1,
                'parent_account_id' => null,
                'account_no' => '01',
                'account_code' => '01',
                'account_type' => 'BS',
                'account_name' => 'BRANCHES/DIVISIONS',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 2,
                'parent_account_id' => null,
                'account_no' => '02',
                'account_code' => '02',
                'account_type' => 'BS',
                'account_name' => 'CAPITAL ACCOUNT',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 3,
                'parent_account_id' => null,
                'account_no' => '03',
                'account_code' => '03',
                'account_type' => 'BS',
                'account_name' => 'CURRENT ASSETS',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 4,
                'parent_account_id' => null,
                'account_no' => '04',
                'account_code' => '04',
                'account_type' => 'BS',
                'account_name' => 'CURRENT LIABILITIES',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 5,
                'parent_account_id' => null,
                'account_no' => '05',
                'account_code' => '05',
                'account_type' => 'PL',
                'account_name' => 'DIRECT EXPENSES',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 6,
                'parent_account_id' => null,
                'account_no' => '6',
                'account_code' => '6',
                'account_type' => 'PL',
                'account_name' => 'DIRECT INCOMES',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 7,
                'parent_account_id' => null,
                'account_no' => '7',
                'account_code' => '7',
                'account_type' => 'BS',
                'account_name' => 'FIXED ASSETS',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 8,
                'parent_account_id' => null,
                'account_no' => '8',
                'account_code' => '8',
                'account_type' => 'PL',
                'account_name' => 'INDIRECT EXPENSES',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 9,
                'parent_account_id' => null,
                'account_no' => '9',
                'account_code' => '9',
                'account_type' => 'PL',
                'account_name' => 'INDIRECT INCOMES',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 10,
                'parent_account_id' => null,
                'account_no' => '10',
                'account_code' => '10',
                'account_type' => 'PL',
                'account_name' => 'INVESTMENTS',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 11,
                'parent_account_id' => null,
                'account_no' => '11',
                'account_code' => '11',
                'account_type' => 'PL',
                'account_name' => 'LOANS',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 12,
                'parent_account_id' => null,
                'account_no' => '12',
                'account_code' => '12',
                'account_type' => 'BS',
                'account_name' => 'PURCHASE ACCOUNTS',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
            [
                'account_id' => 13,
                'parent_account_id' => null,
                'account_no' => '13',
                'account_code' => '13',
                'account_type' => 'BS',
                'account_name' => 'SALES ACCOUNTS',
                'level_no' => 1,
                'po_box' => null,
                'telephone' => null,
                'mobile_no' => null,
                'fax_no' => null,
                'email' => null,
            ],
        ];
        DB::table('account_head_masters')->insert($data);

//        AccountHeadMaster::factory()->count(20)->create();
    }
}
