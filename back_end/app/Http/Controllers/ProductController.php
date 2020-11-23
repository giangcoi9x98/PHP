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
       return Product::where('isDelete',0)->paginate(20);
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

            return response()->json('ok',201);
               

        }catch(Exception $e){
            return response()->json(['Message'=>'Bad request!'],400);
           
        }
   }
   function update($id,Request $request){
        try{
            $input=$request->all();
            Validator::make($input,[
                'display'=>['required'],
                'priceOut'=>['required'],
                'priceIn'=>['required'],
                'imageUrl'=>['required'],
                'provider'=>['required'],
                'instock'=>['required'],
                
               
            ]);
            Product::where('productId',$id)
            ->update($input);
            return response()->json(['Messafe'=>'Updated'],200);

        }catch(Exception $e){
            return response()->json('Bad request!',400);
        }
   }
   function delete($id){
       Product::where('productId',$id)->update(['isDelete'=>1]);
       return response()->json('Product deleted seccessfully');
   }
}
