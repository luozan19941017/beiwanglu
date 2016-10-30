$(function(){
    var todos=[]
    if(localStorage.data){
        todos=JSON.parse(localStorage.data);
        render();
    }else{
        localStorage.data=JSON.stringify(todos)
    }
    function render(){
        $('.list').empty();
        localStorage.data=JSON.stringify(todos)
     $(todos).each(function(i,v){

        $("<li class='list-item'><div class='todo'>"+v.title+"</div><div class='close icon-font icon-delete'></div></li>").addClass(function(){
            if(v.state==1){
                return "done";
            }
        }).appendTo('.list')

     })
   }
   //添加数据
   function push (v){
       todos.push({title:v,state:0,isdel:0})
       render();
       localStorage.data=JSON.stringify(todos)
   }
   //点击添加按钮，添加事件       // //新建便签中的删除按钮
    $('.add').on('click',function(){
        $('.add-box').css({display:'block'})
        $('.box').css({display:'none'})
        $('.delete').on('click',function(){
            $('.mask').css({display:'block'})
            $('.queding').on('click',function(){
                $('.mask').css({display:'none'})
                $('.add-box').css({display:'none'})
                $('.box').css({display:'block'})
                // $('.xiugai').css({display:'none'})
                $('#add').val('');
            })
            $('.quxiao').on('click',function(){
                $('.mask').css({display:'none'})
            })
        })
    })

    //点击返回按钮，获取到值插入到ul中
    $('.fanhui').on('touchstart',function(){
        $('.add-box').css({display:'none'})
        $('.box').css({display:'block'})
        var val=$('textarea').val()
        if(val){
            push(val)
        }
        $('#add').val('');
    })
    //点击皮肤
    $('.pifu').on('click',function(){
        $('.header-content').toggleClass('huaipifu')
        $('.footer').toggleClass('huaipifu')
        $('.add-header').toggleClass('huaipifu')
        $('.add-footer').toggleClass('huaipifu')
    })


    //遮罩
    var h=document.documentElement.clientHeight;
    $('.mask').height(h);


    // /修改标签内容
    var flag=true;
    var index;
    $('.list').on('click','.list-item',function(){
           index=$(this).index()
           var oldval=todos[$(this).index()].title;
           $('#xiugai').val(oldval);
           $('.add-box').css({display:'none'})
           $('.box').css({display:'none'})
           $('.xiugai-box').css({display:'block'})
    })
    $('.xiugai').on('click',function(){
        var newval=$('#xiugai').val();
        todos[index].title=newval;
        localStorage.data=JSON.stringify(todos);
        render();
        $('.add-box').css({display:'none'})
        $('.box').css({display:'block'})
        $('.xiugai-box').css({display:'none'})
    })




    //点击li里的删除按钮删除

    $('.list').on('touchstart','.close',function(e){
        // e.stopPropagation();
        var i=$(this).index();
        console.log(i)
        todos.splice(i,1);
        localStorage.data=JSON.stringify(todos);
        render()
        // $(this).closest('.list-item').remove();
    })


    var left=null;
    $('.list').on('touchstart','.list-item',function(e){
        left=e.originalEvent.changedTouches[0].pageX
    })
    $('.list').on('touchmove','.list-item',function(e){
        var n=e.originalEvent.changedTouches[0].pageX
        var m=left-n;
       if(m>40){
           $(this).addClass('active').queue(function(){
               $(this).removeClass('active').dequeue()

           })
           $(this).addClass(function(){
               return 'done';

           });
           todos[$(this).index()].state="1";
           localStorage.data=JSON.stringify(todos)

       }
    })
})