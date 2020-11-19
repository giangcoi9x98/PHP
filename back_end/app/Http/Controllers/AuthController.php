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

class AuthController extends Controller
{
    public function login(){

       
     try{
         
        $credentials = [
            'username' => request('username'),
            'password' => request('password')
        ];

        if (Auth::attempt($credentials)) {
            $user = request()->user();
            $token = $user->createToken($user['username'])->accessToken;
            return response()->json([
                 'token'=>$token, 
            ],200);
        }else{
            return response()->json('Bad request !',400);
        }
     }catch(Exception $e){
        return response()->json([
            'message' => 'Bad request!',
            
            ], 400); 
     }
    }
    public function logout(Request $request){
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
    
    
    public function getMe(Request $request){
        if (Auth::guard('api')->check()) {
            $user = Auth::guard('api')->user();
        }

        return response()->json([
            "data"=>$user 
        ],200);

    }
}
