<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use PhpParser\Node\Stmt\TryCatch;

use function PHPUnit\Framework\isEmpty;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function handle($request ,Closure $next)
    {   
         
      
        try {
            if (($request->header()['authorization'][0])) {
                return $next($request);
                
            }
        }catch(Exception $e){
            //echo($e);
            return response()->json([
                'seccess'=>false,
                'message'=>'Unauthorized',
                'header'=>$request->header()
            ],401);

        }
        
    }
 
}
