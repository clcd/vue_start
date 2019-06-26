<template>
    <div class="cmt-container">
        <h3>评论子组件</h3>
        <textarea name="" placeholder="请输入评论的内容" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="i">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间: {{item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content ===' '?'此用户很懒,什么都没说':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="more">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageindex: 1,//展示第一页
            comments: [],
            msg: '' //输出的评论
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        getComments(){
            this.$http.get("api/getcomments/" +this.id+ "?pageindex="+this.pageindex).then(result =>{
                if(result.body.status ===0){
                    //this.comments = result.body.message
                    this.comments = this.comments.concat(result.body.message)
                }else{
                    Toast('获取评论失败')
                }
            })
        },
        more(){
            this.pageindex++;
            this.getComments();
        },
        postComments(){
            if(this.msg.trim().length ===0){
                return Toast("评论内容不能为空！")
            }
            this.$http.post('api/postcomment/'+this.$route.params.id,{content:this.msg.trim()})
            .then(function(result){
                if(result.body.status ===0){
                    var cmt = { user_name: '匿名用户', add_time: Date.now(),content:this.msg.trim()}
                    this.comments.unshift(cmt)
                    this.msg = ''
                }
            })
        }
    },
    props: ["id"]
}
</script>
<style lang="scss" scoped>
.cmt-container {
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 10px 0;
        font-size: 13px;
        .cmt-item{
            .cmt-body{
                text-indent: 2em;
                line-height: 30px;
            }
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
        }
    }
}
</style>
