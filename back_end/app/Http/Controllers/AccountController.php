<?php

namespace App\Http\Controllers;
use App\Models\Account;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class AccountController extends Controller
{
    function getAll(){
        return User::where('isDelete',0)->get();
    }
    function create(Request $request){
        $input =$request->all();
        $validator =Validator::make($input,[
            'username'=>['required','unique:users'],
            'email'=>"",
            'password'=>['required'],
            

        ]);
      try{
      
        $input['password']=bcrypt($input['password']);
        $account =User::create($input);
        return response()->json($account,201);
      }catch(Exception $e){
            return response()->json($validator->errors(),400);

      }
 

   }
   function update($id,Request $request){
    try{
        $user=Auth::guard('api')->user();
        $pass='';
        if($request->has('password')){
            $pass=bcrypt($request->input('password'));
            User::where('username',$id)
            ->update(['firstname'=>$request->input('firstname'),
                        'lastname'=>$request->input('lastname'),
                        'email'=>$request->input('email'),
                        'phone'=>$request->input('phone'),
                        'address'=>$request->input('address'),
                        'password'=>$pass,]);
        }else{
            User::where('username',$id)
            ->update(['firstname'=>$request->input('firstname'),
                        'lastname'=>$request->input('lastname'),
                        'email'=>$request->input('email'),
                        'phone'=>$request->input('phone'),
                        'address'=>$request->input('address'),
                        
    
            ]);
        }
      

        return response()->json([
            'message'=>"Success !",         
        ],200);
    }catch(Exception $e){
        return response()->json('Bad Request !',400);
    }
}
function delete($id){
   User::where('username',$id)->update(['isDelete'=>1]);
   return response()->json('User deleted successfully',200);
}
 
}
