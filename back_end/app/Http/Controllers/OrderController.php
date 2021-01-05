<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Ramsey\Uuid\Uuid;

class OrderController extends Controller
{
    function getAll(){
        return Order::where('isDelete',0)->get();
    }
    function create(Request $request ){
       try{
            $cart=$request->input('orders');
            $order=new Order;
            $order->orderId=Uuid::uuid4()->toString();
            $order->username=Auth::guard('api')->user()['username'];
            $order->price=$request->input('price');
            $order->note=$request->input('note');
            $order->type=$request->input('type');
            $order->address=$request->input('address');
            $order->display=$request->input('display');
            $order->save();
            $orderProducts=[];
            foreach ($cart  as $key=>$value) {
                 $orderProducts[] = [
                     'orderId' => $order->orderId,
                     'productId' => $value['id'],
                     'quantity' => $value['count']
                 ];  
           }   
          OrderDetail::insert($orderProducts); 
           return response()->json([

              "Message"=>"Seccess!",
            

           ],201);
        
       }catch(Exception $e){
           return response()->json(
               ["Message"=>"Bad Request!",
               "errors"=>$e
               
           ],400);
       }
    }
    function getById($id){
        return Order::where('orderId',$id)->first();
    }
    function getAllByUsername($username){
        return Order::where('username',$username)->get();
    }
    function update($id,Request $request){
        try{
            
            Order::where('orderId',$id)
            ->update($request->all());
            return response()->json(['message:Updated'],200);
        }catch(Exception $e){
            return response()->json('Bad request',400);
        }
    }
    function delete($id){
        Order::where('orderId',$id)->update(['isDelete'=>1]);
        return response()->json('Order deleted successfully!',200);
    }
}
