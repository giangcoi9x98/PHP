<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {   try
        {
        $user=Auth::guard('api')->user();
        if($user['roles']=="ADMIN"){
            return $next($request);
        }else{
            return response()->json('Forbibden',403);
        }

        }catch(Exception $e){
            return response()->json('Bad Request!',400);
        }
    }
}
