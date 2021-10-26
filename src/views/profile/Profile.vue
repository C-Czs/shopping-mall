<template>
    <div class="profile">
        <nav-bar class="nav-bar"><div slot="center">我的</div></nav-bar>
        <user/>
        <account/>
        <personal-info/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import User from './childComps/User'
import Account from './childComps/Account'
import PersonalInfo from './childComps/PersonalInfo'

export default {
    name: 'Profile',
    components: {
        NavBar,
        User,
        Account,
        PersonalInfo
    }
}
</script>

<style>
  .profile {
      background-color: #f2f2f2
  }
  .nav-bar {
      background-color: var(--color-tint);
      color: #fff;
      font-weight: 700;
  }
</style>