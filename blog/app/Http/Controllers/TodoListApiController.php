<?php

namespace App\Http\Controllers;
use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TodoListApiController extends Controller
{
    function list(){
        return TodoList::all();
    }
    public function create(Request $request){
        $validator = Validator::make($request->all(),[
            'title'=>['required','unique:todo_list'],
            'description'=>['required']
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        $todolist=TodoList::create($request->all());
        return response()->json($todolist,201);
    }
    function show($id){
        return DB::table('product')->find($id);
    }
}
