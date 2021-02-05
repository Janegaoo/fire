<!--
 * @Author: Jane
 * @Date: 2020-08-03 11:35:57
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 11:47:53
 * @Descripttion:
-->
<template>
  <div class="error-page">
    <!-- <div class="img"
         style=" background-image: url('/img/bg/404.svg');"></div> -->
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在</div>
      <div class="actions">
        <!-- <router-link :to="{path:'/'}">
          <a-button type="primary">返回首页</a-button>
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error-404',
};
</script>
<style lang="scss" scoped>
  .error-page {
  padding: 16px;
  background: #f0f2f5;
  min-height: 280px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    margin-right: 80px;
    height: 360px;
    width: 100%;
    max-width: 430px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }
  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
      text-align: center;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
