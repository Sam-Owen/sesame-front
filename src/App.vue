<template>
  <div>
    <div style="background-color:black;height:50px;color:#fff">
      <span style="font-size:30px;padding:20px 20px">点点芝麻，聚沙成塔</span>
    </div>
    <div class="row" id="app">
      <div class="col-md-2">
        <div class="panel-group table-responsive" role="tablist">
          <div class="panel panel-primary leftMenu" v-for="m,i in menu">
            <!-- 利用data-target指定要折叠的分组列表 -->
            <div class="panel-heading" :id="'clgh' + i " data-toggle="collapse"
                 :data-target="'#'+'clg'+i" role="tab">
              <h4 class="panel-title">
                {{m.label}}
                <span class="glyphicon glyphicon-chevron-up right"></span>
              </h4>
            </div>
            <!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
            <div :id="'clg'+i" class="panel-collapse collapse in" role="tabpanel"
                 :aria-labelledby="'clgh'+i">
              <ul class="list-group">
                <li class="list-group-item" v-for="c,j in m.children">
                  <!-- 利用data-target指定URL -->
                  <span class="glyphicon glyphicon-triangle-right"></span>
                  <router-link :to="c.router">{{c.label}}</router-link>
                </li>
              </ul>
            </div>
          </div><!--panel end-->
        </div>
      </div>

      <div class="col-md-10" id="content">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap/dist/css/bootstrap-theme.min.css'
  import menu from '@/assets/data/menu.json'


  global.$ = global.jQuery = require('jquery');
  require('bootstrap');

  $(function () {
    $(".panel-heading").click(function (e) {
      /*切换折叠指示图标*/
      $(this).find("span").toggleClass("glyphicon-chevron-down");
      $(this).find("span").toggleClass("glyphicon-chevron-up");
    });
  });

  global.menu = menu;

  export default {
    name: 'app',
    data () {
      return {
        menu: global.menu
      }
    }
  }
</script>

<style>
  .panel-group {
    max-height: 770px;
    overflow: auto;
  }

  .leftMenu {
    margin: 10px;
    margin-top: 5px;
  }

  .leftMenu .panel-heading {
    font-size: 14px;
    padding-left: 20px;
    height: 36px;
    line-height: 36px;
    color: white;
    position: relative;
    cursor: pointer;
  }

  /*转成手形图标*/
  .leftMenu .panel-heading span {
    position: absolute;
    right: 10px;
    top: 12px;
  }

  .leftMenu .menu-item-left {
    padding: 2px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
  }

  .leftMenu .menu-item-left:hover {
    background: #C4E3F3;
    border: 1px solid #1E90FF;
  }

  #content {
    margin-top: 10px;
  }
</style>


