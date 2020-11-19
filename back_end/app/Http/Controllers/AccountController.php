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
        return User::all();
    }
    function create(Request $request){
      try{
        $input =$request->all();
        $validator =Validator::make($input,[
            'username'=>['required','unique:users'],
            'email'=>"",
            'password'=>['required'],

        ]);
        $input['password']=bcrypt($input['password']);
        $account =User::create($input);
        return response()->json($account,201);
      }catch(Exception $e){
            return response()->json($validator->errors(),400);

      }
 

   }
   function update(Request $request){
    try{
        $user=Auth::guard('api')->user();
        if($request->has('password')){
            $user->password=bcrypt($request->input('password'));
        }
      User::where('username',$user['username'])->update($request->all());
        
        return response()->json([
            'message'=>"Success !",
            
        ],200);
    }catch(Exception $e){
        return response()->json('Bad Request !',400);
    }
}
function delete($id){
   User::where('username',$id)->delete();
   return response()->json('User deleted successfully',200);
}
 
}
