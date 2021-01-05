<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Crypt;
use Lcobucci\JWT\Parser;

class AuthController extends Controller
{
    public function login(){

       
    try{
         $input =request()->all();
         $validator =Validator::make($input,[
            'username'=>['required'],
            'password'=>['required'],

        ]);
        $credentials = [
            'username' => request('username'),
            'password' => request('password')
        ];

        if (Auth::attempt($credentials)) {
            $user = request()->user();
            $token = $user->createToken($user['username'])->accessToken;
            return response()->json([
                 'token'=>$token, 
                 $user
            ],200);
        }else{
            return response()->json($validator->errors(),400);
        }
     }catch(Exception $e){
        return response()->json([
            'message' => 'Bad request!',
            
            ], 400); 
     }
    }
    public function logout(Request $request){
        // Auth::guard('api')->user()->token()->revoke();
        // return response()->json([
        //     'message' => 'Successfully logged out'
        // ]);
    }
    
    
    public function getMe(Request $request){
        if (Auth::guard('api')->check()) {
            $user = Auth::guard('api')->user();
        }
        $token = $request->bearerToken();
        $data = (new Parser())->parse($token)->getClaims();
        return response()->json([
            "data"=>$user,
            $data
        ],200);

    }
  
}
