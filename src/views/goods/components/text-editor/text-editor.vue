<style lang="less">
    @import '../../../../styles/loading.less';
</style>

<template>
    <div>
        <Card shadow>
            <textarea class='tinymce-textarea' id="tinymceEditer" ></textarea>
        </Card>
        <Spin fix v-if="spinShow">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>加载组件中...</div>
        </Spin>
    </div>
</template>

<script>
import tinymce from 'tinymce';
export default {
    name: 'text-editor',
    props:['content'],
    data () {
        return {
            spinShow: false,
            
        };
    },
    watch:{
    	content:function(val){
    		 tinymce.get('tinymceEditer').setContent(val);
    	}
    },
    methods: {
        init () {
            this.$nextTick(() => {
                let vm = this;
                let height = document.body.offsetHeight - 300;
                tinymce.init({
                    selector: '#tinymceEditer',
                    branding: false,
                    elementpath: false,
                    height: height,
                    language: 'zh_CN.GB2312',
                    menubar: 'edit insert view format table tools',
                    plugins: [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                        'searchreplace visualblocks visualchars code fullpage',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                    ],
                    toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                    autosave_interval: '20s',
                    image_advtab: true,
                    table_default_styles: {
                        width: '100%',
                        borderCollapse: 'collapse'
                    },
                    setup: function (editor) {
                    	
                    	editor.addButton('mybutton', {                    

                        text: '上传图片',                   

                        icon: false,                    

                        onclick: function () {                        

                             tinymceEditor = editor;                        

                            $("input[name='upload-img']").click();                    

                         }           

                     });

 
                    	
                    	
                    	
                        editor.on('init', function (e) {
                        	 vm.spinShow = false;
                        	//  tinymce.get('tinymceEditer').setContent("hfghgfhfg");
                        //	 tinymce.get('tinymceEditer').getBody().innerHTML='kajkfklasdfsdakfjsda';
                         
                           /* if (localStorage.editorContentycyp) {
                                tinymce.get('tinymceEditer').setContent(localStorage.editorContentycyp);
                                localStorage.editorContentycyp='';
                            } */
                        });
                        editor.on('keyup', function (e) {
                        	// console.log( tinymce.get('tinymceEditer').getBody().innerHTML);
                        	 vm.$emit('ontextarea', tinymce.get('tinymceEditer').getBody().innerHTML);
                        	// console.log('ssss');
                           // localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
                        });
                        
                    }
                });
            });
        }
    },
    mounted () {
    	console.log('txta');
        this.init();
        console.log('txta');
    },
    destroyed () {
        tinymce.get('tinymceEditer').destroy();
    }
};
</script>

<style>

</style>
