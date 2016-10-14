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
        $("<li class='list-item'><div class='todo'>"+v.title+"</div><div class='close icon-font icon-delete'></div></li>").appendTo('.list')
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
            // $('.add-box').css({display:'none'})
            // $('.box').css({display:'block'})
            $('.mask').css({display:'block'})
            $('.queding').on('click',function(){
                $('.mask').css({display:'none'})
                $('.add-box').css({display:'none'})
                $('.box').css({display:'block'})
            })
            $('.quxiao').on('click',function(){
                $('.mask').css({display:'none'})
            })
        })

    })
    //点击返回按钮，获取到值插入到ul中
    $('.fanhui').on('click',function(){
        $('.add-box').css({display:'none'})
        $('.box').css({display:'block'})
        var val=$('textarea').val()
        if(val){
            push(val)
        }
    })
    //点击皮肤
    $('.pifu').on('click',function(){
        $('.header-content').toggleClass('huaipifu')
        $('.footer').toggleClass('huaipifu')
    })


    //遮罩
    var h=document.documentElement.clientHeight;
    $('.mask').height(h);
    // /修改标签内容
    // $('.list').on('click','.list-item',function(){
        // console.log($(this))
        // $('.add-box').css({display:'block'})
        // $('.box').css({display:'none'})


    // })
        //点击li里的删除按钮删除
    $('.list .list-item').on('click','.close',function(){
        var i=$(this).closest('.list-item').index();
        todos.splice(i,1);
        localStorage.data=JSON.stringify(todos)
        $(this).closest('.list-item').remove();
    })
    //
    // $('.list').on('click','.list-item',function(){
    //   $(this).addClass(function(){
    //       return 'done';
    //   });
    // })
    var left=null;
    $('.list').on('touchstart','.list-item',function(e){
        left=e.originalEvent.changedTouches[0].pageX
        $(this).addClass(function(){
                  return 'done';
              });
    })
    $('.list').on('touchmove','.list-item',function(e){
        var n=e.originalEvent.changedTouches[0].pageX
        var m=left-n;
       if(m>0&&m>40){
           $(this).addClass('active').queue(function(){
               $(this).delay(800).removeClass('active').dequeue()
           })
       }
    })
    // $('.list').on('touchend','.list-item',function(e){
    //     $(this).addClass('ac')
    // })
})