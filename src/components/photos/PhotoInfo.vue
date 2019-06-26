<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>{{photoinfo.add_time | dataFormat}}</span>
            <span>点击: {{photoinfo.click}}次</span>
        </p>
        <hr>
        <vue-preview :slides="list" @close="handleClose" class="prev"></vue-preview>
        <div class="content" v-html="photoinfo.content"></div>

        <cmt-comment :id="id"></cmt-comment>
    </div>
</template>
<script>
import comment from '../news/subcomponents/comment.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            photoinfo: {},
            list: []
        }
    },
    created() {
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods: {
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result =>{
                if(result.body.status === 0){
                    this.photoinfo = result.body.message[0]

                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/'+ this.id).then(result =>{
                if(result.body.status === 0){
                    console.log(result.body.message)
                    
                    result.body.message.forEach(item =>{
                        item.w = 600
                        item.h = 400
                        item.msrc = item.src
                    });
                    this.list = result.body.message
                }
            })
        },
        handleClose () {
        console.log('close event')
      }
    },

    components:{
        'cmt-comment':comment
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
    padding: 3px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
        text-indent: 2em;
    }
    
}
</style>
