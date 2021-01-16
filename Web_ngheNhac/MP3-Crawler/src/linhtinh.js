const data = [
    {_id: 1, name: "test", parent: null},
    {_id: 2, name: "test 2", parent: 1},
    {_id: 3, name: "test 3", parent: 1},
    {_id: 4, name: "test 4", parent: 2},
    // {_id: 1, name: "test", parent: null},
    // {_id: 2, name: "test 2", parent: 1},
    // {_id: 3, name: "test 3", parent: 1},
    // {_id: 4, name: "test 4", parent: 2},
    // {_id: 1, name: "test", parent: null},
    // {_id: 2, name: "test 2", parent: 1},
    // {_id: 3, name: "test 3", parent: 1},
    // {_id: 4, name: "test 4", parent: 2},
    
]
const testData = `a
b
c
`
// --1 test
// ----2 test 2
// ------4 test 4
// ----3 test 3

function getNestedChildren(arr, parent) {
    var children = [];
    for(var i =0; i < arr.length; ++i) {
        if(arr[i].parent == parent) {
            var grandChildren = getNestedChildren(arr, arr[i]._id)

            if(grandChildren.length) {
                arr[i].children = grandChildren;
            }
            children.push( arr[i]);
        }
    }
    return children;
}

var nest = getNestedChildren(data,null);
console.log( testData);