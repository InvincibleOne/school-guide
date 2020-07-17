<template>
    <div class="wrapper">
        <div class="box">
            <div class="icon rotate0">
                <div class="circle up"></div>
                <div class="circle right"></div>
                <div class="circle down"></div>
                <div class="circle left"></div>
            </div>
            <div class="icon rotate45">
                <div class="circle up"></div>
                <div class="circle right"></div>
                <div class="circle down"></div>
                <div class="circle left"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" scoped>
    .wrapper
        position: relative
        width : 100%
        height: 45px
        background-color: #fff

        .box
            animation loading 1.5 ease infinite 
            .icon
                position:absolute
                top: 50%
                left: 50%
                width: 24px
                height: 24px
                transform-origin: center center
                transform : translate( -50%, -50% ) 
                
                .circle
                    width : 6px
                    height :6px
                    background-color :grey
                    border-radius:50%
                    position : absolute
                    
                .up
                    transform: translateX( 0px ) 
                    
                .right
                    transform: translateX( 18px ) 

                .down
                    transform: translate( 18px, 18px  ) 
                    
                .left
                    transform: translatey( 18px ) 
            
            .rotate0 :first-child
                animation dynamic 2s ease infinite

        

            .rotate45
                transform : translate( -50%, -50% ) rotate( 45deg )


    @keyframes dynamic 
        0% 
            transform:scale(0)
        50% 
            transform:scale (1.5)
        100%
            transform: scale( 1 )
    @keyframes loading 
        from
            transform:rotate(0deg)
        to
            transform:rotate(360deg)
    
        
</style>