<body>
<div class="row">
        
        <form    method="">
                @csrf
                @if($errors->any())
                    <div class="alert alert-danger" role="alert">
                        Please fix the following errors
                    </div>
                @endif
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control @error('title') is-invalid @enderror" id="title" 
                    name="title" placeholder="Title" value="$todolists->title" >
                    @error('title')
                        <div class="invalid-feedback">{{$message}}</div>
                    @enderror
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control @error('description') is-invalid @enderror" 
                    id="description" name="description" 
                    placeholder="description">{{old('description')}}</textarea>
                    @error('description')
                        <div class="invalid-feedback">{{$message}}</div>
                    @enderror
                </div>
                <button type="submit" class="btn btn-primary">update</button>
                <a href="/todolists">Back to lists</a>
            </form>
        @
       

        </div>
</body>