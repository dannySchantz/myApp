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
  <div class="alert alert-info shadow-l flex justify-start">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l1.414-1.414C2.56 16.238 2 14.198 2 12H2c0-3.042 1.135-5.824 3-7.938L4.586 4.586A7.98 7.98 0 014 12h4c0-2.209.896-4.209 2.344-5.656L10.938 4.586A7.98 7.98 0 0112 4h.001c2.209 0 4.209.896 5.656 2.344L17.414 6.73C19.565 9.138 21 11.966 21 15h-4a8 8 0 01-7.938-9h-.001c2.21 0 4.21.896 5.657 2.343l1.414-1.414C17.628 4.135 14.856 3 11.999 3z"></path>
    </svg>
    <p class="justify-left">Please sign up first.</p>
  </div>
    <!-- {/if} -->
    <h1 class="text-center text-xl mt-20 text-primary">Please create your account.</h1>
    <div class="text-center">
      <a class="link-hover italic text-xs text-primary" href="/login">Already have an account? Click here to login instead.</a>
    </div>
    <div class="flex justify-center items-center mt-8 text-primary">
      <form on:submit={createUser} class="w-1/3">
        <div class="form-control w-full">
          <label class="label" for="username">
            <span class="label-text text-primary">Username</span>
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
            <span class="label-text text-primary">Email</span>
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
            <span class="label-text text-primary">Password</span>
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
            <span class="label-text text-primary">Confirm Password</span>
          </label>
          <input type="password" name="password-confirmation" placeholder="" class="input input-bordered w-full" required />
          {#if 'password' in formErrors}
          <label class="label" for="password">
            <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
          </label>
          {/if}
        </div>
        
        <div class="form-control w-full mt-4">
          <button class="btn btn-md btn-primary">Create an Account</button>
        </div>
      </form>
      <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    </div>
    