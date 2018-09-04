<template>
  <section>
    <header><i></i>酒店搜索</header>
    <div class="wrap_contain">
      <p class="title">房间信息</p>
      <div class="flex-wrap">
        <div class="flex-item left">房间数</div>
        <div class="flex-item right">
          <span class="icon reduce" @click="roomCount > 0 ? roomCount-- : 0"></span>
          <span>{{roomCount}}</span>
          <span class="icon add" @click="roomCount++"></span>
        </div>
      </div>
      <p class="title">每间游客信息</p>
      <div class="flex-wrap">
        <div class="flex-item left">每间成人数</div>
        <div class="flex-item right">
          <span class="icon reduce"  @click="personCount > 0 ? personCount-- : 0"></span>
          <span>{{personCount}}</span>
          <span class="icon add" @click="personCount++"></span>
        </div>
      </div>
      <div class="flex-wrap">
        <div class="flex-item left">儿童数</div>
        <div class="flex-item right">
          <span class="icon reduce" @click="reduceChild"></span>
          <span>{{childrenCount}}</span>
          <span class="icon add" @click="addChildren"></span>
        </div>
      </div>
      <div v-for="(item,index) in childrenArr">
        <div class="flex-wrap" >
          <div class="flex-item left">儿童{{index+1}}年龄</div>
          <div class="flex-item age"  @click="open(item)">
            <span :class="[item.age ? 'black':'']">{{item.age?item.age : '请选择儿童年龄'}}</span>
            <i class="icon"></i>
          </div>
        </div>
        <picker v-model="item.visible" :data-items="items"  @change="onValuesChange"></picker>
      </div>
      <a href="javascript:;" class="sure">确定</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      roomCount:0,
      personCount:0,
      childrenCount:0,
      visible: false, //picker是否显示
      childrenArr:[],  //添加小孩的数组
      id:0,        //添加小孩的数组id,自增
      selectItem:'',  //选中小孩的item
      items: [        //年龄数组
        {
          values: ['1岁', '2岁', '3岁', '4岁','5岁','6岁','7岁','8岁','9岁','10岁'],
        }
      ],
      indexText:'5岁',  //默认5岁
      Timer:null,      //因为选年龄没有确认按钮，所以，此处我添加了定时器，2s过后如果不选中，则提交默认
    }
  },
  methods: {
    //减少儿童
    reduceChild(){
      this.childrenCount > 0 ? this.childrenCount-- && this.childrenArr.splice(-1,1) : 0;
    },
    //添加儿童
    addChildren(){
      let { id } = this;
      this.childrenCount++;
      this.childrenArr.push({
        id,
        age:'',
        visible:false
      })
      this.id = id++;
    },
    //打开选择年龄的picker
    open (item) {
      this.selectItem = item;
      //保证其他picker不展开
      this.childrenArr.forEach(val=>{
        if(val.visible != item.visible){val.visible=false}
      })
      item.visible = true;
      let items = this.items[0];
      let index = items.values.indexOf(this.indexText);
      items.index = index;
    },
    //年龄修改
    onValuesChange(result1) {
      clearInterval(this.Timer)
      //因为选年龄没有确认按钮，所以，此处我添加了定时器，3s过后如果不选中，则提交默认
      this.Timer = setTimeout(()=>{
        this.selectItem.visible = false;
        this.selectItem.age= result1;
      },2000)
    }
  },
  mounted(){
    document.title="行走网"
  }
}
</script>
