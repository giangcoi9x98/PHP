<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
    Route::get('product','App\Http\Controllers\ProductController@getAll')->name('product.api.getAll');
    Route::get('product/{id}','App\Http\Controllers\ProductController@getById')->name('product.api.getById');
    
    
    Route::get('category','App\Http\Controllers\CategoryController@getAll')->name('category.api.getAll');
    Route::get('category/{id}','App\Http\Controllers\ProductController@getById')->name('category.api.getById');
    
    Route::post('register','App\Http\Controllers\AccountController@create')->name('account.api.create');
    Route::post('login','App\Http\Controllers\AuthController@login')->name('account.api.login');
    Route ::get('/search/{keyword}','App\Http\Controllers\SearchController@index')->name('search.api.index');

 Route::group(['middleware' => 'auth:api'], function() {
   Route::put('account/{id}','App\Http\Controllers\AccountController@update')->name('account.api.update');
   Route::get('me','App\Http\Controllers\AuthController@getMe')->name('account.api.getMe');
   Route::post('order','App\Http\Controllers\OrderController@create')->name('order.api.create');
   Route::get('order/{username}','App\Http\Controllers\OrderController@getAllByUsername')->name('order.api.getAllByUsername');

 });
 Route::group(['middleware'=>'admin'],function(){
   Route::delete('order/{id}','App\Http\Controllers\OrderController@delete')->name('order.api.delete');
   Route::put('order/{id}','App\Http\Controllers\OrderController@update')->name('order.api.update');
   Route::get('orders/{orderId}','App\Http\Controllers\OrderController@getById')->name('order.api.getById');
   Route::get('order','App\Http\Controllers\OrderController@getAll')->name('order.api.getAll');
   Route::delete('product/{id}','App\Http\Controllers\ProductController@delete')->name('product.api.delete');
   Route::delete('account/{id}','App\Http\Controllers\AccountController@delete')->name('account.api.delete'); 
  //  Route::delete('product','App\Http\Controllers\ProductController@delete')->name('product.api.delete'); 
   Route::put('product/{id}','App\Http\Controllers\ProductController@update')->name('product.api.update');
   Route::post('product','App\Http\Controllers\ProductController@create')->name('product.api.create');
   Route::get('account','App\Http\Controllers\AccountController@getAll')->name('account.api.getAll');
 });
