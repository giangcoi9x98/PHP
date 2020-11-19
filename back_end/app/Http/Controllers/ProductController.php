<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Uuid;

class ProductController extends Controller
{
   function getAll(){
       return Product::paginate(20);
   }
   function getById($id){
       return Product::where('productId',$id)->first();
   }
   function create(Request $request){
        try{
            $input=$request->all();
            $product = new Product;
            $product->productId=Uuid::uuid4()->toString();           
            $validator=Validator::make($input,[
                'display'=>['required'],
                'url_key'=>['required'],
                'description'=>['required'],
                'priceOut'=>['required'],
                'priceIn'=>['required'],
                'imageUrl'=>['required'],
                'provider'=>['required'],
                'instock'=>['required'],
                'specifications'=>['required'],
               
            ]);
            $product->display=$input['display'];
            $product->url_key=$input['url_key'];
            $product->description=$input['description'];
            $product->priceOut=$input['priceOut'];
            $product->priceIn=$input['priceIn'];
            $product->imageUrl=$input['imageUrl'];
            $product->provider=$input['provider'];
            $product->instock=$input['instock'];
            $product->specifications=$input['specifications'];
            $product->save();

            return response()->json('OK',201);
               

        }catch(Exception $e){
            return response()->json(['Message'=>'Bad request!'],400);
            echo($input);
        }
   }
   function update(Request $request,Product $product){

   }
   function delete($id){
       Product::where('productId',$id)->delete();
       return response()->json('Product deleted seccessfully');
   }
}
