<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { logInUser, loggedIn } from './../../../utils/auth.js';
  
    let formErrors = {};
    
    function postSignUp() {
      goto('/');
    }
    
    async function createUser(evt) {
      evt.preventDefault()
      
      if (evt.target['password'].value != evt.target['password-confirmation'].value) {
        formErrors['password'] = { message: 'Password confirmation does not match' };
        return;
      }
      
      const userData = {
        username: evt.target['username'].value,
        email: evt.target['email'].value,
        password: evt.target['password'].value,
        passwordConfirm: evt.target['password-confirmation'].value
      };
      
      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (resp.status == 200) {
        const res = await logInUser(userData.username, userData.password);
        
        if (res.success) {
          loggedIn.set(true)
          postSignUp();
        } else {
          loggedIn.set(false)
          throw 'Sign up succeeded but authentication failed';
        }
      } else {
        const res = await resp.json();
        formErrors = res.data;
      }
    }
    </script>
  <!-- {#if } -->
  <div class = "alert alert-info shadow-lg">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 2 4" class = "stroke-current flex-shrink-0 w-6 h-6">
        <span>Please sign up first.</span>
      </div>
    </div>
    <!-- {/if} -->
    <h1 class="text-center text-xl mt-20">Please create your account.</h1>
    <div class="text-center">
      <a class="link-hover italic text-xs" href="/login">Already have an account? Click here to login instead.</a>
    </div>
    <div class="flex justify-center items-center mt-8">
      <form on:submit={createUser} class="w-1/3">
        <div class="form-control w-full">
          <label class="label" for="username">
            <span class="label-text">Username</span>
          </label>
          <input type="text" name="username" placeholder="johndoe" class="input input-bordered w-full" />
          {#if 'username' in formErrors}
          <label class="label" for="username">
            <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
          </label>
          {/if}
        </div>
        
        <div class="form-control w-full">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required />
          {#if 'email' in formErrors}
          <label class="label" for="email">
            <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
          </label>
          {/if}
        </div>
        
        <div class="form-control w-full">
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
          {#if 'password' in formErrors}
          <label class="label" for="password">
            <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
          </label>
          {/if}
        </div>
        
        <div class="form-control w-full">
          <label class="label" for="password">
            <span class="label-text">Confirm Password</span>
          </label>
          <input type="password" name="password-confirmation" placeholder="" class="input input-bordered w-full" required />
          {#if 'password' in formErrors}
          <label class="label" for="password">
            <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
          </label>
          {/if}
        </div>
        
        <div class="form-control w-full mt-4">
          <button class="btn btn-md">Create an Account</button>
        </div>
      </form>
      <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    </div>
    