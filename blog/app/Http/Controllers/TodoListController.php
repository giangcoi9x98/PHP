<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    function list(){
     return view("TodoList.list",["todolists"=>TodoList::all()]);

    }
    function create(){
        return view("Todolist.create");
    }
    function createSubmit(Request $request){
        $data = $request->validate([
            'title'=>'required|unique:todo_list|max:255',
            'description'=>'required|max:2000'
        ]);
        $todoList = new \App\Models\TodoList($data);
        $todoList->save();
        return redirect()->route('todolists.list');      
}
    function edit($id){
        return view("TodoList.edit")->with('id',Todolist::find($id));

}
function update($id){
    $this->validate(request(),[
        'description'=>'required'
    ]);
    $data=request()->all();
    $todo=TodoList::find($id);
    $todo->description=$data['descripton'];
    $todo->sava();
    return redirect('/todolists');

        
}
}