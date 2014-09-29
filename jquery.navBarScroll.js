/**
 * Created by li.jiang on 14-9-28.
 */

"use strict";

(function($){

    $.navBarScroll=function(o){

        var defaults = $.extend({
            step:1,             //每次点击滑动步数
            nav_li:'ul li',   //需要滚动的li
            current_li:'',    //当前的li
            next:'.navbar-next',      //点击下一组按钮
            prev:'.navbar-prev'       //点击上一组按钮
        },o);

        $.navBarScroll.init(defaults);
    };

    var step,step_length,show_length,length,hide_length,
        current_step=0,$nav_bar_ul,$next,$prev,current_li_index=0;
    $.extend($.navBarScroll, {
        //初始化
        init: function (o) {

            step = o.step;
            step_length = $(o.nav_li).outerWidth();
            length = $(o.nav_li).size();
            $nav_bar_ul = $(o.nav_li).parent('ul');
            $nav_bar_ul.width(step_length*length);

            if(o.current_li!==''){
                current_li_index = $('.'+o.current_li).index();
            }
            $next = $(o.next);
            $prev = $(o.prev);

            show_length = $nav_bar_ul.parent('.navBar-wrap').outerWidth()/step_length;
            hide_length = length-show_length;
            if(current_li_index>=show_length){
                current_step = (current_step+current_li_index)>hide_length?hide_length:(current_step+current_li_index);
                if(current_step==hide_length) $next.css('display','none');
                var l = -(current_step*step_length);
                $nav_bar_ul.animate({left:l+'px'});
            }

            if(current_step==0) $(o.prev).css('display','none');
            if(current_step==hide_length) $(o.next).css('display','none');
            $(o.next).on('click',$.navBarScroll.next);
            $(o.prev).on('click',$.navBarScroll.prev);
        },
        prev:function(){
            var that = this;
            if(current_step>=1){
                $next.show();
                current_step = (current_step-step)<0?0:(current_step-step);
                if(current_step==0) $prev.css('display','none');
                var l = -(current_step*step_length);
                $nav_bar_ul.animate({left:l+'px'});
            }
        },
        next:function(){
            var that = this;
            if(current_step<hide_length){
                $prev.show();
                current_step = (current_step+step)>hide_length?hide_length:(current_step+step);
                if(current_step==hide_length) $next.css('display','none');
                var l = -(current_step*step_length);
                $nav_bar_ul.animate({left:l+'px'});
            }
        }
    })
})($);