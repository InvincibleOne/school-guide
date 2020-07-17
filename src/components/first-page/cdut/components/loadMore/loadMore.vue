<template>
    <div class="wrapper">
        <div class="icon ">
            <div class="circle "></div>
            <div class="circle "></div>
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
        height: 100px
        display :flex
        flex-direction : column
        align-items :  center
        justify-content : center

        .icon
            height: 40px
            transform-origin: bottom center
            animation : loading 2s linear infinite
            
            .circle
                width : 15px
                height :15px
                background-color :grey
                border-radius:50%
                animation : dynamic 1s linear infinite
        
        .icon :first-child
            background-color: purple

        .icon :nth-child(2)
            background-color: yellow
            animation-delay : 0.5s
    

        .rotate45
            transform : translate( -50%, -50% ) rotate( 45deg )


    @keyframes dynamic 
        0% 
            transform:scale(0)
        50% 
            transform:scale(1.2)
        100%
            transform: scale( 1 )
    @keyframes loading 
        from
            transform:rotate(0deg)
        to
            transform:rotate(360deg)
    
        
</style>