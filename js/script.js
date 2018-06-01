//自定义一个参数封装document.getElementById();
function byId(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}
var index=0, //必须将timer 和 index申明成全局变量， 因为在其他函数中也需要调用
timer=null,
pics = byId("banner").getElementsByTagName("div"),//取出的div是一个数组
len=pics.length,
dots=byId("dots").getElementsByTagName("span"),
prev=byId("prev"),
next=byId("next"),
menu=byId("menu-content"),
submenu=byId("sub-menu"),innerBox=submenu.getElementsByClassName("inner-box"),
menuItems=menu.getElementsByClassName("menu-item");
//所有的绑定时间， 包括定时切换， 圆点按钮，前后按钮 都封装在一个slideimage之内， 原理就是操纵index
function slideImage(){
    var main = byId("main");
    //鼠标滑过main区域，清除定时器 
    main.onmouseover = function(){
    	if(timer) clearInterval(timer);
    }
    //鼠标离开main区域，恢复定时器
    main.onmouseout = function(){
    	timer = setInterval(function(){
    		index++;
    		if(index >= len) index=0;
    		//切换图片
    		changeImg();
    	},3000);	
    }
    //自动在main上触发鼠标离开的事件
    main.onmouseout();
    //遍历所有圆点，且绑定事件，点击圆点切换图片
    for(var d=0;d<len;d++){
    	//给span添加一个id的属性 值为d
        dots[d].id=d;
    	dots[d].onclick=function(){
            //将index赋值为当前span的索引
            index=this.id;//得到index 以后调用changeimg（）；
            changeImg();
    	}
    }
    //点击下一张按钮切换图片
    next.onclick=function(){
    	index++;
    	if(index>=len) index=0;
    	console.log(index);
    	changeImg();
    }
    //点击上一张的按钮图片
    prev.onclick=function(){
    	index--;
    	if(index<0) index=len-1;
    	console.log(index);
    	changeImg();
    }
    //导航菜单
    //遍历主菜单 且绑定事件
    for(var m=0;m<menuItems.length;m++){//只要只要主菜单下被鼠标滑过的menuitem索引， 就可以去子菜单下找相对应的innerbox，因为排序是一样的
         //因为圆点上已经有数字id属性，不建议在此继续使用id
        menuItems[m].setAttribute("data-index",m);//所以自定义一个data-index的属性 作为索引
        menuItems[m].onmouseover = function(){
            var idx=this.getAttribute("data-index");
            for(var n=0;n<menuItems.length;n++){//先将子菜单隐藏
                innerBox[n].style.display="none";
                menuItems[n].style.background="none";
            }
            submenu.className="sub-menu";//将classname 由 sub-menu hide 变成 sub-menu
            menuItems[idx].style.background="rgba(0,0,0,0.1)";
            innerBox[idx].style.display="block";
        }
        //离开主菜单 收起子菜单
        menu.onmouseout=function(){
            submenu.className="sub-menu hide";//通过操作submenu 实现子菜单收起功能，将classname 由 sub-menu 变成 sub-menu hide
        }//但是会导致鼠标右移来到子菜单 子菜单无法停留 需要给子菜单的类进行定义
        submenu.onmouseover=function(){
            this.className="sub-menu";//实现鼠标滑过子菜单， 子菜单停留的效果
        }
        submenu.onmouseout=function(){
            this.className="sub-menu hide";//实现鼠标离开子菜单， 子菜单收起的效果
        }
    }  
}
//切换图片的封装，利用index调用相应的dom元素
function changeImg(){
	//遍历banner下所有的div将其隐藏, 以及dots下所有的span， 清除其的类
	for(var i=0;i<len;i++){
        pics[i].style.display='none';
        dots[i].className="";
	}
	//根据index找到当前div 和当前span 将其显示出来和设为当前
   pics[index].style.display='block';//为了不讲div原有的属性覆盖，需要用到style display
   dots[index].className="active";
}
slideImage();
