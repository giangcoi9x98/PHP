<?php

namespace App\Http\Controllers;

use App\Models\Laptop;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class LaptopController extends Controller
{
    function create(Request $request){
        $input = $request->all();
        $validator = Validator::make($input,[
            'productId'=>['required'],
            'serieCode'=>['required'],
            'accountId'=>['required']

        ]);
        try{
            $laptop = new Laptop;
            $laptop->laptopId=Uuid::uuid4()->toString();
            $laptop->productId=$input['productId'];
            $laptop->serieCode=$input['serieCode'];
            $laptop->accountId=$input['accountId'];
            $laptop->save();
            return response()->json('success',201);
        }catch(Exception $e){
            return response()->json($validator->errors(),400);
        }
    }
}
