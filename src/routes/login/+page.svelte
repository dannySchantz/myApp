<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { logInUser } from '../../utils/auth';
    let formErrors = {};
    import Header from '../../utils/Header.svelte';


    async function _logInUser(evt) {
        evt.preventDefault();

        const userData = {
        username: evt.target['username'].value,
        password: evt.target['password'].value, 
        }


        const res = await logInUser(userData.username, userData.password)
        if (res.success) {
            goto('/')
        }
    }

</script>
  
<Header />

<h1 class="text-center text-xl mt-20">Please Log In</h1>
  <div class="text-center">
      <a class="link-hover italic text-xs" href="/users/new">Don't have an account? Please click here to sign-up instead.</a>
  </div>
  <div class="flex justify-center items-center mt-8">
      <form on:submit={_logInUser} class="w-1/3">
        <div class="form-control w-full">
        <label class="label" for="username">
          <span class="label-text">Username</span>
        </label>
        <input type="text" name="username" placeholder="johndoe" class="input input-bordered w-full" />
        </div>
  
          <div class="form-control w-full">
              <label class="label" for="password">
                  <span class="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
          </div>
          <div class="form-control w-full mt-4">
              <button class="btn btn-md">Log In</button>
          </div>
      </form>
  </div>